import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';

interface PieceItem {
  src: string;
  name: string;
  price: string;
  alt: string;
}

const QUEENS_BG = encodeURI('/PUBLIC/Seção Luxury Queens by Jorge Uquillas Rings Luxury.jpg');

const PIECES: PieceItem[] = [
  {
    src: encodeURI('/PUBLIC/Anel Luxury Queens Rings Luxury by Jorge Uquillas.png'),
    name: 'Luxury Queens Ring',
    price: '$ 15,000.00',
    alt: 'Luxury Queens Ring by Jorge Uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Colar de Safiras e diamantes by jORGE uQUILLAS rINGS lUXURY 2 SEM FUNDO.png'),
    name: 'Sapphire and Diamond Necklace',
    price: '$ 150,000.00',
    alt: 'Sapphire and Diamond Necklace by Jorge Uquillas',
  },
];

function scrollToContact() {
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function LuxuryQueens() {
  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title="Luxury Queens — Sapphire Necklace & Diamond Ring | Jorge Uquillas"
        description="Luxury Queens by Jorge Uquillas — sapphire and diamond necklace and solitaire diamond ring, 1/1 HandCrafted haute joaillerie."
        keywords="RINGS LUXURY, Luxury Queens, sapphire necklace, diamond ring, Jorge Uquillas"
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
          {/* Título */}
          <div className="text-center mb-14 sm:mb-20">
            <h1
              className="font-cinzel font-normal uppercase text-white"
              style={{ fontSize: 'clamp(30px, 3.4vw, 50px)', letterSpacing: '0.1em' }}
            >
              Luxury Queens
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
                <button
                  type="button"
                  onClick={() => scrollToContact()}
                  className="w-full h-[260px] sm:h-[300px] flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none"
                  aria-label={`${piece.name} — inquire`}
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
                </button>
                <p className="mt-2 min-h-[40px] flex items-start justify-center text-[13px] leading-[1.5] text-white/90 max-w-[280px]">
                  {piece.name}
                </p>
                <p className="mt-2 font-cinzel text-[15px] tracking-[0.08em] text-[#E6CA85]">
                  {piece.price}
                </p>
                <button
                  type="button"
                  onClick={() => scrollToContact()}
                  className="mt-3 px-6 py-1.5 border border-white/25 hover:border-[#C5A059] rounded-full text-[11px] tracking-[0.12em] text-white/85 hover:text-[#E6CA85] transition-colors"
                >
                  Add to cart
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

export default LuxuryQueens;
