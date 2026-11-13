import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Necklaces } from './pages/Necklaces';
import { LuxuryRings } from './pages/LuxuryRings';
import { EmperorRings } from './pages/EmperorRings';
import { SpecialEditions } from './pages/SpecialEditions';
import { GoldSilverRings } from './pages/GoldSilverRings';
import { LuxuryQueens } from './pages/LuxuryQueens';
import { Courses } from './pages/Courses';
import { ContactPage } from './pages/ContactPage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { FaqPage } from './pages/FaqPage';
import { PolicyPage } from './pages/PolicyPage';
import { Gallery } from './pages/Gallery';
import { AllPieces } from './pages/AllPieces';
import { LuxuryRingsGuide } from './pages/LuxuryRingsGuide';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { JorgeUquillas } from './pages/JorgeUquillas';
import { HandEngraving } from './pages/HandEngraving';

import { AudioProvider } from './context/AudioProvider';
import { LanguageProvider } from './i18n/LanguageContext';
import { CartProvider } from './context/CartContext';
import { Analytics } from './components/Analytics';
import { EpicPreloader } from './components/EpicPreloader';

/** Sempre abre a nova rota do início (topo), mobile + desktop. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [revealSettled, setRevealSettled] = useState(false);

  useEffect(() => {
    // Trava o scroll da página enquanto o preloader épico estiver ativo
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  useEffect(() => {
    // 3.8s de preloader épico com os anéis randômicos e partículas
    const t1 = setTimeout(() => {
      setIsPreloading(false);
      requestAnimationFrame(() => setIsRevealing(true));
    }, 3800);

    // Remove o preloader do DOM após o fade de 700ms
    const t2 = setTimeout(() => {
      setShowPreloader(false);
    }, 3800 + 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Libera estilos de reveal para garantir posicionamento fixed do header e menus
  useEffect(() => {
    if (!isRevealing) return;
    const t3 = setTimeout(() => setRevealSettled(true), 1250);
    return () => clearTimeout(t3);
  }, [isRevealing]);

  return (
    <AudioProvider>
      <LanguageProvider>
        <CartProvider>
          {showPreloader && <EpicPreloader isExiting={!isPreloading} />}
          <div
            className={
              revealSettled
                ? undefined
                : 'transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[filter,opacity,transform]'
            }
            style={
              revealSettled
                ? undefined
                : {
                    filter: isRevealing ? 'blur(0px)' : 'blur(14px)',
                    opacity: isRevealing ? 1 : 0,
                    transform: isRevealing ? 'scale(1)' : 'scale(0.985)',
                    transitionDuration: '1000ms',
                    transitionProperty: 'filter, opacity, transform',
                  }
            }
          >
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/luxury-rings" element={<LuxuryRings />} />
              <Route path="/emperor-rings" element={<EmperorRings />} />
              <Route path="/special-editions" element={<SpecialEditions />} />
              <Route path="/gold-silver-rings" element={<GoldSilverRings />} />
              <Route path="/necklaces" element={<Necklaces />} />
              <Route path="/luxuryqueens" element={<LuxuryQueens />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy" element={<PolicyPage />} />
              <Route path="/terms" element={<PolicyPage />} />
              <Route path="/shipping" element={<PolicyPage />} />
              <Route path="/returns" element={<PolicyPage />} />
              <Route path="/warranty" element={<PolicyPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/collections" element={<AllPieces />} />
              <Route path="/luxury-rings-guide" element={<LuxuryRingsGuide />} />
              <Route path="/produto/:slug" element={<ProductPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/jorge-uquillas" element={<JorgeUquillas />} />
              <Route path="/jorgeuquillas" element={<Navigate to="/jorge-uquillas" replace />} />
              <Route path="/hand-engraving" element={<HandEngraving />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
          </div>
        </CartProvider>
      </LanguageProvider>
    </AudioProvider>
  );
}
