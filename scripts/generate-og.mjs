import sharp from 'sharp';
import fs from 'node:fs';

const imgPath = 'C:/Users/czar III/.gemini/antigravity/brain/9d63a49e-6b34-40ca-9089-c7bd251fdab0/.user_uploaded/media_1794508021431_fd2003dd.jpg';

async function run() {
  const h = 630;
  const w = Math.round(1024 * (630 / 776)); // 831

  // Alpha mask with soft gradient fade on left and right borders so it blends seamlessly into the blurred luxury dark backdrop
  const maskSvg = Buffer.from(`
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="black" />
      <stop offset="6%" stop-color="white" />
      <stop offset="94%" stop-color="white" />
      <stop offset="100%" stop-color="black" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#fade)" />
</svg>
`);

  const bg = await sharp(imgPath)
    .resize(1200, 630, { fit: 'cover' })
    .blur(35)
    .modulate({ brightness: 0.35 })
    .toBuffer();

  const fg = await sharp(imgPath)
    .resize(w, h)
    .toBuffer();

  const mask = await sharp(maskSvg).toColourspace('b-w').toBuffer();

  const fgMasked = await sharp(fg)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .toBuffer();

  // Combine background + feathered foreground into final 1200x630 og-image.jpg
  await sharp(bg)
    .composite([{ input: fgMasked, gravity: 'center' }])
    .jpeg({ quality: 93, progressive: true })
    .toFile('public/og-image.jpg');

  console.log('og-image.jpg generated successfully!');
}

run().catch(console.error);

