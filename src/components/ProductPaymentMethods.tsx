import React from 'react';
import { ShieldCheck, Lock, Truck, RefreshCcw, Award, CreditCard } from 'lucide-react';
import { GreekMeanderDivider } from './OrnamentIcons';

export function ProductPaymentMethods() {
  return (
    <section className="relative w-full border border-[#C5A059]/25 bg-[#080808] overflow-hidden">
      {/* corner brackets */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]" />

      <div className="px-6 md:px-10 py-8 md:py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium">
              Aquisição Segura & Discreta
            </span>
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <h3 className="font-cinzel text-lg md:text-xl tracking-[0.22em] uppercase text-[#F3EFE6]">
            Meios de Pagamento Aceitos
          </h3>
          <p className="font-cormorant text-sm italic text-[#9A7B38] mt-1">
            Transação criptografada • Fatura discreta • Atelier Guarantee
          </p>
        </div>

        {/* Payment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cartões */}
          <div className="lg:col-span-7">
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] block mb-3">
              Cartões de Crédito — Parcelamento em até 12x sem juros
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { label: 'VISA', sub: 'Crédito & Débito' },
                { label: 'MASTERCARD', sub: 'Crédito & Débito' },
                { label: 'AMEX', sub: 'American Express' },
                { label: 'ELO', sub: 'Nacional' },
                { label: 'HIPERCARD', sub: 'Nacional' },
                { label: 'DINERS', sub: 'International' },
              ].map((card) => (
                <div
                  key={card.label}
                  className="group flex flex-col items-center justify-center gap-1 py-3.5 px-2 bg-[#050505] border border-[#C5A059]/20 hover:border-[#C5A059]/50 hover:bg-[#0A0A0A] transition-all"
                >
                  <CreditCard className="w-5 h-5 text-[#C5A059]/70 group-hover:text-[#C5A059] transition-colors" />
                  <span className="font-cinzel text-[9px] tracking-[0.15em] text-[#EAE6DF] text-center leading-tight">
                    {card.label}
                  </span>
                  <span className="text-[7px] uppercase tracking-widest text-[#9A7B38]">{card.sub}</span>
                </div>
              ))}
            </div>

            {/* Pix / Boleto / Wire */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 bg-[#C5A059]/10 border border-[#C5A059]/30">
                <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#020202] font-cinzel text-[9px] font-bold">
                  PIX
                </div>
                <div>
                  <span className="block font-cinzel text-xs tracking-widest text-[#F3EFE6]">PIX</span>
                  <span className="block text-[9px] tracking-widest uppercase text-[#9A7B38]">5% desconto • Aprovação imediata</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#050505] border border-[#C5A059]/20">
                <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center">
                  <span className="font-cinzel text-[7px] tracking-widest text-[#C5A059]">BOLETO</span>
                </div>
                <div>
                  <span className="block font-cinzel text-xs tracking-widest text-[#F3EFE6]">Boleto Bancário</span>
                  <span className="block text-[9px] tracking-widest uppercase text-[#9A7B38]">3% desconto • 1-2 dias úteis</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#050505] border border-[#C5A059]/20">
                <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center">
                  <span className="font-cinzel text-[7px] tracking-widest text-[#C5A059]">WIRE</span>
                </div>
                <div>
                  <span className="block font-cinzel text-xs tracking-widest text-[#F3EFE6]">Wire Transfer</span>
                  <span className="block text-[9px] tracking-widest uppercase text-[#9A7B38]">SWIFT • IBAN • Crypto</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed tracking-wider text-[#A8A296] font-sans-luxury">
              * Parcelamento em até <strong className="text-[#C5A059]">12x sem juros</strong> para cartões nacionais. Internacionais em até 6x. PIX e Wire com desconto de atelier. Fatura discreta como <em>“RL Atelier SA”</em>. Câmbio USD/BRL/EUR no fechamento.
            </p>
          </div>

          {/* Garantias */}
          <div className="lg:col-span-5 lg:border-l lg:border-[#C5A059]/15 lg:pl-8 space-y-4">
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] block mb-3">
              Garantias do Atelier
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex gap-2.5 p-3 bg-[#050505] border border-[#C5A059]/15">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#F3EFE6] font-cinzel">Certificado</span>
                  <span className="block text-[10px] leading-relaxed text-[#A8A296]">Owl of Athena + laudo gemológico GIA</span>
                </div>
              </div>
              <div className="flex gap-2.5 p-3 bg-[#050505] border border-[#C5A059]/15">
                <Lock className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#F3EFE6] font-cinzel">SSL 256-bit</span>
                  <span className="block text-[10px] leading-relaxed text-[#A8A296]">Checkout criptografado</span>
                </div>
              </div>
              <div className="flex gap-2.5 p-3 bg-[#050505] border border-[#C5A059]/15">
                <Truck className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#F3EFE6] font-cinzel">Insured Delivery</span>
                  <span className="block text-[10px] leading-relaxed text-[#A8A296]">Seguro integral • Caixa de mármore negro</span>
                </div>
              </div>
              <div className="flex gap-2.5 p-3 bg-[#050505] border border-[#C5A059]/15">
                <RefreshCcw className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-[#F3EFE6] font-cinzel">Atelier 7 dias</span>
                  <span className="block text-[10px] leading-relaxed text-[#A8A296]">Ajuste ou crédito integral</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[9px] uppercase tracking-[0.3em] text-[#9A7B38]">
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Athenian Archival Discretion Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="mt-8 opacity-30">
          <GreekMeanderDivider className="w-full opacity-40" />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[8px] uppercase tracking-[0.3em] text-[#9A7B38]">
          <span>© MMXXVI RINGS LUXURY ATELIER</span>
          <span className="w-1 h-1 bg-[#C5A059]/40 rounded-full" />
          <span>CNPJ 00.000.000/0001-00 • Athens • Paris • Geneva</span>
          <span className="w-1 h-1 bg-[#C5A059]/40 rounded-full" />
          <span>Discreet Billing</span>
        </div>
      </div>
    </section>
  );
}
