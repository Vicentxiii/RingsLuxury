import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface ProcessStep {
  src: string;
  step: string;
  title: string;
  caption: string;
}

interface ProcessCarouselProps {
  items: ProcessStep[];
  heading?: string;
  subheading?: string;
}

export function ProcessCarousel({
  items,
  heading = 'O Processo Artesanal • Da Barra Bruta à Obra-Prima',
  subheading = 'Cada traço gravado à mão livre com buris de aço temperado por Jorge Uquillas'
}: ProcessCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const prev = () => {
    setActiveIndex((curr) => (curr === 0 ? items.length - 1 : curr - 1));
  };

  const next = () => {
    setActiveIndex((curr) => (curr === items.length - 1 ? 0 : curr + 1));
  };

  // Scroll active thumbnail into view smoothly
  useEffect(() => {
    if (!thumbsRef.current) return;
    const activeThumb = thumbsRef.current.children[activeIndex] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!items || items.length === 0) return null;

  const current = items[activeIndex];

  return (
    <div className="my-14 border border-[#C5A059]/30 bg-[#060606] rounded-xl p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
      {/* Header do Carrossel */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
          <span className="font-poppins text-[10px] uppercase tracking-[0.25em] text-[#E6CA85]">
            Atelier Handcraft Archive
          </span>
        </div>
        <h3 className="font-cinzel text-xl md:text-2xl text-[#F3EFE6] tracking-wide mb-2">
          {heading}
        </h3>
        <p className="font-cormorant italic text-[#C5A059] text-base md:text-lg">
          {subheading}
        </p>
      </div>

      {/* Slide Principal */}
      <div className="relative aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10] max-h-[580px] w-full bg-black rounded-lg overflow-hidden border border-[#C5A059]/20 flex items-center justify-center">
        <img
          key={current.src}
          src={current.src}
          alt={`${current.step}: ${current.title}`}
          className="w-full h-full object-contain mx-auto transition-opacity duration-300 animate-[fadeIn_0.35s_ease-out]"
          loading="eager"
        />

        {/* Botão Anterior */}
        <button
          type="button"
          onClick={prev}
          aria-label="Etapa anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#030303]/80 border border-[#C5A059]/40 text-[#E6CA85] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-all cursor-pointer backdrop-blur-md shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Botão Próximo */}
        <button
          type="button"
          onClick={next}
          aria-label="Próxima etapa"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#030303]/80 border border-[#C5A059]/40 text-[#E6CA85] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-all cursor-pointer backdrop-blur-md shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Badge do Passo Flutuante */}
        <div className="absolute top-4 left-4 bg-[#030303]/85 backdrop-blur-md border border-[#C5A059]/40 px-3.5 py-1.5 rounded-md text-[10px] font-poppins uppercase tracking-[0.2em] text-[#E6CA85] flex items-center gap-2 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span>{current.step}</span>
        </div>
      </div>

      {/* Legenda Explicativa da Etapa */}
      <div className="mt-5 text-center px-2">
        <h4 className="font-cinzel text-lg text-[#F3EFE6] tracking-wide mb-1.5">
          {current.title}
        </h4>
        <p className="font-cormorant text-base md:text-lg text-[#D8D2C4] max-w-2xl mx-auto leading-relaxed">
          {current.caption}
        </p>
      </div>

      {/* Miniaturas (Thumbnails) para navegação direta */}
      <div
        ref={thumbsRef}
        className="mt-6 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-[#C5A059] scale-105 shadow-[0_0_15px_rgba(197,160,89,0.5)]'
                  : 'border-[#C5A059]/20 opacity-55 hover:opacity-100 hover:border-[#C5A059]/50'
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[8px] font-poppins text-center text-[#E6CA85] py-0.5">
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

