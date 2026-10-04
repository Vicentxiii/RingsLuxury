import React from 'react';
import { LaurelWreath, AcanthusLeaf } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';

export function QuoteSection() {
  const { t } = useLanguage();
  return (
    <section
      id="quote"
      className="relative w-full py-40 md:py-56 bg-[#020202] text-[#EAE6DF] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fundo, imagem de fundo da seção Jorge Uquillas Rings Luxury */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src="/PUBLIC/Imagem%20de%20fundo%20de%20se%C3%A7%C3%A3o%20Jorge%20uquillas%20Rings%20Luxury.webp"
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
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#9A7B38]">
            SENTENTIA AUREA
          </span>
        </div>

        {/* Centered Typography: "TIME CREATES HISTORY. THE MASTER CREATES LEGACY." */}
        <blockquote className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic tracking-[0.14em] text-[#F3EFE6] leading-tight mb-10 max-w-3xl mx-auto">
          {t.home.quLine1}
          <br />
          <span className="text-[#C5A059] font-normal not-italic font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.22em] block mt-2">
            {t.home.quLine2}
          </span>
        </blockquote>

        {/* Small antique-gold ornament underneath */}
        <div className="flex items-center justify-center gap-3 opacity-85">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <LaurelWreath className="w-6 h-6 text-[#C5A059]" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        {/* Master engraver, Creating legacy */}
        <figure className="mt-12 max-w-md mx-auto">
          <div className="relative border border-[#C5A059]/40 bg-[#070707] p-2.5 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#C5A059]" aria-hidden />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#C5A059]" aria-hidden />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#C5A059]" aria-hidden />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#C5A059]" aria-hidden />
            <div className="overflow-hidden bg-[#020202]">
              <img
                src={encodeURI('/PUBLIC/Master engraver Jorge Uquillas seção Creating legacy.webp')}
                alt={t.home.quPhotoAlt}
                loading="lazy"
                draggable={false}
                className="w-full h-auto object-cover select-none"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
