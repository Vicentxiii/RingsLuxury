import React from 'react';
import { GreekKeyBorder, GreekMeanderDivider, AcanthusLeaf } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';

const ATELIER_VIDEO = '/PUBLIC/atelier-video-monograma-maconico-templarios.mp4';
const AGUIA_IMG =
  '/PUBLIC/Luxury%20rings%20collection%20anel%20Aguia%20ma%C3%A7onica%20by%20Jorge%20Uquillas%20rings%20luxury.png';

export function Atelier() {
  const { t } = useLanguage();
  return (
    <section
      id="atelier"
      className="relative w-full py-32 md:py-44 bg-black text-[#EAE6DF] overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Large Editorial Typography & Story */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2">
              <AcanthusLeaf className="w-4 h-4 text-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">
                {t.home.atKicker}
              </span>
            </div>

            {/* Large Typography: THE HAND OF JORGE UQUILLAS — letra única */}
            <h2
              id="atelier-heading"
              className="font-cinzel text-2xl sm:text-3xl md:text-4xl tracking-[0.16em] uppercase text-[#FBF9F5] font-light leading-[1.25]"
            >
              {t.home.atTitleA}
              <br />
              <span className="text-[#C5A059]">
                JORGE UQUILLAS
              </span>
              <span className="mt-3 block text-xs sm:text-sm tracking-[0.4em] text-[#E6CA85] uppercase">
                {t.home.atRole}
              </span>
            </h2>

            {/* Text: Every masterpiece begins with an idea... */}
            <blockquote className="font-cormorant text-2xl sm:text-3xl italic text-[#EAE6DF] leading-relaxed border-l-2 border-[#C5A059]/40 pl-6 my-6">
              {t.home.atQuote1}
              <br />
              {t.home.atQuote2}
            </blockquote>

            <p className="font-sans-luxury text-xs sm:text-sm text-[#A8A296] leading-relaxed tracking-wider">
              {t.home.atText}
            </p>

            {/* Atelier Disciplines Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#C5A059]/20">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7B38] block mb-1">
                  {t.home.atDisc1}
                </span>
                <span className="font-cinzel text-xs text-[#F3EFE6] uppercase tracking-wider">
                  {t.home.atDisc1Name}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7B38] block mb-1">
                  {t.home.atDisc2}
                </span>
                <span className="font-cinzel text-xs text-[#F3EFE6] uppercase tracking-wider">
                  {t.home.atDisc2Name}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7B38] block mb-1">
                  {t.home.atDisc3}
                </span>
                <span className="font-cinzel text-xs text-[#F3EFE6] uppercase tracking-wider">
                  {t.home.atDisc3Name}
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Photography Composition (Artisan hands engraving metal) */}
          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#C5A059]/30 bg-[#070707] p-3 md:p-4 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
              {/* Gold Corner Marks */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#C5A059]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#C5A059]" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#C5A059]" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#C5A059]" />

              <div className="overflow-hidden aspect-[16/11] bg-[#020202]">
                <video
                  src={ATELIER_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={t.home.atVideoAria}
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-95"
                />
              </div>

              {/* Caption */}
              <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-[#9A7B38]">
                <span>{t.home.atCaptionFilm}</span>
                <span>{t.home.atCaptionMono}</span>
              </div>
            </div>

            {/* Overlapping secondary vignette (Águia Maçônica) */}
            <div className="hidden sm:block absolute -bottom-12 -left-10 w-48 md:w-56 border border-[#C5A059]/40 bg-[#0A0A0A] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              <div className="aspect-square overflow-hidden bg-black">
                <img
                  src={AGUIA_IMG}
                  alt={t.home.atAguiaAlt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-contain filter contrast-110"
                />
              </div>
              <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-[#C5A059] text-center">
                ÁGUIA MAÇÔNICA • JORGE UQUILLAS
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-24 opacity-20">
        <GreekKeyBorder className="w-full h-1" />
      </div>
    </section>
  );
}
