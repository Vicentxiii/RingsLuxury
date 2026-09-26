interface Review {
  id: string;
  name: string;
  photo: string | null;
  initial: string;
  text: string;
}

/**
 * Seção "WHAT PEOPLE SAY ABOUT RINGS LUXURY" — provas sociais (Google Reviews)
 * - Fundo: Sessao-clientes-rings-luxury-site-2026.jpg (escultura dourada à direita)
 * - Badge: Rings Luxury Google Reviews.webp (5-STAR RATING Google)
 * - Clientes: fotos reais enviadas em public/PUBLIC (Rings Luxury Google Reviews client 1-5.png)
 * - Copy fiel ao print do site antigo
 */
const REVIEWS: Review[] = [
  {
    id: 'r-1',
    name: 'Silvio Gomez',
    photo: '/PUBLIC/Rings Luxury Google Reviews client 1.png',
    initial: '',
    text: "Best artisan in the jewelry business I've ever met, his traces in burin are unique and exclusive, owning a jewel by the artist Jorge Uquillas is without a doubt a privilege, congratulations and thank you Master.",
  },
  {
    id: 'r-2',
    name: 'Tommy Chan',
    photo: '/PUBLIC/Rings Luxury Google Reviews CLIENT 2.png',
    initial: '',
    text: 'An excellent professional, he has mastery in the art of the burin in addition to extreme creativity... a true professor. With regard to the person: Exemplary honesty... it is a pleasure to be able to enjoy this sincere friendship... congratulations showered with much success, noble Jorge... I hope to be able to increase my collectibles as soon as possible...',
  },
  {
    id: 'r-3',
    name: 'Gerson Mella Filho',
    photo: '/PUBLIC/Rings Luxury Google Reviews Client 3.png',
    initial: '',
    text: 'Jorge is not only an amazing artist but also a great professional. Care, dedication, humility and honesty. There is no other like him.',
  },
  {
    id: 'r-4',
    name: 'Lilian Ferro Duarte',
    photo: '/PUBLIC/Rings Luxury Google Reviews Client 4.png',
    initial: '',
    text: 'Jorge Pessoa talentosa, criativa, honesta e muito gentil, adorei o anel que ele fez para mim. Agora vou fazer mais 4 peças com ele pois são joias únicas e exclusivamente feitas à mão e para você! Indico com tamanha certeza!',
  },
  {
    id: 'r-5',
    name: 'Nelson Pereira',
    photo: null,
    initial: 'N',
    text: 'Grande artista. Competente e com muita criatividade. Atendimento personalizado, explicação detalhada do trabalho aprovado. Seriedade no trato de valores e pontualidade na entrega.',
  },
  {
    id: 'r-6',
    name: 'Alexandre Ribeiro',
    photo: '/PUBLIC/Rings Luxury Google Reviews Client 5.png',
    initial: '',
    text: 'Como sempre surpreendi, transformam sonhos em joias, obrigado mais uma vez por esse trabalho.',
  },
];

const jsonLdReviews = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'WHAT PEOPLE SAY ABOUT RINGS LUXURY - Jorge Uquillas - Handmade 18k Gold Rings',
  description:
    'Verified Google reviews from collectors worldwide who own 1/1 handmade 18k gold rings crafted by master goldsmith Jorge Uquillas with burin engraving.',
  itemListElement: REVIEWS.map((r, idx) => ({
    '@type': 'https://schema.org/Review',
    position: idx + 1,
    author: { '@type': 'Person', name: r.name || 'Verified Google reviewer' },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    reviewBody: r.text,
    datePublished: '2026-09-01',
    publisher: { '@type': 'Organization', name: 'Google' },
    itemReviewed: {
      '@type': 'Product',
      name: 'Handmade 18k Gold Diamond Ring 1/1 by Jorge Uquillas - Artisanal Burin Engraving',
      brand: { '@type': 'Brand', name: 'RINGS LUXURY - Jorge Uquillas' },
    },
  })),
};

export function WorldClients() {
  return (
    <section
      id="world-clients"
      className="relative w-full overflow-hidden isolate bg-[#020202] text-[#EAE6DF]"
      aria-label="What people say about Rings Luxury"
    >
      {/* Structured data for AI / Google / Bing citation */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdReviews) }} />

      {/* FUNDO — escultura dourada à direita, preto predominante */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src="/PUBLIC/Sessao-clientes-rings-luxury-site-2026.jpg"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-right opacity-[0.85]"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        {/* véu preto para predominância da cor preta */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-black/30 to-[#020202]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/45 to-transparent" aria-hidden />
        {/* fades topo/base para esconder o corte com as seções vizinhas */}
        <div className="absolute top-0 left-0 w-full h-[110px] sm:h-[150px] bg-gradient-to-b from-[#020202] to-transparent pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 w-full h-[110px] sm:h-[150px] bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" aria-hidden />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-20 sm:py-24 lg:py-28">
        {/* TÍTULO */}
        <h2
          className="text-center font-cinzel font-normal uppercase text-[#E6CA85]"
          style={{ fontSize: 'clamp(18px, 2.4vw, 32px)', letterSpacing: '0.14em' }}
        >
          What people say about Rings Luxury
        </h2>

        {/* BADGE 5-STAR GOOGLE */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <img
            src="/PUBLIC/Rings Luxury Google Reviews.webp"
            alt="Avaliação 5 estrelas no Google — Rings Luxury by Jorge Uquillas"
            draggable={false}
            className="w-[150px] sm:w-[185px] h-auto object-contain select-none drop-shadow-[0_10px_30px_rgba(197,160,89,0.28)]"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
        </div>

        {/* AVALIAÇÕES */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-x-5 sm:gap-x-6 lg:gap-x-8 gap-y-10">
          {REVIEWS.map((r) => (
            <article
              key={r.id}
              className="flex flex-col items-center text-center"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* avatar */}
              <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden bg-[#0A0A0A] border border-[#C5A059]/35 flex items-center justify-center shrink-0">
                {r.photo ? (
                  <img
                    src={r.photo}
                    alt={r.name || 'Cliente Rings Luxury'}
                    draggable={false}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                ) : (
                  <span
                    className="w-full h-full rounded-full bg-[#4285F4] flex items-center justify-center font-sans-luxury font-semibold text-white"
                    style={{ fontSize: '20px' }}
                    aria-hidden
                  >
                    {r.initial}
                  </span>
                )}
              </div>

              {/* copy */}
              <p
                className="mt-3 font-cormorant italic text-[#E8E3D6] leading-[1.5] text-[11.5px] sm:text-[12.5px]"
                itemProp="reviewBody"
              >
                {r.text}
              </p>

              {/* nome */}
              {r.name && (
                <span
                  className="mt-2.5 font-cormorant italic font-semibold text-[#C5A059] text-[13px] sm:text-[14px] tracking-[0.02em]"
                  itemProp="author"
                >
                  {r.name}
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorldClients;
