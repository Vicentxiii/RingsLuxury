import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
}

export function SEO({ title, description, keywords, url, image }: SEOProps) {
  const siteUrl = 'https://ringsluxury.com';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  
  const seoTitle = `${title} | RINGS LUXURY | JORGE UQUILLAS`;
  
  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image || defaultImage} />
      
      {/* Schema.org for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          "name": "RINGS LUXURY",
          "founder": {
            "@type": "Person",
            "name": "Jorge Uquillas"
          },
          "description": description,
          "url": siteUrl,
          "image": image || defaultImage,
          "priceRange": "$$$$"
        })}
      </script>
    </Helmet>
  );
}
