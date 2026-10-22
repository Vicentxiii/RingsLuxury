import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const YOUTUBE_ID = 'ieNPhZ4Vdss';
const POSTER = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const POSTER_FALLBACK = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
const EMBED = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`;

/**
 * Filme da Home, logo abaixo da primeira seção.
 *
 * O vídeo NÃO é mais fundo da hero: ali ele ficava atrás da imagem composta,
 * sem play confiável e sem controls. Aqui o visitante vê um poster leve e só
 * carrega o iframe do YouTube quando clica — zero bytes do player no primeiro
 * carregamento, e o vídeo abre em 16:9 com controles.
 */
export function HomeFilm() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="film"
      aria-label={t.home.filmAria}
      className="relative overflow-hidden border-t border-[#C5A059]/10 bg-[#020202] py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 78% 50%, rgba(197,160,89,0.08), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="font-sans-luxury text-[10px] font-medium uppercase tracking-[0.42em] text-[#C5A059]">
              {t.home.filmEyebrow}
            </p>
            <h2 className="mt-4 font-cormorant text-3xl font-light leading-tight text-[#EAE6DF] sm:text-4xl lg:text-[2.75rem]">
              {t.home.filmTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-md font-cormorant text-base leading-relaxed text-[#CFC8B9]/85 sm:text-lg lg:mx-0">
              {t.home.filmDescription}
            </p>
            <div className="mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-[#C5A059]/70 to-transparent lg:mx-0 lg:bg-gradient-to-r lg:from-[#C5A059]/70 lg:to-transparent" aria-hidden />
          </div>

          <div className="relative mx-auto w-full max-w-3xl overflow-hidden border border-[#C5A059]/25 bg-[#050505] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
            <div className="relative aspect-video w-full">
              {playing ? (
                <iframe
                  title={t.home.filmTitle}
                  src={EMBED}
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={t.home.filmPlay}
                  className="not-rounded group absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left"
                >
                  <img
                    src={POSTER}
                    alt=""
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    onError={(event) => {
                      if (event.currentTarget.src !== POSTER_FALLBACK) {
                        event.currentTarget.src = POSTER_FALLBACK;
                      }
                    }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" aria-hidden />
                  <span className="absolute inset-0 bg-[#020202]/10 transition-colors duration-500 group-hover:bg-[#020202]/0" aria-hidden />
                  <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6CA85]/70 bg-black/45 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <span className="ml-1 block h-0 w-0 border-y-[10px] border-y-transparent border-l-[15px] border-l-[#E6CA85]" aria-hidden />
                  </span>
                  <span className="absolute bottom-5 left-5 font-sans-luxury text-[10px] font-medium uppercase tracking-[0.32em] text-[#E9E2D6] sm:bottom-6 sm:left-7">
                    {t.home.filmPlay}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
