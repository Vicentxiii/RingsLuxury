import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Necklaces } from './pages/Necklaces';
import { LuxuryRings } from './pages/LuxuryRings';
import { EmperorRings } from './pages/EmperorRings';
import { SpecialEditions } from './pages/SpecialEditions';
import { GoldSilverRings } from './pages/GoldSilverRings';
import { LuxuryQueens } from './pages/LuxuryQueens';
import { Courses } from './pages/Courses';
// WebGL pesado (three.js) — carrega só ao visitar /contact
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { ProductPage } from './pages/ProductPage';
import { JorgeUquillas } from './pages/JorgeUquillas';
import { AudioProvider } from './context/AudioProvider';
import { LanguageProvider } from './i18n/LanguageContext';
import { EpicPreloader } from './components/EpicPreloader';

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [revealSettled, setRevealSettled] = useState(false);

  useEffect(() => {
    // Bloqueia scroll enquanto preloader visível
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
    // 4s de loading épico, depois inicia blur reveal de 1.2s
    const t1 = setTimeout(() => {
      setIsPreloading(false);
      // pequeno delay para sincronizar blur com fade do preloader
      requestAnimationFrame(() => setIsRevealing(true));
    }, 4000);

    // remove preloader do DOM após fade (700ms) + buffer
    const t2 = setTimeout(() => {
      setShowPreloader(false);
    }, 4000 + 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // filter/transform criam containing block e quebram position:fixed do header.
  // Removidos assim que o reveal termina, para o menu/audio ficarem fixos no viewport.
  useEffect(() => {
    if (!isRevealing) return;
    const t3 = setTimeout(() => setRevealSettled(true), 1250);
    return () => clearTimeout(t3);
  }, [isRevealing]);

  return (
    <AudioProvider>
      <LanguageProvider>
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
                filter: isRevealing ? 'blur(0px)' : 'blur(16px)',
                opacity: isRevealing ? 1 : 0,
                transform: isRevealing ? 'scale(1)' : 'scale(0.985)',
                transitionDuration: '1200ms',
                transitionProperty: 'filter, opacity, transform',
              }
        }
      >
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
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
      <Route path="/produto/:slug" element={<ProductPage />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/jorge-uquillas" element={<JorgeUquillas />} />
      <Route path="/jorgeuquillas" element={<JorgeUquillas />} />
      <Route path="*" element={<Home />} />
    </Routes>
        </Suspense>
      </div>
      </LanguageProvider>
    </AudioProvider>
  );
}
