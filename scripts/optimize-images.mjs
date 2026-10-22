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
import { existsSync } from 'node:fs';
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
const WIDTHS = argValue('widths', '480,800,1200,1600')
  .split(',')
  .map((w) => Number(w.trim()))
  .filter((w) => Number.isFinite(w) && w > 0 && w <= 1600)
  .sort((a, b) => a - b);

/** Abaixo deste tamanho o arquivo e considerado ja otimizado. */
const SKIP_BELOW = 120 * 1024;

/**
 * Exceções ao corte por peso. A imagem do hero é pequena em bytes, mas é o
 * elemento de LCP: sem variantes, um celular baixa/decodifica 1600 px para
 * exibir ~400 px. Forçar 480/800/1200/1600 aqui dá ao navegador uma versão
 * leve e mantém o teto de 1600 px.
 */
const FORCE_VARIANTS = new Set([
  'medusa-e-odim-capa-do-site-rings-luxury-by-jorge-uquillas.webp',
]);

const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
/** Nao reprocessar variantes já geradas (x-800.webp, x-1600.avif...). */
const GENERATED_VARIANT = /-\d+\.(webp|avif)$/i;

/*
 * AVIF depende de como o libvips foi compilado no binario instalado. O pacote
 * padrao do sharp nao SEMPRE vem com AVIF, e um `<source type="image/avif">`
 * apontando para arquivo inexistente QUEBRA a imagem no navegador: ele escolhe
 * o primeiro <source> que consegue parsear e nao ha fallback para o <img>.
 * Descobrimos o que existe de verdade, em vez de assumir.
 *
 * Esta declaracao vem DEPOIS de QUALITY e AVIF_QUALITY de proposito: `const` nao
 * tem hoisting de valor, e ler QUALITY aqui lancaria ReferenceError.
 */
const AVAILABLE = {
  // Em versões recentes do sharp, AVIF aparece como alias de `heif`, não
  // como `format.avif`. Ler só `format.avif` desabilitava AVIF sem motivo.
  avif: Boolean(sharp.format?.avif?.output || sharp.format?.heif?.output),
  webp: Boolean(sharp.format?.webp?.output),
};

/** Se nao houver AVIF, gera so WebP e avisa uma vez. */
const FORMATS = [
  ...(AVAILABLE.avif ? [{ ext: 'avif', quality: AVIF_QUALITY, effort: 6 }] : []),
  ...(AVAILABLE.webp ? [{ ext: 'webp', quality: QUALITY, effort: 5 }] : []),
];

if (FORMATS.length === 0) {
  console.error('Este build do sharp nao tem webp nem avif. Nada a fazer.');
  process.exit(1);
}
if (!AVAILABLE.avif) {
  console.log('AVIF indisponivel neste build do sharp: gerando WebP apenas.');
  console.log('Para habilitar AVIF: npm i -D @img/sharp-wasm-avif\n');
}

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
  // Evita criar x-800-800.webp em builds seguintes.
  if (GENERATED_VARIANT.test(path.basename(file))) return null;

  const stat = await fs.stat(file);
  if (stat.size <= SKIP_BELOW && !FORCE_VARIANTS.has(path.basename(file).toLowerCase())) {
    return null;
  }

  const base = path.basename(file, ext);
  const stem = path.join(path.dirname(file), base);

  const image = sharp(file, { failOn: 'none' });
  const meta = await image.metadata();
  const originalWidth = meta.width ?? 1600;
  // Teto de 1600px: acima disso o ganho visual não compensa o peso em mobile.
  const cappedWidth = Math.min(originalWidth, 1600);

  /*
    Lista de larguras a gerar.

    Regra: nunca ampliar e nunca passar de 1600px. Inclui a largura final
    (limitada a 1600) para haver uma variante 1:1 quando o original já é menor.
  */
  const widths = new Set(WIDTHS.filter((w) => w < cappedWidth));
  widths.add(cappedWidth);
  const widthList = [...widths].sort((a, b) => a - b);

  const before = stat.size;
  let after = 0;
  const produced = [];

  for (const width of widthList) {
    const base = sharp(file, { failOn: 'none' }).rotate().resize({
      width,
      withoutEnlargement: true,
      fit: 'inside',
    });

    for (const fmt of FORMATS) {
      const out = `${stem}-${width}.${fmt.ext}`;
      await base.clone()[fmt.ext]({ quality: fmt.quality, effort: fmt.effort }).toFile(out);
      const st = await fs.stat(out);
      after += st.size;
      produced.push(`${path.basename(out)} ${kb(st.size)}`);
    }
  }

  return { file: path.relative(ROOT, file), before, after, originalWidth, produced };
}

async function main() {
  const startDir = DIR ? path.join(ROOT, DIR) : ROOT;
  // `node:fs/promises` nao tem existsSync (e so assincrono): vem de `node:fs`.
  if (!existsSync(startDir)) {
    console.error(`Pasta nao encontrada: ${startDir}`);
    process.exit(1);
  }

  console.log(`Otimizando imagens em public/${DIR} -> larguras ${WIDTHS.join(', ')}`);
  console.log(
    `Formatos: ${FORMATS.map((f) => `${f.ext} q${f.quality}`).join(', ')} · pulando ate ${kb(SKIP_BELOW)}\n`,
  );

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