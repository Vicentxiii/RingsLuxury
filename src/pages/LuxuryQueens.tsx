import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { getProductsByCategory } from '../data/products';
import { ArrowRight } from 'lucide-react';

export function LuxuryQueens() {
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

  const queensPieces = getProductsByCategory('luxuryqueens');

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO 
        title="LUXURY QUEENS"
        description="Discover the LUXURY QUEENS collection by Jorge Uquillas. Exclusive, high-end female jewelry masterpieces starting at $5000."
        keywords="RINGS LUXURY, JORGE UQUILLAS, LUXURY QUEENS, Female Jewelry, Engagement Rings, Diamond Rings"
      />
      
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={() => handleOpenConsultation()} />

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <header className="text-center mb-24">
          <h2 className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            Feminine Elegance
          </h2>
          <h1 className="font-cinzel text-4xl md:text-6xl font-medium tracking-wide text-[#F3EFE6] mb-8">
            LUXURY QUEENS
          </h1>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {queensPieces.map((piece) => (
            <div key={piece.id} className="group flex flex-col bg-[#080808] border border-[#C5A059]/15 hover:border-[#C5A059]/40 transition-all overflow-hidden">
              <Link to={`/produto/${piece.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#050505] block rounded-t-full mx-3 mt-3">
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
                <img 
                  src={piece.images[0]} 
                  alt={piece.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-6 right-1/2 translate-x-1/2 z-20 bg-[#020202]/80 backdrop-blur-sm px-4 py-2 border border-[#C5A059]/30 rounded-full">
                  <span className="font-cinzel text-sm text-[#C5A059] tracking-widest">{piece.price}</span>
                </div>
                <div className="absolute inset-0 bg-[#020202]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full">
                    Ver Obra <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
              
              <div className="flex flex-col flex-grow p-6 text-center">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A7B38]">{piece.subname}</span>
                <Link to={`/produto/${piece.slug}`} className="font-cinzel text-xl text-[#F3EFE6] mt-1 group-hover:text-[#C5A059] transition-colors">
                  {piece.name}
                </Link>
                <p className="font-cormorant text-[#A8A296] text-base leading-relaxed mt-2 flex-grow px-2 line-clamp-2">
                  {piece.description}
                </p>
                
                <div className="mt-6 flex flex-col gap-3">
                  <Link 
                    to={`/produto/${piece.slug}`}
                    className="mx-auto inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors"
                  >
                    Ver Detalhes <ArrowRight className="w-3 h-3" />
                  </Link>
                  <button 
                    onClick={() => handleOpenConsultation(piece.name)}
                    className="mx-auto text-[10px] tracking-[0.25em] uppercase text-[#9A7B38] hover:text-[#C5A059] transition-colors"
                  >
                    ou Solicitar Consulta •
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="mt-20">
        <Contact preselectedPiece={commissionTarget} onClearPreselectedPiece={() => setCommissionTarget('')} />
      </div>

      <Footer />
    </div>
  );
}
