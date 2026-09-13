import React, { useEffect, useMemo, useState } from 'react';

interface EpicPreloaderProps {
  isExiting: boolean;
}

export function EpicPreloader({ isExiting }: EpicPreloaderProps) {
  const [progress, setProgress] = useState(0);

  // Progress visível em 4s — animação contínua e suave, realística
  useEffect(() => {
    const start = performance.now();
    const duration = 4000;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic para movimento contínuo visível do 0 ao 100 sem travar
      const eased = 1 - Math.pow(1 - t, 2.4);
      // leve variação orgânica para não parecer robótico, mas sem pausar
      const jitter = Math.sin(elapsed * 0.009) * 0.18;
      let p = eased * 100 + jitter;
      p = Math.min(100, Math.max(0, p));
      if (t >= 1) p = 100;
      setProgress(p);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Partículas amarelas flutuantes - memo para não recriar
  const particles = useMemo(() => {
    return Array.from({ length: 55 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + Math.random() * 3.5, // minúsculas 1.5-5px
      duration: 3 + Math.random() * 6,
      delay: Math.random() * 4,
      drift: (Math.random() - 0.5) * 80,
      opacity: 0.35 + Math.random() * 0.65,
      blur: Math.random() < 0.3 ? 0.5 : 0,
    }));
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020202] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isExiting}
    >
      {/* Fundo épico com gradientes */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#020202]" />
        {/* Halo dourado central sutil */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.08] blur-[90px] bg-[radial-gradient(circle_at_center,_#C5A059_0%,_transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full opacity-[0.06] blur-[60px] bg-[radial-gradient(circle_at_center,_#E6CA85_0%,_transparent_65%)]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#020202_85%)]" />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04] film-grain pointer-events-none" />
        {/* Linhas gregas sutis */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(197,160,89,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Partículas minúsculas amarelas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-[#C5A059] will-change-transform"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              boxShadow: p.size > 3
                ? `0 0 ${p.size * 3}px rgba(197,160,89,0.9), 0 0 ${p.size * 6}px rgba(230,202,133,0.5)`
                : `0 0 ${p.size * 2}px rgba(197,160,89,0.8)`,
              animation: `epicFloat ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              // @ts-ignore custom property
              '--drift': `${p.drift}px`,
            } as React.CSSProperties & { '--drift': string }}
          />
        ))}

        {/* Partículas extras maiores com brilho forte */}
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={`glow-${i}`}
            className="absolute rounded-full bg-[#E6CA85]"
            style={{
              left: `${15 + i * 11}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `2px`,
              height: `2px`,
              opacity: 0.9,
              boxShadow: `0 0 8px 2px rgba(197,160,89,0.9), 0 0 16px 4px rgba(230,202,133,0.4)`,
              animation: `epicTwinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo central - adaptado mobile */}
      <div className={`relative z-10 flex flex-col items-center text-center px-4 sm:px-6 transition-all duration-700 ease-out max-h-[100dvh] overflow-hidden py-6 ${isExiting ? 'scale-95 opacity-0 blur-[8px]' : 'scale-100 opacity-100 blur-0'}`}>
        {/* Logo WEBP puro - bem menor, sem bola, fundo transparente partículas atrás */}
        <div className="relative flex items-center justify-center shrink-0">
          {/* Halo atrás do WEBP - deixado bem mais sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[100px] sm:w-[280px] sm:h-[130px] bg-[#C5A059]/[0.03] blur-[55px] sm:blur-[65px] rounded-full pointer-events-none opacity-[0.12] sm:opacity-[0.15]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[60px] sm:w-[200px] sm:h-[90px] bg-[#E6CA85]/[0.02] blur-[30px] sm:blur-[40px] rounded-full pointer-events-none opacity-[0.18]" />
          
          <img
            src="/PUBLIC/logo-novo-high-resolution.webp"
            alt="Rings Luxury"
            className="relative w-[118px] sm:w-[148px] md:w-[168px] lg:w-[185px] h-auto object-contain select-none max-w-[68vw] max-h-[32dvh]"
            style={{ filter: 'drop-shadow(0 0 14px rgba(197,160,89,0.14)) drop-shadow(0 6px 22px rgba(0,0,0,0.9))' }}
            draggable={false}
            onError={(e) => {
              const target = e.currentTarget;
              // fallback chain se webp falhar -> PNG high-res original (transparente) -> /PUBLIC/logo.png -> /logo.svg
              if (!target.src.includes('LOGO%20NOVO') && !target.dataset.triedHighRes) {
                target.dataset.triedHighRes = '1';
                target.src = encodeURI('/PUBLIC/LOGO NOVO HIGH RESOLUTION.png');
              } else if (!target.src.includes('logo.png') && !target.dataset.triedPng) {
                target.dataset.triedPng = '1';
                target.src = '/PUBLIC/logo.png';
              } else if (!target.src.includes('logo.svg')) {
                target.src = '/logo.svg';
              }
            }}
          />
        </div>

        {/* Tipografia - escala menor no mobile */}
        <div className="mt-5 sm:mt-7 flex flex-col items-center shrink-0">
          <h1 className="font-cinzel text-[16px] sm:text-[22px] md:text-[26px] tracking-[0.32em] sm:tracking-[0.42em] text-[#FBF9F5] font-light flex items-center gap-2 sm:gap-3">
            RINGS
            <span className="w-1 h-1 rounded-full bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.8)] animate-[pulse_1.2s_ease-in-out_infinite] hidden sm:inline-block" />
            LUXURY
          </h1>
          <div className="mt-1.5 sm:mt-2 flex items-center gap-2 sm:gap-3 opacity-90">
            <span className="h-px w-5 sm:w-8 bg-gradient-to-r from-transparent to-[#C5A059]/60" />
            <p className="text-[7.5px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.38em] uppercase text-[#C5A059] font-medium whitespace-nowrap">
              Haute Joaillerie • Atelier
            </p>
            <span className="h-px w-5 sm:w-8 bg-gradient-to-l from-transparent to-[#C5A059]/60" />
          </div>
          <p className="mt-1 text-[7px] sm:text-[8.5px] tracking-[0.22em] sm:tracking-[0.28em] uppercase text-[#9A7B38]/80">
            Athens • Paris • Geneva
          </p>
        </div>

        {/* Barra de progresso épica - responsiva */}
        <div className="mt-6 sm:mt-10 w-[78vw] max-w-[280px] sm:w-[260px] flex flex-col items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="relative w-full h-[2px] bg-[#C5A059]/15 rounded-full overflow-hidden backdrop-blur-sm border border-[#C5A059]/10">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8C6D2C] via-[#C5A059] to-[#FFF0D0] rounded-full"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 12px rgba(197,160,89,0.85), 0 0 24px rgba(197,160,89,0.35)',
                transition: 'width 90ms linear',
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFF0D0] rounded-full blur-[2px] opacity-80 -mr-1" />
            </div>
            {/* Brilho percorrendo */}
            <div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-[epicProgressShine_1.1s_ease-in-out_infinite]"
              style={{ left: `${Math.max(0, progress - 18)}%` }}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-[8px] tracking-[0.28em] uppercase text-[#9A7B38]">
              Entering Atelier
            </span>
            <span className="font-cinzel text-[10px] tracking-widest text-[#C5A059]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Texto inferior */}
        <p className="mt-4 text-[7.5px] tracking-[0.32em] uppercase text-[#9A7B38]/55 animate-[pulse_2s_ease-in-out_infinite]">
          Forged in antiquity • Born for eternity
        </p>
      </div>

      {/* Borda inferior dourada sutil */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
        <span className="w-6 h-px bg-[#C5A059]/40" />
        <span className="w-1 h-1 rotate-45 border border-[#C5A059]/60" />
        <span className="w-6 h-px bg-[#C5A059]/40" />
      </div>

      <style>{`
        @keyframes epicFloat {
          0%, 100% { transform: translate3d(0, 0, 0) translateX(0); opacity: 0.5; }
          25% { transform: translate3d(var(--drift, 30px), -18px, 0) translateX(6px); opacity: 1; }
          50% { transform: translate3d(calc(var(--drift, 30px) * 0.5), -36px, 0) translateX(-4px); opacity: 0.85; }
          75% { transform: translate3d(calc(var(--drift, 30px) * -0.3), -14px, 0) translateX(3px); opacity: 0.9; }
        }
        @keyframes epicTwinkle {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }
        @keyframes epicShine {
          0% { transform: translateX(-100%) rotate(12deg); }
          60%, 100% { transform: translateX(100%) rotate(12deg); }
        }
        @keyframes epicProgressShine {
          0% { opacity: 0; transform: translateX(-40px) skewX(-12deg); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(40px) skewX(-12deg); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spin_reverse { to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}

export default EpicPreloader;
