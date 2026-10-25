import { useEffect, useRef, useState } from 'react';
import { GreekKeyBorder, GreekMeanderDivider, AcanthusLeaf } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';
import { ResponsiveImg } from './ResponsiveImg';

const ATELIER_VIDEO = '/PUBLIC/atelier-video-monograma-maconico-templarios.mp4';
const AGUIA_IMG =
  '/PUBLIC/luxury-rings-collection-anel-aguia-maconica-by-jorge-uquillas-rings-luxury.webp';

/**
 * Vídeo do ateliê sob demanda — sem autoplay.
 *
 * Exibe um poster com botão de play; o vídeo só carrega quando o utilizador
 * toca/clica em "play", eliminando o impacto no LCP.
 */
function LazyAtelierVideo({ ariaLabel }: { ariaLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    // Give React a tick to render the src, then play
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 50);
  };

  return (
    <div className="relative w-full h-full bg-[#020202] overflow-hidden">
      <video
        ref={videoRef}
        src={playing ? ATELIER_VIDEO : undefined}
        poster={AGUIA_IMG}
        muted
        loop
        playsInline
        preload="none"
        aria-label={ariaLabel}
        className="w-full h-full object-cover filter contrast-[1.1] brightness-95"
      />
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={ariaLabel}
          className="absolute inset-0 flex items-center justify-center group"
        >
          {/* Dark overlay */}
          <span className="absolute inset-0 bg-[#020202]/30 transition-opacity duration-500 group-hover:bg-[#020202]/10" aria-hidden />
          {/* Play ring */}
          <span className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-[#E6CA85]/60 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(197,160,89,0.25)] transition-all duration-500 group-hover:scale-110 group-hover:border-[#E6CA85]/90 group-hover:shadow-[0_0_50px_rgba(197,160,89,0.4)]">
            <span className="absolute inset-0 rounded-full border border-[#C5A059]/20 scale-125 animate-ping" aria-hidden style={{ animationDuration: '2.5s' }} />
            <span className="ml-1 block h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-[#E6CA85] drop-shadow-[0_2px_6px_rgba(230,202,133,0.5)]" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}

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

            {/* Large Typography: THE HAND OF JORGE UQUILLAS, letra única */}
            <h2
              id="atelier-heading"
              className="font-cinzel text-2xl sm:text-3xl md:text-4xl tracking-[0.16em] uppercase text-[#FBF9F5] font-light leading-[1.25] scroll-mt-28"
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
              <footer className="mt-4 not-italic">
                <cite className="font-cinzel text-[10px] sm:text-xs not-italic uppercase tracking-[0.35em] text-[#C5A059]">
                  Jorge Uquillas
                </cite>
              </footer>
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
                <LazyAtelierVideo ariaLabel={t.home.atVideoAria} />
              </div>

              {/* Caption SEO, peça real: maçônico 18k com citrino */}
              <div className="mt-3 flex items-center justify-center text-center text-[9px] uppercase tracking-[0.3em] text-[#9A7B38]">
                <span>{t.home.atCaptionMono}</span>
              </div>
            </div>

            {/* Overlapping secondary vignette (Águia Maçônica) */}
            <div className="hidden sm:block absolute -bottom-12 -left-10 w-48 md:w-56 border border-[#C5A059]/40 bg-[#0A0A0A] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              <div className="aspect-square overflow-hidden bg-black">
                <ResponsiveImg
                  src={AGUIA_IMG}
                  alt={t.home.atAguiaAlt}
                  width={800}
                  height={800}
                  sizes="224px"
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

      <div className="w-full mt-24 opacity-25">
        <GreekKeyBorder className="w-full h-3" />
      </div>
    </section>
  );
}
