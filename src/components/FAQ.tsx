import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ accordion: pergunta visível com seta, resposta oculta até o clique.
 * Todas as respostas fechadas por padrão — melhora LCP.
 *
 * JSON-LD FAQPage mantido integralmente para SEO/rich results.
 */
export function FAQ({ items, heading }: { items: FaqItem[]; heading: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        {items.map((f, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={f.q}
              className={`rounded-xl border bg-[#020202]/65 transition-colors duration-300 ${
                isOpen ? 'border-[#C5A059]/60' : 'border-[#C5A059]/25 hover:border-[#C5A059]/40'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full px-5 py-4 cursor-pointer font-cormorant text-lg text-[#F3EFE6] flex items-center justify-between gap-4 text-left"
              >
                <span>{f.q}</span>
                <span
                  className={`text-[#C5A059] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  <ChevronDown className="w-5 h-5" />
                </span>
              </button>

              {/* Resposta — só renderiza no DOM quando aberta, para não pesar no LCP */}
              {isOpen && (
                <div
                  className="px-5 pb-5 text-sm leading-relaxed text-[#A8A296] animate-[faqOpen_0.25s_ease-out]"
                >
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes faqOpen {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default FAQ;
