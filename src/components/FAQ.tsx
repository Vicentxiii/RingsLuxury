import React from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ answer-first: resposta direta nas 2 primeiras frases, detalhes depois.
 * Emite FAQPage em JSON-LD (válido quando o bloco está visível na página).
 */
export function FAQ({ items, heading }: { items: FaqItem[]; heading: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section aria-label={heading} className="max-w-3xl mx-auto mt-20 md:mt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="font-cinzel text-[#E6CA85] text-lg sm:text-xl tracking-[0.16em] uppercase text-center mb-8">
        {heading}
      </h2>
      <div className="space-y-3">
        {items.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-[#C5A059]/25 bg-[#020202]/65 px-5 py-4 open:border-[#C5A059]/60 transition-colors"
          >
            <summary className="cursor-pointer list-none font-cormorant text-lg text-[#F3EFE6] flex items-center justify-between gap-4 marker:hidden">
              <span>{f.q}</span>
              <span className="text-[#C5A059] text-xl leading-none group-open:rotate-45 transition-transform" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[#A8A296]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
