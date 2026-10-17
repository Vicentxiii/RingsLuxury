/**
 * Otimizador de imagens do RINGS LUXURY.
 *
 * POR QUE ISTO EXISTE
 * O public/ tem 289 imagens somando 98 MB. 42 delas passam de 300 KB e, sozinhas,
 * somam 75 MB. Em conexao movel isso e um LCP de dezenas de segundos: o visitante
 * ve o site "carregando" enquanto 13 MB de textura 4K baixam.
 *
 * O QUE FAZ
 * 1. AVIF + WebP em varias larguras, para <picture> com srcset (component
 *    src/components/LuxuryImage.tsx). AVIF entrega ~30% menos que WebP na mesma
 *    qualidade visual; nesta joalheria o preco e justo porque a imagem e o produto.
 * 2. QUALIDADE DE LUXO: quality 82 no WebP e 55 no AVIF com effort alto. Abaixo
 *    disso aparece banding nas bordas douradas contra fundo preto, que e
 *    exatamente onde o olho do cliente, acostumado a macro de ourivesaria, para.
 * 3. Nao toca em arquivo que ja e .webp/.avif pequeno, nem em .mp4/.glb.
 *
 * COMO RODAR
 *   npm i -D sharp
 *   node scripts/optimize-images.mjs                  # todas
 *   node scripts/optimize-images.mjs --dir "PUBLIC/Fotos para Post no Blog"
 *   node scripts/optimize-images.mjs --widths 800,1400 --quality 82
 *
 * Depois de rodar, ligue as variantes no <LuxuryImage>:
 *   sources={[
 *     { type: 'image/avif', srcSet: '/PUBLIC/x-800.avif 800w, /PUBLIC/x-1400.avif 1400w' },
 *     { type: 'image/webp', srcSet: '/PUBLIC/x-800.webp 800w, /PUBLIC/x-1400.webp 1400w' },
 *   ]}
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const ROOT = path.resolve(process.cwd(), 'public');
const DIR = argValue('dir', '');
const QUALITY = Number(argValue('quality', '82'));
const AVIF_QUALITY = Number(argValue('avif-quality', '55'));
const WIDTHS = argValue('widths', '480,800,1200,1600,2400')
  .split(',')
  .map((w) => Number(w.trim()))
  .filter(Boolean)
  .sort((a, b) => a - b);

/** Abaixo deste tamanho o arquivo e considerado ja otimizado. */
const SKIP_BELOW = 120 * 1024;

const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png']);

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!SOURCE_EXT.has(ext)) return null;

  const stat = await fs.stat(file);
  if (stat.size <= SKIP_BELOW) return null;

  const base = path.basename(file, ext);
  const stem = path.join(path.dirname(file), base);

  const image = sharp(file, { failOn: 'none' });
  const meta = await image.metadata();
  const originalWidth = meta.width ?? 1600;

  // Nao gera variante maior que o original: e bytes jogados fora.
  const widths = WIDTHS.filter((w) => w < originalWidth);
  if (widths.length === 0) widths.push(originalWidth);

  const before = stat.size;
  let after = 0;
  const produced = [];

  for (const width of widths) {
    const pipeline = sharp(file, { failOn: 'none' }).rotate().resize({
      width,
      withoutEnlargement: true,
      fit: 'inside',
    });

    const avif = `${stem}-${width}.avif`;
    const webp = `${stem}-${width}.webp`;

    await pipeline.clone().avif({ quality: AVIF_QUALITY, effort: 6 }).toFile(avif);
    await pipeline.clone().webp({ quality: QUALITY, effort: 5 }).toFile(avif.replace(/\.avif$/, '.webp'));

    const [a, w] = await Promise.all([fs.stat(avif), fs.stat(avif.replace(/\.avif$/, '.webp'))]);
    after += a.size + w.size;
    produced.push(`${base}-${width}.{avif,webp}`);
  }

  return { file: path.relative(ROOT, file), before, after, originalWidth, produced };
}

async function main() {
  const startDir = DIR ? path.join(ROOT, DIR) : ROOT;
  if (!fs.existsSync(startDir)) {
    console.error(`Pasta nao encontrada: ${startDir}`);
    process.exit(1);
  }

  console.log(`Otimizando imagens em public/${DIR} -> larguras ${widths.join(', ')}`);
  console.log(`Qualidade: webp ${QUALITY} / avif ${AVIF_QUALITY}\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for await (const file of walk(startDir)) {
    try {
      const result = await optimizeOne(file);
      if (!result) continue;
      count += 1;
      totalBefore += result.before;
      totalAfter += result.after;
      const saved = (1 - result.after / result.before) * 100;
      console.log(
        `  ${result.file}\n    ${kb(result.before)} -> ${kb(result.after)} (-${saved.toFixed(0)}%)`,
      );
    } catch (err) {
      console.warn(`  ! falhou em ${path.relative(ROOT, file)}: ${err.message}`);
    }
  }

  console.log(`\n${count} imagens processadas.`);
  console.log(`Antes: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Depois: ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  if (totalBefore > 0) {
    console.log(`Economia: ${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%`);
  }
  console.log('\nIMPORTANTE: o script NAO apaga os originais. Revise e remova a');
  console.log('versao grande depois de confirmar que as variantes estao no lugar.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});