import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../i18n/LanguageContext';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import contact from '../data/contact.json';
import locationsData from '../data/locations.json';
import { Instagram, ArrowLeft, ChevronDown, Calendar, Sparkles } from 'lucide-react';

// ── Logo do favicon (logo-cortado versao nova) ─────────────────────────────
const FAVICON_LOGO = '/PUBLIC/logo-cortado-versao-nova.webp';

// ── Foto de Jorge Uquillas (Retrato oficial em altíssima definição 1080x1350) ───
const JORGE_PHOTO = '/PUBLIC/rings-luxury-master-engraver-site.webp';

// ── Seções da história ───────────────────────────────────────────────────────
interface StorySlide {
  title: string;
  content: string;
}

const STORY_SLIDES: StorySlide[] = [
  {
    title: 'Discover the Story',
    content:
      'With over 1,000 unique 1/1 HandCrafted pieces already created — handmade 18k gold diamond rings engraved by hand — Jorge Uquillas has served clients worldwide, from São Paulo to Miami to Dubai. Each ring is a unique work, handmade without mold, eternalized in gold.',
  },
  {
    title: 'Jorge Uquillas',
    content:
      'Jorge Uquillas is a renowned Designer and Artistic Engraver of jewelry of Colombian-Ecuadorian origin. He started in a simple atelier in Bogota, following the third-generation family tradition with Master Ivan Uquillas (ECU-1996). He perfected techniques in Europe, becoming one of the greatest exponents in hand engraving of modern world jewelry. Today based in São Paulo, Brazil, he is the only exponent of this level in the country and one of the only ones on the continent, with clients in more than 50 countries.',
  },
  {
    title: 'Family Tradition',
    content:
      'A noble art passed from grandfather to grandson — three generations of master hand engravers. Jorge Uquillas learned his first techniques with the great Master Ivan Uquillas, carried the family tradition from Colombia to the ateliers of Europe, and today, in São Paulo, stands as one of the only exponents of this level on the continent. Each jewel carries this legacy, hand-carved in 18k gold.',
  },
  {
    title: 'The Sacred Workshop',
    content:
      'Every stroke of the burin is irreversible. Jorge works directly on solid metal with hardened steel gravers — never laser, never machine. Each piece exits the atelier with master contrast, an archive dossier and a certificate of authenticity. The original wax matrix is destroyed after casting, so no piece can ever be reproduced.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Mobile story layout — scrollable, richly styled, no iframe / no heavy WebGL
// ═══════════════════════════════════════════════════════════════════════════════
function MobileJorgeStory({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const [openSlide, setOpenSlide] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] pb-0">
      {/* ── Conteúdo editorial scrollável (sem 3D no mobile) ─────────────── */}
      <div className="px-5 pt-8 pb-12">

        {/* Logo + título */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={FAVICON_LOGO}
            alt="Rings Luxury Logo"
            className="w-14 h-14 object-contain mb-3 drop-shadow-[0_4px_16px_rgba(197,160,89,0.35)]"
            loading="eager"
          />
          <h1 className="font-cinzel text-[#E6CA85] text-2xl tracking-[0.16em] uppercase leading-tight mb-1.5">
            Jorge Uquillas
          </h1>
          <p className="font-cormorant italic text-[#C5A059] text-base tracking-wider">
            Master Goldsmith &amp; Hand Engraver
          </p>
          <div className="flex items-center gap-3 mt-3 opacity-70">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="text-[#C5A059] text-[10px]">⟡</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>
        </div>

        {/* Foto de Jorge com zoom e enquadramento cinematográfico */}
        <div className="relative mb-8 border border-[#C5A059]/30 bg-[#070707] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden rounded-sm">
          <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#C5A059] z-10" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#C5A059] z-10" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#C5A059] z-10" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#C5A059] z-10" />
          <div className="relative aspect-[4/5] overflow-hidden bg-black rounded-sm flex items-center justify-center">
            <img
              src={JORGE_PHOTO}
              alt="Jorge Uquillas, RINGS LUXURY HandCrafted"
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="sync"
            />
          </div>
          <p className="mt-2.5 text-center text-[9px] uppercase tracking-[0.25em] text-[#9A7B38]">
            Jorge Uquillas · Master Engraver · São Paulo, Brazil
          </p>
        </div>

        {/* Accordion da história */}
        <div className="space-y-3 mb-8">
          {STORY_SLIDES.map((slide, idx) => {
            const isOpen = openSlide === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl transition-colors duration-300 ${
                  isOpen ? 'border-[#C5A059]/60 bg-[#0a0a0a]' : 'border-[#C5A059]/20 bg-[#020202]/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenSlide(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left cursor-pointer"
                >
                  <span className="font-cinzel text-[#E6CA85] text-sm uppercase tracking-[0.18em]">
                    {slide.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A059] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-[#D8D2C4] font-sans-luxury animate-[faqOpen_0.25s_ease-out]">
                    {slide.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { num: '1,000+', label: 'Unique Pieces' },
            { num: '50+', label: 'Countries' },
            { num: '3rd Gen', label: 'Family Tradition' },
            { num: '18k Gold', label: 'Only Medium' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-[#C5A059]/25 bg-[#070707] p-4 text-center rounded-lg"
            >
              <div className="font-cinzel text-[#E6CA85] text-lg tracking-wider mb-1">
                {stat.num}
              </div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-[#9A7B38]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#9A7B38] via-[#E6CA85] to-[#C5A059] text-[#020202] font-cinzel text-[11px] font-bold uppercase tracking-[0.25em] rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Consulta Privada
          </button>
          <button
            type="button"
            onClick={() => navigate('/collections')}
            className="flex items-center justify-center gap-2 py-3.5 border border-[#C5A059]/60 text-[#E6CA85] font-cinzel text-[10px] uppercase tracking-[0.25em] rounded-full hover:bg-[#C5A059]/10 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Ver Coleções
          </button>
          <a
            href="https://www.instagram.com/ringsluxury"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 border border-[#C5A059]/30 text-[#C5A059] font-cinzel text-[10px] uppercase tracking-[0.25em] rounded-full hover:bg-[#C5A059]/10 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @ringsluxury
          </a>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes faqOpen {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main page
// ═══════════════════════════════════════════════════════════════════════════════
export function JorgeUquillas() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderFading, setPreloaderFading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    // Breakpoint alinhado com o scrollytelling desktop vs mobile
    const mq = window.matchMedia('(max-width: 900px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);

    // Preloader suave que não trava a tela por 5s
    const t1 = setTimeout(() => setPreloaderFading(true), 800);
    const t2 = setTimeout(() => setShowPreloader(false), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      mq.removeEventListener('change', handler);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showPreloader]);

  const handleOpenConsultation = () => {
    navigate('/contact');
  };

  return (
    <div className={`w-full bg-[#020202] relative ${isMobile ? '' : 'h-screen overflow-hidden'}`}>
      <Header onOpenConsultation={handleOpenConsultation} />
      <SEO
        title={t.pages.jorgeSeoTitle}
        description={t.pages.jorgeSeoDescription}
        url="/jorge-uquillas"
      />

      {/* JSON-LD E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'AboutPage',
                ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/jorge-uquillas')}#webpage` } : {}),
                ...(HAS_SITE_URL ? { url: absoluteUrl('/jorge-uquillas') } : {}),
                name: 'Jorge Uquillas, master goldsmith and hand engraver',
                inLanguage: lang,
                ...(HAS_SITE_URL
                  ? {
                      isPartOf: { '@id': `${absoluteUrl('/')}#website` },
                      about: { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` },
                    }
                  : {}),
              },
              {
                '@type': ['Person', 'ExpertPerson'],
                ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` } : {}),
                name: 'Jorge Uquillas',
                jobTitle: 'Master Goldsmith and Hand Engraver',
                description: t.pages.jorgeSeoDescription,
                ...(HAS_SITE_URL ? { url: absoluteUrl('/jorge-uquillas') } : {}),
                ...(HAS_SITE_URL
                  ? { image: absoluteUrl('/PUBLIC/rings-luxury-master-engraver-site.webp') }
                  : {}),
                worksFor: HAS_SITE_URL
                  ? { '@id': `${absoluteUrl('/')}#organization` }
                  : { '@type': 'Organization', name: 'RINGS LUXURY by Jorge Uquillas' },
                worksLocation: HAS_SITE_URL
                  ? locationsData.locations.map((l) => ({
                      '@type': 'Place',
                      name: l.label,
                      address: {
                        '@type': 'PostalAddress',
                        addressLocality: l.city,
                        addressCountry: l.countryCode,
                      },
                    }))
                  : [],
                knowsAbout: [
                  'Hand engraving',
                  'Haute joaillerie',
                  'Lost-wax casting',
                  'High-relief sculpting in gold',
                  '18k gold',
                  'Natural diamond setting',
                  'Agate burnishing',
                ],
                knowsLanguage: ['pt', 'es', 'en'],
                sameAs: contact.sameAs,
              },
            ],
          }),
        }}
      />

      <h1 className="sr-only">
        Jorge Uquillas, Master Goldsmith — 1/1 handcrafted 18k gold diamond rings, hand-engraved.
        Atelier Brazil • Miami.
      </h1>

      {/* ── MOBILE: layout scrollável nativo com 3D interativo no topo ── */}
      {isMobile ? (
        <div className="pt-14">
          <MobileJorgeStory onBack={() => navigate('/')} />
        </div>
      ) : (
        <>
          {/* Conteúdo mantido para leitores de tela e SEO (E-E-A-T), sem bloquear o visual */}
          <div className="sr-only">
            <h2>Jorge Uquillas, Master Goldsmith &amp; Hand Engraver</h2>
            <p>
              Jorge Uquillas é um mestre ourives e gravador artístico, fundador da RINGS LUXURY,
              com ateliês privados em São Paulo (Avenida Paulista, Brasil) e Miami (Brickell,
              Flórida, EUA). É conhecido por anéis de diamantes em ouro 18k feitos à mão, com
              gravação por hand engraver — 90 a 140 horas de gravação por peça, diamantes
              naturais cravejados um a um sob o microscópio.
            </p>
            <p>
              A gravação é feita diretamente no metal maciço com buris de aço temperado, nunca a
              laser nem por máquina. Cada peça sai com contraste mestre, folheto de arquivo e
              certificado de autenticidade. A matriz de cera original é destruída após a fundição,
              então nenhuma peça pode ser reproduzida.
            </p>
          </div>

          <iframe
            src="/jorge-uquillas.html"
            title="RINGS LUXURY by Jorge Uquillas, Laocoön Bronze Horse 3D, Anéis artesanais HandCrafted ouro 18k"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
            loading="eager"
            style={{ background: '#000' }}
            onLoad={() => {
              setPreloaderFading(true);
              setTimeout(() => setShowPreloader(false), 300);
            }}
          />
        </>
      )}

      {/* ── PRELOADER suave ── */}
      {showPreloader && (
        <div
          className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col items-center justify-center bg-[#020202] transition-opacity duration-500 overflow-hidden ${
            preloaderFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/95 to-[#020202] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.18)_0%,_transparent_65%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-sm mx-auto">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#C5A059]/40 flex items-center justify-center bg-[#080808] shadow-[0_0_50px_rgba(197,160,89,0.35)] overflow-hidden p-3 shrink-0">
              <img
                src={FAVICON_LOGO}
                alt="Rings Luxury Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain select-none"
                loading="eager"
                draggable={false}
              />
            </div>

            <div className="space-y-2">
              <p className="font-cinzel text-[10px] tracking-[0.4em] uppercase text-[#E6CA85]">
                {t.pages.jorgePreloaderBrand}
              </p>
              <p className="font-cormorant text-2xl italic text-[#FBF9F5] tracking-[0.08em]">
                {t.pages.jorgePreloaderPiece}
              </p>
            </div>

            <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent overflow-hidden">
              <div
                className="h-full bg-[#C5A059] animate-[shimmer_1.2s_ease-in-out_infinite]"
                style={{ width: '60%' }}
              />
            </div>
          </div>

          <style>{`
            @keyframes shimmer {
              0%   { transform: translateX(-100%); }
              100% { transform: translateX(260%); }
            }
          `}</style>
        </div>
      )}

      {/* Fallback sem JS */}
      <noscript>
        <div className="absolute inset-0 flex items-center justify-center bg-[#020202] text-[#C5A059]">
          <div style={{ maxWidth: 640, padding: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#A8A296' }}>{t.pages.jorgeSeoDescription}</p>
            <p style={{ fontSize: 14, marginTop: 12 }}>{t.pages.jorgeNoscript}</p>
          </div>
        </div>
      </noscript>
    </div>
  );
}

export default JorgeUquillas;
