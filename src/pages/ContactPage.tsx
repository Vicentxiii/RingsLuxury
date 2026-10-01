import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Instagram, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { AncientCoinMedallion } from '../components/OrnamentIcons';
import { useLanguage } from '../i18n/LanguageContext';

const PARTICLE_COUNT = 550;

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
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Golden dust — WebGL, pure black, mouse-reactive
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

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
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
        keywords={t.pages.contactPageSeoKeywords}
        url="/contact"
      />

      <Header onOpenConsultation={scrollToForm} />

      {/* WebGL golden dust — fixed, pure black, behind everything */}
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
                    type="text"
                    required
                    placeholder={t.pages.contactPageFormNamePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#444] focus:outline-none"
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
                    type="email"
                    required
                    placeholder={t.pages.contactPageFormEmailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#444] focus:outline-none"
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
                    rows={4}
                    required
                    placeholder={t.pages.contactPageFormMessagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent text-[#F3EFE6] font-cinzel text-base tracking-wider placeholder-[#444] focus:outline-none resize-none"
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
            <div className="p-8 sm:p-12 bg-black/70 backdrop-blur-md border border-[#C5A059] text-center">
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
                onClick={() => setSubmitted(false)}
                className="px-8 py-3.5 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] font-cinzel text-xs tracking-[0.3em] uppercase transition-colors rounded-full"
              >
                {t.pages.contactPageSuccessAgain}
              </button>
            </div>
          )}
        </div>

        {/* Ateliers — minimal */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-[10px] uppercase tracking-[0.3em] text-[#9A7B38]">
          <span>São Paulo — Atelier</span>
          <span className="hidden sm:inline text-[#C5A059]/40" aria-hidden>•</span>
          <span>Miami — Atelier</span>
          <span className="hidden sm:inline text-[#C5A059]/40" aria-hidden>•</span>
          <span>Athens — Salon</span>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default ContactPage;
