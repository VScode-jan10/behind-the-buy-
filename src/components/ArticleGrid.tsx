import React, { useState } from 'react';
import { Article, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from './ArticleCard';
import { SlidersHorizontal, Grid, List } from 'lucide-react';

interface ArticleGridProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onToggleSaveArticle?: (id: string, e: React.MouseEvent) => void;
  savedArticleIds?: string[];
  selectedCategory?: CategoryId | 'all';
  onSelectCategory?: (category: CategoryId | 'all') => void;
  title?: string;
  showCategoryTabs?: boolean;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  onSelectArticle,
  onToggleSaveArticle,
  savedArticleIds = [],
  selectedCategory = 'all',
  onSelectCategory,
  title = 'All Articles',
  showCategoryTabs = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>(selectedCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'read-time'>('latest');

  const handleCategoryChange = (cat: CategoryId | 'all') => {
    setActiveCategory(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'read-time') {
      return a.readTimeMinutes - b.readTimeMinutes;
    }
    return 0; // maintain curated publication order
  });

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300/80 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1918]">
            {title}
          </h2>
          <p className="text-xs font-sans text-stone-500 uppercase tracking-widest mt-1">
            Showing {sortedArticles.length} of {articles.length} published essays
          </p>
        </div>

        {/* Sort & Search filter bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-stone-200/60 p-1 rounded-md border border-stone-300/60 text-xs font-sans">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500 ml-1.5" />
            <button
              onClick={() => setSortBy('latest')}
              className={`px-2.5 py-1 rounded-sm transition-colors ${
                sortBy === 'latest'
                  ? 'bg-white font-semibold text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortBy('read-time')}
              className={`px-2.5 py-1 rounded-sm transition-colors ${
                sortBy === 'read-time'
                  ? 'bg-white font-semibold text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Quick Read
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Category Filter Tabs (Functional buttons, clean segmented style) */}
      {showCategoryTabs && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 text-xs font-sans font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
              activeCategory === 'all'
                ? 'bg-stone-900 text-stone-100 shadow-2xs'
                : 'bg-stone-200/60 text-stone-700 hover:bg-stone-200 border border-stone-300/60'
            }`}
          >
            All Categories ({articles.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = articles.filter((a) => a.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 text-xs font-sans font-medium rounded-md whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-stone-900 text-stone-100 shadow-2xs'
                    : 'bg-stone-200/60 text-stone-700 hover:bg-stone-200 border border-stone-300/60'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Grid of Article Cards */}
      {sortedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sortedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              onToggleSave={onToggleSaveArticle}
              isSaved={savedArticleIds.includes(article.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-stone-100/50 rounded-xl border border-stone-200">
          <p className="font-serif text-lg text-stone-700 mb-2">No articles found matching criteria.</p>
          <button
            onClick={() => handleCategoryChange('all')}
            className="text-xs font-sans text-stone-900 underline underline-offset-4 font-semibold"
          >
            Clear category filter
          </button>
        </div>
      )}
    </section>
  );
};
