import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GalleryPage } from './pages/GalleryPage';
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

  return (
    <AudioProvider>
      {showPreloader && <EpicPreloader isExiting={!isPreloading} />}
      <div
        className="transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[filter,opacity,transform]"
        style={{
          filter: isRevealing ? 'blur(0px)' : 'blur(16px)',
          opacity: isRevealing ? 1 : 0,
          transform: isRevealing ? 'scale(1)' : 'scale(0.985)',
          transitionDuration: '1200ms',
          transitionProperty: 'filter, opacity, transform',
        }}
      >
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/luxury-rings" element={<GalleryPage title="Luxury Rings" categorySlug="luxury-rings" />} />
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
