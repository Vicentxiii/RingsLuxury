import React from 'react';
import { ShieldCheck, Lock, Truck, RefreshCcw, Award, CreditCard } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function ProductPaymentMethods() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0C0A06] via-[#060505] to-[#020202] shadow-[0_32px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* hairline + glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/70 to-transparent" aria-hidden />
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full bg-[#C5A059]/10 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative px-6 md:px-10 py-9 md:py-11">
        {/* Header */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1.5 mb-4">
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#E6CA85] font-medium">
              {t.collections.payEyebrow}
            </span>
          </div>
          <h3 className="font-cinzel text-xl md:text-2xl tracking-[0.18em] uppercase text-[#F5EDD8]">
            {t.collections.payTitle}
          </h3>
          <p className="font-cormorant text-base italic text-[#9A7B38] mt-1.5">
            {t.collections.paySubtitle}
          </p>
        </div>

        {/* Payment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Cartões */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E6CA85] block mb-4">
              {t.collections.payCardsLabel}
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {[
                { label: 'VISA', sub: t.collections.payCardCreditDebit },
                { label: 'MASTERCARD', sub: t.collections.payCardCreditDebit },
                { label: 'AMEX', sub: t.collections.payCardAmex },
                { label: 'ELO', sub: t.collections.payCardNational },
                { label: 'HIPERCARD', sub: t.collections.payCardNational },
                { label: 'DINERS', sub: t.collections.payCardInternational },
              ].map((card) => (
                <div
                  key={card.label}
                  className="group flex flex-col items-center justify-center gap-1.5 py-4 px-2 rounded-xl bg-black/40 border border-white/[0.07] hover:border-[#C5A059]/50 hover:bg-[#C5A059]/[0.07] hover:-translate-y-0.5 transition-all"
                >
                  <span className="w-9 h-9 rounded-full bg-[#C5A059]/12 border border-[#C5A059]/25 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-[#E6CA85] group-hover:scale-110 transition-transform" />
                  </span>
                  <span className="font-cinzel text-[9px] tracking-[0.14em] text-[#EAE6DF] text-center leading-tight">
                    {card.label}
                  </span>
                  <span className="text-[7px] uppercase tracking-widest text-[#9A7B38]">{card.sub}</span>
                </div>
              ))}
            </div>

            {/* Pix / Wire */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#C5A059]/20 to-[#C5A059]/[0.06] border border-[#C5A059]/35">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6CA85] to-[#9A7B38] flex items-center justify-center text-[#020202] font-cinzel text-[10px] font-bold shadow-lg">
                  PIX
                </div>
                <div>
                  <span className="block font-cinzel text-[13px] tracking-[0.14em] text-[#F3EFE6]">PIX</span>
                  <span className="block text-[9px] tracking-widest uppercase text-[#C2BDB2]">{t.collections.payPixNote}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-white/[0.08] hover:border-[#C5A059]/30 transition-colors">
                <div className="w-10 h-10 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 flex items-center justify-center">
                  <span className="font-cinzel text-[8px] tracking-widest text-[#E6CA85]">WIRE</span>
                </div>
                <div>
                  <span className="block font-cinzel text-[13px] tracking-[0.14em] text-[#F3EFE6]">{t.collections.payWire}</span>
                  <span className="block text-[9px] tracking-widest uppercase text-[#9A7B38]">{t.collections.payWireNote}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed tracking-wide text-[#A8A296] font-sans-luxury">
              {t.collections.payNotePrefix}<strong className="text-[#E6CA85] font-semibold">{t.collections.payNoteStrong}</strong>{t.collections.payNoteMiddle}<em className="text-[#D8D2C4]">{t.collections.payNoteBrand}</em>{t.collections.payNoteSuffix}
            </p>
          </div>

          {/* Garantias */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.07] bg-black/30 p-5 sm:p-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E6CA85] block mb-4">
              {t.collections.payGuarantees}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2.5">
              <div className="flex gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C5A059]/30 transition-colors">
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#C5A059]/12 border border-[#C5A059]/25 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#E6CA85]" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-[#F3EFE6] font-cinzel">{t.collections.payCert}</span>
                  <span className="block text-[11px] leading-relaxed text-[#A8A296] mt-1">{t.collections.payCertDesc}</span>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C5A059]/30 transition-colors">
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#C5A059]/12 border border-[#C5A059]/25 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#E6CA85]" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-[#F3EFE6] font-cinzel">{t.collections.paySsl}</span>
                  <span className="block text-[11px] leading-relaxed text-[#A8A296] mt-1">{t.collections.paySslDesc}</span>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C5A059]/30 transition-colors">
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#C5A059]/12 border border-[#C5A059]/25 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-[#E6CA85]" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-[#F3EFE6] font-cinzel">{t.collections.payInsured}</span>
                  <span className="block text-[11px] leading-relaxed text-[#A8A296] mt-1">{t.collections.payInsuredDesc}</span>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C5A059]/30 transition-colors">
                <span className="w-9 h-9 shrink-0 rounded-full bg-[#C5A059]/12 border border-[#C5A059]/25 flex items-center justify-center">
                  <RefreshCcw className="w-4 h-4 text-[#E6CA85]" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-[#F3EFE6] font-cinzel">{t.collections.payAtelier}</span>
                  <span className="block text-[11px] leading-relaxed text-[#A8A296] mt-1">{t.collections.payAtelierDesc}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-full border border-[#C5A059]/25 bg-[#C5A059]/[0.07] px-4 py-2.5 text-[9px] uppercase tracking-[0.28em] text-[#E6CA85]">
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t.collections.payDiscretion}</span>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[8px] uppercase tracking-[0.3em] text-[#9A7B38]/80">
          <span>{t.collections.payCopyright}</span>
          <span className="w-1 h-1 bg-[#C5A059]/40 rounded-full" />
          <span>{t.collections.payOffices}</span>
          <span className="w-1 h-1 bg-[#C5A059]/40 rounded-full" />
          <span>{t.collections.payDiscreet}</span>
        </div>
      </div>
    </section>
  );
}
