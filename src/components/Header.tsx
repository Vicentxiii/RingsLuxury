import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { AudioAtmosphere } from './AudioAtmosphere';
import { LanguageFlags } from './LanguageFlags';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigateToJorgeUquillas?: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isAnchor: boolean = false) => {
    e.preventDefault();
    if (isAnchor) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(path.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (location.pathname !== path) {
        navigate(path);
        // instantâneo: abre do início, sem passar pelo rodapé no smooth
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          document.documentElement.scrollTop = 0;
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  };

  const menuItems: StaggeredMenuItem[] = [
    {
      label: t.nav.home,
      ariaLabel: 'Return to introduction and temple of art',
      link: '/',
      onClick: (e) => handleNavigation(e, '/'),
    },
    {
      label: t.nav.luxuryRings,
      link: '/luxury-rings',
      onClick: (e) => handleNavigation(e, '/luxury-rings'),
    },
    {
      label: t.nav.emperorRings,
      link: '/emperor-rings',
      onClick: (e) => handleNavigation(e, '/emperor-rings'),
    },
    {
      label: t.nav.specialEditions,
      link: '/special-editions',
      onClick: (e) => handleNavigation(e, '/special-editions'),
    },
    {
      label: t.nav.goldSilverRings,
      link: '/gold-silver-rings',
      onClick: (e) => handleNavigation(e, '/gold-silver-rings'),
    },
    {
      label: t.nav.luxuryQueens,
      link: '/luxuryqueens',
      onClick: (e) => handleNavigation(e, '/luxuryqueens'),
    },
    {
      label: t.nav.necklaces,
      link: '/necklaces',
      onClick: (e) => handleNavigation(e, '/necklaces'),
    },
    {
      label: t.nav.courses,
      link: '/courses',
      onClick: (e) => handleNavigation(e, '/courses'),
    },
    {
      label: t.nav.gallery,
      link: '/gallery',
      onClick: (e) => handleNavigation(e, '/gallery'),
    },
    {
      label: t.nav.contact,
      link: '/contact',
      onClick: (e) => handleNavigation(e, '/contact'),
    },
    {
      label: t.nav.blog,
      link: '/blog',
      onClick: (e) => handleNavigation(e, '/blog'),
    },
    {
      label: t.nav.cart,
      link: '/cart',
      onClick: (e) => handleNavigation(e, '/cart'),
    }
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Miami', link: '#contact' },
    { label: 'São Paulo Brasil', link: '#contact' },
    { label: 'Instagram @ringsluxury', link: 'https://www.instagram.com/ringsluxury' },
  ];

  return (
    <>
      {/* Background glass strip when scrolling */}
      <div
        className={`fixed top-0 left-0 w-full pointer-events-none z-40 transition-all duration-700 ${
          isScrolled
            ? 'h-20 bg-[#020202]/90 backdrop-blur-xl border-b border-[#C5A059]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'h-24 bg-gradient-to-b from-[#020202]/80 to-transparent'
        }`}
      />

      {/* The React Bits StaggeredMenu Component */}
      <StaggeredMenu
        isFixed={true}
        position="right"
        colors={['#18140E', '#2B2213', '#080808']}
        customLogo={
          <a
            href="/"
            id="brand-logo"
            onClick={(e) => handleNavigation(e, '/')}
            className="group flex items-center gap-3 text-left focus:outline-none transition-transform hover:scale-[1.02]"
          >
            <img
              src="/PUBLIC/logo-original.webp"
              alt="RINGS LUXURY by Jorge Uquillas, Anéis artesanais HandCrafted ouro 18k"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain select-none shrink-0"
              draggable={false}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('logo-original.webp')) {
                  target.src = '/PUBLIC/logo-cortado.webp';
                } else if (!target.src.includes('logo.svg')) {
                  target.src = '/logo.svg';
                }
              }}
            />
            <div className="flex flex-col">
              <span className="font-cinzel text-[11px] tracking-[0.2em] sm:text-sm sm:tracking-[0.28em] md:text-lg font-semibold text-[#F3EFE6] group-hover:text-[#C5A059] transition-colors duration-500">
                RINGS LUXURY
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.35em] text-[#9A7B38]">
                {t.nav.logoSubtitle}
              </span>
            </div>
          </a>
        }
        extraHeaderActions={
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Pill de áudio só no desktop: no mobile ela sai da header (vira flutuante no canto inferior esquerdo) */}
            <span className="hidden sm:block">
              <AudioAtmosphere />
            </span>
            <button
              onClick={() => navigate('/cart')}
              aria-label={t.nav.cart}
              className="relative w-9 h-9 rounded-full border border-[#C5A059]/40 hover:border-[#C5A059] hover:bg-[#C5A059]/10 flex items-center justify-center transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" aria-hidden />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C5A059] text-[#020202] text-[10px] font-bold flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
            <LanguageFlags />
          </div>
        }
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#C5A059"
        openMenuButtonColor="#C5A059"
        accentColor="#C5A059"
        changeMenuColorOnOpen={true}
        closeOnClickAway={true}
      />

      {/* Player mobile: fixo no canto inferior esquerdo, fora da header */}
      <div
        className="sm:hidden fixed left-4 z-[55]"
        style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <AudioAtmosphere />
      </div>
    </>
  );
}
export default Header;
