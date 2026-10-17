import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';
import contact from '../data/contact.json';
import locationsData from '../data/locations.json';

/**
 * Corta em fronteira de palavra, sem deixar pontuação solta.
 * `slice(0, n)` puro corta no meio da palavra e produz "anel de ouro 18k..." que
 * o Google re-corta e vira lixo no resultado.
 */
function truncateAtWord(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  const base = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${base.replace(/[\s,;:.!-]+$/, '')}…`;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  /** Páginas que não devem ser indexadas (404, carrinho) */
  noindex?: boolean;
  /** Artigo/blog: gera og:type=article + article:published_time */
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  articleSection?: string;
}

export function SEO({ title, description, keywords, url, image, imageAlt, noindex, publishedTime, modifiedTime, author, articleSection }: SEOProps) {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  // Canonical por rota. Sem `url` explicito, usa a propria pathname da rota
  // atual, antes o fallback era '/', o que fazia o Google tratar /luxury-rings,
  // /blog, /courses e mais 5 paginas como duplicata da home.
  const route = url ?? pathname;
  // Normaliza barras: '/' na raiz, sem barra final nas demais rotas.
  const path = route.length > 1 ? route.replace(/\/+$/, '') : '/';
  // EN (padrão) canonicaliza limpo; ES/PT usam ?lang= (URLs reais, lidas pelo
  // LanguageContext), cada idioma com self-canonical + hreflang bidirecional.
  const canonical = absoluteUrl(lang === 'en' ? path : `${path}?lang=${lang}`);
  const canonicalEn = absoluteUrl(path);
  // Sem domínio configurado não há imagem absoluta confiável; og:image
  // apontando para um host errado é pior que omitir.
  const defaultImage = HAS_SITE_URL ? absoluteUrl('/og-image.jpg') : undefined;
  const ogImage = image
    ? (image.startsWith('http') ? image : absoluteUrl(image))
    : defaultImage;
  const isDefaultImage = !image || ogImage === defaultImage;
  const ogImageAlt = imageAlt ?? `${title} by Jorge Uquillas, RINGS LUXURY`;
  const isArticle = Boolean(publishedTime);

  const seoTitle = `${title} | RINGS LUXURY`;

  /*
    Teto de caracteres do title.
    O Google trunca por pixels (~600px), nao por caracteres, e o resultado muda
    com a fonte e com o device. 60 caracteres e o limite seguro para nao sobrar
    reticencias no mobile, que e onde a taxa de clique e decidedora. Cortar em
    fronteira de palavra: title cortado no meio de palavra sinaliza pagina mal
    montada e ocupa o mesmo numero de pixels sem informar nada.
  */
  const TITLE_MAX = 60;
  const finalTitle =
    seoTitle.length <= TITLE_MAX
      ? seoTitle
      : `${truncateAtWord(title, TITLE_MAX - ' | RINGS LUXURY'.length)} | RINGS LUXURY`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={truncateAtWord(description, 158)} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        // max-image-preview:large libera a imagem grande no resultado e
        // max-snippet:-1 libera o texto completo: sem isso o Google recorta o
        // titulo em 160 caracteres e esconde o preview da foto, o que mata a
        // taxa de clique de uma loja de joias, cuja venda e visual.
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Canonical por rota. Sem domínio definido, fica omitido de propósito. */}
      {HAS_SITE_URL && <link rel="canonical" href={canonical} />}

      {/* hreflang EN/ES/PT + x-default: evita duplicata entre idiomas */}
      {HAS_SITE_URL && !noindex && (
        <>
          <link rel="alternate" hrefLang="x-default" href={canonicalEn} />
          <link rel="alternate" hrefLang="en" href={canonicalEn} />
          <link rel="alternate" hrefLang="es" href={absoluteUrl(`${path}?lang=es`)} />
          <link rel="alternate" hrefLang="pt" href={absoluteUrl(`${path}?lang=pt`)} />
        </>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="RINGS LUXURY" />
      {/*
        og:locale precisa casar com o idioma da URL, e nao com o padrao en: o
        WhatsApp e o Facebook mostram o pre-visualizacao errada quando o locale
        nao bate com o hreflang da mesma pagina.
      */}
      <meta property="og:locale" content={lang === 'pt' ? 'pt_BR' : lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta property="og:locale:alternate" content="pt_BR" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && isDefaultImage && <meta property="og:image:width" content="1200" />}
      {ogImage && isDefaultImage && <meta property="og:image:height" content="630" />}
      {ogImage && <meta property="og:image:alt" content={ogImageAlt} />}
      {isArticle && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {isArticle && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {isArticle && author && <meta property="article:author" content={author} />}
      {isArticle && articleSection && <meta property="article:section" content={articleSection} />}

      {/* Twitter, usa name=, não property= (property é ignorado aqui) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogImage && <meta name="twitter:image:alt" content={ogImageAlt} />}

      {/*
        Grafo de Entidade + WebPage.

        ANTES este bloco emitia um "JewelryStore" STANDALONE em cada uma das ~63
        URLs, com `url` variando por pagina. Isso declarava a mesma empresa como
        duas entidades distintas (esta e a `Organization` do HTML estatico de
        build) e pulverizava o sinal em 16+ URLs diferentes: e exatamente o
        padrao que derruba Confianca/Autoridade, porque o Google nao consegue
        decidir qual bloco descreve o negocio.

        AGORA o bloco so descreve a PAGINA (WebPage/CollectionPage) e o negocio
        vem por REFERENCIA (@id). A identidade unica e montada uma vez no HTML
        estatico, pela buildGraph() do vite-plugin-seo-inject.ts, que le o mesmo
        contact.json e locations.json. Zero divergencia possivel.
      */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': ['WebPage', 'CollectionPage'],
              ...(HAS_SITE_URL ? { '@id': `${absoluteUrl(path)}#webpage` } : {}),
              url: canonical,
              name: seoTitle,
              description,
              inLanguage: lang,
              ...(HAS_SITE_URL
                ? {
                    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
                    about: { '@id': `${absoluteUrl('/')}#organization` },
                    breadcrumb: { '@id': `${absoluteUrl(path)}#breadcrumb` },
                  }
                : {}),
              ...(ogImage ? { primaryImageOfPage: { '@type': 'ImageObject', url: ogImage, ...(ogImageAlt ? { caption: ogImageAlt } : {}) } } : {}),
            },
            {
              // Referencia a loja: declara que o negocio existe, sem duplicar a
              // entidade nem inventar URL por pagina.
              '@type': 'JewelryStore',
              ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#store` } : {}),
              name: 'RINGS LUXURY by Jorge Uquillas',
              url: HAS_SITE_URL ? absoluteUrl('/') : '/',
              ...(HAS_SITE_URL ? { parentOrganization: { '@id': `${absoluteUrl('/')}#organization` } } : {}),
            },
          ],
        })}
      </script>

      {/*
        Schema.org para Google, HandCrafted aneis artesanais.
        NAP (telefone/email/horario) vem de src/data/contact.json (NAP unico).
        `url` e a home FIXA, nunca a URL da pagina: see o comentario do grafo
        acima. `address` so entra com dado real em locations.json.
      */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'JewelryStore',
          ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#store` } : {}),
          name: 'RINGS LUXURY by Jorge Uquillas',
          legalName: 'RINGS LUXURY by Jorge Uquillas',
          alternateName: ['RINGS LUXURY', 'Rings Luxury', 'RINGS LUXURY ATELIER'],
          url: HAS_SITE_URL ? absoluteUrl('/') : '/',
          ...(HAS_SITE_URL ? { parentOrganization: { '@id': `${absoluteUrl('/')}#organization` } } : {}),
          founder: {
            '@type': 'Person',
            '@id': HAS_SITE_URL ? `${absoluteUrl('/jorge-uquillas')}#jorge` : undefined,
            name: 'Jorge Uquillas',
            jobTitle: 'Master Goldsmith and Hand Engraver',
            ...(HAS_SITE_URL ? { url: absoluteUrl('/jorge-uquillas') } : {}),
          },
          ...(HAS_SITE_URL ? { logo: absoluteUrl(contact.logo ?? '/PUBLIC/logo-novo-rings-luxury.webp') } : {}),
          description:
            'Atelier of haute joaillerie HandCrafted by Jorge Uquillas: 1/1 handmade 18k gold diamond rings and necklaces, hand-engraved with hand gravers, at São Paulo and Miami ateliers.',
          image: ogImage,
          priceRange: "$$$$",
          currenciesAccepted: 'USD, BRL',
          telephone: contact.phone,
          email: contact.email,
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: contact.hours.days.map((d) => `https://schema.org/${d}`),
            opens: contact.hours.opens,
            closes: contact.hours.closes,
          },
          areaServed: locationsData.locations.map((l) => ({
            '@type': 'City',
            name: l.city,
            ...(l.region ? { addressRegion: l.region } : {}),
            ...(l.countryCode ? { addressCountry: l.countryCode } : {}),
          })),
          // Nos dois atelieis. `address` so entra quando locations.json tiver o
          // endereco real: postcode/logradouro ficticio em markup e o caminho
          // mais curto para acao manual do Google.
          location: locationsData.locations.map((l) => ({
            '@type': 'Place',
            name: l.label,
            address: {
              '@type': 'PostalAddress',
              ...(l.district ? { streetAddress: l.district } : {}),
              addressLocality: l.city,
              ...(l.region ? { addressRegion: l.region } : {}),
              addressCountry: l.countryCode,
            },
          })),
          sameAs: contact.sameAs,
          keywords: contact.keywords,
          knowsAbout: ['HandCrafted jewelry', 'Hand engraving', '18k solid gold rings', 'Natural diamonds', 'High jewelry atelier', 'Haute joaillerie', 'One of one rings'],
          ...(HAS_SITE_URL ? { hasMerchantReturnPolicy: absoluteUrl('/returns') } : {}),
          ...(HAS_SITE_URL ? { hasShippingPolicy: absoluteUrl('/shipping') } : {}),
        })}
      </script>
    </Helmet>
  );
}
