import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const GA4_ID = (import.meta.env.VITE_GA4_ID ?? '').trim();

/**
 * Analytics carregado depois do conteúdo.
 *
 * - Vercel Analytics: page views, referrers e conversões sem cookie.
 * - Vercel Speed Insights: Core Web Vitals reais (LCP/INP/CLS).
 * - GA4 é opcional: só entra se VITE_GA4_ID estiver definido no ambiente;
 *   sem ID, zero requisições ao Google.
 *
 * O script do GA4 é criado no cliente e com `send_page_view: false`; o
 * page_view é disparado no efeito de rota abaixo, para não contar duas vezes
 * a mesma navegação.
 */
export function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!GA4_ID || typeof document === 'undefined') return;
    if (document.getElementById('ga4-script')) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { send_page_view: false });

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!GA4_ID) return;
    const pagePath = `${pathname}${search}`;
    window.gtag?.('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
