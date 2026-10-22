import { useLanguage } from '../i18n/LanguageContext';
import { ResponsiveImg } from './ResponsiveImg';

interface HeroProps {
  onEnterAtelier: () => void;
}

// Imagem composta da HERO (Odin esquerda + Medusa direita), 1600x844.
const HERO_IMAGE = encodeURI(
  '/PUBLIC/medusa-e-odim-capa-do-site-rings-luxury-by-jorge-uquillas.webp'
);

export function Hero({ onEnterAtelier: _onEnterAtelier }: HeroProps) {
  const { t } = useLanguage();
  return (
    <section
      id="hero"
      className="relative w-full bg-[#020202] overflow-hidden flex items-center justify-center isolate"
      style={{ height: '92vh', minHeight: '560px', maxHeight: '900px' }}
      aria-label={t.home.heroSectionAria}
    >
      {/* 1. DARKEN OVERLAYS, AINDA MAIS CLARO */}
      <div className="absolute inset-0 z-10 bg-[#020202]/07" aria-hidden />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 74% at 50% 52%, transparent 58%, rgba(2,2,2,0.05) 72%, rgba(2,2,2,0.16) 94%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-[6%] z-10 bg-gradient-to-b from-[#020202]/28 via-[#020202]/04 to-transparent pointer-events-none" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-[8%] z-10 bg-gradient-to-t from-[#020202]/20 via-[#020202]/03 to-transparent pointer-events-none" aria-hidden />
      <div className="absolute inset-y-0 left-0 w-[10%] z-10 bg-gradient-to-r from-[#020202]/14 via-[#020202]/03 to-transparent pointer-events-none hidden sm:block" aria-hidden />
      <div className="absolute inset-y-0 right-0 w-[10%] z-10 bg-gradient-to-l from-[#020202]/14 via-[#020202]/03 to-transparent pointer-events-none hidden sm:block" aria-hidden />

      {/* 2. COMPOSITE ODIN + MEDUSA, liso sem textura */}
      <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-hidden" aria-hidden>
        <ResponsiveImg
          src={HERO_IMAGE}
          alt=""
          decorative
          width={1600}
          height={844}
          sizes="100vw"
          priority
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.12] opacity-60 sm:opacity-[0.84]"
          style={{ objectPosition: 'center center' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-[#020202]/03" />
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.12)]" />
      </div>

      {/* 4. FADE PRETO NA BASE, dissolve o corte entre o hero e a próxima seção */}
      <div
        className="absolute inset-x-0 bottom-0 h-[28%] z-[25] pointer-events-none bg-gradient-to-t from-[#020202] via-[#020202]/70 to-transparent"
        aria-hidden
      />

      {/* 5. TEXTO CENTRAL, WELCOME TO RINGS LUXURY / MASTER PIECES */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="flex flex-col items-center gap-3 sm:gap-4">
          <span
            className="font-cormorant font-light text-[#E9E2D6]/95 leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(11px, 1.9vw, 22px)',
              letterSpacing: '0.62em',
              textShadow: '0 2px 18px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.55)',
              fontWeight: 300,
            }}
          >
            {t.home.heroWelcome}
          </span>
          <span
            className="font-cormorant font-light text-[#E9E2D6]/80 leading-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(8px, 1.05vw, 11.5px)',
              letterSpacing: '0.78em',
              textShadow: '0 1px 12px rgba(0,0,0,0.9)',
              fontWeight: 300,
            }}
          >
            {t.home.heroEyebrow2}
          </span>
          {/* H1 keyword: frase visível curta com o termo que o cliente busca.
              Mantém o visual luxo e entrega relevância para Google/IAs. */}
          <span
            className="font-cormorant italic text-[#C5A059]/90 leading-snug max-w-2xl text-balance"
            style={{
              fontSize: 'clamp(11px, 1.4vw, 15px)',
              letterSpacing: '0.08em',
              textShadow: '0 1px 12px rgba(0,0,0,0.9)',
              fontWeight: 400,
            }}
          >
            {t.home.heroH1Keyword}
          </span>
        </h1>

        {/*
            Resumo de abertura da Home, logo abaixo do H1.

            O H1 e uma frase poetica, curta e sem numero: boa para marca, ruim
            para quem pergunta. Este paragrafo e o trecho que o Google extrai e que
            a IA cita, entao ele abre com a resposta direta e carrega numeros
            verificaveis (preco, prazo, horas de gravacao, paises).
            A classe `seo-summary` e o alvo do speakable no JSON-LD: e este
            paragrafo que o assistente deve ler em voz alta.
          */}
        <p className="seo-summary mt-6 max-w-3xl px-2 font-cormorant text-[#D8D2C4]/95 leading-relaxed text-center text-pretty">
          RINGS LUXURY is the atelier of Jorge Uquillas, master goldsmith and hand engraver, with
          private ateliers in São Paulo (Avenida Paulista, Brazil) and Miami (Brickell, Florida,
          USA). He makes 1/1 handmade 18k gold rings, cast solid and engraved by hand for 90 to
          140 hours, with hand-selected natural diamonds set one by one under the microscope. A
          handcrafted 18k gold diamond ring starts at US$ 4,800, takes 60 days from the first
          50% payment, and reaches clients in over 50 countries under full door-to-door insurance.
        </p>
      </div>

      {/* 6. LINHA INFERIOR CURVA */}
      <div className="absolute bottom-0 left-0 w-full h-[38px] z-20 pointer-events-none overflow-hidden" aria-hidden>
        <svg
          viewBox="0 0 1440 38"
          preserveAspectRatio="none"
          className="w-full h-full block text-[#020202]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 28 C 260 38, 420 2, 720 14 C 1020 26, 1180 36, 1440 12 L 1440 38 L 0 38 Z" opacity="0.98" />
        </svg>
      </div>

      <a
        href="#masterpiece"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 focus:opacity-100 focus:pointer-events-auto pointer-events-none text-[10px] tracking-[0.3em] text-[#C5A059] border border-[#C5A059]/40 px-4 py-2 rounded-full bg-black/60 backdrop-blur"
      >
        {t.home.heroViewCollection}
      </a>
    </section>
  );
}
