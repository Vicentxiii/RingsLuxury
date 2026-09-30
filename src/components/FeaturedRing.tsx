import React from 'react';
import { ArrowRight, Feather } from 'lucide-react';

interface Piece {
  src: string;
  name: string;
  alt: string;
}

/** Coleção Luxury Rings — anéis 1/1 HandCrafted em ouro 18k */
const PIECES: Piece[] = [
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Aguia%20ma%C3%A7onica%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Águia Masônica',
    alt: 'Anel de ouro 18k Águia Masônica, by Jorge Uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Caveira%20%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Caveira',
    alt: 'Anel de ouro 18k Caveira com rubi, by Jorge Uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20caveira%20com%20diamantes%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Caveira com Diamantes',
    alt: 'Anel de ouro 18k Caveira cravejada de diamantes, by Jorge Uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Grau%2033%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Grau 33',
    alt: 'Anel de ouro 18k Grau 33, by Jorge Uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20medusa%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Medusa',
    alt: 'Anel de ouro 18k Medusa, by Jorge Uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20sinnet%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Sinnet',
    alt: 'Anel de ouro 18k Sinnet, by Jorge Uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Tempest%20by%20Jorge%20Uquillas%20rings%20luxury%20(2).png',
    name: 'Tempest',
    alt: 'Anel de ouro 18k Tempest, by Jorge Uquillas',
  },
  {
    src: '/PUBLIC/Luxury%20rings%20collection%20anel%20Tiger%20by%20Jorge%20Uquillas%20rings%20luxury.png',
    name: 'Tiger',
    alt: 'Anel de ouro 18k Tiger, by Jorge Uquillas',
  },
];

const SUBTEXT =
  'It represents power, dominance, authority, and ambition. This ring is considered to be a certain type representing power; powerful kings wore Lord rings on their ring finger!';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
  return (
    <section
      id="featured-ring"
      className="relative w-full bg-black overflow-hidden isolate"
      aria-label="Luxury rings collection — 18k gold handcrafted rings by Jorge Uquillas"
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
            18K Gold Ring of Power
            <span className="mt-1.5 block text-[#C5A059]">
              Handcrafted by Jorge Uquillas
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
            {SUBTEXT}
          </p>
        </div>
      </div>

      {/* MARQUEE — faixa infinita em loop lento, 5+ anéis visíveis */}
      <div
        className="ring-marquee relative z-10 w-full overflow-hidden"
        role="region"
        aria-label="Coleção Luxury Rings em movimento contínuo"
      >
        <div className="ring-marquee-track flex w-max items-center">
          {/* duas cópias idênticas = loop sem costura no -50% */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {PIECES.map((piece) => (
                <figure
                  key={`${copy}-${piece.src}`}
                  className="group relative shrink-0 w-[220px] sm:w-[260px] lg:w-[300px] px-5 sm:px-7 flex flex-col items-center justify-center bg-transparent border-0"
                >
                  <img
                    src={piece.src}
                    alt={piece.alt}
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
                  <figcaption
                    className="mt-2 text-center font-cinzel uppercase text-[#C5A059]/85 transition-colors duration-500 group-hover:text-[#E6CA85]"
                    style={{ fontSize: 'clamp(8.5px, 0.68vw, 10px)', letterSpacing: '0.26em' }}
                  >
                    {piece.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>

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
            label="I'd like see more pieces"
            onClick={() => scrollToSection('masterpiece')}
            variant="primary"
            icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />}
          />
          <GoldButton
            label="I'd like a piece for me"
            onClick={() => scrollToSection('contact')}
            variant="ghost"
            icon={<Feather className="h-3.5 w-3.5" strokeWidth={1.4} />}
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturedRing;
