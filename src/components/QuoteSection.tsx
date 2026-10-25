import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LaurelWreath } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';

/** Fotografias reais dos clientes e patronos da RINGS LUXURY */
const CLIENT_IMAGES: { src: string; alt: string; label: string }[] = [
  {
    src: '/PUBLIC/cliente-com-anel-do-rings-luxury-no-dedo-1.webp',
    alt: 'Patron wearing Emperor Ring in solid 18k gold at black-tie gala',
    label: 'Private Collector · Emperor Ring in 18k Solid Gold',
  },
  {
    src: '/PUBLIC/cliente-com-anel-do-rings-luxury-no-dedo-2.webp',
    alt: 'Client wearing bespoke gold ring with Cuban cigar and luxury watch',
    label: 'Private Commission · Bespoke 18k Gold Signet Ring',
  },
  {
    src: '/PUBLIC/cliente-com-anel-do-rings-luxury-no-dedo-3.webp',
    alt: 'Patron wearing hand-engraved 18k gold ring with luxury timepiece',
    label: 'Atelier Collector · Hand-Engraved Imperial Gold Ring',
  },
  {
    src: '/PUBLIC/cliente-com-o-tiger-ring-no-dedo.webp',
    alt: 'Client wearing the Tiger Ring in 18k gold with luxury cigar',
    label: 'Private Patron · Tiger Ring 18k Gold & Cuban Chain',
  },
  {
    src: '/PUBLIC/cliente-com-mixed-gold-silver-ring-family-crest-by-jorge-uquillas-rings-luxury-no-dedo.webp',
    alt: 'Client wearing the Family Crest Signet Ring in gold and silver',
    label: 'Family Dynasty · Mixed Gold-Silver Family Crest Ring',
  },
  {
    src: '/PUBLIC/cliente-com-mixed-gold-silver-ring-family-crest-by-jorge-uquillas-rings-luxury-with-number-no-dedo.webp',
    alt: 'Client signing with gold pen wearing numbered Family Crest ring',
    label: 'Legacy Sealed · Numbered 1/1 Family Crest Ring Edition',
  },
];

export function QuoteSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? CLIENT_IMAGES.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === CLIENT_IMAGES.length - 1 ? 0 : c + 1));
  }, []);

  // Autoplay a cada 5s, pausa se o usuário interagir
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c === CLIENT_IMAGES.length - 1 ? 0 : c + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Suporte a swipe no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="quote"
      aria-labelledby="sentenca"
      className="relative w-full py-28 sm:py-36 md:py-48 bg-[#020202] text-[#EAE6DF] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fundo com textura da alta joalheria */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <img
          src="/PUBLIC/imagem-de-fundo-de-secao-jorge-uquillas-rings-luxury.webp"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center select-none opacity-30"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/85 to-[#020202]" />
      </div>

      {/* Brilho dourado ambiente central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.06)_0%,transparent_65%)] pointer-events-none" />

      {/* Conteúdo central */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <div className="mb-6 opacity-50">
          <h2 id="sentenca" className="text-[9px] uppercase tracking-[0.5em] text-[#C5A059] scroll-mt-28">
            SENTENTIA AUREA
          </h2>
        </div>

        {/* Citação de impacto */}
        <figure className="mb-8 sm:mb-10">
          <blockquote className="font-cormorant text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic tracking-[0.12em] text-[#F3EFE6] leading-tight max-w-3xl mx-auto">
            {t.home.quLine1}
            <br />
            <span className="text-[#C5A059] font-normal not-italic font-cinzel text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] block mt-2 sm:mt-3">
              {t.home.quLine2}
            </span>
          </blockquote>
          <figcaption>
            <cite className="mt-5 block font-cinzel text-[10px] sm:text-[11px] not-italic uppercase tracking-[0.35em] text-[#9A7B38]">
              Jorge Uquillas · Master Goldsmith &amp; Hand Engraver
            </cite>
          </figcaption>
        </figure>

        {/* Ornamento de coroa de louros */}
        <div className="flex items-center justify-center gap-3 opacity-80 mb-10">
          <div className="h-px w-14 md:w-24 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <LaurelWreath className="w-5 h-5 md:w-6 md:h-6 text-[#C5A059]" />
          <div className="h-px w-14 md:w-24 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        {/* ── Carrossel com fotos dos clientes (sem pular altura) ── */}
        <div
          className="mt-4 max-w-md mx-auto w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative border border-[#C5A059]/40 bg-[#070707] p-2.5 sm:p-3 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
            {/* Cantoneiros clássicos de joalheria */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C5A059] z-20" aria-hidden />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#C5A059] z-20" aria-hidden />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#C5A059] z-20" aria-hidden />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C5A059] z-20" aria-hidden />

            {/* Tag do patrono */}
            <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-[#020202]/85 border border-[#C5A059]/40 backdrop-blur-sm">
              <span className="font-poppins text-[9px] uppercase tracking-widest text-[#E6CA85]">
                Collector {String(current + 1).padStart(2, '0')} / {String(CLIENT_IMAGES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Área do slide com altura estável (aspect-ratio fixo 4/5) */}
            <div
              className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505] rounded-sm select-none cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                key={current}
                src={CLIENT_IMAGES[current].src}
                alt={CLIENT_IMAGES[current].alt}
                loading="eager"
                draggable={false}
                className="w-full h-full object-cover select-none animate-[carouselFade_0.5s_ease-out]"
              />

              {/* Vinheta suave inferior para legibilidade */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent pointer-events-none" />

              {/* Legenda do patrono sobre a foto */}
              <div className="absolute bottom-3 inset-x-3 text-center pointer-events-none">
                <p className="font-cinzel text-[11px] sm:text-xs text-[#F3EFE6] tracking-[0.16em] uppercase drop-shadow-md">
                  {CLIENT_IMAGES[current].label}
                </p>
                <p className="font-cormorant italic text-xs text-[#C5A059] tracking-wider mt-0.5">
                  Handcrafted 1/1 Masterpiece
                </p>
              </div>
            </div>

            {/* Setas de navegação */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous client photo"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-[#020202]/95 border border-[#C5A059]/60 text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.8)] active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next client photo"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-10 h-10 rounded-full bg-[#020202]/95 border border-[#C5A059]/60 text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.8)] active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Indicadores de bolinhas */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {CLIENT_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to client photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-[#C5A059] w-6 shadow-[0_0_8px_rgba(197,160,89,0.6)]'
                    : 'bg-[#C5A059]/30 hover:bg-[#C5A059]/60 w-1.5'
                }`}
              />
            ))}
          </div>

          <p className="mt-2.5 text-[9px] uppercase tracking-[0.25em] text-[#9A7B38]/80 text-center">
            Swipe or use arrows to view client commissions
          </p>
        </div>
      </div>

      <style>{`
        @keyframes carouselFade {
          from { opacity: 0; transform: scale(1.02); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

export default QuoteSection;
