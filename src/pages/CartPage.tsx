import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GreekMeanderDivider } from '../components/OrnamentIcons';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';

const CART_BG = '/PUBLIC/Fundo da pagina de produtos Jorge Uquillas Rings Luxury.webp';

export function CartPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { lines, count, subtotal, hasUponRequest, maxQtyFor, remove, setQty, clear } = useCart();

  const describe = (l: (typeof lines)[number]) =>
    lang === 'es' ? (l.product.description_es ?? l.product.description) : lang === 'pt' ? (l.product.description_pt ?? l.product.description) : l.product.description;

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden">
      <SEO title={t.pages.cartSeoTitle} description={t.pages.cartSeoDescription} url="/cart" />

      {/* FUNDO, mesma foto das páginas de produto */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none" aria-hidden>
        <img
          src={CART_BG}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.13]"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        <div className="absolute inset-0 bg-[#020202]/45" />
      </div>

      <Header onOpenConsultation={() => navigate('/contact')} />

      <main className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 pt-28 md:pt-32 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Breadcrumbs
            items={[
              { label: t.pages.productBreadcrumbHome, to: '/' },
              { label: t.pages.cartBreadcrumb },
            ]}
          />
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A8A296] hover:text-[#C5A059] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden /> {t.pages.productBack}
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">
            RINGS LUXURY • {count} {count === 1 ? '1/1' : ''}
          </p>
          <h1
            className="mt-3 font-cinzel font-normal uppercase text-[#F5EDD8]"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)', letterSpacing: '0.1em' }}
          >
            {t.pages.cartTitle}
          </h1>
          <p className="mt-3 font-cormorant text-lg italic text-[#C5A059]">{t.pages.cartSubtitle}</p>
          <GreekMeanderDivider className="mt-6 opacity-40" />
        </div>

        {lines.length === 0 ? (
          <div className="mt-12 mx-auto max-w-xl text-center rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0C0A06] to-[#020202] p-10 sm:p-14 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
            <span className="mx-auto w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-[#E6CA85]" aria-hidden />
            </span>
            <h2 className="mt-6 font-cinzel text-2xl tracking-[0.12em] uppercase text-[#F3EFE6]">{t.pages.cartEmpty}</h2>
            <p className="mt-3 font-cormorant text-lg italic text-[#A8A296]">{t.pages.cartEmptyHint}</p>
            <Link
              to="/luxury-rings"
              className="mt-8 inline-flex items-center gap-2 h-[52px] px-8 rounded-full bg-gradient-to-r from-[#9A7B38] via-[#E6CA85] to-[#C5A059] text-[#020202] font-sans-luxury text-[12px] font-bold uppercase tracking-[0.18em] hover:brightness-110 hover:shadow-[0_8px_32px_rgba(197,160,89,0.35)] active:scale-[0.98] transition-all"
            >
              {t.pages.cartEmptyCta} <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 flex justify-end">
              <button
                onClick={clear}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A8A296] hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden /> {t.pages.cartClear}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
              {/* ITENS */}
              <div className="space-y-4">
                {lines.map((l) => {
                  const max = maxQtyFor(l.slug);
                  const oneOfOne = max <= 1;
                  return (
                    <article
                      key={l.slug}
                      className="relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-[#0C0A06] to-[#060505] p-4 sm:p-5 flex gap-4 sm:gap-5"
                    >
                      <Link
                        to={`/produto/${l.product.slug}`}
                        className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(197,160,89,0.16),transparent_65%)] border border-white/[0.07] flex items-center justify-center p-2"
                      >
                        <img
                          src={l.product.images[0]}
                          alt={l.product.name}
                          loading="lazy"
                          className="max-w-full max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#9A7B38] truncate">
                          {l.product.category} • {l.product.sku}
                        </p>
                        <Link to={`/produto/${l.product.slug}`} className="hover:text-[#E6CA85] transition-colors">
                          <h2 className="mt-1 font-cinzel text-base sm:text-lg tracking-[0.1em] uppercase text-[#F3EFE6] leading-snug">
                            {l.product.name}
                          </h2>
                        </Link>
                        <p className="font-cormorant italic text-sm text-[#A8A296] truncate">{l.product.subname}</p>
                        <p className="mt-1.5 font-cormorant text-[13px] leading-snug text-[#C2BDB2] line-clamp-1">{describe(l)}</p>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                          {oneOfOne ? (
                            <span className="text-[9px] uppercase tracking-[0.22em] text-[#E6CA85] border border-[#C5A059]/30 bg-[#C5A059]/[0.07] rounded-full px-3 py-1.5">
                              {t.pages.cartOneOfOneNote}
                            </span>
                          ) : (
                            <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
                              <button
                                onClick={() => setQty(l.slug, l.qty - 1)}
                                disabled={l.qty <= 1}
                                aria-label="−"
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#E6CA85] hover:bg-[#C5A059]/15 disabled:opacity-30 transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" aria-hidden />
                              </button>
                              <span className="w-8 text-center font-cinzel text-sm text-[#F3EFE6]">{l.qty}</span>
                              <button
                                onClick={() => setQty(l.slug, l.qty + 1)}
                                disabled={l.qty >= max}
                                aria-label="+"
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#E6CA85] hover:bg-[#C5A059]/15 disabled:opacity-30 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" aria-hidden />
                              </button>
                            </div>
                          )}
                          <p className="font-cinzel text-lg tracking-[0.08em] text-[#F3EFE6]">{l.product.price}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => remove(l.slug)}
                        aria-label={t.pages.cartRemove}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-[#A8A296] hover:text-red-400 hover:bg-white/5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden />
                      </button>
                    </article>
                  );
                })}
              </div>

              {/* RESUMO */}
              <aside className="lg:sticky lg:top-28 rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0C0A06] via-[#060505] to-[#020202] shadow-[0_32px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] p-6 sm:p-7 overflow-hidden relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/70 to-transparent" aria-hidden />
                <h2 className="font-cinzel text-sm tracking-[0.28em] uppercase text-[#E6CA85]">{t.pages.cartSubtotal}</h2>
                <p className="mt-2 font-cinzel text-3xl tracking-[0.06em] text-[#F5EDD8]">{formatPrice(subtotal)}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#9A7B38]">
                  <Truck className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden /> {t.pages.cartShippingNote}
                </p>
                {hasUponRequest && (
                  <p className="mt-3 text-[11px] leading-relaxed text-[#A8A296] border-l-2 border-[#C5A059]/50 pl-3">
                    {t.pages.cartUponRequestNote}
                  </p>
                )}

                <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" aria-hidden />

                <Link
                  to="/contact"
                  className="h-[52px] rounded-full bg-gradient-to-r from-[#9A7B38] via-[#E6CA85] to-[#C5A059] text-[#020202] font-sans-luxury text-[12px] font-bold uppercase tracking-[0.18em] hover:brightness-110 hover:shadow-[0_8px_32px_rgba(197,160,89,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" aria-hidden /> {t.pages.cartConsultCta}
                </Link>
                <button
                  onClick={() => navigate('/contact')}
                  className="mt-3 h-[52px] w-full rounded-full bg-[#FFC439] hover:bg-[#FFD84D] active:scale-[0.98] transition-all flex items-center justify-center"
                >
                  <span className="font-sans-luxury text-[20px] font-bold tracking-tight text-[#003087]">
                    Pay<span className="italic">Pal</span>
                  </span>
                </button>
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-[#9A7B38]">{t.pages.cartPaypalNote}</p>

                <Link
                  to="/"
                  className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#A8A296] hover:text-[#E6CA85] transition-colors"
                >
                  {t.pages.cartContinue} <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                </Link>

                <div className="mt-5 pt-5 border-t border-white/[0.07] flex items-center justify-center gap-5 text-[9px] uppercase tracking-[0.16em] text-[#9A7B38]">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden /> {t.pages.productSealAuth}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden /> SSL
                  </span>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      <div className="relative z-10">
        <Contact />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
