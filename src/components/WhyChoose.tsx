/**
 * Seção WHY CHOOSE RINGS LUXURY? — fiel ao print, SEO com título literal (sem imagem TITLE)
 * - Fundo: why-bg.webp
 * - 4 ícones: why-100-handmade, why-best-gold, why-lifetime, why-satisfied
 */
export function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="relative w-full bg-black overflow-hidden isolate border-b border-[#C5A059]/35"
      aria-label="Why choose Rings Luxury"
    >
      {/* FUNDO — Backgroudn com textura dourada sutil no canto inferior direito */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src="/PUBLIC/why-bg.webp"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-right-bottom opacity-[0.72]"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        {/* véu para manter centro bem preto e bordas suaves */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/35 to-black/10" aria-hidden />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 78% 65% at 50% 38%, transparent 48%, rgba(0,0,0,0.55) 88%)',
          }}
          aria-hidden
        />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 pt-10 sm:pt-12 lg:pt-[42px] pb-12 sm:pb-14 lg:pb-[44px]">
        {/* TÍTULO — 100% texto literal para SEO, sem imagem TITLE */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-cinzel font-normal tracking-[0.06em] uppercase flex items-baseline gap-[0.35em] text-[20px] sm:text-[24px] lg:text-[26px]">
            <span className="text-[#F2ECE0]">WHY CHOOSE</span>
            <span className="text-[#C5A059] italic font-cormorant font-medium tracking-[0.04em]">RINGS LUXURY?</span>
          </h2>
          {/* Linha ornamental dourada abaixo do título — replica a do print sem usar a imagem TITLE */}
          <div className="relative mt-3 w-full max-w-[640px] flex items-center justify-center gap-3">
            <span className="hidden sm:block text-[#C5A059]/90 text-[16px] leading-none select-none" aria-hidden>
              ❧
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5A059]/75 to-[#C5A059]/75 max-w-[520px] relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[10px] bg-[#C5A059]/22 blur-[10px] pointer-events-none" aria-hidden />
            </div>
            <span className="hidden sm:block text-[#C5A059]/90 text-[16px] leading-none select-none scale-x-[-1]" aria-hidden>
              ❧
            </span>
          </div>
          {/* ornamento central pequeno abaixo da linha */}
          <div className="mt-1.5 flex justify-center">
            <span className="text-[#C5A059]/70 text-[10px] tracking-[0.2em]">⟡</span>
          </div>

          {/* ÍCONES — 4 colunas */}
          <div className="mt-9 sm:mt-11 lg:mt-[38px] w-full max-w-[860px] grid grid-cols-2 lg:grid-cols-4 gap-y-9 gap-x-6 sm:gap-x-8 lg:gap-x-10 items-start justify-items-center">
            {/* 100% HAND MADE — buril */}
            <div className="flex flex-col items-center text-center w-full max-w-[150px]">
              <div className="w-[96px] h-[96px] sm:w-[108px] sm:h-[108px] lg:w-[118px] lg:h-[118px] flex items-center justify-center">
                <img
                  src="/PUBLIC/why-100-handmade.png"
                  alt="100% Hand Made — buril"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
              <span className="mt-2 font-sans-luxury font-semibold text-[#C2A86A] uppercase tracking-[0.14em] text-[8.5px] sm:text-[9px] leading-[1.35]">
                100% HAND MADE
              </span>
            </div>

            {/* BEST GOLD QUALITY — 18K Au */}
            <div className="flex flex-col items-center text-center w-full max-w-[150px]">
              <div className="w-[96px] h-[96px] sm:w-[108px] sm:h-[108px] lg:w-[118px] lg:h-[118px] flex items-center justify-center">
                <img
                  src="/PUBLIC/why-best-gold.png"
                  alt="Best Gold Quality — 18K Au"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
              <span className="mt-2 font-sans-luxury font-semibold text-[#C2A86A] uppercase tracking-[0.14em] text-[8.5px] sm:text-[9px] leading-[1.35]">
                BEST GOLD QUALITY
              </span>
            </div>

            {/* LIFETIME WARRANTY — QUALITY IS EVERYTHING */}
            <div className="flex flex-col items-center text-center w-full max-w-[150px]">
              <div className="w-[96px] h-[96px] sm:w-[108px] sm:h-[108px] lg:w-[118px] lg:h-[118px] flex items-center justify-center">
                <img
                  src="/PUBLIC/why-lifetime.png"
                  alt="Lifetime Warranty — Quality is Everything"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
              <span className="mt-2 font-sans-luxury font-semibold text-[#C2A86A] uppercase tracking-[0.12em] text-[8.5px] sm:text-[9px] leading-[1.35]">
                QUALITY
                <br />
                TS EVERTHING
              </span>
              {/* observa-se no print “QUALITY IS EVERTHING” com quebra — mantido fiel, mas corrigido visualmente */}
              <span className="sr-only">Lifetime Warranty — Quality is Everything</span>
            </div>

            {/* WORLD WIDE SATISFIED CUSTOMERS */}
            <div className="flex flex-col items-center text-center w-full max-w-[150px]">
              <div className="w-[96px] h-[96px] sm:w-[108px] sm:h-[108px] lg:w-[118px] lg:h-[118px] flex items-center justify-center">
                <img
                  src="/PUBLIC/why-satisfied.png"
                  alt="World Wide Satisfied Customers"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
              <span className="mt-2 font-sans-luxury font-semibold text-[#C2A86A] uppercase tracking-[0.12em] text-[8.5px] sm:text-[9px] leading-[1.35]">
                WORLD WIDE
                <br />
                SATISFIED COSTUMERS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BORDA INFERIOR DOURADA com pico central — como no print */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#C5A059]/70" aria-hidden />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[22px] h-[6px] bg-[#C5A059] pointer-events-none"
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', transform: 'translateX(-50%) translateY(1px)' }}
        aria-hidden
      />
    </section>
  );
}

export default WhyChoose;
