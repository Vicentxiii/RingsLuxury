import React from 'react';
import { Instagram } from 'lucide-react';
import { LaurelWreath, GreekKeyBorder, GreekMeanderDivider, AncientCoinMedallion } from './OrnamentIcons';

export function Footer() {
  return (
    <footer
      id="main-footer"
      className="relative w-full bg-[#020202] text-[#EAE6DF] pt-24 pb-16 overflow-hidden border-t border-[#C5A059]/30"
    >
      {/* Black marble ambient overlay */}
      <div className="absolute inset-0 bg-black-marble opacity-80 pointer-events-none" />

      {/* Monumental Greek Key Border Header */}
      <div className="w-full mb-16 opacity-40">
        <GreekKeyBorder className="w-full h-3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#C5A059]/20">
          {/* Brand Presentation & Large Logo */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C5A059]/50 bg-[#050505] p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.25)]">
                <img
                  src="/logo.png"
                  alt="Rings Luxury Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('logo.svg')) {
                      target.src = '/logo.svg';
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-2xl md:text-3xl font-medium tracking-[0.3em] text-[#F3EFE6]">
                  RINGS LUXURY
                </span>
                <span className="text-[10px] uppercase tracking-[0.45em] text-[#9A7B38]">
                  Haute Joaillerie • Atelier
                </span>
              </div>
            </div>

            <p className="font-cormorant text-lg italic text-[#C2BDB2] max-w-sm leading-relaxed">
              "Entering the eternal sanctuary where Ancient Greek monumental sculpture, Baroque grandeur, and contemporary goldsmithing become one."
            </p>

            <div className="flex items-center gap-4 text-[10px] tracking-[0.25em] text-[#9A7B38] uppercase">
              <span>ATHENS</span>
              <span>•</span>
              <span>PLACE VENDÔME</span>
              <span>•</span>
              <span>GENEVA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#C5A059] mb-4">
              ARCHIVES & SANCTUARY
            </h4>
            <ul className="space-y-2.5 text-[11px] font-sans-luxury tracking-[0.25em] uppercase text-[#A8A296]">
              <li>
                <a href="#hero" className="hover:text-[#C5A059] transition-colors">
                  I • Opening Scene
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#C5A059] transition-colors">
                  II • The Collection
                </a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-[#C5A059] transition-colors">
                  III • The Hand of the Master
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-[#C5A059] transition-colors">
                  IV • Five Sacred Stages
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-[#C5A059] transition-colors">
                  V • Ancient Greek Heritage
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C5A059] transition-colors">
                  VI • Baroque Private Salon
                </a>
              </li>
              <li>
                <a href="#masterpiece" className="hover:text-[#C5A059] transition-colors">
                  VII • Microscopic Masterpiece
                </a>
              </li>
            </ul>
          </div>

          {/* Private Salons & Social Protocol */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#C5A059] mb-4">
              PRIVATE SALON ADMISSIO
            </h4>
            <div className="space-y-3 text-xs text-[#A8A296] font-sans-luxury leading-relaxed tracking-wider">
              <p>
                <strong className="text-[#F3EFE6] font-cinzel">ATHENS:</strong> 12 Stratonos & Tripodon, Plaka (Subterranean Sanctuary)
              </p>
              <p>
                <strong className="text-[#F3EFE6] font-cinzel">PARIS:</strong> 18 Place Vendôme, 75001 Paris (By Private Concierge)
              </p>
              <p>
                <strong className="text-[#F3EFE6] font-cinzel">GENEVA:</strong> 42 Rue du Rhône, 1204 Genève
              </p>
            </div>

            <div className="pt-3">
              <a
                href="https://www.instagram.com/ringsluxury"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:text-[#E6CA85] hover:bg-[#C5A059]/10 rounded-full font-sans-luxury text-[11px] font-medium tracking-[0.2em] uppercase transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram @ringsluxury</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-5 text-[11px] font-cinzel tracking-[0.25em] text-[#C5A059]">
              <a href="#contact" className="hover:text-[#E6CA85] transition-colors">
                ACQUISITIONS
              </a>
              <span>/</span>
              <a href="#contact" className="hover:text-[#E6CA85] transition-colors">
                GAZETTE ARCHIVE
              </a>
              <span>/</span>
              <a href="#contact" className="hover:text-[#E6CA85] transition-colors">
                PRESS SALON
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Timeless Motto */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#9A7B38]">
            © MMXXVI RINGS LUXURY ATELIER. ALL MONUMENTS RESERVED.
          </div>

          {/* At the very bottom: CRAFTED BY HAND. CREATED FOR ETERNITY. */}
          <div className="font-cinzel text-xs md:text-sm font-semibold tracking-[0.4em] uppercase text-[#C5A059]">
            CRAFTED BY HAND. CREATED FOR ETERNITY.
          </div>

          <div className="text-[10px] tracking-[0.3em] uppercase text-[#9A7B38]">
            ATHÈNES • HELLAS
          </div>
        </div>
      </div>

      {/* Sub Greek Key Border at Very Bottom */}
      <div className="w-full mt-12 opacity-30">
        <GreekKeyBorder className="w-full h-1.5" />
      </div>
    </footer>
  );
}
