/**
 * Pré-renderização das rotas públicas com renderToString.
 *
 * POR QUE ISTO EXISTE
 * O site é um SPA Vite. Sem este passo, TODAS as URLs entregam o mesmo HTML
 * (mesmo title, mesma description, mesmo canonical ausente) e só ganham
 * conteúdo depois que o JavaScript roda. Googlebot até executa JS, mas
 * WhatsApp, LinkedIn, GPTBot, ClaudeBot e PerplexityBot não.
 *
 * POR QUE SSR, E NÃO PUPPETEER
 * A versão anterior abria o site no Chrome e salvava o DOM com createRoot.
 * Esse HTML parece pronto, mas não tem os separadores de texto (`<!-- -->`)
 * nem os marcadores de Suspense que o React espera. Na hidratação, o React
 * comparava "By Jorge Uquillas" com os nós "By" + " " + "Jorge Uquillas",
 * descartava a árvore e repintava o hero (LCP de 8 s). O renderToString produz
 * o HTML no mesmo formato que hydrateRoot consome.
 *
 * O QUE FAZ
 * 1. Importa o bundle de SSR (`dist-server/entry-server.js`).
 * 2. Renderiza cada rota e separa o <head> (title/meta/link) do corpo.
 * 3. Injeta esse head e o corpo no HTML base do Vite, sem duplicar tags.
 * 4. Salva `dist/<rota>/index.html` e `dist/404.html`.
 *
 * O `vercel.json` não tem rewrite catch-all: cada rota é um arquivo estático
 * real; URL inexistente cai no 404.html com status 404.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const DIST = path.resolve(process.cwd(), 'dist');
const SERVER_ENTRY = path.resolve(process.cwd(), 'dist-server/entry-server.js');

const STATIC_ROUTES = [
  '/',
  '/collections',
  '/luxury-rings',
  '/emperor-rings',
  '/special-editions',
  '/gold-silver-rings',
  '/necklaces',
  '/luxuryqueens',
  '/courses',
  '/contact',
  '/blog',
  '/faq',
  '/gallery',
  '/luxury-rings-guide',
  '/jorge-uquillas',
  '/hand-engraving',
  '/cart',
  '/privacy',
  '/terms',
  '/shipping',
  '/returns',
  '/warranty',
  '/404',
];

const readSlugs = async (file) => {
  const src = await fs.readFile(path.resolve(process.cwd(), file), 'utf8');
  return [...src.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((m) => m[1]);
};

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Marca as tags que o Helmet recria no cliente. `main.tsx` remove essas tags
 * antes da hidratação para não duplicar title/canonical/OG. Preloads ficam:
 * são do React 19 e não são recriados da mesma forma na hidratação.
 */
const addPrerenderMarker = (tag) => {
  if (/data-prerender=/i.test(tag) || /\brel="preload"/i.test(tag)) return tag;
  const name = tag.match(/^<([a-z0-9-]+)/i)?.[1];
  if (!name) return tag;
  return tag.replace(new RegExp(`<${name}\\b`, 'i'), `<${name} data-prerender="true"`);
};

const markHeadTags = (head) =>
  head
    // O React 19 pré-carrega no <head> todas as imagens que encontra no SSR,
    // inclusive as lazy abaixo da dobra. Isso disputa banda com o hero e atrasa
    // o LCP. A própria tag <img> já é descoberta pelo parser; deixamos só ela.
    .replace(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, addPrerenderMarker)
    .replace(/<meta\b[^>]*>/gi, addPrerenderMarker)
    .replace(/<link\b[^>]*>/gi, addPrerenderMarker);

/**
 * Remove do HTML base as tags que o SSR agora fornece por rota. Sem isso, a
 * home continuaria com title/canonical/OG estáticos em todas as URLs.
 */
const stripStaticSeo = (html) =>
  html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(
      /<meta\b[^>]*(?:name|property)="(?:description|robots|keywords|twitter:[^"]+|og:[^"]+|article:[^"]+)"[^>]*>/gi,
      '',
    )
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="alternate"[^>]*hreflang=[^>]*>/gi, '');

const writeRoute = async (route, html) => {
  const relative = route === '/' ? '' : route.replace(/^\/+|\/+$/g, '');
  const dir = relative ? path.join(DIST, relative) : DIST;
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), html, 'utf8');
};

const main = async () => {
  const baseHtml = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
  const { render } = await import(pathToFileURL(SERVER_ENTRY).href);

  const routes = [
    ...STATIC_ROUTES,
    ...(await readSlugs('src/data/products.ts')).map((slug) => `/produto/${slug}`),
    ...(await readSlugs('src/data/blogPosts.ts')).map((slug) => `/blog/${slug}`),
  ];
  const uniqueRoutes = [...new Set(routes)];

  let done = 0;
  for (const route of uniqueRoutes) {
    const { html: body, head } = render(route);
    if (!body || body.length < 50) {
      throw new Error(`[prerender] corpo vazio em ${route}`);
    }

    const markedHead = markHeadTags(head);
    let html = stripStaticSeo(baseHtml).replace(
      '</head>',
      `    ${markedHead}\n  </head>`,
    );

    // hreflang é injetado aqui, não pelo Helmet: ele só permite um link
    // rel="alternate" por página. O Google lê estes quatro no HTML inicial.
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    const noindex = /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html);
    if (canonical && !noindex) {
      const [base, hash = ''] = canonical.split('#');
      const withLang = (lang) => `${base}${base.includes('?') ? '&' : '?'}lang=${lang}${hash}`;
      const links = [
        ['x-default', canonical],
        ['en', canonical],
        ['es', withLang('es')],
        ['pt', withLang('pt')],
      ]
        .map(
          ([lang, href]) =>
            `<link data-prerender="true" rel="alternate" hreflang="${lang}" href="${href}">`,
        )
        .join('\n    ');
      html = html.replace('</head>', `    ${links}\n  </head>`);
    }

    html = html.replace(
      '<div id="root"></div>',
      () => `<div id="root">${body}</div>`,
    );

    if (!html.includes(`<div id="root">`)) {
      throw new Error(`[prerender] #root não encontrado no HTML base de ${route}`);
    }

    if (route === '/404') {
      await fs.writeFile(path.join(DIST, '404.html'), html, 'utf8');
    }
    await writeRoute(route, html);
    done += 1;

    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '(sem título)';
    console.log(
      `[prerender] ${String(done).padStart(2, '0')}/${uniqueRoutes.length} ${route} -> ${title.slice(0, 72)}`,
    );
  }

  console.log('[prerender] concluído.');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
