import React, { useState, useEffect, useRef } from 'react';
import { ARTICLES } from '../data/articles';
import { Search, X, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? ARTICLES.filter((article) => {
        const q = query.toLowerCase();
        return (
          article.title.toLowerCase().includes(q) ||
          article.subtitle.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.categoryName.toLowerCase().includes(q) ||
          article.tags.some((t) => t.toLowerCase().includes(q)) ||
          article.content.intro.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelect = (slug: string) => {
    onSelectArticle(slug);
    onClose();
  };

  const quickFilterTags = [
    'Pricing',
    'Branding',
    'Advertising',
    'Luxury',
    'Scarcity',
    'Packaging',
    'Social Proof',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-5 py-4 border-b border-stone-300/80 bg-white">
          <Search className="w-5 h-5 text-stone-500 mr-3 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, concepts, brands (e.g. 99 cents, Apple, luxury)..."
            aria-label="Search article titles and topics"
            className="w-full bg-transparent text-stone-900 font-sans text-base placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="p-1 text-stone-400 hover:text-stone-600 rounded-full mr-2"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search modal"
            className="px-2.5 py-1 text-xs font-sans font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded border border-stone-300"
          >
            Esc
          </button>
        </div>

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {!query.trim() ? (
            <div className="py-4 space-y-4">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-stone-500 block">
                Popular Search Topics
              </span>
              <div className="flex flex-wrap gap-2">
                {quickFilterTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-sans bg-stone-200/60 hover:bg-stone-200 text-stone-800 rounded-md border border-stone-300/60 transition-colors"
                  >
                    <Tag className="w-3 h-3 text-stone-500" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200">
                <span className="text-xs uppercase tracking-widest font-sans font-bold text-stone-500 block mb-3">
                  All Published Essays ({ARTICLES.length})
                </span>
                <div className="space-y-2">
                  {ARTICLES.slice(0, 5).map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleSelect(a.slug)}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-stone-200/60 transition-colors flex items-center justify-between group"
                    >
                      <span className="font-serif font-semibold text-stone-900 text-sm group-hover:text-stone-700">
                        {a.title}
                      </span>
                      <span className="text-xs font-sans text-stone-500 shrink-0 ml-2">
                        {a.categoryName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-stone-500 block">
                Found {results.length} matching {results.length === 1 ? 'essay' : 'essays'}
              </span>
              {results.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleSelect(article.slug)}
                  className="p-4 rounded-xl border border-stone-200 hover:border-stone-400 bg-white hover:bg-stone-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs font-sans text-stone-500 mb-1">
                    <span className="font-semibold text-stone-800">{article.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTimeMinutes} min read</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-stone-700 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs font-sans text-stone-600 line-clamp-2 mt-1">
                    {article.excerpt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-stone-600">
              <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-3" />
              <p className="font-serif text-base font-semibold">No essays found for "{query}"</p>
              <p className="text-xs font-sans text-stone-500 mt-1">
                Try searching for broader terms like "pricing", "brand", or "scarcity".
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-stone-200/50 border-t border-stone-300/80 text-[11px] font-sans text-stone-500 flex items-center justify-between">
          <span>Search Behind the Buy digital publication</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
