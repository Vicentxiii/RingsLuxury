import React, { useState, useRef } from 'react';
import { Sparkles, ZoomIn, Info, Check } from 'lucide-react';
import { GreekKeyBorder, GreekMeanderDivider, LaurelWreath, AcanthusLeaf } from './OrnamentIcons';

/** Anel Kraken em ouro, rubis e diamantes — substitui a macro do cuff */
const KRAKEN_IMG =
  '/PUBLIC/Anel%20Kraken%20feito%20em%20ouro%20Rubis%20e%20diamantes%20y%20Jorge%20Uquillas%20Rings%20Luxury.jpg';

interface Hotspot {
  id: string;
  title: string;
  /** mini descrição — poucos caracteres, condizente com o título */
  mini: string;
  subtitle: string;
  description: string;
  /** classes literais de posição (mobile + sm) — Tailwind precisa do texto literal */
  pos: string;
  /** true = etiqueta abre para a direita do dot (não cobre o anel) */
  tipLeft?: boolean;
}

export function MasterpieceDetail() {
  const [activeHotspot, setActiveHotspot] = useState<string>('hotspot-1');
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });

  const hotspots: Hotspot[] = [
    {
      id: 'hotspot-1',
      title: 'Hand Engraving',
      mini: 'Buril carved',
      subtitle: 'Buril micro-chiseling',
      description:
        'Chiseled directly into solid gold under 40x magnification with hand-shaped steel burins. Every tentacle scale catches ambient candlelight.',
      pos: 'top-[34%] left-[18%] sm:top-[30%] sm:left-[20%]',
    },
    {
      id: 'hotspot-2',
      title: '18k Gold',
      mini: 'Solid 18k',
      subtitle: 'Solid 18k gold body',
      description:
        'Cast and finished in solid 18k gold with a proprietary matte-satin antique recipe, polished to a mirror glow.',
      pos: 'top-[18%] left-[60%] sm:top-[22%] sm:left-[68%]',
      tipLeft: true,
    },
    {
      id: 'hotspot-3',
      title: 'MasterPiece',
      mini: 'One of one',
      subtitle: 'One of one',
      description:
        'The original wax matrix was incinerated in the lost-wax burnout. No mold or digital copy exists anywhere on earth.',
      pos: 'top-[64%] left-[16%] sm:top-[66%] sm:left-[25%]',
    },
    {
      id: 'hotspot-4',
      title: 'Rubis and Diamonds',
      mini: 'Ruby + pavé',
      subtitle: 'Ruby eyes & diamond pavé',
      description:
        'Glowing ruby eyes ringed by a hand-set diamond pavé — every stone placed one by one under the microscope.',
      pos: 'top-[48%] left-[64%] sm:top-[54%] sm:left-[83%]',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y });
  };

  return (
    <section
      id="masterpiece"
      className="relative w-full py-32 md:py-44 bg-[#020202] text-[#EAE6DF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <LaurelWreath className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-[#C5A059] font-medium">
              MICROSCOPIC PROVENANCE • CLOSE EXAMINATION
            </span>
            <LaurelWreath className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.18em] uppercase text-[#FBF9F5] font-light mb-4">
            THE MASTERPIECE DETAIL
          </h2>

          <p className="font-cormorant text-xl md:text-2xl tracking-[0.2em] italic text-[#C5A059] font-light uppercase">
            IMMERSION IN SACRED TEXTURE
          </p>

          <p className="font-sans-luxury text-xs md:text-sm text-[#A8A296] tracking-[0.2em] uppercase max-w-xl mx-auto mt-4 leading-relaxed">
            Move across the monumental artifact to inspect microscopic engraving, antique gold grain, and hand-carved classical reliefs.
          </p>
        </div>

        {/* Monumental Macro Exhibition Stage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] bg-[#050505] border border-[#C5A059]/40 overflow-hidden select-none p-3 md:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.95)]"
        >
          {/* Classical Frame Corner Brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C5A059] z-20" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C5A059] z-20" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C5A059] z-20" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C5A059] z-20" />

          {/* Enormous Macro Image */}
          <div className="relative w-full h-full overflow-hidden bg-[#020202]">
            <img
              src={KRAKEN_IMG}
              alt="Anel Kraken em ouro 18k com rubis e diamantes — macro das tentáculos e caveiras gravadas à mão por Jorge Uquillas"
              referrerPolicy="no-referrer"
              loading="lazy"
              className={`w-full h-full object-cover object-[50%_45%] filter contrast-[1.12] brightness-[0.95] transition-transform duration-700 ease-out ${
                isZoomed ? 'scale-[2.2] origin-center cursor-move' : 'scale-[1.35]'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${lensPos.x}% ${lensPos.y}%`,
                    }
                  : {}
              }
            />

            {/* Dark Vignette Around Edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#020202_90%)] pointer-events-none" />

            {/* Directional Candlelight Spotlight that follows cursor */}
            <div
              className="absolute w-80 h-80 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none transition-transform duration-300 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${lensPos.x}%`,
                top: `${lensPos.y}%`,
              }}
            />
          </div>

          {/* Hotspot Annotations with Thin Gold Connecting Lines */}
          {!isZoomed &&
            hotspots.map((hs) => {
              const isSelected = activeHotspot === hs.id;
              return (
                <div
                  key={hs.id}
                  className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 ${hs.pos}`}
                >
                  {/* Pulsing Center Target + etiqueta sempre visível */}
                  <button
                    onClick={() => setActiveHotspot(hs.id)}
                    className="group relative flex items-center justify-center p-2 focus:outline-none"
                  >
                    <span className="absolute w-8 h-8 rounded-full bg-[#C5A059]/20 animate-ping" />
                    <span
                      className={`relative w-4 h-4 rounded-full border border-[#C5A059] flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#C5A059] text-[#020202] scale-125'
                          : 'bg-[#050505] text-[#C5A059] group-hover:scale-110'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </span>
                    {/* etiqueta — sempre aparente, com mini descrição */}
                    <span
                      className={`pointer-events-none absolute top-full mt-3 whitespace-nowrap rounded-2xl border border-[#C5A059]/60 bg-[#050505]/95 px-3 py-2 sm:px-4 text-center shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-md ${
                        hs.tipLeft ? 'left-0' : 'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      <span className="block font-cinzel text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-[#E6CA85]">
                        {hs.title}
                      </span>
                      <span className="mt-1 block font-sans-luxury text-[7px] sm:text-[8px] uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[#9A7B38]">
                        {hs.mini}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}

          {/* Controls Bar at Bottom */}
          <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
            {/* Museum Catalogue Reference */}
            <div className="px-5 py-2 bg-[#020202]/90 border border-[#C5A059]/30 backdrop-blur-md pointer-events-auto rounded-full">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#E6CA85]">
                PIECE UNIQUE • 18K GOLD KRAKEN RING — RUBIES & DIAMONDS
              </span>
            </div>

            {/* Zoom Mode Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="px-5 py-2.5 bg-[#050505]/95 border border-[#C5A059] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#020202] text-[10px] font-cinzel uppercase tracking-[0.25em] transition-all flex items-center gap-2 pointer-events-auto shadow-lg rounded-full"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isZoomed ? 'Reset View' : 'Microscope Zoom 220%'}</span>
            </button>
          </div>
        </div>

        {/* Selected Annotation Active Card Detail */}
        {activeHotspot && (
          <div className="mt-8 p-6 bg-[#060606] border border-[#C5A059]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A059]">
                SELECTED ARTIFACT ANNOTATION
              </span>
              <h4 className="font-cinzel text-xl tracking-[0.2em] text-[#F3EFE6] uppercase">
                {hotspots.find((h) => h.id === activeHotspot)?.title}
              </h4>
              <p className="font-sans-luxury text-xs text-[#A8A296] tracking-wider max-w-3xl leading-relaxed">
                {hotspots.find((h) => h.id === activeHotspot)?.description}
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border border-[#C5A059]/30 bg-[#0A0A0A] text-[#C5A059] text-[10px] uppercase tracking-[0.25em] whitespace-nowrap">
              <Check className="w-3.5 h-3.5" />
              <span>Certified Museum Standard</span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full mt-24 opacity-20">
        <GreekKeyBorder className="w-full h-1" />
      </div>
    </section>
  );
}
