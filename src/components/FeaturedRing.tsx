import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export function FeaturedRing() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const BACKGROUND_WEBP = '/PUBLIC/Fundo-da-terceira-sessao.webp';
  const BACKGROUND_JPG  = '/PUBLIC/Fundo da terceira sessao.jpg';
  const RING_IMAGE       = '/PUBLIC/anel-rings-luxury-e-m-ouro-18k-by-jorge-uquillas.webp';
  const SEPARATOR_IMAGE  = '/PUBLIC/separador-1-rings-luxury-jorge-uquillas.webp';

  return (
    <section
      id="featured-ring"
      className="relative w-full overflow-hidden bg-[#020202] py-20 sm:py-28 lg:py-36 isolate"
      aria-label="Featured Ring Section"
    >
      {/* ── IMAGEM DE FUNDO DA TERCEIRA SEÇÃO (MÃOS GRAVANDO COM BURIL E FAÍSCA) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <picture className="w-full h-full">
          <source srcSet={BACKGROUND_WEBP} type="image/webp" />
          <img
            src={BACKGROUND_JPG}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center opacity-85 sm:opacity-90"
            onError={(e) => {
              // Fallback se necessário
              const target = e.currentTarget as HTMLImageElement;
              if (target.src !== BACKGROUND_JPG) {
                target.src = BACKGROUND_JPG;
              }
            }}
          />
        </picture>

        {/* Fades suaves no topo e na base para integrar suavemente com a seção anterior e posterior */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />

        {/* Película sutil para garantir legibilidade dos textos e destaque das cores douradas */}
        <div className="absolute inset-0 bg-[#020202]/25" />
      </div>

      {/* ── CONTEÚDO PRINCIPAL (LAYOUT EM 2 COLUNAS: TEXTO À ESQUERDA E ANEL À DIREITA) ── */}
      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">

          {/* COLUNA ESQUERDA: TÍTULO, SEPARADOR, DESCRIÇÃO E BOTÕES */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* TÍTULO: RINGS LUXURY (Itálico dourado imponente) */}
            <h2
              className="font-cormorant italic font-normal text-[#E8C278] leading-none tracking-[0.06em] text-center lg:text-left"
              style={{
                fontSize: 'clamp(36px, 4.4vw, 64px)',
                textShadow: '0 2px 24px rgba(197,160,89,0.38), 0 0 45px rgba(197,160,89,0.2)',
              }}
            >
              RINGS LUXURY
            </h2>

            {/* SEPARADOR DOURADO COM ARABESCOS E PONTO DE LUZ */}
            <div className="w-full max-w-[340px] sm:max-w-[420px] my-3.5 sm:my-4 select-none pointer-events-none mx-auto lg:mx-0">
              <img
                src={SEPARATOR_IMAGE}
                alt=""
                aria-hidden
                className="w-full h-auto object-contain block mx-auto lg:mx-0"
              />
            </div>

            {/* TEXTO DESCRITIVO DE PODER E AMBIÇÃO */}
            <p
              className="font-sans-luxury text-[#E5DFD3]/90 text-[13.5px] sm:text-[15px] lg:text-[16px] leading-[1.78] max-w-[530px] my-2 text-center lg:text-left mx-auto lg:mx-0"
              style={{
                textShadow: '0 2px 14px rgba(0,0,0,0.95)',
              }}
            >
              {t.home.featSubtext ||
                'It represents power, dominance, authority, and ambition. This ring is considered to be a certain type representing power; powerful kings wore Lord rings on their ring finger!'}
            </p>

            {/* BOTÕES DE AÇÃO: I'D LIKE SEE MORE PIECES & I'D LIKE A PIECE FOR ME */}
            <div className="mt-7 sm:mt-8 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4.5 w-full">
              
              {/* Botão 1: I'd like see more pieces */}
              <button
                type="button"
                onClick={() => navigate('/luxury-rings')}
                className="group relative inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border border-white/20 bg-black/45 backdrop-blur-md text-[#EAE6DF] hover:border-[#C5A059]/80 hover:text-[#E6CA85] transition-all duration-300 font-sans-luxury text-[11px] sm:text-[12px] tracking-[0.14em] cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.7)]"
              >
                <span>{t.home.featBtnMore || "I'd like see more pieces"}</span>
              </button>

              {/* Botão 2: I'd like a piece for me */}
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="group relative inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border border-[#C5A059]/65 bg-[#C5A059]/[0.08] text-[#E6CA85] hover:border-[#C5A059] hover:bg-[#C5A059]/20 hover:text-[#FFF5DC] transition-all duration-300 font-sans-luxury text-[11px] sm:text-[12px] tracking-[0.14em] cursor-pointer shadow-[0_4px_22px_rgba(197,160,89,0.18)]"
              >
                <span>{t.home.featBtnMine || "I'd like a piece for me"}</span>
              </button>

            </div>

          </div>

          {/* COLUNA DIREITA: IMAGEM DO ANEL MONUMENTAL EM OURO 18K */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end items-center relative">
            <div className="relative w-full max-w-[460px] sm:max-w-[530px] lg:max-w-[590px] xl:max-w-[640px]">
              {/* Glow sutil por trás do anel */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#C5A059]/12 blur-[65px] rounded-full pointer-events-none"
                aria-hidden
              />

              <img
                src={RING_IMAGE}
                alt="Anel Rings Luxury em Ouro 18k por Jorge Uquillas"
                className="w-full h-auto object-contain select-none block drop-shadow-[0_24px_50px_rgba(0,0,0,0.92)] transition-transform duration-700 ease-out hover:scale-[1.025]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturedRing;
