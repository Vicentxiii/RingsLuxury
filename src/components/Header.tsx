import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigateToJorgeUquillas?: () => void;
}

export function Header({ onOpenConsultation: _onOpenConsultation }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { count } = useCart();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (location.pathname !== path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'HOME',            path: '/' },
    { label: 'LUXURY RINGS',   path: '/luxury-rings' },
    { label: 'EMPEROR RINGS',  path: '/emperor-rings' },
    { label: 'SPECIAL EDITIONS', path: '/special-editions' },
    { label: 'GOLD-SILVER RINGS', path: '/gold-silver-rings' },
    { label: 'LUXURY QUEENS',  path: '/luxuryqueens' },
    { label: 'NECKLACES',      path: '/necklaces' },
    { label: 'COURSES',        path: '/courses' },
    { label: 'CONTACT',        path: '/contact' },
  ];

  return (
    <header
      id="site-header"
      className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]"
      style={{ borderBottom: '1px solid rgba(197,160,89,0.15)' }}
    >
      <div className="relative flex items-center justify-center px-4 h-[46px]">

        {/* NAV LINKS — centered */}
        <nav aria-label={t.nav.home} className="hidden md:flex items-center gap-0">
          {navLinks.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <span key={item.path} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="text-[#C5A059]/40 mx-3 select-none"
                    style={{ fontSize: '11px' }}
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

        {/* CART — absolute right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
          <button
            onClick={() => navigate('/cart')}
            aria-label="Carrinho de compras"
            className="relative flex items-center justify-center w-8 h-8 hover:opacity-80 transition-opacity"
          >
            <ShoppingCart
              className="w-5 h-5"
              style={{ color: '#C5A059' }}
              aria-hidden
            />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 rounded-full bg-[#C5A059] text-[#020202] text-[9px] font-bold flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE HAMBURGER — shown only on mobile */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden flex items-center">
          <MobileMenu navLinks={navLinks} handleNav={handleNav} cartCount={count} navigate={navigate} />
        </div>

      </div>
    </header>
  );
}

/* ── Mobile Menu (hamburger) ─────────────────────────────────────────── */
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

function MobileMenu({
  navLinks,
  handleNav,
  cartCount,
  navigate,
}: {
  navLinks: { label: string; path: string }[];
  handleNav: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
  cartCount: number;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className="flex items-center justify-center w-8 h-8"
      >
        {open
          ? <X className="w-5 h-5 text-[#C5A059]" />
          : <Menu className="w-5 h-5 text-[#C5A059]" />
        }
      </button>

      {open && (
        <div
          className="fixed inset-0 top-[46px] bg-[#0a0a0a]/98 z-50 flex flex-col items-center justify-center gap-0"
          onClick={() => setOpen(false)}
        >
          {navLinks.map((item, i) => (
            <React.Fragment key={item.path}>
              {i > 0 && (
                <span className="text-[#C5A059]/30 text-xs">|</span>
              )}
              <a
                href={item.path}
                onClick={(e) => { handleNav(e, item.path); setOpen(false); }}
                className="py-3 text-[13px] font-bold tracking-[0.12em] text-[#D4AF6A] hover:text-white transition-colors"
              >
                {item.label}
              </a>
            </React.Fragment>
          ))}
          <div className="mt-6">
            <button
              onClick={() => { navigate('/cart'); setOpen(false); }}
              className="flex items-center gap-2 text-[#C5A059] text-[12px] tracking-[0.1em]"
            >
              <ShoppingCart className="w-4 h-4" />
              CART {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
