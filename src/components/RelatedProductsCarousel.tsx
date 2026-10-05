import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';
import { AcanthusLeaf, GreekMeanderDivider } from './OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';

interface RelatedProductsCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function RelatedProductsCarousel({ products, title, subtitle }: RelatedProductsCarouselProps) {
  const { t, lang } = useLanguage();
  const displayTitle = title ?? t.collections.relatedDefaultTitle;
  const displaySubtitle = subtitle ?? t.collections.relatedDefaultSubtitle;
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number>(0);

  // Setas: pausam o marquee por 8s para o deslize suave ("smooth")
  // completar sem briga, depois o looping eterno retoma sozinho.
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    pausedRef.current = true;
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => { pausedRef.current = false; }, 8000);
    const card = scrollRef.current.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 16 : scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const pauseTemp = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => { pausedRef.current = false; }, 5000);
  };
  const pauseHold = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimer.current);
  };
  const resume = () => {
    window.clearTimeout(resumeTimer.current);
    pausedRef.current = false;
  };

  // Looping eterno e suave (marquee): a lista é renderizada 2x e o
  // scroll avança por atribuição direta (sem "smooth" brigando a cada
  // frame). Ao alcançar o início da 2ª cópia, volta exatamente um
  // período, de forma invisível, sem pulo de "voltar ao início".
  const loopProducts = products.length > 1 ? [...products, ...products] : products;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || products.length < 2) return;
    let raf = 0;
    let last = performance.now();
    const PX_PER_MS = 0.022; // ~22px/s, lento e elegante

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!pausedRef.current && document.visibilityState === 'visible') {
        const count = products.length;
        const first = el.children[0] as HTMLElement | undefined;
        const second = el.children[count] as HTMLElement | undefined;
        const period = first && second ? second.offsetLeft - first.offsetLeft : 0;
        const max = el.scrollWidth - el.clientWidth;
        if (period > 0 && max > 0) {
          el.scrollLeft += PX_PER_MS * dt;
          // Passou do fim real: recua um período exato (conteúdo idêntico).
          if (el.scrollLeft >= max - 1) el.scrollLeft -= period;
          // Segurança: se cruzar o início da 2ª cópia, normaliza.
          else if (second && el.scrollLeft >= second.offsetLeft) el.scrollLeft -= period;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer.current);
    };
  }, [products.length]);

  if (!products.length) return null;

  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden">
      {/* header */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <AcanthusLeaf className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">{displaySubtitle}</span>
          <AcanthusLeaf className="w-4 h-4 text-[#C5A059] scale-x-[-1]" />
        </div>
        <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.18em] uppercase text-[#F3EFE6] font-light">
          {displayTitle}
        </h2>
        <p className="font-cormorant text-lg italic text-[#C5A059] mt-2">{t.collections.relatedCurated}</p>
        <GreekMeanderDivider className="mt-6 opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* arrows desktop */}
        <button
          aria-label={t.collections.relatedPrev}
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-3 top-[38%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#080808]/90 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label={t.collections.relatedNext}
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-3 top-[38%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#080808]/90 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* fade degrade preto nas duas pontas */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-6 w-14 sm:w-20 md:w-28 z-10 bg-gradient-to-r from-[#020202] via-[#020202]/75 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-0 bottom-6 w-14 sm:w-20 md:w-28 z-10 bg-gradient-to-l from-[#020202] via-[#020202]/75 to-transparent" aria-hidden />

        {/* scroll container: swipe suave com dedos no mobile.
            scrollBehavior auto de propósito: o marquee usa atribuição
            direta por frame, e o "smooth" do CSS brigava e travava. */}
        <div
          ref={scrollRef}
          onPointerEnter={pauseHold}
          onPointerLeave={resume}
          onPointerDown={pauseTemp}
          onTouchStart={pauseTemp}
          onWheel={pauseTemp}
          className="no-scrollbar flex gap-4 md:gap-5 overflow-x-auto px-8 md:px-16 pb-6 cursor-grab active:cursor-grabbing"
          style={{
            scrollSnapType: 'x proximity',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            touchAction: 'pan-x pan-y',
            scrollBehavior: 'auto',
          }}
        >
          {loopProducts.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              data-card
              to={`/produto/${p.slug}`}
              aria-hidden={i >= products.length}
              tabIndex={i >= products.length ? -1 : undefined}
              className="group shrink-0 w-[205px] sm:w-[228px] md:w-[248px] flex flex-col rounded-[20px] bg-gradient-to-b from-[#0D0B07] to-[#060505] border border-white/10 hover:border-[#C5A059]/45 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(197,160,89,0.12)]"
              style={{ scrollSnapAlign: 'center' }}
            >
              {/* image: anel menor, elegante, contido */}
              <div className="relative aspect-square overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(197,160,89,0.16),transparent_62%)] p-7">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  draggable={false}
                  className="w-[88%] h-[88%] object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 group-hover:scale-[1.06] transition-all duration-700 ease-out select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060505] via-transparent to-transparent opacity-70 pointer-events-none" />
                {/* preço curto: badge no canto. Preço longo
                    ("Price Upon Request"): pequeno abaixo da categoria. */}
                {p.price.length <= 12 && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-[#C5A059]/25 backdrop-blur-sm">
                    <span className="font-cinzel text-[11px] tracking-wider text-[#E6CA85]">{p.price}</span>
                  </div>
                )}
                {/* categoria + preço longo abaixo dela */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                  <div className="px-2 py-1 rounded-full bg-gradient-to-r from-[#E6CA85] to-[#C5A059] shadow">
                    <span className="text-[7px] uppercase tracking-[0.18em] font-bold text-[#020202]">{p.category}</span>
                  </div>
                  {p.price.length > 12 && (
                    <div className="px-2 py-1 rounded-full bg-black/70 border border-[#C5A059]/25 backdrop-blur-sm max-w-[118px]">
                      <span className="block font-cinzel text-[8px] tracking-[0.1em] uppercase text-[#E6CA85] text-right leading-snug">{p.price}</span>
                    </div>
                  )}
                </div>
                {/* hover view */}
                <div className="absolute inset-0 bg-[#020202]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#E6CA85] text-[#020202] font-cinzel text-[9px] tracking-[0.25em] uppercase rounded-full shadow-lg scale-95 group-hover:scale-100 transition-transform">
                    {t.collections.relatedViewWork} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* edition row */}
              <div className="px-4 pt-3 flex justify-between items-center gap-2">
                <span className="text-[7.5px] uppercase tracking-[0.24em] text-[#E6CA85]/80 truncate">{p.specs.edition}</span>
                <span className={`shrink-0 text-[7.5px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${p.inStock ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-red-500/40 text-red-400'}`}>
                  {p.inStock ? t.collections.relatedAvailable : t.collections.relatedOnRequest}
                </span>
              </div>

              {/* text */}
              <div className="flex flex-col flex-grow p-4 pt-2">
                <span className="text-[8.5px] uppercase tracking-[0.26em] text-[#9A7B38] truncate">{p.subname}</span>
                <h3 className="font-cinzel text-[15px] tracking-[0.12em] uppercase text-[#F3EFE6] group-hover:text-[#E6CA85] transition-colors mt-1 line-clamp-1">
                  {p.name}
                </h3>
                <p className="font-cormorant text-[13px] leading-relaxed text-[#A8A296] line-clamp-2 mt-1.5 flex-grow">
                  {lang === 'es' ? (p.description_es ?? p.description) : lang === 'pt' ? (p.description_pt ?? p.description) : p.description}
                </p>
                <div className="mt-3 pt-3 border-t border-white/[0.07] flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] flex items-center gap-1.5">
                    {t.collections.relatedDiscover} <span className="w-6 h-px bg-[#C5A059] group-hover:w-9 transition-all" />
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>

        {/* mobile: deslize com os dedos */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-1">
          <button
            aria-label={t.collections.relatedPrev}
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-[#C5A059]/30 text-[#C5A059] flex items-center justify-center active:bg-[#C5A059] active:text-[#020202] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9A7B38]">{t.collections.relatedSwipe}</span>
          <button
            aria-label={t.collections.relatedNext}
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-[#C5A059]/30 text-[#C5A059] flex items-center justify-center active:bg-[#C5A059] active:text-[#020202] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
