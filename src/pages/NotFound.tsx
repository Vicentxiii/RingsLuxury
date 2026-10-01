import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { useLanguage } from '../i18n/LanguageContext';

export function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden flex flex-col">
      <SEO
        title={t.pages.notFoundSeoTitle}
        description={t.pages.notFoundSeoDescription}
        url="/404"
      />
      <Header onOpenConsultation={() => {}} />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center relative z-10">
        <p className="font-cinzel text-[#C5A059] text-sm tracking-[0.45em] uppercase mb-6">404</p>
        <h1 className="font-cinzel text-3xl sm:text-4xl tracking-[0.12em] uppercase text-[#F3EFE6] mb-4">
          {t.pages.notFoundTitle}
        </h1>
        <p className="font-cormorant text-lg italic text-[#A8A296] mb-10 max-w-md">
          {t.pages.notFoundText}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-4 bg-[#C5A059] text-[#020202] font-cinzel text-xs tracking-[0.3em] uppercase rounded-full hover:bg-[#E6CA85] transition-colors"
          >
            {t.pages.notFoundHome}
          </Link>
          <Link
            to="/luxury-rings"
            className="px-8 py-4 border border-[#C5A059]/45 text-[#EAE6DF] font-cinzel text-xs tracking-[0.3em] uppercase rounded-full hover:border-[#C5A059] hover:text-[#E6CA85] transition-colors"
          >
            {t.pages.notFoundCollection}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
