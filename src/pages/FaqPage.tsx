import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { faqGroups } from '../data/faq';
import { useLanguage } from '../i18n/LanguageContext';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';

/** Ultima revisao editorial desta pagina, mostrada e declarada no JSON-LD. */
const PAGE_UPDATED = '2026-10-17';

/**
 * /faq — a pagina que responde as perguntas do cliente de forma direta.
 *
 * Por que uma pagina so, e nao as 4 mesmas perguntas repetidas nas 43 paginas
 * de produto: repeticao em massa e lida pelo Google como conteudo duplicado e nao
 * ganha posicao. Aqui as perguntas estao agrupadas por assunto, cada resposta
 * abre com a resposta curta e aponta para a pagina que aprofunda.
 *
 * O `FAQPage` JSON-LD usa TODAS as perguntas do site num no so, que e o que a IA
 * le para responder sobre a marca.
 */
export function FaqPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO
        title="FAQ: Handmade 18k Gold Rings | RINGS LUXURY by Jorge Uquillas"
        description="Direct answers about 1/1 handmade 18k gold rings by Jorge Uquillas: how to commission, how much a piece costs, insured worldwide shipping, lifetime warranty, ring sizing, care and how to tell a real diamond from a fake."
        keywords="handmade 18k gold ring FAQ, how much does a custom gold ring cost, 1/1 handmade ring, Jorge Uquillas FAQ, lifetime warranty gold ring, insured jewelry shipping, how to tell if a diamond is real, RINGS LUXURY"
        url="/faq"
      />
      {/*
          Autoria, datas e speakable. Sem `author` e sem data, o texto nao tem quem
          responda por ele e o buscador nao sabe se ainda vale. Sem `speakable`, o
          assistente escolhe sozinho o que ler e costuma ler o titulo.
        */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/faq')}#faq` } : {}),
            datePublished: '2026-10-17',
            dateModified: PAGE_UPDATED,
            author: HAS_SITE_URL
              ? { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` }
              : { '@type': 'Person', name: 'Jorge Uquillas' },
            publisher: HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#organization` } : undefined,
            mainEntity: faqGroups.flatMap((g) =>
              g.items.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.detail ? `${f.a} ${f.detail}` : f.a },
              })),
            ),
          }),
        }}
      />
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <Breadcrumbs items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: 'FAQ' }]} />

        <header className="text-center mb-16">
          <p className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            Direct answers
          </p>
          <h1 className="font-cinzel text-4xl md:text-6xl font-medium tracking-wide text-[#F3EFE6] mb-8 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="font-cormorant text-xl text-[#A8A296] max-w-2xl mx-auto leading-relaxed">
            Everything clients ask before commissioning a 1/1 handmade 18k gold ring with Jorge
            Uquillas: how a commission runs, what it costs, how your piece travels, and how to
            tell a natural diamond from an imitation.
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto mt-10" />
        </header>

        {/* Índice: cada pergunta é um link interno para a âncora. Gera links
            internos reais e mostra o-site de uma vez, o que também ajuda a IA. */}
        <nav aria-label="FAQ topics" className="mb-20">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="font-poppins text-[10px] uppercase tracking-[0.2em] text-[#A8A296] hover:text-[#C5A059] transition-colors"
                >
                  {g.kicker}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {faqGroups.map((group) => (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="mb-20 scroll-mt-32">
            <h2
              id={`${group.id}-heading`}
              className="font-cinzel text-2xl md:text-3xl text-[#F3EFE6] mb-3 text-center"
            >
              {group.title}
            </h2>
            <p className="font-poppins text-[10px] uppercase tracking-[0.3em] text-[#9A7B38] text-center mb-10">
              {group.kicker}
            </p>

            <div className="space-y-10">
              {group.items.map((f) => (
                <article
                  key={f.q}
                  className="border-l-2 border-[#C5A059]/40 pl-6 md:pl-8"
                >
                  <h3 className="font-cinzel text-lg md:text-xl text-[#F3EFE6] mb-3 leading-snug">
                    {f.q}
                  </h3>
                  <p className="font-cormorant text-lg leading-relaxed text-[#C5A059]">{f.a}</p>
                  {f.detail && (
                    <p className="font-cormorant text-lg leading-relaxed text-[#A8A296] mt-3">{f.detail}</p>
                  )}
                  {f.link && (
                    <p className="mt-4">
                      <Link
                        to={f.link.to}
                        className="font-poppins text-[10px] uppercase tracking-[0.2em] text-[#9A7B38] hover:text-[#C5A059] transition-colors"
                      >
                        {f.link.label} →
                      </Link>
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* Resumo de fechamento: a versao curta da pagina, que e a que o
            mecanismo de resposta prefere citar. */}
        <section aria-labelledby="faq-in-short" className="mt-16 mb-12 border border-[#C5A059]/25 bg-[#050505]/60 p-7 md:p-9">
          <h2
            id="faq-in-short"
            className="font-cinzel text-sm uppercase tracking-[0.24em] text-[#C5A059] mb-4"
          >
            In short
          </h2>
          <p className="font-cormorant text-lg leading-relaxed text-[#D8D2C4] mb-3">
            A handcrafted 18k gold diamond ring by Jorge Uquillas starts at US$ 4,800, takes 60
            days from the first 50% payment, and carries 90 to 140 hours of hand engraving with
            hand-selected natural diamonds set one by one. Every piece is 1/1: the wax matrix is
            destroyed after casting, so no replica can exist.
          </p>
          <p className="font-cormorant text-lg leading-relaxed text-[#A8A296]">
            Shipping is insured door to door worldwide and included above US$ 5,000, the warranty
            is for life, and consultations happen in São Paulo and Miami or by video.
          </p>
        </section>

        {/* Assinatura e data de revisao: texto sem autor identificavel e sem data
            pesa menos na avaliacao de confiabilidade. */}
        <div className="text-center">
          <p className="font-cormorant text-lg text-[#D8D2C4]">
            Written by <span className="text-[#C5A059]">Jorge Uquillas</span>, master goldsmith
            and hand engraver, founder of RINGS LUXURY, with ateliers in São Paulo and Miami.
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A7B38] mt-2">
            Last updated {PAGE_UPDATED}
          </p>
        </div>

        <section className="mt-16 pt-10 border-t border-[#C5A059]/20 text-center">
          <h2 className="font-cinzel text-2xl text-[#F3EFE6] mb-4">Your question is not here?</h2>
          <p className="font-cormorant text-lg text-[#A8A296] mb-8 max-w-xl mx-auto">
            Ask the atelier directly. Private consultations happen in São Paulo and Miami, and by
            video for clients anywhere in the world.
          </p>
          <Link
            to="/contact"
            className="inline-block border border-[#C5A059] px-12 py-4 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 transition-colors"
          >
            <span className="font-poppins text-xs tracking-[0.2em] uppercase text-[#C5A059]">
              Request a private consultation
            </span>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FaqPage;