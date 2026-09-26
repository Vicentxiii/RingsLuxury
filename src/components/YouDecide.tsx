import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  src: string;
  alt: string;
}

/**
 * Seção "YOU DECIDE EVERY STONE EVERY DETAIL" — logo após WHY CHOOSE RINGS LUXURY?
 * - Fundo: Title Session Rings Luxury Background YOU DECIDE EVERY STONE EVERY DETAIL.png (com opacidade, predominantemente preto)
 * - Carrossel lateral com as fotos do ateliê / sketches do mestre
 */
const SLIDES: Slide[] = [
  {
    src: '/PUBLIC/Rings Luxury Master Engraver Sketch 1.jpeg',
    alt: 'Sketch 1 — buril e anel heráldico do Master Engraver',
  },
  {
    src: '/PUBLIC/Rings Luxury Master Engraver Sketch 2 site.jpeg',
    alt: 'Sketch 2 — mão segurando anel heráldico sobre desenho',
  },
  {
    src: '/PUBLIC/rings-luxury-master-engraver-site.jpeg',
    alt: 'Anel gravado em estojo de madeira com pergaminho',
  },
  {
    src: '/PUBLIC/Ringsluxury HandMade Engraver Master rings.jpeg',
    alt: 'Anel de ouro com luva sobre esboço do mestre',
  },
  {
    src: '/PUBLIC/Rings Luxury Master Engraver Sketch 2 site ringsluxury@gmail.com.jpeg',
    alt: 'Collage — processo de gravação do anel heráldico',
  },
];

export function YouDecide() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const total = SLIDES.length;
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, total]);

  // ASSINATURA — revela com o scroll (0 -> 100%), dá zoom ao descer e some perto da seção de baixo
  const [sigStyle, setSigStyle] = useState({ opacity: 0, scale: 1 });
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(1, rect.height);
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + h))); // 0 ao entrar, 1 ao sair
      const fadeIn = Math.max(0, Math.min(1, p / 0.22)); // revela rápido no começo
      const fadeOut = Math.max(0, Math.min(1, (p - 0.72) / 0.28)); // some quase na seção de baixo
      setSigStyle({ opacity: fadeIn * (1 - fadeOut) * 0.65, scale: 1 + p * 0.9 });
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section
      id="you-decide"
      ref={sectionRef}
      className="relative w-full overflow-hidden isolate bg-[#020202] text-[#EAE6DF]"
      aria-label="You decide every stone every detail"
    >
      {/* FUNDO — foto do salão com opacidade, predominância preta */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src="/PUBLIC/Title Session Rings Luxury Background YOU DECIDE EVERY STONE EVERY DETAIL.png"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.42]"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        {/* véu preto para predominância da cor preta */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-black/45 to-[#020202]" aria-hidden />
        {/* fades topo/base para esconder o corte com as seções vizinhas */}
        <div className="absolute top-0 left-0 w-full h-[120px] sm:h-[160px] bg-gradient-to-b from-[#020202] to-transparent pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[160px] bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" aria-hidden />
      </div>

      {/* CONTEÚDO — 2 colunas: texto à esquerda, carrossel à direita */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.92fr] gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* TEXTO */}
          <div className="flex flex-col">
            <h2
              className="font-cormorant font-semibold uppercase leading-[1.08] text-[#C5A059]"
              style={{ fontSize: 'clamp(30px, 3.4vw, 46px)', letterSpacing: '0.04em' }}
            >
              YOU DECIDE EVERY
              <br />
              <span className="text-[#C5A059]">STONE</span>{' '}
              <span className="text-[#E6CA85]">EVERY DETAIL</span>
            </h2>

            <div className="mt-6 sm:mt-8 space-y-3 font-sans-luxury text-[#F1ECE2] max-w-[560px]">
              <p className="text-[12px] sm:text-[13px] leading-[1.75] text-[#EFE9DC]/95">
                Upon confirmation of your payment, you will receive the serial number of your
                powerful ring along with exact delivery dates (time upon request).
              </p>
              <p className="text-[12px] sm:text-[13px] leading-[1.75] text-[#EFE9DC]/95">
                First I make a mock sketch based on your ideas and details, so you can really see
                what your exclusive jewelry will look like, subject to change or approval, we start
                making it in the precious metal of your choice, and you follow the process during
                the making of your masterpiece!
              </p>
            </div>
          </div>

          {/* CARROSSEL */}
          <div
            className="relative w-full max-w-[560px] mx-auto lg:mx-0 lg:justify-self-end"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* moldura arredondada com borda dourada, como no print */}
            <div className="relative rounded-[28px] bg-[#050505]/95 border border-[#C5A059]/45 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
              {/* barra dourada no topo, como no print */}
              <div className="relative h-[10px] w-full bg-[#C5A059]">
                <div className="absolute inset-x-6 bottom-0 h-px bg-[#020202]/40" />
              </div>

              {/* área da imagem */}
              <div className="relative aspect-[4/3] bg-[#020202] overflow-hidden">
                {SLIDES.map((slide, i) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={i === index ? slide.alt : ''}
                    draggable={false}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                      i === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                ))}

                {/* vinheta suave */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 68%, rgba(0,0,0,0.45) 100%)',
                  }}
                  aria-hidden
                />
              </div>

              {/* rodapé do card — contador */}
              <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#C5A059]/20">
                <span className="text-[9px] uppercase tracking-[0.32em] text-[#9A7B38]">
                  ATELIER ARCHIVE
                </span>
                <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#C5A059]">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* setas laterais */}
            <button
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-1/3 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0A0A0A]/90 border border-[#C5A059]/50 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] transition-all shadow-[0_0_18px_rgba(197,160,89,0.25)] flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-1/3 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0A0A0A]/90 border border-[#C5A059]/50 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] transition-all shadow-[0_0_18px_rgba(197,160,89,0.25)] flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* dots */}
            <div className="mt-5 flex justify-center gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para foto ${i + 1}`}
                  className={`h-[5px] rounded-full transition-all duration-500 ${
                    i === index ? 'w-7 bg-[#C5A059]' : 'w-[14px] bg-[#C5A059]/25 hover:bg-[#C5A059]/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ASSINATURA JORGE UQUILLAS — no meio da seção, revela com o scroll */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <img
            src="/PUBLIC/assinatura Jorge Uquillas Rings Luxury.png"
            alt="Assinatura de Jorge Uquillas"
            draggable={false}
            className="w-[130px] sm:w-[150px] h-auto object-contain select-none will-change-[opacity,transform]"
            style={{ opacity: sigStyle.opacity, transform: `scale(${sigStyle.scale})` }}
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
        </div>
      </div>
    </section>
  );
}

export default YouDecide;
