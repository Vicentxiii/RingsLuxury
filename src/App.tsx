import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { StatueSection } from './components/StatueSection';
import { Atelier } from './components/Atelier';
import { Craftsmanship } from './components/Craftsmanship';
import { Heritage } from './components/Heritage';
import { Gallery } from './components/Gallery';
import { MasterpieceDetail } from './components/MasterpieceDetail';
import { QuoteSection } from './components/QuoteSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { JorgeUquillasPiece } from './components/JorgeUquillasPiece';

function checkIsJorgeUquillasRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path.includes('jorge-uquillas') ||
    path.includes('laocoon') ||
    hash.includes('jorge-uquillas') ||
    hash.includes('laocoon') ||
    search.includes('jorge-uquillas')
  );
}

export default function App() {
  const [commissionTarget, setCommissionTarget] = useState<string>('');
  const [currentRoute, setCurrentRoute] = useState<'atelier' | 'jorge-uquillas'>(() => {
    return checkIsJorgeUquillasRoute() ? 'jorge-uquillas' : 'atelier';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      if (checkIsJorgeUquillasRoute()) {
        setCurrentRoute('jorge-uquillas');
      } else {
        setCurrentRoute('atelier');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToJorgeUquillas = () => {
    window.history.pushState({}, '', '#/jorge-uquillas');
    setCurrentRoute('jorge-uquillas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAtelier = () => {
    window.history.pushState({}, '', window.location.pathname.includes('jorge-uquillas') ? '/' : '#');
    setCurrentRoute('atelier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (pieceName?: string) => {
    if (pieceName) {
      setCommissionTarget(pieceName);
    }
    if (currentRoute !== 'atelier') {
      navigateToAtelier();
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

  // If user is viewing the dedicated Jorge Uquillas piece route
  if (currentRoute === 'jorge-uquillas') {
    return (
      <JorgeUquillasPiece
        onBackToAtelier={navigateToAtelier}
        onOpenConsultation={(piece) => handleOpenConsultation(piece)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden">
      {/* Universal Film Grain Overlay */}
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      {/* Navigation Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onNavigateToJorgeUquillas={navigateToJorgeUquillas}
      />

      {/* Main Sections Hierarchy */}
      <main>
        {/* I. Cinematic Hero */}
        <Hero onEnterAtelier={handleEnterAtelier} />

        {/* II. The Museum Collection */}
        <Collection
          onSelectPieceForCommission={(piece) => handleOpenConsultation(piece)}
          onNavigateToJorgeUquillas={navigateToJorgeUquillas}
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
