import React from 'react';
import { GreekKeyBorder, GreekMeanderDivider, AcanthusLeaf } from './OrnamentIcons';
import artisanImg from '../assets/images/artisan_hands_engrave_1789071934811.jpg';
import emperorRingImg from '../assets/images/emperor_ring_artifact_1789071924540.jpg';

export function Atelier() {
  return (
    <section
      id="atelier"
      className="relative w-full py-32 md:py-44 bg-[#050505] text-[#EAE6DF] overflow-hidden"
    >
      {/* Background Black Marble Veins & Ambient Gradients */}
      <div className="absolute inset-0 bg-black-marble opacity-60" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Large Editorial Typography & Story */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2">
              <AcanthusLeaf className="w-4 h-4 text-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">
                THE SACRED WORKSHOP • ATHÈNES
              </span>
            </div>

            {/* Large Typography: THE HAND OF THE MASTER */}
            <h2
              id="atelier-heading"
              className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.16em] uppercase text-[#FBF9F5] font-light leading-[1.12]"
            >
              THE HAND
              <br />
              <span className="font-decorative text-3xl sm:text-4xl md:text-5xl text-[#C5A059] italic">
                OF THE MASTER
              </span>
            </h2>

            {/* Text: Every masterpiece begins with an idea... */}
            <blockquote className="font-cormorant text-2xl sm:text-3xl italic text-[#EAE6DF] leading-relaxed border-l-2 border-[#C5A059]/40 pl-6 my-6">
              "Every masterpiece begins with an idea,
              <br />
              but becomes eternal through the hand of the artisan."
            </blockquote>

            <p className="font-sans-luxury text-xs sm:text-sm text-[#A8A296] leading-relaxed tracking-wider">
              Within our subterranean atelier beneath the shadow of the Acropolis, ancient metallurgical rites converge with contemporary haute joaillerie. Here, no digital rapid-prototyping exists. Every curve is carved in beeswax; every laurel leaf is chased by hand with 19th-century hardened steel gravers.
            </p>

            {/* Atelier Disciplines Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#C5A059]/20">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7B38] block mb-1">
                  DISCIPLINE I
                </span>
                <span className="font-cinzel text-xs text-[#F3EFE6] uppercase tracking-wider">
                  Cire Perdue (Lost-Wax)
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7B38] block mb-1">
                  DISCIPLINE II
                </span>
                <span className="font-cinzel text-xs text-[#F3EFE6] uppercase tracking-wider">
                  Intaglio & Burin Carving
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7B38] block mb-1">
                  DISCIPLINE III
                </span>
                <span className="font-cinzel text-xs text-[#F3EFE6] uppercase tracking-wider">
                  Agate Burnishing
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Photography Composition (Artisan hands engraving metal) */}
          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#C5A059]/30 bg-[#070707] p-3 md:p-4 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
              {/* Gold Corner Marks */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#C5A059]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#C5A059]" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#C5A059]" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#C5A059]" />

              <div className="overflow-hidden aspect-[16/11] bg-[#020202]">
                <img
                  src={artisanImg}
                  alt="Artisan hands engraving gold jewelry"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-95 hover:scale-105 transition-transform duration-1000"
                />
              </div>

              {/* Caption */}
              <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-[#9A7B38]">
                <span>ARCHIVE PLATE NO. IX</span>
                <span>HAND-CHISELED 22K GOLD VOLUTES</span>
              </div>
            </div>

            {/* Overlapping secondary vignette (Ring on marble) */}
            <div className="hidden sm:block absolute -bottom-12 -left-10 w-48 md:w-56 border border-[#C5A059]/40 bg-[#0A0A0A] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              <div className="aspect-square overflow-hidden bg-[#020202]">
                <img
                  src={emperorRingImg}
                  alt="Finished artifact"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-110"
                />
              </div>
              <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-[#C5A059] text-center">
                FINISHED MONUMENT
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-24 opacity-20">
        <GreekKeyBorder className="w-full h-1" />
      </div>
    </section>
  );
}
