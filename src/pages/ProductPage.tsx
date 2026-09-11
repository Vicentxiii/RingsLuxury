import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { ProductPaymentMethods } from '../components/ProductPaymentMethods';
import { RelatedProductsCarousel } from '../components/RelatedProductsCarousel';
import { getProductBySlug, getRelatedProducts, products } from '../data/products';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Gem,
  Clock,
  BadgeCheck,
  Scale,
  Ruler,
  Heart,
  Share2,
  ChevronDown,
  Check,
  Truck,
  Instagram,
  Eye,
  Layers,
  Award,
  Info,
} from 'lucide-react';
import { GreekMeanderDivider, GreekKeyBorder, AncientCoinMedallion, AcanthusLeaf } from '../components/OrnamentIcons';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'dossier' | 'specs' | 'cuidados' | 'entrega'>('dossier');
  const [commissionTarget, setCommissionTarget] = useState<string>('');
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareCopied, setShowShareCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    setActiveTab('dossier');
    setQty(1);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#020202] text-[#EAE6DF] flex flex-col">
        <Header onOpenConsultation={() => {}} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
          <AncientCoinMedallion className="w-16 h-16 mb-6 opacity-60" />
          <h1 className="font-cinzel text-3xl tracking-[0.2em] uppercase text-[#F3EFE6] mb-4">Obra Não Encontrada</h1>
          <p className="font-cormorant text-lg italic text-[#A8A296] mb-8 max-w-md">
            Esta peça não consta em nosso arquivo ateniense. Explore nossa coleção curatorial.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-[#020202] font-cinzel text-xs tracking-[0.3em] uppercase rounded-full hover:bg-[#E6CA85] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Atelier
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getRelatedProducts(product, 6);
  const breadcrumbCategoryLink = product.categorySlug === 'luxuryqueens' ? '/luxuryqueens' : `/${product.categorySlug}`;

  const handleOpenConsultation = (pieceName?: string) => {
    if (pieceName) setCommissionTarget(pieceName);
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShowShareCopied(true);
      setTimeout(() => setShowShareCopied(false), 2500);
    } catch {
      // fallback
      setShowShareCopied(true);
      setTimeout(() => setShowShareCopied(false), 2500);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} — ${product.subname}`,
    description: product.description + ' ' + product.extendedHistory,
    image: product.images,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'RINGS LUXURY — Jorge Uquillas' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.priceNumber,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      url: `https://ringsluxury.com/produto/${product.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={`${product.name} — ${product.subname}`}
        description={`${product.description} ${product.extendedHistory.slice(0, 140)}...`}
        keywords={`RINGS LUXURY, ${product.name}, ${product.category}, Jorge Uquillas, High Jewelry`}
        url={`/produto/${product.slug}`}
        image={product.images[0]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      {/* Breadcrumb & Back */}
      <div className="pt-24 md:pt-28 pb-4 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <nav className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#9A7B38]">
          <Link to="/" className="hover:text-[#C5A059] transition-colors">
            Atelier
          </Link>
          <span className="text-[#C5A059]/40">/</span>
          <Link to={breadcrumbCategoryLink} className="hover:text-[#C5A059] transition-colors">
            {product.category}
          </Link>
          <span className="text-[#C5A059]/40">/</span>
          <span className="text-[#C5A059]">{product.name}</span>
        </nav>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#A8A296] hover:text-[#C5A059] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Voltar
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pb-12 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main image frame */}
            <div className="relative border border-[#C5A059]/30 bg-[#070707] p-2 md:p-3 shadow-[0_30px_80px_rgba(0,0,0,0.9)] group">
              {/* corners */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C5A059] z-20" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C5A059] z-20" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C5A059] z-20" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C5A059] z-20" />

              <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[5/4] overflow-hidden bg-[#020202]">
                <img
                  src={product.images[selectedImage]}
                  alt={`${product.name} — view ${selectedImage + 1}`}
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.98] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/40 via-transparent to-transparent pointer-events-none" />

                {/* badges overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-[#020202]/85 border border-[#C5A059]/40 backdrop-blur-md text-[9px] uppercase tracking-[0.3em] text-[#E6CA85]">
                    {product.specs.edition}
                  </span>
                  {product.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059] text-[#020202] text-[9px] uppercase tracking-[0.25em] font-semibold">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 text-[9px] uppercase tracking-widest border backdrop-blur-md ${product.inStock ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-red-500/15 border-red-500/40 text-red-300'}`}>
                    {product.inStock ? '● Disponível' : '○ Sob Consulta'}
                  </span>
                  <span className="px-3 py-1 bg-[#020202]/85 border border-[#C5A059]/20 text-[8px] uppercase tracking-[0.3em] text-[#9A7B38]">
                    Ref: {product.sku}
                  </span>
                </div>

                {/* zoom hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-4 py-1.5 bg-[#020202]/80 border border-[#C5A059]/30 backdrop-blur-md text-[9px] uppercase tracking-[0.25em] text-[#C5A059]">
                  <Eye className="w-3.5 h-3.5" /> Alta Resolução • Atelier Archive
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[4/3] overflow-hidden border-2 transition-all p-1 bg-[#070707] ${
                    selectedImage === idx ? 'border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.3)]' : 'border-[#C5A059]/20 hover:border-[#C5A059]/50'
                  }`}
                  aria-label={`Ver imagem ${idx + 1}`}
                >
                  <img src={img} alt={`thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  {selectedImage === idx && <span className="absolute inset-0 ring-1 ring-inset ring-[#C5A059]/40 pointer-events-none" />}
                </button>
              ))}
            </div>

            {/* Trust row under gallery - desktop only */}
            <div className="hidden md:flex items-center justify-between pt-2 text-[9px] uppercase tracking-[0.25em] text-[#9A7B38]">
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Certificado GIA Incluso
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" /> Envio Segurado Global
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Garantia de Autenticidade
              </span>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Category & Title */}
            <div className="border-b border-[#C5A059]/15 pb-6">
              <div className="flex items-center gap-3 mb-3">
                <AcanthusLeaf className="w-4 h-4 text-[#C5A059]" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">{product.category} • Athens Atelier</span>
              </div>
              <h1 className="font-cinzel text-3xl md:text-4xl tracking-[0.16em] uppercase text-[#FBF9F5] leading-tight">
                {product.name}
              </h1>
              <p className="font-cormorant text-xl italic text-[#C5A059] tracking-wide mt-1">{product.subname}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="font-cinzel text-2xl tracking-widest text-[#C5A059]">{product.price}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#9A7B38] border border-[#C5A059]/20 px-3 py-1 bg-[#0A0A0A]">
                  ou 12x de {(product.priceNumber / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })} sem juros
                </span>
              </div>

              <p className="mt-3 text-[10px] tracking-widest uppercase text-[#9A7B38]">
                SKU {product.sku} • {product.specs.hallmark} • {product.specs.weight}
              </p>

              {/* short description */}
              <p className="font-cormorant text-lg italic leading-relaxed text-[#D8D2C4] mt-5">"{product.description}"</p>
              <p className="font-sans-luxury text-xs leading-relaxed tracking-wider text-[#A8A296] mt-3">{product.extendedHistory}</p>

              {/* symbolism highlight */}
              <div className="mt-5 p-4 bg-[#0A0A0A] border-l-2 border-[#C5A059]">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Simbolismo
                </span>
                <p className="text-xs text-[#C2BDB2] leading-relaxed">{product.symbolism}</p>
              </div>
            </div>

            {/* Options: Size / Qty */}
            <div className="py-6 border-b border-[#C5A059]/15 space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#9A7B38] mb-2">Tamanho / Medida *</label>
                  <div className="relative">
                    <select
                      defaultValue=""
                      className="w-full appearance-none bg-[#0A0A0A] border border-[#C5A059]/30 text-[#F3EFE6] font-cinzel text-xs tracking-widest px-4 py-3.5 pr-8 focus:outline-none focus:border-[#C5A059] cursor-pointer"
                    >
                      <option value="" disabled>
                        Selecione — Sob medida incluso
                      </option>
                      <option>US 5 • 15.7mm</option>
                      <option>US 6 • 16.5mm</option>
                      <option>US 7 • 17.3mm</option>
                      <option>US 8 • 18.1mm</option>
                      <option>US 9 • 18.9mm</option>
                      <option>US 10 • 19.8mm</option>
                      <option>US 11 • 20.6mm</option>
                      <option>US 12 • 21.4mm</option>
                      <option>Sob medida — Consultar atelier</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] pointer-events-none" />
                  </div>
                  <p className="text-[9px] tracking-wide text-[#9A7B38] mt-1.5">Ajuste gratuito em até 7 dias. Guia de medidas incluso.</p>
                </div>

                <div className="w-full sm:w-32">
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-[#9A7B38] mb-2">Qtd.</label>
                  <div className="flex items-center border border-[#C5A059]/30 bg-[#0A0A0A]">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-[46px] flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-cinzel text-sm text-[#F3EFE6]">{qty}</span>
                    <button
                      onClick={() => setQty((q) => Math.min(5, q + 1))}
                      className="w-10 h-[46px] flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => handleOpenConsultation(`${product.name} — ${product.subname} (${product.sku}) x${qty}`)}
                  className="group w-full py-5 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-xs font-semibold tracking-[0.3em] uppercase flex items-center justify-center gap-3 rounded-full shadow-[0_0_30px_rgba(197,160,89,0.25)] hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] hover:scale-[1.01] transition-all"
                >
                  <span>Solicitar Aquisição Privada</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.instagram.com/ringsluxury"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 border border-[#C5A059]/30 hover:border-[#C5A059] text-[#C5A059] hover:text-[#E6CA85] hover:bg-[#C5A059]/10 font-cinzel text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 rounded-full transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5" /> Instagram
                  </a>
                  <button
                    onClick={handleShare}
                    className="py-3.5 border border-[#C5A059]/30 hover:border-[#C5A059] text-[#EAE6DF] hover:text-[#C5A059] font-cinzel text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 rounded-full transition-all relative"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Compartilhar
                    {showShareCopied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C5A059] text-[#020202] text-[9px] tracking-widest uppercase rounded-full whitespace-nowrap animate-fadeIn">
                        Link copiado!
                      </span>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-full py-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] transition-colors ${isWishlisted ? 'text-[#C5A059]' : 'text-[#9A7B38] hover:text-[#C5A059]'}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
                  {isWishlisted ? 'Salvo na Lista Privada' : 'Salvar na Lista Privada'}
                </button>
              </div>

              {/* reassurance mini */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-[#050505] border border-[#C5A059]/15">
                  <Truck className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                  <span className="block text-[8px] uppercase tracking-widest text-[#C2BDB2]">Entrega Segurada</span>
                </div>
                <div className="p-2 bg-[#050505] border border-[#C5A059]/15">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                  <span className="block text-[8px] uppercase tracking-widest text-[#C2BDB2]">Autenticidade Vitalícia</span>
                </div>
                <div className="p-2 bg-[#050505] border border-[#C5A059]/15">
                  <Award className="w-4 h-4 text-[#C5A059] mx-auto mb-1" />
                  <span className="block text-[8px] uppercase tracking-widest text-[#C2BDB2]">Atelier 7 Dias</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="pt-2">
              <div className="flex border-b border-[#C5A059]/20 overflow-x-auto scrollbar-none">
                {[
                  { id: 'dossier', label: 'Dossier' },
                  { id: 'specs', label: 'Especificações' },
                  { id: 'cuidados', label: 'Cuidados' },
                  { id: 'entrega', label: 'Entrega' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`whitespace-nowrap pb-3 pt-2 mr-6 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors relative ${activeTab === tab.id ? 'text-[#C5A059]' : 'text-[#EAE6DF]/50 hover:text-[#EAE6DF]'}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-px bg-[#C5A059]" />}
                  </button>
                ))}
              </div>

              <div className="py-6 min-h-[220px]">
                {activeTab === 'dossier' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-start gap-3">
                      <Layers className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">História & Proveniência</span>
                        <p className="text-xs leading-relaxed text-[#A8A296] mt-1">
                          Inspirada por tesouros escavados na Ática clássica, reinterpretada através da simetria cerimonial do alto barroco. Registrada e micro-hallmarked pelo Mestre Artesão com o selo da Coruja Ateniense.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">Apresentação</span>
                        <p className="text-xs leading-relaxed text-[#A8A296] mt-1">
                          Acompanha estojo de mármore negro sob medida, luvas de arquivista, certificado numerado e carta manuscrita do atelier. Embalagem externa discreta sem menção de valor.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                        <span className="text-[8px] uppercase tracking-[0.2em] text-[#9A7B38] block">Proveniência</span>
                        <span className="font-cinzel text-xs text-[#F3EFE6]">{product.specs.provenance}</span>
                      </div>
                      <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                        <span className="text-[8px] uppercase tracking-[0.2em] text-[#9A7B38] block">Edição</span>
                        <span className="font-cinzel text-xs text-[#F3EFE6]">{product.specs.edition}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-3 animate-fadeIn">
                    <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#9A7B38] flex items-center gap-1">
                        <Gem className="w-3 h-3" /> Metal
                      </span>
                      <span className="font-cormorant text-sm text-[#F3EFE6] leading-tight block mt-1">{product.specs.material}</span>
                    </div>
                    <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#9A7B38] flex items-center gap-1">
                        <Scale className="w-3 h-3" /> Peso Líquido
                      </span>
                      <span className="font-cinzel text-sm text-[#F3EFE6] block mt-1">{product.specs.weight}</span>
                    </div>
                    <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#9A7B38] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Gemas
                      </span>
                      <span className="font-cormorant text-sm text-[#F3EFE6] leading-tight block mt-1">{product.specs.gems}</span>
                    </div>
                    <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#9A7B38] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Horas de Artesão
                      </span>
                      <span className="font-cinzel text-sm text-[#F3EFE6] block mt-1">{product.specs.craftHours}</span>
                    </div>
                    <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20 col-span-2">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#9A7B38] flex items-center gap-1">
                        <Ruler className="w-3 h-3" /> Dimensões & Hallmark
                      </span>
                      <span className="font-cormorant text-sm text-[#F3EFE6] block mt-1">
                        {product.specs.dimensions} • {product.specs.hallmark}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-[10px] text-[#9A7B38] pt-1">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" /> Todos os metais certificados • Diamantes com laudo
                    </div>
                  </div>
                )}

                {activeTab === 'cuidados' && (
                  <div className="space-y-3 text-xs leading-relaxed text-[#A8A296] animate-fadeIn">
                    <p>
                      <strong className="text-[#F3EFE6]">Conservação:</strong> Guarde sempre no estojo de mármore com sílica. Evite perfume direto sobre a peça. Limpeza a seco com flanela do atelier inclusa.
                    </p>
                    <p>
                      <strong className="text-[#F3EFE6]">Polimento vitalício gratuito</strong> no atelier de Atenas, Paris ou Genebra mediante agendamento. Banho de ródio para ouro branco incluso anualmente.
                    </p>
                    <p>
                      <strong className="text-[#F3EFE6]">Garantia:</strong> Vitalícia contra defeito de fabricação. Micro-ajustes e gravação adicional sob consulta.
                    </p>
                  </div>
                )}

                {activeTab === 'entrega' && (
                  <div className="space-y-3 text-xs leading-relaxed text-[#A8A296] animate-fadeIn">
                    <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059]">Brasil & América do Sul</span>
                      <p className="mt-1">3-6 dias úteis • Seguro Brinks • Caixa de mármore negro + embalagem externa neutra. Frete incluso para aquisições acima de $5,000.</p>
                    </div>
                    <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059]">Global — Europa & EUA & Oriente Médio</span>
                      <p className="mt-1">2-4 dias via Malca-Amit / Ferrari • Seguro integral até a entrega • Hand delivery disponível em Atenas, Paris, Genebra, Dubai, Miami.</p>
                    </div>
                    <p className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#9A7B38]">
                      <Check className="w-3 h-3 text-emerald-500" /> Rastreamento criptografado • Assinatura obrigatória
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 md:mt-16">
          <ProductPaymentMethods />
        </div>

        {/* Related Carousel */}
        <div className="mt-8 md:mt-12 border-t border-[#C5A059]/15 pt-4">
          <RelatedProductsCarousel products={related} />
        </div>

        {/* SEO narrative */}
        <div className="mt-8 text-center">
          <GreekMeanderDivider className="opacity-30 mb-8" />
          <p className="font-cormorant text-sm italic text-[#9A7B38] max-w-2xl mx-auto">
            Todas as peças são esculpidas à mão por Jorge Uquillas no atelier ateniense. Cada aquisição inclui consulta privada, certificado e apresentação cerimonial.
          </p>
        </div>
      </main>

      {/* Contact anchor */}
      <div className="mt-4">
        <Contact preselectedPiece={commissionTarget} onClearPreselectedPiece={() => setCommissionTarget('')} />
      </div>

      <Footer />
    </div>
  );
}
