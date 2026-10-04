import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Feather } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Piece {
  src: string;
  name: string;
  altKey: 'featAlt1' | 'featAlt2' | 'featAlt3' | 'featAlt4' | 'featAlt5' | 'featAlt6' | 'featAlt7' | 'featAlt8';
  /** rota /produto/:slug da peça real no catálogo */
  to: string;
}

/** Coleção Luxury Rings — anéis 1/1 HandCrafted em ouro 18k */
const PIECES: Piece[] = [
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Aguia%20ma%C3%A7onica%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Águia Masônica',
    altKey: 'featAlt1',
    to: '/produto/luxury-emperor-masonic-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Caveira%20%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Caveira',
    altKey: 'featAlt2',
    to: '/produto/rose-gold-pirate-skull-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20caveira%20com%20diamantes%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Caveira com Diamantes',
    altKey: 'featAlt3',
    to: '/produto/king-skull-ring-18k-diamonds-especial-edition-jorge-uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Grau%2033%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Grau 33',
    altKey: 'featAlt4',
    to: '/produto/mixed-masonic-33-degrees-gold-silver-ring-jorge-uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20medusa%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Medusa',
    altKey: 'featAlt5',
    to: '/produto/medusa-ring-especial-edition-diamonds-jorge-uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20sinnet%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Sinnet',
    altKey: 'featAlt6',
    to: '/produto/emperor-heraldic-ring-18k-gold-jorge-uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Tempest%20by%20Jorge%20Uquillas%20rings%20luxury%20(2).png',
    name: 'Tempest',
    altKey: 'featAlt7',
    to: '/produto/tempest-ring-especial-edition-jorge-uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Tiger%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Tiger',
    altKey: 'featAlt8',
    to: '/produto/tiger-ring-18k-gold-jorge-uquillas',
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
 * Seção da coleção Luxury Rings — faixa infinita com os anéis 1/1 em ouro 18k.
 * Fica logo após "The Masterpiece Detail" na home.
 * Layout 100% centralizado: kicker, título, subtítulo, marquee e botões.
 */
export function FeaturedRing() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return (
    <section
      id="featured-ring"
      className="relative w-full bg-black overflow-hidden isolate"
      aria-label={t.home.featSectionAria}
    >
      {/* sessão 100% preta — sem halo/flare */}

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

          {/* filetes + losango — substitui o arabesco raster */}
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

      {/* CARROSSEL — swipe com snap suave; cada anel abre a página do produto */}
      <div className="relative z-10 w-full">
        <div
          ref={trackRef}
          role="region"
          aria-label={t.home.featMarqueeAria}
          className="flex items-center gap-2 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 sm:px-8 lg:px-10 pb-2"
          style={{ scrollbarWidth: 'thin' }}
        >
          {PIECES.map((piece) => (
            <Link
              key={piece.src}
              to={piece.to}
              aria-label={`${piece.name} — ver peça`}
              className="group relative shrink-0 snap-center w-[220px] sm:w-[260px] lg:w-[300px] px-5 sm:px-7 flex flex-col items-center justify-center bg-transparent border-0 focus:outline-none"
            >
              <img
                src={piece.src}
                alt={t.home[piece.altKey]}
                loading="lazy"
                draggable={false}
                className="w-full h-auto max-h-[260px] sm:max-h-[300px] object-contain select-none transition-transform duration-700 ease-out group-hover:scale-[1.1]"
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

        {/* setas discretas (desktop e mobile) */}
        <button
          type="button"
          onClick={() => scrollTrack(-1)}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[#C5A059]/40 bg-black/70 backdrop-blur text-[#C5A059] hidden sm:flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollTrack(1)}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[#C5A059]/40 bg-black/70 backdrop-blur text-[#C5A059] hidden sm:flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
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
