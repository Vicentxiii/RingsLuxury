/**
 * Verificacao de layout da pagina /jorge-uquillas em um viewport arbitrario.
 *
 * Sobe o Chrome headless com CDP, abre a pagina e mede os elementos no DOM de
 * verdade. Sem isso a correcao de CSS fica so no achismo: a versao anterior
 * tinha foto, leao e texto disputando o mesmo pixel e nenhum teste pegou.
 *
 * Uso:
 *   node scripts/check-mobile-layout.mjs           # 375x812 (celular)
 *   node scripts/check-mobile-layout.mjs 1440 900  # desktop
 *
 * ESPERADO no mobile: #webgl relative no topo, slides static, 0 overlaps.
 * ESPERADO no desktop: #webgl fixed em tela cheia, slides absolute. La os
 * overlaps sao de proposito: a composicao cinematografica e em camadas e
 * apenas um slide fica .active por vez, com transicao de opacidade/clip-path.
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';

const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
];
const CHROME = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!CHROME) {
  console.error('Chrome/Edge nao encontrado. Pular verificacao.');
  process.exit(0);
}

const WIDTH = Number(process.argv[2] || 375);
const HEIGHT = Number(process.argv[3] || 812);
const PORT = 8791;
const ROOT = path.resolve(process.cwd(), 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.glb': 'model/gltf-binary',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.join(ROOT, url);
  if (!existsSync(file) || url === '/jorge-uquillas') file = path.join(ROOT, 'index.html');
  if (!existsSync(file)) {
    res.writeHead(404);
    res.end('nao encontrado');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});

await new Promise((r) => server.listen(PORT, r));

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--remote-debugging-port=9222',
  "--window-size=${WIDTH},${HEIGHT}",
  '--hide-scrollbars',
  'about:blank',
]);
chrome.stderr.on('data', () => {});

async function cdpTarget() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const r = await fetch('http://127.0.0.1:9222/json/list');
      const list = await r.json();
      const page = list.find((t) => t.type === 'page');
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Chrome nao respondeu na porta 9222');
}

const wsUrl = await cdpTarget();
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const myId = ++id;
    pending.set(myId, resolve);
    ws.send(JSON.stringify({ id: myId, method, params }));
  });

await send('Emulation.setDeviceMetricsOverride', {
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: 3,
  mobile: true,
});
await send('Page.enable');
await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/jorge-uquillas` });
await new Promise((r) => setTimeout(r, 4000));

// A pagina real e um iframe: medimos DENTRO dele.
const probe = `(() => {
  const f = document.querySelector('iframe');
  const d = f && f.contentDocument;
  if (!d) return { error: 'iframe nao encontrado' };

  const sels = ['#webgl', '.cinematic-container', '.main-header', '#slide-1',
    '#slide-2-img', '#slide-2', '#slide-3', '#slide-4', '.artist-sub'];

  // A referencia do elemento fica SEPARADA do objeto de saida: elemento DOM
  // nao serializa em returnByValue do CDP.
  const items = sels.map((sel) => {
    const el = d.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { el, sel, top: Math.round(r.top), left: Math.round(r.left),
             w: Math.round(r.width), h: Math.round(r.height),
             position: d.defaultView.getComputedStyle(el).position };
  }).filter(Boolean);

  const boxes = items.map((o) => ({ sel: o.sel, top: o.top, left: o.left, w: o.w, h: o.h, position: o.position }));
  const visible = items.filter((b) => b.h > 4 && b.w > 4 && b.top + b.h > 0);

  const overlaps = [];
  for (let i = 0; i < visible.length; i++) {
    for (let j = i + 1; j < visible.length; j++) {
      const a = visible[i], b = visible[j];
      // Ignora par pai/filho: container nao "colide" com o proprio conteudo.
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const ox = Math.min(a.left + a.w, b.left + b.w) - Math.max(a.left, b.left);
      const oy = Math.min(a.top + a.h, b.top + b.h) - Math.max(a.top, b.top);
      if (ox > 12 && oy > 12) overlaps.push(a.sel + ' x ' + b.sel + ' (' + ox + 'x' + oy + 'px)');
    }
  }

  const slide1 = items.find((i) => i.sel === '#slide-1');

  return {
    viewport: d.defaultView.innerWidth,
    bodyScrollHeight: d.documentElement.scrollHeight,
    horizontalOverflow: d.documentElement.scrollWidth - d.defaultView.innerWidth,
    firstSlideTop: slide1 ? slide1.top : null,
    webglTop: (() => { const w = items.find((i) => i.sel === '#webgl'); return w ? w.top : null; })(),
    boxes,
    overlaps,
  };
})()`;

const res = await send('Runtime.evaluate', {
  expression: probe,
  returnByValue: true,
  awaitPromise: false,
});

const out = res.result?.result?.value;
console.log(`\n=== LAYOUT ${WIDTH}px x ${HEIGHT}px — /jorge-uquillas ===\n`);
if (!out || out.error) {
  console.log('FALHA:', out?.error || 'sem retorno');
} else {
  console.log('viewport ............', out.viewport + 'px');
  console.log('altura do documento ..', out.bodyScrollHeight + 'px');
  console.log('overflow horizontal .', out.horizontalOverflow + 'px', out.horizontalOverflow > 2 ? '  <-- QUEBRA' : '  OK');
  console.log('\nposicionamento dos blocos:');
  for (const b of out.boxes) {
    console.log('  ' + b.sel.padEnd(22), 'position=' + b.position.padEnd(9), `top=${String(b.top).padStart(5)} left=${String(b.left).padStart(4)} ${b.w}x${b.h}`);
  }
  console.log('\noverlaps > 12px:');
  if (out.overlaps.length === 0) console.log('  nenhum. Blocos nao disputam o mesmo pixel.');
  else out.overlaps.forEach((o) => console.log('  ' + o));
}

ws.close();
chrome.kill();
server.close();
