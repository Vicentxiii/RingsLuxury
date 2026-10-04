import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ZoomIn, Info, BadgeCheck, X } from 'lucide-react';
import { GreekKeyBorder, GreekMeanderDivider, LaurelWreath, AcanthusLeaf } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';

/** Anel Kraken em ouro, rubis e diamantes, substitui a macro do cuff */
const KRAKEN_IMG =
  '/PUBLIC/Anel%20Kraken%20feito%20em%20ouro%20Rubis%20e%20diamantes%20y%20Jorge%20Uquillas%20Rings%20Luxury.webp';

const CERT_IMG =
  '/PUBLIC/NOVO%20CERTIFICADO%20DE%20AUTHENTICIDADE%20JORGE%20UQUILLAS%20HAND%20ENGRAVER.webp';

interface Hotspot {
  id: string;
  title: string;
  /** mini descrição, poucos caracteres, condizente com o título */
  mini: string;
  subtitle: string;
  description: string;
  /** classes literais de posição (mobile + sm), Tailwind precisa do texto literal */
  pos: string;
  /** true = etiqueta abre para a direita do dot (não cobre o anel) */
  tipLeft?: boolean;
}

export function MasterpieceDetail() {
  const { t } = useLanguage();
  // No mobile (toque) nenhum dot começa revelado: os textos só aparecem ao tocar.
  // No desktop mantém o primeiro selecionado como antes.
  const [activeHotspot, setActiveHotspot] = useState<string | null>(() =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches
      ? null
      : 'hotspot-1',
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const RING_CENTER = { x: 47, y: 43 };
  const [lensPos, setLensPos] = useState(RING_CENTER);
  const [showCert, setShowCert] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showCert) setShowCert(false);
        else setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCert, isZoomed]);

  useEffect(() => {
    document.body.style.overflow = showCert ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCert]);

  const hotspots: Hotspot[] = [
    {
      id: 'hotspot-1',
      title: t.home.mpHot1Title,
      mini: t.home.mpHot1Mini,
      subtitle: t.home.mpHot1Subtitle,
      description: t.home.mpHot1Desc,
      pos: 'top-[56%] left-[67%]',
    },
    {
      id: 'hotspot-2',
      title: t.home.mpHot2Title,
      mini: t.home.mpHot2Mini,
      subtitle: t.home.mpHot2Subtitle,
      description: t.home.mpHot2Desc,
      pos: 'top-[24%] left-[54%]',
      tipLeft: true,
    },
    {
      id: 'hotspot-3',
      title: t.home.mpHot3Title,
      mini: t.home.mpHot3Mini,
      subtitle: t.home.mpHot3Subtitle,
      description: t.home.mpHot3Desc,
      pos: 'top-[71%] left-[37%]',
    },
    {
      id: 'hotspot-4',
      title: t.home.mpHot4Title,
      mini: t.home.mpHot4Mini,
      subtitle: t.home.mpHot4Subtitle,
      description: t.home.mpHot4Desc,
      pos: 'top-[40%] left-[29%]',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y });
  };

  const handleZoomToggle = () => {
    if (!isZoomed) setLensPos(RING_CENTER);
    setIsZoomed(!isZoomed);
  };

  // Dots abrem para os lados no hover (liberam o anel) e voltam ao sair
  const [scattered, setScattered] = useState(false);
  // Vetores para fora do centro do anel (47,43), distância ~52px
  const SCATTER_VEC = [
    { x: 44, y: 28 },
    { x: 18, y: -49 },
    { x: -18, y: 49 },
    { x: -51, y: -9 },
  ];

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
              {t.home.mpKicker}
            </span>
            <LaurelWreath className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.18em] uppercase text-[#FBF9F5] font-light mb-4">
            {t.home.mpTitle}
          </h2>

          <p className="font-cormorant text-xl md:text-2xl tracking-[0.2em] italic text-[#C5A059] font-light uppercase">
            {t.home.mpSubtitle}
          </p>

          <p className="font-sans-luxury text-xs md:text-sm text-[#A8A296] tracking-[0.2em] uppercase max-w-xl mx-auto mt-4 leading-relaxed">
            {t.home.mpIntro}
          </p>
        </div>

        {/* Monumental Macro Exhibition Stage */}
        <div
          ref={containerRef}
          className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] bg-[#050505] border border-[#C5A059]/40 overflow-hidden select-none p-3 md:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.95)]"
        >
          {/* Classical Frame Corner Brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C5A059] z-20" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C5A059] z-20" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C5A059] z-20" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C5A059] z-20" />

          {/* Enormous Macro Image */}
          <div
            onMouseMove={(e) => {
              handleMouseMove(e);
              setScattered(true);
            }}
            onMouseEnter={() => setScattered(true)}
            onMouseLeave={() => {
              setLensPos(RING_CENTER);
              setScattered(false);
            }}
            className="relative w-full h-full overflow-hidden bg-[#020202]"
          >
            <img
              src={KRAKEN_IMG}
              alt={t.home.mpImageAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              className={`w-full h-full object-cover object-[50%_38%] filter contrast-[1.12] brightness-[0.95] transition-transform duration-700 ease-out ${
                isZoomed ? 'scale-[2.2] origin-center cursor-move' : 'scale-[1.08]'
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#020202_92%)] pointer-events-none" />

            {/* Directional Candlelight Spotlight that follows cursor */}
            <div
              className="absolute w-80 h-80 rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none transition-transform duration-300 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${lensPos.x}%`,
                top: `${lensPos.y}%`,
              }}
            />

            {/* Hotspots, espaçam para os lados no hover, voltam ao sair */}
            {!isZoomed &&
              hotspots.map((hs, idx) => {
                const isSelected = activeHotspot === hs.id;
                const vec = SCATTER_VEC[idx % SCATTER_VEC.length];
                const sx = scattered ? vec.x : 0;
                const sy = scattered ? vec.y : 0;
                return (
                  <div
                    key={hs.id}
                    className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 ${hs.pos}`}
                  >
                    <div
                      className="transition-transform duration-700 ease-out will-change-transform"
                      style={{ transform: `translate(${sx}px, ${sy}px)` }}
                    >
                    <button
                      onClick={() => setActiveHotspot(hs.id)}
                      aria-label={hs.title}
                      className="group relative flex items-center justify-center w-6 h-6 cursor-pointer focus:outline-none"
                    >
                      {/* halo sutil */}
                      <span
                        className={`absolute w-4 h-4 rounded-full border border-[#C5A059]/50 transition-all ${
                          isSelected ? 'scale-125 border-[#C5A059]' : 'group-hover:scale-110'
                        }`}
                      />
                      <span
                        className={`absolute w-4 h-4 rounded-full bg-[#C5A059]/15 ${
                          isSelected ? 'animate-ping [animation-duration:2.2s]' : 'hidden group-hover:block group-hover:animate-ping group-hover:[animation-duration:2.2s]'
                        }`}
                      />
                      {/* dot central, 10px */}
                      <span
                        className={`relative w-2.5 h-2.5 rounded-full border flex items-center justify-center transition-all shadow-[0_0_10px_rgba(197,160,89,0.8)] ${
                          isSelected
                            ? 'bg-[#C5A059] border-[#E6CA85] scale-110'
                            : 'bg-[#050505]/90 border-[#C5A059] group-hover:bg-[#C5A059]/80'
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? 'bg-[#020202]' : 'bg-[#C5A059] group-hover:bg-[#020202]'
                          }`}
                        />
                      </span>
                      {/* palavra clicável, mesmo botão do dot.
                          No mobile fica oculta até o dot ser tocado (só o selecionado revela);
                          no desktop (sm+) sempre visível como antes. */}
                      <span
                        className={`${isSelected ? '' : 'hidden sm:block'} absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-4 py-2 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.85)] transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C5A059] border-[#E6CA85]'
                            : 'bg-[#020202]/85 border-[#C5A059]/40 group-hover:border-[#C5A059]/80'
                        }`}
                      >
                        <span
                          className={`block font-cinzel text-[11px] sm:text-[12px] uppercase tracking-[0.2em] leading-none ${
                            isSelected ? 'text-[#020202]' : 'text-[#E6CA85]'
                          }`}
                        >
                          {hs.title}
                        </span>
                      </span>
                    </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Controls Bar at Bottom */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-30 flex items-center justify-between gap-3 pointer-events-none">
            {/* Museum Catalogue Reference */}
            <div className="hidden sm:block px-5 py-2 bg-[#020202]/90 border border-[#C5A059]/30 backdrop-blur-md pointer-events-auto rounded-full">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#E6CA85]">
                {t.home.mpCatalogue}
              </span>
            </div>

            {/* Zoom Mode Toggle */}
            <button
              onClick={handleZoomToggle}
              className="ml-auto px-4 py-2 sm:px-5 sm:py-2.5 bg-[#050505]/95 border border-[#C5A059] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#020202] text-[9px] sm:text-[10px] font-cinzel uppercase tracking-[0.25em] transition-all flex items-center gap-2 pointer-events-auto shadow-lg rounded-full"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isZoomed ? t.home.mpZoomOut : t.home.mpZoomIn}</span>
            </button>
          </div>
        </div>

        {/* Selected Annotation Active Card Detail */}
        {activeHotspot && (
          <div className="mt-8 p-6 bg-[#060606] border border-[#C5A059]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A059]">
                {t.home.mpSelectedLabel}
              </span>
              <h4 className="font-cinzel text-xl tracking-[0.2em] text-[#F3EFE6] uppercase">
                {hotspots.find((h) => h.id === activeHotspot)?.title}
              </h4>
              <p className="font-sans-luxury text-xs text-[#A8A296] tracking-wider max-w-3xl leading-relaxed">
                {hotspots.find((h) => h.id === activeHotspot)?.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCert(true)}
              className="group relative overflow-hidden flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#9A7B38] via-[#E6CA85] to-[#C5A059] text-[#020202] transition-all duration-500 text-left shadow-[0_0_35px_rgba(197,160,89,0.35)] hover:shadow-[0_0_55px_rgba(230,202,133,0.6)] hover:brightness-110"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shineSweep_2.8s_ease-in-out_infinite]"
              />
              <BadgeCheck className="relative w-5 h-5 shrink-0" />
              <span className="relative flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-[0.25em] font-cinzel font-semibold">
                  {t.home.mpCertTitle}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#020202]/70">
                  {t.home.mpCertCta}
                </span>
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="w-full mt-24 opacity-20">
        <GreekKeyBorder className="w-full h-1" />
      </div>

      {/* Certificate Modal, glass 3D, somente o certificado */}
      {showCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-[fadeIn_0.35s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={t.home.mpCertDialogAria}
        >
          {/* fundo leve, sem a bola preta: só o modal quadrado em destaque */}
          <button
            aria-label={t.home.mpCertCloseAria}
            onClick={() => setShowCert(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-zoom-out"
          />
          {/* palco 3D */}
          <div
            className="relative max-w-3xl w-full animate-[cert3D_0.6s_cubic-bezier(0.22,1,0.36,1)]"
            style={{ perspective: '1400px' }}
          >
            <div className="relative overflow-hidden rounded-none border border-white/15 bg-white/[0.06] shadow-[0_50px_140px_rgba(0,0,0,0.9)]">
              <img
                src={CERT_IMG}
                alt={t.home.mpCertAlt}
                className="block w-full h-auto max-h-[82vh] object-contain"
              />
              {/* vidro, brilho */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.16] via-transparent via-35% to-transparent" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
            {/* X quadrado em vidro */}
            <button
              onClick={() => setShowCert(false)}
              aria-label={t.home.mpCertCloseLabel}
              className="absolute top-3 right-3 w-9 h-9 rounded-none bg-black/40 backdrop-blur-md border border-white/20 text-white/85 flex items-center justify-center hover:bg-white/15 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shineSweep {
          0% { transform: translateX(-100%); }
          55%, 100% { transform: translateX(100%); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cert3D {
          from { opacity: 0; transform: translateY(34px) rotateX(12deg) rotateY(-8deg) scale(0.94); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1); }
        }
      `}</style>
    </section>
  );
}
