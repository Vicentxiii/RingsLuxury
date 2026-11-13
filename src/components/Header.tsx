import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { LanguageFlags } from './LanguageFlags';

interface HeaderProps {
  onOpenConsultation?: () => void;
  onNavigateToJorgeUquillas?: () => void;
}

export function Header({ onOpenConsultation: _onOpenConsultation }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta o scroll da página para ativar o vidro fumê escuro sofisticado
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trava o scroll da página enquanto o menu mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Fecha o menu com a tecla ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t.nav.home,            path: '/' },
    { label: t.nav.luxuryRings,     path: '/luxury-rings' },
    { label: t.nav.emperorRings,    path: '/emperor-rings' },
    { label: t.nav.specialEditions, path: '/special-editions' },
    { label: t.nav.goldSilverRings, path: '/gold-silver-rings' },
    { label: t.nav.luxuryQueens,    path: '/luxuryqueens' },
    { label: t.nav.necklaces,       path: '/necklaces' },
    { label: t.nav.courses,         path: '/courses' },
    { label: t.nav.blog,            path: '/blog' },
    { label: t.nav.contact,         path: '/contact' },
  ];

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-[#030303]/85 backdrop-blur-md border-b border-[#C5A059]/20 shadow-[0_4px_30px_rgba(0,0,0,0.7)] py-2 sm:py-2.5'
            : 'bg-transparent pt-[12px] pb-2 border-b border-transparent shadow-none'
        }`}
        style={{
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="relative flex items-center justify-center px-3 sm:px-6 h-[48px] sm:h-[52px]">

          {/* ── MOBILE LOGO: Canto esquerdo superior, elegante, nítido e clicável ── */}
          <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex md:hidden items-center">
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              className="flex items-center gap-2 group cursor-pointer"
              aria-label="RINGS LUXURY Home"
            >
              <img
                src="/PUBLIC/logo-cortado-versao-nova.webp"
                alt="RINGS LUXURY"
                className="w-auto h-7 sm:h-8 object-contain drop-shadow-[0_2px_8px_rgba(197,160,89,0.35)] group-active:scale-95 transition-transform duration-200"
              />
            </a>
          </div>

          {/* ── DESKTOP NAV LINKS — elegante com separadores delicados ── */}
          <nav aria-label={t.nav.home} className="hidden md:flex items-center gap-0">
            {navLinks.map((item, i) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
              const isHome = item.path === '/';
              return (
                <span key={item.path} className="flex items-center">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="text-[#C5A059]/40 mx-1 md:mx-1.5 lg:mx-2 xl:mx-2.5 select-none text-[11px]"
                      style={{
                        textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                      }}
                    >
                      |
                    </span>
                  )}
                  <a
                    href={item.path}
                    onClick={(e) => handleNav(e, item.path)}
                    className="inline-flex items-center transition-colors duration-200 whitespace-nowrap text-[8.5px] md:text-[9px] lg:text-[10px] xl:text-[11px]"
                    style={{
                      fontFamily: "'Arial', sans-serif",
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: isActive ? '#C5A059' : '#D4AF6A',
                      textDecoration: 'none',
                      lineHeight: 1,
                      textShadow: '0 2px 8px rgba(0,0,0,0.95), 0 0 16px rgba(0,0,0,0.8)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF6A';
                    }}
                  >
                    {isHome && (
                      <img
                        src="/PUBLIC/logo-cortado-versao-nova.webp"
                        alt=""
                        className="w-auto h-6 md:h-7 lg:h-8 object-contain inline-block mr-3 md:mr-3.5 lg:mr-4 align-middle drop-shadow-[0_2px_8px_rgba(197,160,89,0.4)]"
                      />
                    )}
                    <span>{item.label}</span>
                  </a>
                </span>
              );
            })}
          </nav>

          {/* ── CANTO DIREITO: BANDEIRAS DE TRADUÇÃO, CARRINHO E (NO MOBILE) O MENU BURGER ── */}
          <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3.5">
            
            {/* Bandeiras de idioma (US, ES, BR) */}
            <div className="flex items-center">
              <LanguageFlags />
            </div>

            {/* Ícone do Carrinho */}
            <button
              onClick={() => navigate('/cart')}
              aria-label="Carrinho de compras"
              className="relative flex items-center justify-center w-8 h-8 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <ShoppingCart
                className="w-5 h-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                style={{ color: '#C5A059' }}
                aria-hidden
              />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 rounded-full bg-[#C5A059] text-[#020202] text-[9px] font-bold flex items-center justify-center shadow-md">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Menu Burger no MOBILE (canto direito ao lado do carrinho com animação fluida) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden relative flex items-center justify-center w-8 h-8 rounded-full border border-[#C5A059]/40 bg-black/45 backdrop-blur-md cursor-pointer hover:border-[#C5A059] active:scale-95 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            >
              <div className="w-4 h-3.5 relative flex flex-col justify-between items-center pointer-events-none">
                <span
                  className={`block h-[1.5px] w-full bg-[#E6CA85] rounded-full transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    mobileMenuOpen ? 'translate-y-[5.5px] rotate-45' : 'translate-y-0 rotate-0'
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-[#E6CA85] rounded-full transition-all duration-300 ease-out ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-[#E6CA85] rounded-full transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    mobileMenuOpen ? '-translate-y-[5.5px] -rotate-45' : 'translate-y-0 rotate-0'
                  }`}
                />
              </div>
            </button>

          </div>

        </div>
      </header>

      {/* ── MENU DRAWER MOBILE (FLUIDO, ELEGANTE E SOFISTICADO) ── */}
      <div
        className={`fixed inset-0 z-40 bg-[#030303]/97 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-10 px-6 md:hidden overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Glow dourado radial suave ao fundo */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-[#C5A059]/[0.08] blur-[75px] pointer-events-none"
          aria-hidden
        />

        {/* Topo: Brasão com aura delicada */}
        <div className="flex flex-col items-center justify-center pt-2 select-none relative z-10">
          <img
            src="/PUBLIC/logo-cortado-versao-nova.webp"
            alt="RINGS LUXURY Logo"
            className="w-16 h-auto object-contain drop-shadow-[0_4px_16px_rgba(197,160,89,0.35)]"
          />
          <span className="font-cinzel text-[9.5px] tracking-[0.34em] text-[#C5A059]/80 uppercase mt-2.5">
            Jorge Uquillas Atelier
          </span>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent mt-2" />
        </div>

        {/* Meio: Links sofisticados com entrada suave e micro-interação */}
        <div className="my-auto py-5 flex flex-col items-center w-full max-w-[290px] mx-auto relative z-10">
          {navLinks.map((item, i) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            const isHome = item.path === '/';
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNav(e, item.path)}
                className={`group relative py-2.5 px-4 text-center w-full transition-all duration-500 ease-out font-cinzel text-[12.5px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${60 + i * 26}ms` : '0ms',
                  color: isActive ? '#F3EFE6' : '#CBB27C',
                  textShadow: isActive ? '0 0 14px rgba(197,160,89,0.7)' : 'none',
                }}
              >
                {isHome && (
                  <img
                    src="/PUBLIC/logo-cortado-versao-nova.webp"
                    alt=""
                    className="w-auto h-4 object-contain inline-block drop-shadow-[0_2px_6px_rgba(197,160,89,0.4)]"
                  />
                )}
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-105 group-hover:text-[#FFF]">
                  {item.label}
                </span>
                {/* Linha dourada sutil se for a página ativa */}
                {isActive && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent rounded-full"
                    aria-hidden
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Base: Botão refinado do Carrinho */}
        <div className="pt-2 flex flex-col items-center justify-center relative z-10">
          <button
            onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}
            className="group flex items-center justify-center gap-2.5 text-[#E6CA85] hover:text-[#020202] hover:bg-[#C5A059] text-[11px] font-cinzel font-semibold tracking-[0.2em] uppercase px-7 py-3 rounded-full border border-[#C5A059]/60 bg-[#C5A059]/[0.08] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            <span>{t.nav.cart} {count > 0 && `(${count})`}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
