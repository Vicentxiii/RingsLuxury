import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';

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

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

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

      {/* Schema.org for Google, HandCrafted anéis artesanais.
          Telefone/email/horário vêm de src/data/contact.json (NAP único).
          Endereço entra aqui quando houver endereço real confirmado. */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          "name": "RINGS LUXURY by Jorge Uquillas",
          "founder": {
            "@type": "Person",
            "name": "Jorge Uquillas",
            "jobTitle": "Master Goldsmith and Hand Engraver",
            "url": HAS_SITE_URL ? absoluteUrl('/jorge-uquillas') : undefined,
          },
          "description": description,
          "url": canonical,
          ...(ogImage ? { image: ogImage } : {}),
          "priceRange": "$$$$",
          "telephone": "+5511977240777",
          "email": "uquillasartjewells@gmail.com",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "10:00",
            "closes": "19:00",
          },
          "areaServed": [
            { "@type": "City", "name": "São Paulo" },
            { "@type": "City", "name": "Miami" },
          ],
          "sameAs": ["https://www.instagram.com/ringsluxury"],
          "keywords": "RINGS LUXURY, Jorge Uquillas, anéis artesanais, HandCrafted, ouro 18k, handmade 18k gold diamond rings, hand engraver",
          "knowsAbout": ["HandCrafted jewelry", "Anéis artesanais ouro 18k", "Hand engraving", "High jewelry atelier"]
        })}
      </script>
    </Helmet>
  );
}
