import React, { useState } from 'react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import {
  GreekKeyBorder,
  GreekMeanderDivider,
  AcanthusLeaf,
  LaurelWreath,
  ArabesqueCorner,
  ArabesqueCrest,
} from './OrnamentIcons';

// Rich luxury imagery
import emperorRingImg from '../assets/images/emperor_ring_artifact_1789071924540.jpg';
import masterpieceCuffImg from '../assets/images/masterpiece_macro_cuff_1789071946040.jpg';
import statueImg from '../assets/images/statue_darkness_eternal_1789071956592.jpg';
import artisanImg from '../assets/images/artisan_hands_engrave_1789071934811.jpg';
import heroStatueImg from '../assets/images/hero_statue_temple_1789071913515.jpg';

interface GalleryItem {
  id: string;
  title: string;
  classification: string;
  year: string;
  medium: string;
  image: string;
  colSpan: string;
  offsetY?: string;
}

export function Gallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'SOL INVICTUS SCULPTURAL SIGNET',
      classification: 'Imperial Collection • No. 04',
      year: 'Anno MMXXVI',
      medium: 'Solid 18K Antique Gold, Obsidian & Cognac Diamond',
      image: emperorRingImg,
      colSpan: 'lg:col-span-7',
      offsetY: 'lg:-translate-y-4',
    },
    {
      id: 'g-2',
      title: 'THE PYTHIAN TORQUE OF DELPHI',
      classification: 'Baroque Archival Treasure',
      year: 'Anno MMXXV',
      medium: '22K Chiseled Gold, Natural Cameo & Emeralds',
      image: masterpieceCuffImg,
      colSpan: 'lg:col-span-5',
      offsetY: 'lg:translate-y-8',
    },
    {
      id: 'g-3',
      title: 'THE SLEEPING NYMPH • HELLENISTIC MARBLE',
      classification: 'Classical Sculpture Study',
      year: 'IV Century B.C. Replica',
      medium: 'Pentelic Marble in Chiaroscuro Night',
      image: statueImg,
      colSpan: 'lg:col-span-4',
      offsetY: 'lg:translate-y-4',
    },
    {
      id: 'g-4',
      title: 'THE MASTER’S GRAVER & GOLD FLAKES',
      classification: 'Atelier Photographic Document',
      year: 'Athens Workshop',
      medium: 'Archival Platinum Print on Velvet',
      image: artisanImg,
      colSpan: 'lg:col-span-4',
      offsetY: 'lg:-translate-y-8',
    },
    {
      id: 'g-5',
      title: 'ENTABLATURE OF THE MIDNIGHT TEMPLE',
      classification: 'Baroque Architectural Panorama',
      year: 'Architectural Archive',
      medium: 'Black Marble & Antique Gilded Capitals',
      image: heroStatueImg,
      colSpan: 'lg:col-span-4',
      offsetY: 'lg:translate-y-6',
    },
  ];

  return (
    <section
      id="gallery"
      className="relative w-full py-32 md:py-44 bg-[#020202] text-[#EAE6DF] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(197,160,89,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <AcanthusLeaf className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-[#C5A059] font-medium">
              CURATORIAL SALON • CABINET OF CURIOSITIES
            </span>
            <AcanthusLeaf className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.18em] uppercase text-[#FBF9F5] font-light mb-4">
            BAROQUE GALLERY
          </h2>

          <p className="font-cormorant text-xl md:text-2xl tracking-[0.2em] italic text-[#C5A059] font-light uppercase mb-6">
            THE PRIVATE SALON OF MASTERPIECES
          </p>

          <p className="font-sans-luxury text-xs md:text-sm text-[#A8A296] tracking-[0.2em] uppercase max-w-xl mx-auto leading-relaxed">
            Arranged according to 17th-century European Wunderkammer principles, where classical antiquities, Baroque architectural fragments, and contemporary high jewelry converse in perpetual nocturnal elegance.
          </p>

          <GreekMeanderDivider className="mt-8 opacity-60" />
        </div>

        {/* Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`${item.colSpan} ${item.offsetY || ''} relative group transition-all duration-700`}
            >
              {/* Baroque Gilded Frame Simulation */}
              <div className="relative p-2 md:p-3 bg-[#080808] border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
                {/* Acanthus Crest on Top Center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#080808] px-2 border-t border-[#C5A059]/40 z-10 flex items-center justify-center">
                  <AcanthusLeaf className="w-4 h-4 text-[#C5A059]" />
                </div>

                {/* Classical Frame Corner Brackets */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]" />

                {/* Inner Image Container */}
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/11] bg-[#020202]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.92] group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000 ease-out"
                  />

                  {/* Hover Overlay with Curatorial Inspection Button */}
                  <div className="absolute inset-0 bg-[#020202]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                    <button
                      onClick={() => setActiveItem(item)}
                      className="px-6 py-2.5 border border-[#C5A059] bg-[#0A0A0A]/90 text-[#C5A059] text-[10px] uppercase font-cinzel tracking-[0.3em] flex items-center gap-2 hover:bg-[#C5A059] hover:text-[#020202] transition-all rounded-full"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect Artwork</span>
                    </button>
                  </div>
                </div>

                {/* Museum Identification Plate */}
                <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A7B38]">
                      {item.classification}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059]">
                      {item.year}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-sm md:text-base tracking-[0.16em] uppercase text-[#FBF9F5]">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[#A8A296] font-sans-luxury tracking-wide">
                    {item.medium}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / High-Res Inspection Modal with Futuristic Rounded Shell & Arabesques */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#020202]/95 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
          {/* Ambient Glow */}
          <div className="relative w-full max-w-4xl my-auto">
            <div className="absolute -inset-1.5 rounded-[36px] bg-gradient-to-b from-[#C5A059]/35 via-transparent to-[#C5A059]/25 blur-2xl opacity-75 pointer-events-none" />

            <div className="relative w-full max-h-[90vh] flex flex-col bg-[#070707]/95 border-2 border-[#C5A059]/60 rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-10 overflow-hidden shadow-[0_0_60px_rgba(197,160,89,0.25),0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-[#C5A059]/30">
              {/* Arabesque Corner Ornaments */}
              <ArabesqueCorner className="absolute -top-1 -left-1 w-20 h-20 sm:w-28 sm:h-28 text-[#C5A059] opacity-80 z-30 pointer-events-none" />
              <ArabesqueCorner className="absolute -top-1 -right-1 w-20 h-20 sm:w-28 sm:h-28 text-[#C5A059] opacity-80 z-30 pointer-events-none transform scale-x-[-1]" />
              <ArabesqueCorner className="absolute -bottom-1 -left-1 w-20 h-20 sm:w-28 sm:h-28 text-[#C5A059] opacity-80 z-30 pointer-events-none transform scale-y-[-1]" />
              <ArabesqueCorner className="absolute -bottom-1 -right-1 w-20 h-20 sm:w-28 sm:h-28 text-[#C5A059] opacity-80 z-30 pointer-events-none transform scale-x-[-1] scale-y-[-1]" />

              {/* Arabesque Center Crests */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden sm:block">
                <ArabesqueCrest className="w-36 sm:w-48 h-7 text-[#C5A059] opacity-85" />
              </div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden sm:block">
                <ArabesqueCrest className="w-36 sm:w-48 h-7 text-[#C5A059] opacity-85 transform scale-y-[-1]" />
              </div>

              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-5 right-5 z-40 p-2.5 text-[#EAE6DF]/70 hover:text-[#020202] border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#0A0A0A] hover:bg-[#C5A059] rounded-full transition-all shadow-[0_0_15px_rgba(197,160,89,0.2)]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center z-20 overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="w-full max-h-[60vh] overflow-hidden flex items-center justify-center mb-6 bg-[#020202] border border-[#C5A059]/40 rounded-2xl p-2 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[55vh] object-contain filter contrast-105 rounded-xl"
                  />
                </div>

                <div className="text-center max-w-2xl px-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">
                    {activeItem.classification} • {activeItem.year}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl tracking-[0.22em] uppercase text-[#FBF9F5] mt-1.5 mb-2">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C2BDB2] tracking-wider font-sans-luxury">
                    {activeItem.medium}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mt-32 opacity-20">
        <GreekKeyBorder className="w-full h-1" />
      </div>
    </section>
  );
}
