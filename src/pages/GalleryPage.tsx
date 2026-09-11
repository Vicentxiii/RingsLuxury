import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { products, getProductsByCategory } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  title: string;
  categorySlug?: string;
}

export function GalleryPage({ title, categorySlug }: GalleryPageProps) {
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

  const filteredProducts = categorySlug ? getProductsByCategory(categorySlug) : products;
  // fallback: if category has no products (legacy), show all
  const pieces = filteredProducts.length > 0 ? filteredProducts : products.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO 
        title={title}
        description={`Explore the exclusive ${title} collection by Jorge Uquillas. Cinematic luxury and Ancient Greek monumental art combined into haute joaillerie. Prices start at $5000.`}
        keywords={`RINGS LUXURY, JORGE UQUILLAS, ${title}, High Jewelry, Custom Jewelry`}
      />
      
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={() => handleOpenConsultation()} />

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <header className="text-center mb-24">
          <h2 className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            Exclusive Collection
          </h2>
          <h1 className="font-cinzel text-4xl md:text-6xl font-medium tracking-wide text-[#F3EFE6] mb-8">
            {title}
          </h1>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pieces.map((piece) => (
            <div key={piece.id} className="group flex flex-col bg-[#080808] border border-[#C5A059]/15 hover:border-[#C5A059]/40 transition-all duration-500 overflow-hidden">
              <Link to={`/produto/${piece.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#050505] block">
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
                <img 
                  src={piece.images[0]} 
                  alt={piece.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#020202]/85 border border-[#C5A059]/30 backdrop-blur-sm">
                  <span className="font-cinzel text-xs text-[#C5A059] tracking-widest">{piece.price}</span>
                </div>
                <div className="absolute top-3 right-3 z-20 px-2 py-1 bg-[#C5A059] text-[#020202]">
                  <span className="text-[7px] uppercase tracking-widest font-semibold">{piece.category}</span>
                </div>
                <div className="absolute inset-0 bg-[#020202]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase rounded-full">
                    Ver Detalhes <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 px-3 py-2 bg-gradient-to-t from-[#020202] to-transparent flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-[#E6CA85]/70">{piece.specs.edition}</span>
                  <span className={`text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${piece.inStock ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10' : 'border-red-500/40 text-red-300'}`}>{piece.inStock ? 'Disponível' : 'Sob Consulta'}</span>
                </div>
              </Link>
              
              <div className="flex flex-col flex-grow p-6">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A7B38]">{piece.subname}</span>
                <Link to={`/produto/${piece.slug}`} className="font-cinzel text-xl text-[#F3EFE6] mt-1 group-hover:text-[#C5A059] transition-colors line-clamp-1">
                  {piece.name}
                </Link>
                <p className="font-cormorant text-[#A8A296] text-base leading-relaxed mt-2 flex-grow line-clamp-2">
                  {piece.description}
                </p>
                
                <div className="mt-6 flex items-center gap-3">
                  <Link 
                    to={`/produto/${piece.slug}`}
                    className="flex-1 py-3 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-cinzel text-[10px] tracking-[0.25em] uppercase flex items-center justify-center gap-2 rounded-full transition-colors"
                  >
                    Ver Obra
                  </Link>
                  <button 
                    onClick={() => handleOpenConsultation(piece.name)}
                    className="px-5 py-3 border border-[#C5A059]/30 hover:border-[#C5A059] text-[#C5A059] hover:text-[#E6CA85] font-cinzel text-[10px] tracking-[0.2em] uppercase rounded-full transition-colors"
                  >
                    Inquire
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
