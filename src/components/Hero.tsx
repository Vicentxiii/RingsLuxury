import React from 'react';

interface HeroProps {
  onEnterAtelier: () => void;
}

// Imagem composta da HERO antiga (Odin esquerda + Medusa direita) — 2048x1080
const OLD_HERO_COMPOSITE = encodeURI(
  '/PUBLIC/Medusa e Odim capa do site rings luxury by Jorge Uquillas.webp'
);

// Fallback estático caso o embed do YouTube não carregue / bloqueie
const FALLBACK_COVER = OLD_HERO_COMPOSITE;

const YOUTUBE_ID = 'ieNPhZ4Vdss';
// autoplay mudo em loop, sem controles, sem relacionados, modest branding
const YOUTUBE_EMBED = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_ID}&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&enablejsapi=0`;

export function Hero({ onEnterAtelier: _onEnterAtelier }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full bg-[#020202] overflow-hidden flex items-center justify-center isolate"
      style={{ height: '92vh', minHeight: '560px', maxHeight: '900px' }}
      aria-label="RINGS LUXURY by Jorge Uquillas — Hero"
    >
      {/* 1. VIDEO BACKGROUND - YouTube */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#040404]">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
          <iframe
            title="RINGS LUXURY — Atelier handcrafted background film"
            src={YOUTUBE_EMBED}
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] sm:w-[220%] sm:h-[220%] lg:w-[135%] lg:h-[135%] -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.02]"
            style={{ border: 0, opacity: 1 }}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen={false}
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url("${FALLBACK_COVER}")` }}
          aria-hidden
        />
      </div>

      {/* 2. DARKEN OVERLAYS — AINDA MAIS CLARO */}
      <div className="absolute inset-0 z-10 bg-[#020202]/07" aria-hidden />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 74% at 50% 52%, transparent 58%, rgba(2,2,2,0.05) 72%, rgba(2,2,2,0.16) 94%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-[6%] z-10 bg-gradient-to-b from-[#020202]/28 via-[#020202]/04 to-transparent pointer-events-none" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-[8%] z-10 bg-gradient-to-t from-[#020202]/20 via-[#020202]/03 to-transparent pointer-events-none" aria-hidden />
      <div className="absolute inset-y-0 left-0 w-[10%] z-10 bg-gradient-to-r from-[#020202]/14 via-[#020202]/03 to-transparent pointer-events-none hidden sm:block" aria-hidden />
      <div className="absolute inset-y-0 right-0 w-[10%] z-10 bg-gradient-to-l from-[#020202]/14 via-[#020202]/03 to-transparent pointer-events-none hidden sm:block" aria-hidden />

      {/* 3. COMPOSITE ODIN + MEDUSA por cima do video — liso sem textura */}
      <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-hidden" aria-hidden>
        <img
          src={OLD_HERO_COMPOSITE}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ objectPosition: 'center center', opacity: 0.84 }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-[#020202]/03" />
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.12)]" />
      </div>

      {/* 5. TEXTO CENTRAL — WELCOME TO RINGS LUXURY / MASTER PIECES */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="flex flex-col items-center gap-3 sm:gap-4">
          <span
            className="font-cormorant font-light text-[#E9E2D6]/95 leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(11px, 1.9vw, 22px)',
              letterSpacing: '0.62em',
              textShadow: '0 2px 18px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.55)',
              fontWeight: 300,
            }}
          >
            WELCOME TO RINGS LUXURY
          </span>
          <span
            className="font-cormorant font-light text-[#E9E2D6]/80 leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(8px, 1.05vw, 11.5px)',
              letterSpacing: '0.78em',
              textShadow: '0 1px 12px rgba(0,0,0,0.9)',
              fontWeight: 300,
            }}
          >
            MASTER PIECES
          </span>
        </h1>
      </div>

      {/* 6. LINHA INFERIOR CURVA */}
      <div className="absolute bottom-0 left-0 w-full h-[38px] z-20 pointer-events-none overflow-hidden" aria-hidden>
        <svg
          viewBox="0 0 1440 38"
          preserveAspectRatio="none"
          className="w-full h-full block text-[#020202]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 28 C 260 38, 420 2, 720 14 C 1020 26, 1180 36, 1440 12 L 1440 38 L 0 38 Z" opacity="0.98" />
        </svg>
      </div>

      <a
        href="#collections"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 focus:opacity-100 focus:pointer-events-auto pointer-events-none text-[10px] tracking-[0.3em] text-[#C5A059] border border-[#C5A059]/40 px-4 py-2 rounded-full bg-black/60 backdrop-blur"
      >
        Ver coleção
      </a>
    </section>
  );
}
