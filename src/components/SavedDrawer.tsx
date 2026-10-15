import React from 'react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { X, Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onSelectArticle: (slug: string) => void;
  onRemoveSaved: (id: string) => void;
  onClearAllSaved: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedIds,
  onSelectArticle,
  onRemoveSaved,
  onClearAllSaved,
}) => {
  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter((a) => savedIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-stone-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-300 bg-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-stone-900 fill-stone-900" aria-hidden="true" />
            <h2 className="font-serif font-bold text-xl text-stone-900">
              Saved Articles ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close saved articles drawer"
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedArticles.length > 0 ? (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 bg-white border border-stone-200 hover:border-stone-400 rounded-xl transition-all shadow-2xs space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs font-sans text-stone-500">
                  <span className="font-semibold text-stone-800 uppercase tracking-wider">
                    {article.categoryName}
                  </span>
                  <button
                    onClick={() => onRemoveSaved(article.id)}
                    className="text-stone-400 hover:text-red-700 transition-colors p-1"
                    aria-label={`Remove ${article.title} from saved`}
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                <h3 
                  onClick={() => {
                    onSelectArticle(article.slug);
                    onClose();
                  }}
                  className="font-serif font-bold text-base text-stone-900 group-hover:text-stone-700 cursor-pointer transition-colors leading-snug"
                >
                  {article.title}
                </h3>

                <p className="text-xs font-sans text-stone-600 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-stone-500">{article.readTimeMinutes} min read</span>
                  <button
                    onClick={() => {
                      onSelectArticle(article.slug);
                      onClose();
                    }}
                    className="font-semibold text-stone-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Essay</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-stone-600 space-y-3">
              <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
              <p className="font-serif text-lg font-bold">No saved articles yet</p>
              <p className="text-xs font-sans text-stone-500 max-w-xs mx-auto">
                Click the bookmark icon on any article card to save essays for reading later.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-300 flex items-center justify-between">
            <button
              onClick={onClearAllSaved}
              className="text-xs font-sans text-stone-600 hover:text-red-700 font-semibold transition-colors"
            >
              Clear All Saved
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 font-sans text-xs font-bold rounded-md"
            >
              Close Drawer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
