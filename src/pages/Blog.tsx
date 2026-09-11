import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { blogPosts } from '../data/blogPosts';

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020202] text-[#EAE6DF] selection:bg-[#C5A059] selection:text-[#020202] font-sans-luxury relative overflow-x-hidden pt-24">
      <SEO 
        title="BLOG - Journal of Haute Joaillerie"
        description="Read the official RINGS LUXURY blog by Jorge Uquillas. Articles on the art of engraving, the price of gold, and ancient jewelry making."
        keywords="RINGS LUXURY Blog, Jorge Uquillas, Artistic Engraving, Gold Price, Haute Joaillerie Journal"
      />
      
      <div className="fixed inset-0 film-grain pointer-events-none z-40 opacity-35" />

      <Header onOpenConsultation={handleOpenConsultation} />

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <header className="text-center mb-16">
          <h2 className="font-poppins text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            The Master's Journal
          </h2>
          <h1 className="font-cinzel text-4xl md:text-6xl font-medium tracking-wide text-[#F3EFE6] mb-8">
            Chronicles of Craft
          </h1>
          <div className="w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent mx-auto" />
        </header>

        {/* Search Filter */}
        <div className="max-w-md mx-auto mb-20 relative">
          <input 
            type="text" 
            placeholder="Search the archives..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#050505] border border-[#C5A059]/30 text-[#F3EFE6] px-6 py-4 font-cormorant text-xl focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-[#A8A296]/50"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5A059]/50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="group flex flex-col h-full border border-[#C5A059]/10 bg-[#050505]/40 hover:border-[#C5A059]/40 transition-colors">
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-[#020202]/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20 bg-[#020202]/80 backdrop-blur-sm px-3 py-1 border border-[#C5A059]/30">
                  <span className="font-poppins text-[10px] uppercase tracking-widest text-[#C5A059]">{post.category}</span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4 font-poppins text-[10px] uppercase tracking-widest text-[#A8A296]">
                  <span>{post.date}</span>
                  <span>By {post.author}</span>
                </div>
                
                <h3 className="font-cinzel text-2xl text-[#F3EFE6] mb-4 group-hover:text-[#C5A059] transition-colors">
                  {post.title}
                </h3>
                
                <p className="font-cormorant text-[#A8A296] text-lg leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-[#C5A059] font-poppins text-xs tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                  <span>Read Article</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-cormorant text-2xl text-[#A8A296]">No articles found matching your search.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
