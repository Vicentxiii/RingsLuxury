import sharp from 'sharp';
import path from 'node:path';

const uploads = 'C:/Users/czar III/.gemini/antigravity/brain/9d63a49e-6b34-40ca-9089-c7bd251fdab0/.user_uploaded/';
const outputDir = 'public/PUBLIC/';

const images = [
  {
    src: 'media_1794519962816_4981a735.jpg',
    out: 'anel-esmeralda-ouro-18k-diamantes-jorge-uquillas-capa.webp',
    width: 1200, // upscale slightly with lanczos3 for crisp retina presentation
  },
  {
    src: 'media_1794519962809_b7ca23c6.jpg',
    out: 'anel-esmeralda-processo-1-corte-ouro-18k.webp',
    width: 1080,
  },
  {
    src: 'media_1794519962807_2871377e.jpg',
    out: 'anel-esmeralda-processo-2-caixa-octogonal-ouro.webp',
    width: 1080,
  },
  {
    src: 'media_1794519962809_84a502c0.jpg',
    out: 'anel-esmeralda-processo-3-soldagem-fogo-ouro.webp',
    width: 1080,
  },
  {
    src: 'media_1794519962809_00d0f7b7.jpg',
    out: 'anel-esmeralda-processo-4-limagem-perfil-catedral.webp',
    width: 1080,
  },
  {
    src: 'media_1794519962810_2136a374.jpg',
    out: 'anel-esmeralda-processo-5-recozimento-macarico.webp',
    width: 1080,
  },
  {
    src: 'media_1794519962812_04f52d59.jpg',
    out: 'anel-esmeralda-processo-6-armacao-ouro-18k.webp',
    width: 1080,
  },
  {
    src: 'media_1794519962813_7550ada6.jpg',
    out: 'anel-esmeralda-processo-7-banho-decapagem-acidos.webp',
    width: 1080,
  },
  {
    src: 'media_1794519962813_23cb1f01.jpg',
    out: 'anel-esmeralda-processo-8-calibracao-tribule-anel.webp',
    width: 1080,
  },
  {
    src: 'media_1794519962830_1ef3e426.jpg',
    out: 'anel-esmeralda-processo-9-esmeralda-natural-buril.webp',
    width: 1080,
  },
];

async function processAll() {
  for (const img of images) {
    const inputPath = path.join(uploads, img.src);
    const outputPath = path.join(outputDir, img.out);
    
    await sharp(inputPath)
      .resize({
        width: img.width,
        withoutEnlargement: false,
        kernel: sharp.kernel.lanczos3
      })
      .webp({ quality: 90, effort: 6 })
      .toFile(outputPath);
      
    console.log(`Saved: ${img.out}`);
  }
  console.log('All 10 images processed successfully.');
}

processAll().catch(console.error);

