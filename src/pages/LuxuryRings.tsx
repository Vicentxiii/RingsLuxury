import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { absoluteUrl } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';
import { ResponsiveImg } from '../components/ResponsiveImg';

interface RingItem {
  src: string;
  name: string;
  price: string;
  alt: string;
  slug: string;
}

const LION_BG = encodeURI('/PUBLIC/background-do-site-rings-luxury-secao-luxury-rings.webp');
const LION_BG_MOBILE = encodeURI('/PUBLIC/fundo-da-pagina-luxury-rings-mobile.webp');
const SEPARATOR_IMG = encodeURI('/PUBLIC/seaparador-2-rings-luxury-jorge-uquillas.webp');

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
      src: encodeURI('/PUBLIC/emperor-ring-18k-gold-monogram.webp'),
      name: 'Emperor Ring 18k Gold Monogram',
      price: '$ 4,800.00',
      alt: t.collections.altLuxury1,
      slug: 'emperor-ring-18k-gold-monogram-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/anel-luxury-rings-de-bitcoin-engravado-a-mao-by-jorge-uquillas-rings-luxury.webp'),
      name: 'Bitcoin Ring Especial Edition',
      price: '$ 9,800.00',
      alt: t.collections.altLuxury2,
      slug: 'bitcoin-ring-especial-edition-18k-gold-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/luxury-rings-collection-anel-medusa-by-jorge-uquillas-rings-luxury.webp'),
      name: 'Medusa Ring Especial Edition with diamonds',
      price: '$ 9,800.00',
      alt: t.collections.altLuxury3,
      slug: 'medusa-ring-especial-edition-diamonds-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/luxury-rings-collection-anel-caveira-com-diamantes-by-jorge-uquillas-rings-luxury.webp'),
      name: 'King Skull Ring 18 With Diamonds Especial Edition',
      price: '$ 9,800.00',
      alt: t.collections.altLuxury4,
      slug: 'king-skull-ring-18k-diamonds-especial-edition-jorge-uquillas',
    },
    {
      src: encodeURI('/PUBLIC/luxury-rings-collection-anel-tiger-by-jorge-uquillas-rings-luxury.webp'),
      name: 'Tiger Ring 18k Gold',
      price: t.collections.priceUponRequest,
      alt: t.collections.altLuxury5,
      slug: 'tiger-ring-18k-gold-jorge-uquillas',
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
            name: `${t.collections.luxuryTitle}, RINGS LUXURY`,
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
        <div className="absolute inset-x-0 top-0 h-[380px] sm:inset-y-0 sm:left-0 sm:right-auto sm:h-auto sm:w-[38%] pointer-events-none" aria-hidden>
          <ResponsiveImg
            src={LION_BG_MOBILE}
            alt=""
            decorative
            priority
            sizes="100vw"
            width={900}
            height={600}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-70 sm:hidden"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
          <ResponsiveImg
            src={LION_BG}
            alt=""
            decorative
            priority
            sizes="38vw"
            width={1200}
            height={1600}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-70 sm:object-left sm:opacity-100 hidden sm:block"
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
          <div className="text-center mb-20 sm:mb-20">
            <h1
              className="font-cinzel font-normal uppercase text-white"
              style={{ fontSize: 'clamp(34px, 4vw, 58px)', letterSpacing: '0.12em' }}
            >
              {t.collections.luxuryTitle}
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
            <p
              className="font-cinzel font-normal uppercase text-[#E8E2D4]"
              style={{ fontSize: 'clamp(15px, 1.5vw, 21px)', letterSpacing: '0.55em', textIndent: '0.55em' }}
            >
              {t.collections.luxurySubtitle}
            </p>
            <p className="mx-auto mt-10 sm:mt-8 max-w-2xl font-cormorant text-lg italic leading-relaxed text-[#C2BDB2]">
              {t.collections.luxuryIntro}
            </p>
            <p className="mt-6 sm:mt-4">
              <Link
                to="/luxury-rings-guide"
                className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-[#C5A059] underline underline-offset-4 hover:text-[#E6CA85] transition-colors"
              >
                {t.collections.luxuryGuideLinkLabel} →
              </Link>
            </p>
          </div>

          {/* Grade de anéis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-x-8 gap-y-20 sm:gap-y-14">
            {RINGS.map((ring) => (
              <Link
                key={ring.src}
                to={`/produto/${ring.slug}`}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
                aria-label={`${ring.name}, ver peça`}
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
                <h2 className="mt-4 sm:mt-2 min-h-[44px] flex items-start justify-center text-[13px] font-normal leading-[1.5] text-white/90 max-w-[260px] group-hover:text-[#E6CA85] transition-colors">
                  {ring.name}
                </h2>
                <p className="mt-3 sm:mt-2 font-cinzel text-[15px] tracking-[0.08em] text-[#E6CA85]">
                  {ring.price}
                </p>
                <span className="mt-5 sm:mt-3 inline-block px-6 py-1.5 border border-white/45 group-hover:border-[#C5A059] rounded-full text-[11px] tracking-[0.12em] text-white/85 group-hover:text-[#E6CA85] transition-colors">
                  {t.collections.addToCart}
                </span>
              </Link>
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
