import { useEffect, useState } from 'react';

/**
 * Folhas douradas — aparecem SÓ na segunda seção (QUEM SOU EU)
 * - Perto do nome/foto do Jorge, ficam no meio da seção
 * - Ao descer para a terceira seção já sumiram (fade + diagonal para baixo)
 */
export function FolhasScroll() {
  const [y, setY] = useState(0);
  const [range, setRange] = useState({ start: 0, end: 1600 });

  useEffect(() => {
    const calcRange = () => {
      const el = document.getElementById('quem-sou-eu');
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      // começa a aparecer quando a seção entra (40% da viewport já visível)
      const start = top - window.innerHeight * 0.52;
      // termina antes da terceira seção (Collection) — 85% da altura da QuemSouEu
      const end = top + h * 0.88;
      setRange({ start: Math.max(0, start), end });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    calcRange();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      calcRange();
      onScroll();
    });

    // recalc após imagens carregarem (altura da seção pode mudar)
    const t = setTimeout(calcRange, 800);
    const t2 = setTimeout(calcRange, 2000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const { start, end } = range;
  const total = Math.max(1, end - start);
  const raw = (y - start) / total; // 0 no início da seção, 1 no final
  const progress = Math.max(0, Math.min(1, raw));

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

  const r1 = local * 18;
  const r2 = -local * 16;
  const scale = 1 - local * 0.1;

  // se ainda não entrou ou já passou, não renderiza com opacity 0 mas mantém no DOM para transição
  const hidden = op <= 0.02;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[28] overflow-hidden"
      aria-hidden
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.22s linear' }}
    >
      {/* FOLHA 1 — perto da foto (lado esquerdo da seção) — cai diagonal esquerda-baixo */}
      <img
        src="/PUBLIC/folha-scroll-1.webp"
        alt=""
        draggable={false}
        className="absolute select-none will-change-transform"
        style={{
          top: '50%',
          left: 'calc(50% - 168px)',
          width: '82px',
          height: 'auto',
          marginTop: '-86px',
          opacity: op,
          transform: `translate3d(${-tX}px, ${tY}px, 0) rotate(${r1}deg) scale(${scale})`,
          filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.48)) brightness(1.02)',
        }}
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
      />

      {/* FOLHA 2 — perto do nome (lado direito, próxima ao título JORGE UQUILLAS) — cai diagonal direita-baixo */}
      <img
        src="/PUBLIC/folha-scroll-2.png"
        alt=""
        draggable={false}
        className="absolute select-none will-change-transform"
        style={{
          top: '50%',
          left: 'calc(50% + 78px)',
          width: '96px',
          height: 'auto',
          marginTop: '-118px',
          opacity: op * 0.96,
          transform: `translate3d(${tX}px, ${tY * 0.92}px, 0) rotate(${r2}deg) scale(${scale})`,
          filter: 'drop-shadow(0 12px 26px rgba(0,0,0,0.5)) brightness(1.02)',
        }}
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
      />
    </div>
  );
}

export default FolhasScroll;
