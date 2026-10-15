import React from 'react';
import { Article } from '../types';
import { ArticleHeroImage } from './ArticleHeroImage';
import { Bookmark, Clock, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
  isSaved?: boolean;
  compact?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  onToggleSave,
  isSaved = false,
  compact = false,
}) => {
  return (
    <article 
      onClick={() => onSelect(article.slug)}
      className="group cursor-pointer flex flex-col h-full bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-5 hover:border-stone-400/80 transition-all duration-300 hover:shadow-xs hover:-translate-y-0.5"
    >
      {/* Visual Header / Custom Artwork */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <ArticleHeroImage
          article={article}
          size={compact ? 'sm' : 'md'}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Bookmark Action Button */}
        {onToggleSave && (
          <button
            onClick={(e) => onToggleSave(article.id, e)}
            className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isSaved
                ? 'bg-stone-900 text-stone-100'
                : 'bg-stone-100/80 text-stone-600 hover:bg-white hover:text-stone-900'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save article'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-stone-100' : ''}`} />
          </button>
        )}
      </div>

      {/* Unboxed Clean Text Metadata (Zero-Pill Discipline) */}
      <div className="flex items-center gap-2 text-xs font-sans text-stone-500 mb-2">
        <span className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
          {article.categoryName}
        </span>
        <span aria-hidden="true" className="text-stone-400">·</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-stone-400" />
          {article.readTimeMinutes} min read
        </span>
        <span aria-hidden="true" className="text-stone-400">·</span>
        <span>{article.publishedAt}</span>
      </div>

      {/* Article Title */}
      <h3 className="text-xl font-serif font-bold text-[#1A1918] group-hover:text-stone-700 transition-colors leading-snug mb-2">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm font-sans text-stone-600 leading-relaxed line-clamp-3 mb-4 flex-1">
        {article.excerpt}
      </p>

      {/* Footer Author & Link */}
      <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-sans mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-stone-300 flex items-center justify-center font-bold text-[10px] text-stone-800">
            {article.author.avatar}
          </div>
          <span className="font-medium text-stone-700">{article.author.name}</span>
        </div>

        <span className="inline-flex items-center gap-1 font-semibold text-[#1A1918] group-hover:translate-x-0.5 transition-transform">
          <span>Read Essay</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
