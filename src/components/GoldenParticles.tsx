import { useEffect, useRef } from 'react';

interface GoldenParticlesProps {
  density?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  swayAmp: number;
  swaySpeed: number;
  color: string;
  depth: number;
}

/**
 * GoldenParticles — poeira dourada elegante flutuando,
 * que reage suavemente à passagem do mouse:
 * - partículas próximas ao cursor iluminam e se afastam com delicadeza
 * - depois retornam ao fluxo original (efeito "respiração" luxuosa)
 * Canvas 2D leve, DPR-aware, respeita prefers-reduced-motion.
 */
export function GoldenParticles({ density = 90, className = '' }: GoldenParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: Particle[] = [];

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    const parent = canvas.parentElement;

    const COLORS = ['#C5A059', '#E6CA85', '#FFF4DC', '#9A7B38'];

    const pickColor = () => {
      const r = Math.random();
      if (r < 0.5) return COLORS[0];
      if (r < 0.78) return COLORS[1];
      if (r < 0.92) return COLORS[2];
      return COLORS[3];
    };

    const countForWidth = () => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) return Math.round(density * 0.45);
      if (window.innerWidth < 1280) return Math.round(density * 0.75);
      return density;
    };

    const spawn = (p?: Partial<Particle>): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: 0,
      baseY: 0,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.08 + Math.random() * 0.28),
      size: 0.6 + Math.random() * 2.2,
      alpha: 0.25 + Math.random() * 0.6,
      baseAlpha: 0.25 + Math.random() * 0.6,
      twinkleSpeed: 0.4 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
      swayAmp: 8 + Math.random() * 26,
      swaySpeed: 0.15 + Math.random() * 0.5,
      color: pickColor(),
      depth: 0.4 + Math.random() * 0.6,
      ...p,
    });

    const resize = () => {
      const rect = parent?.getBoundingClientRect();
      const cw = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const ch = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cw;
      h = ch;
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = countForWidth();
      particles = Array.from({ length: n }, () => {
        const p = spawn();
        p.baseX = p.x;
        return p;
      });
    };

    resize();
    window.addEventListener('resize', resize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.active = true;
    };
    const onPointerLeave = () => {
      mouse.active = false;
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    // O canvas é pointer-events-none, então escutamos no parent / window
    const listenTarget = parent ?? window;
    listenTarget.addEventListener('pointermove', onPointerMove as EventListener, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    // Touch: partículas também reagem ao toque arrastando
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = t.clientX - rect.left;
      mouse.ty = t.clientY - rect.top;
      mouse.active = true;
    };
    listenTarget.addEventListener('touchmove', onTouchMove as EventListener, { passive: true });

    const INFLUENCE = 150;

    const drawFrame = (time: number) => {
      // Suaviza a posição do mouse (movimento sedoso, sem saltos)
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      if (Math.abs(mouse.tx - mouse.x) < 0.5) mouse.x = mouse.tx;
      if (Math.abs(mouse.ty - mouse.y) < 0.5) mouse.y = mouse.ty;

      ctx.clearRect(0, 0, w, h);
      const t = time / 1000;

      for (const p of particles) {
        // Fluxo base: subida lenta + deriva lateral em seno
        p.baseX += p.vx * p.depth;
        p.y += p.vy * p.depth;
        const swayX = Math.sin(t * p.swaySpeed + p.phase) * p.swayAmp * 0.12;

        // Recicla no topo
        if (p.y < -12) {
          p.y = h + 10;
          p.baseX = Math.random() * w;
        }
        if (p.baseX > w + 12) p.baseX = -10;
        if (p.baseX < -12) p.baseX = w + 10;

        let x = p.baseX + swayX;
        let y = p.y + Math.cos(t * p.swaySpeed * 0.7 + p.phase) * 6;

        // Reação ao mouse: brilho + repulsão suave
        let glow = 0;
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE && dist > 0.01) {
            const force = (1 - dist / INFLUENCE);
            const eased = force * force;
            const push = eased * 34 * p.depth;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
            glow = eased;
          }
        }

        const twinkle = 0.65 + 0.35 * Math.sin(t * p.twinkleSpeed + p.phase);
        const alpha = Math.min(1, p.baseAlpha * twinkle + glow * 0.55);
        const size = p.size * (1 + glow * 0.9);

        // Núcleo
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Halo elegante nas partículas iluminadas ou nas maiores
        if (glow > 0.02 || p.size > 1.8) {
          const haloR = size * (4 + glow * 6);
          const grad = ctx.createRadialGradient(x, y, 0, x, y, haloR);
          grad.addColorStop(0, `rgba(230, 202, 133, ${0.22 + glow * 0.5})`);
          grad.addColorStop(0.5, `rgba(197, 160, 89, ${0.08 + glow * 0.18})`);
          grad.addColorStop(1, 'rgba(197, 160, 89, 0)');
          ctx.globalAlpha = 1;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, haloR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    if (reduceMotion) {
      drawFrame(1200);
    } else {
      const loop = (time: number) => {
        drawFrame(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      listenTarget.removeEventListener('pointermove', onPointerMove as EventListener);
      listenTarget.removeEventListener('touchmove', onTouchMove as EventListener);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}

export default GoldenParticles;
