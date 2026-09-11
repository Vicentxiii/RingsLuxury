import React, { useState, useEffect } from 'react';
import { LaurelWreath } from './OrnamentIcons';
import { AudioAtmosphere } from './AudioAtmosphere';
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigateToJorgeUquillas?: () => void;
}

export function Header({ onOpenConsultation, onNavigateToJorgeUquillas }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const menuItems: StaggeredMenuItem[] = [
    {
      label: 'Home',
      ariaLabel: 'Return to introduction and temple of art',
      link: '#hero',
      onClick: (e) => {
        e.preventDefault();
        const el = document.getElementById('hero');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Collections',
      ariaLabel: 'Explore high jewelry artifacts and antiquities',
      link: '#collections',
      onClick: (e) => {
        e.preventDefault();
        const el = document.getElementById('collections');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'The Atelier',
      ariaLabel: 'Step inside the private Parisian and Athenian workshop',
      link: '#atelier',
      onClick: (e) => {
        e.preventDefault();
        const el = document.getElementById('atelier');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Craftsmanship',
      ariaLabel: 'Witness lost-wax casting, repoussé and gem-setting',
      link: '#craftsmanship',
      onClick: (e) => {
        e.preventDefault();
        const el = document.getElementById('craftsmanship');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Heritage',
      ariaLabel: 'Three generations of classic Greek goldsmithing',
      link: '#heritage',
      onClick: (e) => {
        e.preventDefault();
        const el = document.getElementById('heritage');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Masterpieces',
      ariaLabel: 'Explore singular haute joaillerie archival creations',
      link: '#masterpiece',
      onClick: (e) => {
        e.preventDefault();
        const el = document.getElementById('masterpiece');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    ...(onNavigateToJorgeUquillas
      ? [
          {
            label: 'Jorge Uquillas',
            ariaLabel: 'Exclusive 360 sculpture: Laocoön — Bronze and Time',
            link: '#/jorge-uquillas',
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              onNavigateToJorgeUquillas();
            },
          },
        ]
      : []),
    {
      label: 'Private Salon',
      ariaLabel: 'Book a confidential bespoke commission consultation',
      link: '#contact',
      onClick: (e) => {
        e.preventDefault();
        onOpenConsultation();
      },
    },
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
            href="#hero"
            id="brand-logo"
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
