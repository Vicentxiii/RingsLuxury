import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { useLanguage } from '../i18n/LanguageContext';

interface NecklaceItem {
  src: string;
  name: string;
  price: string;
  alt: string;
}

const NECKLACES_BG = encodeURI('/PUBLIC/Dobra da pagina Necklaces site Rings Luxury by Jorge Uquillas.jpg');

function scrollToContact() {
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function Necklaces() {
  const { t } = useLanguage();

  const NECKLACES: NecklaceItem[] = [
    {
      src: encodeURI('/PUBLIC/Panther Necklace by  Jorge Uquillas Rings Luxury 18K gold with Citrin.png'),
      name: 'Panther Necklace',
      price: '$ 22,500.00',
      alt: t.collections.altNecklace1,
    },
    {
      src: encodeURI('/PUBLIC/Rhino NeckLace 18k gold with Diamonds by Rings Luxury Jorege Uquillas.png'),
      name: 'Rhino Necklace',
      price: '$ 150,000.00',
      alt: t.collections.altNecklace2,
    },
    {
      src: encodeURI('/PUBLIC/Variable 18K gold Chains By Jorge Uquillas Rings Luxury.png'),
      name: 'Variable 18K Gold Chains 18mm',
      price: '$ 0.00',
      alt: t.collections.altNecklace3,
    },
    {
      src: encodeURI('/PUBLIC/Medusa Necklace Full Diamonds 18 Gold by Jorge Uquillas Rings Luxury.png'),
      name: 'Medusa Necklace Full Diamonds 18k gold',
      price: '$ 112,000.00',
      alt: t.collections.altNecklace4,
    },
    {
      src: encodeURI('/PUBLIC/Lion NeckLace 18K gold by Rings Luxury.png'),
      name: 'Lion Necklace 18k gold',
      price: '$ 22,000.00',
      alt: t.collections.altNecklace5,
    },
    {
      src: encodeURI('/PUBLIC/King Lion NeckLace By Rings Luxury Jorge uquillas.png'),
      name: 'King Lion Necklace',
      price: t.collections.priceUponRequest,
      alt: t.collections.altNecklace6,
    },
    {
      src: encodeURI('/PUBLIC/Colar de Safiras e diamantes by jORGE uQUILLAS rINGS lUXURY 2 SEM FUNDO.png'),
      name: 'Sapphire and Diamond Necklace',
      price: t.collections.priceUponRequest,
      alt: t.collections.altNecklace7,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={t.collections.seoNecklacesTitle}
        description={t.collections.seoNecklacesDescription}
        keywords={t.collections.seoNecklacesKeywords}
      />

      <Header onOpenConsultation={() => scrollToContact()} />

      <main className="relative w-full overflow-hidden">
        {/* Dobra ao fundo, um de cada lado — sempre visíveis */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-y-0 left-0 w-[30%] sm:w-[26%] overflow-hidden">
            <img
              src={NECKLACES_BG}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-left opacity-25 select-none"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" />
          </div>
          <div className="absolute inset-y-0 right-0 w-[30%] sm:w-[26%] overflow-hidden">
            <img
              src={NECKLACES_BG}
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
              {t.collections.necklacesTitle}
            </h1>
            {/* filete dourado com brilho central */}
            <div className="relative mx-auto mt-6 w-full max-w-[560px]" aria-hidden>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[3px] bg-[#E6CA85] blur-[3px] rounded-full" />
            </div>
          </div>

          {/* Grade de colares */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {NECKLACES.map((necklace) => (
              <div key={necklace.src} className="group flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => scrollToContact()}
                  className="w-full aspect-square flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none"
                  aria-label={`${necklace.name} ${t.collections.inquireSuffix}`}
                >
                  <img
                    src={necklace.src}
                    alt={necklace.alt}
                    loading="lazy"
                    draggable={false}
                    className="max-w-full max-h-full object-contain select-none transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.9))' }}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                </button>
                <p className="mt-2 min-h-[40px] flex items-start justify-center text-[12px] leading-[1.5] text-white/90 max-w-[260px]">
                  {necklace.name}
                </p>
                <p className="mt-1.5 font-cinzel text-[14px] tracking-[0.08em] text-[#E6CA85]">
                  {necklace.price}
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

export default Necklaces;
