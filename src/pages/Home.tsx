import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { QuemSouEu } from '../components/QuemSouEu';
import { FeaturedRing } from '../components/FeaturedRing';
import { WhyChoose } from '../components/WhyChoose';
import { YouDecide } from '../components/YouDecide';
import { ShippingWorldwide } from '../components/ShippingWorldwide';
import { FolhasScroll } from '../components/FolhasScroll';
import { Atelier } from '../components/Atelier';
import { Craftsmanship } from '../components/Craftsmanship';
import { MasterpieceDetail } from '../components/MasterpieceDetail';
import { QuoteSection } from '../components/QuoteSection';
import { WorldClients } from '../components/WorldClients';
import { AtelierLocations } from '../components/AtelierLocations';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { useLanguage } from '../i18n/LanguageContext';

export function Home() {
  const { t } = useLanguage();
  const [commissionTarget, setCommissionTarget] = useState<string>('');

  const handleOpenConsultation = (pieceName?: string) => {
    if (pieceName) {
      setCommissionTarget(pieceName);
    }
    setTimeout(() => {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleEnterAtelier = () => {
    const masterpieceElem = document.getElementById('masterpiece');
    if (masterpieceElem) {
      masterpieceElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden">
      <SEO 
        title={t.home.seoTitle} 
        description={t.home.seoDescription}
      />
      {/* Universal Film Grain, DESATIVADO na Hero para ficar liso/elegante (removidas bolinhas) */}
      {/* <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" /> */}

      {/* Folhas douradas com parallax no scroll, laterais, somem elegante */}
      <FolhasScroll />

      {/* Navigation Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Sections Hierarchy */}
      <main>
        {/* I. Cinematic Hero */}
        <Hero onEnterAtelier={handleEnterAtelier} />

        {/* I.1, SOBRE MIM / QUEM SOU EU, montagem Jorge Uquillas by @vicenteczar.dev */}
        <QuemSouEu />

        {/* I.1.2, THE MASTERPIECE DETAIL / MICROSCOPIC PROVENANCE, logo após a biografia */}
        <MasterpieceDetail />

        {/* I.1.1, ANEL DE OURO 18K EM DESTAQUE, abaixo da peça em microscopic examination */}
        <FeaturedRing />

        {/* I.2, WHY CHOOSE RINGS LUXURY?, terceira seção fiel ao print */}
        <WhyChoose />

        {/* IV. The Atelier: The Hand of the Master, logo abaixo do WHY CHOOSE */}
        <Atelier />

        {/* I.3, YOU DECIDE EVERY STONE EVERY DETAIL, com carrossel do ateliê */}
        <YouDecide />

        {/* V. Craftsmanship: Five Sacred Stages, logo abaixo do YOU DECIDE */}
        <Craftsmanship />

        {/* I.4, SHIPPING WORLDWIDE, mini-carrossel de bandeiras */}
        <ShippingWorldwide />

        {/* I.5, WHAT PEOPLE SAY ABOUT RINGS LUXURY, provas sociais Google */}
        <WorldClients />

        {/* I.6, VISITS IN THE PHYSICAL WORKSHOP UNDER SCHEDULE, Miami + São Paulo */}
        <AtelierLocations />

        {/* IX. Sententia Aurea Quote */}
        <QuoteSection />

        {/* XI. Contact & Private Salon Admissions */}
        <Contact
          preselectedPiece={commissionTarget}
          onClearPreselectedPiece={() => setCommissionTarget('')}
        />
      </main>

      {/* XII. Architectural Footer */}
      <Footer />
    </div>
  );
}
