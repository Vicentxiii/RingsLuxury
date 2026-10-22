import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResponsiveImg } from '../components/ResponsiveImg';
import { products, formatPrice } from '../data/products';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * Índice completo das 43 peças.
 *
 * Existe para resolver dois problemas de SEO:
 * 1. seis peças não apareciam em nenhuma categoria e ficavam órfãs;
 * 2. o site não tinha uma página que reunisse todas as URLs de produto,
 *    diluindo o internal linking.
 */
export function AllPieces() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const copy =
    lang === 'es'
      ? {
          title: 'TODAS LAS PIEZAS',
          description:
            'Catálogo completo de anillos 1/1 hechos a mano en oro 18k por Jorge Uquillas. Diamantes naturales, grabado a mano y envío asegurado a todo el mundo.',
          intro:
            'Cada pieza es única: la matriz de cera se destruye después del vaciado, por lo que ninguna puede repetirse. Explora las 43 obras disponibles.',
          count: (n: number) => `${n} piezas únicas`,
        }
      : lang === 'pt'
        ? {
            title: 'TODAS AS PEÇAS',
            description:
              'Catálogo completo de anéis 1/1 feitos à mão em ouro 18k por Jorge Uquillas. Diamantes naturais, gravação à mão e envio segurado para todo o mundo.',
            intro:
              'Cada peça é única: a matriz de cera é destruída após a fundição, então nenhuma pode ser repetida. Explore as 43 obras disponíveis.',
            count: (n: number) => `${n} peças únicas`,
          }
        : {
            title: 'ALL PIECES',
            description:
              'Complete catalogue of 1/1 handmade 18k gold rings by Jorge Uquillas. Natural diamonds, hand engraving and fully insured worldwide delivery.',
            intro:
              'Every piece is one of one: the wax matrix is destroyed after casting, so it can never be repeated. Explore all 43 available works.',
            count: (n: number) => `${n} one-of-one pieces`,
          };

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF]">
      <SEO
        title={copy.title}
        description={copy.description}
        url="/collections"
        pageType="CollectionPage"
        keywords="handmade 18k gold rings, one of one jewelry, Jorge Uquillas, luxury rings catalogue"
      />
      <Header onOpenConsultation={() => navigate('/contact')} />

      <main className="relative w-full overflow-hidden">
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 pt-36 sm:pt-44 pb-24">
          <Breadcrumbs items={[{ label: 'HOME', to: '/' }, { label: copy.title }]} />

          <header className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] mb-4">
              {copy.count(products.length)}
            </p>
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.12em] text-white">
              {copy.title}
            </h1>
            <p className="font-cormorant text-lg sm:text-xl text-[#C2BDB2] leading-relaxed mt-6">
              {copy.intro}
            </p>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/produto/${product.slug}`}
                  className="group block border border-[#C5A059]/20 hover:border-[#C5A059]/60 bg-[#070707] transition-colors duration-500"
                >
                  <div className="relative aspect-square overflow-hidden bg-black">
                    <ResponsiveImg
                      src={product.images[0]}
                      alt={`${product.name}, ${product.subname} — handmade 18k gold by Jorge Uquillas`}
                      width={800}
                      height={800}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 24vw"
                      className="w-full h-full object-contain p-5 transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5 border-t border-[#C5A059]/15">
                    <h2 className="font-cinzel text-sm tracking-[0.18em] text-[#F3EFE6] group-hover:text-[#E6CA85] transition-colors">
                      {product.name}
                    </h2>
                    <p className="font-cormorant italic text-sm text-[#9A7B38] mt-1">
                      {product.subname}
                    </p>
                    <div className="flex items-center justify-between gap-3 mt-4">
                      <span className="font-sans-luxury text-[10px] uppercase tracking-[0.25em] text-[#A8A296]">
                        {product.category}
                      </span>
                      <span className="font-cinzel text-xs text-[#C5A059]">
                        {formatPrice(product.priceNumber)}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
