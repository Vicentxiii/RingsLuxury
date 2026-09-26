interface QuemSouEuProps {}

/**
 * Seção SOBRE MIM — fiel ao print enviado
 * - Fundo: /PUBLIC/fundo-quem-sou-eu.webp (preto com partículas douradas)
 * - Montagem: /PUBLIC/jorge-montagem-sobre-mim.webp (Jorge + 4 anéis + glow)
 * - Arabesco: /PUBLIC/arabesco-quem-sou-eu.webp (linha dourada com ornamento)
 * - Sem whatsapp flutuante e sem seta de topo (conforme pedido)
 */
export function QuemSouEu({}: QuemSouEuProps) {
  return (
    <section
      id="quem-sou-eu"
      className="relative w-full bg-[#020202] overflow-hidden isolate"
      aria-label="Jorge Uquillas — Master Engraver biography"
    >
      {/* FUNDO — desfocado com blur como no print, liso sem textura */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src="/PUBLIC/fundo-quem-sou-eu.webp"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.95] scale-[1.12]"
          style={{ filter: 'blur(3.5px)', WebkitFilter: 'blur(3.5px)' }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        {/* véu muito leve só para garantir contraste do texto — liso */}
        <div className="absolute inset-0 bg-[#020202]/14" aria-hidden />
        {/* vinheta suave nas bordas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 92% 75% at 50% 50%, transparent 62%, rgba(0,0,0,0.42) 92%)',
          }}
          aria-hidden
        />
        {/* FADE INFERIOR — esconde o corte entre esta seção e a próxima */}
        <div className="absolute bottom-0 left-0 w-full h-[140px] sm:h-[180px] lg:h-[220px] bg-gradient-to-b from-transparent to-[#020202] pointer-events-none" aria-hidden />
      </div>

      {/* CONTEÚDO — 2 colunas */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-[54px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* ESQUERDA — Montagem Jorge + anéis */}
          <div className="order-1 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[610px] xl:max-w-[640px]">
              <img
                src="/PUBLIC/jorge-montagem-sobre-mim.webp"
                alt="Jorge Uquillas — Master Engraver com anéis artesanais handcrafted ao redor"
                className="w-full h-auto object-contain select-none"
                draggable={false}
                style={{ filter: 'drop-shadow(0 22px 48px rgba(0,0,0,0.72))' }}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>
          </div>

          {/* DIREITA — Texto */}
          <div className="order-2 flex flex-col items-center lg:items-center text-center lg:text-center max-w-[560px] mx-auto lg:mx-0 lg:pr-2">
            {/* Título — “Who is Jorge Uquillas” levemente menor e descido para perto do arabesco */}
            <h2
              className="font-cinzel font-normal text-[#F5F0E6] leading-none tracking-[0.03em] mt-1.5"
              style={{
                fontSize: 'clamp(24px, 2.7vw, 36px)',
                letterSpacing: '0.02em',
                textShadow: '0 2px 18px rgba(0,0,0,0.75)',
              }}
            >
              Who is Jorge Uquillas
            </h2>

            {/* Arabesco dourado — maior e mais colado no título */}
            <div className="relative w-full max-w-[800px] mt-1 mb-1 flex justify-center items-center">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[36px] bg-[#C5A059]/35 blur-[14px] pointer-events-none"
                aria-hidden
              />
              <img
                src="/PUBLIC/arabesco-quem-sou-eu.webp"
                alt=""
                draggable={false}
                className="relative w-[95%] max-w-[700px] h-auto object-contain object-center select-none"
                style={{ opacity: 0.98 }}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>

            {/* Subtítulos — colados no arabesco, texto afastado abaixo */}
            <div className="flex flex-col items-center gap-0.5 -mt-1 mb-7">
              <span
                className="font-cinzel font-normal text-[#9A8B6F] uppercase tracking-[0.48em]"
                style={{ fontSize: 'clamp(9px, 0.85vw, 11px)', letterSpacing: '0.52em' }}
              >
                MASTER ENGRAVER
              </span>
              <span
                className="font-cinzel font-normal text-[#6E634D] uppercase"
                style={{ fontSize: '8.5px', letterSpacing: '0.62em' }}
              >
                BIOGRAPHY
              </span>
            </div>

            {/* Biografia — texto fiel ao print, liso sem bolinhas */}
            <div className="w-full text-left font-sans-luxury text-[#EDE8DB] leading-relaxed space-y-3.5">
              <p className="text-[11px] sm:text-[11.5px] leading-[1.72] text-[#EFE9DC]/95">
                Jorge Uquillas is a renowned Designer and Artistic Engraver of jewelry of Colombian-Ecuadorian
                origin, starting his art in a simple atelier in Bogota-Colombia, following the tradition of the
                third generation of the family, learned his first techniques of engraving with the great Master
                Ivan Uquillas (ECU-1996).
              </p>
              <p className="text-[11px] sm:text-[11.5px] leading-[1.72] text-[#EFE9DC]/95">
                Over the years, seeking to improve his artistic skills Jorge Uquillas broadened his techniques and
                knowledge of artistic engraving and designer in Europe, becoming one of the greatest exponents in
                Artistic Designer and Engraver of World Jewelry in modern times.
              </p>
              <p className="text-[11px] sm:text-[11.5px] leading-[1.72] text-[#EFE9DC]/90">
                Today based in Sao Paulo Brazil he is the only exponent of this type of work and perfection in the
                whole country and one of the only ones in the continent...
              </p>
              <p className="text-[11px] sm:text-[11.5px] leading-[1.72] text-[#EFE9DC]/95">
                With satisfied clients in more than 50 countries in the world, Rings Luxury is highly valued in the
                luxury jewelry market. <br />
                His unique and extremely detailed work has won him loyal clients who regularly order his works...
              </p>
              <p className="text-[11px] sm:text-[11.5px] leading-[1.72] text-[#EFE9DC]/85">
                Jorge Uquillas is a craftsman who has left his mark in the history of world jewelry, with a unique
                and unparalleled work that captivates lovers of art and beauty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuemSouEu;
