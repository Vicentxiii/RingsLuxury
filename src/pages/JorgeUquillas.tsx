import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function JorgeUquillas() {
  const navigate = useNavigate();
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderFading, setPreloaderFading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    // Preloader de 5s com a peça 3D antes de revelar o iframe
    const t1 = setTimeout(() => setPreloaderFading(true), 4300);
    const t2 = setTimeout(() => setShowPreloader(false), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#020202] relative overflow-hidden">
      <SEO
        title="RINGS LUXURY by Jorge Uquillas — Laocoön Bronze Horse | HandCrafted Anéis Artesanais Ouro 18k"
        description="RINGS LUXURY by Jorge Uquillas — Laocoön: Bronze and Time. Cavalo de bronze e anéis artesanais 1/1 HandCrafted em ouro 18k com diamantes, gravados com buril. Handmade 18k gold diamond rings by master artisan Jorge Uquillas. Brasil • Miami."
        keywords="Jorge Uquillas, RINGS LUXURY, Laocoön, Bronze Horse, anéis artesanais, HandCrafted, ouro 18k, handmade 18k gold diamond rings, buril, anéis feitos à mão, atelier Brasil Miami"
        url="/jorge-uquillas"
      />
      {/* Overlay minimal — evita duplicar header do iframe */}
      <div className="absolute top-0 left-0 z-20 p-4 sm:p-6 pointer-events-none">
        <button
          onClick={() => navigate('/')}
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A059]/40 bg-[#070707]/80 backdrop-blur-md text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] hover:border-[#C5A059] transition-all text-[10px] tracking-[0.22em] uppercase font-cinzel shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Atelier
        </button>
      </div>

      {/* Iframe que carrega a experiência imersiva completa — pocket watch 3D */}
      <iframe
        src="/jorge-uquillas.html"
        title="RINGS LUXURY by Jorge Uquillas — Laocoön Bronze Horse 3D — Anéis artesanais HandCrafted ouro 18k"
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
        loading="eager"
        style={{ background: '#000' }}
      />

      {/* Preloader 5s com mini preview da peça 3D antes de entrar */}
      {showPreloader && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020202] transition-opacity duration-700 ${preloaderFading ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/90 to-[#020202] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.12)_0%,_transparent_65%)] pointer-events-none" />
          <div className="relative flex flex-col items-center gap-8 px-6 text-center">
            <div className="w-20 h-20 rounded-full border border-[#C5A059]/30 flex items-center justify-center bg-[#0a0805] shadow-[0_0_40px_rgba(197,160,89,0.25)]">
              <span className="font-cinzel text-[10px] tracking-[0.32em] text-[#C5A059]">RL</span>
            </div>
            <div className="space-y-3">
              <p className="font-cinzel text-[11px] tracking-[0.45em] uppercase text-[#E6CA85]">RINGS LUXURY • JORGE UQUILLAS</p>
              <p className="font-cormorant text-2xl sm:text-3xl italic text-[#FBF9F5] tracking-[0.08em]">Lion Head</p>
              <p className="font-sans-luxury text-[10px] tracking-[0.28em] uppercase text-[#9A7B38]">HandCrafted 18k • Anéis Artesanais • 3D</p>
            </div>
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent overflow-hidden">
              <div className="h-full bg-[#C5A059] animate-[shimmer_1.2s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>
            <p className="font-cinzel text-[9px] tracking-[0.35em] uppercase text-white/50">Carregando obra 3D — 5s</p>
          </div>
        </div>
      )}

      {/* Fallback / Loader enquanto iframe carrega */}
      <noscript>
        <div className="absolute inset-0 flex items-center justify-center bg-[#020202] text-[#C5A059]">
          Ative o JavaScript para visualizar a obra em 3D.
        </div>
      </noscript>
    </div>
  );
}

export default JorgeUquillas;
