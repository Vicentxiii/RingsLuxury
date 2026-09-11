import React, { useState } from 'react';
import { X, Shield, Sparkles, Gem, Clock, ArrowRight } from 'lucide-react';
import {
  LaurelWreath,
  GreekKeyBorder,
  AncientCoinMedallion,
  ArabesqueCorner,
  ArabesqueCrest,
} from './OrnamentIcons';

export interface ArtifactData {
  numeral: string;
  name: string;
  subname: string;
  description: string;
  extendedHistory: string;
  specs: {
    material: string;
    weight: string;
    gems: string;
    craftHours: string;
    provenance: string;
    edition: string;
  };
  image: string;
  secondaryImage?: string;
  symbolism: string;
}

interface ArtifactModalProps {
  artifact: ArtifactData | null;
  onClose: () => void;
  onRequestAcquisition: (artifactName: string) => void;
}

export function ArtifactModal({ artifact, onClose, onRequestAcquisition }: ArtifactModalProps) {
  const [activeTab, setActiveTab] = useState<'dossier' | 'provenance' | 'metallurgy'>('dossier');

  if (!artifact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#020202]/95 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      {/* Outer Glow Halo & Backlight */}
      <div className="relative w-full max-w-5xl my-auto">
        <div className="absolute -inset-1.5 rounded-[36px] bg-gradient-to-b from-[#C5A059]/40 via-transparent to-[#C5A059]/30 blur-2xl opacity-75 pointer-events-none" />

        {/* Modal Outer Container with futuristic rounded borders & arabesques */}
        <div className="relative w-full max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl md:rounded-[32px] overflow-hidden bg-[#070707]/95 border-2 border-[#C5A059]/60 shadow-[0_0_60px_rgba(197,160,89,0.25),0_30px_90px_rgba(0,0,0,0.95)] text-[#EAE6DF] ring-1 ring-inset ring-[#C5A059]/30">
          
          {/* ARABESCOS EM VOLTA DO MODAL */}
          <ArabesqueCorner className="absolute -top-1 -left-1 w-20 h-20 sm:w-28 sm:h-28 text-[#C5A059] opacity-85 z-30 pointer-events-none" />
          <ArabesqueCorner className="absolute -top-1 -right-1 w-20 h-20 sm:w-28 sm:h-28 text-[#C5A059] opacity-85 z-30 pointer-events-none transform scale-x-[-1]" />
          <ArabesqueCorner className="absolute -bottom-1 -left-1 w-20 h-20 sm:w-28 sm:h-28 text-[#C5A059] opacity-85 z-30 pointer-events-none transform scale-y-[-1]" />
          <ArabesqueCorner className="absolute -bottom-1 -right-1 w-20 h-20 sm:w-28 sm:h-28 text-[#C5A059] opacity-85 z-30 pointer-events-none transform scale-x-[-1] scale-y-[-1]" />

          {/* Center Arabesque Crests */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden sm:block">
            <ArabesqueCrest className="w-40 sm:w-56 h-8 text-[#C5A059] opacity-90" />
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden sm:block">
            <ArabesqueCrest className="w-40 sm:w-56 h-8 text-[#C5A059] opacity-90 transform scale-y-[-1]" />
          </div>

          {/* Top Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5 bg-[#050505]/95 backdrop-blur-md border-b border-[#C5A059]/30">
            <div className="flex items-center gap-3.5">
              <AncientCoinMedallion className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.38em] text-[#C5A059] font-medium">
                  ARCHIVAL DOSSIER • PIECE N° {artifact.numeral}
                </span>
                <span className="font-cinzel text-sm sm:text-base tracking-[0.25em] text-[#F3EFE6] font-medium">
                  {artifact.name}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 text-[#EAE6DF]/70 hover:text-[#020202] transition-all border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#0A0A0A] hover:bg-[#C5A059] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.2)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
          {/* Left: Artifact Large Museum Presentation */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative group border border-[#C5A059]/30 bg-[#020202] p-2">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#C5A059]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#C5A059]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#C5A059]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#C5A059]" />

              <img
                src={artifact.image}
                alt={artifact.name}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 md:h-[420px] object-cover filter contrast-105"
              />

              {/* Tag Overlay */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#050505]/90 border border-[#C5A059]/40 text-[9px] uppercase tracking-[0.3em] text-[#E6CA85]">
                {artifact.specs.edition}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-[10px] tracking-[0.25em] text-[#9A7B38] uppercase">
              <span>Hellenic Archive Ref: KL-{artifact.numeral}-88</span>
              <span>Athens Haute Joaillerie</span>
            </div>
          </div>

          {/* Right: Curatorial Notes & Dossier */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Roman Numeral & Title */}
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-cormorant text-5xl md:text-6xl text-[#C5A059] font-light italic">
                  {artifact.numeral}
                </span>
                <div>
                  <h3 className="font-cinzel text-2xl md:text-3xl tracking-[0.18em] text-[#FBF9F5] uppercase">
                    {artifact.name}
                  </h3>
                  <p className="font-sans-luxury text-[11px] tracking-[0.3em] uppercase text-[#9A7B38]">
                    {artifact.subname}
                  </p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-[#C5A059]/20 my-6">
                <button
                  onClick={() => setActiveTab('dossier')}
                  className={`pb-2.5 text-[11px] tracking-[0.25em] uppercase font-medium mr-6 transition-colors relative ${
                    activeTab === 'dossier'
                      ? 'text-[#C5A059]'
                      : 'text-[#EAE6DF]/50 hover:text-[#EAE6DF]'
                  }`}
                >
                  Curatorial Note
                  {activeTab === 'dossier' && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#C5A059]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('provenance')}
                  className={`pb-2.5 text-[11px] tracking-[0.25em] uppercase font-medium mr-6 transition-colors relative ${
                    activeTab === 'provenance'
                      ? 'text-[#C5A059]'
                      : 'text-[#EAE6DF]/50 hover:text-[#EAE6DF]'
                  }`}
                >
                  Mythos & Provenance
                  {activeTab === 'provenance' && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#C5A059]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('metallurgy')}
                  className={`pb-2.5 text-[11px] tracking-[0.25em] uppercase font-medium transition-colors relative ${
                    activeTab === 'metallurgy'
                      ? 'text-[#C5A059]'
                      : 'text-[#EAE6DF]/50 hover:text-[#EAE6DF]'
                  }`}
                >
                  Specifications
                  {activeTab === 'metallurgy' && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#C5A059]" />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'dossier' && (
                <div className="space-y-4 animate-fadeIn">
                  <p className="font-cormorant text-lg md:text-xl italic text-[#D8D2C4] leading-relaxed">
                    "{artifact.description}"
                  </p>
                  <p className="font-sans-luxury text-xs text-[#A8A296] leading-relaxed tracking-wider">
                    {artifact.extendedHistory}
                  </p>
                  <div className="p-4 bg-[#0A0A0A] border-l-2 border-[#C5A059]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block mb-1">
                      Symbolism
                    </span>
                    <p className="text-xs text-[#C2BDB2] tracking-wide">
                      {artifact.symbolism}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'provenance' && (
                <div className="space-y-4 text-xs text-[#C2BDB2] leading-relaxed animate-fadeIn">
                  <div className="border border-[#C5A059]/20 p-4 bg-[#0A0A0A]">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] block mb-1">
                      Historical Genesis
                    </span>
                    <p>
                      Inspired by ancient excavation treasures uncovered in classical Attica and the Peloponnese, re-imagined through high Baroque ceremonial sculptural symmetry.
                    </p>
                  </div>
                  <div className="border border-[#C5A059]/20 p-4 bg-[#0A0A0A]">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] block mb-1">
                      Atelier Registration
                    </span>
                    <p>
                      Hand-signed and micro-hallmarked by the Master Artisan with the Rings Luxury Athenian Owl seal. Accompanied by a bespoke black marble presentation chest.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'metallurgy' && (
                <div className="grid grid-cols-2 gap-3 text-xs animate-fadeIn">
                  <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#9A7B38] block">
                      Metal Composition
                    </span>
                    <span className="font-cinzel text-sm text-[#F3EFE6]">
                      {artifact.specs.material}
                    </span>
                  </div>
                  <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#9A7B38] block">
                      Net Weight
                    </span>
                    <span className="font-cinzel text-sm text-[#F3EFE6]">
                      {artifact.specs.weight}
                    </span>
                  </div>
                  <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#9A7B38] block">
                      Stone Setting
                    </span>
                    <span className="font-cinzel text-sm text-[#F3EFE6]">
                      {artifact.specs.gems}
                    </span>
                  </div>
                  <div className="p-3 bg-[#0A0A0A] border border-[#C5A059]/20">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#9A7B38] block">
                      Artisan Labor
                    </span>
                    <span className="font-cinzel text-sm text-[#F3EFE6]">
                      {artifact.specs.craftHours}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-[#C5A059]/25 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  onClose();
                  onRequestAcquisition(artifact.name);
                }}
                className="flex-1 py-4.5 px-6 bg-[#C5A059] text-[#020202] hover:bg-[#E6CA85] font-cinzel text-xs font-semibold tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-2 rounded-full shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Request Private Acquisition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="py-4.5 px-8 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#EAE6DF] hover:text-[#C5A059] font-cinzel text-xs tracking-[0.25em] uppercase transition-colors rounded-full cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Greek Key Motif */}
        <GreekKeyBorder className="w-full h-1.5 opacity-25" />
      </div>
    </div>
  </div>
</div>
  );
}
