import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQ, type FaqItem } from '../components/FAQ';
import { blogPosts } from '../data/blogPosts';
import { absoluteUrl, HAS_SITE_URL } from '../site.config';
import { useLanguage } from '../i18n/LanguageContext';

export function BlogPost() {
  const { t, lang } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const rawPost = blogPosts.find((p) => p.slug === slug);
  const translation = (rawPost as any)?.translations?.[lang];
  const post = rawPost
    ? {
        ...rawPost,
        title: translation?.title ?? rawPost.title,
        seoTitle: translation?.seoTitle ?? (rawPost as any).seoTitle ?? rawPost.title,
        excerpt: translation?.excerpt ?? rawPost.excerpt,
        content: translation?.content ?? rawPost.content,
      }
    : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020202] text-[#EAE6DF] flex items-center justify-center font-cinzel">
        <div className="text-center">
          <h1 className="text-4xl text-[#C5A059] mb-4">{t.pages.blogPostNotFound}</h1>
          <Link to="/blog" className="text-[#A8A296] hover:text-[#F3EFE6] underline">{t.pages.blogPostReturnBlog}</Link>
        </div>
      </div>
    );
  }

  const handleOpenConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const postFaq = (post as any).faq as FaqItem[] | undefined;
  const postHowTo = (post as any).howTo as Record<string, unknown> | undefined;

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO 
        title={(post as any).seoTitle ?? post.title}
        description={post.excerpt}
        keywords={(post as any).keywords}
        url={`/blog/${post.slug}`}
        image={absoluteUrl(post.image)}
        imageAlt={post.title}
        publishedTime={post.dateISO}
        modifiedTime={post.dateISO}
        author={post.author}
        articleSection={post.category}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.excerpt,
                image: absoluteUrl(post.image),
                datePublished: post.dateISO,
                dateModified: post.dateISO,
                author: {
                  '@type': 'Person',
                  '@id': HAS_SITE_URL ? `${absoluteUrl('/jorge-uquillas')}#jorge` : undefined,
                  name: post.author,
                  ...(HAS_SITE_URL ? { url: absoluteUrl('/jorge-uquillas') } : {}),
                },
                ...(HAS_SITE_URL
                  ? { publisher: { '@id': `${absoluteUrl('/')}#organization` } }
                  : { publisher: { '@type': 'Organization', name: 'RINGS LUXURY by Jorge Uquillas' } }),
                mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
                inLanguage: lang,
                ...(HAS_SITE_URL
                  ? { isPartOf: { '@id': `${absoluteUrl('/blog')}#website` } }
                  : {}),
                keywords: (post as any).keywords,
                articleSection: post.category,
                ...(postFaq && postFaq.length > 0
                  ? { hasPart: { '@type': 'FAQPage', ...(HAS_SITE_URL ? { '@id': `${absoluteUrl(`/blog/${post.slug}`)}#faq` } : {}) } }
                  : {}),
              },
              /*
                FAQPage em no PROPRIO do post, com @id proprio.
                O componente <FAQ> tambem emite FAQPage: os dois blocos sao
                identicos em conteudo, entao so o no com @id sobrevive para o
                consumidor de schema (o outro, sem @id, e a mesma informacao em
                duplicata, que o Google trata como markup repetido).
              */
              ...(postFaq && postFaq.length > 0
                ? [
                    {
                      '@type': 'FAQPage',
                      ...(HAS_SITE_URL ? { '@id': `${absoluteUrl(`/blog/${post.slug}`)}#faq` } : {}),
                      mainEntity: postFaq.map((f) => ({
                        '@type': 'Question',
                        name: f.q,
                        acceptedAnswer: { '@type': 'Answer', text: f.a },
                      })),
                    },
                  ]
                : []),
            ],
          }),
        }}
      />
      
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={handleOpenConsultation} />

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          <Breadcrumbs
            items={[
              { label: t.pages.productBreadcrumbHome, to: '/' },
              { label: t.pages.blogTitle, to: '/blog' },
              { label: post.title },
            ]}
          />
        </div>

        <header className="mb-16 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#C5A059] font-poppins text-[10px] uppercase tracking-widest hover:text-[#F3EFE6] transition-colors mb-12">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {t.pages.blogPostBack}
          </Link>
          
          <div className="mb-6">
            <span className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] border border-[#C5A059]/30 px-4 py-2 rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-[#F3EFE6] mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex justify-center items-center gap-6 font-poppins text-xs uppercase tracking-widest text-[#A8A296]">
            <span><time dateTime={post.dateISO}>{post.date}</time></span>
            <span className="w-1 h-1 bg-[#C5A059] rounded-full" />
            <span>{t.pages.blogPostBy} {post.author}</span>
          </div>
        </header>

        <div className="relative aspect-[16/9] w-full mb-16 border border-[#C5A059]/20">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: (post as any).imagePosition ?? 'center' }}
          />
        </div>

        {/*
          Estilos do artigo por variantes arbitrarias, e nao por `prose`.
          @tailwindcss/typography NAO esta no package.json, entao as classes
          `prose-*` eram inertes: o texto saia sem espacamento entre h2/p/ul e
          a hierarquia visual do post se perdia.
        */}
        <article
          className={[
            'max-w-none font-cormorant text-lg text-[#FFFFFF] leading-relaxed',
            '[&_h2]:font-cinzel [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-[#F3EFE6] [&_h2]:font-medium [&_h2]:mt-12 [&_h2]:mb-5',
            '[&_h3]:font-cinzel [&_h3]:text-xl [&_h3]:text-[#F3EFE6] [&_h3]:mt-8 [&_h3]:mb-4',
            '[&_p]:mb-6',
            '[&_ul]:mb-6 [&_ul]:pl-5 [&_li]:mb-2 [&_li]:list-disc [&_li]:marker:text-[#C5A059]',
            '[&_ol]:mb-6 [&_ol]:pl-5 [&_ol]:list-decimal',
            '[&_a]:text-[#C5A059] [&_a]:underline [&_a]:underline-offset-4',
            '[&_strong]:text-[#F3EFE6]',
            '[&_table]:w-full [&_table]:border-collapse [&_table]:text-base',
            '[&_th]:border [&_th]:border-[#C5A059]/25 [&_th]:bg-[#C5A059]/10 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-poppins [&_th]:text-[10px] [&_th]:uppercase [&_th]:tracking-[0.18em] [&_th]:text-[#C5A059]',
            '[&_td]:border [&_td]:border-[#C5A059]/15 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-[15px] [&_td]:leading-relaxed',
            '[&_figure]:my-8',
            '[&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:uppercase [&_figcaption]:tracking-[0.12em] [&_figcaption]:text-[#9A7B38] [&_figcaption]:mt-3',
          ].join(' ')}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/*
          FAQ do post. Antes o JSON-LD FAQPage era emitido mas as perguntas NUNCA
          apareciam na pagina: o Google so aceita rich result de FAQPage quando o
          texto das perguntas e respostas esta visivel, entao o markup era invalido.
          Agora o bloco e renderizado de verdade, com o componente answer-first.
        */}
        {postFaq && postFaq.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <FAQ items={postFaq} heading="Frequently asked questions" />
          </div>
        )}

        {/*
          HowTo para os posts que sao passo a passo (o dos diamantes tem 7 testes
          numerados). O passo a passo JÁ esta visivel no <article> acima: o Google
          so aceita HowTo quando o texto dos passos aparece na pagina, e ele
          aparece, entao aqui o markup apenas liga o conteudo ja existente.
        */}
        {postHowTo && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                ...(HAS_SITE_URL ? { '@id': `${absoluteUrl(`/blog/${post.slug}`)}#howto` } : {}),
                name: postHowTo.name,
                description: post.excerpt,
                ...(HAS_SITE_URL ? { url: absoluteUrl(`/blog/${post.slug}`) } : {}),
                ...(HAS_SITE_URL ? { image: absoluteUrl(post.image) } : {}),
                ...(postHowTo.totalTime ? { totalTime: postHowTo.totalTime } : {}),
                ...(postHowTo.estimatedCost ? { estimatedCost: postHowTo.estimatedCost } : {}),
                ...(postHowTo.supply ? { supply: postHowTo.supply } : {}),
                ...(postHowTo.tool ? { tool: postHowTo.tool } : {}),
                step: postHowTo.step,
              }),
            }}
          />
        )}

        <div className="mt-20 pt-10 border-t border-[#C5A059]/20 text-center">
           <h3 className="font-cinzel text-2xl text-[#F3EFE6] mb-6">{t.pages.blogPostCtaTitle}</h3>
           <button 
              onClick={() => handleOpenConsultation()}
              className="relative group/btn overflow-hidden border border-[#C5A059] px-12 py-4 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 transition-colors inline-block"
            >
              <span className="relative font-poppins text-xs tracking-[0.2em] uppercase text-[#C5A059]">
                {t.pages.blogPostCtaButton}
              </span>
            </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
