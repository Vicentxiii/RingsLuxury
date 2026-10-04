import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations, type Dictionary, type Lang } from './translations';

export type { Lang };

interface LanguageValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageValue | undefined>(undefined);

const STORAGE_KEY = 'rl-lang-v2';

function isLang(v: unknown): v is Lang {
  return v === 'en' || v === 'es' || v === 'pt';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) return stored;
    } catch {
      /* ignore */
    }
    return 'en';
  });

  const setLang = (l: Lang) => {
    if (!isLang(l)) return;
    setLangState(l);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
