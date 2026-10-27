import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';

/** Ultima revisao editorial da Home, mostrada e declarada no JSON-LD. */
const PAGE_UPDATED = '2026-10-17';

/**
 * Respostas diretas na Home em formato FAQ Accordion (Clique para revelar).
 */
interface QA {
  id: string;
  q: string;
  a: string;
  /** Complemento opcional, abaixo da resposta direta. */
  detail?: string;
  link?: { to: string; label: string };
}

const QUESTIONS: QA[] = [
  {
    id: 'quanto-custa-anel-ouro-18k',
    q: 'How much does a handmade 18k gold ring cost?',
    a: 'A handcrafted 18k gold diamond ring by Jorge Uquillas starts at US$ 4,800, and the Emperor collection runs between US$ 4,800 and US$ 28,000. Mixed gold and silver rings start at US$ 3,500 and sterling silver rings at US$ 1,500; necklaces reach US$ 150,000 for the Rhino.',
    detail:
      'Every ring is drawn for one client, so the price of a bespoke piece is always confirmed in writing before any deposit, never quoted from a list.',
    link: { to: '/emperor-rings', label: 'See the Emperor collection' },
  },
  {
    id: 'quanto-tempo-leva-para-fazer',
    q: 'How long does it take to make a handmade gold ring?',
    a: 'A piece is made to order in 60 days from the first 50% payment, and 90 to 140 hours of that is hand engraving alone, cut into the solid metal with tempered-steel gravers.',
    detail:
      'Is it worth planning a date? Tell the atelier at consultation, before the gold is cast, and the timeline is planned around it.',
    link: { to: '/luxury-rings-guide', label: 'Read the buying guide' },
  },
  {
    id: 'anel-feito-a-mao-ou-pronto',
    q: 'Is it really handmade, or is it a cast replica?',
    a: 'It is 1/1, one of one: the original wax matrix is destroyed after casting, so no mould or replica of your ring can ever be made. There is no stock and no second copy.',
    detail:
      'The engraving is cut directly into the solid 18k gold, never by laser or machine, and each piece leaves with a master hallmark micro-engraved in the metal, an archival folio and a certificate of authenticity.',
    link: { to: '/jorge-uquillas', label: 'Meet Jorge Uquillas' },
  },
  {
    id: 'diamante-real-ou-falso',
    q: 'Are the diamonds real, and how can I tell?',
    a: 'Every stone is a hand-selected natural diamond, chosen for fire and clarity, weighed and set one by one under the microscope. No lab-grown stones are used.',
    detail:
      'Seven tests separate a natural diamond from an imitation, from the fog test to the UV glow and the diamond tester: see the full guide.',
    link: { to: '/blog/how-to-tell-if-your-diamonds-are-real-or-fake', label: 'The 7 tests explained' },
  },
  {
    id: 'envio-seguro-internacional',
    q: 'Do you ship internationally, and is it insured?',
    a: 'Yes, to clients in over 50 countries. Every commission travels door to door under full insurance for the declared value, tracked and with mandatory signature, in a hand-worked varnished wooden box inside neutral outer packaging.',
    detail: 'Shipping is included on commissions above US$ 5,000.',
    link: { to: '/shipping', label: 'Shipping and insurance' },
  },
  {
    id: 'garantia-e-pos-venda',
    q: 'What happens after the piece arrives?',
    a: 'A lifetime warranty covers manufacturing defects in the metal, the hand engraving and the settings, and includes one hand polish per year by appointment.',
    detail:
      'Never machine-buff a hand-engraved ring: aggressive polishing rounds the crisp classical edges the hand engraver created. That is why the polish is done at the atelier, by hand.',
    link: { to: '/warranty', label: 'Read the warranty' },
  },
];

export function HomeDirectAnswers() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="respostas-diretas"
      className="relative py-24 md:py-32 px-6 bg-[#020202]"
    >
      {/* FAQPage Schema para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#faq` } : {}),
            dateModified: PAGE_UPDATED,
            author: HAS_SITE_URL
              ? { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` }
              : { '@type': 'Person', name: 'Jorge Uquillas' },
            publisher: HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#organization` } : undefined,
            mainEntity: QUESTIONS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.detail ? `${f.a} ${f.detail}` : f.a },
            })),
          }),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <h2
          id="respostas-diretas"
          className="font-cinzel text-3xl md:text-4xl text-[#E6CA85] tracking-wide text-center mb-4"
        >
          What clients ask before they commission
        </h2>
        <p className="font-cormorant text-xl text-[#A8A296] text-center leading-relaxed mb-3">
          Direct answers, with the real numbers of the atelier: price, time, method, shipping and
          warranty.
        </p>
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#9A7B38] text-center mb-12">
          Prices updated {PAGE_UPDATED} · metal purity per ISO 8653 · stones graded per GIA
        </p>

        {/* ── FAQ ACCORDION (Clique para revelar a resposta) ── */}
        <div className="space-y-3.5">
          {QUESTIONS.map((f) => {
            const isOpen = openId === f.id;

            return (
              <div
                key={f.id}
                id={f.id}
                className={`scroll-mt-28 rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#C5A059]/70 bg-[#070707] shadow-[0_4px_24px_rgba(197,160,89,0.12)]'
                    : 'border-[#C5A059]/25 bg-[#050505]/60 hover:border-[#C5A059]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(f.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`font-cinzel text-base md:text-lg leading-snug transition-colors ${
                      isOpen ? 'text-[#E6CA85]' : 'text-[#F3EFE6] hover:text-[#E6CA85]'
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#E6CA85] rotate-180'
                        : 'border-[#C5A059]/30 text-[#C5A059] rotate-0'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[#A8A296] font-cormorant text-lg leading-relaxed border-t border-[#C5A059]/15 animate-in fade-in duration-300">
                    <p className="text-[#EDE8DB]">{f.a}</p>
                    {f.detail && <p className="mt-2 text-[#C2BDB2]">{f.detail}</p>}
                    {f.link && (
                      <Link
                        to={f.link.to}
                        className="inline-block mt-3 text-[10px] uppercase tracking-[0.2em] text-[#C5A059] hover:text-[#E6CA85] transition-colors"
                      >
                        {f.link.label} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumo de fechamento */}
        <div className="mt-14 border border-[#C5A059]/25 bg-[#050505]/50 p-7 md:p-9 rounded-2xl">
          <h3 className="font-cinzel text-sm uppercase tracking-[0.24em] text-[#C5A059] mb-4">
            In short
          </h3>
          <p className="font-cormorant text-lg leading-relaxed text-[#D8D2C4]">
            RINGS LUXURY makes 1/1 handmade 18k gold rings, cast solid and hand-engraved for 90
            to 140 hours, with hand-selected natural diamonds set one by one. They start at
            US$ 4,800, take 60 days from the first 50% payment, ship insured door to door
            worldwide and carry a lifetime warranty.
          </p>
          <p className="font-cormorant text-lg leading-relaxed text-[#A8A296] mt-3">
            The next step is a private consultation in São Paulo or Miami, or by video from
            anywhere.
          </p>
        </div>

        {/* Assinatura */}
        <p className="font-cormorant text-lg text-[#D8D2C4] text-center mt-12">
          Written by <span className="text-[#C5A059]">Jorge Uquillas</span>, master goldsmith and
          hand engraver, founder of RINGS LUXURY.
        </p>
      </div>
    </section>
  );
}

export default HomeDirectAnswers;