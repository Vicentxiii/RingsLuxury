import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import contact from '../data/contact.json';
import locationsData from '../data/locations.json';

export function JorgeUquillas() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderFading, setPreloaderFading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    // Preloader de 5s com a peça 3D antes de revelar o iframe
    const t1 = setTimeout(() => setPreloaderFading(true), 4300);
    const t2 = setTimeout(() => setShowPreloader(false), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleOpenConsultation = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="w-full h-screen bg-[#020202] relative overflow-hidden">
      <Header onOpenConsultation={handleOpenConsultation} />
      <SEO
        title={t.pages.jorgeSeoTitle}
        description={t.pages.jorgeSeoDescription}
        url="/jorge-uquillas"
      />
      {/*
          E-E-A-T. Sem isso o Google e as IAs veem so um iframe vazio: nenhuma
          biografia, nenhuma credencial, nenhuma prova de quem fez a peça.

          `ExpertPerson` e o tipo certo (subtipo de Person) para alguem cuja
          autoridade expert e o argumento de venda. O `hasCredential` fica
          vazio de proposito: so entra com titulo/ano REAL, credencial inventada
          e exatamente o tipo de coisa que derruba Confianca quando被发现.
        */}
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
                  ? { isPartOf: { '@id': `${absoluteUrl('/')}#website` }, about: { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` } }
                  : {}),
              },
              {
                '@type': ['Person', 'ExpertPerson'],
                ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` } : {}),
                name: 'Jorge Uquillas',
                jobTitle: 'Master Goldsmith and Hand Engraver',
                description: t.pages.jorgeSeoDescription,
                ...(HAS_SITE_URL ? { url: absoluteUrl('/jorge-uquillas') } : {}),
                ...(HAS_SITE_URL ? { image: absoluteUrl('/PUBLIC/rings-luxury-master-engraver-site.webp') } : {}),
                worksFor: HAS_SITE_URL
                  ? { '@id': `${absoluteUrl('/')}#organization` }
                  : { '@type': 'Organization', name: 'RINGS LUXURY by Jorge Uquillas' },
                // Fatos do maker, todos publicados no site: os dois atelieis e a
                // clientela em 50+ paises.
                worksLocation: HAS_SITE_URL
                  ? locationsData.locations.map((l) => ({
                      '@type': 'Place',
                      name: l.label,
                      address: { '@type': 'PostalAddress', addressLocality: l.city, addressCountry: l.countryCode },
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
      {/* H1 para SEO/leitores de tela: invisível, não muda o visual imersivo */}
      <h1 className="sr-only">
        Jorge Uquillas, Master Goldsmith — 1/1 handcrafted 18k gold diamond rings, hand-engraved. Atelier Brazil • Miami.
      </h1>
      {/* Iframe que carrega a experiência imersiva completa, pocket watch 3D */}
      {/*
          Corpo visivel fora do iframe, com sr-only para nao alterar o design.
          A pagina e 100% um iframe 3D: para o Google, para as IAs e para quem
          desliga JS/3D, este texto e a UNICA bio legivel que existe. Sem ele,
          a pagina de autoria do maker (o principal ativo de E-E-A-T do site)
          nao tinha uma unica frase de conteudo.
        */}
      <div className="sr-only">
        <h2>Who is Jorge Uquillas</h2>
        <p>
          Jorge Uquillas is a master goldsmith and hand engraver, founder of RINGS LUXURY, with
          private ateliers in São Paulo (Avenida Paulista, Brazil) and Miami (Brickell, Florida,
          USA). He is known for 1/1 handmade 18k gold diamond rings engraved with hand gravers,
          running 90 to 140 hours of hand engraving per piece, with hand-selected natural
          diamonds set one by one under the microscope.
        </p>
        <h2>His technique</h2>
        <p>
          Jorge Uquillas holds the hand engraver himself: the engraving is cut directly into the
          solid metal with tempered-steel gravers, never by laser or machine, and every piece
          leaves with a master hallmark, an archival folio and a certificate of authenticity.
          The original wax matrix is destroyed after casting, so no client piece can ever be
          reproduced.
        </p>
        <h2>Teaching</h2>
        <p>
          He teaches the same discipline at the atelier academy, in a program of design,
          artistic engraving fundamentals, the alchemy of metals, advanced gem setting and the
          final masterpiece.
        </p>
        <h2>Clients and consultations</h2>
        <p>
          Clients in 50+ countries are received in person at the São Paulo and Miami ateliers, or
          by private video consultation.
        </p>
        <p>
          <a href="/blog">Journal of the atelier</a> · <a href="/faq">Frequently asked questions</a>{' '}
          · <a href="/contact">Request a private consultation</a>
        </p>
      </div>

      <iframe
        src="/jorge-uquillas.html"
        title="RINGS LUXURY by Jorge Uquillas, Laocoön Bronze Horse 3D, Anéis artesanais HandCrafted ouro 18k"
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
        loading="eager"
        style={{ background: '#000' }}
      />

      {/* Preloader 5s com mini preview da peça 3D antes de entrar */}
      {showPreloader && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020202] transition-opacity duration-700 ${preloaderFading ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/90 to-[#020202] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.12)_0%,_transparent_65%)] pointer-events-none" />
          <div className="relative flex flex-col items-center gap-8 px-6 text-center">
            <div className="w-20 h-20 rounded-full border border-[#C5A059]/30 flex items-center justify-center bg-[#0a0805] shadow-[0_0_40px_rgba(197,160,89,0.25)]">
              <span className="font-cinzel text-[10px] tracking-[0.32em] text-[#C5A059]">RL</span>
            </div>
            <div className="space-y-3">
              <p className="font-cinzel text-[11px] tracking-[0.45em] uppercase text-[#E6CA85]">{t.pages.jorgePreloaderBrand}</p>
              <p className="font-cormorant text-2xl sm:text-3xl italic text-[#FBF9F5] tracking-[0.08em]">{t.pages.jorgePreloaderPiece}</p>
              <p className="font-sans-luxury text-[10px] tracking-[0.28em] uppercase text-[#9A7B38]">{t.pages.jorgePreloaderSub}</p>
            </div>
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent overflow-hidden">
              <div className="h-full bg-[#C5A059] animate-[shimmer_1.2s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>
            <p className="font-cinzel text-[9px] tracking-[0.35em] uppercase text-white/50">{t.pages.jorgePreloaderLoading}</p>
          </div>
        </div>
      )}

      {/* Fallback / Loader enquanto iframe carrega */}
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
