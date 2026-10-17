/**
 * Manifesto de variantes de imagem.
 *
 * POR QUE UM MANIFESTO, E NAO CONVENCAO DE NOME
 * O otimizador gera variantes de forma CONDICIONAL: so cria as larguras menores
 * que o original, e pula imagens abaixo de 120 KB. Deduzir a URL no componente
 * (`src.replace('.jpg', '-800.webp')`) geraria <source> apontando para arquivo
 * que NAO EXISTE, e o navegador escolhe o primeiro <source> que parseia, sem
 * fallback para o <img>: imagem quebrada, sem aviso no console.
 *
 * Entao o manifesto e gerado a partir do disco real. Se o arquivo esta no disco,
 * ele esta no manifesto. Se nao esta, o componente nem tenta.
 *
 * Como o contem de build depende do conteudo de public/, ele e deterministico:
 * mesma entrada, mesmo JSON. Por isso pode ser versionado sem gerar diff.
 *
 * Saida: src/data/image-variants.json
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(process.cwd(), 'public');
const OUT = path.resolve(process.cwd(), 'src/data/image-variants.json');
const VARIANT_EXT = new Set(['.webp', '.avif']);
/**
 * `nome-800` SEM extensao -> 800. O `basename(abs, ext)` acima ja removeu a
 * extensao, entao o regex nao pode exige-la. O formato vem do `ext`.
 * Digits puros no fim: `algum-4k` NAO e uma variante de largura 4.
 */
const SUFFIX = /-(\d+)$/;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function main() {
  /** base -> { webp: [{w,file}], avif: [...] } */
  const map = new Map();

  for await (const abs of walk(ROOT)) {
    const ext = path.extname(abs).toLowerCase();
    if (!VARIANT_EXT.has(ext)) continue;

    const base = path.basename(abs, ext);
    const m = SUFFIX.exec(base);
    if (!m) continue;

    const width = Number(m[1]);
    if (!Number.isFinite(width) || width <= 0) continue;

    const originalBase = base.slice(0, base.length - m[0].length);
    const key = path
      .relative(ROOT, path.join(path.dirname(abs), originalBase))
      .split(path.sep)
      .join('/');

    if (!map.has(key)) map.set(key, { webp: [], avif: [] });
    map.get(key)[ext.slice(1)].push({ w: width, file: path.relative(ROOT, abs).split(path.sep).join('/') });
  }

  const manifest = {};
  for (const [key, formats] of map) {
    const entry = {};
    for (const fmt of ['webp', 'avif']) {
      const list = formats[fmt].sort((a, b) => a.w - b.w);
      if (list.length) entry[fmt] = list;
    }
    if (Object.keys(entry).length) manifest[key] = entry;
  }

  const sorted = {};
  for (const k of Object.keys(manifest).sort()) sorted[k] = manifest[k];

  await fs.writeFile(OUT, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8');

  const totalVariants = Object.values(sorted).reduce(
    (n, e) => n + (e.webp?.length ?? 0) + (e.avif?.length ?? 0),
    0,
  );
  console.log(`Manifesto: ${Object.keys(sorted).length} imagens, ${totalVariants} variantes -> src/data/image-variants.json`);
}

main().catch((err) => {
  // O build nao pode quebrar por causa do manifesto: sem ele, o site cai no
  // <img> simples, que e o estado de antes e continua funcionando.
  console.warn(`[image-manifest] nao gerado: ${err.message}`);
  console.warn('[image-manifest] o site usara <img> simples. Verifique src/data/image-variants.json');
  process.exit(0);
});