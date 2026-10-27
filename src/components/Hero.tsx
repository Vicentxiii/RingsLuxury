import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  onEnterAtelier: () => void;
}

const YOUTUBE_ID = 'ieNPhZ4Vdss';
const POSTER     = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const POSTER_FB  = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
// Vídeo inicia em 1 minuto (start=60), mudo, autoplay e em loop contínuo
const EMBED      = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&start=60&enablejsapi=1`;

const MEDUSA_ODIN_PNG  = '/PUBLIC/medusa-e-odim-capa-do-site-rings-luxury-by-jorge-uquillas.png';
const MEDUSA_ODIN_WEBP = '/PUBLIC/medusa-e-odim-capa-do-site-rings-luxury-by-jorge-uquillas-transparente.webp';

export function Hero({ onEnterAtelier: _onEnterAtelier }: HeroProps) {
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [posterErr, setPosterErr]     = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center bg-[#020202]"
      style={{ height: '94vh', minHeight: '580px', maxHeight: '1000px' }}
      aria-label={t.home.heroSectionAria}
    >

      {/* ── CAMADA DE BAIXO: VÍDEO DO ATELIER (YOUTUBE) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Poster de carregamento enquanto o iframe do YouTube inicializa */}
        {!videoLoaded && (
          <img
            src={posterErr ? POSTER_FB : POSTER}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setPosterErr(true)}
          />
        )}

        <iframe
          title="Rings Luxury Atelier Film"
          src={EMBED}
          className="absolute pointer-events-none"
          style={{
            border: 0,
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw', // Proporção 16:9
            minHeight: '100%',
            minWidth: '177.77vh', // Proporção 16:9
            transform: 'translate(-50%, -50%) scale(1.15)',
            transformOrigin: 'center center',
          }}
          allow="autoplay; encrypted-media"
          onLoad={() => setVideoLoaded(true)}
        />

        {/* Leve película para integrar o vídeo ao fundo escuro e dar contraste ideal */}
        <div className="absolute inset-0 bg-[#020202]/30" aria-hidden />
      </div>

      {/* ── CAMADA SUPERIOR: MEDUSA E ODIN (PNG TRANSPARENTE COBRINDO A TELA TODA) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden" aria-hidden>
        <picture className="w-full h-full">
          <source srcSet={MEDUSA_ODIN_WEBP} type="image/webp" />
          <img
            src={MEDUSA_ODIN_PNG}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
            }}
            onError={(e) => {
              // Fallback caso a imagem não carregue
              const target = e.currentTarget as HTMLImageElement;
              if (target.src !== MEDUSA_ODIN_PNG) {
                target.src = MEDUSA_ODIN_PNG;
              }
            }}
          />
        </picture>
      </div>

      {/* ── CAMADA DO TEXTO: CENTRALIZADO EM CIMA DO VÍDEO ── */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none w-full">

        {/* WELCOME TO RINGS LUXURY */}
        <h1
          className="font-cormorant font-light text-[#E8E2D8] uppercase leading-tight tracking-[0.42em] sm:tracking-[0.55em]"
          style={{
            fontSize:   'clamp(15px, 2.3vw, 28px)',
            textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.9)',
          }}
        >
          {t.home.heroWelcome}
        </h1>

        {/* MASTER PIECES */}
        <p
          className="mt-2 font-cormorant font-light text-[#C5A059]/90 uppercase tracking-[0.62em] sm:tracking-[0.78em]"
          style={{
            fontSize:   'clamp(10px, 1.2vw, 15px)',
            textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.85)',
          }}
        >
          {t.home.heroEyebrow2}
        </p>

        {/* SEO Hidden Summary for Search Crawlers */}
        <p className="seo-summary sr-only">
          RINGS LUXURY is the atelier of Jorge Uquillas, master goldsmith and hand engraver,
          with private ateliers in São Paulo (Avenida Paulista, Brazil) and Miami (Brickell, Florida, USA).
          He makes 1/1 hand-engraved 18k gold rings, cast solid and engraved by hand for 90 to 140 hours,
          with hand-selected natural diamonds set one by one under the microscope.
          A hand engraving 18k gold diamond ring starts at US$ 4,800 and reaches clients in over 50 countries.
        </p>
      </div>

      {/* ── ÍCONE DA CHAMA / GOTA DOURADA — INFERIOR CENTRAL ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none" aria-hidden>
        <div className="relative w-4 h-5 flex items-center justify-center">
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]">
            <path
              d="M7 0C7 0 2.5 5 2.5 10C2.5 13.5 4.5 16.5 7 16.5C9.5 16.5 11.5 13.5 11.5 10C11.5 5 7 0 7 0Z"
              fill="url(#flame_grad)"
            />
            <circle cx="7" cy="11.5" r="2.5" fill="#FFE29A" />
            <defs>
              <radialGradient id="flame_grad" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="#FFF2D1" />
                <stop offset="40%" stopColor="#E5B25D" />
                <stop offset="100%" stopColor="#8C5C1A" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* ── CURVA INFERIOR SUAVE PARA TRANSIÇÃO ── */}
      <div className="absolute bottom-0 left-0 w-full h-[32px] z-20 pointer-events-none overflow-hidden" aria-hidden>
        <svg viewBox="0 0 1440 32" preserveAspectRatio="none"
          className="w-full h-full block text-[#020202]"
          fill="currentColor" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 24 C 260 32, 420 2, 720 12 C 1020 22, 1180 30, 1440 10 L 1440 32 L 0 32 Z" opacity="0.98" />
        </svg>
      </div>

    </section>
  );
}
