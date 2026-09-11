import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';
import { AcanthusLeaf, GreekMeanderDivider } from './OrnamentIcons';

interface RelatedProductsCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function RelatedProductsCarousel({ products, title = 'Obras Relacionadas', subtitle = 'Curadoria do Atelier' }: RelatedProductsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (!products.length) return null;

  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden">
      {/* header */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <AcanthusLeaf className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">{subtitle}</span>
          <AcanthusLeaf className="w-4 h-4 text-[#C5A059] scale-x-[-1]" />
        </div>
        <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.18em] uppercase text-[#F3EFE6] font-light">
          {title}
        </h2>
        <p className="font-cormorant text-lg italic text-[#C5A059] mt-2">Selecionadas pelo Mestre para esta aquisição</p>
        <GreekMeanderDivider className="mt-6 opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* arrows desktop */}
        <button
          aria-label="Anterior"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#080808]/90 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label="Próximo"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#080808]/90 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-12 pb-6 scrollbar-thin scrollbar-track-[#020202] scrollbar-thumb-[#C5A059]/30 hover:scrollbar-thumb-[#C5A059]/60"
          style={{ scrollbarWidth: 'thin' }}
        >
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/produto/${p.slug}`}
              className="group snap-start shrink-0 w-[280px] md:w-[320px] flex flex-col bg-[#080808] border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all duration-500 overflow-hidden"
            >
              {/* image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#050505]">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60 pointer-events-none" />
                {/* price badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#020202]/85 border border-[#C5A059]/30 backdrop-blur-sm">
                  <span className="font-cinzel text-xs tracking-widest text-[#C5A059]">{p.price}</span>
                </div>
                {/* category */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-[#C5A059] text-[#020202]">
                  <span className="text-[7px] uppercase tracking-[0.2em] font-semibold">{p.category}</span>
                </div>
                {/* hover view */}
                <div className="absolute inset-0 bg-[#020202]/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full shadow-lg">
                    Ver Obra <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                {/* bottom edition */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-[#020202] to-transparent flex justify-between items-end">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-[#E6CA85]/80">{p.specs.edition}</span>
                  <span className={`text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${p.inStock ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-red-500/40 text-red-400'}`}>
                    {p.inStock ? 'Disponível' : 'Sob Consulta'}
                  </span>
                </div>
              </div>

              {/* text */}
              <div className="flex flex-col flex-grow p-5">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A7B38]">{p.subname}</span>
                <h3 className="font-cinzel text-base tracking-[0.14em] uppercase text-[#F3EFE6] group-hover:text-[#C5A059] transition-colors mt-1 line-clamp-1">
                  {p.name}
                </h3>
                <p className="font-cormorant text-sm leading-relaxed text-[#A8A296] line-clamp-2 mt-2 flex-grow">
                  {p.description}
                </p>
                <div className="mt-4 pt-4 border-t border-[#C5A059]/15 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] flex items-center gap-1.5">
                    Descobrir <span className="w-6 h-px bg-[#C5A059] group-hover:w-8 transition-all" />
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* mobile dots hint + arrows mobile */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-[#C5A059]/30 text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9A7B38]">Deslize para explorar</span>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-[#C5A059]/30 text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
