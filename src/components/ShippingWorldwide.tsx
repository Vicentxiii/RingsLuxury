import { useLanguage } from '../i18n/LanguageContext';

/**
 * Seção SHIPPING WORLDWIDE — logo após YOU DECIDE EVERY STONE EVERY DETAIL
 * - Fundo: fundo-shipping-worldwide.jpg (mármore preto com veios dourados)
 * - Mini-carrossel horizontal minimalista com as bandeirinhas dos países
 */
const FLAG_SRCS: string[] = [
  '/PUBLIC/usa.png',
  '/PUBLIC/portugal.png',
  '/PUBLIC/spain.png',
  '/PUBLIC/france.png',
  '/PUBLIC/german.png',
  '/PUBLIC/mexico.png',
  '/PUBLIC/colombia.png',
  '/PUBLIC/guiana.png',
  '/PUBLIC/qatar.png',
  '/PUBLIC/israel.png',
  '/PUBLIC/russia.png',
  '/PUBLIC/china.png',
];

const FLAG_ALT_KEYS = [
  'shCountry1',
  'shCountry2',
  'shCountry3',
  'shCountry4',
  'shCountry5',
  'shCountry6',
  'shCountry7',
  'shCountry8',
  'shCountry9',
  'shCountry10',
  'shCountry11',
  'shCountry12',
] as const;

export function ShippingWorldwide() {
  const { t } = useLanguage();
  return (
    <section
      id="shipping"
      className="relative w-full overflow-hidden isolate bg-[#020202] text-[#EAE6DF]"
      aria-label={t.home.shAria}
    >
      {/* FUNDO — mármore preto com veios dourados */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src="/PUBLIC/fundo-shipping-worldwide.jpg"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.8] scale-[1.06]"
          style={{ filter: 'blur(5px)', WebkitFilter: 'blur(5px)' }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        {/* véu preto para predominância da cor preta */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-black/35 to-[#020202]" aria-hidden />
        {/* fades topo/base para esconder o corte com as seções vizinhas */}
        <div className="absolute top-0 left-0 w-full h-[110px] sm:h-[150px] bg-gradient-to-b from-[#020202] to-transparent pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 w-full h-[110px] sm:h-[150px] bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" aria-hidden />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-28 sm:py-36 lg:py-44 text-center">
        {/* TÍTULO */}
        <h2
          className="font-cinzel font-normal uppercase text-[#E6CA85]"
          style={{ fontSize: 'clamp(19px, 2.2vw, 27px)', letterSpacing: '0.32em' }}
        >
          {t.home.shTitle}
        </h2>

        {/* SUBTÍTULO */}
        <p className="mt-4 font-sans-luxury text-[12px] sm:text-[13px] tracking-wide text-[#F1ECE2]/95">
          {t.home.shSubtitle}
        </p>

        {/* ornamento dourado minimalista */}
        <div className="mt-6 flex items-center justify-center gap-3" aria-hidden>
          <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#C5A059]/80" />
          <span className="text-[#C5A059] text-[11px] leading-none">⟡</span>
          <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#C5A059]/80" />
        </div>

        {/* MINI-CARROSSEL DE BANDEIRAS — só as bandeirinhas, horizontal, minimalista */}
        <div
          className="shipping-marquee relative mt-8 sm:mt-10 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div className="shipping-marquee-track flex w-max items-center">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center" aria-hidden={half === 1}>
                {FLAG_SRCS.map((src, i) => (
                  <img
                    key={`${half}-${src}`}
                    src={src}
                    alt={half === 0 ? t.home[FLAG_ALT_KEYS[i]] : ''}
                    draggable={false}
                    loading="lazy"
                    className="mx-3 sm:mx-4 w-11 h-11 sm:w-[52px] sm:h-[52px] object-contain select-none"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingWorldwide;
