import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';

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
    { label: 'HOME',              path: '/' },
    { label: 'LUXURY RINGS',     path: '/luxury-rings' },
    { label: 'EMPEROR RINGS',    path: '/emperor-rings' },
    { label: 'SPECIAL EDITIONS', path: '/special-editions' },
    { label: 'GOLD-SILVER RINGS', path: '/gold-silver-rings' },
    { label: 'LUXURY QUEENS',    path: '/luxuryqueens' },
    { label: 'NECKLACES',        path: '/necklaces' },
    { label: 'COURSES',          path: '/courses' },
    { label: 'CONTACT',          path: '/contact' },
  ];

  return (
    <>
      <header
        id="site-header"
        className="fixed top-0 left-0 w-full z-50 bg-transparent transition-colors duration-300 pt-[12px]"
      >
        <div className="relative flex items-center justify-center px-4 sm:px-6 h-[52px]">

          {/* ── DESKTOP NAV LINKS — 100% transparente, apenas letras com sombra suave ── */}
          <nav aria-label={t.nav.home} className="hidden md:flex items-center gap-0">
            {navLinks.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <span key={item.path} className="flex items-center">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="text-[#C5A059]/40 mx-3 select-none"
                      style={{
                        fontSize: '11px',
                        textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                      }}
                    >
                      |
                    </span>
                  )}
                  <a
                    href={item.path}
                    onClick={(e) => handleNav(e, item.path)}
                    className="transition-colors duration-200 whitespace-nowrap"
                    style={{
                      fontFamily: "'Arial', sans-serif",
                      fontSize: '11px',
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
                    {item.label}
                  </a>
                </span>
              );
            })}
          </nav>

          {/* ── CANTO DIREITO: CARRINHO E (NO MOBILE) O MENU BURGER ── */}
          <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
            
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

            {/* Menu Burger no MOBILE (canto direito ao lado do carrinho) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-[#C5A059]/40 bg-black/40 backdrop-blur-sm cursor-pointer hover:border-[#C5A059] transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#C5A059] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]" />
              ) : (
                <Menu className="w-5 h-5 text-[#C5A059] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]" />
              )}
            </button>

          </div>

        </div>
      </header>

      {/* ── MENU DRAWER MOBILE (QUANDO O BURGER É ABERTO) ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[64px] bg-[#050505]/98 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-0 md:hidden animate-in fade-in duration-300 px-6"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Logo nova no topo do menu mobile */}
          <div className="mb-6 flex justify-center">
            <img
              src="/PUBLIC/logo-cortado-versao-nova.webp"
              alt="RINGS LUXURY Logo"
              className="w-16 h-auto object-contain drop-shadow-[0_4px_12px_rgba(197,160,89,0.3)]"
            />
          </div>

          <div className="flex flex-col items-center w-full max-w-[280px]">
            {navLinks.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <React.Fragment key={item.path}>
                  {i > 0 && (
                    <div className="w-12 h-px bg-[#C5A059]/20 my-1" />
                  )}
                  <a
                    href={item.path}
                    onClick={(e) => handleNav(e, item.path)}
                    className="py-2.5 text-[12px] font-bold tracking-[0.14em] text-center w-full transition-colors"
                    style={{
                      fontFamily: "'Arial', sans-serif",
                      color: isActive ? '#C5A059' : '#D4AF6A',
                    }}
                  >
                    {item.label}
                  </a>
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-8 pt-4 border-t border-[#C5A059]/30 w-full max-w-[240px] flex justify-center">
            <button
              onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 text-[#C5A059] text-[12px] font-bold tracking-[0.12em] px-5 py-2.5 rounded-full border border-[#C5A059]/50 hover:bg-[#C5A059]/15 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              CART {count > 0 && `(${count})`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
