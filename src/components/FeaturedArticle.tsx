import React from 'react';
import { Article } from '../types';
import { ArticleHeroImage } from './ArticleHeroImage';
import { Clock, ArrowRight, Bookmark, Sparkles } from 'lucide-react';

interface FeaturedArticleProps {
  article: Article;
  onSelect: (slug: string) => void;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
  isSaved?: boolean;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  article,
  onSelect,
  onToggleSave,
  isSaved = false,
}) => {
  return (
    <section className="my-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-amber-700" />
        <h2 className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-stone-600">
          Featured Lead Analysis
        </h2>
      </div>

      <div 
        onClick={() => onSelect(article.slug)}
        className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-[#FAF8F5] border border-stone-300/80 rounded-2xl p-6 sm:p-8 hover:border-stone-400 transition-all duration-300 shadow-xs"
      >
        {/* Left Visual Column */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-xl">
          <ArticleHeroImage
            article={article}
            size="hero"
            className="transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {onToggleSave && (
            <button
              onClick={(e) => onToggleSave(article.id, e)}
              className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all shadow-xs ${
                isSaved
                  ? 'bg-stone-900 text-stone-100'
                  : 'bg-stone-100/80 text-stone-700 hover:bg-white'
              }`}
              aria-label={isSaved ? 'Remove from saved' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-stone-100' : ''}`} />
            </button>
          )}
        </div>

        {/* Right Editorial Column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Zero-Pill Metadata */}
            <div className="flex items-center gap-2 text-xs font-sans text-stone-500 mb-3">
              <span className="font-semibold text-stone-900 uppercase tracking-widest text-[11px]">
                {article.categoryName}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {article.readTimeMinutes} min read
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedAt}</span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1A1918] group-hover:text-stone-700 transition-colors leading-tight mb-4">
              {article.title}
            </h3>

            {/* Subtitle */}
            <p className="text-base font-serif italic text-stone-700 mb-4">
              "{article.subtitle}"
            </p>

            {/* Excerpt */}
            <p className="text-sm font-sans text-stone-600 leading-relaxed mb-6">
              {article.excerpt}
            </p>
          </div>

          {/* Author & CTA */}
          <div className="pt-6 border-t border-stone-300/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-300 flex items-center justify-center font-bold text-xs text-stone-800">
                {article.author.avatar}
              </div>
              <div>
                <span className="block font-semibold text-sm text-stone-900">{article.author.name}</span>
                <span className="block text-xs text-stone-500">{article.author.title}</span>
              </div>
            </div>

            <button
              onClick={() => onSelect(article.slug)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-semibold text-stone-100 bg-[#1A1918] group-hover:bg-stone-800 rounded-md transition-all shadow-xs"
            >
              <span>Read Full Essay</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
