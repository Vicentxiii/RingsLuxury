import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { QuemSouEu } from '../components/QuemSouEu';
import { WhyChoose } from '../components/WhyChoose';
import { FolhasScroll } from '../components/FolhasScroll';
import { Collection } from '../components/Collection';
import { StatueSection } from '../components/StatueSection';
import { Atelier } from '../components/Atelier';
import { Craftsmanship } from '../components/Craftsmanship';
import { Heritage } from '../components/Heritage';
import { Gallery } from '../components/Gallery';
import { MasterpieceDetail } from '../components/MasterpieceDetail';
import { QuoteSection } from '../components/QuoteSection';
import { WorldClients } from '../components/WorldClients';
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

        {/* I.2 — WHY CHOOSE RINGS LUXURY? — terceira seção fiel ao print */}
        <WhyChoose />

        {/* II. The Museum Collection */}
        <Collection
          onSelectPieceForCommission={(piece) => handleOpenConsultation(piece)}
        />

        {/* III. Dramatic Greek Statue Parallax Section */}
        <StatueSection />

        {/* IV. The Atelier: The Hand of the Master */}
        <Atelier />

        {/* V. Craftsmanship: Five Sacred Stages */}
        <Craftsmanship />

        {/* VI. Ancient Greek Heritage */}
        <Heritage />

        {/* VII. Baroque Private Gallery Salon */}
        <Gallery />

        {/* VIII. Masterpiece Detail & Microscopic Examination */}
        <MasterpieceDetail />

        {/* IX. Sententia Aurea Quote */}
        <QuoteSection />

        {/* X. Clients All Over The World - Social Proof for Jorge Uquillas */}
        <WorldClients />

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
