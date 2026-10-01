import React from 'react';
import { Link } from 'react-router-dom';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to && HAS_SITE_URL ? { item: absoluteUrl(c.to) } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#9A7B38]">
          {items.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-[#C5A059]/40" aria-hidden>
                  /
                </span>
              )}
              {c.to ? (
                <Link to={c.to} className="hover:text-[#C5A059] transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-[#C5A059]" aria-current="page">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
