import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LaurelWreath } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';

/** Fotos dos anéis para o carrossel — adicione mais conforme necessário */
const RING_IMAGES: { src: string; alt: string }[] = [
  {
    src: '/PUBLIC/master-engraver-jorge-uquillas-secao-creating-legacy.webp',
    alt: 'Master engraver Jorge Uquillas — Creating Legacy',
  },
  {
    src: '/PUBLIC/anel-kraken-feito-em-ouro-ruby-e-diamantes-y-jorge-uquillas-rings-luxury.webp',
    alt: 'Anel Kraken — Ouro, Rubis e Diamantes',
  },
  {
    src: '/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-3-1280.webp',
    alt: 'Anel 18k Ouro — Hand Engraving Jorge Uquillas',
  },
  {
    src: '/PUBLIC/tiger-ring-18k-gold-with-diamonds-by-rings-luxury-jorge-uquillas-angle-1.webp',
    alt: 'Tiger Ring — Ouro 18k com Diamantes',
  },
  {
    src: '/PUBLIC/tempest-ring-by-rings-luxury-angle-6-real-ring.webp',
    alt: 'Tempest Ring — Rings Luxury Jorge Uquillas',
  },
  {
    src: '/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-7-1600.webp',
    alt: 'Anel 18k Gold — Hand Engraving Gallery',
  },
];

export function QuoteSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? RING_IMAGES.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === RING_IMAGES.length - 1 ? 0 : c + 1));
  }, []);

  return (
    <section
      id="quote"
      aria-labelledby="sentenca"
      className="relative w-full py-40 md:py-56 bg-[#020202] text-[#EAE6DF] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fundo, imagem de fundo da seção Jorge Uquillas Rings Luxury */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src="/PUBLIC/imagem-de-fundo-de-secao-jorge-uquillas-rings-luxury.webp"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        {/* véu escuro para o texto respirar */}
        <div className="absolute inset-0 bg-[#020202]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
      </div>

      {/* Subtle radial dark ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.04)_0%,transparent_65%)] pointer-events-none" />

      {/* Large Negative Space Centered Composition */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8 opacity-40">
          <h2 id="sentenca" className="text-[9px] uppercase tracking-[0.5em] text-[#9A7B38] scroll-mt-28">
            SENTENTIA AUREA
          </h2>
        </div>

        {/* Citação */}
        <figure className="mb-10">
          <blockquote className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic tracking-[0.14em] text-[#F3EFE6] leading-tight max-w-3xl mx-auto">
            {t.home.quLine1}
            <br />
            <span className="text-[#C5A059] font-normal not-italic font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.22em] block mt-2">
              {t.home.quLine2}
            </span>
          </blockquote>
          <figcaption>
            <cite className="mt-6 block font-cinzel text-[10px] sm:text-[11px] not-italic uppercase tracking-[0.35em] text-[#9A7B38]">
              Jorge Uquillas
            </cite>
          </figcaption>
        </figure>

        {/* Small antique-gold ornament underneath */}
        <div className="flex items-center justify-center gap-3 opacity-85">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <LaurelWreath className="w-6 h-6 text-[#C5A059]" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        {/* ── Carrossel de anéis ── */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="relative border border-[#C5A059]/40 bg-[#070707] p-2.5 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
            {/* Corner marks */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#C5A059]" aria-hidden />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#C5A059]" aria-hidden />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#C5A059]" aria-hidden />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#C5A059]" aria-hidden />

            {/* Slide area */}
            <div className="overflow-hidden bg-[#020202] relative">
              <img
                key={current}
                src={RING_IMAGES[current].src}
                alt={RING_IMAGES[current].alt}
                loading="lazy"
                draggable={false}
                className="w-full h-auto object-cover select-none transition-opacity duration-500"
                style={{ animation: 'slideIn 0.4s ease-out' }}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>

            {/* Navigation arrows */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous ring"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-9 h-9 rounded-full bg-[#020202]/90 border border-[#C5A059]/60 text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next ring"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-9 h-9 rounded-full bg-[#020202]/90 border border-[#C5A059]/60 text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {RING_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to ring ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-[#C5A059] w-4'
                    : 'bg-[#C5A059]/30 hover:bg-[#C5A059]/60'
                }`}
              />
            ))}
          </div>

          {/* Caption */}
          <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-[#9A7B38] text-center">
            {current + 1} / {RING_IMAGES.length} · {RING_IMAGES[current].alt}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
