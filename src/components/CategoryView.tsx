import React from 'react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from './ArticleCard';
import { ArrowLeft, Compass, BookOpen } from 'lucide-react';

interface CategoryViewProps {
  selectedCategory?: CategoryId;
  onSelectCategory: (categoryId: CategoryId | 'all') => void;
  onSelectArticle: (slug: string) => void;
  onToggleSaveArticle?: (id: string, e: React.MouseEvent) => void;
  savedArticleIds?: string[];
  onBackToHome: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectArticle,
  onToggleSaveArticle,
  savedArticleIds = [],
  onBackToHome,
}) => {
  const currentCategoryObj = selectedCategory
    ? CATEGORIES.find((c) => c.id === selectedCategory)
    : null;

  const filteredArticles = selectedCategory
    ? ARTICLES.filter((a) => a.category === selectedCategory)
    : ARTICLES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Header */}
      <div className="mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-sans text-stone-600 hover:text-stone-900 font-semibold mb-4 focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-amber-700" />
          <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-stone-500">
            Topic Index & Categories
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1918]">
          {currentCategoryObj ? currentCategoryObj.name : 'Explore All Categories'}
        </h1>

        <p className="text-base sm:text-lg font-sans text-stone-600 max-w-3xl mt-3 leading-relaxed">
          {currentCategoryObj
            ? currentCategoryObj.description
            : 'Select an editorial vertical below to examine specific pricing mechanics, brand identities, or psychological heuristics.'}
        </p>
      </div>

      {/* Category Directory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {CATEGORIES.map((cat) => {
          const count = ARTICLES.filter((a) => a.category === cat.id).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-left p-5 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-stone-900 text-stone-100 border-stone-900 shadow-md'
                  : 'bg-[#FAF8F5] text-stone-800 border-stone-300/80 hover:border-stone-400 hover:bg-stone-200/50'
              }`}
            >
              <span className={`text-[11px] font-sans uppercase tracking-wider block font-bold ${isSelected ? 'text-amber-300' : 'text-stone-500'}`}>
                {count} {count === 1 ? 'Essay' : 'Essays'}
              </span>
              <h3 className="text-lg font-serif font-bold mt-1 mb-2 leading-tight">
                {cat.name}
              </h3>
              <p className={`text-xs font-sans line-clamp-2 leading-relaxed ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filtered Articles Grid */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-stone-300 mb-6">
          <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-stone-600" />
            <span>
              {currentCategoryObj ? `${currentCategoryObj.name} Articles` : 'All Published Essays'}
            </span>
          </h2>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-sans text-stone-700 hover:text-stone-900 underline font-semibold"
            >
              Show All Categories
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              onToggleSave={onToggleSaveArticle}
              isSaved={savedArticleIds.includes(article.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
