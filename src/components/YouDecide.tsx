import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface GalleryItem {
  src: string;
  webp: string;
  alt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-6-2.jpg',
    webp: '/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-6-2-749.webp',
    alt: 'Sketch anel caveira feito à mão por Jorge Uquillas',
  },
  {
    src: '/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-5-2.jpg',
    webp: '/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-5-2-749.webp',
    alt: 'Processo de mock sketch e gravação manual em ouro 18k',
  },
  {
    src: '/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-4-2.jpg',
    webp: '/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-4-2-749.webp',
    alt: 'Desenho artístico exclusivo para joia sob medida por Jorge Uquillas',
  },
];

export function YouDecide() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Qual imagem do trio está expandida em formato quadrado normal (0, 1 ou 2)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Controle de Swipe no Mobile / Touch
  const touchStartX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe para a esquerda -> próximo
        setActiveIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
      } else {
        // swipe para a direita -> anterior
        setActiveIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      }
    }
  };

  // Efeito da assinatura: cresce lentamente conforme passamos o Scroll
  const [sigScale, setSigScale] = useState<number>(0.9);
  const [sigOpacity, setSigOpacity] = useState<number>(0.35);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progresso de 0 quando a seção entra na tela até 1 quando passa do centro
      const totalDist = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));

      // Cresce lentamente de 0.88 até 1.45 conforme o scroll avança
      const scale = 0.88 + progress * 0.55;
      // Opacidade fica mais visível e elegante conforme a seção ganha foco
      const opacity = Math.min(0.85, 0.25 + progress * 0.6);

      setSigScale(scale);
      setSigOpacity(opacity);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="you-decide"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#020202] py-24 sm:py-32 lg:py-40 text-[#EAE6DF] isolate"
      aria-label="You Decide Every Stone Every Detail"
    >
      {/* ── CONTEÚDO PRINCIPAL (2 COLUNAS) ── */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">

          {/* ── COLUNA DA ESQUERDA: TÍTULO E TEXTO ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left relative z-10">

            {/* TÍTULO */}
            <h2
              className="font-cormorant font-normal uppercase text-[#E8C278] leading-[1.08] tracking-[0.05em]"
              style={{
                fontSize: 'clamp(32px, 3.8vw, 54px)',
                textShadow: '0 2px 20px rgba(197,160,89,0.3)',
              }}
            >
              {t.home.ydTitleA} {t.home.ydTitleStone}
              <br />
              {t.home.ydTitleDetail}
            </h2>

            {/* PARÁGRAFOS DESCRITIVOS FIÉIS À REFERÊNCIA */}
            <div className="mt-8 space-y-4 font-sans-luxury text-[#E5DFD3]/90 text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-[1.78] max-w-[530px]">
              <p>
                {t.home.ydText1}
              </p>
              <p>
                {t.home.ydText2}
              </p>
            </div>

          </div>

          {/* ── COLUNA DA DIREITA: MOLDURA DOURADA DUPLA COM CARROSSEL DE 3 IMAGENS ESPREMIDAS ── */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative z-10">
            <div className="relative w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[590px]">

              {/* MOLDURA GEOMÉTRICA EXTERNA (Dourada com cantos arredondados, conforme a referência) */}
              <div
                className="absolute -top-6 -bottom-6 -left-4 -right-4 sm:-top-8 sm:-bottom-8 sm:-left-6 sm:-right-6 rounded-[28px] sm:rounded-[36px] border border-[#C5A059]/40 pointer-events-none"
                aria-hidden
              />

              {/* MOLDURA GEOMÉTRICA FRONTAL COM OS INDICADORES LATERAIS */}
              <div
                className="relative rounded-[22px] sm:rounded-[28px] border border-[#C5A059]/75 bg-[#050505]/90 p-2 sm:p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-sm"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Puxadores / indicadores nas bordas laterais conforme o print */}
                <div
                  aria-hidden
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-5 rounded-sm border border-[#C5A059]/70 bg-[#050505]"
                />
                <div
                  aria-hidden
                  className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-5 rounded-sm border border-[#C5A059]/70 bg-[#050505]"
                />

                {/* ── CONTAINER FLEX DO ACORDEÃO (3 IMAGENS ESPREMIDAS QUE FICAM QUADRADAS AO CLICAR/PASSAR O DEDO) ── */}
                <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex gap-2 sm:gap-2.5 overflow-hidden rounded-[16px] sm:rounded-[20px] bg-black">
                  {GALLERY_ITEMS.map((item, index) => {
                    const isExpanded = activeIndex === index;

                    return (
                      <div
                        key={item.src}
                        onClick={() => setActiveIndex(index)}
                        className={`relative h-full overflow-hidden rounded-[12px] sm:rounded-[14px] cursor-pointer transition-all duration-700 ease-out select-none ${
                          isExpanded
                            ? 'flex-[3.2] sm:flex-[3.6] shadow-[0_0_25px_rgba(197,160,89,0.25)]'
                            : 'flex-[0.8] sm:flex-[0.9] opacity-70 hover:opacity-95'
                        }`}
                        title={isExpanded ? 'Visualizando sketch' : 'Clique para expandir'}
                      >
                        <picture className="w-full h-full">
                          <source srcSet={item.webp} type="image/webp" />
                          <img
                            src={item.src}
                            alt={item.alt}
                            draggable={false}
                            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                              isExpanded ? 'scale-100 object-center' : 'scale-110 object-center filter brightness-90'
                            }`}
                          />
                        </picture>

                        {/* Véu sutil nas imagens não expandidas para evidenciar a fatia */}
                        {!isExpanded && (
                          <div className="absolute inset-0 bg-black/35 hover:bg-transparent transition-colors duration-300 flex items-center justify-center">
                            <span className="text-[10px] tracking-widest text-[#E6CA85] uppercase -rotate-90 whitespace-nowrap opacity-75">
                              Sketch 0{index + 1}
                            </span>
                          </div>
                        )}

                        {/* Moldura de foco na imagem expandida */}
                        {isExpanded && (
                          <div className="absolute inset-0 border border-[#C5A059]/40 rounded-[12px] sm:rounded-[14px] pointer-events-none" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Navegadores / Indicadores abaixo das imagens */}
                <div className="mt-3 flex items-center justify-between px-2 text-[10px] font-sans-luxury text-[#C5A059]/80">
                  <div className="flex gap-1.5 items-center">
                    {GALLERY_ITEMS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                          activeIndex === i ? 'w-6 bg-[#C5A059]' : 'w-2 bg-[#C5A059]/30 hover:bg-[#C5A059]/60'
                        }`}
                        aria-label={`Ver imagem ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
                      className="p-1 rounded-full text-[#C5A059] hover:bg-[#C5A059]/15 transition-colors cursor-pointer"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="tracking-[0.2em] font-cinzel text-[10px]">
                      0{activeIndex + 1} / 0{GALLERY_ITEMS.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveIndex((prev) => (prev + 1) % GALLERY_ITEMS.length)}
                      className="p-1 rounded-full text-[#C5A059] hover:bg-[#C5A059]/15 transition-colors cursor-pointer"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* ── ASSINATURA DE JORGE UQUILLAS QUE CRESCE LENTAMENTE COM O SCROLL ── */}
        <div className="relative mt-8 sm:mt-12 flex justify-center items-center text-center pointer-events-none select-none w-full">
          <div
            className="flex justify-center items-center transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `scale(${sigScale})`,
              opacity: sigOpacity,
            }}
          >
            <img
              src="/PUBLIC/assinatura-jorge-uquillas-rings-luxury.webp"
              alt="Assinatura Jorge Uquillas"
              className="w-[180px] sm:w-[220px] lg:w-[260px] h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(197,160,89,0.35)] mx-auto"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default YouDecide;
