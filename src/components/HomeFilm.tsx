import { useLanguage } from '../i18n/LanguageContext';
import { LaurelWreath, GreekMeanderDivider } from './OrnamentIcons';

/**
 * HomeFilm — Editorial section below the Hero.
 * The video was moved to the Hero background.
 * This section keeps the title, description and section identity.
 */
export function HomeFilm() {
  const { t } = useLanguage();

  return (
    <section
      id="film"
      aria-label={t.home.filmAria}
      className="relative overflow-hidden bg-[#020202] py-20 sm:py-32"
    >
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 100%, rgba(197,160,89,0.07) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">

        {/* ── Section header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <LaurelWreath className="w-4 h-4 text-[#C5A059]" />
            <span className="font-cinzel text-[10px] sm:text-[11px] uppercase tracking-[0.46em] text-[#C5A059] font-medium">
              {t.home.filmEyebrow}
            </span>
            <LaurelWreath className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2
            className="font-cinzel font-light text-[#FBF9F5] uppercase tracking-[0.14em] leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
          >
            {t.home.filmTitle}
          </h2>

          <GreekMeanderDivider className="mx-auto mb-7 opacity-70 w-40" />

          <p
            className="font-cormorant italic text-[#F0EBE0] leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(16px, 1.5vw, 21px)' }}
          >
            {t.home.filmDescription}
          </p>
        </div>

        {/* ── Foot note ── */}
        <div className="mt-8 text-center">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.32em] text-[#9A7B38]/70">
            Hand Engraving • Master Goldsmith • Jorge Uquillas • São Paulo, Brazil
          </p>
        </div>

      </div>
    </section>
  );
}
