import fs from 'node:fs';
import path from 'node:path';
import { loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite';

const STATIC_ROUTES = ['/', '/luxury-rings', '/emperor-rings', '/special-editions', '/gold-silver-rings', '/necklaces', '/luxuryqueens', '/courses', '/blog', '/contact', '/luxury-rings-guide', '/jorge-uquillas'];

const buildRobots = (siteUrl: string) => `# ringsluxury.com
User-agent: *
Allow: /

# Crawlers de busca e IA, liberados explicitamente.
# Googlebot/Bingbot: busca. GPTBot/OAI-SearchBot/ChatGPT-User: ChatGPT.
# ClaudeBot/Claude-User/Claude-SearchBot: Anthropic. PerplexityBot/Perplexity-User: Perplexity.
# Google-Extended: Gemini. Applebot/Applebot-Extended: Siri/Spotlight. CCBot: Common Crawl.
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Applebot
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
Allow: /

# Bloqueados: rastreadores sem valor para o site.
User-agent: Bytespider
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

type Review = {
  id: string;
  name: string;
  photo: string | null;
  initial: string;
  rating: number;
  date: string | null;
  text: string;
};

type ReviewsData = {
  source: { platform: string; businessProfileUrl: string | null; placeId: string | null };
  reviews: Review[];
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type Location = {
  id: string;
  label: string;
  district: string | null;
  city: string;
  region: string | null;
  country: string;
  countryCode: string;
  mapQuery: string;
  zoom: number;
  address: string | null;
  embedUrl: string | null;
};

type LocationsData = { locations: Location[] };

type ContactData = {
  phone: string;
  phoneDisplay: string;
  email: string;
  hours: { days: string[]; opens: string; closes: string; display: string; displayDays: string };
  credit: { prefix: string; name: string; role: string; from: string; url: string };
};

const readReviews = (root: string): ReviewsData =>
  JSON.parse(fs.readFileSync(path.resolve(root, 'src/data/reviews.json'), 'utf-8'));

const readLocations = (root: string): LocationsData =>
  JSON.parse(fs.readFileSync(path.resolve(root, 'src/data/locations.json'), 'utf-8'));

const readContact = (root: string): ContactData =>
  JSON.parse(fs.readFileSync(path.resolve(root, 'src/data/contact.json'), 'utf-8'));

/**
 * Aggregate honesto: descreve APENAS os reviews publicados no site.
 * Nao inventa reviewCount maior que o real.
 */
const buildAggregate = (reviews: Review[]) => {
  const count = reviews.length;
  const value = reviews.reduce((sum, r) => sum + r.rating, 0) / count;
  return { '@type': 'AggregateRating', ratingValue: value.toFixed(1), reviewCount: count, bestRating: 5, worstRating: 1 };
};

/**
 * Sem dominio configurado, nao emitimos @id nem url absolutos: apontar para um
 * host que nao existe e pior do que omitir. O grafo continua valido e os
 * reviews seguem legiveis para as IAs.
 */
const buildGraph = (data: ReviewsData, siteUrl: string, locs: LocationsData, contact: ContactData) => {
  const { reviews, source } = data;
  const hasSite = siteUrl.length > 0;
  const orgId = hasSite ? `${siteUrl}/#organization` : undefined;
  const abs = (p: string) => (hasSite ? `${siteUrl}${p}` : p);

  const { days, opens, closes } = contact.hours;

  const node: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      ...(hasSite ? { '@id': abs('/#website') } : {}),
      ...(hasSite ? { url: siteUrl } : {}),
      name: 'RINGS LUXURY by Jorge Uquillas',
      inLanguage: 'pt-BR',
      ...(hasSite ? { publisher: { '@id': orgId } } : {}),
      // SearchAction exige URL absoluta, entao so existe com dominio.
      ...(hasSite
        ? {
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?q={search_term_string}` },
              'query-input': 'required name=search_term_string',
            },
          }
        : {}),
    },
    {
      '@type': 'Organization',
      ...(hasSite ? { '@id': orgId, url: siteUrl } : {}),
      name: 'RINGS LUXURY by Jorge Uquillas',
      description: 'Atelier de alta joalheria HandCrafted. Anéis 1/1 feitos à mão em ouro 18k com diamantes naturais, gravados com hand engraver por Jorge Uquillas.',
      founder: { '@type': 'Person', name: 'Jorge Uquillas' },
      email: contact.email,
      telephone: contact.phone,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...days],
        opens,
        closes,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: contact.phone,
        email: contact.email,
        availableLanguage: ['pt', 'en', 'es'],
      },
      // Endereco so entra com dado real. 'address' esta null em locations.json
      // ate confirmacao, declarar endereco ficticio e o caminho mais curto
      // para acao manual do Google.
      ...(locs.locations.some((l) => l.address)
        ? { address: locs.locations.filter((l) => l.address).map((l) => ({ '@type': 'PostalAddress', streetAddress: l.address as string, addressLocality: l.city, addressRegion: l.region as string, addressCountry: l.countryCode })) }
        : {}),
      sameAs: ['https://www.instagram.com/ringsluxury'],
    },
    // aggregateRating no Organization NAO gera estrela no SERP: o Google ignora
    // markup auto-referente para a propria empresa. Fica aqui de proposito porque
    // crawlers de IA leem JSON-LD cru e nao executam JS.
    { ...(hasSite ? { '@id': orgId } : {}), aggregateRating: buildAggregate(reviews) },
    {
      '@type': 'ItemList',
      ...(hasSite ? { '@id': abs('/#reviews') } : {}),
      name: 'What people say about Rings Luxury',
      numberOfItems: reviews.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: reviews.map((r, i) => {
        const review: Record<string, unknown> = {
          '@type': 'Review',
          position: i + 1,
          reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
          reviewBody: r.text,
          author: { '@type': 'Person', name: r.name },
          itemReviewed: { '@type': 'Organization', name: 'RINGS LUXURY by Jorge Uquillas' },
        };
        // So emitir data com a data real. O padrao anterior fabricava
        // 2026-09-01 para os 6 reviews, o que e violacao de spam do Google.
        if (r.date) review.datePublished = r.date;
        // Atribuicao do Google so entra com URL verificavel do perfil.
        if (source.businessProfileUrl) review.publisher = { '@type': 'Organization', name: source.platform, url: source.businessProfileUrl };
        return review;
      }),
    },
  ];

  return { '@context': 'https://schema.org', '@graph': node };
};

/**
 * Bloco de reviews em HTML puro, com estilos inline (nenhuma classe Tailwind:
 * o scanner do Tailwind nao enxerga strings geradas em plugin). Fica no
 * HTML inicial para crawlers que NAO executam JS (GPTBot, ClaudeBot,
 * PerplexityBot, etc.). Escondido via CSS quando o JS roda, porque o React
 * tambem renderiza a secao.
 */
const buildStaticBlock = (data: ReviewsData, locs: LocationsData, contact: ContactData) => {
  const { reviews, source } = data;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const items = reviews
    .map(
      (r) => `      <li itemscope itemtype="https://schema.org/Review" style="border-left:2px solid #C5A059;padding-left:12px;margin-bottom:18px">
        <p itemprop="reviewBody" style="color:#E8E3D6;font-size:15px;line-height:1.5;margin:0 0 6px">${esc(r.text)}</p>
        <span itemprop="author" itemscope itemtype="https://schema.org/Person" style="color:#C5A059;font-size:14px;font-style:italic">${esc(r.name)}</span>
        <span itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating" style="color:#6b6b6b;font-size:12px;margin-left:8px">${r.rating}<span itemprop="bestRating" hidden>5</span>/5</span>
      </li>`,
    )
    .join('\n');

  const cta = source.businessProfileUrl
    ? `\n      <p style="margin-top:20px"><a href="${esc(source.businessProfileUrl)}" rel="nofollow noopener" style="color:#C5A059">Read all verified reviews on Google</a></p>`
    : '';

  // Os iframes do Google Maps nao sao legiveis por crawlers nem por IAs: o
  // conteudo fica em google.com. Por isso os locais entram como texto aqui.
  // So entram dados confirmados, sem 'address', que ainda e null.
  const places = locs.locations
    .map((l) => {
      const where = [l.district, l.city, l.region, l.country].filter(Boolean).join(', ');
      return `      <li style="margin-bottom:8px"><strong style="color:#C5A059">${esc(l.label)}</strong> &mdash; ${esc(where)}</li>`;
    })
    .join('\n');

  return `<section class="seo-static-reviews" aria-labelledby="seo-reviews-heading" style="max-width:820px;margin:0 auto;padding:40px 24px">
    <h2 id="seo-reviews-heading" style="color:#E6CA85;font-size:22px;text-transform:uppercase;letter-spacing:.14em">What people say about Rings Luxury</h2>
    <p style="color:#8a8a8a;font-size:14px;margin:8px 0 28px">${avg} out of 5 &middot; ${reviews.length} verified client reviews</p>
    <ul style="list-style:none;padding:0;margin:0">
${items}
    </ul>${cta}
    <h2 style="color:#E6CA85;font-size:20px;text-transform:uppercase;letter-spacing:.14em;margin-top:40px">Visits in the physical workshop under schedule</h2>
    <p style="color:#8a8a8a;font-size:14px;margin:8px 0 20px">Private appointments by appointment.</p>
    <ul style="list-style:none;padding:0;margin:0">
${places}
    </ul>
    <h2 style="color:#E6CA85;font-size:20px;text-transform:uppercase;letter-spacing:.14em;margin-top:40px">Contact</h2>
    <ul style="list-style:none;padding:0;margin:0">
      <li style="margin-bottom:8px">Phone: <a href="tel:${esc(contact.phone)}" style="color:#C5A059">${esc(contact.phoneDisplay)}</a></li>
      <li style="margin-bottom:8px">Email: <a href="mailto:${esc(contact.email)}" style="color:#C5A059">${esc(contact.email)}</a></li>
      <li>Hours: ${esc(contact.hours.display)}, ${esc(contact.hours.displayDays)}</li>
    </ul>
  </section>`;
};

export function seoInject(): Plugin {
  let root = process.cwd();
  let siteUrl = '';

  return {
    name: 'ringsluxury-seo-inject',
    configResolved(config) {
      root = config.root;
      // loadEnv le .env, .env.production etc., mesma fonte que o
      // import.meta.env usado no app, entao nunca divergem.
      const env = loadEnv(config.mode, config.root, 'VITE_');
      siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');
    },

    transformIndexHtml() {
      const data = readReviews(root);
      const locs = readLocations(root);
      const contact = readContact(root);
      // Marca <html> como capable de JS antes da primeira pintura. Sem isso o
      // bloco estatico ficaria duplicado ao lado do React.
      const jsFlag: HtmlTagDescriptor = {
        tag: 'script',
        children: "document.documentElement.className+=' js'",
        injectTo: 'head-prepend',
      };

      const ld: HtmlTagDescriptor = {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(buildGraph(data, siteUrl, locs, contact)),
        injectTo: 'head',
      };

      const noJsCss: HtmlTagDescriptor = {
        tag: 'style',
        children: '.seo-static-reviews{display:none}html:not(.js) .seo-static-reviews{display:block}',
        injectTo: 'head',
      };

      const staticBlock: HtmlTagDescriptor = { tag: 'div', children: buildStaticBlock(data, locs, contact), injectTo: 'body' };

      // Resumo navegável só para quem está SEM JavaScript (crawlers simples,
      // leitores, navegadores com JS desligado). Não é texto escondido: o
      // <noscript> por definição só renderiza sem JS.
      const noJsNav: HtmlTagDescriptor = {
        tag: 'noscript',
        children: `<nav aria-label="RINGS LUXURY sections" style="max-width:820px;margin:0 auto;padding:24px"><h1 style="color:#E6CA85;font-size:24px">RINGS LUXURY by Jorge Uquillas, Luxury Rings, handcrafted 18k gold</h1><p style="color:#8a8a8a">1/1 handcrafted 18k gold diamond rings, hand-engraved. Atelier Brazil, Miami.</p><ul>${STATIC_ROUTES.map((r) => `<li><a href="${r}" style="color:#C5A059">${r}</a></li>`).join('')}</ul></nav>`,
        injectTo: 'body',
      };

      const tags: HtmlTagDescriptor[] = [jsFlag, noJsCss, ld, staticBlock, noJsNav];

      // Nao emitimos canonical aqui. O index.html e servido para TODA rota via
      // rewrite (vercel.json), entao um canonical fixo de '/' no HTML estatico
      // declarava /luxury-rings, /blog e todas as outras como duplicata da
      // home. O canonical por rota e emitido em runtime pelo <SEO>, que deriva
      // da pathname. Crawlers que nao executam JS ficam sem canonical, que e
      // o estado neutro correto, em vez de receberem um errado.

      return tags;
    },

    /**
     * robots.txt e sitemap.xml gerados em build para ficarem sempre em sync
     * com products.ts / blogPosts.ts. Nao emitimos <lastmod> porque nao temos
     * data confiavel de modificacao, omitir e melhor do que inventar.
     *
     * O sitemap so e emitido com dominio configurado: publicar <loc> apontando
     * para um host inexistente convida o Google a indexar URLs que nao
     * respondem.
     */
    async generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots(siteUrl || 'https://SEU-DOMINIO.com') });

      if (!siteUrl) return;

      const slugs = (file: string) => {
        const src = fs.readFileSync(path.resolve(root, file), 'utf-8');
        return [...src.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((m) => m[1]);
      };

      const urls = [
        ...STATIC_ROUTES,
        ...slugs('src/data/products.ts').map((s) => `/produto/${s}`),
        ...slugs('src/data/blogPosts.ts').map((s) => `/blog/${s}`),
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${siteUrl}${u}</loc></url>`).join('\n')}
</urlset>
`;

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });

      // IndexNow: avisa Bing/Yandex sobre as URLs a cada build de produção.
      // A chave e verificada pelo arquivo public/<chave>.txt (vai para dist/).
      // Falha de rede nunca quebra o build.
      const INDEXNOW_KEY = 'd3c59e041d774eb193020a68ad60b6bd8626ae04b4f74983a6bebdddca56b4fd';
      try {
        const host = siteUrl.replace(/^https?:\/\//, '');
        const res = await fetch('https://api.indexnow.org/indexnow.json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            host,
            key: INDEXNOW_KEY,
            keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
            urlList: urls.map((u) => `${siteUrl}${u}`),
          }),
        });
        console.log(`[seo-inject] IndexNow: ${res.status} (${urls.length} urls)`);
      } catch {
        console.log('[seo-inject] IndexNow: envio pulado (sem rede)');
      }
    },
  };
}

export default seoInject;
