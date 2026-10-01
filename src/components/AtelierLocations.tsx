import { ExternalLink, MapPin } from 'lucide-react';
import locationsData from '../data/locations.json';
import { useLanguage } from '../i18n/LanguageContext';

type Location = (typeof locationsData.locations)[number];

/**
 * Endereco legivel para o Google Maps.
 *
 * `embedUrl` tem precedencia: e o iframe oficial gerado por
 * Maps > Compartilhar > Incorporar um mapa (formato pb=, sem chave de API).
 * Sem ele, cai no embed sem chave montado a partir da consulta, que tambem
 * funciona. Em ambos os casos nao e necessario criar conta no Google Cloud.
 */
const embedSrc = (loc: Location): string => {
  if (loc.embedUrl) return loc.embedUrl;
  return `https://maps.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&z=${loc.zoom}&output=embed`;
};

const mapsLink = (loc: Location): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`;

/**
 * Seção VISITS IN THE PHYSICAL WORKSHOP UNDER SCHEDULE — logo apos
 * WHAT PEOPLE SAY ABOUT RINGS LUXURY (Home.tsx I.5).
 * - Dois mapas empilhados: Miami (Brickell) e Sao Paulo
 * - Fundo: ateliê escuro desfocado, mesma linguagem das secoes vizinhas
 *
 * O iframe NAO e legivel por crawlers nem por IAs (conteudo fica em
 * google.com). Por isso os nomes das cidades sao HTML real, fora do iframe,
 * e o bloco estatico de build tambem cita os locais.
 */
const LOCATIONS = locationsData.locations;

export function AtelierLocations() {
  const { t } = useLanguage();
  return (
    <section
      id="locations"
      className="relative w-full overflow-hidden isolate bg-[#020202] text-[#EAE6DF]"
      aria-label={t.home.locAria}
    >
      {/* FUNDO — mesmo tratamento das secoes vizinhas */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src="/PUBLIC/Sessao-clientes-rings-luxury-site-2026.jpg"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.35] scale-[1.06]"
          style={{ filter: 'blur(6px)', WebkitFilter: 'blur(6px)' }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-black/55 to-[#020202]" aria-hidden />
        <div className="absolute top-0 left-0 w-full h-[110px] sm:h-[150px] bg-gradient-to-b from-[#020202] to-transparent pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 w-full h-[110px] sm:h-[150px] bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" aria-hidden />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
        {/* TÍTULO */}
        <h2
          className="text-center font-cinzel font-normal uppercase text-[#E6CA85]"
          style={{ fontSize: 'clamp(16px, 2.1vw, 27px)', letterSpacing: '0.12em' }}
        >
          {t.home.locTitle}
        </h2>

        {/* SUBTÍTULO */}
        <p className="mt-3 text-center font-sans-luxury text-[12px] sm:text-[13px] tracking-wide text-[#F1ECE2]/85">
          {t.home.locSubtitle}
        </p>

        {/* ornamento dourado minimalista */}
        <div className="mt-5 flex items-center justify-center gap-3" aria-hidden>
          <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#C5A059]/80" />
          <span className="text-[#C5A059] text-[11px] leading-none">⟡</span>
          <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#C5A059]/80" />
        </div>

        {/* MAPAS — lado a lado no desktop, empilhados no mobile.
            Proporção contida de propósito: a versão anterior (16/10 empilhado)
            ocupava ~1540px de altura e empurrava a página inteira. Assim os dois
            cabem numa faixa só e a seção não domina a experiência. */}
        <div className="mt-9 sm:mt-11 grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 lg:gap-10">
          {LOCATIONS.map((loc) => (
            <figure key={loc.id} className="group relative min-w-0">
              {/* rótulo + saída, na mesma linha */}
              <figcaption className="flex items-center justify-between gap-3 mb-2.5">
                <span className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" aria-hidden />
                  <span className="min-w-0">
                    <span className="block font-cinzel text-[12px] sm:text-[13px] uppercase tracking-[0.18em] text-[#E6CA85] truncate">
                      {[loc.label, loc.district].filter(Boolean).join(' — ')}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#9A7B38] truncate">
                      {[loc.city, loc.region, loc.country].filter(Boolean).join(', ')}
                    </span>
                  </span>
                </span>

                {/* link de saída — o iframe prende o usuário; isto dá a saída
                    e funciona mesmo sem JavaScript */}
                <a
                  href={mapsLink(loc)}
                  target="_blank"
                  rel="noopener nofollow"
                  aria-label={`${t.home.locOpenPrefix}${loc.label}${t.home.locOpenSuffix}`}
                  className="shrink-0 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-[#9A7B38] hover:text-[#C5A059] transition-colors"
                >
                  {t.home.locMapsLink}
                  <ExternalLink className="w-3 h-3" aria-hidden />
                </a>
              </figcaption>

              {/* iframe + moldura dourada */}
              <div
                className="relative w-full overflow-hidden rounded-lg border border-[#C5A059]/40 bg-[#050505] shadow-[0_0_30px_rgba(197,160,89,0.10)] transition-all duration-500 group-hover:border-[#C5A059]/70 group-hover:shadow-[0_0_45px_rgba(197,160,89,0.20)] aspect-[16/10]"
              >
                <iframe
                  title={`${t.home.locMapPrefix}${loc.label}, ${loc.city}`}
                  src={embedSrc(loc)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  style={{ filter: 'grayscale(0.25) contrast(1.06)' }}
                  allowFullScreen
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AtelierLocations;
