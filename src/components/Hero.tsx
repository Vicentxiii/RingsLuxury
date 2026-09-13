import React from 'react';
import { ArrowDown, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LaurelWreath, GreekKeyBorder, GreekMeanderDivider } from './OrnamentIcons';
import heroStatueImg from '../assets/images/hero_statue_temple_1789071913515.jpg';
import { AutoFlippingWords } from './ui/flipping-word-swap';

interface HeroProps {
  onEnterAtelier: () => void;
}

// Nova foto colocada em public/PUBLIC — hero trocado da estátua para novo fundo
const NEW_HERO_CANDIDATES = [
  encodeURI('/PUBLIC/large-banner-433.jpg'),
  encodeURI('/PUBLIC/hero-new.jpg'),
  encodeURI('/PUBLIC/hero.jpg'),
  encodeURI('/PUBLIC/new-hero.jpg'),
];

export function Hero({ onEnterAtelier }: HeroProps) {
  const navigate = useNavigate();
  const [heroBg, setHeroBg] = React.useState<string>(NEW_HERO_CANDIDATES[0]);
  const [bgFailed, setBgFailed] = React.useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-visible bg-[#020202]"
    >
      {/* Background Visual Layer - Nova foto da PUBLIC no lugar da estátua */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Nova imagem do hero com fallback para estátua antiga */}
        {!bgFailed ? (
          <img
            src={heroBg}
            alt="RINGS LUXURY by Jorge Uquillas — Anéis artesanais HandCrafted em ouro 18k com diamantes — Hero"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] ease-out scale-105"
            onError={() => {
              // tenta próximo candidato, se falhar todos usa estátua antiga
              const idx = NEW_HERO_CANDIDATES.indexOf(heroBg);
              if (idx >= 0 && idx < NEW_HERO_CANDIDATES.length - 1) {
                setHeroBg(NEW_HERO_CANDIDATES[idx + 1]);
              } else {
                setBgFailed(true);
              }
            }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[12000ms] ease-out scale-105"
            style={{ backgroundImage: `url(${heroStatueImg})` }}
          />
        )}

        {/* Heavy Atmospheric Dark Vignette & Black Marble Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/65 to-[#020202]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#020202_80%)]" />

        {/* Thin subtle warm golden volumetric light beam overlay */}
        <div className="absolute top-0 right-1/4 w-72 h-full bg-gradient-to-b from-[#C5A059]/10 via-[#C5A059]/5 to-transparent blur-3xl pointer-events-none transform -rotate-12" />
      </div>

      {/* Film Grain Subtle Layer */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-40 z-1" />

      {/* Greek Architectural Pillars Flanking Silhouette for Monumental Scale */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#020202] via-[#020202]/90 to-transparent pointer-events-none z-2 flex flex-col justify-between py-12 px-6 opacity-60">
        <div className="text-[9px] uppercase tracking-[0.4em] text-[#9A7B38] [writing-mode:vertical-lr] rotate-180">
          ARCHITECTURA • HELLENICA
        </div>
        <div className="h-40 w-px bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent mx-auto" />
        <div className="text-[9px] uppercase tracking-[0.4em] text-[#9A7B38] [writing-mode:vertical-lr] rotate-180">
          MMXXVI • SECRETO
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#020202] via-[#020202]/90 to-transparent pointer-events-none z-2 flex flex-col justify-between py-12 px-6 opacity-60">
        <div className="text-[9px] uppercase tracking-[0.4em] text-[#9A7B38] [writing-mode:vertical-lr]">
          AURUM • SACRUM
        </div>
        <div className="h-40 w-px bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent mx-auto" />
        <div className="text-[9px] uppercase tracking-[0.4em] text-[#9A7B38] [writing-mode:vertical-lr]">
          STATUA • AETERNITAS
        </div>
      </div>

      {/* Center Monumental Typography Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-20 sm:pt-36 sm:pb-28 flex flex-col items-center">
        {/* Subtle Top Gold Laurel & Seal */}
        <div className="inline-flex items-center gap-3 px-6 py-2.5 border border-[#C5A059]/30 rounded-full bg-[#050505]/80 backdrop-blur-md mb-10 shadow-[0_0_20px_rgba(197,160,89,0.15)] animate-fadeIn">
          <LaurelWreath className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.42em] uppercase text-[#E6CA85]">
            JORGE UQUILLAS • HANDCRAFTED HAUTE JOAILLERIE
          </span>
          <LaurelWreath className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
        </div>

        {/* Framing Gold Lines */}
        <div className="w-full max-w-xl flex items-center justify-center gap-5 mb-8 opacity-80">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]" />
          <div className="w-2 h-2 rotate-45 border border-[#C5A059] bg-[#020202]" />
          <span className="text-[11px] font-serif tracking-[0.35em] text-[#C5A059] uppercase">
            RINGS LUXURY • JORGE UQUILLAS • HANDCRAFTED
          </span>
          <div className="w-2 h-2 rotate-45 border border-[#C5A059] bg-[#020202]" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]" />
        </div>

        {/* Hero Title: THE ART OF — OF ao lado de ART na mesma linha */}
        <h1
          id="hero-title"
          className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.2em] uppercase text-[#FBF9F5] font-light leading-[1.06] drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] whitespace-nowrap"
        >
          <span className="inline-flex items-baseline justify-center gap-x-[0.18em] whitespace-nowrap">
            <span>THE ART</span>
            <span>OF</span>
          </span>
        </h1>
        {/* Flipping Word Swap — ETERNITY / POWER / STATUS — auto flip, sem corte */}
        <div className="mt-3 sm:mt-4 flex justify-center w-full max-w-full overflow-visible px-4">
          <AutoFlippingWords
            words={["ETERNITY", "POWER", "STATUS"]}
            duration={420}
            stagger={42}
            interval={2600}
            className="font-cinzel text-[1.7rem] sm:text-[2.9rem] md:text-[4rem] lg:text-[5.5rem] tracking-[0.04em] uppercase font-light leading-[1.06] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8DC] via-[#E6CA85] to-[#C5A059] [filter:drop-shadow(0_0_22px_rgba(197,160,89,0.45))_drop-shadow(0_12px_28px_rgba(0,0,0,0.85))] overflow-visible"
            toClassName="text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8DC] via-[#E6CA85] to-[#C5A059]"
          />
        </div>

        {/* Subtitle: SEO — Anéis artesanais HandCrafted by Jorge Uquillas */}
        <p
          id="hero-subtitle"
          className="font-sans-luxury text-sm sm:text-base md:text-lg font-light tracking-[0.32em] uppercase text-[#D4CEBF] max-w-3xl mb-12 sm:mb-14 leading-relaxed"
        >
          ANÉIS ARTESANAIS 1/1 HANDCRAFTED
          <br />
          <span className="text-[#E6CA85] font-normal">EM OURO 18K COM DIAMANTES — JORGE UQUILLAS</span>
          <span className="block mt-3 text-[11px] sm:text-xs tracking-[0.28em] text-[#9A7B38] normal-case">Handmade 18k gold diamond rings • gravados com buril • RINGS LUXURY • Brasil • Miami</span>
        </p>

        {/* Subtle Gold Ornamental Line Under Subtitle */}
        <GreekMeanderDivider className="mb-12 sm:mb-14 w-full max-w-sm opacity-80" />

        {/* CTA Button Group: Substantially larger and more spacious */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mt-2 w-full justify-center">
          <button
            id="hero-cta-enter"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              navigate('/jorge-uquillas');
            }}
            className="group relative px-10 sm:px-14 py-5 sm:py-6 bg-[#050505] border-2 border-[#C5A059] text-[#C5A059] hover:text-[#020202] transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(197,160,89,0.25)] hover:shadow-[0_0_60px_rgba(197,160,89,0.5)] rounded-full hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Hover gold fill sliding up */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#C5A059] via-[#E6CA85] to-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />

            <span className="relative z-10 font-cinzel text-xs sm:text-sm md:text-base font-semibold tracking-[0.38em] uppercase">
              ENTER THE ATELIER
            </span>
          </button>

          {/* Know the Master - Redirect to Jorge Uquillas Bronze Horse */}
          <button
            id="hero-view-toggle"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              navigate('/jorge-uquillas');
            }}
            className="group flex items-center gap-3 px-8 sm:px-10 py-4.5 sm:py-5.5 border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#070707]/80 hover:bg-[#C5A059]/15 text-[#EAE6DF] hover:text-[#E6CA85] transition-all duration-300 text-xs sm:text-sm uppercase tracking-[0.3em] rounded-full shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A059] group-hover:rotate-12 transition-transform" />
            <span>Know the master</span>
          </button>
        </div>
      </div>

      {/* Bottom Architectural Border and Scroll Prompt */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center z-10 pointer-events-none pb-4">
        <a
          href="#collections"
          className="pointer-events-auto group flex flex-col items-center gap-2 text-[#9A7B38] hover:text-[#C5A059] transition-colors duration-300 mb-4"
        >
          <span className="text-[9px] uppercase tracking-[0.35em]">Descend into Archive</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C5A059]" />
        </a>
        <GreekKeyBorder className="w-full h-2 opacity-30" />
      </div>
    </section>
  );
}
