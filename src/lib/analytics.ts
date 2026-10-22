import { track as vercelTrack } from '@vercel/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

/**
 * Eventos de conversão.
 *
 * Vercel Analytics já registra page views e Core Web Vitals sem cookie de
 * terceiro. Aqui só enviamos os eventos de negócio (view_item, add_to_cart,
 * begin_checkout, generate_lead) para o painel da Vercel e, se
 * VITE_GA4_ID estiver definido, também para o GA4.
 */
export function track(event: string, props?: AnalyticsProps): void {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics nunca deve quebrar a navegação.
  }

  try {
    window.gtag?.('event', event, props);
  } catch {
    // idem
  }
}
