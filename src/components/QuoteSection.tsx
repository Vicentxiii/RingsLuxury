import React from 'react';
import { LaurelWreath, AcanthusLeaf } from './OrnamentIcons';

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative w-full py-40 md:py-56 bg-[#020202] text-[#EAE6DF] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle radial dark ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.04)_0%,transparent_65%)] pointer-events-none" />

      {/* Large Negative Space Centered Composition */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#9A7B38]">
            SENTENTIA AUREA
          </span>
        </div>

        {/* Centered Typography: "TIME CREATES HISTORY. THE MASTER CREATES LEGACY." */}
        <blockquote className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic tracking-[0.14em] text-[#F3EFE6] leading-tight mb-10 max-w-3xl mx-auto">
          “TIME CREATES HISTORY.
          <br />
          <span className="text-[#C5A059] font-normal not-italic font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.22em] block mt-2">
            THE MASTER CREATES LEGACY.”
          </span>
        </blockquote>

        {/* Small antique-gold ornament underneath */}
        <div className="flex items-center justify-center gap-3 opacity-85">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <LaurelWreath className="w-6 h-6 text-[#C5A059]" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>
      </div>
    </section>
  );
}
