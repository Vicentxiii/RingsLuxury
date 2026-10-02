import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../i18n/LanguageContext';

const ENROLLMENT_DEADLINE = new Date('2027-10-01T00:00:00');

function getTimeLeft() {
  const diff = ENROLLMENT_DEADLINE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    expired: false,
  };
}

export function Courses() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  const handleOpenConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = () => {
    setEmailSubmitted(false);
    setTimeLeft(getTimeLeft());
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Countdown ticking while the modal is open
  useEffect(() => {
    if (!isModalOpen) return;
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, [isModalOpen]);

  // Lock body scroll + close on Escape while the modal is open
  useEffect(() => {
    if (!isModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isModalOpen]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setEmailSubmitted(true);
  };

  const courseModules = [
    {
      id: "01",
      title: t.pages.coursesMod1Title,
      description: t.pages.coursesMod1Desc,
      duration: t.pages.coursesMod1Duration,
      level: t.pages.coursesMod1Level,
      image: encodeURI('/PUBLIC/Image do curso Modulo 1 by Jorge Uquillas Card 1.jpg'),
    },
    {
      id: "02",
      title: t.pages.coursesMod2Title,
      description: t.pages.coursesMod2Desc,
      duration: t.pages.coursesMod2Duration,
      level: t.pages.coursesMod2Level,
      image: encodeURI('/PUBLIC/Artistic Engravinn Fundamentals By Jore Uquillas Rings Luxury 2026.jpg'),
    },
    {
      id: "03",
      title: t.pages.coursesMod3Title,
      description: t.pages.coursesMod3Desc,
      duration: t.pages.coursesMod3Duration,
      level: t.pages.coursesMod3Level,
      image: encodeURI('/PUBLIC/Course Rings Luxury BY jORGE uQUILLAS mixing metals.jpg'),
    },
    {
      id: "04",
      title: t.pages.coursesMod4Title,
      description: t.pages.coursesMod4Desc,
      duration: t.pages.coursesMod4Duration,
      level: t.pages.coursesMod4Level,
      image: encodeURI('/PUBLIC/Colocando diamante na JOIA rings Luxury Course.jpg'),
    },
    {
      id: "05",
      title: t.pages.coursesMod5Title,
      description: t.pages.coursesMod5Desc,
      duration: t.pages.coursesMod5Duration,
      level: t.pages.coursesMod5Level,
      image: encodeURI('/PUBLIC/The masterpiece Creation.jpg'),
    }
  ];

  const countdownUnits = [
    { value: timeLeft.days, label: t.pages.coursesModalDays },
    { value: timeLeft.hours, label: t.pages.coursesModalHours },
    { value: timeLeft.minutes, label: t.pages.coursesModalMinutes },
    { value: timeLeft.seconds, label: t.pages.coursesModalSeconds },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO 
        title={t.pages.coursesSeoTitle}
        description={t.pages.coursesSeoDescription}
      />
      
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={handleOpenConsultation} />

      <main className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <Breadcrumbs
          items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.pages.coursesTitle }]}
        />
        <header className="text-center mb-20">
          <h2 className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            {t.pages.coursesKicker}
          </h2>
          <h1 className="font-cinzel text-4xl md:text-5xl font-medium tracking-wide text-[#F3EFE6] mb-8">
            {t.pages.coursesTitle}
          </h1>
          <p className="font-cormorant text-xl text-[#A8A296] max-w-2xl mx-auto">
            {t.pages.coursesIntro}
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto mt-12" />
        </header>

        <div className="space-y-8">
          {courseModules.map((mod) => (
            <div key={mod.id} className="relative group overflow-hidden border border-[#C5A059]/20 bg-[#050505]/80 backdrop-blur-sm p-8 md:p-12 transition-all hover:border-[#C5A059]/60">
              {/* Foto de fundo do módulo — design intacto, só adiciona a imagem atrás do conteúdo */}
              <img
                src={mod.image}
                alt=""
                aria-hidden
                draggable={false}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-700 select-none pointer-events-none"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/72 to-[#050505]/28 pointer-events-none" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-[#050505]/35 pointer-events-none" aria-hidden />
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity z-[1]">
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
                    <span className="block font-poppins text-[10px] uppercase tracking-widest text-[#C5A059]/70 mb-1">{t.pages.coursesDurationLabel}</span>
                    <span className="font-cinzel text-[#F3EFE6]">{mod.duration}</span>
                  </div>
                  <div className="mt-2">
                    <span className="block font-poppins text-[10px] uppercase tracking-widest text-[#C5A059]/70 mb-1">{t.pages.coursesLevelLabel}</span>
                    <span className="font-cinzel text-[#F3EFE6]">{mod.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
           <button 
              onClick={openModal}
              className="relative group/btn overflow-hidden border border-[#C5A059] px-12 py-5 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 transition-colors"
            >
              <span className="relative font-poppins text-sm tracking-[0.2em] uppercase text-[#C5A059]">
                {t.pages.coursesApplyButton}
              </span>
            </button>
        </div>
      </main>

      {/* Elegant enrollment modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t.pages.coursesModalAria}
        >
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden
          />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#080808] border border-[#C5A059]/40 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-8 sm:p-10 text-center">
            {/* Classical Frame Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]" aria-hidden />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]" aria-hidden />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]" aria-hidden />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]" aria-hidden />

            <button
              type="button"
              onClick={closeModal}
              aria-label={t.pages.coursesModalClose}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-[#9A7B38] hover:text-[#E6CA85] hover:border-[#C5A059] border border-transparent rounded-full transition-colors text-xl leading-none"
            >
              ×
            </button>

            <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C5A059] mb-3">
              {t.pages.coursesModalEyebrow}
            </p>
            <h2 className="font-cinzel text-2xl sm:text-3xl text-[#F3EFE6] tracking-wide mb-2">
              {t.pages.coursesModalTitle}
            </h2>
            <div className="relative mx-auto mt-4 mb-6 w-full max-w-[320px]" aria-hidden>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[3px] bg-[#E6CA85] blur-[3px] rounded-full" />
            </div>

            {/* Countdown */}
            <p className="font-poppins text-[10px] uppercase tracking-[0.3em] text-[#9A7B38] mb-3">
              {t.pages.coursesModalDeadline}
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6" role="timer" aria-label={t.pages.coursesModalTimerAria}>
              {countdownUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="border border-[#C5A059]/30 bg-black/60 px-1 py-3 sm:py-4"
                >
                  <div className="font-cinzel text-xl sm:text-2xl text-[#E6CA85] tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="mt-1 font-poppins text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#9A7B38]">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
            {timeLeft.expired && (
              <p className="font-cormorant italic text-[#C5A059] mb-4">
                {t.pages.coursesModalExpired}
              </p>
            )}

            <p className="font-cormorant text-[#C2BDB2] text-base sm:text-lg leading-relaxed mb-4">
              {t.pages.coursesModalText}
            </p>

            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="mt-6 text-left">
                <label
                  htmlFor="academy-email"
                  className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-2 font-sans-luxury"
                >
                  {t.pages.coursesModalEmailLabel}
                </label>
                <input
                  id="academy-email"
                  type="email"
                  required
                  autoFocus
                  placeholder={t.pages.coursesModalEmailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#C5A059]/30 focus:border-[#C5A059] transition-colors pb-2 text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#444] focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-6 w-full px-6 py-4 bg-[#C5A059] hover:bg-[#E6CA85] text-[#020202] font-poppins text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase rounded-full transition-colors"
                >
                  {t.pages.coursesModalCta}
                </button>
              </form>
            ) : (
              <div className="mt-6 border border-[#C5A059]/30 bg-[#C5A059]/5 px-6 py-6">
                <p className="font-cinzel text-lg text-[#E6CA85] mb-2">{t.pages.coursesModalSuccessTitle}</p>
                <p className="font-cormorant italic text-[#C2BDB2] text-base leading-relaxed">
                  {t.pages.coursesModalSuccessThanks} <span className="text-[#F3EFE6] not-italic">{email}</span> {t.pages.coursesModalSuccessBody}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-20">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
