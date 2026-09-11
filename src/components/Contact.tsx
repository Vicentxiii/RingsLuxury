import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Shield, Sparkles, MapPin, Calendar, Lock, Instagram } from 'lucide-react';
import { GreekKeyBorder, GreekMeanderDivider, LaurelWreath, AncientCoinMedallion } from './OrnamentIcons';

interface ContactProps {
  preselectedPiece?: string;
  onClearPreselectedPiece?: () => void;
}

export function Contact({ preselectedPiece, onClearPreselectedPiece }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: 'Athens — Plaka Sanctuary',
    pieceInterest: preselectedPiece || 'Bespoke Imperial Commission',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    if (preselectedPiece) {
      setFormData((prev) => ({ ...prev, pieceInterest: preselectedPiece }));
    }
  }, [preselectedPiece]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomHex = Math.floor(Math.random() * 89999 + 10000).toString(16).toUpperCase();
    setBookingCode(`KL-MMXXVI-${randomHex}`);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-32 md:py-48 bg-[#040404] text-[#EAE6DF] overflow-hidden"
    >
      {/* Background Black Marble Veins & Soft Volumetric Golden Spotlight */}
      <div className="absolute inset-0 bg-black-marble opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <LaurelWreath className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-[#C5A059] font-medium">
              PRIVATE SALON ADMISSION
            </span>
            <LaurelWreath className="w-4 h-4 text-[#C5A059] transform -scale-x-100" />
          </div>

          {/* Title: ENTER THE ATELIER */}
          <h2
            id="contact-title"
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] uppercase text-[#FBF9F5] font-light mb-4"
          >
            ENTER THE ATELIER
          </h2>

          {/* Subtitle: For private commissions, exclusive masterpieces and collectors. */}
          <p
            id="contact-subtitle"
            className="font-cormorant text-xl md:text-2xl italic tracking-[0.16em] text-[#C5A059] font-light leading-relaxed mb-6"
          >
            For private commissions,
            <br />
            exclusive masterpieces and collectors.
          </p>

          <p className="font-sans-luxury text-xs text-[#A8A296] tracking-[0.2em] uppercase max-w-lg mx-auto leading-relaxed">
            Due to the singular nature of our craftsmanship, consultations are conducted by appointment only within our private salons or via private diplomatic liaison.
          </p>

          <GreekMeanderDivider className="mt-8 opacity-60" />
        </div>

        {/* Form Container / Confirmation State */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="relative p-8 md:p-14 bg-[#080808] border border-[#C5A059]/40 shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
          >
            {/* Classical Frame Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]" />

            <div className="space-y-8">
              {/* Name field */}
              <div className="relative border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-2">
                <label
                  htmlFor="client-name"
                  className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-1 font-sans-luxury"
                >
                  FULL NAME / HONORIFIC TITLE
                </label>
                <input
                  id="client-name"
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Vance / Archon Helene"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#444] focus:outline-none"
                />
              </div>

              {/* Email / Liaison field */}
              <div className="relative border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-2">
                <label
                  htmlFor="client-email"
                  className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-1 font-sans-luxury"
                >
                  PRIVATE LIAISON / CONFIDENTIAL EMAIL
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  placeholder="liaison@privateoffice.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#444] focus:outline-none"
                />
              </div>

              {/* Two columns: City & Piece Interest */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-2">
                  <label
                    htmlFor="client-city"
                    className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-1 font-sans-luxury"
                  >
                    PREFERRED SALON LOCATION
                  </label>
                  <select
                    id="client-city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#080808] text-[#F3EFE6] font-cinzel text-sm tracking-wider focus:outline-none cursor-pointer"
                  >
                    <option value="Athens — Plaka Sanctuary">Athens — Plaka Sanctuary</option>
                    <option value="Paris — Place Vendôme Salon">Paris — Place Vendôme Salon</option>
                    <option value="Geneva — Rue du Rhône Suite">Geneva — Rue du Rhône Suite</option>
                    <option value="Private Collector Residence">Private Collector Residence</option>
                  </select>
                </div>

                <div className="relative border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-2">
                  <label
                    htmlFor="client-interest"
                    className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-1 font-sans-luxury"
                  >
                    ARTIFACT OF INTEREST
                  </label>
                  <input
                    id="client-interest"
                    type="text"
                    value={formData.pieceInterest}
                    onChange={(e) => setFormData({ ...formData, pieceInterest: e.target.value })}
                    className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-sm tracking-wider focus:outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="relative border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-2">
                <label
                  htmlFor="client-notes"
                  className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-1 font-sans-luxury"
                >
                  SPECIAL COMMISSIONS / PROVENANCE REQUESTS (OPTIONAL)
                </label>
                <textarea
                  id="client-notes"
                  rows={2}
                  placeholder="Specify particular mythological iconography, family crests, or custom gold alloy..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-transparent text-[#F3EFE6] font-sans-luxury text-xs tracking-wider placeholder-[#444] focus:outline-none resize-none"
                />
              </div>

              {/* Security & Confidentiality note */}
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#9A7B38] pt-2">
                <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Strictly Confidential • Athenian Archival Discretion Guaranteed</span>
              </div>

              {/* Submit CTA & Direct Instagram Channel */}
              <div className="pt-6 space-y-4">
                <button
                  id="request-consultation-submit"
                  type="submit"
                  className="group relative w-full py-5 bg-[#C5A059] text-[#020202] hover:bg-[#E6CA85] transition-all duration-500 font-cinzel text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(197,160,89,0.2)] rounded-full"
                >
                  <span>REQUEST A PRIVATE CONSULTATION</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center pt-2">
                  <a
                    href="https://www.instagram.com/ringsluxury"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:text-[#E6CA85] hover:bg-[#C5A059]/10 rounded-full font-sans-luxury text-[11px] font-medium tracking-[0.2em] uppercase transition-all"
                  >
                    <Instagram className="w-4 h-4 text-[#C5A059]" />
                    <span>Conexão Direta: Instagram @ringsluxury</span>
                  </a>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Aristocratic Archival Confirmation State */
          <div className="p-8 md:p-14 bg-[#080808] border border-[#C5A059] shadow-[0_30px_90px_rgba(197,160,89,0.25)] text-center animate-fadeIn">
            <div className="inline-flex items-center justify-center mb-6">
              <AncientCoinMedallion className="w-16 h-16" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.45em] text-[#C5A059] block mb-2 font-medium">
              SEAL OF ADMISSION GRANTED
            </span>

            <h3 className="font-cinzel text-3xl md:text-4xl tracking-[0.18em] uppercase text-[#FBF9F5] mb-4">
              WELCOME TO THE ATELIER
            </h3>

            <p className="font-cormorant text-xl italic text-[#C5A059] mb-6">
              "Your petition has been inscribed into the secret archive."
            </p>

            <div className="p-4 max-w-md mx-auto bg-[#030303] border border-[#C5A059]/30 text-xs text-[#EAE6DF] space-y-2 mb-8">
              <div className="flex justify-between border-b border-[#C5A059]/20 pb-1">
                <span className="text-[#9A7B38] uppercase tracking-wider">Sanctuary Dossier:</span>
                <span className="font-mono text-[#C5A059]">{bookingCode}</span>
              </div>
              <div className="flex justify-between border-b border-[#C5A059]/20 pb-1">
                <span className="text-[#9A7B38] uppercase tracking-wider">Client Inscription:</span>
                <span className="font-cinzel">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A7B38] uppercase tracking-wider">Private Salon:</span>
                <span>{formData.city}</span>
              </div>
            </div>

            <p className="font-sans-luxury text-xs text-[#A8A296] tracking-wider max-w-lg mx-auto mb-8 leading-relaxed">
              Our Curatorial Liaison will contact your confidential channel within one lunar cycle (24 hours) with your encrypted invitation and parchment itinerary.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  if (onClearPreselectedPiece) onClearPreselectedPiece();
                }}
                className="px-8 py-3.5 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] font-cinzel text-xs tracking-[0.3em] uppercase transition-colors rounded-full"
              >
                Submit Another Inquiry
              </button>

              <a
                href="https://www.instagram.com/ringsluxury"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A059]/15 hover:bg-[#C5A059]/30 border border-[#C5A059]/50 text-[#C5A059] font-sans-luxury text-xs tracking-[0.2em] uppercase transition-all rounded-full"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram @ringsluxury</span>
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="w-full mt-24 opacity-20">
        <GreekKeyBorder className="w-full h-1" />
      </div>
    </section>
  );
}
