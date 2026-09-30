import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GalleryPage } from './pages/GalleryPage';
import { LuxuryRings } from './pages/LuxuryRings';
import { LuxuryQueens } from './pages/LuxuryQueens';
import { Courses } from './pages/Courses';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { ProductPage } from './pages/ProductPage';
import { JorgeUquillas } from './pages/JorgeUquillas';
import { AudioProvider } from './context/AudioProvider';
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
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/luxury-rings" element={<LuxuryRings />} />
      <Route path="/emperor-rings" element={<GalleryPage title="Emperor Rings" categorySlug="emperor-rings" />} />
      <Route path="/special-editions" element={<GalleryPage title="Special Editions" categorySlug="special-editions" />} />
      <Route path="/gold-silver-rings" element={<GalleryPage title="Gold & Silver Rings" categorySlug="gold-silver-rings" />} />
      <Route path="/necklaces" element={<GalleryPage title="Necklaces" categorySlug="necklaces" />} />
      <Route path="/luxuryqueens" element={<LuxuryQueens />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/produto/:slug" element={<ProductPage />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/jorge-uquillas" element={<JorgeUquillas />} />
      <Route path="/jorgeuquillas" element={<JorgeUquillas />} />
      <Route path="*" element={<Home />} />
    </Routes>
      </div>
    </AudioProvider>
  );
}
