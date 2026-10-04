import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { absoluteUrl } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';

interface PieceItem {
  src: string;
  name: string;
  price: string;
  alt: string;
  slug: string;
}

const QUEENS_BG = encodeURI('/PUBLIC/Seção Luxury Queens by Jorge Uquillas Rings Luxury.webp');

function scrollToContact() {
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function LuxuryQueens() {
  const { t } = useLanguage();

  const PIECES: PieceItem[] = [
    {
      src: encodeURI('/PUBLIC/Anel Luxury Queens Rings Luxury by Jorge Uquillas.webp'),
      name: 'Luxury Queens Ring',
      price: '$ 15,000.00',
      alt: t.collections.altQueens1,
      slug: 'luxury-queens-ring-jorge-uquillas-rings-luxury',
    },
    {
      src: encodeURI('/PUBLIC/Colar de Safiras e diamantes by jORGE uQUILLAS rINGS lUXURY 2 SEM FUNDO.webp'),
      name: 'Sapphire and Diamond Necklace',
      price: '$ 150,000.00',
      alt: t.collections.altQueens2,
      slug: 'sapphire-diamond-necklace-jorge-uquillas-rings-luxury',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={t.collections.seoQueensTitle}
        description={t.collections.seoQueensDescription}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${t.collections.queensTitle} — RINGS LUXURY`,
            numberOfItems: PIECES.length,
            itemListElement: PIECES.map((piece, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: { '@type': 'Product', name: piece.name, image: absoluteUrl(piece.src) },
            })),
          }),
        }}
      />

      <Header onOpenConsultation={() => scrollToContact()} />

      <main className="relative w-full overflow-hidden">
        {/* Medusa ao fundo, lado direito */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src={QUEENS_BG}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 select-none"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 pt-36 sm:pt-44 pb-24">
          <Breadcrumbs
            items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.collections.queensTitle }]}
          />
          {/* Título */}
          <div className="text-center mb-14 sm:mb-20">
            <h1
              className="font-cinzel font-normal uppercase text-white"
              style={{ fontSize: 'clamp(30px, 3.4vw, 50px)', letterSpacing: '0.1em' }}
            >
              {t.collections.queensTitle}
            </h1>
            {/* filete dourado com brilho central */}
            <div className="relative mx-auto mt-6 w-full max-w-[560px]" aria-hidden>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[3px] bg-[#E6CA85] blur-[3px] rounded-full" />
            </div>
          </div>

          {/* Peças */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14 max-w-[1100px] mx-auto">
            {PIECES.map((piece) => (
              <div key={piece.src} className="group flex flex-col items-center text-center">
                <Link
                  to={`/produto/${piece.slug}`}
                  className="w-full h-[260px] sm:h-[300px] flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none"
                  aria-label={`${piece.name} — ver peça`}
                >
                  <img
                    src={piece.src}
                    alt={piece.alt}
                    loading="lazy"
                    draggable={false}
                    className="max-w-full max-h-full w-auto object-contain select-none transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.9))' }}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                </Link>
                <p className="mt-2 min-h-[40px] flex items-start justify-center text-[13px] leading-[1.5] text-white/90 max-w-[280px]">
                  {piece.name}
                </p>
                <p className="mt-2 font-cinzel text-[15px] tracking-[0.08em] text-[#E6CA85]">
                  {piece.price}
                </p>
                <Link
                  to={`/produto/${piece.slug}`}
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

export default LuxuryQueens;
