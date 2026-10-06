import { useEffect, useMemo, useRef } from 'react';

/**
 * Folhas douradas, aparecem na seção QUEM SOU EU (Jorge Uquillas)
 * - Nascem nos cantos laterais da seção, descem em diagonal para o meio e somem
 * - Nunca ficam em cima do texto
 * - Arquitetura em 2 camadas para rodar liso no mobile:
 *   outer DIV = scroll/parallax via JS (translate3d, GPU puro)
 *   inner IMG = giro no próprio eixo via CSS animation (compositor thread,
 *   não trava o scroll no iPhone, funciona igual mobile + desktop)
 * - Zero re-render por frame (escreve direto no DOM via refs)
 */
export function FolhasScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leaf1Ref = useRef<HTMLDivElement>(null);
  const leaf2Ref = useRef<HTMLDivElement>(null);
  const rangeRef = useRef({ start: 0, end: 1600 });
  const rafRef = useRef(0);
  const tickingRef = useRef(false);
  // sombra estática só no desktop (no mobile ela força repaint por frame)
  const leafFilter = useMemo(
    () =>
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches
        ? undefined
        : 'drop-shadow(0 10px 22px rgba(0,0,0,0.48)) brightness(1.02)',
    [],
  );

  useEffect(() => {
    const calcRange = () => {
      const el = document.getElementById('quem-sou-eu');
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      // começa a aparecer quando a seção entra (40% da viewport já visível)
      const start = top - window.innerHeight * 0.52;
      // termina antes da terceira seção, 88% da altura da QuemSouEu
      const end = top + h * 0.88;
      rangeRef.current = { start: Math.max(0, start), end };
    };

    const paint = () => {
      tickingRef.current = false;
      const wrap = wrapRef.current;
      const l1 = leaf1Ref.current;
      const l2 = leaf2Ref.current;
      if (!wrap || !l1 || !l2) return;

      const { start, end } = rangeRef.current;
      const total = Math.max(1, end - start);
      const y = window.scrollY;
      const progress = Math.max(0, Math.min(1, (y - start) / total));

      // antes de chegar na seção: invisível
      // fade-in rápido 0 -> 0.18, visível 0.18 -> 0.62, fade-out 0.62 -> 1
      let op = 0;
      if (progress < 0.14) {
        op = progress / 0.14; // fade in
      } else if (progress < 0.62) {
        op = 1;
      } else {
        op = 1 - (progress - 0.62) / 0.38; // fade out elegante
      }
      op = Math.max(0, Math.min(1, op));

      // só calcula deslocamento enquanto está visível (0..1 dentro da seção)
      const local = Math.max(0, Math.min(1, (y - start) / total));
      const tY = local * 520; // queda até embaixo
      const tX = local * 170; // abertura diagonal

      // translate + sway leve via JS (barato, GPU puro, igual mobile/desktop)
      // o giro no próprio eixo fica por conta do CSS (.folha-spin) no IMG interno,
      // por isso roda suave até no iPhone sem travar o scroll
      const sway1 = Math.sin(local * Math.PI * 3) * 22;
      const sway2 = Math.sin(local * Math.PI * 3 + Math.PI) * 22;
      const scale = 1 - local * 0.08;
      wrap.style.opacity = op <= 0.02 ? '0' : '1';
      l1.style.opacity = String(op);
      l2.style.opacity = String(op * 0.96);
      l1.style.transform = `translate3d(${tX * 0.45 + sway1}px, ${tY}px, 0) scale(${scale})`;
      l2.style.transform = `translate3d(${-tX * 0.45 + sway2}px, ${tY * 0.92}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = window.requestAnimationFrame(paint);
      }
    };

    calcRange();
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      calcRange();
      paint();
    });

    // recalc após imagens carregarem (altura da seção pode mudar)
    const t = setTimeout(calcRange, 800);
    const t2 = setTimeout(calcRange, 2000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 pointer-events-none z-[28] overflow-hidden"
      aria-hidden
      style={{ opacity: 0, transition: 'opacity 0.22s linear' }}
    >
      {/* FOLHA 1, canto esquerdo da seção, desce em diagonal para o meio e some */}
      <div
        ref={leaf1Ref}
        className="absolute"
        style={{
          top: '26%',
          left: 'max(14px, 2.5vw)',
          width: '76px',
          opacity: 0,
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
        }}
      >
        <img
          src="/PUBLIC/folha-scroll-1.webp"
          alt=""
          draggable={false}
          className="folha-spin block w-full h-auto select-none"
          style={{ filter: leafFilter }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>

      {/* FOLHA 2, canto direito da seção, desce em diagonal para o meio e some */}
      <div
        ref={leaf2Ref}
        className="absolute"
        style={{
          top: '32%',
          right: 'max(14px, 2.5vw)',
          width: '88px',
          opacity: 0,
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
        }}
      >
        <img
          src="/PUBLIC/folha-scroll-2.webp"
          alt=""
          draggable={false}
          className="folha-spin-rev block w-full h-auto select-none"
          style={{ filter: leafFilter }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>
    </div>
  );
}

export default FolhasScroll;
