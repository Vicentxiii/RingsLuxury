/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Domínio do site, ex.: https://seudominio.com. Vazio = não publicar canonical/sitemap. */
  readonly VITE_SITE_URL?: string;
  /** ID opcional do GA4 (G-XXXXXXXXXX). Vazio = não carregar Google Analytics. */
  readonly VITE_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
