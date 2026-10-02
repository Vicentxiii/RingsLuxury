import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { absoluteUrl } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';

interface RingItem {
  src: string;
  name: string;
  price: string;
  alt: string;
}

const LION_BG = encodeURI('/PUBLIC/Background do site rings luxury seção LUXURY RINGS.jpg');

function scrollToContact() {
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function LuxuryRings() {
  const { t } = useLanguage();

  const RINGS: RingItem[] = [
    {
      src: encodeURI('/PUBLIC/Emperor RING 18K gOLD monogram.png'),
      name: 'Emperor Ring 18k Gold Monogram',
      price: '$ 4,800.00',
      alt: t.collections.altLuxury1,
    },
    {
      src: encodeURI('/PUBLIC/Anel  Luxury Rings de bitcoin engravado a mao by jorge uquilas rings luxury.png'),
      name: 'Bitcoin Ring Especial Edition',
      price: '$ 9,800.00',
      alt: t.collections.altLuxury2,
    },
    {
      src: encodeURI('/PUBLIC/Luxury rings collection anel medusa by Jorge Uquillas rings luxury.png'),
      name: 'Medusa Ring Especial Edition with diamonds',
      price: '$ 9,800.00',
      alt: t.collections.altLuxury3,
    },
    {
      src: encodeURI('/PUBLIC/Luxury rings collection anel caveira com diamantes by Jorge Uquillas rings luxury.png'),
      name: 'King Skull Ring 18 With Diamonds Especial Edition',
      price: '$ 9,800.00',
      alt: t.collections.altLuxury4,
    },
    {
      src: encodeURI('/PUBLIC/Luxury rings collection anel Tiger by Jorge Uquillas rings luxury.png'),
      name: 'Tiger Ring 18k Gold',
      price: t.collections.priceUponRequest,
      alt: t.collections.altLuxury5,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={t.collections.seoLuxuryTitle}
        description={t.collections.seoLuxuryDescription}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${t.collections.luxuryTitle} — RINGS LUXURY`,
            numberOfItems: RINGS.length,
            itemListElement: RINGS.map((ring, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: { '@type': 'Product', name: ring.name, image: absoluteUrl(ring.src) },
            })),
          }),
        }}
      />

      <Header onOpenConsultation={() => scrollToContact()} />

      <main className="relative w-full overflow-hidden">
        {/* Leão ao fundo, lado esquerdo */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[38%] pointer-events-none" aria-hidden>
          <img
            src={LION_BG}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-left"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-10 pt-36 sm:pt-44 pb-24">
          <Breadcrumbs
            items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.collections.luxuryTitle }]}
          />
          {/* Título */}
          <div className="text-center mb-14 sm:mb-20">
            <h1
              className="font-cinzel font-normal uppercase text-white"
              style={{ fontSize: 'clamp(34px, 4vw, 58px)', letterSpacing: '0.12em' }}
            >
              {t.collections.luxuryTitle}
            </h1>
            {/* filete dourado com brilho central */}
            <div className="relative mx-auto mt-6 mb-6 w-full max-w-[560px]" aria-hidden>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[3px] bg-[#E6CA85] blur-[3px] rounded-full" />
            </div>
            <p
              className="font-cinzel font-normal uppercase text-[#E8E2D4]"
              style={{ fontSize: 'clamp(15px, 1.5vw, 21px)', letterSpacing: '0.55em', textIndent: '0.55em' }}
            >
              {t.collections.luxurySubtitle}
            </p>
            <p className="mx-auto mt-8 max-w-2xl font-cormorant text-lg italic leading-relaxed text-[#C2BDB2]">
              {t.collections.luxuryIntro}
            </p>
            <p className="mt-4">
              <Link
                to="/luxury-rings-guide"
                className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-[#C5A059] underline underline-offset-4 hover:text-[#E6CA85] transition-colors"
              >
                {t.collections.luxuryGuideLinkLabel} →
              </Link>
            </p>
          </div>

          {/* Grade de anéis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-x-8 gap-y-14">
            {RINGS.map((ring) => (
              <button
                key={ring.src}
                type="button"
                onClick={() => scrollToContact()}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
              >
                <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={ring.src}
                    alt={ring.alt}
                    loading="lazy"
                    draggable={false}
                    className="max-w-full max-h-full object-contain select-none transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.9))' }}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                </div>
                <p className="mt-2 min-h-[44px] flex items-start justify-center text-[13px] leading-[1.5] text-white/90 max-w-[260px]">
                  {ring.name}
                </p>
                <p className="mt-2 font-cinzel text-[15px] tracking-[0.08em] text-[#E6CA85]">
                  {ring.price}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}

export default LuxuryRings;
