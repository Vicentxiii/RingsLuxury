import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Feather } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Piece {
  src: string;
  name: string;
  altKey: 'featAlt1' | 'featAlt2' | 'featAlt3' | 'featAlt4' | 'featAlt5' | 'featAlt6' | 'featAlt7' | 'featAlt8' | 'featAlt9' | 'featAlt10' | 'featAlt11' | 'featAlt12' | 'featAlt13';
  /** rota /produto/:slug da peça real no catálogo */
  to: string;
  /** zoom extra p/ fotos cuja peça saiu pequena no enquadramento (ex: Sinnet) */
  zoom?: string;
}

/** Coleção Luxury Rings, anéis 1/1 HandCrafted em ouro 18k */
const PIECES: Piece[] = [
  {
    src: '/PUBLIC/luxury-rings-collection-anel-aguia-maconica-by-jorge-uquillas-rings-luxury.webp',
    name: 'Águia Masônica',
    altKey: 'featAlt1',
    to: '/produto/luxury-emperor-masonic-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/luxury-rings-collection-anel-caveira-by-jorge-uquillas-rings-luxury.webp',
    name: 'Caveira',
    altKey: 'featAlt2',
    to: '/produto/rose-gold-pirate-skull-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/luxury-rings-collection-anel-caveira-com-diamantes-by-jorge-uquillas-rings-luxury.webp',
    name: 'Caveira com Diamantes',
    altKey: 'featAlt3',
    to: '/produto/king-skull-ring-18k-diamonds-especial-edition-jorge-uquillas',
  },
  {
    src: '/PUBLIC/luxury-rings-collection-anel-grau-33-by-jorge-uquillas-rings-luxury.webp',
    name: 'Grau 33',
    altKey: 'featAlt4',
    to: '/produto/mixed-masonic-33-degrees-gold-silver-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/luxury-rings-collection-anel-medusa-by-jorge-uquillas-rings-luxury.webp',
    name: 'Medusa',
    altKey: 'featAlt5',
    to: '/produto/medusa-ring-especial-edition-diamonds-jorge-uquillas',
  },
  {
    src: '/PUBLIC/luxury-rings-collection-anel-sinnet-by-jorge-uquillas-rings-luxury.webp',
    name: 'Sinnet',
    altKey: 'featAlt6',
    to: '/produto/emperor-heraldic-ring-18k-gold-jorge-uquillas',
    zoom: 'scale-[1.55] group-hover:scale-[1.7]',
  },
  {
    src: '/PUBLIC/luxury-rings-collection-anel-tempest-by-jorge-uquillas-rings-luxury-2.webp',
    name: 'Tempest',
    altKey: 'featAlt7',
    to: '/produto/tempest-ring-especial-edition-jorge-uquillas',
  },
  {
    src: '/PUBLIC/luxury-rings-collection-anel-tiger-by-jorge-uquillas-rings-luxury.webp',
    name: 'Tiger',
    altKey: 'featAlt8',
    to: '/produto/tiger-ring-18k-gold-jorge-uquillas',
  },
  {
    src: '/PUBLIC/mixed-luxury-gold-ring-by-rings-luxury-jorge-uquillas.webp',
    name: 'Mixed Luxury Gold',
    altKey: 'featAlt9',
    to: '/produto/mixed-luxury-gold-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/mixed-maconic-33-degrees-gold-silver-ring-by-rings-luxury-jorge-uquillas.webp',
    name: 'Mixed Maçonic 33',
    altKey: 'featAlt10',
    to: '/produto/mixed-masonic-33-degrees-gold-silver-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/mixed-templar-gold-silver-ring-18k-by-jorge-uquillas-rings-luxury.webp',
    name: 'Mixed Templar',
    altKey: 'featAlt11',
    to: '/produto/mixed-templar-gold-silver-ring-18k-jorge-uquillas',
  },
  {
    src: '/PUBLIC/mixed-gold-silver-ring-family-crest-by-jorge-uquillas-rings-luxury.webp',
    name: 'Family Crest Bicolor',
    altKey: 'featAlt12',
    to: '/produto/mixed-gold-silver-family-crest-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/mixed-gold-silver-ring-family-crest-by-jorge-uquillas-rings-luxury-with-number.webp',
    name: 'Crest Numerada',
    altKey: 'featAlt13',
    to: '/produto/mixed-gold-silver-ring-family-crest-numbered-jorge-uquillas',
  },
];

const SUBTEXT_KEY = 'featSubtext' as const;

interface GoldButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'ghost';
  icon?: React.ReactNode;
}

function GoldButton({ label, onClick, variant = 'primary', icon }: GoldButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group relative inline-flex items-center justify-center gap-3 overflow-hidden',
        'rounded-full border px-6 py-3.5 sm:px-8 sm:py-4',
        'font-cinzel uppercase whitespace-nowrap',
        'transition-all duration-500 ease-out',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E6CA85]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020202]',
        isPrimary
          ? 'border-[#C5A059]/55 bg-[#C5A059]/[0.07] text-[#E6CA85] hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A0805] hover:shadow-[0_10px_38px_rgba(197,160,89,0.32)]'
          : 'border-[#C5A059]/22 bg-transparent text-[#C5A059]/80 hover:border-[#C5A059]/70 hover:bg-[#C5A059]/[0.08] hover:text-[#E6CA85]',
      ].join(' ')}
      style={{ fontSize: 'clamp(9.5px, 0.72vw, 11px)', letterSpacing: '0.3em' }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[5px] rounded-full border border-[#C5A059]/18 transition-colors duration-500 group-hover:border-[#0A0805]/20"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#E6CA85]/20 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
      />
      <span className="relative z-10 flex items-center gap-3">
        <span>{label}</span>
        {icon ? (
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            {icon}
          </span>
        ) : null}
      </span>
    </button>
  );
}

/**
 * Seção da coleção Luxury Rings, faixa infinita com os anéis 1/1 em ouro 18k.
 * Fica logo após "The Masterpiece Detail" na home.
 * Layout 100% centralizado: kicker, título, subtítulo, marquee e botões.
 */
export function FeaturedRing() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number>(0);

  // Lista duplicada para looping eterno e invisível (2ª cópia idêntica).
  const loopPieces = [...PIECES, ...PIECES];

  const pauseTemp = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => { pausedRef.current = false; }, 5000);
  };
  const pauseHold = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimer.current);
  };
  const resume = () => {
    window.clearTimeout(resumeTimer.current);
    pausedRef.current = false;
  };

  const scrollTrack = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Pausa o autoplay por 8s para o deslize da seta completar sem briga.
    pausedRef.current = true;
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => { pausedRef.current = false; }, 8000);
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  // Autoplay suave da esquerda para a direita (scrollLeft diminuindo).
  // Atribuição direta por frame (sem snap e sem "smooth" do CSS) = movimento
  // contínuo, sem trancos. Ao chegar no início, soma um período exato e continua.
  // NOTA: sem scroll-snap aqui de propósito — o snap do navegador corrige o
  // scroll a cada frame e congela o deslize (parece "parado").
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const count = PIECES.length;
    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const second = el.children[count] as HTMLElement | undefined;
      return first && second ? second.offsetLeft - first.offsetLeft : 0;
    };
    // Começa no início da 2ª cópia para ter margem à esquerda.
    // Posiciona de imediato + reconfere após o layout assentar (fontes/imagens).
    const initial = measure();
    if (initial > 0) el.scrollLeft = initial;
    const settle = requestAnimationFrame(() => {
      const p = measure();
      if (p > 0) el.scrollLeft = p;
    });
    let raf = 0;
    let last = performance.now();
    const PX_PER_MS = 0.055; // ~55px/s, visível mas elegante
    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!pausedRef.current && document.visibilityState === 'visible') {
        const period = measure();
        const max = el.scrollWidth - el.clientWidth;
        if (period > 0 && max > 0) {
          el.scrollLeft -= PX_PER_MS * dt;
          // Chegou no início: avança um período exato (conteúdo idêntico).
          if (el.scrollLeft <= 0) el.scrollLeft += period;
          // Segurança: se o usuário arrastar até o fim, normaliza.
          else if (el.scrollLeft >= max - 1) el.scrollLeft -= period;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(settle);
      window.clearTimeout(resumeTimer.current);
    };
  }, []);
  return (
    <section
      id="featured-ring"
      className="relative w-full bg-black overflow-hidden isolate"
      aria-label={t.home.featSectionAria}
    >
      {/* sessão 100% preta, sem halo/flare */}

      {/* CABEÇALHO CENTRALIZADO */}
      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12">
        <div className="flex flex-col items-center text-center">
          <span
            className="font-cinzel italic text-[#C5A059] uppercase"
            style={{ fontSize: 'clamp(10px, 1vw, 13px)', letterSpacing: '0.42em' }}
          >
            Rings Luxury
          </span>

          {/* TÍTULO SEO */}
          <h2
            className="mt-3 font-cinzel font-normal uppercase leading-[1.16] text-[#F5F0E6]"
            style={{
              fontSize: 'clamp(22px, 2.6vw, 38px)',
              letterSpacing: '0.05em',
              textShadow: '0 2px 22px rgba(0,0,0,0.7)',
            }}
          >
            {t.home.featTitle}
            <span className="mt-1.5 block text-[#C5A059]">
              {t.home.featSubtitle}
            </span>
          </h2>

          {/* filetes + losango, substitui o arabesco raster */}
          <div
            aria-hidden
            className="mt-6 mb-5 flex w-full max-w-[420px] items-center justify-center gap-3"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C5A059]/70" />
            <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] shrink-0 text-[#C5A059]">
              <path
                d="M12 1 L15.2 8.8 L23 12 L15.2 15.2 L12 23 L8.8 15.2 L1 12 L8.8 8.8 Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C5A059]/70" />
          </div>

          {/* SUBTÍTULO */}
          <p
            className="max-w-[640px] font-sans-luxury leading-[1.85] text-[#EFE9DC]/92"
            style={{ fontSize: 'clamp(12px, 0.95vw, 13.5px)' }}
          >
            {t.home[SUBTEXT_KEY]}
          </p>
        </div>
      </div>

      {/* CARROSSEL autoplay suave esquerda → direita; cada anel abre a página do produto */}
      <div className="relative z-10 w-full">
        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none;-ms-overflow-style:none}`}</style>
        <div
          ref={trackRef}
          role="region"
          aria-label={t.home.featMarqueeAria}
          onMouseEnter={pauseHold}
          onMouseLeave={resume}
          onPointerDown={pauseTemp}
          onTouchStart={pauseTemp}
          onWheel={pauseTemp}
          className="no-scrollbar flex items-center gap-2 sm:gap-4 overflow-x-auto px-5 sm:px-8 lg:px-10 pb-2 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' as React.CSSProperties['msOverflowStyle'], WebkitOverflowScrolling: 'touch', scrollBehavior: 'auto' }}
        >
          {loopPieces.map((piece, i) => (
            <Link
              key={`${piece.src}-${i}`}
              to={piece.to}
              aria-hidden={i >= PIECES.length}
              tabIndex={i >= PIECES.length ? -1 : undefined}
              aria-label={`${piece.name}, ver peça`}
              className="group relative shrink-0 w-[220px] sm:w-[260px] lg:w-[300px] px-5 sm:px-7 flex flex-col items-center justify-center bg-transparent border-0 focus:outline-none"
            >
              <img
                src={piece.src}
                alt={t.home[piece.altKey]}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`w-full h-auto max-h-[260px] sm:max-h-[300px] object-contain select-none transition-transform duration-700 ease-out ${piece.zoom ?? 'group-hover:scale-[1.1]'}`}
                style={{
                  filter:
                    'brightness(1) contrast(1.08) drop-shadow(0 18px 30px rgba(0,0,0,0.9))',
                }}
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.display = 'none')
                }
              />
              <span
                className="mt-2 text-center font-cinzel uppercase text-[#C5A059]/85 transition-colors duration-500 group-hover:text-[#E6CA85]"
                style={{ fontSize: 'clamp(8.5px, 0.68vw, 10px)', letterSpacing: '0.26em' }}
              >
                {piece.name}
              </span>
            </Link>
          ))}
        </div>

        {/* setas laterais desktop */}
        <button
          type="button"
          onClick={() => scrollTrack(-1)}
          aria-label="Previous"
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#C5A059]/60 bg-black/80 backdrop-blur text-[#E6CA85] hidden md:flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:bg-[#C5A059] hover:text-[#020202] hover:border-[#C5A059] hover:scale-105 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          type="button"
          onClick={() => scrollTrack(1)}
          aria-label="Next"
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#C5A059]/60 bg-black/80 backdrop-blur text-[#E6CA85] hidden md:flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:bg-[#C5A059] hover:text-[#020202] hover:border-[#C5A059] hover:scale-105 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        {/* FADES PRETOS NAS DUAS EXTREMIDADES */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 sm:w-20 lg:w-40"
          style={{
            background:
              'linear-gradient(to right, #000 0%, #000 22%, rgba(0,0,0,0.86) 46%, rgba(0,0,0,0.42) 72%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 sm:w-20 lg:w-40"
          style={{
            background:
              'linear-gradient(to left, #000 0%, #000 22%, rgba(0,0,0,0.86) 46%, rgba(0,0,0,0.42) 72%, transparent 100%)',
          }}
        />
      </div>

      {/* BOTÕES */}
      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 pt-10 sm:pt-12 pb-16 sm:pb-20 lg:pb-24">
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3.5 sm:gap-4">
          <GoldButton
            label={t.home.featBtnMore}
            onClick={() => navigate('/luxury-rings')}
            variant="primary"
            icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />}
          />
          <GoldButton
            label={t.home.featBtnMine}
            onClick={() => navigate('/contact')}
            variant="ghost"
            icon={<Feather className="h-3.5 w-3.5" strokeWidth={1.4} />}
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturedRing;
