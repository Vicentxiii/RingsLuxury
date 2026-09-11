import React, { useState, useRef } from 'react';
import { Sparkles, ZoomIn, Info, Check } from 'lucide-react';
import { GreekKeyBorder, GreekMeanderDivider, LaurelWreath, AcanthusLeaf } from './OrnamentIcons';
import masterpieceImg from '../assets/images/masterpiece_macro_cuff_1789071946040.jpg';

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  top: string;
  left: string;
  lineWidth: string;
  lineDirection: 'left' | 'right';
}

export function MasterpieceDetail() {
  const [activeHotspot, setActiveHotspot] = useState<string>('hotspot-1');
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });

  const hotspots: Hotspot[] = [
    {
      id: 'hotspot-1',
      title: 'HAND ENGRAVED',
      subtitle: 'Stereoscopic Micro-Chiseling',
      description:
        'Chiseled directly into solid gold under 40x magnification with hand-shaped steel burins. Every hairline leaf vein catches ambient candlelight.',
      top: '28%',
      left: '32%',
      lineWidth: 'w-24 md:w-32',
      lineDirection: 'left',
    },
    {
      id: 'hotspot-2',
      title: '18K / 22K SOLID GOLD',
      subtitle: 'Hellenistic Alloy Formulation',
      description:
        'Prepared with a proprietary matte-satin antique gold recipe containing copper and silver traces identical to archaeological Macedonian hoards.',
      top: '42%',
      left: '68%',
      lineWidth: 'w-24 md:w-36',
      lineDirection: 'right',
    },
    {
      id: 'hotspot-3',
      title: 'ONE OF ONE',
      subtitle: 'Inviolable Unicity',
      description:
        'The original wax matrix was incinerated in the lost-wax burnout. No mold or digital copy exists anywhere on earth.',
      top: '72%',
      left: '26%',
      lineWidth: 'w-20 md:w-28',
      lineDirection: 'left',
    },
    {
      id: 'hotspot-4',
      title: 'MASTER ARTISAN',
      subtitle: '160 Recorded Workshop Hours',
      description:
        'Executed exclusively by Rings Luxury Atelier Chief Master Goldsmith in Athens, certified with his personal hallmark punch.',
      top: '64%',
      left: '74%',
      lineWidth: 'w-20 md:w-32',
      lineDirection: 'right',
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
              src={masterpieceImg}
              alt="High jewelry macro photography details"
              referrerPolicy="no-referrer"
              loading="lazy"
              className={`w-full h-full object-cover filter contrast-[1.12] brightness-[0.95] transition-transform duration-700 ease-out ${
                isZoomed ? 'scale-150 origin-center cursor-move' : 'scale-100'
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
                  style={{ top: hs.top, left: hs.left }}
                  className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Pulsing Center Target */}
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
                  </button>

                  {/* Thin Gold Connecting Line & Annotation Box */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-2 transition-all duration-500 ${
                      hs.lineDirection === 'left'
                        ? 'right-full flex-row-reverse text-right'
                        : 'left-full flex-row text-left'
                    } ${isSelected ? 'opacity-100 scale-100' : 'opacity-80 hover:opacity-100'}`}
                  >
                    {/* Gold Connecting Line */}
                    <div className={`h-px bg-[#C5A059] ${hs.lineWidth}`} />

                    {/* Annotation Label Box */}
                    <div
                      onClick={() => setActiveHotspot(hs.id)}
                      className={`cursor-pointer p-2.5 md:p-3 bg-[#050505]/95 border border-[#C5A059]/50 backdrop-blur-md min-w-[160px] md:min-w-[200px] shadow-[0_10px_30px_rgba(0,0,0,0.9)] ${
                        isSelected ? 'border-[#C5A059] ring-1 ring-[#C5A059]/30' : ''
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5 justify-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        <span className="font-cinzel text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#F3EFE6] font-semibold">
                          {hs.title}
                        </span>
                      </div>
                      <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#9A7B38] block">
                        {hs.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Controls Bar at Bottom */}
          <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
            {/* Museum Catalogue Reference */}
            <div className="px-5 py-2 bg-[#020202]/90 border border-[#C5A059]/30 backdrop-blur-md pointer-events-auto rounded-full">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#E6CA85]">
                PIECE UNIQUE • 22K HELLENIC CUFF BRACELET
              </span>
            </div>

            {/* Zoom Mode Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="px-5 py-2.5 bg-[#050505]/95 border border-[#C5A059] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#020202] text-[10px] font-cinzel uppercase tracking-[0.25em] transition-all flex items-center gap-2 pointer-events-auto shadow-lg rounded-full"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isZoomed ? 'Reset View' : 'Microscope Zoom 150%'}</span>
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
