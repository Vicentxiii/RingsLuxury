import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { GalleryPage } from './pages/GalleryPage';
import { LuxuryQueens } from './pages/LuxuryQueens';
import { Courses } from './pages/Courses';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  return (
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
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
