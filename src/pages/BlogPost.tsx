import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { blogPosts } from '../data/blogPosts';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(blogPosts.find(p => p.slug === slug));

  useEffect(() => {
    setPost(blogPosts.find(p => p.slug === slug));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020202] text-[#EAE6DF] flex items-center justify-center font-cinzel">
        <div className="text-center">
          <h1 className="text-4xl text-[#C5A059] mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-[#A8A296] hover:text-[#F3EFE6] underline">Return to Blog</Link>
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

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={`RINGS LUXURY, Jorge Uquillas, Blog, ${post.category}, Haute Joaillerie`}
        image={post.image}
      />
      
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={handleOpenConsultation} />

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <header className="mb-16 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#C5A059] font-poppins text-[10px] uppercase tracking-widest hover:text-[#F3EFE6] transition-colors mb-12">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Journal
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
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-[#C5A059] rounded-full" />
            <span>By {post.author}</span>
          </div>
        </header>

        <div className="relative aspect-[16/9] w-full mb-16 border border-[#C5A059]/20">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article 
          className="prose prose-invert prose-lg max-w-none font-cormorant text-[#A8A296] leading-relaxed 
          prose-h2:font-cinzel prose-h2:text-3xl prose-h2:text-[#F3EFE6] prose-h2:font-medium prose-h2:mt-12 prose-h2:mb-6
          prose-p:mb-6 prose-a:text-[#C5A059] prose-strong:text-[#F3EFE6]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-20 pt-10 border-t border-[#C5A059]/20 text-center">
           <h3 className="font-cinzel text-2xl text-[#F3EFE6] mb-6">Commission a Masterpiece</h3>
           <button 
              onClick={() => handleOpenConsultation()}
              className="relative group/btn overflow-hidden border border-[#C5A059] px-12 py-4 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 transition-colors inline-block"
            >
              <span className="relative font-poppins text-xs tracking-[0.2em] uppercase text-[#C5A059]">
                Private Consultation
              </span>
            </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
