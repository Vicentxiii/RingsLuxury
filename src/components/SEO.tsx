import React from 'react';
import { Helmet } from 'react-helmet-async';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
}

export function SEO({ title, description, keywords, url, image }: SEOProps) {
  const canonical = url ? absoluteUrl(url) : absoluteUrl('/');
  // Sem domínio configurado não há imagem absoluta confiável; og:image
  // apontando para um host errado é pior que omitir.
  const defaultImage = HAS_SITE_URL ? absoluteUrl('/og-image.jpg') : undefined;
  const ogImage = image || defaultImage;

  const seoTitle = `${title} | RINGS LUXURY | JORGE UQUILLAS`;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical por rota. Sem domínio definido, fica omitido de propósito. */}
      {HAS_SITE_URL && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter — usa name=, não property= (property é ignorado aqui) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Schema.org for Google — HandCrafted anéis artesanais */}
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
