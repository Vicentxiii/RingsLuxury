import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// O build pré-renderiza title/canonical/OG/hreflang em cada página. Antes de
// montar o React, removemos essas tags marcadas para o Helmet recriar as da
// rota atual sem duplicatas (canonical da home + canonical do produto, etc.).
document.querySelectorAll('[data-prerender]').forEach((tag) => tag.remove());

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

/*
  Hidratação depois do primeiro paint.

  O HTML do build já contém a página inteira e não usa mais <Suspense> (as
  rotas são estáticas). Por isso o React consegue hidratar o HTML existente em
  vez de descartá-lo e repintar o hero. O rAF + setTimeout deixa o navegador
  pintar o HTML estático antes de executar a hidratação.

  No build de pré-renderização o #root chega vazio: aí é createRoot, e o
  prerender salva o resultado.
*/
if (container.firstElementChild) {
  const hydrate = () => hydrateRoot(container, app);
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => window.setTimeout(hydrate, 0));
  } else {
    window.setTimeout(hydrate, 32);
  }
} else {
  createRoot(container).render(app);
}
