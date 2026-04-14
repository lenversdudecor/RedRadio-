'use client';

import { useState } from 'react';
import Link from 'next/link';
import InterfaceOverlay from '@/app/components/InterfaceOverlay';
import MenuOverlay from '@/app/components/MenuOverlay';
import { Article } from '@/lib/articles';

interface ArticlesPageClientProps {
  articles: Article[];
}

export default function ArticlesPageClient({ articles }: ArticlesPageClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Interface Overlay (boutons de navigation) */}
      <InterfaceOverlay openMenu={() => setIsMenuOpen(true)} />

      {/* Contenu Principal */}
      <div className="relative z-10 min-h-screen bg-neutral-950">
        
        {/* Ambiance lumineuse d'arrière-plan */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-orange-900/10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 rounded-full bg-amber-900/5 blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* Header */}
        <header className="pt-24 pb-12 px-4 sm:px-6 md:pt-32 md:pb-20 md:px-12 border-b border-neutral-800/50">
          <div className="max-w-7xl mx-auto">
            {/* Fil d'ariane stylisé */}
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="text-[10px] md:text-xs font-bold text-orange-600 tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap">
                Récits
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-600/50 to-transparent"></div>
            </div>

            {/* Titre Responsive */}
            <h1 
              className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.1] mb-4 md:mb-6 text-neutral-100" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Articles
            </h1>

            {/* Sous-titre */}
            <p className="text-neutral-400 text-base md:text-lg max-w-2xl leading-relaxed">
              Sélection de récits et essais — lus sur les ondes de l'Envers du Décor.
            </p>
          </div>
        </header>

        {/* Grid d'articles */}
        <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((a) => (
              <Link href={`/articles/${a.slug}`} key={a.slug} className="group block h-full">
                <article className="h-full relative flex flex-col bg-neutral-900/20 rounded-lg overflow-hidden">
                  
                  {/* Fond avec gradient interactif */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-neutral-800 transition-all duration-500 group-hover:border-orange-900/30 group-hover:bg-gradient-to-br group-hover:from-neutral-900 group-hover:via-neutral-900 group-hover:to-orange-950/10"></div>
                  
                  {/* Ligne d'accentuation animée */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-orange-600 group-hover:w-full transition-all duration-700 ease-out"></div>

                  {/* Contenu de la carte */}
                  <div className="relative p-5 md:p-6 h-full flex flex-col z-10">
                    
                    {/* Tag */}
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-600 shadow-[0_0_8px_rgba(234,88,12,0.5)]"></div>
                      <span className="text-[10px] md:text-xs font-bold text-orange-500/90 uppercase tracking-[0.15em]">
                        {a.tags?.[0] ?? 'article'}
                      </span>
                    </div>

                    {/* Titre */}
                    <h2 
                      className="font-serif text-xl md:text-2xl leading-tight mb-3 text-neutral-200 group-hover:text-orange-100 transition-colors duration-300 line-clamp-2" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {a.title}
                    </h2>

                    {/* Extrait */}
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 grow line-clamp-3 md:line-clamp-4 group-hover:text-neutral-400 transition-colors">
                      {a.excerpt}
                    </p>

                    {/* Footer de la carte */}
                    <div className="flex justify-between items-end border-t border-neutral-800/50 pt-4 mt-auto">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] md:text-xs text-neutral-400 group-hover:text-orange-200/70 transition-colors">
                          Par {a.author}
                        </span>
                        <time className="text-[10px] text-neutral-600 font-mono">
                          {new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </time>
                      </div>

                      {/* Icône flèche animée */}
                      <div className="text-orange-600 opacity-60 transform translate-x-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}