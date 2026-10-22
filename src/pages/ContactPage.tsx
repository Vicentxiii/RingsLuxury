import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Instagram, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { AncientCoinMedallion } from '../components/OrnamentIcons';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLanguage } from '../i18n/LanguageContext';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import contact from '../data/contact.json';
import reviewsData from '../data/reviews.json';
import { track } from '../lib/analytics';

const PARTICLE_COUNT = 550;

/** Ultima revisao editorial desta pagina, mostrada e declarada no JSON-LD. */
const PAGE_UPDATED = '2026-10-17';

/**
 * Perguntas da pagina de contato, em dados.
 *
 * Cada `id` vira ancora de heading E alvo do indice, entao o buscador consegue
 * levar o leitor direto na resposta em vez de sempre no topo da pagina.
 */
const CONTACT_SECTIONS = [
  {
    id: 'como-comeca',
    q: 'How does a commission start?',
    a: 'A commission starts with a private consultation, in person at the São Paulo or Miami atelier or by video. In that meeting the design, the metal, the stones, the price and the timeline are all agreed and confirmed in writing, and nothing is cast before you approve the written proposal.',
  },
  {
    id: 'quanto-custa',
    q: 'How much does a handmade 18k gold ring cost?',
    a: 'A handcrafted 18k gold diamond ring from this atelier starts at US$ 4,800, and the Emperor collection sits between US$ 4,800 and US$ 28,000. Mixed gold and silver rings start at US$ 3,500 and sterling silver rings at US$ 1,500. Necklaces reach US$ 150,000 for the Rhino. The price of a bespoke piece is always confirmed in writing before any deposit, because every ring is drawn for one client.',
  },
  {
    id: 'quanto-tempo-demora',
    q: 'How long does it take to make a ring?',
    a: 'A piece is made to order in 60 days from the first 50% payment, of which 90 to 140 hours are hand engraving alone. Transit time then depends on the destination. If you have a date in mind, say so at the consultation, before the gold is cast.',
  },
  {
    id: 'onde-fica',
    q: 'Where is the Rings Luxury atelier?',
    a: `The atelier has two addresses: São Paulo, Avenida Paulista, Brazil, and Miami, Brickell, Florida, USA. Both are by private appointment only. Visits are scheduled, so write or call ahead with your preferred city, your ring size and the story you want told in the piece.`,
  },
  {
    id: 'como-pagar',
    q: 'How do I pay for a commission?',
    a: 'In two stages: 50% to begin the work and 50% before shipping. Major credit cards in instalments, PIX and wire transfer are accepted, always with discreet billing. You receive a written commission proposal and a receipt.',
  },
  {
    id: 'tamanho',
    q: 'How do I know my ring size?',
    a: 'Your size is taken before casting, because each piece is made to measure rather than adjusted from stock. Measure the finger at the end of the day, when it is warmest, and note that wide sculpted bands fit tighter than thin ones.',
  },
  {
    id: 'frete',
    q: 'Do you ship internationally and is it insured?',
    a: 'Yes, to clients in over 50 countries. Every commission travels door to door under full insurance for the declared value, tracked and with mandatory signature, in a hand-worked varnished wooden box inside neutral outer packaging. Shipping is included above US$ 5,000.',
  },
];

/** Termos do oficio, definidos em uma frase cada. Quem nao conhece nao busca. */
const CONTACT_TERMS: Array<{ term: string; def: string }> = [
  {
    term: 'Atelier',
    def: 'A goldsmith workshop. At RINGS LUXURY the atelier is the place where the ring is drawn, cast in solid 18k gold, engraved by hand and finished, with Jorge Uquillas working at the bench himself.',
  },
  {
    term: '1/1, one of one',
    def: 'A piece that exists only once. The original wax matrix is destroyed after casting, so no mould or replica can ever be made and the ring is registered in the atelier archive.',
  },
  {
    term: 'Hand engraving',
    def: 'Cutting the design directly into the solid metal with tempered-steel gravers, 90 to 140 hours per ring, as opposed to laser or machine engraving, which is faster but cannot produce the crisp classical edges of a graver.',
  },
  {
    term: '18k gold',
    def: 'An alloy of 75% pure gold with other metals for hardness, the standard for fine jewelry according to ISO 8653. At this atelier gold is always cast solid, never plated over a base metal.',
  },
  {
    term: 'Hallmark',
    def: 'The atelier mark micro-engraved in the metal itself, the physical proof of origin that travels with the piece alongside the archival folio and the certificate of authenticity.',
  },
];

/** Trecho de um review real, reproduzido sem edicao de src/data/reviews.json. */
const QUOTE_REVIEW = reviewsData.reviews[0];

function makeGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255, 244, 220, 1)');
    g.addColorStop(0.25, 'rgba(230, 202, 133, 0.85)');
    g.addColorStop(0.6, 'rgba(197, 160, 89, 0.28)');
    g.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(c);
}

export function ContactPage() {
  const { t, lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Golden dust, WebGL, pure black, mouse-reactive
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.set(0, 0, 7);

    // WebGL é opcional: em navegador sem GPU, headless, economia de bateria ou
    // bloqueio de driver, a página continua completa, só sem a poeira dourada.
    // Antes, a exceção do construtor derrubava o componente inteiro no build.
    const hasWebGL = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    if (!hasWebGL) {
      canvas.style.display = 'none';
      return;
    }
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    } catch {
      canvas.style.display = 'none';
      return;
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const texture = makeGlowTexture();

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const drift: Array<{ speedY: number; swaySpeed: number; swayRadius: number; phase: number }> = [];

    const gold = new THREE.Color('#C5A059');
    const light = new THREE.Color('#E6CA85');
    const pale = new THREE.Color('#FFF4DC');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const pick = Math.random();
      const col = pick < 0.55 ? gold : pick < 0.85 ? light : pale;
      const dim = 0.55 + Math.random() * 0.45;
      colors[i * 3] = col.r * dim;
      colors[i * 3 + 1] = col.g * dim;
      colors[i * 3 + 2] = col.b * dim;

      drift.push({
        speedY: 0.08 + Math.random() * 0.22,
        swaySpeed: 0.3 + Math.random() * 0.9,
        swayRadius: 0.1 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: texture,
    });

    const dust = new THREE.Points(geo, mat);
    scene.add(dust);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animId = 0;

    const renderFrame = () => {
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      renderFrame();
    } else {
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const delta = Math.min(clock.getDelta(), 0.05);
        const time = clock.getElapsedTime();

        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;

        const arr = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const d = drift[i];
          const idx = i * 3;
          // Gentle rise + lateral drift that follows the mouse
          arr[idx] += (Math.sin(time * d.swaySpeed + d.phase) * d.swayRadius + mouseX * 0.6) * delta;
          arr[idx + 1] += d.speedY * delta;
          arr[idx + 2] += Math.cos(time * d.swaySpeed + d.phase) * d.swayRadius * 0.4 * delta;

          if (arr[idx + 1] > 4.8) {
            arr[idx + 1] = -4.8;
            arr[idx] = (Math.random() - 0.5) * 14;
          }
          if (arr[idx] > 7.5) arr[idx] = -7.5;
          if (arr[idx] < -7.5) arr[idx] = 7.5;
        }
        geo.attributes.position.needsUpdate = true;

        dust.rotation.y = mouseX * 0.12;
        dust.rotation.x = mouseY * 0.06;
        camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 0.45 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderFrame();
      };
      animate();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomHex = Math.floor(Math.random() * 89999 + 10000).toString(16).toUpperCase();
    setBookingCode(`KL-MMXXVI-${randomHex}`);
    setSubmitted(true);
    track('generate_lead', {
      form: 'contact',
      method: 'private_consultation',
    });
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-[#EAE6DF] font-sans-luxury relative overflow-x-hidden">
      <SEO
        title={t.pages.contactPageSeoTitle}
        description={t.pages.contactPageSeoDescription}
        url="/contact"
      />

      {/*
          ContactPage + FAQPage + SpeakableSpecification.

          Os tres faltavam aqui e sao exatamente o que a auditoria apontou:
          - author/datePublished/dateModified: sem data nem assinatura, o buscador
            nao sabe se a informacao ainda vale e quem responde por ela;
          - speakable: sem cssSelector, o assistente escolhe sozinho o que ler e
            quase sempre le o começo do formulario, que nao e a resposta;
          - FAQPage: as perguntas desta pagina estavam em texto solto.
        */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ContactPage',
                ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/contact')}#webpage` } : {}),
                ...(HAS_SITE_URL ? { url: absoluteUrl('/contact') } : {}),
                name: 'Contact the RINGS LUXURY atelier: Jorge Uquillas, São Paulo and Miami',
                inLanguage: lang,
                datePublished: '2026-01-15',
                dateModified: PAGE_UPDATED,
                author: HAS_SITE_URL
                  ? { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` }
                  : { '@type': 'Person', name: 'Jorge Uquillas' },
                about: HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#organization` } : undefined,
                // Le em voz alta o resumo de abertura e a secao de preco, que sao
                // as respostas que o cliente realmente quer.
                speakable: {
                  '@type': 'SpeakableSpecification',
                  cssSelector: ['.seo-summary', '#quanto-custa', '#como-comeca'],
                },
                mainEntity: HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#organization` } : undefined,
              },
              {
                '@type': 'FAQPage',
                ...(HAS_SITE_URL ? { '@id': `${absoluteUrl('/contact')}#faq` } : {}),
                // answer-first: o paragrafo de resposta vem logo depois da
                // pergunta, para o par ser lido como resposta e nao como titulo.
                mainEntity: CONTACT_SECTIONS.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />

      <Header onOpenConsultation={scrollToForm} />

      {/* WebGL golden dust, fixed, pure black, behind everything */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      {/* Cinematic vignette so text stays readable */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]"
      />

      <main className="relative z-10 max-w-2xl mx-auto px-6 pt-36 sm:pt-44 pb-28 text-center">
        <Breadcrumbs
          items={[{ label: t.pages.productBreadcrumbHome, to: '/' }, { label: t.pages.contactPageTitle }]}
        />
        <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.45em] text-[#C5A059] mb-4">
          {t.pages.contactPageKicker}
        </p>
        <h1
          className="font-cinzel font-light uppercase text-[#FBF9F5]"
          style={{ fontSize: 'clamp(38px, 6vw, 68px)', letterSpacing: '0.18em' }}
        >
          {t.pages.contactPageTitle}
        </h1>
        <p className="mt-5 font-cormorant italic text-xl text-[#C5A059] font-light">
          {t.pages.contactPageSubtitle}
        </p>

        {/*
            Resumo de abertura. Sem este parágrafo logo abaixo do H1, o mecanismo de
            resposta nao tem um trecho curto e citavel para a pergunta principal da
            pagina ("como falar com a Rings Luxury") e acaba escolhendo um
            paragrafo qualquer do meio do formulario. Numeros reais de proposito:
            modelo de linguagem so cita o que da para verificar.
          */}
        <p className="seo-summary mt-8 max-w-2xl mx-auto font-cormorant text-xl leading-relaxed text-[#D8D2C4] text-left">
          The RINGS LUXURY atelier is in São Paulo (Avenida Paulista, Brazil) and in Miami
          (Brickell, Florida, USA), and receives clients from over 50 countries by private
          appointment or by video. Jorge Uquillas is a master goldsmith and hand engraver: he draws
          your ring, engraves it by hand for 90 to 140 hours, sets hand-selected natural diamonds
          one by one, and ships it door to door under full insurance. Commissions open with a
          written proposal after the consultation, take 60 days from the first 50% payment, and a
          handcrafted 18k gold diamond ring starts at US$ 4,800. Call {contact.phoneDisplay}, write
          to {contact.email}, or use the form below. Hours: {contact.hours.displayDays},{' '}
          {contact.hours.display}.
        </p>

        <div className="relative mx-auto mt-8 w-full max-w-[320px]" aria-hidden>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[3px] bg-[#E6CA85] blur-[3px] rounded-full" />
        </div>

        {/* Minimalist card */}
        <div id="contact-form" className="mt-12 text-left scroll-mt-32">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="relative p-8 sm:p-12 bg-black/70 backdrop-blur-md border border-[#C5A059]/40 shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
            >
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C5A059]" aria-hidden />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C5A059]" aria-hidden />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C5A059]" aria-hidden />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C5A059]" aria-hidden />

              <div className="space-y-8">
                <div className="border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-2">
                  <label
                    htmlFor="contact-page-name"
                    className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-1"
                  >
                    {t.pages.contactPageFormName}
                  </label>
                  <input
                    id="contact-page-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    aria-label="Your name"
                    required
                    placeholder={t.pages.contactPageFormNamePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#6B6862] focus:outline-none"
                  />
                </div>

                <div className="border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-2">
                  <label
                    htmlFor="contact-page-email"
                    className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-1"
                  >
                    {t.pages.contactPageFormEmail}
                  </label>
                  <input
                    id="contact-page-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-label="Your e-mail"
                    required
                    placeholder={t.pages.contactPageFormEmailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#6B6862] focus:outline-none"
                  />
                </div>

                <div className="border-b border-[#C5A059]/30 focus-within:border-[#C5A059] transition-colors pb-2">
                  <label
                    htmlFor="contact-page-message"
                    className="block text-[9px] uppercase tracking-[0.35em] text-[#9A7B38] mb-1"
                  >
                    {t.pages.contactPageFormMessage}
                  </label>
                  <textarea
                    id="contact-page-message"
                    name="message"
                    rows={4}
                    autoComplete="off"
                    aria-label="Message"
                    required
                    placeholder={t.pages.contactPageFormMessagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#6B6862] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full py-5 bg-[#C5A059] text-[#020202] hover:bg-[#E6CA85] transition-all duration-500 font-cinzel text-xs font-semibold tracking-[0.35em] uppercase flex items-center justify-center gap-3 rounded-full"
                >
                  <span>{t.pages.contactPageFormSubmit}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center">
                  <a
                    href="https://www.instagram.com/ringsluxury"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:text-[#E6CA85] hover:bg-[#C5A059]/10 rounded-full text-[11px] tracking-[0.2em] uppercase transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>@ringsluxury</span>
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="p-8 sm:p-12 bg-black/70 backdrop-blur-md border border-[#C5A059] text-center"
            >
              <div className="inline-flex items-center justify-center mb-6">
                <AncientCoinMedallion className="w-16 h-16" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-[#C5A059] block mb-2 font-medium">
                {t.pages.contactPageSuccessSeal}
              </span>
              <h2 className="font-cinzel text-3xl tracking-[0.18em] uppercase text-[#FBF9F5] mb-4">
                {t.pages.contactPageSuccessTitle}
              </h2>
              <p className="font-cormorant text-xl italic text-[#C5A059] mb-6">
                {t.pages.contactPageSuccessQuote}
              </p>
              <div className="p-4 max-w-md mx-auto bg-[#030303] border border-[#C5A059]/30 text-xs text-[#EAE6DF] space-y-2 mb-8 text-left">
                <div className="flex justify-between border-b border-[#C5A059]/20 pb-1">
                  <span className="text-[#9A7B38] uppercase tracking-wider">{t.pages.contactPageSuccessDossier}</span>
                  <span className="font-mono text-[#C5A059]">{bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A7B38] uppercase tracking-wider">{t.pages.contactPageSuccessClient}</span>
                  <span className="font-cinzel">{formData.name}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-8 py-3.5 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] font-cinzel text-xs tracking-[0.3em] uppercase transition-colors rounded-full"
              >
                {t.pages.contactPageSuccessAgain}
              </button>
            </div>
          )}
        </div>

        {/*
            Secoes em forma de pergunta, com id proprio.
            Rotulo ("Nossos servicos", "Diferenciais") nao casa com busca: ninguem
            pergunta "nossos servicos" a um assistente. Pergunta casa. O id permite
            que o buscador citem o trecho e levem o leitor direto na resposta.
          */}
        <section aria-labelledby="direct-answers-heading" className="mt-24 text-left">
          <h2
            id="direct-answers-heading"
            className="font-cinzel text-2xl md:text-3xl tracking-wide text-[#E6CA85] mb-4 text-center"
          >
            Direct answers before you write
          </h2>
          <p className="font-cormorant text-lg text-[#A8A296] mb-10 text-center max-w-2xl mx-auto">
            The seven questions clients ask most often, answered with the real numbers of the
            atelier.
          </p>

          {/*
              Índice com links de ancora. Sem ele, o Google nao consegue exibir os
              subitens da pagina no resultado e o assistente nao tem como entender a
              estrutura do conteudo.
            */}
          <nav aria-label="Topics on this page" className="mb-12">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {CONTACT_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="font-poppins text-[10px] uppercase tracking-[0.18em] text-[#A8A296] hover:text-[#C5A059] transition-colors"
                  >
                    {s.q}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <dl className="space-y-8 mb-14">
            {CONTACT_SECTIONS.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-32 border-l-2 border-[#C5A059]/40 pl-5 md:pl-7">
                <dt className="font-cinzel text-lg md:text-xl text-[#F3EFE6] leading-snug">
                  {s.q}
                </dt>
                <dd className="font-cormorant text-lg leading-relaxed text-[#A8A296] mt-2">
                  {s.a}
                </dd>
              </div>
            ))}
          </dl>

          {/* Fonte dos dados, para o trecho ser rastreavel ate a origem. */}
          <p className="font-cormorant text-sm text-[#9A7B38] italic mb-14">
            Metal purity per ISO 8653; the 4Cs and stone grading as described by the Gemological
            Institute of America (GIA). Prices are the atelier&apos;s published collection prices,
            updated {PAGE_UPDATED}.
          </p>

          {/* Citacao atribuida: review real do perfil do Google, reproduzido sem edicao. */}
          <figure className="border-l-2 border-[#C5A059]/50 pl-6 mb-16">
            <blockquote className="font-cormorant text-xl italic leading-relaxed text-[#D8D2C4]">
              &ldquo;{QUOTE_REVIEW.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#9A7B38]">
              <cite className="not-italic text-[#C5A059]">{QUOTE_REVIEW.name}</cite> &middot; verified
              client review on the atelier&apos;s Google profile
            </figcaption>
          </figure>

          {/* Processo em lista numerada: o formato de resposta mais aproveitado
              por buscadores e por quem pergunta "como funciona". */}
          <section aria-labelledby="process-heading" className="mb-16">
            <h3
              id="process-heading"
              className="font-cinzel text-xl tracking-wide text-[#E6CA85] mb-5 text-center"
            >
              How the process works, step by step
            </h3>
            <ol className="space-y-4 max-w-2xl mx-auto list-decimal pl-6 marker:text-[#C5A059] marker:font-cinzel">
              <li className="font-cormorant text-lg text-[#A8A296] pl-2">
                Write below, call {contact.phoneDisplay}, or ask for a video appointment with your
                preferred city, your ring size and the story you want told in the piece.
              </li>
              <li className="font-cormorant text-lg text-[#A8A296] pl-2">
                At the consultation, Jorge Uquillas draws the ring and agrees the metal, the stones,
                the price and the timeline with you.
              </li>
              <li className="font-cormorant text-lg text-[#A8A296] pl-2">
                Approve the written proposal and pay the first 50%. Only then is the wax sculpted
                and the gold cast.
              </li>
              <li className="font-cormorant text-lg text-[#A8A296] pl-2">
                Production takes 60 days, of which 90 to 140 hours are hand engraving, documented
                by photograph along the way.
              </li>
              <li className="font-cormorant text-lg text-[#A8A296] pl-2">
                Pay the second 50% and receive the piece door to door, insured and tracked, with the
                archival folio, the certificate of authenticity and the master hallmark.
              </li>
            </ol>
          </section>

          {/* Glossario: quem ainda nao conhece o vocabulario nao consegue nem
              formular a pergunta. */}
          <section aria-labelledby="terms-heading" className="mb-16">
            <h3
              id="terms-heading"
              className="font-cinzel text-xl tracking-wide text-[#E6CA85] mb-6 text-center"
            >
              What the terms mean
            </h3>
            <dl className="space-y-5 max-w-2xl mx-auto">
              {CONTACT_TERMS.map((d) => (
                <div key={d.term}>
                  <dt className="font-cinzel text-[#E6CA85] text-lg">{d.term}</dt>
                  <dd className="font-cormorant text-lg text-[#A8A296] leading-relaxed mt-1">
                    {d.def}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Resumo de fechamento: a versao curta da resposta, que e a que o
              mecanismo prefere citar. */}
          <section aria-labelledby="in-short-heading" className="mb-16 border border-[#C5A059]/25 bg-black/40 p-7 text-left">
            <h3
              id="in-short-heading"
              className="font-cinzel text-lg uppercase tracking-[0.2em] text-[#C5A059] mb-4"
            >
              In short
            </h3>
            <p className="font-cormorant text-lg leading-relaxed text-[#D8D2C4] mb-3">
              The atelier is in São Paulo (Avenida Paulista) and Miami (Brickell), by appointment,
              and receives clients from 50+ countries by video as well. A handcrafted 18k gold
              diamond ring starts at US$ 4,800, takes 60 days from the first 50% payment, and is
              engraved by hand for 90 to 140 hours with natural diamonds set one by one.
            </p>
            <p className="font-cormorant text-lg leading-relaxed text-[#A8A296]">
              The next step is a private consultation: write below, call {contact.phoneDisplay} or
              email {contact.email}. Hours are {contact.hours.displayDays},{' '}
              {contact.hours.display}.
            </p>
          </section>

          {/* Assinatura e data: texto sem autor identificavel pesa menos na
              avaliacao de confiabilidade. */}
          <div className="mb-16 text-left">
            <p className="font-cormorant text-lg text-[#D8D2C4]">
              Written by <span className="text-[#C5A059]">Jorge Uquillas</span>, master goldsmith
              and hand engraver, founder of RINGS LUXURY, with ateliers in São Paulo and Miami and
              clients in over 50 countries.
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A7B38] mt-2">
              Last updated {PAGE_UPDATED}
            </p>
          </div>
        </section>

        {/* Ateliers, minimal */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-[10px] uppercase tracking-[0.3em] text-[#9A7B38]">
          <span>São Paulo, Atelier</span>
          <span className="hidden sm:inline text-[#C5A059]/40" aria-hidden>•</span>
          <span>Miami, Atelier</span>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default ContactPage;
