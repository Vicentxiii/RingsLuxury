import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ResponsiveImg } from '../components/ResponsiveImg';
import { Contact } from '../components/Contact';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { absoluteUrl } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';

// Capa da galeria: banner panorâmico no topo da página.
const GALLERY_COVER_IMG = encodeURI(
  '/PUBLIC/capa-da-foto-galeria-rings-luxury-jorge-uquillas.jpg',
);
const GALLERY_COVER_ALT =
  'Capa da galeria Rings Luxury, anéis artesanais em ouro 18k gravados à mão por Jorge Uquillas';
const HERO_WORK_IMG = encodeURI(
  '/PUBLIC/rings-luxury-polindo-anel-master-engraver-jorge-uquillas.webp',
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
 * - Otimizado para Bing, Google, Zia e assistentes generativos de IA (GEO).
 */
interface ProductionShot {
  src: string;
  alt: string;
  caption: string;
  productSlug?: string;
}

const SHOTS: ProductionShot[] = [
  // 01/25 - DR. Viotto Ring
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery.webp'),
    alt: 'DR. Viotto Ring in solid 18k gold on the atelier bench, master proof hand-engraved by Jorge Uquillas',
    caption: 'Bespoke DR. Viotto Ring in solid 18k gold sculpted directly on the atelier bench. Master hand engraver Jorge Uquillas cuts the custom heraldic crest with microscopic steel gravers, achieving sharp classical depth without casting molds. How does a custom heraldic ring preserve a family dynasty across generations?',
    productSlug: 'dr-viotto-ring-jorge-uquillas-rings-luxury',
  },
  // 02/25 - DR. Viotto Ring
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-1-2.jpg'),
    alt: 'Burin cutting monumental relief into the solid 18k gold DR. Viotto Ring, RINGS LUXURY atelier',
    caption: 'Deep burin incisions opening the monumental architecture of the DR. Viotto Ring. Each stroke removes pure gold shaving by shaving, creating crisp shadows and brilliant light reflections unique to traditional European hand engraving. Can any machine match the human breath and discipline of genuine bench work?',
    productSlug: 'dr-viotto-ring-jorge-uquillas-rings-luxury',
  },
  // 03/25 - Sem anel finalizado
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-1.jpg'),
    alt: 'Microscopic inspection of high-relief scroll hand-engraving in 18k gold by Jorge Uquillas',
    caption: 'Microscopic examination of hand-cut gold relief under high-magnification optics. The hardened steel tool carves intricate multi-layered scrolls directly into the noble metal, ensuring every microscopic nuance remains sharp for centuries of daily wear.',
  },
  // 04/25 - Não identificado (sem botão)
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-2-2.jpg'),
    alt: 'Solid 18k gold sculpted ring band taking shape on the anvil at RINGS LUXURY atelier',
    caption: 'Rough sculpted band taking anatomical shape on the jeweler’s anvil. Solid 18k gold is forged, annealed, and calibrated to the patron’s precise biometric proportions before receiving its bespoke engraving motifs.',
  },
  // 05/25 - DR. Viotto Ring
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-2.jpg'),
    alt: 'Hand-chased texture and heraldic relief on the DR. Viotto Ring in 18k solid gold',
    caption: 'Hand-chased matte and polished contrast textures on the side flanks of the DR. Viotto Ring. Jorge Uquillas textures the background so the heraldic monogram emerges with sculptural supremacy. Ready to seal your personal legend in solid 18k gold?',
    productSlug: 'dr-viotto-ring-jorge-uquillas-rings-luxury',
  },
  // 06/25 - Sem peça (botão removido)
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-3-2.jpg'),
    alt: 'High-relief crest carved on a heavy 18k signet ring before gem preparation at RINGS LUXURY',
    caption: 'High-relief crest carved on a heavy 18k signet ring before gem preparation. The burin cuts an architectural throne where individual diamonds will be set flush into solid metal by hand, celebrating classical goldsmithing heritage.',
  },
  // 07/25 - DR. Viotto Ring
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-3.jpg'),
    alt: 'DR. Viotto Ring solid gold chassis clamped in engraving vise, handwork by Jorge Uquillas',
    caption: 'The DR. Viotto solid gold chassis clamped firmly in the engraving ball. Guided by over three decades of lineage, Jorge Uquillas sculpts the curves with relentless steady pressure, creating an untouchable bespoke talisman.',
    productSlug: 'dr-viotto-ring-jorge-uquillas-rings-luxury',
  },
  // 08/25 - Sem peça (botão removido)
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-4-2.jpg'),
    alt: 'Monumental 3D relief hand-sculpted in 18k gold with multi-angle gravers by Jorge Uquillas',
    caption: 'Deep 3D relief sculpted by hand with multi-angle gravers. Rather than flat surface etching, true hand engraving removes mass to leave monumental volumes standing in high relief like a classical Roman sculpture. What makes genuine haute joaillerie an enduring investment?',
  },
  // 09/25 - Deixa original (sem botão)
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-4.jpg'),
    alt: 'Hairline bulino engraving shading on 18k solid gold ring at RINGS LUXURY atelier',
    caption: 'Hairline bulino shading on 18k solid gold. Thousands of microscopic stipples and crosshatch incisions produce realistic depth, anatomical shadow, and velvet tonal gradation that can never be duplicated by casting or laser.',
  },
  // 10/25 - King Skull Ring with Diamonds
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-5-2.jpg'),
    alt: 'Natural diamonds pavé-set into solid 18k gold King Skull Ring by master Jorge Uquillas',
    caption: 'Natural diamond micro-pavé setting on the King Skull Ring cranium. Each stone is nestled directly into solid 18k gold beads raised with a fine beading tool, securing blazing brilliance into an imperial memento mori masterpiece.',
    productSlug: 'king-skull-ring-18k-diamonds-especial-edition-jorge-uquillas',
  },
  // 11/25 - Deixa original (sem botão)
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-5.jpg'),
    alt: 'Precision edge burnishing and contour inspection under optical magnification at RINGS LUXURY',
    caption: 'Precision edge burnishing and contour inspection under optical magnification. Every facet is smoothed to eliminate sharp points while preserving the crisp, razor-sharp perimeter that defines elite museum-grade jewelry.',
  },
  // 12/25 - Rose Gold Pirate Skull Ring
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-6-2.jpg'),
    alt: 'Rose Gold Pirate Skull Ring chiseled in solid 18k rose gold by master Jorge Uquillas',
    caption: 'Rose Gold Pirate Skull Ring taking form in solid 18k noble rose alloy. The rebellious skull contours, crossed bones, and menacing eye sockets are chiseled by hand with fearless mastery. Would you dare to wear an unapologetic symbol of freedom and defiance on your hand?',
    productSlug: 'rose-gold-pirate-skull-ring-jorge-uquillas',
  },
  // 13/25 - Family Crest Silver Ring ($1,500)
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-6.jpg'),
    alt: 'Family Crest Silver Ring carved in heavy 925 sterling silver by master Jorge Uquillas',
    caption: 'Family Crest Silver Ring carved in heavy 925 sterling silver. Jorge Uquillas translates centuries-old ancestral heraldry, shields, and family mottos into deep-cut tactile silver that seals your lineage in wax and history for $1,500.',
    productSlug: 'family-crest-silver-ring-jorge-uquillas',
  },
  // 14/25 - Tempest Ring Especial Edition
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-7.jpg'),
    alt: 'Tempest Ring in solid 18k gold being hand-finished at RINGS LUXURY atelier',
    caption: 'The Tempest Ring being hand-finished at the bench. Swirling winds and turbulent ocean crests are carved across the 18k gold band, capturing primal elemental power frozen in eternal precious metal. How does it feel to command the storm upon your finger?',
    productSlug: 'tempest-ring-especial-edition-jorge-uquillas',
  },
  // 15/25 - Sem botão
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-8.jpg'),
    alt: 'Finished engraving proof of hand-cut scrollwork on solid gold by Jorge Uquillas',
    caption: 'Final bench proof of custom hand-engraved scrollwork on solid gold. The piece reflects the cold, razor-sharp cuts made under high magnification, showcasing the signature artistry of the RINGS LUXURY atelier.',
  },
  // 16/25 - Sem botão
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-9.jpg'),
    alt: 'Official hallmark and signature of Jorge Uquillas inside the 18k gold ring shank',
    caption: 'Official hallmark stamping and signature of Jorge Uquillas on the inner shank. Every bespoke creation receives the Owl of Athena symbol, purity mark 750 or 925, and master engraver signature as proof of authentic provenance.',
  },
  // 17/25 - Sem botão
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-10.jpg'),
    alt: 'One-of-one private commission gold ring after final inspection at RINGS LUXURY',
    caption: 'One-of-one private commission ready for its final inspection. Never reproduced, never cloned: the wax matrix is destroyed after casting, guaranteeing the patron absolute exclusivity in the global world of haute joaillerie.',
  },
  // 18/25 - Sem botão
  {
    src: encodeURI('/PUBLIC/produce-18k-gold-ring-jorge-uquillas-rings-luxury-hand-engraving-image-for-gallery-11.jpg'),
    alt: 'Bespoke leather presentation case and certificate for RINGS LUXURY private commission',
    caption: 'Preparation of custom bespoke packaging, genuine leather presentation case, and archival certificate of authenticity before international insured dispatch to our collector.',
  },
  // 19/25 - Sheeta (Cheetah) Ring
  {
    src: encodeURI('/PUBLIC/anel-cheeta-processo-by-rings-luxury-jorge-uquillas.jpg'),
    alt: 'Cheetah (Sheeta) Ring in solid 18k gold hand-engraving process by Jorge Uquillas',
    caption: 'The Cheetah (Sheeta) Ring in solid 18k gold at the bench. Master Jorge Uquillas begins carving the ferocious feline facial anatomy, musculature, and fierce expression with tempered steel burins. Have you ever seen feline speed and grace rendered so vividly in solid gold?',
    productSlug: 'cheeta-ring-big-rubi-diamond-18k-gold-jorge-uquillas',
  },
  // 20/25 - Sheeta (Cheetah) Ring
  {
    src: encodeURI('/PUBLIC/anel-cheeta-processo-by-rings-luxury-jorge-uquillas-1.jpg'),
    alt: 'Cheetah Ring predatory jaw and spotted coat hand-chasing on 18k gold',
    caption: 'Sculpting the spotted coat and predatory jaw of the Cheetah Ring. Each rosette spot is individually chased and textured directly on the gold skin, contrasting satin grooves with mirror-polished ridges.',
    productSlug: 'cheeta-ring-big-rubi-diamond-18k-gold-jorge-uquillas',
  },
  // 21/25 - Sheeta (Cheetah) Ring
  {
    src: encodeURI('/PUBLIC/anel-cheeta-processo-by-rings-luxury-jorge-uquillas-2.jpg'),
    alt: 'Burin precision detailing around the eyes and brow of the Cheetah ring in 18k gold',
    caption: 'Burin precision detailing around the eyes and brow of the Cheetah ring. The piercing gaze is chiseled to hold natural brilliant diamonds and deep red ruby accents that ignite with intense optical fire.',
    productSlug: 'cheeta-ring-big-rubi-diamond-18k-gold-jorge-uquillas',
  },
  // 22/25 - Sheeta (Cheetah) Ring
  {
    src: encodeURI('/PUBLIC/anel-cheeta-processo-by-rings-luxury-jorge-uquillas-3.jpg'),
    alt: 'Handwork refinement of the fangs and mane on the Cheetah ring by Jorge Uquillas',
    caption: 'Final hand-refining of the Cheetah’s fangs and mane contours. Dozens of dedicated hours transform raw 18k gold into a wearable sculpture of primal speed and untamed luxury. Why settle for ordinary jewelry when you can command an iconic predator?',
    productSlug: 'cheeta-ring-big-rubi-diamond-18k-gold-jorge-uquillas',
  },
  // 23/25 - Sheeta (Cheetah) Ring
  {
    src: encodeURI('/PUBLIC/anel-cheeta-processo-by-rings-luxury-jorge-uquillas-5.jpg'),
    alt: 'Ergonomic bench proof inspection of the Cheetah ring prior to stone setting',
    caption: 'Bench proof inspection of the Cheetah ring prior to stone setting. Every curve of the predatory beast wraps ergonomically around the finger, balancing colossal weight with supreme comfort.',
    productSlug: 'cheeta-ring-big-rubi-diamond-18k-gold-jorge-uquillas',
  },
  // 24/25 - Sheeta (Cheetah) Ring
  {
    src: encodeURI('/PUBLIC/anel-cheeta-processo-by-rings-luxury-jorge-uquillas-6.jpg'),
    alt: 'Micro-engraved directional fur flow on the 18k gold Cheetah ring under high magnification',
    caption: 'Micro-engraved pelt patterns on the Cheetah ring under the lens. Jorge Uquillas sculpts directional fur flow across the gold, demonstrating the pinnacle of hand engraver artistry.',
    productSlug: 'cheeta-ring-big-rubi-diamond-18k-gold-jorge-uquillas',
  },
  // 25/25 - Sheeta (Cheetah) Ring
  {
    src: encodeURI('/PUBLIC/anel-cheeta-processo-by-rings-luxury-jorge-uquillas-7.jpg'),
    alt: 'Completed Cheetah Ring in 18k gold with rubies and diamonds ready for final polish',
    caption: 'The Cheetah Ring completed and ready for master polishing. Solid 18k gold, natural diamonds, and monumental ruby eyes united in an extraordinary 1/1 creation signed by Jorge Uquillas. Are you ready to claim this one-of-one masterwork for your private collection?',
    productSlug: 'cheeta-ring-big-rubi-diamond-18k-gold-jorge-uquillas',
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
    <div className="min-h-screen bg-[#000000] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#000000] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO
        title={t.pages.gallerySeoTitle}
        description={t.pages.gallerySeoDescription}
        image={GALLERY_COVER_IMG}
        imageAlt={GALLERY_COVER_ALT}
        keywords="RINGS LUXURY gallery, Jorge Uquillas atelier, hand engraving production, 18k gold rings process, DR Viotto ring, Cheetah ring, Sheeta ring, Rose Gold Pirate Skull ring, Tempest ring, Family Crest silver ring, bespoke signet ring, master hand engraver"
        pageType="CollectionPage"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': ['CollectionPage', 'ImageGallery'],
                '@id': `${absoluteUrl('/gallery')}#gallery`,
                url: absoluteUrl('/gallery'),
                name: `${t.pages.galleryPillarTitle}, RINGS LUXURY by Jorge Uquillas`,
                headline: `${t.pages.galleryPillarTitle} - Haute Joaillerie Hand Engraving Proofs`,
                description: t.pages.gallerySeoDescription,
                isPartOf: { '@id': `${absoluteUrl('/')}#website` },
                author: {
                  '@type': 'Person',
                  name: 'Jorge Uquillas',
                  jobTitle: 'Master Hand Engraver',
                  url: absoluteUrl('/jorge-uquillas'),
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'RINGS LUXURY',
                  url: absoluteUrl('/'),
                },
                primaryImageOfPage: {
                  '@type': 'ImageObject',
                  contentUrl: absoluteUrl(GALLERY_COVER_IMG),
                  caption: GALLERY_COVER_ALT,
                },
                mainEntity: {
                  '@type': 'ItemList',
                  numberOfItems: SHOTS.length,
                  itemListElement: SHOTS.map((s, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    item: {
                      '@type': 'ImageObject',
                      '@id': `${absoluteUrl('/gallery')}#photo-${idx + 1}`,
                      contentUrl: absoluteUrl(s.src),
                      name: s.alt,
                      caption: s.caption,
                      description: s.caption,
                      creator: {
                        '@type': 'Person',
                        name: 'Jorge Uquillas',
                      },
                      copyrightHolder: {
                        '@type': 'Organization',
                        name: 'RINGS LUXURY',
                      },
                      ...(s.productSlug
                        ? {
                            associatedMedia: {
                              '@type': 'Product',
                              url: absoluteUrl(`/produto/${s.productSlug}`),
                            },
                          }
                        : {}),
                    },
                  })),
                },
              },
              {
                '@type': 'FAQPage',
                '@id': `${absoluteUrl('/gallery')}#faq`,
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How are RINGS LUXURY rings created in the atelier?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Every RINGS LUXURY ring is a one-of-one creation cast in solid 18k gold and engraved entirely by hand with hardened steel burins by master Jorge Uquillas. No mass molds or laser cuts are used; each piece is unique and the matrix is destroyed after casting.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Which iconic rings are documented in the RINGS LUXURY production gallery?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The gallery features authentic bench production proofs of the DR. Viotto Ring, the Cheetah (Sheeta) Ring with natural rubies and diamonds, the Rose Gold Pirate Skull Ring, the Family Crest Silver Ring, the Tempest Ring, and the King Skull Ring.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I commission a bespoke signet or family crest ring seen in the gallery?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. Master Jorge Uquillas accepts bespoke private commissions for 18k gold and 925 sterling silver heraldic signet rings. Patrons can request an exclusive consultation through the atelier contact page.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <Header onOpenConsultation={scrollToContact} />

      {/* Capa da galeria no topo: opacidade reduzida + fade embaixo
          derretendo para o fundo da página */}
      <div className="relative w-full overflow-hidden">
        <ResponsiveImg
          src={GALLERY_COVER_IMG}
          alt={GALLERY_COVER_ALT}
          priority
          width={1280}
          sizes="100vw"
          height={480}
          className="w-full h-[220px] sm:h-[300px] md:h-[360px] object-cover opacity-40"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        {/* Degradê bem sutil no final da imagem no mobile */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#000000] via-[#000000]/65 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/25 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-transparent to-transparent"
        />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <Breadcrumbs
          items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.pages.galleryPillarTitle }]}
        />

        <header className="text-center mb-14">
          <p className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            {t.pages.galleryPillarKicker}
          </p>
          <h1 className="font-cinzel text-4xl md:text-6xl font-medium tracking-wide text-[#F3EFE6] mb-6">
            {t.pages.galleryPillarTitle}
          </h1>
          <p className="font-cinzel text-sm md:text-base uppercase tracking-[0.4em] text-[#E6CA85]">
            {t.pages.galleryPillarSubtitle}
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto mt-8" />
          {/* Mestre trabalhando de verdade: mãos no esmeril */}
          <figure className="relative mx-auto mt-10 max-w-3xl overflow-hidden border border-[#C5A059]/20 bg-black">
            <ResponsiveImg
              src={HERO_WORK_IMG}
              alt={HERO_WORK_ALT}
              priority
              width={1200}
              sizes="(max-width: 768px) 100vw, 768px"
              height={800}
              className="w-full h-auto object-cover"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            {/* Degradê bem sutil no final da imagem no mobile */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 inset-x-0 h-20 sm:hidden bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-transparent"
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
                className="border border-[#C5A059]/20 bg-[#050505] p-6 hover:border-[#C5A059]/50 transition-colors"
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
                className="group flex flex-col bg-[#050505] border border-[#C5A059]/15 hover:border-[#C5A059]/40 transition-all duration-500 overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#000000]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
                  <ResponsiveImg
                    src={shot.src}
                    alt={shot.alt}
                    priority={i === 0}
                    width={800}
                    height={1000}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#000000]/85 border border-[#C5A059]/30 backdrop-blur-sm">
                    <span className="font-poppins text-[10px] uppercase tracking-widest text-[#C5A059]">
                      {String(i + 1).padStart(2, '0')} / {String(SHOTS.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <figcaption className="flex flex-col flex-grow p-6">
                  <p className="font-cormorant text-base md:text-lg leading-relaxed text-[#C2BDB2] flex-grow">
                    {shot.caption}
                  </p>
                  {shot.productSlug && (
                    <Link
                      to={`/produto/${shot.productSlug}`}
                      className="mt-5 inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors font-semibold"
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

        <section className="mt-14 text-center border border-[#C5A059]/20 bg-[#050505] px-8 py-12">
          <h2 className="font-cinzel text-2xl md:text-3xl text-[#F3EFE6] mb-6">
            {t.pages.galleryCtaTitle}
          </h2>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[11px] tracking-[0.25em] uppercase rounded-full transition-colors font-semibold"
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
