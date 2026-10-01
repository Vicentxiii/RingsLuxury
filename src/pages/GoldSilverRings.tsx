import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { useLanguage } from '../i18n/LanguageContext';

interface RingItem {
  src: string;
  name: string;
  price: string;
  alt: string;
}

const GOLDSILVER_BG = encodeURI('/PUBLIC/Fundo da Seção Mixed Gold Rings 3 rings luxury Jorge Uquillas.png');

function scrollToContact() {
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function GoldSilverRings() {
  const { t } = useLanguage();

  const RINGS: RingItem[] = [
    {
      src: encodeURI('/PUBLIC/Mixed Luxury Gold Ring by rings Luxury Jorge Uquillas.png'),
      name: 'Mixed Luxury Gold Ring',
      price: '$ 3,500.00',
      alt: t.collections.altGoldSilver1,
    },
    {
      src: encodeURI('/PUBLIC/Wolf Silver Ring by Jorge Uquillas Rings Luxury.png'),
      name: 'Wolf Silver Ring',
      price: '$ 1,500.00',
      alt: t.collections.altGoldSilver2,
    },
    {
      src: encodeURI('/PUBLIC/Family Crest Silver Ring By rings Luxury Jorge Uquillas.png'),
      name: 'Family Crest Silver Ring',
      price: '$ 1,500.00',
      alt: t.collections.altGoldSilver3,
    },
    {
      src: encodeURI('/PUBLIC/Miced Maçonic 33 Degrees Gold Silver Ring by Rings Luxury Jorge Uquillas.png'),
      name: 'Mixed Maçonic 33 Degrees Gold Silver Ring',
      price: '$ 3,500.00',
      alt: t.collections.altGoldSilver4,
    },
    {
      src: encodeURI('/PUBLIC/Miced Gold-Silver ring Family Crest by Jorge uquillas Rings Luxury.png'),
      name: 'Mixed Gold-Silver Family Crest Ring',
      price: '$ 3,500.00',
      alt: t.collections.altGoldSilver5,
    },
    {
      src: encodeURI('/PUBLIC/Mixed Templar Gold Silver Ring 18k by Jorge Uquillas Rings Luxury.png'),
      name: 'Mixed Templar Gold Silver Ring 18k',
      price: '$ 3,500.00',
      alt: t.collections.altGoldSilver6,
    },
    {
      src: encodeURI('/PUBLIC/Miced Gold-Silver ring Family Crest by Jorge uquillas Rings Luxury with number.png'),
      name: 'Mixed Gold-Silver Ring Family Crest',
      price: '$ 3,500.00',
      alt: t.collections.altGoldSilver7,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={t.collections.seoGoldSilverTitle}
        description={t.collections.seoGoldSilverDescription}
        keywords={t.collections.seoGoldSilverKeywords}
      />

      <Header onOpenConsultation={() => scrollToContact()} />

      <main className="relative w-full overflow-hidden">
        {/* Mármore dourado ao fundo, um de cada lado — sempre visíveis */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-y-0 left-0 w-[30%] sm:w-[26%] overflow-hidden">
            <img
              src={GOLDSILVER_BG}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-left opacity-25 select-none"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" />
          </div>
          <div className="absolute inset-y-0 right-0 w-[30%] sm:w-[26%] overflow-hidden">
            <img
              src={GOLDSILVER_BG}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-right opacity-25 select-none"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-10 pt-36 sm:pt-44 pb-24">
          {/* Título */}
          <div className="text-center mb-14 sm:mb-20">
            <h1
              className="font-cinzel font-normal uppercase text-white"
              style={{ fontSize: 'clamp(30px, 3.4vw, 50px)', letterSpacing: '0.1em' }}
            >
              {t.collections.goldSilverTitle}
            </h1>
            {/* filete dourado com brilho central */}
            <div className="relative mx-auto mt-6 w-full max-w-[560px]" aria-hidden>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[3px] bg-[#E6CA85] blur-[3px] rounded-full" />
            </div>
          </div>

          {/* Grade de anéis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {RINGS.map((ring) => (
              <div key={ring.src} className="group flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => scrollToContact()}
                  className="w-full aspect-square flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none"
                  aria-label={`${ring.name} ${t.collections.inquireSuffix}`}
                >
                  <img
                    src={ring.src}
                    alt={ring.alt}
                    loading="lazy"
                    draggable={false}
                    className="max-w-full max-h-full object-contain select-none transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.9))' }}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                </button>
                <p className="mt-2 min-h-[40px] flex items-start justify-center text-[12px] leading-[1.5] text-white/90 max-w-[260px]">
                  {ring.name}
                </p>
                <p className="mt-1.5 font-cinzel text-[14px] tracking-[0.08em] text-[#E6CA85]">
                  {ring.price}
                </p>
                <button
                  type="button"
                  onClick={() => scrollToContact()}
                  className="mt-3 px-6 py-1.5 border border-white/25 hover:border-[#C5A059] rounded-full text-[11px] tracking-[0.12em] text-white/85 hover:text-[#E6CA85] transition-colors"
                >
                  {t.collections.addToCart}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}

export default GoldSilverRings;
