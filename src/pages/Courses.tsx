import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';

export function Courses() {
  const handleOpenConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const courseModules = [
    {
      id: "01",
      title: "The Genesis of Design",
      description: "Master the ancient art of transferring thoughts into monumental jewelry designs, blending Baroque grandeur with modern precision.",
      duration: "4 Weeks",
      level: "Beginner to Intermediate"
    },
    {
      id: "02",
      title: "Artistic Engraving Fundamentals",
      description: "Learn the secrets of the burin. Hand-engraving techniques that have been passed down through generations since the Ancient Greeks.",
      duration: "6 Weeks",
      level: "Intermediate"
    },
    {
      id: "03",
      title: "The Alchemy of Metals",
      description: "Understanding the behavior of 18k Gold, Platinum, and Silver. From melting to the perfect alloy, taught directly by Jorge Uquillas.",
      duration: "3 Weeks",
      level: "All Levels"
    },
    {
      id: "04",
      title: "Advanced Gem Setting",
      description: "Micro-pavé, bezel, and tension settings. Secure the world's most precious stones with absolute confidence and invisible structural integrity.",
      duration: "8 Weeks",
      level: "Advanced"
    },
    {
      id: "05",
      title: "The Masterpiece Creation",
      description: "Your final rite of passage. Design, cast, engrave, and polish your own piece of haute joaillerie under the direct mentorship of the master.",
      duration: "10 Weeks",
      level: "Masterclass"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO 
        title="COURSES"
        description="Learn the ancient art of jewelry making and artistic engraving directly from Jorge Uquillas at the RINGS LUXURY Atelier."
        keywords="Jewelry Courses, Artistic Engraving, Jorge Uquillas, RINGS LUXURY Academy, Goldsmithing"
      />
      
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={handleOpenConsultation} />

      <main className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <header className="text-center mb-20">
          <h2 className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            The Atelier Academy
          </h2>
          <h1 className="font-cinzel text-4xl md:text-5xl font-medium tracking-wide text-[#F3EFE6] mb-8">
            Artistic Engraving & Haute Joaillerie
          </h1>
          <p className="font-cormorant text-xl text-[#A8A296] max-w-2xl mx-auto">
            Step into the sacred halls of the Rings Luxury Atelier. Learn the guarded secrets of monumental jewelry creation and hand-engraving directly from master goldsmith Jorge Uquillas.
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto mt-12" />
        </header>

        <div className="space-y-8">
          {courseModules.map((mod) => (
            <div key={mod.id} className="relative group overflow-hidden border border-[#C5A059]/20 bg-[#050505]/80 backdrop-blur-sm p-8 md:p-12 transition-all hover:border-[#C5A059]/60">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="font-cinzel text-8xl text-[#C5A059] font-bold">{mod.id}</span>
              </div>
              
              <div className="relative z-10 grid md:grid-cols-4 gap-8 items-center">
                <div className="md:col-span-3">
                  <h3 className="font-cinzel text-2xl text-[#F3EFE6] mb-4 group-hover:text-[#C5A059] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="font-cormorant text-[#A8A296] text-lg md:text-xl leading-relaxed">
                    {mod.description}
                  </p>
                </div>
                
                <div className="md:col-span-1 flex flex-col gap-2 md:items-end border-t md:border-t-0 md:border-l border-[#C5A059]/10 pt-4 md:pt-0 md:pl-8">
                  <div>
                    <span className="block font-poppins text-[10px] uppercase tracking-widest text-[#C5A059]/70 mb-1">Duration</span>
                    <span className="font-cinzel text-[#F3EFE6]">{mod.duration}</span>
                  </div>
                  <div className="mt-2">
                    <span className="block font-poppins text-[10px] uppercase tracking-widest text-[#C5A059]/70 mb-1">Level</span>
                    <span className="font-cinzel text-[#F3EFE6]">{mod.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <button 
              onClick={() => handleOpenConsultation()}
              className="relative group/btn overflow-hidden border border-[#C5A059] px-12 py-5 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 transition-colors"
            >
              <span className="relative font-poppins text-sm tracking-[0.2em] uppercase text-[#C5A059]">
                Apply for the Academy
              </span>
            </button>
        </div>
      </main>

      <div className="mt-20">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
