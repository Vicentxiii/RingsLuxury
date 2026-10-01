import { navTexts, type NavDict, footerTexts, type FooterDict } from './nav';
import { homeTexts, type HomeDict } from './home';
import { collectionTexts, type CollectionDict } from './collections';
import { pageTexts, type PageDict } from './pages';

export type Lang = 'en' | 'es' | 'pt';

export interface Dictionary {
  // NavDict/FooterDict stay strict (`typeof en`) for key safety;
  // Dictionary widens to Record so es/pt (Record<Keys,string>) typecheck.
  nav: Record<keyof NavDict, string>;
  home: Record<keyof HomeDict, string>;
  collections: Record<keyof CollectionDict, string>;
  pages: Record<keyof PageDict, string>;
  footer: Record<keyof FooterDict, string>;
}

export const translations: Record<Lang, Dictionary> = {
  en: {
    nav: navTexts.en,
    home: homeTexts.en,
    collections: collectionTexts.en,
    pages: pageTexts.en,
    footer: footerTexts.en,
  },
  es: {
    nav: navTexts.es,
    home: homeTexts.es,
    collections: collectionTexts.es,
    pages: pageTexts.es,
    footer: footerTexts.es,
  },
  pt: {
    nav: navTexts.pt,
    home: homeTexts.pt,
    collections: collectionTexts.pt,
    pages: pageTexts.pt,
    footer: footerTexts.pt,
  },
};
