import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQ } from '../components/FAQ';
import { useLanguage } from '../i18n/LanguageContext';

export function LuxuryRingsGuide() {
  const { t } = useLanguage();

  const handleOpenConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { h: t.pages.guideH1, b: t.pages.guideB1 },
    { h: t.pages.guideH2, b: t.pages.guideB2 },
    { h: t.pages.guideH3, b: t.pages.guideB3 },
    { h: t.pages.guideH4, b: t.pages.guideB4 },
    { h: t.pages.guideH5, b: t.pages.guideB5 },
    { h: t.pages.guideH6, b: t.pages.guideB6 },
    { h: t.pages.guideH7, b: t.pages.guideB7 },
  ];

  const metals = [
    { n: t.pages.guideM1N, pro: t.pages.guideM1Pro, con: t.pages.guideM1Con },
    { n: t.pages.guideM2N, pro: t.pages.guideM2Pro, con: t.pages.guideM2Con },
    { n: t.pages.guideM3N, pro: t.pages.guideM3Pro, con: t.pages.guideM3Con },
    { n: t.pages.guideM4N, pro: t.pages.guideM4Pro, con: t.pages.guideM4Con },
  ];

  const faqItems = [
    { q: t.pages.guideFaqQ1, a: t.pages.guideFaqA1 },
    { q: t.pages.guideFaqQ2, a: t.pages.guideFaqA2 },
    { q: t.pages.guideFaqQ3, a: t.pages.guideFaqA3 },
    { q: t.pages.guideFaqQ4, a: t.pages.guideFaqA4 },
    { q: t.pages.guideFaqQ5, a: t.pages.guideFaqA5 },
    { q: t.pages.guideFaqQ6, a: t.pages.guideFaqA6 },
  ];

  const exploreLinks = [
    { to: '/luxury-rings', label: t.pages.guideLinkLuxury },
    { to: '/emperor-rings', label: t.pages.guideLinkEmperor },
    { to: '/necklaces', label: t.pages.guideLinkNecklaces },
    { to: '/courses', label: t.pages.guideLinkCourses },
    { to: '/contact', label: t.pages.guideLinkContact },
    { to: '/produto/the-emperor-signet-sovereign-power', label: t.pages.guideLinkP1 },
    { to: '/produto/emperors-will-imperial-ring', label: t.pages.guideLinkP2 },
    { to: '/produto/bitcoin-signet-hand-engraved-18k', label: t.pages.guideLinkP3 },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO
        title={t.pages.guideSeoTitle}
        description={t.pages.guideSeoDescription}
        keywords={t.pages.guideSeoKeywords}
        url="/luxury-rings-guide"
      />

      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={handleOpenConsultation} />

      <main className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        <Breadcrumbs
          items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.pages.guideTitle }]}
        />

        <header className="text-center mb-16">
          <h2 className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            {t.pages.guideKicker}
          </h2>
          <h1 className="font-cinzel text-4xl md:text-5xl font-medium tracking-wide text-[#F3EFE6] mb-8">
            {t.pages.guideTitle}
          </h1>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto" />
        </header>

        <p className="font-cormorant text-xl md:text-2xl italic leading-relaxed text-[#D8D2C4] mb-14">
          {t.pages.guideIntro}
        </p>

        {sections.map((s, i) => (
          <section key={s.h} className="mb-12">
            <h2 className="font-cinzel text-2xl md:text-3xl text-[#E6CA85] tracking-wide mb-5">
              {s.h}
            </h2>
            <p className="text-[15px] leading-relaxed text-[#A8A296]">{s.b}</p>
            {i === 2 && (
              <div className="mt-8 overflow-x-auto rounded-xl border border-[#C5A059]/25 bg-[#020202]/65">
                <table className="w-full border-collapse min-w-[560px]">
                  <caption className="px-5 pt-5 pb-3 text-left font-cinzel text-xs uppercase tracking-[0.3em] text-[#C5A059]">
                    {t.pages.guideTableCaption}
                  </caption>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left font-cinzel text-[11px] uppercase tracking-[0.2em] text-[#E6CA85] border-y border-[#C5A059]/40 bg-[#C5A059]/10"
                      >
                        {t.pages.guideTableHMetal}
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left font-cinzel text-[11px] uppercase tracking-[0.2em] text-[#E6CA85] border-y border-[#C5A059]/40 bg-[#C5A059]/10"
                      >
                        {t.pages.guideTableHPro}
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left font-cinzel text-[11px] uppercase tracking-[0.2em] text-[#E6CA85] border-y border-[#C5A059]/40 bg-[#C5A059]/10"
                      >
                        {t.pages.guideTableHCon}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {metals.map((m) => (
                      <tr key={m.n} className="border-b border-[#C5A059]/15 last:border-b-0">
                        <th
                          scope="row"
                          className="px-5 py-4 text-left font-cormorant italic text-[15px] text-[#F3EFE6] align-top"
                        >
                          {m.n}
                        </th>
                        <td className="px-5 py-4 text-sm leading-relaxed text-[#C2BDB2] align-top">
                          {m.pro}
                        </td>
                        <td className="px-5 py-4 text-sm leading-relaxed text-[#A8A296] align-top">
                          {m.con}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        <FAQ heading={t.pages.guideFaqHeading} items={faqItems} />

        <section className="mt-20 text-center">
          <h2 className="font-cinzel text-[#E6CA85] text-lg sm:text-xl tracking-[0.16em] uppercase mb-8">
            {t.pages.guideExploreHeading}
          </h2>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {exploreLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-block px-6 py-2.5 rounded-full border border-[#C5A059]/40 text-[#C5A059] hover:text-[#E6CA85] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all text-[11px] uppercase tracking-[0.2em]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-20 pt-10 border-t border-[#C5A059]/20 text-center">
          <h2 className="font-cinzel text-2xl text-[#F3EFE6] mb-6">{t.pages.guideCtaTitle}</h2>
          <Link
            to="/contact"
            className="relative group/btn overflow-hidden border border-[#C5A059] px-12 py-4 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 transition-colors inline-block"
          >
            <span className="relative font-poppins text-xs tracking-[0.2em] uppercase text-[#C5A059]">
              {t.pages.guideCtaButton}
            </span>
          </Link>
        </div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}

export default LuxuryRingsGuide;
