import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';
import reviewsData from '../data/reviews.json';

/**
 * Seção "WHAT PEOPLE SAY ABOUT RINGS LUXURY" — carrossel de depoimentos reais
 * - Fundo: Sessao-clientes-rings-luxury-site-2026.jpg (escultura dourada à direita)
 * - Badge: Rings Luxury Google Reviews.webp (5-STAR RATING Google)
 * - Clientes: fotos reais enviadas em public/PUBLIC (Rings Luxury Google Reviews client 1-5.png)
 *
 * Fonte de dados: src/data/reviews.json (fonte única, compartilhada com o
 * plugin de build que injeta o JSON-LD e o HTML estático).
 *
 * NÃO declarar JSON-LD aqui. Este componente é renderizado por JS, então o
 * schema ficaria invisível para crawlers que não executam JavaScript. O
 * schema vive no HTML inicial, gerado em build por vite-plugin-seo-inject.ts.
 *
 * O carrossel esconde conteúdo, mas isso não afeta indexação: o bloco estático
 * de build lista os 6 reviews em HTML puro para quem não roda JS.
 */
const REVIEWS = reviewsData.reviews;
const AUTOPLAY_MS = 7000;

export function WorldClients() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // Pausa explícita do usuário é independente da pausa temporária por
  // hover/foco. Se fossem o mesmo estado, mouseleave retomaria a rotação e
  // sobrescreveria o pause que a pessoa acabou de clicar.
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const paused = userPaused || hoverPaused;

  // Segue o autoplay só quando o usuário não pausou, não prefere movimento
  // reduzido e a aba está visível. WCAG 2.2.2 exige forma de pausar.
  useEffect(() => {
    if (paused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: number | undefined;
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), AUTOPLAY_MS);
    };
    // Recria o timer ao voltar para a aba, senão o autoplay morre para sempre.
    const onVisibility = () => (document.hidden ? window.clearInterval(timer) : start());

    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [paused]);

  // Leva o slide ao índice. Cada slide é w-full, sem gap nem padding no track,
  // então o passo é exatamente clientWidth. Não usa offsetLeft de propósito:
  // isso mediria a partir do offsetParent, que não é o track. O cálculo é
  // espelhado no onScroll, então os dois lados concordam por construção.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Se o índice já é o refletido pelo scroll, a mudança veio do próprio
    // usuário arrastando — não reposicionar.
    if (Math.round(el.scrollLeft / el.clientWidth) === index) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  }, [index]);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex((prev) => (prev === i ? prev : i));
  }, []);

  // Redimensionar muda clientWidth e deixa o scrollLeft obsoleto, o que
  // deixaria o carrossel parado no meio de um slide (comum ao girar o
  // celular). Reposiciona sem animação para o slide atual.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => el.scrollTo({ left: index * el.clientWidth });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [index]);

  const goTo = useCallback((i: number) => {
    setIndex(((i % REVIEWS.length) + REVIEWS.length) % REVIEWS.length);
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length);
  }, []);

  const active = REVIEWS[index];
  const { businessProfileUrl, platform } = reviewsData.source;

  return (
    <section
      id="world-clients"
      className="relative w-full overflow-hidden isolate bg-[#020202] text-[#EAE6DF]"
      aria-label="What people say about Rings Luxury"
    >
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

        {/* CARROSSEL */}
        <div
          className="relative mt-12 sm:mt-14"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onFocusCapture={() => setHoverPaused(true)}
          onBlurCapture={() => setHoverPaused(false)}
        >
          {/* setas desktop */}
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Avaliação anterior"
            className="hidden md:flex absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#080808]/90 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Próxima avaliação"
            className="hidden md:flex absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#080808]/90 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#020202] items-center justify-center transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* track — cada slide = 100% da largura, snap por slide */}
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#C5A059]/30"
            style={{ scrollbarWidth: 'thin' }}
            role="group"
            aria-roledescription="carrossel"
            aria-label="Avaliações de clientes no Google"
          >
            {REVIEWS.map((r, i) => (
              <article
                key={r.id}
                className="w-full shrink-0 snap-center px-1 py-2 focus:outline-none"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${REVIEWS.length}`}
                tabIndex={i === index ? 0 : -1}
                aria-hidden={i !== index}
              >
                <div className="max-w-[720px] mx-auto flex flex-col items-center text-center px-2">
                  {/* avatar */}
                  <div className="w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] rounded-full overflow-hidden bg-[#0A0A0A] border border-[#C5A059]/35 flex items-center justify-center shrink-0">
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
                        style={{ fontSize: '28px' }}
                        aria-hidden
                      >
                        {r.initial}
                      </span>
                    )}
                  </div>

                  {/* aspas */}
                  <span
                    className="mt-6 font-cinzel text-[#C5A059]/45 leading-none select-none"
                    style={{ fontSize: '44px' }}
                    aria-hidden
                  >
                    &ldquo;
                  </span>

                  {/* copy — sem microdata aqui de propósito: o bloco estático
                      de build já declara Review itemscope completos. Duplicar
                      marcaria o mesmo review duas vezes no HTML renderizado. */}
                  <p className="mt-1 font-cormorant italic text-[#E8E3D6] leading-[1.65] text-[17px] sm:text-[20px] lg:text-[22px]">
                    {r.text}
                  </p>

                  {/* nome */}
                  {r.name && (
                    <span className="mt-6 font-cormorant italic font-semibold text-[#C5A059] text-[16px] sm:text-[18px] tracking-[0.02em]">
                      {r.name}
                    </span>
                  )}

                  {/* estrelas + fonte */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex items-center gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                      ))}
                    </span>
                    <span className="sr-only">5 de 5 estrelas</span>
                    {businessProfileUrl ? (
                      <a
                        href={businessProfileUrl}
                        target="_blank"
                        rel="noopener nofollow"
                        className="text-[11px] uppercase tracking-[0.2em] text-[#9A7B38] hover:text-[#C5A059] transition-colors"
                      >
                        Ver no {platform}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* dots + play/pause */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Escolher avaliação">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Avaliação de ${r.name}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-7 bg-[#C5A059]' : 'w-1.5 bg-[#C5A059]/30 hover:bg-[#C5A059]/60'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Retomar rotação automática' : 'Pausar rotação automática'}
              className="w-8 h-8 rounded-full border border-[#C5A059]/30 text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#020202] transition-colors shrink-0"
            >
              {userPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            {active ? `Avaliação de ${active.name}: ${active.text}` : ''}
          </p>
        </div>
      </div>
    </section>
  );
}

export default WorldClients;
