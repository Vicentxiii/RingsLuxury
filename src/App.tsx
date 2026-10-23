import { useEffect } from 'react';
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

// Rotas estáticas de propósito. O HTML pré-renderizado foi gerado por
// renderização no cliente e não tem os marcadores de Suspense que o React
// exige para hidratar. Com lazy/Suspense, a hidratação descartava a árvore
// inteira e repintava o hero no fim (LCP 8 s). Sem Suspense, o React hidrata
// o HTML existente e o LCP fica no primeiro paint.
import { AudioProvider } from './context/AudioProvider';
import { LanguageProvider } from './i18n/LanguageContext';
import { CartProvider } from './context/CartContext';
import { Analytics } from './components/Analytics';

/** Sempre abre a nova rota do início (topo), mobile + desktop.
 * Sem isso o React Router mantém o scroll anterior e a página
 * abre lá no rodapé. Instantâneo, sem animação smooth que mostraria
 * o footer passando. */
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
  // Sem preloader. O conteúdo é pintado no primeiro frame e nenhum overlay
  // atrasa LCP, leitura ou interação. O componente EpicPreloader permanece
  // no repositório apenas como referência visual e não é carregado.
  return (
    <AudioProvider>
      <LanguageProvider>
      <CartProvider>
      <div>
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
      {/* FAQ mestre: respostas diretas, alvo de citacao por Google e IA. */}
      <Route path="/faq" element={<FaqPage />} />
      {/* Politicas: sinal de confiança de e-commerce + exigência legal
          (LGPD/GDPR/CCPA). Textos em src/data/policies.ts.
          Rotas explícitas: o React Router 7 não casa o padrão de regex
          `/:policy(privacy|terms|...)`; com ele, as cinco URLs caíam em 404. */}
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
