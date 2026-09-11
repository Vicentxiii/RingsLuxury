import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Collection } from '../components/Collection';
import { StatueSection } from '../components/StatueSection';
import { Atelier } from '../components/Atelier';
import { Craftsmanship } from '../components/Craftsmanship';
import { Heritage } from '../components/Heritage';
import { Gallery } from '../components/Gallery';
import { MasterpieceDetail } from '../components/MasterpieceDetail';
import { QuoteSection } from '../components/QuoteSection';
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
        title="HOME" 
        description="A cinematic luxury website for an exclusive artisan high-jewelry atelier marrying Ancient Greek monumental art, Baroque grandeur, and contemporary haute joaillerie. Pieces crafted by Jorge Uquillas."
        keywords="RINGS LUXURY, JORGE UQUILLAS, High Jewelry, Atelier, Custom Jewelry, Ancient Greek Art, Baroque"
      />
      {/* Universal Film Grain Overlay */}
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      {/* Navigation Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Sections Hierarchy */}
      <main>
        {/* I. Cinematic Hero */}
        <Hero onEnterAtelier={handleEnterAtelier} />

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

        {/* X. Contact & Private Salon Admissions */}
        <Contact
          preselectedPiece={commissionTarget}
          onClearPreselectedPiece={() => setCommissionTarget('')}
        />
      </main>

      {/* XI. Architectural Footer */}
      <Footer />
    </div>
  );
}
