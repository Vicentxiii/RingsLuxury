import React from 'react';
import { useLanguage, type Lang } from '../i18n/LanguageContext';

function USFlag() {
  return (
    <svg viewBox="0 0 22 22" className="w-full h-full" aria-hidden="true">
      <defs>
        <clipPath id="rl-flag-us">
          <circle cx="11" cy="11" r="11" />
        </clipPath>
      </defs>
      <g clipPath="url(#rl-flag-us)">
        <rect x="0" y="0" width="22" height="22" fill="#FFFFFF" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} x="0" y={(i * 22) / 13} width="22" height={22 / 13} fill="#B22234" />
        ))}
        <rect x="0" y="0" width="10" height="11" fill="#3C3B6E" />
        {[1, 2, 3, 4].map((row) =>
          [1, 2, 3, 4, 5].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 1.7}
              cy={row * 2.2}
              r="0.55"
              fill="#FFFFFF"
            />
          )),
        )}
      </g>
    </svg>
  );
}

function ESFlag() {
  return (
    <svg viewBox="0 0 22 22" className="w-full h-full" aria-hidden="true">
      <defs>
        <clipPath id="rl-flag-es">
          <circle cx="11" cy="11" r="11" />
        </clipPath>
      </defs>
      <g clipPath="url(#rl-flag-es)">
        <rect x="0" y="0" width="22" height="22" fill="#F1BF00" />
        <rect x="0" y="0" width="22" height="5.5" fill="#AA151B" />
        <rect x="0" y="16.5" width="22" height="5.5" fill="#AA151B" />
      </g>
    </svg>
  );
}

function BRFlag() {
  return (
    <svg viewBox="0 0 22 22" className="w-full h-full" aria-hidden="true">
      <defs>
        <clipPath id="rl-flag-br">
          <circle cx="11" cy="11" r="11" />
        </clipPath>
      </defs>
      <g clipPath="url(#rl-flag-br)">
        <rect x="0" y="0" width="22" height="22" fill="#009739" />
        <polygon points="11,3.5 18.5,11 11,18.5 3.5,11" fill="#FEDF00" />
        <circle cx="11" cy="11" r="3.6" fill="#002776" />
      </g>
    </svg>
  );
}

export function LanguageFlags() {
  const { lang, setLang, t } = useLanguage();

  const flags: { code: Lang; label: string; title: string; Flag: () => React.JSX.Element }[] = [
    { code: 'en', label: t.nav.flagUS, title: t.nav.flagUS, Flag: USFlag },
    { code: 'es', label: t.nav.flagES, title: t.nav.flagES, Flag: ESFlag },
    { code: 'pt', label: t.nav.flagBR, title: t.nav.flagBR, Flag: BRFlag },
  ];

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Language">
      {flags.map(({ code, label, title, Flag }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-label={label}
            title={title}
            aria-pressed={active}
            className={`w-[22px] h-[22px] rounded-full overflow-hidden border transition-all duration-300 ${
              active
                ? 'border-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.8)] opacity-100'
                : 'border-white/20 hover:border-white/50 opacity-70 hover:opacity-100'
            }`}
          >
            <Flag />
          </button>
        );
      })}
    </div>
  );
}

export default LanguageFlags;
