import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import App from './App';

/**
 * Renderização de verdade no servidor (Node), usada só no build.
 *
 * O HTML anterior era gerado pelo Chrome com createRoot. Ele parecia pronto,
 * mas não tinha os separadores de texto do React (`<!-- -->`) nem os marcadores
 * de Suspense; ao hidratar, o React comparava "By Jorge Uquillas" com os nós
 * "By" + " " + "Jorge Uquillas" e descartava a árvore. renderToString produz o
 * HTML no formato que hydrateRoot espera.
 */
export function render(url: string) {
  const html = renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );

  // O React 19 eleva <title>, <meta> e <link> para o começo da string, antes
  // do primeiro <div> do App. O prerender move esse bloco para o <head>.
  const bodyStart = html.indexOf('<div');
  if (bodyStart <= 0) return { html, head: '' };

  return {
    head: html.slice(0, bodyStart),
    html: html.slice(bodyStart),
  };
}
