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
  /** Páginas que não devem ser indexadas (404, carrinho) */
  noindex?: boolean;
}

export function SEO({ title, description, url, image, noindex }: SEOProps) {
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
  const ogImage = image || defaultImage;

  const seoTitle = `${title} | RINGS LUXURY`;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
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
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter, usa name=, não property= (property é ignorado aqui) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Schema.org for Google, HandCrafted anéis artesanais */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          "name": "RINGS LUXURY by Jorge Uquillas",
          "founder": {
            "@type": "Person",
            "name": "Jorge Uquillas"
          },
          "description": description,
          "url": canonical,
          ...(ogImage ? { image: ogImage } : {}),
          "priceRange": "$$$$",
          "keywords": "RINGS LUXURY, Jorge Uquillas, anéis artesanais, HandCrafted, ouro 18k, handmade 18k gold diamond rings, hand engraver",
          "knowsAbout": ["HandCrafted jewelry", "Anéis artesanais ouro 18k", "Hand engraving", "High jewelry atelier"]
        })}
      </script>
    </Helmet>
  );
}
