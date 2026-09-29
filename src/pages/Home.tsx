import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { QuemSouEu } from '../components/QuemSouEu';
import { FeaturedRing } from '../components/FeaturedRing';
import { WhyChoose } from '../components/WhyChoose';
import { YouDecide } from '../components/YouDecide';
import { ShippingWorldwide } from '../components/ShippingWorldwide';
import { FolhasScroll } from '../components/FolhasScroll';
import { Collection } from '../components/Collection';
import { StatueSection } from '../components/StatueSection';
import { Atelier } from '../components/Atelier';
import { Craftsmanship } from '../components/Craftsmanship';
import { Heritage } from '../components/Heritage';
import { MasterpieceDetail } from '../components/MasterpieceDetail';
import { QuoteSection } from '../components/QuoteSection';
import { WorldClients } from '../components/WorldClients';
import { AtelierLocations } from '../components/AtelierLocations';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export function Home() {
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
    const collectionsElem = document.getElementById('collections');
    if (collectionsElem) {
      collectionsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden">
      <SEO 
        title="RINGS LUXURY by Jorge Uquillas — HandCrafted 18k Gold Rings | Anéis Artesanais Feitos à Mão" 
        description="RINGS LUXURY by Jorge Uquillas — Anéis artesanais 1/1 HandCrafted feitos à mão em ouro 18k com diamantes naturais, gravados com buril. Handmade 18k gold diamond rings by master artisan Jorge Uquillas. Atelier Brasil • Miami • Athens — alta joalheria autoral."
        keywords="RINGS LUXURY, JORGE UQUILLAS, anéis artesanais, HandCrafted, anéis feitos à mão ouro 18k, handmade 18k gold diamond rings, buril, anel 1/1, atelier Brasil Miami, alta joalheria"
      />
      {/* Universal Film Grain — DESATIVADO na Hero para ficar liso/elegante (removidas bolinhas) */}
      {/* <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" /> */}

      {/* Folhas douradas com parallax no scroll — laterais, somem elegante */}
      <FolhasScroll />

      {/* Navigation Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Sections Hierarchy */}
      <main>
        {/* I. Cinematic Hero */}
        <Hero onEnterAtelier={handleEnterAtelier} />

        {/* I.1 — SOBRE MIM / QUEM SOU EU — montagem Jorge Uquillas by @vicenteczar.dev */}
        <QuemSouEu />

        {/* I.1.2 — THE MASTERPIECE DETAIL / MICROSCOPIC PROVENANCE — logo após a biografia */}
        <MasterpieceDetail />

        {/* I.1.1 — ANEL DE OURO 18K EM DESTAQUE — abaixo da peça em microscopic examination */}
        <FeaturedRing />

        {/* I.2 — WHY CHOOSE RINGS LUXURY? — terceira seção fiel ao print */}
        <WhyChoose />

        {/* IV. The Atelier: The Hand of the Master — logo abaixo do WHY CHOOSE */}
        <Atelier />

        {/* I.3 — YOU DECIDE EVERY STONE EVERY DETAIL — com carrossel do ateliê */}
        <YouDecide />

        {/* V. Craftsmanship: Five Sacred Stages — logo abaixo do YOU DECIDE */}
        <Craftsmanship />

        {/* I.4 — SHIPPING WORLDWIDE — mini-carrossel de bandeiras */}
        <ShippingWorldwide />

        {/* I.5 — WHAT PEOPLE SAY ABOUT RINGS LUXURY — provas sociais Google */}
        <WorldClients />

        {/* I.6 — VISITS IN THE PHYSICAL WORKSHOP UNDER SCHEDULE — Miami + São Paulo */}
        <AtelierLocations />

        {/* II. The Museum Collection */}
        <Collection
          onSelectPieceForCommission={(piece) => handleOpenConsultation(piece)}
        />

        {/* III. Dramatic Greek Statue Parallax Section */}
        <StatueSection />

        {/* VI. Ancient Greek Heritage */}
        <Heritage />

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
