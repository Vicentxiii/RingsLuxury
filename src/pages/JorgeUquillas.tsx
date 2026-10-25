import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import contact from '../data/contact.json';
import locationsData from '../data/locations.json';
import { Instagram, ArrowLeft, ChevronDown } from 'lucide-react';

// ── Logo do favicon (PNG com fundo branco/transparente) ─────────────────────
const FAVICON_LOGO = '/PUBLIC/logo-novo-para-favcon-by-rings-luxury-site.png';

// ── Foto de Jorge Uquillas ───────────────────────────────────────────────────
const JORGE_PHOTO = '/PUBLIC/captura-de-tela-2026-09-12-185443.webp';

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
  const [openSlide, setOpenSlide] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] pb-20">
      {/* ── Hero: leão 3D pequeno via iframe ─────────────────────────────── */}
      <div className="relative w-full" style={{ height: '42vh', maxHeight: 340 }}>
        {/* iframe do leão 3D — tamanho reduzido, pointer-events desativados */}
        <iframe
          src="/jorge-uquillas.html"
          title="Jorge Uquillas 3D Ring"
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          allow="autoplay"
          loading="eager"
          style={{ background: '#000' }}
        />
        {/* Fade inferior para transição suave para o conteúdo */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" />
        {/* Fade lateral para o efeito de borda */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#020202]/60 to-transparent pointer-events-none" />
        {/* Badge de escala */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-[#C5A059]/70 bg-[#020202]/70 backdrop-blur-sm px-3 py-1 border border-[#C5A059]/20 whitespace-nowrap">
          3D Preview • scroll for story
        </div>
      </div>

      {/* ── Conteúdo editorial scrollável ───────────────────────────────── */}
      <div className="px-5 pt-2 pb-10">

        {/* Logo + título */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={FAVICON_LOGO}
            alt="Rings Luxury Logo"
            className="w-16 h-16 object-contain mb-4"
            loading="eager"
          />
          <h1 className="font-cinzel text-[#E6CA85] text-2xl tracking-[0.16em] uppercase leading-tight mb-2">
            Jorge Uquillas
          </h1>
          <p className="font-cormorant italic text-[#C5A059] text-base tracking-wider">
            Master Goldsmith &amp; Hand Engraver
          </p>
          <div className="flex items-center gap-3 mt-4 opacity-70">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="text-[#C5A059] text-[10px]">⟡</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>
        </div>

        {/* Foto de Jorge */}
        <div className="relative mb-8 border border-[#C5A059]/30 bg-[#070707] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#C5A059]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#C5A059]" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#C5A059]" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#C5A059]" />
          <img
            src={JORGE_PHOTO}
            alt="Jorge Uquillas, RINGS LUXURY HandCrafted"
            className="w-full h-auto object-cover"
            loading="eager"
          />
          <p className="mt-2 text-center text-[9px] uppercase tracking-[0.25em] text-[#9A7B38]">
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
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
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
                  <div className="px-5 pb-5 text-sm leading-relaxed text-[#A8A296] font-sans-luxury animate-[faqOpen_0.25s_ease-out]">
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
              className="border border-[#C5A059]/25 bg-[#070707] p-4 text-center"
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
          <a
            href="https://www.instagram.com/ringsluxury"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 border border-[#C5A059]/40 text-[#C5A059] font-cinzel text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#C5A059]/10 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @ringsluxury
          </a>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center gap-2 py-3.5 bg-[#C5A059] text-[#020202] font-cinzel text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#E6CA85] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Atelier
          </button>
        </div>
      </div>

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

    // Detectar mobile
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);

    // Preloader 5 s
    const t1 = setTimeout(() => setPreloaderFading(true), 4300);
    const t2 = setTimeout(() => setShowPreloader(false), 5000);
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
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

      {/* ── MOBILE: layout scrollável com leão pequeno ──────────────────── */}
      {isMobile ? (
        <div className="pt-16">
          <MobileJorgeStory onBack={() => navigate('/')} />
        </div>
      ) : (
        <>
          {/* ── DESKTOP: experiência imersiva original com iframe ─────────── */}
          <section className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-24 pb-12 px-6 sm:px-12 pointer-events-none">
            <div className="max-w-[720px] bg-[#0a0a0a]/60 backdrop-blur-sm border border-[#C5A059]/20 rounded-2xl p-8 sm:p-12 text-center text-[#EAE6DF]/90 pointer-events-auto">
              <h2 className="font-cinzel text-[#E6CA85] text-2xl sm:text-3xl tracking-[0.14em] uppercase mb-6">
                Jorge Uquillas, Master Goldsmith &amp; Hand Engraver
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Jorge Uquillas é um mestre ourives e gravador artístico, fundador da RINGS LUXURY,
                com ateliês privados em São Paulo (Avenida Paulista, Brasil) e Miami (Brickell,
                Flórida, EUA). É conhecido por anéis de diamantes em ouro 18k feitos à mão, com
                gravação por hand engraver — 90 a 140 horas de gravação por peça, diamantes
                naturais cravejados um a um sob o microscópio.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                A gravação é feita diretamente no metal maciço com buris de aço temperado, nunca a
                laser nem por máquina. Cada peça sai com contraste mestre, folheto de arquivo e
                certificado de autenticidade. A matriz de cera original é destruída após a fundição,
                então nenhuma peça pode ser reproduzida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a
                  href="/contact"
                  className="font-cinzel text-[#C5A059] tracking-[0.16em] uppercase border border-[#C5A059]/40 px-6 py-3 rounded hover:bg-[#C5A059] hover:text-[#020202] transition-colors text-sm sm:text-base"
                >
                  Consulta Privada
                </a>
                <a
                  href="/blog"
                  className="font-cinzel text-[#EAE6DF]/70 tracking-[0.16em] uppercase border border-[#C5A059]/20 px-6 py-3 rounded hover:text-[#C5A059] hover:border-[#C5A059]/60 transition-colors text-sm sm:text-base"
                >
                  Diário do Atelier
                </a>
              </div>
            </div>
          </section>

          <iframe
            src="/jorge-uquillas.html"
            title="RINGS LUXURY by Jorge Uquillas, Laocoön Bronze Horse 3D, Anéis artesanais HandCrafted ouro 18k"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
            loading="eager"
            style={{ background: '#000' }}
          />
        </>
      )}

      {/* ── PRELOADER 5s com logo PNG do favicon ─────────────────────────── */}
      {showPreloader && (
        <div
          className={`fixed inset-0 z-[99999] w-screen h-screen flex flex-col items-center justify-center bg-[#020202] transition-opacity duration-700 overflow-hidden ${
            preloaderFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/95 to-[#020202] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.18)_0%,_transparent_65%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-sm mx-auto">
            {/* Logo PNG do favicon em vez do "RL" */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#C5A059]/40 flex items-center justify-center bg-[#080808] shadow-[0_0_50px_rgba(197,160,89,0.35)] overflow-hidden p-3.5 shrink-0">
              <img
                src="/favicon.png"
                alt="Rings Luxury Logo"
                width={96}
                height={96}
                className="w-full h-full object-contain select-none"
                loading="eager"
                draggable={false}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes('logo-novo-para-favcon')) {
                    target.src = FAVICON_LOGO;
                  } else if (!target.src.includes('logo-novo-rings-luxury')) {
                    target.src = '/PUBLIC/logo-novo-rings-luxury.webp';
                  }
                }}
              />
            </div>

            <div className="space-y-3">
              <p className="font-cinzel text-[11px] tracking-[0.45em] uppercase text-[#E6CA85]">
                {t.pages.jorgePreloaderBrand}
              </p>
              <p className="font-cormorant text-2xl sm:text-3xl italic text-[#FBF9F5] tracking-[0.08em]">
                {t.pages.jorgePreloaderPiece}
              </p>
              <p className="font-sans-luxury text-[10px] tracking-[0.28em] uppercase text-[#9A7B38]">
                {t.pages.jorgePreloaderSub}
              </p>
            </div>

            {/* Barra de loading */}
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent overflow-hidden">
              <div
                className="h-full bg-[#C5A059] animate-[shimmer_1.2s_ease-in-out_infinite]"
                style={{ width: '60%' }}
              />
            </div>
            <p className="font-cinzel text-[9px] tracking-[0.35em] uppercase text-white/50">
              {t.pages.jorgePreloaderLoading}
            </p>
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
