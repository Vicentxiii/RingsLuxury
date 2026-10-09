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

const SPECIAL_BG = encodeURI('/PUBLIC/Fundo da seção ESPECIAL EDITION rings luxury Jorge Uquillas.webp');
const SEPARATOR_IMG = encodeURI('/PUBLIC/Seaparador 2 Rings Luxury Jorge Uquillas.webp');

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
      src: encodeURI('/PUBLIC/Luxury rings collection anel Tempest by Jorge Uquillas rings luxury (2).webp'),
      name: 'Tempest Ring Especial Edition',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial1,
      slug: 'tempest-ring-especial-edition-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Anel  Luxury Rings de bitcoin engravado a mao by jorge uquilas rings luxury.webp'),
      name: 'Bitcoin Ring Especial Edition',
      price: '$ 9,800.00',
      alt: t.collections.altSpecial2,
      slug: 'bitcoin-ring-especial-edition-18k-gold-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Luxury rings collection anel caveira com diamantes by Jorge Uquillas rings luxury.webp'),
      name: 'King Skull Ring 18 With Diamonds Especial Edition',
      price: '$ 9,800.00',
      alt: t.collections.altSpecial3,
      slug: 'king-skull-ring-18k-diamonds-especial-edition-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Tiger Ring Especial Edition by Rings Luxury Jorge Uquillas.webp'),
      name: 'Tiger Ring Especial Edition',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial4,
      slug: 'tiger-ring-especial-edition-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Anel Rings Luxury para DR Viotto by Jorge Uquillas.webp'),
      name: 'DR Viotto Ring',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial5,
      slug: 'dr-viotto-ring-jorge-uquillas-rings-luxury',
    },
    {
      src: encodeURI('/PUBLIC/medusa rings 18k gold with diamonds by Rings Luxuru Jorge Uquillas.webp'),
      name: 'Medusa Rings 18k Gold with Diamonds',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial6,
      slug: 'medusa-rings-18k-gold-diamonds-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Avengers Rings By Jorge Uquillas Rings Luxury 18k Gold.webp'),
      name: 'Avengers Rings 18k Gold',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial7,
      slug: 'avengers-rings-18k-gold-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Anel Kraken Especial Edition by Rings Luxury Jorge Uquillas.webp'),
      name: 'Kraken Especial Edition Ring',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial8,
      slug: 'kraken-especial-edition-ring-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Jesus Ring 18K with diamonds By Rings Luxury Jorge Uquillas.webp'),
      name: 'Jesus Ring 18k with Diamonds',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial9,
      slug: 'jesus-ring-18k-diamonds-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Monkey Ring 18k gold with Diamonds by Jorge Uquillas rings Luxury.webp'),
      name: 'Monkey Ring 18k Gold with Diamonds',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial10,
      slug: 'monkey-ring-18k-gold-diamonds-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Memento Mori by Jorge uquillas, rings Luxury.webp'),
      name: 'Memento Mori Ring',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial11,
      slug: 'memento-mori-ring-jorge-uquillas-rings-luxury',
    },
    {
      src: encodeURI('/PUBLIC/King Lion Ring with DIamonds by Jorge Uquillas Rings Luxury.webp'),
      name: 'King Lion Ring with Diamonds',
      price: t.collections.priceUponRequest,
      alt: t.collections.altSpecial12,
      slug: 'king-lion-ring-diamonds-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/Anel Cheeta By Jorge Uquillas with Big Rubi Diamond 18k Gold Rings Luxury.webp'),
      name: 'Cheeta Ring with Big Rubi Diamond 18k Gold',
      price: '$ 12,500.00',
      alt: t.collections.altSpecial13,
      slug: 'cheeta-ring-big-rubi-diamond-18k-gold-jorge-uquillas',
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
            name: `${t.collections.specialTitle}, RINGS LUXURY`,
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
        {/* Leões ao fundo, um de cada lado, sempre visíveis */}
        <div className="absolute inset-x-0 top-0 h-[320px] sm:inset-0 sm:h-auto pointer-events-none" aria-hidden>
          <div className="absolute left-0 top-0 h-full w-[38%] sm:w-[26%] overflow-hidden">
            <img
              src={SPECIAL_BG}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-left opacity-[0.12] select-none"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" />
          </div>
          <div className="absolute right-0 top-0 h-full w-[38%] sm:w-[26%] overflow-hidden">
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
          <div className="text-center mb-20 sm:mb-20">
            <h1
              className="font-cinzel font-normal uppercase text-white"
              style={{ fontSize: 'clamp(30px, 3.4vw, 50px)', letterSpacing: '0.1em' }}
            >
              {t.collections.specialTitle}
            </h1>
            {/* separador Rings Luxury */}
            <img
              src={SEPARATOR_IMG}
              alt=""
              aria-hidden
              draggable={false}
              loading="eager"
              className="mx-auto -mt-2 mb-6 sm:-mt-14 sm:mb-12 w-full max-w-[720px] h-auto object-contain select-none"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>

          {/* Grade de anéis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 sm:gap-y-14">
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
                <p className="mt-4 sm:mt-2 min-h-[40px] flex items-start justify-center text-[12px] leading-[1.5] text-white/90 max-w-[260px]">
                  {ring.name}
                </p>
                <p className="mt-3 sm:mt-1.5 font-cinzel text-[14px] tracking-[0.08em] text-[#E6CA85]">
                  {ring.price}
                </p>
                <Link
                  to={`/produto/${ring.slug}`}
                  className="mt-5 sm:mt-3 px-6 py-1.5 border border-white/25 hover:border-[#C5A059] rounded-full text-[11px] tracking-[0.12em] text-white/85 hover:text-[#E6CA85] transition-colors"
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

export default SpecialEditions;
