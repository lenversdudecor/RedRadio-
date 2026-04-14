'use client';

import { useState } from 'react';
import Link from 'next/link';
import InterfaceOverlay from '@/app/components/InterfaceOverlay';
import MenuOverlay from '@/app/components/MenuOverlay';
import { Article } from '@/lib/articles';

interface ArticlePageClientProps {
  article: Article;
  related: Article[];
}

export default function ArticlePageClient({ article, related }: ArticlePageClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Menu Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Interface Overlay (boutons de navigation) */}
      <InterfaceOverlay openMenu={() => setIsMenuOpen(true)} />

      {/* Contenu */}
      <div className="relative z-10">
        {/* Ambiance lumineuse */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-900/10 blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-amber-900/5 blur-3xl"></div>
        </div>

        {/* Navigation et retour */}
        <header className="border-b border-neutral-800/50 sticky top-0 z-20 bg-black/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <Link href="/articles" className="group flex items-center gap-2 text-neutral-400 hover:text-orange-400 transition-colors duration-300">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2L4 8l6 6"/>
              </svg>
              <span className="text-sm font-medium">Retour aux articles</span>
            </Link>
            <span className="text-xs text-neutral-500 font-mono">{article.slug}</span>
          </div>
        </header>

        {/* Article Header */}
        <header className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Catégorie */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-orange-600"></div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-[0.3em]">
                {article.tags?.[0] ?? 'article'}
              </span>
              {article.tags && article.tags.length > 1 && (
                <>
                  <span className="text-neutral-600">·</span>
                  <span className="text-xs text-neutral-500">{article.tags.slice(1).join(', ')}</span>
                </>
              )}
            </div>

            {/* Titre */}
            <h1 
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-transparent bg-clip-text bg-linear-to-r from-neutral-200 via-orange-100 to-neutral-200"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {article.title}
            </h1>

            {/* Excerpt highlight */}
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed border-l-2 border-orange-600 pl-6">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-12 pt-8 border-t border-neutral-800/50">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-2">Publié le</div>
                <time className="text-neutral-300 font-serif text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {new Date(article.date).toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-2">Par</div>
                <p className="text-neutral-300 font-serif text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {article.author}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Séparateur */}
        <div className="h-px bg-linear-to-r from-transparent via-neutral-700/50 to-transparent"></div>

        {/* Contenu Article + Sidebar */}
        <article className="px-6 md:px-12 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <div 
                className="prose prose-invert max-w-none
                [&_p]:text-neutral-300 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6
                [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-orange-200 [&_h2]:mt-12 [&_h2]:mb-4
                [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-neutral-200 [&_h3]:mt-8 [&_h3]:mb-3
                [&_a]:text-orange-400 [&_a]:hover:text-orange-300 [&_a]:transition-colors
                [&_strong]:text-orange-200
                [&_em]:text-neutral-400 [&_em]:italic
                [&_ul]:list-none [&_ul]:pl-0
                [&_li]:text-neutral-300 [&_li]:text-lg [&_li]:mb-3 [&_li]:pl-6 [&_li]:relative [&_li]:before:content-['▸'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-orange-600
                [&_blockquote]:border-l-4 [&_blockquote]:border-orange-600 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-neutral-400 [&_blockquote]:my-6
                "
                dangerouslySetInnerHTML={{ __html: article.content }} 
              />

              {/* Tags footer */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-800/50 flex flex-wrap gap-3">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700/50 text-xs font-medium text-neutral-300 hover:border-orange-600/50 hover:text-orange-400 transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600/30"></span>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Articles relatifs */}
              {related.length > 0 && (
                <div className="sticky top-32 p-6 rounded-lg border border-neutral-800/50 bg-linear-to-b from-neutral-950/50 to-black/30 backdrop-blur-sm">
                  <h3 className="font-serif text-xl text-neutral-200 mb-6 flex items-center gap-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                    À lire aussi
                  </h3>

                  <ul className="space-y-5">
                    {related.map((article) => (
                      <li key={article.slug}>
                        <Link 
                          href={`/articles/${article.slug}`}
                          className="group"
                        >
                          <div className="mb-2">
                            <span className="text-xs text-neutral-500 font-medium">{article.tags?.[0]}</span>
                          </div>
                          <h4 className="font-serif text-sm text-neutral-200 group-hover:text-orange-400 transition-colors duration-300 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {article.title}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-2 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Info box */}
              <div className="mt-8 p-4 rounded-lg border border-neutral-800/50 bg-black/40 backdrop-blur-sm">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Partagez cet article sur les ondes de <span className="text-orange-400 font-semibold">l'Envers du Décor</span>
                </p>
              </div>
            </aside>
          </div>
        </article>

        {/* CTA Footer */}
        <footer className="border-t border-neutral-800/50 bg-linear-to-b from-black/50 to-black px-6 md:px-12 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-neutral-400 mb-8">Continuez votre exploration</p>
            <Link 
              href="/articles"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-lg border border-orange-600/50 text-orange-400 hover:bg-orange-600/10 hover:border-orange-600 transition-all duration-300 font-medium mb-12"
            >
              <span>Voir tous les articles</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 8h8M10 5l3 3-3 3"/>
              </svg>
            </Link>
            
            <div className="mt-8 pt-8 border-t border-neutral-800/50 flex flex-col items-center text-xs text-neutral-500 uppercase tracking-widest gap-2">
              <span>© 2026 L'Envers du Décor</span>
              <Link href="/politique-de-confidentialite" className="hover:text-neutral-300 transition-colors">
                Politique de Confidentialité
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
