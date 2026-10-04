import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { ProductPaymentMethods } from '../components/ProductPaymentMethods';
import { RelatedProductsCarousel } from '../components/RelatedProductsCarousel';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQ } from '../components/FAQ';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { ArrowLeft, ChevronDown, Sparkles, Ruler, Award, Truck, ShieldCheck } from 'lucide-react';
import { GreekMeanderDivider, AncientCoinMedallion } from '../components/OrnamentIcons';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';

/** Fundo das páginas de produto. 2048x1080, escuro com veios dourados. */
const PRODUCT_BG = '/PUBLIC/Fundo da pagina de produtos Jorge Uquillas Rings Luxury.jpg';

/**
 * Corta `text` em no máximo `max` caracteres, sempre em fronteira de palavra.
 * Se o texto já cabe, devolve intacto. Se não cabe, recua até o último espaço
 * anterior ao limite e acrescenta reticências (mantendo o total ≤ max, para o
 * Google não truncar de novo).
 */
function truncateAtWord(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const hardCut = clean.slice(0, max);
  const lastSpace = hardCut.lastIndexOf(' ');
  // Se a primeira "palavra" sozinha já estoura o limite, corta no limite mesmo
  // e tira a reticência — não há fronteira de palavra a respeitar.
  const cut = lastSpace > max / 2 ? hardCut.slice(0, lastSpace) : hardCut;

  return `${cut.replace(/[\s,;:.\-–—]+$/, '')}…`;
}

export function ProductPage() {
  const { t, lang } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');

  const [selectedImage, setSelectedImage] = useState(0);
  const [commissionTarget, setCommissionTarget] = useState<string>('');
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    setShowInfo(true);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#020202] text-[#EAE6DF] flex flex-col">
        <Header onOpenConsultation={() => {}} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center relative z-10">
          <AncientCoinMedallion className="w-16 h-16 mb-6 opacity-60" />
          <h1 className="font-cinzel text-3xl tracking-[0.2em] uppercase text-[#F3EFE6] mb-4">{t.pages.productNotFoundTitle}</h1>
          <p className="font-cormorant text-lg italic text-[#A8A296] mb-8 max-w-md">
            {t.pages.productNotFoundText}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-[#020202] font-cinzel text-xs tracking-[0.3em] uppercase rounded-full hover:bg-[#E6CA85] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.pages.productNotFoundBack}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getRelatedProducts(product, 6);
  const categoryLink = product.categorySlug === 'luxuryqueens' ? '/luxuryqueens' : `/${product.categorySlug}`;
  const localizedDescription = lang === 'es' ? (product.description_es ?? product.description) : lang === 'pt' ? (product.description_pt ?? product.description) : product.description;

  const openConsultation = (pieceName?: string) => {
    if (pieceName) setCommissionTarget(pieceName);
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const pieceLabel = `${product.name} — ${product.subname} (${product.sku})`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} — ${product.subname}`,
    description: `${localizedDescription} ${product.extendedHistory}`,
    image: product.images,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'RINGS LUXURY — Jorge Uquillas' },
    material: product.specs.material,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      // Peças "Price Upon Request" (priceNumber 0): omite o preço do
      // JSON-LD em vez de publicar "$0" — preço inventado ou zerado
      // é dado estruturado enganoso e passível de ação manual.
      ...(product.priceNumber > 0 ? { price: product.priceNumber } : {}),
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      // Só com domínio definido: sem ele não existe URL absoluta para a oferta.
      ...(HAS_SITE_URL ? { url: absoluteUrl(`/produto/${product.slug}`) } : {}),
    },
  };

  // Linhas da tabela "Additional information". Tudo vem de product.specs —
  // nenhum valor hardcoded, para a ficha nunca divergir do cadastro.
  const infoRows: { label: string; value: string }[] = [
    { label: t.pages.productLabelCollor, value: product.specs.material },
    { label: t.pages.productLabelSize, value: product.specs.dimensions || t.pages.productSizeCustom },
    { label: t.pages.productLabelWeight, value: product.specs.weight },
    { label: t.pages.productLabelGems, value: product.specs.gems },
    { label: t.pages.productLabelCraftHours, value: product.specs.craftHours },
    { label: t.pages.productLabelHallmark, value: product.specs.hallmark },
    { label: t.pages.productLabelEdition, value: product.specs.edition },
    { label: t.pages.productLabelProvenance, value: product.specs.provenance },
    { label: t.pages.productLabelRef, value: product.sku },
  ];

// Meta description: usa a descrição inteira da peça (no idioma ativo),
  // cortada em fronteira de palavra. Antes concatenava
  // `extendedHistory.slice(0, 140) + '...'`, o que produzia texto de 175-200
  // caracteres truncado no meio da palavra - o Google corta de novo e exibe
  // lixo. Aqui o limite e 155, com reticencias so quando o corte e necessario.
  const metaDescription = truncateAtWord(localizedDescription, 155);

  return (
<div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={`${product.name} — ${product.subname}`}
        description={metaDescription}
        url={`/produto/${product.slug}`}
        image={product.images[0]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* FUNDO — foto fixa em todas as páginas de produto */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none" aria-hidden>
        <img
          src={PRODUCT_BG}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.13]"
        />
        {/* véu para o texto do card ganhar contraste sobre a foto */}
        <div className="absolute inset-0 bg-[#020202]/45" />
      </div>

      <Header onOpenConsultation={() => openConsultation()} />

      <main className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 pt-28 md:pt-32 pb-16">
        {/* breadcrumb + voltar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Breadcrumbs
            items={[
              { label: t.pages.productBreadcrumbHome, to: '/' },
              { label: product.category, to: categoryLink },
              { label: product.name },
            ]}
          />

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A8A296] hover:text-[#C5A059] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden /> {t.pages.productBack}
          </button>
        </div>

        {/* GRID — galeria à esquerda, card de compra à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* GALERIA */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[560px]">
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} — ${product.subname}`}
                className="w-full h-auto object-contain max-h-[62vh] mx-auto drop-shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
              />
              {product.featured && (
                <span className="absolute top-3 left-0 inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059] text-[#020202] text-[8px] uppercase tracking-[0.25em] font-semibold">
                  <Sparkles className="w-3 h-3" aria-hidden /> {t.pages.productFeatured}
                </span>
              )}
            </div>

            {/* miniaturas */}
            {product.images.length > 1 && (
              <div className="mt-6 flex justify-center gap-3">
                {product.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`${t.pages.productThumbView} ${idx + 1} ${t.pages.productThumbOf} ${product.images.length}`}
                    aria-current={selectedImage === idx}
                    className={`w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] overflow-hidden border transition-all bg-[#070707] ${
                      selectedImage === idx
                        ? 'border-[#C5A059] shadow-[0_0_18px_rgba(197,160,89,0.3)]'
                        : 'border-[#C5A059]/25 hover:border-[#C5A059]/60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CARD DE COMPRA */}
          <div className="rounded-2xl border border-[#C5A059]/45 bg-[#020202]/72 backdrop-blur-md shadow-[0_28px_70px_rgba(0,0,0,0.75)] p-6 sm:p-8 lg:p-9">
            <h1
              className="font-cinzel font-normal text-[#E6CA85] leading-tight"
              style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', letterSpacing: '0.01em' }}
            >
              {product.name}
            </h1>
            <p className="font-cormorant italic text-[#C2BDB2] text-base sm:text-lg mt-1.5">{product.subname}</p>

            <p className="mt-6 font-cinzel text-xl sm:text-2xl tracking-[0.12em] text-[#F3EFE6]">{product.price}</p>

            {/* Add to cart — não há e-commerce no projeto; este botão abre a
                consulta privada, que é o equivalente do "add to cart" para
                uma peça 1/1 sob encomenda. */}
            <div className="mt-7 flex justify-center">
              <button
                onClick={() => openConsultation(pieceLabel)}
                className="px-9 py-3.5 rounded-full bg-[#F3EFE6] text-[#020202] font-sans-luxury text-[13px] font-semibold tracking-wide hover:bg-white active:scale-[0.98] transition-all"
              >
                {t.pages.productAddToCart}
              </button>
            </div>

            {/* PayPal — ATENÇÃO: sem credenciais de PayPal no projeto, este
                botão não processa pagamento. Conecte o PayPal Checkout ou
                substitua pelo meio de pagamento real antes de publicar. */}
            <button
              onClick={() => openConsultation(`${pieceLabel} — pagamento via PayPal`)}
              className="mt-3 w-full py-3.5 rounded-[4px] bg-[#FFC439] hover:bg-[#FFB72B] active:scale-[0.995] transition-all flex items-center justify-center"
            >
              <span className="font-sans-luxury text-[19px] font-bold tracking-tight text-[#003087]">
                Pay<span className="italic">Pal</span>
              </span>
            </button>

            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#9A7B38]">
              {product.inStock ? t.pages.productInStock : t.pages.productMadeToOrder} • {t.pages.productShippingIncluded}
            </p>

            {/* toggle */}
            <button
              onClick={() => setShowInfo((v) => !v)}
              aria-expanded={showInfo}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] border border-[#C5A059]/45 text-[11px] tracking-wide text-[#EAE6DF] hover:border-[#C5A059] hover:text-[#E6CA85] transition-colors"
            >
              {t.pages.productAdditionalInfo}
              <ChevronDown className={`w-3.5 h-3.5 text-[#C5A059] transition-transform ${showInfo ? 'rotate-180' : ''}`} aria-hidden />
            </button>

            {/* tabela */}
            {showInfo && (
              <div className="mt-7 animate-fadeIn">
                <h2 className="font-cinzel font-normal text-[#E6CA85] text-xl sm:text-2xl mb-4">
                  {t.pages.productAdditionalInfo}
                </h2>
                <table className="w-full border-collapse">
                  <caption className="sr-only">{t.pages.productSpecsCaptionPrefix} {product.name}</caption>
                  <tbody>
                    {infoRows.map((row) => (
                      <tr key={row.label} className="border-b border-[#C5A059]/15 last:border-b-0">
                        <th
                          scope="row"
                          className="text-left align-top py-3 pr-3 w-[34%] font-sans-luxury text-[11px] uppercase tracking-[0.12em] text-[#EAE6DF]"
                        >
                          {row.label}
                        </th>
                        <td className="py-3 pl-4 border-l border-[#C5A059]/15 align-top font-cormorant italic text-[13px] sm:text-sm text-[#C2BDB2]">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* selos */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] uppercase tracking-[0.18em] text-[#9A7B38]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden /> {t.pages.productSealAuth}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden /> {t.pages.productSealShipping}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden /> {t.pages.productSealMeasure}
              </span>
            </div>
          </div>
        </div>

        {/* NARRATIVA — o copy longo fica abaixo do grid: some do primeiro
            impacto visual (o layout do print) e continua no HTML para SEO. */}
        <section className="mt-16 md:mt-20 max-w-3xl mx-auto text-center">
          <GreekMeanderDivider className="opacity-30 mb-8" />
          <h2 className="font-cinzel text-[#E6CA85] text-lg sm:text-xl tracking-[0.16em] uppercase mb-5">
            {product.name}
          </h2>
          <p className="font-cormorant text-lg sm:text-xl italic text-[#D8D2C4] leading-relaxed">
            “{localizedDescription}”
          </p>
          <p className="mt-5 text-sm leading-relaxed text-[#A8A296]">{product.extendedHistory}</p>
          <div className="mt-8 inline-flex items-start gap-3 text-left max-w-md">
            <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden />
            <p className="text-xs leading-relaxed text-[#C2BDB2]">
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#C5A059] mb-1">{t.pages.productSymbolism}</span>
              {product.symbolism}
            </p>
          </div>
        </section>

        {/* CUIDADOS & ENTREGA — o print não tem abas, mas este conteúdo
            existia e é necessário para conversão e para SEO. Fica abaixo do
            primeiro impacto visual para não competir com o layout do print. */}
        <section className="mt-14 md:mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[#C5A059]/25 bg-[#020202]/65 p-6">
            <h2 className="font-cinzel text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-4">{t.pages.productCareTitle}</h2>
            <div className="space-y-3 text-xs leading-relaxed text-[#A8A296]">
              <p>
                <strong className="text-[#EAE6DF]">{t.pages.productCareStoreTitle}</strong> {t.pages.productCareStoreText}
              </p>
              <p>
                <strong className="text-[#EAE6DF]">{t.pages.productCarePolishTitle}</strong> {t.pages.productCarePolishText}
              </p>
              <p>
                <strong className="text-[#EAE6DF]">{t.pages.productCareWarrantyTitle}</strong> {t.pages.productCareWarrantyText}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#C5A059]/25 bg-[#020202]/65 p-6">
            <h2 className="font-cinzel text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-4">🌍 {t.pages.productDeliveryTitle}</h2>
            <div className="space-y-3 text-xs leading-relaxed text-[#A8A296]">
              <p>{t.pages.productDeliveryWorldText}</p>
              <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#9A7B38]">
                <Award className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden /> {t.pages.productDeliveryTrack}
              </p>
            </div>
          </div>
        </section>

        {/* meios de pagamento */}
        <div className="mt-16 md:mt-20">
          <ProductPaymentMethods />
        </div>

        {/* FAQ do produto — agnóstico, igual em todas as peças */}
        <FAQ
          heading={t.pages.productFaqHeading}
          items={[
            { q: t.pages.productFaqQ1, a: t.pages.productFaqA1 },
            { q: t.pages.productFaqQ2, a: t.pages.productFaqA2 },
            { q: t.pages.productFaqQ3, a: t.pages.productFaqA3 },
            { q: t.pages.productFaqQ4, a: t.pages.productFaqA4 },
          ]}
        />

        {/* RELACIONADOS */}
        <div className="mt-8 md:mt-12 border-t border-[#C5A059]/15 pt-4">
          <RelatedProductsCarousel products={related} />
        </div>
      </main>

      <div className="relative z-10">
        <Contact preselectedPiece={commissionTarget} onClearPreselectedPiece={() => setCommissionTarget('')} />
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default ProductPage;
