import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../i18n/LanguageContext';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import contact from '../data/contact.json';

const ENGRAVER_HERO_IMG = encodeURI('/PUBLIC/imagem-para-galeria-jorge-uquillas-utilizando-o-microscopico-para-hand-engraving-800.webp');
const DETAIL_RING_IMG = encodeURI('/PUBLIC/anel-ouro-18k-alta-joalheria-gravacao-a-buril-rings-luxury.webp');

export function HandEngraving() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const handleOpenConsultation = () => {
    navigate('/contact');
  };

  const steps = [
    { title: t.pages.handEngravingStep1Title, desc: t.pages.handEngravingStep1Desc, num: '01' },
    { title: t.pages.handEngravingStep2Title, desc: t.pages.handEngravingStep2Desc, num: '02' },
    { title: t.pages.handEngravingStep3Title, desc: t.pages.handEngravingStep3Desc, num: '03' },
    { title: t.pages.handEngravingStep4Title, desc: t.pages.handEngravingStep4Desc, num: '04' },
    { title: t.pages.handEngravingStep5Title, desc: t.pages.handEngravingStep5Desc, num: '05' },
    { title: t.pages.handEngravingStep6Title, desc: t.pages.handEngravingStep6Desc, num: '06' },
  ];

  const comparisonRows = [
    { feature: t.pages.handEngravingCompRow1Feature, hand: t.pages.handEngravingCompRow1Hand, laser: t.pages.handEngravingCompRow1Laser },
    { feature: t.pages.handEngravingCompRow2Feature, hand: t.pages.handEngravingCompRow2Hand, laser: t.pages.handEngravingCompRow2Laser },
    { feature: t.pages.handEngravingCompRow3Feature, hand: t.pages.handEngravingCompRow3Hand, laser: t.pages.handEngravingCompRow3Laser },
    { feature: t.pages.handEngravingCompRow4Feature, hand: t.pages.handEngravingCompRow4Hand, laser: t.pages.handEngravingCompRow4Laser },
    { feature: t.pages.handEngravingCompRow5Feature, hand: t.pages.handEngravingCompRow5Hand, laser: t.pages.handEngravingCompRow5Laser },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={t.pages.handEngravingSeoTitle}
        description={t.pages.handEngravingSeoDescription}
        url="/hand-engraving"
        pageType="AboutPage"
      />

      {/* Schema.org E-E-A-T Service & AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'AboutPage',
                ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/hand-engraving')}#webpage` } : {}),
                ...(HAS_SITE_URL ? { url: absoluteUrl('/hand-engraving') } : {}),
                name: t.pages.handEngravingH1,
                inLanguage: lang,
                description: t.pages.handEngravingSeoDescription,
                ...(HAS_SITE_URL
                  ? {
                      isPartOf: { '@id': `${absoluteUrl('/')}#website` },
                      about: { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` },
                    }
                  : {}),
              },
              {
                '@type': 'Service',
                name: 'Haute Joaillerie Hand Engraving in Solid 18k Gold',
                serviceType: 'Artistic Hand Engraving',
                provider: {
                  '@type': 'Person',
                  name: 'Jorge Uquillas',
                  jobTitle: 'Master Goldsmith and Hand Engraver',
                  ...(HAS_SITE_URL ? { url: absoluteUrl('/jorge-uquillas') } : {}),
                  sameAs: contact.sameAs,
                },
                areaServed: ['US', 'BR', 'Worldwide'],
                description: t.pages.handEngravingSeoDescription,
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <Header onOpenConsultation={handleOpenConsultation} />

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <main className="relative max-w-[1100px] mx-auto px-6 py-12 sm:py-20 lg:py-28">
        {/* Breadcrumb navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: t.pages.handEngravingBreadcrumb },
          ]}
        />

        {/* Hero Section */}
        <header className="mb-16 sm:mb-24 text-center max-w-[850px] mx-auto">
          <div className="inline-block border border-[#C5A059]/40 bg-[#C5A059]/5 px-4 py-1.5 rounded-full mb-6">
            <span className="font-cinzel text-xs sm:text-sm tracking-[0.22em] uppercase text-[#E6CA85]">
              {t.pages.handEngravingBadge}
            </span>
          </div>

          <h1 className="font-cinzel text-[#F5F0E6] text-[clamp(32px,5vw,58px)] italic tracking-[0.03em] leading-[1.12] mb-6">
            {t.pages.handEngravingH1}
          </h1>

          <p className="text-[#C5A059] text-[clamp(15px,1.2vw,19px)] tracking-[0.14em] uppercase font-medium leading-relaxed mb-10">
            {t.pages.handEngravingSubtitle}
          </p>

          {/* Master quote highlight */}
          <div className="relative bg-gradient-to-b from-[#0a0a0a] to-[#040404] border border-[#C5A059]/25 rounded-2xl p-6 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="w-8 h-8 rounded-full border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-4 text-[#C5A059] text-sm">
              RL
            </div>
            <p className="font-cormorant italic text-lg sm:text-2xl text-[#EAE6DF]/95 leading-relaxed mb-4">
              “{t.pages.handEngravingLeadQuote}”
            </p>
            <cite className="font-cinzel text-xs sm:text-sm text-[#C5A059] tracking-[0.2em] uppercase not-italic block">
              — {t.pages.handEngravingQuoteAuthor}
            </cite>
          </div>
        </header>

        {/* Section 1: What is Hand Engraving (with atelier photo proof) */}
        <section className="mb-24 sm:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-cinzel text-[#E6CA85] text-2xl sm:text-3xl tracking-[0.12em] uppercase">
              {t.pages.handEngravingWhatTitle}
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-[#C5A059] to-transparent" />
            <p className="text-[#EAE6DF]/90 text-base sm:text-lg leading-relaxed">
              {t.pages.handEngravingWhatP1}
            </p>
            <p className="text-[#EAE6DF]/90 text-base sm:text-lg leading-relaxed">
              {t.pages.handEngravingWhatP2}
            </p>
            <div className="pt-2">
              <Link
                to="/jorge-uquillas"
                className="inline-flex items-center gap-2 font-cinzel text-xs sm:text-sm text-[#C5A059] tracking-[0.18em] uppercase hover:underline"
              >
                <span>Explore the master goldsmith profile</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/30 bg-[#0a0a0a]">
              <img
                src={ENGRAVER_HERO_IMG}
                alt="Jorge Uquillas engraving 18k solid gold ring under microscope"
                className="w-full h-auto object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                width={800}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-[#E6CA85]/80 bg-[#020202]/80 backdrop-blur-sm px-3 py-1 rounded">
                  Atelier São Paulo • Miami
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Ancestral Process */}
        <section className="mb-24 sm:mb-32">
          <div className="text-center max-w-[700px] mx-auto mb-14">
            <h2 className="font-cinzel text-[#E6CA85] text-2xl sm:text-3xl tracking-[0.12em] uppercase mb-3">
              {t.pages.handEngravingProcessTitle}
            </h2>
            <p className="font-cormorant italic text-lg text-[#EAE6DF]/80">
              {t.pages.handEngravingProcessSubtitle}
            </p>
            <div className="w-20 h-px bg-[#C5A059]/40 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="relative bg-[#080808]/70 border border-[#C5A059]/20 hover:border-[#C5A059]/50 rounded-xl p-6 sm:p-8 transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-cinzel text-xs text-[#C5A059] tracking-[0.28em] block mb-3 font-semibold">
                    STEP {s.num}
                  </span>
                  <h3 className="font-cinzel text-[#F5F0E6] text-lg sm:text-xl tracking-[0.06em] mb-4">
                    {s.title}
                  </h3>
                  <p className="text-[#EAE6DF]/80 text-sm sm:text-base leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#C5A059]/10 flex items-center justify-between text-[11px] text-[#9A7B38] uppercase tracking-[0.18em]">
                  <span>100% Ancestral</span>
                  <span>Zero Machine</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Why Hand Engraving Matters */}
        <section className="mb-24 sm:mb-32 bg-gradient-to-r from-[#070707] via-[#0c0c0c] to-[#070707] border border-[#C5A059]/20 rounded-2xl p-8 sm:p-14">
          <div className="max-w-[800px] mx-auto space-y-6">
            <h2 className="font-cinzel text-[#E6CA85] text-2xl sm:text-3xl tracking-[0.12em] uppercase text-center mb-6">
              {t.pages.handEngravingWhyTitle}
            </h2>
            <p className="text-[#EAE6DF]/90 text-base sm:text-lg leading-relaxed">
              {t.pages.handEngravingWhyP1}
            </p>
            <p className="text-[#EAE6DF]/90 text-base sm:text-lg leading-relaxed">
              {t.pages.handEngravingWhyP2}
            </p>
          </div>
        </section>

        {/* Section 4: Comparison Table */}
        <section className="mb-24 sm:mb-32">
          <div className="text-center max-w-[700px] mx-auto mb-12">
            <h2 className="font-cinzel text-[#E6CA85] text-2xl sm:text-3xl tracking-[0.12em] uppercase mb-3">
              {t.pages.handEngravingComparisonTitle}
            </h2>
            <p className="font-cormorant italic text-lg text-[#EAE6DF]/80">
              {t.pages.handEngravingComparisonSubtitle}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#C5A059]/20 bg-[#060606]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C5A059]/20 bg-[#0a0a0a]">
                  <th className="p-4 sm:p-5 font-cinzel text-xs sm:text-sm tracking-[0.18em] uppercase text-[#9A7B38] w-1/4">
                    {t.pages.handEngravingCompColFeature}
                  </th>
                  <th className="p-4 sm:p-5 font-cinzel text-xs sm:text-sm tracking-[0.18em] uppercase text-[#E6CA85] bg-[#C5A059]/10 w-5/12 border-x border-[#C5A059]/20">
                    ✦ {t.pages.handEngravingCompColHand}
                  </th>
                  <th className="p-4 sm:p-5 font-cinzel text-xs sm:text-sm tracking-[0.18em] uppercase text-[#777] w-1/3">
                    {t.pages.handEngravingCompColLaser}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C5A059]/10 text-xs sm:text-sm">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-[#F5F0E6]">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-[#EAE6DF] bg-[#C5A059]/5 border-x border-[#C5A059]/20 font-medium">
                      {row.hand}
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">{row.laser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Commission CTA Box */}
        <section className="bg-gradient-to-b from-[#0a0a0a] to-[#040404] rounded-2xl p-8 sm:p-14 border border-[#C5A059]/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(197,160,89,0.1)]">
          <div className="relative z-10 max-w-[700px] mx-auto">
            <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#C5A059] block mb-3">
              One of One • 1/1 Piece
            </span>
            <h2 className="font-cinzel text-[#F5F0E6] text-2xl sm:text-4xl tracking-[0.08em] mb-6">
              {t.pages.handEngravingCtaBoxTitle}
            </h2>
            <p className="text-[#EAE6DF]/90 text-base sm:text-lg leading-relaxed mb-10">
              {t.pages.handEngravingCtaBoxDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-block font-cinzel text-[#020202] bg-[#C5A059] hover:bg-[#E6CA85] tracking-[0.18em] uppercase font-semibold px-8 py-4 rounded transition-all duration-300 shadow-[0_0_25px_rgba(197,160,89,0.3)] text-sm sm:text-base text-center"
              >
                {t.pages.handEngravingCtaButton}
              </Link>
              <Link
                to="/gallery"
                className="w-full sm:w-auto inline-block font-cinzel text-[#C5A059] tracking-[0.18em] uppercase border border-[#C5A059]/40 hover:border-[#C5A059] px-8 py-4 rounded transition-all duration-300 text-sm sm:text-base text-center hover:bg-[#C5A059]/10"
              >
                {t.pages.handEngravingCtaSecondary}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HandEngraving;

