import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Compass, Shield, Sparkles, Feather } from 'lucide-react';
import { GreekKeyBorder, GreekMeanderDivider, LaurelWreath } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';

// Craftsmanship imagery, 5 fotos novas da pasta public (ordem: Design → Eternize)
const DESIGN_IMG = '/PUBLIC/design-of-ring-by-rings-luxury.webp';
const SCULPT_IMG =
  '/PUBLIC/sculpt-by-rings-luxury-master-hand-engraver-jorge-uquillas.webp';
const ENGRAVE_IMG =
  '/PUBLIC/engraving-ring-by-jorge-uquillas-the-master-engraver-rings-luxury.webp';
const POLISH_IMG =
  '/PUBLIC/rings-luxury-polindo-anel-master-engraver-jorge-uquillas.webp';
const ETERNIZE_IMG =
  '/PUBLIC/anel-de-ouro-18k-eternizado-com-cera-e-selo-by-rings-luxury-jorge-uquillas.webp';


interface CraftStage {
  numeral: string;
  /**
   * id estável e curto do <li>, derivado do título da etapa em inglês
   * (kebab-case). Fica literal de propósito: o título vem do i18n e muda
   * com o idioma, mas o id não pode mudar junto.
   */
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  ritual: string;
  tool: string;
  image: string;
}

export function Craftsmanship() {
  const { t } = useLanguage();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const stages: CraftStage[] = [
    {
      numeral: 'I',
      slug: 'design',
      title: t.home.crStage1Title,
      subtitle: t.home.crStage1Subtitle,
      duration: t.home.crStage1Duration,
      description: t.home.crStage1Desc,
      ritual: t.home.crStage1Ritual,
      tool: t.home.crStage1Tool,
      image: DESIGN_IMG,
    },
    {
      numeral: 'II',
      slug: 'sculpt',
      title: t.home.crStage2Title,
      subtitle: t.home.crStage2Subtitle,
      duration: t.home.crStage2Duration,
      description: t.home.crStage2Desc,
      ritual: t.home.crStage2Ritual,
      tool: t.home.crStage2Tool,
      image: SCULPT_IMG,
    },
    {
      numeral: 'III',
      slug: 'engrave',
      title: t.home.crStage3Title,
      subtitle: t.home.crStage3Subtitle,
      duration: t.home.crStage3Duration,
      description: t.home.crStage3Desc,
      ritual: t.home.crStage3Ritual,
      tool: t.home.crStage3Tool,
      image: ENGRAVE_IMG,
    },
    {
      numeral: 'IV',
      slug: 'polish',
      title: t.home.crStage4Title,
      subtitle: t.home.crStage4Subtitle,
      duration: t.home.crStage4Duration,
      description: t.home.crStage4Desc,
      ritual: t.home.crStage4Ritual,
      tool: t.home.crStage4Tool,
      image: POLISH_IMG,
    },
    {
      numeral: 'V',
      slug: 'eternize',
      title: t.home.crStage5Title,
      subtitle: t.home.crStage5Subtitle,
      duration: t.home.crStage5Duration,
      description: t.home.crStage5Desc,
      ritual: t.home.crStage5Ritual,
      tool: t.home.crStage5Tool,
      image: ETERNIZE_IMG,
    },
  ];

  // Auto-play leve: 2.5s por fase, pausa no hover, para definitivo no clique
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    timerRef.current = window.setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % stages.length);
    }, 2500);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlay, isHovered, stages.length]);

  const handleSelectStage = (idx: number) => {
    setAutoPlay(false);
    if (timerRef.current) window.clearInterval(timerRef.current);
    setActiveStageIndex(idx);
  };

  return (
    <section
      id="craftsmanship"
      className="relative w-full py-32 md:py-44 bg-[#020202] text-[#EAE6DF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <LaurelWreath className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">
              {t.home.crKicker}
            </span>
            <LaurelWreath className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2
            id="oficio"
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.16em] uppercase text-[#FBF9F5] font-light mb-4 scroll-mt-28"
          >
            {t.home.crTitle}
          </h2>

          <p className="font-cormorant text-xl md:text-2xl tracking-[0.2em] italic text-[#C5A059] font-light uppercase">
            {t.home.crSubtitle}
          </p>

          <GreekMeanderDivider className="mt-8 opacity-60" />
        </div>

        {/* Stepper: lista vertical refinada no mobile, horizontal no desktop */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 border-b border-[#C5A059]/25 pb-6 sm:pb-8 mb-12 sm:mb-16 sm:overflow-x-auto">
          {stages.map((stage, idx) => (
            <button
              key={stage.numeral}
              onClick={() => handleSelectStage(idx)}
              aria-current={activeStageIndex === idx}
              aria-controls={stage.slug}
              className={`flex flex-row sm:flex-col items-center sm:items-center gap-3 sm:gap-0 w-full sm:flex-1 min-w-0 sm:min-w-[120px] px-4 sm:px-0 py-3 sm:py-0 sm:pb-2 text-left sm:text-center border-l-2 sm:border-l-0 transition-all duration-300 relative group ${
                activeStageIndex === idx
                  ? 'border-[#C5A059] bg-[#C5A059]/[0.07] text-[#C5A059]'
                  : 'border-transparent text-[#EAE6DF]/70 hover:text-[#EAE6DF]'
              }`}
            >
              <span className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic leading-none sm:mb-1 shrink-0 w-10 sm:w-auto text-center">
                {stage.numeral}
              </span>
              <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.22em] sm:tracking-[0.3em] uppercase font-semibold">
                {stage.title}
              </span>

              {/* Active Indicator Bar, só no desktop */}
              {activeStageIndex === idx && (
                <div className="absolute -bottom-8 left-0 w-full hidden sm:flex items-center justify-center">
                  <div className="w-full h-px bg-[#C5A059]" />
                  <div className="absolute w-2 h-2 rotate-45 bg-[#C5A059]" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* As 5 etapas viram uma <ol> de verdade: lista ordenada e o formato que
            buscadores e IAs leem melhor para "como funciona / quanto tempo demora".
            Cada <li> tem id estavel, o h3 do titulo da etapa fica dentro dele e o
            texto vem logo abaixo. Visual identico ao de antes: so a etapa ativa
            fica visivel (hidden = display:none), entao grid, imagens e autoplay de
            2,5s continuam exatamente iguais. */}
        <ol
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-col gap-12 lg:gap-16"
        >
          {stages.map((stage, idx) => (
            <li
              key={stage.numeral}
              id={stage.slug}
              className={
                activeStageIndex === idx
                  ? 'grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'
                  : 'hidden'
              }
            >
              {/* Left: Stage Visual */}
              <div className="lg:col-span-7 relative group">
                <div className="relative border border-[#C5A059]/40 bg-[#070707] p-3 md:p-5 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#C5A059]" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#C5A059]" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#C5A059]" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#C5A059]" />

                  <div className="aspect-[16/10] overflow-hidden bg-[#020202]">
                    <img
                      src={stage.image}
                      alt={stage.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover filter contrast-[1.12] brightness-95 transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>

                  {/* Stage Badge */}
                  <div className="absolute top-4 left-4 sm:top-8 sm:left-8 px-4 py-1.5 bg-[#020202]/90 border border-[#C5A059]/40 backdrop-blur-md">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059]">
                      {t.home.crPhase} {stage.numeral} • {stage.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Stage Detail & Ritual */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-cormorant text-4xl sm:text-5xl text-[#C5A059] italic font-light leading-none">
                      {stage.numeral}
                    </span>
                    <div className="h-8 w-px bg-[#C5A059]/40" />
                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#9A7B38]">
                      {t.home.crProtocol}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] uppercase text-[#FBF9F5]">
                    {stage.title}
                  </h3>

                  <p className="font-cormorant text-lg italic text-[#C5A059] tracking-wider">
                    {stage.subtitle}
                  </p>

                  <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider pt-2">
                    {stage.description}
                  </p>
                </div>

                {/* Ritual & Tool Boxes */}
                <div className="space-y-3 pt-4 border-t border-[#C5A059]/20 text-xs">
                  <div className="p-3.5 bg-[#070707] border-l-2 border-[#C5A059]">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] block mb-1 font-semibold">
                      {t.home.crRitualLabel}
                    </span>
                    <span className="text-[#C2BDB2]">{stage.ritual}</span>
                  </div>

                  <div className="p-3.5 bg-[#070707] border-l-2 border-[#C5A059]/50">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#9A7B38] block mb-1 font-semibold">
                      {t.home.crInstrumentLabel}
                    </span>
                    <span className="text-[#C2BDB2]">{stage.tool}</span>
                  </div>
                </div>

                {/* Stepper Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-[#C5A059]/20">
                  <button
                    disabled={activeStageIndex === 0}
                    onClick={() => handleSelectStage(Math.max(0, activeStageIndex - 1))}
                    className="flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] uppercase text-[#EAE6DF]/60 hover:text-[#C5A059] disabled:opacity-20 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t.home.crPrev}</span>
                  </button>

                  <span className="text-[10px] tracking-[0.3em] text-[#9A7B38]">
                    {activeStageIndex + 1} / {stages.length}
                  </span>

                  <button
                    disabled={activeStageIndex === stages.length - 1}
                    onClick={() => handleSelectStage(Math.min(stages.length - 1, activeStageIndex + 1))}
                    className="flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] uppercase text-[#C5A059] hover:text-[#E6CA85] disabled:opacity-20 disabled:pointer-events-none transition-colors"
                  >
                    <span>{t.home.crNext}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="w-full mt-24 opacity-25">
        <GreekKeyBorder className="w-full h-1" />
      </div>
    </section>
  );
}
