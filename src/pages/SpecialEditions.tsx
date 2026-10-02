import React from 'react';
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

const SPECIAL_BG = encodeURI('/PUBLIC/Fundo da seção ESPECIAL EDITION rings luxury Jorge Uquillas.jpg');

function scrollToContact() {
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function SpecialEditions() {
  const { t } = useLanguage();

  const RINGS: RingItem[] = [
    {
      src: encodeURI('/PUBLIC/Luxury rings collection anel Tempest by Jorge Uquillas rings luxury (2).png'),
      name: 'Tempest Ring Especial Edition',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial1,
    },
    {
      src: encodeURI('/PUBLIC/Anel  Luxury Rings de bitcoin engravado a mao by jorge uquilas rings luxury.png'),
      name: 'Bitcoin Ring Especial Edition',
      price: '$ 9,800.00',
      alt: t.collections.altSpecial2,
    },
    {
      src: encodeURI('/PUBLIC/Luxury rings collection anel caveira com diamantes by Jorge Uquillas rings luxury.png'),
      name: 'King Skull Ring 18 With Diamonds Especial Edition',
      price: '$ 9,800.00',
      alt: t.collections.altSpecial3,
    },
    {
      src: encodeURI('/PUBLIC/Tiger Ring Especial Edition by Rings Luxury Jorge Uquillas.png'),
      name: 'Tiger Ring Especial Edition',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial4,
    },
    {
      src: encodeURI('/PUBLIC/Anel Rings Luxury para DR Viotto by Jorge Uquillas.png'),
      name: 'DR Viotto Ring',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial5,
    },
    {
      src: encodeURI('/PUBLIC/medusa rings 18k gold with diamonds by Rings Luxuru Jorge Uquillas.png'),
      name: 'Medusa Rings 18k Gold with Diamonds',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial6,
    },
    {
      src: encodeURI('/PUBLIC/Avengers Rings By Jorge Uquillas Rings Luxury 18k Gold.png'),
      name: 'Avengers Rings 18k Gold',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial7,
    },
    {
      src: encodeURI('/PUBLIC/Anel Kraken Especial Edition by Rings Luxury Jorge Uquillas.png'),
      name: 'Kraken Especial Edition Ring',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial8,
    },
    {
      src: encodeURI('/PUBLIC/Jesus Ring 18K with diamonds By Rings Luxury Jorge Uquillas.png'),
      name: 'Jesus Ring 18k with Diamonds',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial9,
    },
    {
      src: encodeURI('/PUBLIC/Monkey Ring 18k gold with Diamonds by Jorge Uquillas rings Luxury.png'),
      name: 'Monkey Ring 18k Gold with Diamonds',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial10,
    },
    {
      src: encodeURI('/PUBLIC/Memento Mori by Jorge uquillas, rings Luxury.png'),
      name: 'Memento Mori Ring',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial11,
    },
    {
      src: encodeURI('/PUBLIC/King Lion Ring with DIamonds by Jorge Uquillas Rings Luxury.png'),
      name: 'King Lion Ring with Diamonds',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial12,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={t.collections.seoSpecialTitle}
        description={t.collections.seoSpecialDescription}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${t.collections.specialTitle} — RINGS LUXURY`,
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
        {/* Leões ao fundo, um de cada lado — sempre visíveis */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-y-0 left-0 w-[30%] sm:w-[26%] overflow-hidden">
            <img
              src={SPECIAL_BG}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-left opacity-[0.12] select-none"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" />
          </div>
          <div className="absolute inset-y-0 right-0 w-[30%] sm:w-[26%] overflow-hidden">
            <img
              src={SPECIAL_BG}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-right opacity-[0.12] select-none"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-10 pt-36 sm:pt-44 pb-24">
          <Breadcrumbs
            items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.collections.specialTitle }]}
          />
          {/* Título */}
          <div className="text-center mb-14 sm:mb-20">
            <h1
              className="font-cinzel font-normal uppercase text-white"
              style={{ fontSize: 'clamp(30px, 3.4vw, 50px)', letterSpacing: '0.1em' }}
            >
              {t.collections.specialTitle}
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

export default SpecialEditions;
