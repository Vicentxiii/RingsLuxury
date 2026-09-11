import React, { useEffect, useState, useRef } from 'react';
import { LaurelWreath, GreekKeyBorder } from './OrnamentIcons';
import statueImg from '../assets/images/statue_darkness_eternal_1789071956592.jpg';

export function StatueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        // Calculate relative position for slow parallax
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        setOffsetY((progress - 0.5) * 60);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="statue-section"
      className="relative w-full min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#020202] py-28"
    >
      {/* Background Statue with Slow Parallax Movement */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center transition-transform duration-300 ease-out will-change-transform filter contrast-[1.12] brightness-[0.88]"
        style={{
          backgroundImage: `url(${statueImg})`,
          transform: `translate3d(${mousePos.x * 0.4}px, ${offsetY + mousePos.y * 0.3}px, 0)`,
        }}
      />

      {/* Atmospheric Chiaroscuro Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-[#020202]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.08),transparent_70%)]" />

      {/* Volumetric Warm Golden Light Beam */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-[110px] pointer-events-none transition-transform duration-700"
        style={{
          transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`,
        }}
      />

      {/* Content Overlay Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Subtle Laurel Emblem */}
        <div className="inline-flex items-center justify-center mb-6">
          <LaurelWreath className="w-12 h-12 text-[#C5A059] opacity-80" />
        </div>

        <div className="text-[10px] md:text-[11px] font-sans-luxury tracking-[0.45em] text-[#9A7B38] uppercase mb-4">
          THE MONUMENT OF IMMORTALITY
        </div>

        {/* Overlay Typography: BEAUTY IS ETERNAL */}
        <h2
          id="statue-heading"
          className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.22em] uppercase text-[#FBF9F5] font-light leading-tight mb-8 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
        >
          BEAUTY
          <br />
          <span className="font-decorative text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5DC] via-[#C5A059] to-[#806325] italic tracking-[0.24em]">
            IS ETERNAL
          </span>
        </h2>

        {/* Below Text */}
        <p className="font-cormorant text-xl sm:text-2xl md:text-3xl italic tracking-[0.18em] text-[#D8D2C4] max-w-2xl mx-auto leading-relaxed mb-8">
          Inspired by civilizations that transformed craftsmanship into art.
        </p>

        <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#9A7B38]">
          <span>CANON OF POLYKLEITOS</span>
          <span>•</span>
          <span>THE GOLDEN RATIO Φ 1.618</span>
          <span>•</span>
          <span>PARTHENON MARBLE</span>
        </div>
      </div>

      {/* Top and Bottom Architectural Borders */}
      <div className="absolute top-0 left-0 w-full opacity-25">
        <GreekKeyBorder className="w-full h-1.5" />
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-25">
        <GreekKeyBorder className="w-full h-1.5" />
      </div>
    </section>
  );
}
