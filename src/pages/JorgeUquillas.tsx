import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function JorgeUquillas() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="w-full h-screen bg-[#020202] relative overflow-hidden">
      <SEO
        title="RINGS LUXURY by Jorge Uquillas — Laocoön Bronze Horse | HandCrafted Anéis Artesanais Ouro 18k"
        description="RINGS LUXURY by Jorge Uquillas — Laocoön: Bronze and Time. Cavalo de bronze e anéis artesanais 1/1 HandCrafted em ouro 18k com diamantes, gravados com buril. Handmade 18k gold diamond rings by master artisan Jorge Uquillas. Brasil • Miami."
        keywords="Jorge Uquillas, RINGS LUXURY, Laocoön, Bronze Horse, anéis artesanais, HandCrafted, ouro 18k, handmade 18k gold diamond rings, buril, anéis feitos à mão, atelier Brasil Miami"
        url="/jorge-uquillas"
      />
      {/* Overlay de navegação para sair do iframe (o html interno tem nav mas ficaria preso no iframe) */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none">
        <button
          onClick={() => navigate('/')}
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A059]/40 bg-[#070707]/80 backdrop-blur-md text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] hover:border-[#C5A059] transition-all text-[10px] tracking-[0.22em] uppercase font-cinzel"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Atelier
        </button>
          <span className="hidden sm:inline-flex items-center gap-2 text-[8px] tracking-[0.32em] uppercase text-white/60 pointer-events-none">
            <span className="w-1 h-1 rounded-full bg-[#C5A059] animate-pulse" />
            RINGS LUXURY • Jorge Uquillas • HandCrafted 18k • Anéis Artesanais
          </span>
        <a
          href="/#contact"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            setTimeout(() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.location.href = '/#contact';
            }, 300);
          }}
          className="pointer-events-auto hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-[10px] tracking-widest uppercase font-medium hover:bg-[#F3EFE6] transition-colors"
        >
          Contact
        </a>
      </div>

      {/* Iframe que carrega a experiência imersiva completa do cavalo de bronze */}
      <iframe
        src="/jorge-uquillas.html"
        title="RINGS LUXURY by Jorge Uquillas — Laocoön Bronze Horse 3D — Anéis artesanais HandCrafted ouro 18k"
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
        loading="eager"
        style={{ background: '#000' }}
      />

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
