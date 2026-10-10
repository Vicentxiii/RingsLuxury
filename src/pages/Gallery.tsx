import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GoldenParticles } from '../components/GoldenParticles';
import { absoluteUrl } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';

// Hero do topo: o mestre literalmente trabalhando, mãos no esmeril.
// Foto escura e cinematográfica, no clima do site. Prova de handmade
// de verdade, não posada.
const HERO_WORK_IMG = encodeURI(
  '/PUBLIC/Rings luxury polindo anel Master Engraver Jorge Uquillas.webp',
);
const HERO_WORK_ALT =
  'Master hand engraver Jorge Uquillas polishing a hand-engraved 18k gold ring at the bench, RINGS LUXURY atelier';

/**
 * GALLERY pilar (/gallery): prova de produção do atelier.
 *
 * SEO:
 * - H1 único "GALLERY", 300+ palavras de texto indexável (páginas só de
 *   foto são thin content e não rankeiam).
 * - Cada foto com alt descritivo + nome de arquivo real do atelier,
 *   loading lazy (menos a primeira), width/height para CLS.
 * - JSON-LD ImageGallery + BreadcrumbList (via <Breadcrumbs/>), links
 *   internos para /produto/:slug e para o guia/blog (distribui PageRank).
 * - Não reutiliza GalleryPage.tsx (template de coleção comercial).
 */
interface ProductionShot {
  src: string;
  alt: string;
  caption: string;
  productSlug?: string;
}

const SHOTS: ProductionShot[] = [
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery.webp'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery, masterpiece in solid gold',
    caption: 'Hand-engraved 18k gold, master proof',
    productSlug: 'emperor-ring-18k-gold-monogram-jorge-uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (1).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (1), burin cutting relief in gold',
    caption: 'Burin cutting relief, production 01',
    productSlug: 'lion-emperor-ring-18k-gold-jorge-uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (1).jpeg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (1b), microscope engraving detail',
    caption: 'Microscope engraving detail, production 02',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (2).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (2), sculpted band in solid 18k gold',
    caption: 'Sculpted band taking shape, production 03',
    productSlug: 'bitcoin-ring-especial-edition-18k-gold-jorge-uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (2).jpeg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (2b), hand-chased texture close-up',
    caption: 'Hand-chased texture, production 04',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (3).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (3), engraved crest before diamond setting',
    caption: 'Engraved crest before stones, production 05',
    productSlug: 'medusa-ring-especial-edition-diamonds-jorge-uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (3).jpeg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (3b), atelier bench handwork',
    caption: 'Atelier bench handwork, production 06',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (4).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (4), deep relief sculpted by hand',
    caption: 'Deep relief sculpt, production 07',
    productSlug: 'tempest-ring-especial-edition-jorge-uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (4).jpeg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (4b), fine line engraving in 18k gold',
    caption: 'Fine line engraving, production 08',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (5).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (5), natural diamond setting stage',
    caption: 'Diamond setting stage, production 09',
    productSlug: 'king-skull-ring-18k-diamonds-especial-edition-jorge-uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (5).jpeg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (5b), hand finishing under magnification',
    caption: 'Hand finishing, production 10',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (6).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (6), monumental relief in solid gold',
    caption: 'Monumental relief, production 11',
    productSlug: 'koi-emperor-ring-18k-rose-gold-jorge-uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (6).jpeg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (6b), engraver refining the volume',
    caption: 'Volume refinement, production 12',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (7).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (7), hand polish on 18k gold ring',
    caption: 'Hand polish, production 13',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (8).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (8), finished engraving proof',
    caption: 'Finished engraving proof, production 14',
    productSlug: 'tiger-ring-especial-edition-jorge-uquillas',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (9).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (9), hallmark and final detail',
    caption: 'Hallmark and final detail, production 15',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (10).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (10), one-of-one atelier piece',
    caption: 'One-of-one atelier piece, production 16',
  },
  {
    src: encodeURI('/PUBLIC/Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (11).jpg'),
    alt: 'Produce 18k Gold Ring, Jorge Uquillas Rings Luxury Hand Engraving Image For Gallery (11), ready for private commission delivery',
    caption: 'Ready for delivery, production 17',
    productSlug: 'mixed-luxury-gold-ring-jorge-uquillas',
  },
];

function scrollToContact() {
  setTimeout(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

export function Gallery() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO
        title={t.pages.gallerySeoTitle}
        description={t.pages.gallerySeoDescription}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `${t.pages.galleryPillarTitle}, RINGS LUXURY by Jorge Uquillas`,
            description: t.pages.gallerySeoDescription,
            url: absoluteUrl('/gallery'),
            author: { '@type': 'Person', name: 'Jorge Uquillas' },
            image: SHOTS.map((s) => ({
              '@type': 'ImageObject',
              contentUrl: absoluteUrl(s.src),
              caption: s.caption,
              creditText: 'RINGS LUXURY by Jorge Uquillas',
            })),
          }),
        }}
      />

      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      {/* Poeira dourada de fundo: Canvas 2D leve (não Three.js).
          Three.js/WebGL real somaria ~500KB + GPU numa página já pesada
          com 18 fotos de produção, e derrubaria LCP/mobile. O efeito
          visual é o mesmo clima de atelier, com mouse-reactive. */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        <GoldenParticles density={90} className="h-full w-full opacity-60" />
        <div className="absolute top-[6%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08),transparent_65%)] blur-2xl" />
      </div>
      <Header onOpenConsultation={scrollToContact} />

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <Breadcrumbs
          items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.pages.galleryPillarTitle }]}
        />

        <header className="text-center mb-14">
          <h2 className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            {t.pages.galleryPillarKicker}
          </h2>
          <h1 className="font-cinzel text-4xl md:text-6xl font-medium tracking-wide text-[#F3EFE6] mb-6">
            {t.pages.galleryPillarTitle}
          </h1>
          <p className="font-cinzel text-sm md:text-base uppercase tracking-[0.4em] text-[#E6CA85]">
            {t.pages.galleryPillarSubtitle}
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto mt-8" />
          {/* Mestre trabalhando de verdade: mãos no esmeril */}
          <figure className="relative mx-auto mt-10 max-w-3xl overflow-hidden border border-[#C5A059]/20 bg-black/40">
            <img
              src={HERO_WORK_IMG}
              alt={HERO_WORK_ALT}
              loading="eager"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020202]/70 via-transparent to-transparent"
            />
          </figure>
        </header>

        {/* Texto pilar indexável: sem isso a página seria só fotos (thin content). */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <p className="font-cormorant text-xl md:text-2xl leading-relaxed text-[#C2BDB2] text-center">
            {t.pages.galleryPillarIntro1}
          </p>
          <p className="font-cormorant text-lg md:text-xl leading-relaxed text-[#A8A296] text-center">
            {t.pages.galleryPillarIntro2}
          </p>
        </div>

        {/* Processo em 4 etapas: reforça E-E-A-T de feito à mão. */}
        <section aria-label={t.pages.galleryProcessHeading} className="mb-20">
          <h2 className="font-cinzel text-2xl md:text-3xl text-center text-[#F3EFE6] mb-10">
            {t.pages.galleryProcessHeading}
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.pages.galleryS1T, desc: t.pages.galleryS1D },
              { title: t.pages.galleryS2T, desc: t.pages.galleryS2D },
              { title: t.pages.galleryS3T, desc: t.pages.galleryS3D },
              { title: t.pages.galleryS4T, desc: t.pages.galleryS4D },
            ].map((s) => (
              <li
                key={s.title}
                className="border border-[#C5A059]/20 bg-[#050505]/60 p-6 hover:border-[#C5A059]/50 transition-colors"
              >
                <h3 className="font-cinzel text-base text-[#E6CA85] mb-3">{s.title}</h3>
                <p className="font-cormorant text-lg leading-relaxed text-[#A8A296]">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Grid de produção */}
        <section aria-label={t.pages.galleryGridHeading}>
          <h2 className="font-cinzel text-2xl md:text-3xl text-center text-[#F3EFE6]">
            {t.pages.galleryGridHeading}
          </h2>
          <p className="font-cormorant text-lg italic text-center text-[#A8A296] mt-3 mb-12">
            {t.pages.galleryGridSub}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SHOTS.map((shot, i) => (
              <figure
                key={shot.src}
                className="group flex flex-col bg-[#080808] border border-[#C5A059]/15 hover:border-[#C5A059]/40 transition-all duration-500 overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#050505]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#020202]/85 border border-[#C5A059]/30 backdrop-blur-sm">
                    <span className="font-poppins text-[10px] uppercase tracking-widest text-[#C5A059]">
                      {String(i + 1).padStart(2, '0')} / {String(SHOTS.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <figcaption className="flex flex-col flex-grow p-6">
                  <p className="font-cormorant text-lg leading-relaxed text-[#C2BDB2] flex-grow">
                    {shot.caption}
                  </p>
                  {shot.productSlug && (
                    <Link
                      to={`/produto/${shot.productSlug}`}
                      className="mt-5 inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors"
                    >
                      {t.pages.galleryViewProduct} →
                    </Link>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Links internos: gallery distribui autoridade para guia, blog e contato. */}
        <nav
          aria-label="Atelier"
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <Link
            to="/luxury-rings-guide"
            className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-[#C5A059] underline underline-offset-4 hover:text-[#E6CA85] transition-colors"
          >
            {t.pages.galleryGuideLink}
          </Link>
          <span className="hidden sm:inline text-[#C5A059]/40" aria-hidden>
            •
          </span>
          <Link
            to="/blog"
            className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-[#C5A059] underline underline-offset-4 hover:text-[#E6CA85] transition-colors"
          >
            {t.pages.galleryBlogLink}
          </Link>
        </nav>

        <section className="mt-14 text-center border border-[#C5A059]/20 bg-[#050505]/60 px-8 py-12">
          <h2 className="font-cinzel text-2xl md:text-3xl text-[#F3EFE6] mb-6">
            {t.pages.galleryCtaTitle}
          </h2>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[11px] tracking-[0.25em] uppercase rounded-full transition-colors"
          >
            {t.pages.galleryCtaButton}
          </button>
        </section>
      </main>

      <div className="mt-20 relative z-10">
        <Contact />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default Gallery;
