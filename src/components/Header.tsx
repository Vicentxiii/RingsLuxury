import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AudioAtmosphere } from './AudioAtmosphere';
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigateToJorgeUquillas?: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const menuItems: StaggeredMenuItem[] = [
    {
      label: 'HOME',
      ariaLabel: 'Return to introduction and temple of art',
      link: '/',
      onClick: (e) => handleNavigation(e, '/'),
    },
    {
      label: 'LUXURY RINGS',
      link: '/luxury-rings',
      onClick: (e) => handleNavigation(e, '/luxury-rings'),
    },
    {
      label: 'EMPEROR RINGS',
      link: '/emperor-rings',
      onClick: (e) => handleNavigation(e, '/emperor-rings'),
    },
    {
      label: 'SPECIAL EDITIONS',
      link: '/special-editions',
      onClick: (e) => handleNavigation(e, '/special-editions'),
    },
    {
      label: 'GOLD-SILVER RINGS',
      link: '/gold-silver-rings',
      onClick: (e) => handleNavigation(e, '/gold-silver-rings'),
    },
    {
      label: 'LUXURY QUEENS',
      link: '/luxuryqueens',
      onClick: (e) => handleNavigation(e, '/luxuryqueens'),
    },
    {
      label: 'NECKLACES',
      link: '/necklaces',
      onClick: (e) => handleNavigation(e, '/necklaces'),
    },
    {
      label: 'COURSES',
      link: '/courses',
      onClick: (e) => handleNavigation(e, '/courses'),
    },
    {
      label: 'CONTACT',
      link: '#contact',
      onClick: (e) => handleNavigation(e, '#contact', true),
    },
    {
      label: 'BLOG',
      link: '/blog',
      onClick: (e) => handleNavigation(e, '/blog'),
    }
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Place Vendôme', link: '#contact' },
    { label: 'Athens Atelier', link: '#contact' },
    { label: 'Geneva Salon', link: '#contact' },
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
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#C5A059]/50 bg-[#050505] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.25)] group-hover:border-[#C5A059] transition-all">
              <img
                src="/logo.png"
                alt="Rings Luxury Logo"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('logo.svg')) {
                    target.src = '/logo.svg';
                  }
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-sm sm:text-base md:text-lg font-semibold tracking-[0.28em] text-[#F3EFE6] group-hover:text-[#C5A059] transition-colors duration-500">
                RINGS LUXURY
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.35em] text-[#9A7B38]">
                Haute Joaillerie • Atelier
              </span>
            </div>
          </a>
        }
        extraHeaderActions={
          <div className="flex items-center gap-2 sm:gap-3">
            <AudioAtmosphere />
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
    </>
  );
}
export default Header;
