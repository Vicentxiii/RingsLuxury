import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Compass, Shield, Sparkles, Feather } from 'lucide-react';
import { GreekKeyBorder, GreekMeanderDivider, LaurelWreath } from './OrnamentIcons';

// Craftsmanship imagery — 5 fotos novas da pasta public (ordem: Design → Eternize)
const DESIGN_IMG = '/PUBLIC/Design%20of%20ring%20by%20rings%20luxury.jpg';
const SCULPT_IMG =
  '/PUBLIC/Sculpt%20by%20rings%20luxury%20master%20Hand%20Engraver%20Jorge%20Uquillas.jpg';
const ENGRAVE_IMG =
  '/PUBLIC/Engraving%20Ring%20by%20Jorge%20Uquillas%20the%20master%20Engraver%20Rings%20Luxury.jpeg';
const POLISH_IMG =
  '/PUBLIC/Rings%20luxury%20polindo%20anel%20Master%20Engraver%20Jorge%20Uquillas.png';
const ETERNIZE_IMG =
  '/PUBLIC/Anel%20de%20ouro%2018K%20eternizado%20com%20Cera%20e%20SELO%20by%20Rings%20Luxury%20Jorge%20Uquillas.jpeg';


interface CraftStage {
  numeral: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  ritual: string;
  tool: string;
  image: string;
}

export function Craftsmanship() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const stages: CraftStage[] = [
    {
      numeral: 'I',
      title: 'DESIGN',
      subtitle: 'The Sacred Blueprint & Golden Ratio',
      duration: '40 — 60 Hours',
      description:
        'Every jewel is conceived through geometric harmony governed by the Pythagorean Golden Ratio (1:1.618). Hand-drawn onto tinted vellum using sepia ink and gold leaf leafing, exploring the weight of darkness and light.',
      ritual: 'Chiaroscuro study of negative space and mythological iconography.',
      tool: 'Hand-cut goose quill, bone dividers, and tinted archival vellum.',
      image: DESIGN_IMG,
    },
    {
      numeral: 'II',
      title: 'SCULPT',
      subtitle: 'Lost-Wax Micro-Sculpting',
      duration: '80 — 120 Hours',
      description:
        'Rather than digital rendering, our artisans hand-sculpt organic beeswax and hard dental wax under stereoscopic microscopes, carving micro-reliefs of Olympian deities and classical acanthus leaves.',
      ritual: 'Thermal wax carving with heated steel needles and natural resin.',
      tool: 'Heated miniature spatulas, hard micro-wax, and flame lamps.',
      image: SCULPT_IMG,
    },
    {
      numeral: 'III',
      title: 'ENGRAVE',
      subtitle: 'Intaglio & Hand Engraving',
      duration: '90 — 140 Hours',
      description:
        'Using hardened steel hand engravers ground to razor angles, the master engraver cuts directly into solid 18K and 22K gold. Every microscopic cut produces an imperishable facet that refracts light with antique depth.',
      ritual: 'Rhythmic chiseled cuts guided by steady respiration and muscle memory.',
      tool: 'Handmade French hand engravers, pitch bowls, and jeweler’s eyeglass.',
      image: ENGRAVE_IMG,
    },
    {
      numeral: 'IV',
      title: 'POLISH',
      subtitle: 'Obsidian & Agate Burnishing',
      duration: '35 — 50 Hours',
      description:
        'We reject aggressive machine buffing, which rounds crisp classical borders. Instead, stones are burnished using natural agate tips and crushed volcanic obsidian powder to achieve an aristocratic matte-satin luster.',
      ritual: 'Cold water burnishing to preserve crisp classical architectural edges.',
      tool: 'German agate burnishers and pulverized obsidian abrasive.',
      image: POLISH_IMG,
    },
    {
      numeral: 'V',
      title: 'ETERNIZE',
      subtitle: 'The Hallmarking of Immortality',
      duration: 'Final Sanctuary Rite',
      description:
        'The completed creation receives the Athenian Owl master stamp, the Rings Luxury royal crest, and an individual archival folio sealed in hot beeswax. It is now immortalized in the Rings Luxury registry forever.',
      ritual: 'Cold steel punch impression and archival registry entry.',
      tool: 'Hand-carved hardened steel punch and sovereign seal wax.',
      image: ETERNIZE_IMG,
    },
  ];

  const currentStage = stages[activeStageIndex];

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
              THE FIVE SACRED STAGES
            </span>
            <LaurelWreath className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.16em] uppercase text-[#FBF9F5] font-light mb-4">
            CRAFTSMANSHIP
          </h2>

          <p className="font-cormorant text-xl md:text-2xl tracking-[0.2em] italic text-[#C5A059] font-light uppercase">
            CHRONICLES OF PERFECTION
          </p>

          <GreekMeanderDivider className="mt-8 opacity-60" />
        </div>

        {/* Horizontal Stepper Indicator */}
        <div className="flex items-center justify-between border-b border-[#C5A059]/25 pb-8 mb-16 overflow-x-auto gap-4">
          {stages.map((stage, idx) => (
            <button
              key={stage.numeral}
              onClick={() => handleSelectStage(idx)}
              className={`flex flex-col items-center flex-1 min-w-[120px] transition-all duration-300 relative group pb-2 ${
                activeStageIndex === idx
                  ? 'text-[#C5A059]'
                  : 'text-[#EAE6DF]/40 hover:text-[#EAE6DF]'
              }`}
            >
              <span className="font-cormorant text-3xl md:text-4xl italic leading-none mb-1">
                {stage.numeral}
              </span>
              <span className="font-cinzel text-xs tracking-[0.3em] uppercase font-semibold">
                {stage.title}
              </span>

              {/* Active Indicator Bar */}
              {activeStageIndex === idx && (
                <div className="absolute -bottom-8 left-0 w-full flex items-center justify-center">
                  <div className="w-full h-px bg-[#C5A059]" />
                  <div className="absolute w-2 h-2 rotate-45 bg-[#C5A059]" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Stage Presentation Showcase */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
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
                  src={currentStage.image}
                  alt={currentStage.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-[1.12] brightness-95 transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Stage Badge */}
              <div className="absolute top-8 left-8 px-4 py-1.5 bg-[#020202]/90 border border-[#C5A059]/40 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059]">
                  PHASE {currentStage.numeral} • {currentStage.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Stage Detail & Ritual */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-cormorant text-5xl text-[#C5A059] italic font-light leading-none">
                  {currentStage.numeral}
                </span>
                <div className="h-8 w-px bg-[#C5A059]/40" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#9A7B38]">
                  METALLURGICAL PROTOCOL
                </span>
              </div>

              <h3 className="font-cinzel text-3xl md:text-4xl tracking-[0.2em] uppercase text-[#FBF9F5]">
                {currentStage.title}
              </h3>

              <p className="font-cormorant text-lg italic text-[#C5A059] tracking-wider">
                {currentStage.subtitle}
              </p>

              <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider pt-2">
                {currentStage.description}
              </p>
            </div>

            {/* Ritual & Tool Boxes */}
            <div className="space-y-3 pt-4 border-t border-[#C5A059]/20 text-xs">
              <div className="p-3.5 bg-[#070707] border-l-2 border-[#C5A059]">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] block mb-1 font-semibold">
                  Sacred Ritual
                </span>
                <span className="text-[#C2BDB2]">{currentStage.ritual}</span>
              </div>

              <div className="p-3.5 bg-[#070707] border-l-2 border-[#C5A059]/50">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#9A7B38] block mb-1 font-semibold">
                  Master Instrument
                </span>
                <span className="text-[#C2BDB2]">{currentStage.tool}</span>
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
                <span>PREVIOUS</span>
              </button>

              <span className="text-[10px] tracking-[0.3em] text-[#9A7B38]">
                {activeStageIndex + 1} / {stages.length}
              </span>

              <button
                disabled={activeStageIndex === stages.length - 1}
                onClick={() => handleSelectStage(Math.min(stages.length - 1, activeStageIndex + 1))}
                className="flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] uppercase text-[#C5A059] hover:text-[#E6CA85] disabled:opacity-20 disabled:pointer-events-none transition-colors"
              >
                <span>NEXT STAGE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-24 opacity-25">
        <GreekKeyBorder className="w-full h-1" />
      </div>
    </section>
  );
}
