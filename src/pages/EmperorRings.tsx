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
  slug: string;
}

const EMPEROR_BG = encodeURI('/PUBLIC/Fundo da seção EMPEROR RINGS site Rings Luxury.webp');

function scrollToContact() {
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function EmperorRings() {
  const { t } = useLanguage();

  const RINGS: RingItem[] = [
    {
      src: encodeURI('/PUBLIC/Emperor Eraldic Ring 18k gold Monogram by Jorge Uquillas Rings Luxury.webp'),
      name: 'EMPEROR HERALDIC RING',
      price: '$ 4,800.00',
      alt: t.collections.altEmperor1,
      slug: 'emperor-heraldic-ring-18k-gold-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Luxury rings collection anel Caveira  by Jorge Uquillas rings luxury.webp'),
      name: 'Rose Gold Pirate Skull Ring',
      price: '$ 5,500.00',
      alt: t.collections.altEmperor2,
      slug: 'rose-gold-pirate-skull-ring-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Lion Emperor Ring 18K gold by Jorge Uquillas Rings Luxury.webp'),
      name: 'Lion Emperor Ring',
      price: '$ 4,800.00',
      alt: t.collections.altEmperor3,
      slug: 'lion-emperor-ring-18k-gold-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Emperor RING 18K gOLD monogram.webp'),
      name: 'Emperor Ring 18k Gold Monogram',
      price: '$ 4,800.00',
      alt: t.collections.altEmperor4,
      slug: 'emperor-ring-18k-gold-monogram-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/KOI emperor Ring 18k rose Gold.webp'),
      name: 'KOI Emperor Ring 18k rose gold',
      price: '$ 4,800.00',
      alt: t.collections.altEmperor5,
      slug: 'koi-emperor-ring-18k-rose-gold-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Emperor Skull Ring 18k Gold by Jorge Uquillas Rings Luxury.webp'),
      name: 'Emperor Skull Ring 18k gold',
      price: '$ 4,800.00',
      alt: t.collections.altEmperor6,
      slug: 'emperor-skull-ring-18k-gold-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Luxury Emperor Maçonic Ring by Jorge Uquillas Rings Luxury.webp'),
      name: 'Luxury Emperor Maçonic Ring',
      price: '$ 4,800.00',
      alt: t.collections.altEmperor7,
      slug: 'luxury-emperor-masonic-ring-jorge-uquillas',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={t.collections.seoEmperorTitle}
        description={t.collections.seoEmperorDescription}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${t.collections.emperorTitle}, RINGS LUXURY`,
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
        {/* Imperador ao fundo, lado direito, inteiro, 12% de opacidade */}
        <div className="absolute inset-y-0 right-0 h-full pointer-events-none" aria-hidden>
          <img
            src={EMPEROR_BG}
            alt=""
            draggable={false}
            className="h-full w-auto object-contain opacity-[0.12] select-none"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 sm:px-10 pt-36 sm:pt-44 pb-24">
          <Breadcrumbs
            items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.collections.emperorTitle }]}
          />
          {/* Título */}
          <div className="text-center mb-14 sm:mb-20">
            <h1
              className="font-cinzel font-normal uppercase text-white"
              style={{ fontSize: 'clamp(30px, 3.4vw, 50px)', letterSpacing: '0.1em' }}
            >
              {t.collections.emperorTitle}
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
                <Link
                  to={`/produto/${ring.slug}`}
                  className="w-full aspect-square flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none"
                  aria-label={`${ring.name}, ver peça`}
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
                </Link>
                <p className="mt-2 min-h-[40px] flex items-start justify-center text-[12px] leading-[1.5] text-white/90 max-w-[260px]">
                  {ring.name}
                </p>
                <p className="mt-1.5 font-cinzel text-[14px] tracking-[0.08em] text-[#E6CA85]">
                  {ring.price}
                </p>
                <Link
                  to={`/produto/${ring.slug}`}
                  className="mt-3 px-6 py-1.5 border border-white/25 hover:border-[#C5A059] rounded-full text-[11px] tracking-[0.12em] text-white/85 hover:text-[#E6CA85] transition-colors"
                >
                  {t.collections.addToCart}
                </Link>
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

export default EmperorRings;
