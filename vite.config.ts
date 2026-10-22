import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {seoInject} from './vite-plugin-seo-inject';

/**
 * O bundle do React tem ~400 KB gzip porque agora todas as rotas são estáticas
 * (necessário para hidratar sem o erro de Suspense). Se o <script type="module">
 * executa antes do primeiro paint, o navegador gasta segundos analisando o JS e
 * atrasa FCP/LCP. Este plugin troca a tag por um carregador que só baixa o app
 * depois do evento load (ou 2,5 s, o que vier primeiro). O HTML estático já
 * contém a página inteira, então o conteúdo aparece antes e a hidratação apenas
 * assume menu/carrinho depois.
 */
function deferEntryScript(): Plugin {
  return {
    name: 'defer-entry-script',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<script\b[^>]*\btype="module"[^>]*\bsrc="([^"]+)"[^>]*><\/script>/,
          (_match, src: string) => `<script>
(function () {
  var loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.type = 'module';
    s.src = ${JSON.stringify(src)};
    s.crossOrigin = 'anonymous';
    document.body.appendChild(s);
  }
  function start() {
    requestAnimationFrame(function () { setTimeout(load, 0); });
  }
  if (document.readyState === 'complete') start();
  else {
    window.addEventListener('load', start, { once: true });
    setTimeout(start, 2500);
  }
})();
</script>`,
        );
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoInject(), deferEntryScript()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    // O bundle de SSR é gerado uma vez no build. Empacotar as dependências
    // evita o problema de named exports do build CJS do react-router-dom no
    // Node e deixa o renderToString independente do formato dos pacotes.
    ssr: {
      noExternal: true as const,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
