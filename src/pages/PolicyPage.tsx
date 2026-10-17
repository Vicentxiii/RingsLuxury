import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import { policies, policyBySlug } from '../data/policies';

/**
 * Paginas de politica (/privacy, /terms, /shipping, /returns, /warranty).
 *
 * Um componente so para as cinco rotas, com o texto vindo de src/data/policies.ts.
 *
 * Duas decisoes de SEO aqui:
 * 1. `answer[]` vira um bloco "resposta direta" logo abaixo do titulo e um
 *    no `FAQPage`. Resposta curta e visivel no topo e o formato que o Google
 *    extrai para featured snippet e que a IA copia para citar: e o mesmo
 *    principio do answer-first do componente FAQ.
 * 2. Estilos do artigo por variantes arbitrarias do Tailwind
 *    ([&_h2]:... etc.) e nao por `prose`: o plugin @tailwindcss/typography
 *    NAO esta no package.json, entao as classes `prose-*` ficariam inertes e o
 *    texto sairia colado, sem hierarquia visivel.
 */
/** Ancora estavel a partir do titulo da secao, usada no indice. */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function PolicyPage() {
  const { slug } = useParams<{ slug: string }>();
  const policy = slug ? policyBySlug(slug) : undefined;

  const handleOpenConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
  };

  if (!policy) {
    return (
      <div className="min-h-screen bg-[#020202] text-[#EAE6DF] flex items-center justify-center font-cinzel">
        <div className="text-center">
          <h1 className="text-3xl text-[#C5A059] mb-4">Policy not found</h1>
          <Link to="/" className="text-[#A8A296] hover:text-[#F3EFE6] underline">
            Back to the homepage
          </Link>
        </div>
      </div>
    );
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        // author + dateModified: sem assinatura e sem data, o buscador nao sabe
        // quem responde pela politica nem se ela ainda vale.
        '@type': 'WebPage',
        ...(HAS_SITE_URL ? { '@id': `${absoluteUrl(`/${policy.slug}`)}#webpage` } : {}),
        ...(HAS_SITE_URL ? { url: absoluteUrl(`/${policy.slug}`) } : {}),
        name: policy.title,
        datePublished: policy.updated,
        dateModified: policy.updated,
        author: HAS_SITE_URL
          ? { '@id': `${absoluteUrl('/jorge-uquillas')}#jorge` }
          : { '@type': 'Organization', name: 'RINGS LUXURY by Jorge Uquillas' },
        // Le em voz alta o bloco "In short", que e a resposta curta da politica.
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.seo-summary'] },
        mainEntity: HAS_SITE_URL ? { '@id': `${absoluteUrl('/')}#organization` } : undefined,
      },
      {
        '@type': 'FAQPage',
        ...(HAS_SITE_URL ? { '@id': `${absoluteUrl(`/${policy.slug}`)}#faq` } : {}),
        mainEntity: policy.answer.map((a, i) => ({
          '@type': 'Question',
          name: `${policy.title}: summary point ${i + 1}`,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };

  const articleClass = [
    'font-cormorant text-lg leading-relaxed text-[#A8A296]',
    // Hierarquia do artigo sem depender do plugin de typography.
    '[&_h2]:font-cinzel [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-[#F3EFE6]',
    '[&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:font-medium',
    '[&_h3]:font-cinzel [&_h3]:text-xl [&_h3]:text-[#F3EFE6] [&_h3]:mt-8 [&_h3]:mb-4',
    '[&_p]:mb-5',
    '[&_ul]:mb-6 [&_ul]:pl-5 [&_li]:mb-2 [&_li]:list-disc [&_li]:marker:text-[#C5A059]',
    '[&_a]:text-[#C5A059] [&_a]:underline [&_a]:underline-offset-4',
    '[&_strong]:text-[#F3EFE6]',
  ].join(' ');

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO
        title={policy.seoTitle}
        description={policy.seoDescription}
        url={`/${policy.slug}`}
        keywords={`${policy.title.toLowerCase()}, RINGS LUXURY policy, Jorge Uquillas atelier, handmade 18k gold jewelry guarantee, insured shipping`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={handleOpenConsultation} />

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: policy.title },
          ]}
        />

        <header className="mb-14 text-center">
          <p className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            Client policies
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl font-medium tracking-wide text-[#F3EFE6] mb-6 leading-tight">
            {policy.title}
          </h1>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto" />
          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[#9A7B38]">
            Last updated {policy.updated} · RINGS LUXURY by Jorge Uquillas
          </p>
        </header>

        {/* Resposta direta no topo: o formato que o Google extrai para
            featured snippet e que a IA copia para citar. */}
        <section
          aria-label={`${policy.title} in short`}
          className="seo-summary border border-[#C5A059]/25 bg-[#050505]/60 p-7 md:p-9 mb-16"
        >
          <h2 className="font-cinzel text-sm uppercase tracking-[0.24em] text-[#C5A059] mb-5">
            In short
          </h2>
          <ul className="space-y-3 font-cormorant text-lg text-[#D8D2C4] list-disc pl-5 marker:text-[#C5A059]">
            {policy.answer.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <article className={articleClass}>
          {/*
            Índice com links de ancora para as secoes desta politica. Sem ele, o
            buscador nao consegue exibir os subitens no resultado e o leitor
            perde a hora procurando a resposta dentro do texto.
          */}
          <nav aria-label={`Sections of ${policy.title}`} className="mb-10">
            <ul className="space-y-2">
              {policy.sections.map((s) => (
                <li key={s.heading} className="text-sm">
                  <a href={`#${slugify(s.heading)}`} className="text-[#C5A059]">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {policy.sections.map((s) => (
            <section key={s.heading} id={slugify(s.heading)} className="mb-4 scroll-mt-32">
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li) => (
                    <li key={li.slice(0, 48)}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <nav aria-label="Other policies" className="mt-16 pt-10 border-t border-[#C5A059]/20">
          <h2 className="font-cinzel text-sm uppercase tracking-[0.24em] text-[#C5A059] mb-5 text-center">
            Other policies
          </h2>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {policies
              .filter((p) => p.slug !== policy.slug)
              .map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/${p.slug}`}
                    className="font-poppins text-[10px] uppercase tracking-[0.2em] text-[#A8A296] hover:text-[#C5A059] transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="mt-16 pt-10 text-center">
          <p className="font-cormorant text-lg text-[#A8A296] mb-6">
            Anything unclear before you commission? Ask the atelier directly.
          </p>
          <button
            type="button"
            onClick={() => handleOpenConsultation()}
            className="border border-[#C5A059] px-12 py-4 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 transition-colors"
          >
            <span className="font-poppins text-xs tracking-[0.2em] uppercase text-[#C5A059]">
              Request a private consultation
            </span>
          </button>
          <p className="mt-8 text-[10px] tracking-[0.2em] uppercase text-[#9A7B38]">
            Full contact details on{' '}
            <Link to="/contact" className="text-[#C5A059]">
              the contact page
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PolicyPage;