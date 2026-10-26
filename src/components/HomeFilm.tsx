import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LaurelWreath, GreekMeanderDivider } from './OrnamentIcons';
import { ResponsiveImg } from './ResponsiveImg';

const YOUTUBE_ID = 'ieNPhZ4Vdss';
const POSTER = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const POSTER_FALLBACK = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
const EMBED = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`;

/**
 * HomeFilm — Atelier Film section, directly below the Hero.
 *
 * The video does NOT autoplay: a poster is shown and the YouTube iframe is
 * only loaded when the visitor clicks the play button (zero bytes on first
 * load). The section has an elegant title and editorial description optimised
 * for the "Hand Engraving" SEO keyword.
 */
export function HomeFilm() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="film"
      aria-label={t.home.filmAria}
      className="relative overflow-hidden bg-[#020202] py-20 sm:py-32"
    >
      {/* Background Image: Medusa e Odim Junto bem mais claro */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <ResponsiveImg
          src="/PUBLIC/medusa-e-odim-capa-do-site-rings-luxury-by-jorge-uquillas.webp"
          alt=""
          decorative
          width={1600}
          height={844}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-contain object-center scale-[1.03] opacity-85 sm:opacity-95"
        />
        {/* Apenas sutis fades no topo e base para dissolver com as seções adjacentes sem escurecer a foto */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020202] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020202] to-transparent" />
      </div>

      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 100%, rgba(197,160,89,0.07) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">

        {/* ── Section header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <LaurelWreath className="w-4 h-4 text-[#C5A059]" />
            <span className="font-cinzel text-[10px] sm:text-[11px] uppercase tracking-[0.46em] text-[#C5A059] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {t.home.filmEyebrow}
            </span>
            <LaurelWreath className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2 className="font-cinzel font-light text-[#FBF9F5] uppercase tracking-[0.14em] leading-[1.08] mb-6"
            style={{
              fontSize: 'clamp(28px, 5vw, 56px)',
              textShadow: '0 2px 20px rgba(0,0,0,0.95), 0 0 35px rgba(0,0,0,0.85)',
            }}
          >
            {t.home.filmTitle}
          </h2>

          <GreekMeanderDivider className="mx-auto mb-7 opacity-70 w-40 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />

          <p
            className="font-cormorant italic text-[#F0EBE0] leading-relaxed max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(16px, 1.5vw, 21px)',
              textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 0 25px rgba(0,0,0,0.8)',
            }}
          >
            {t.home.filmDescription}
          </p>
        </div>

        {/* ── Video player ── */}
        <div className="relative mx-auto w-full max-w-4xl">
          {/* Decorative corner marks */}
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#C5A059]/60 z-10 pointer-events-none" />
          <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#C5A059]/60 z-10 pointer-events-none" />
          <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#C5A059]/60 z-10 pointer-events-none" />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#C5A059]/60 z-10 pointer-events-none" />

          <div
            className="relative overflow-hidden border border-[#C5A059]/25 bg-[#050505]"
            style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(197,160,89,0.08)' }}
          >
            <div className="relative aspect-video w-full">
              {playing ? (
                <iframe
                  title={t.home.filmTitle}
                  src={EMBED}
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button
                  type="button"
                  id="home-film-play-btn"
                  onClick={() => setPlaying(true)}
                  aria-label={t.home.filmPlay}
                  className="not-rounded group absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left"
                >
                  {/* Poster */}
                  <img
                    src={POSTER}
                    alt="Jorge Uquillas hand engraving a ring at his atelier in São Paulo"
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                    onError={(event) => {
                      if (event.currentTarget.src !== POSTER_FALLBACK) {
                        event.currentTarget.src = POSTER_FALLBACK;
                      }
                    }}
                  />

                  {/* Dark gradient overlay */}
                  <span className="absolute inset-0 bg-gradient-to-t from-[#020202]/85 via-[#020202]/20 to-[#020202]/10" aria-hidden />
                  <span className="absolute inset-0 bg-[#020202]/15 transition-opacity duration-500 group-hover:bg-[#020202]/0" aria-hidden />

                  {/* Play button — elegant ring */}
                  <span className="absolute left-1/2 top-1/2 flex h-24 w-24 sm:h-28 sm:w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E6CA85]/60 bg-black/40 backdrop-blur-md shadow-[0_0_40px_rgba(197,160,89,0.25)] transition-all duration-500 group-hover:scale-110 group-hover:border-[#E6CA85]/90 group-hover:shadow-[0_0_60px_rgba(197,160,89,0.4)]">
                    {/* Outer pulse ring */}
                    <span className="absolute inset-0 rounded-full border border-[#C5A059]/20 scale-125 animate-ping" aria-hidden style={{ animationDuration: '2.5s' }} />
                    {/* Play triangle */}
                    <span className="ml-1.5 block h-0 w-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-[#E6CA85] drop-shadow-[0_2px_8px_rgba(230,202,133,0.5)]" aria-hidden />
                  </span>

                  {/* Bottom-left label */}
                  <span className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 flex items-center gap-2.5">
                    <span className="block h-px w-8 bg-[#C5A059]/70" aria-hidden />
                    <span className="font-cinzel text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.36em] text-[#E9E2D6]/90">
                      {t.home.filmPlay}
                    </span>
                  </span>

                  {/* Bottom-right — location badge */}
                  <span className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 font-cinzel text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#C5A059]/70 bg-[#020202]/70 backdrop-blur-sm px-3 py-1 border border-[#C5A059]/20">
                    Atelier São Paulo
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Foot note ── */}
        <div className="mt-8 text-center">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.32em] text-[#9A7B38]/70">
            Hand Engraving • Master Goldsmith • Jorge Uquillas • São Paulo, Brazil
          </p>
        </div>

      </div>
    </section>
  );
}
