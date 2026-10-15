import React, { useState, useEffect } from 'react';
import { ARTICLES } from './data/articles';
import { CATEGORIES } from './data/categories';
import { CategoryId } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ArticleGrid } from './components/ArticleGrid';
import { ArticleDetail } from './components/ArticleDetail';
import { CategoryView } from './components/CategoryView';
import { AboutView } from './components/AboutView';
import { SearchModal } from './components/SearchModal';
import { SavedDrawer } from './components/SavedDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [savedOpen, setSavedOpen] = useState<boolean>(false);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('behind_the_buy_saved');
      return stored ? JSON.parse(stored) : ['1', '3']; // Pre-save 2 articles for great UX
    } catch {
      return ['1', '3'];
    }
  });

  // Sync saved articles with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('behind_the_buy_saved', JSON.stringify(savedArticleIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedArticleIds]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic Page Metadata Manager for SEO (Title Tags & Meta Descriptions)
  useEffect(() => {
    let title = 'Consumer Psychology Blog | Behind the Buy Publication';
    let description =
      'Behind the Buy is a consumer psychology blog uncovering brand strategies, advertising techniques, pricing tactics, and human purchasing heuristics.';

    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '');
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) {
        title = article.seoTitle || `${article.title} | Behind the Buy`;
        description = article.seoDescription || article.excerpt;
      }
    } else if (currentPath === '/articles') {
      title = 'All Essays | Consumer Psychology & Brand Strategy';
      description =
        'Explore 10 comprehensive essays on pricing tactics, brand identity, advertising psychology, and consumer purchasing behavior.';
    } else if (currentPath === '/categories' || currentPath.startsWith('/category/')) {
      title = 'Topic Categories | Behind the Buy Publication';
      description =
        'Browse Behind the Buy topic verticals: Pricing Tactics, Brand Strategy, Advertising & Media, Consumer Psychology, and Luxury Prestige.';
    } else if (currentPath === '/about') {
      title = 'About Us | Behind the Buy Editorial Publication';
      description =
        'Learn about Behind the Buy, an independent digital publication dedicated to analyzing consumer psychology, pricing tactics, and brand strategy.';
    }

    document.title = title;

    // Update <meta name="description"> tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }, [currentPath]);

  // Router helper
  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Toggle bookmark saved state
  const handleToggleSaveArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveSaved = (id: string) => {
    setSavedArticleIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAllSaved = () => {
    setSavedArticleIds([]);
  };

  // Parse path to determine current view
  const renderMainContent = () => {
    // 1. Article Detail View: /article/:slug
    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '');
      const article = ARTICLES.find((a) => a.slug === slug);

      if (article) {
        return (
          <ArticleDetail
            article={article}
            onBack={() => navigateTo('/articles')}
            onNavigateSlug={(path) => navigateTo(path)}
            onToggleSave={handleToggleSaveArticle}
            isSaved={savedArticleIds.includes(article.id)}
            savedArticleIds={savedArticleIds}
          />
        );
      }
    }

    // 2. All Articles View: /articles
    if (currentPath === '/articles') {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ArticleGrid
            articles={ARTICLES}
            onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
            onToggleSaveArticle={handleToggleSaveArticle}
            savedArticleIds={savedArticleIds}
            title="All 10 Editorial Essays"
            showCategoryTabs={true}
          />
        </div>
      );
    }

    // 3. Category View: /categories or /category/:id
    if (currentPath.startsWith('/categories') || currentPath.startsWith('/category/')) {
      const categoryId = currentPath.startsWith('/category/')
        ? (currentPath.replace('/category/', '') as CategoryId)
        : undefined;

      return (
        <CategoryView
          selectedCategory={categoryId}
          onSelectCategory={(cat) => {
            if (cat === 'all') {
              navigateTo('/categories');
            } else {
              navigateTo(`/category/${cat}`);
            }
          }}
          onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
          onToggleSaveArticle={handleToggleSaveArticle}
          savedArticleIds={savedArticleIds}
          onBackToHome={() => navigateTo('/')}
        />
      );
    }

    // 4. About View: /about
    if (currentPath === '/about') {
      return <AboutView />;
    }

    // 5. Default Homepage View: /
    const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];
    const nonFeaturedArticles = ARTICLES.filter((a) => a.id !== featuredArticle.id);

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6">
        {/* Hero Section */}
        <Hero
          onExploreArticles={() => navigateTo('/articles')}
          onExploreCategories={() => navigateTo('/categories')}
        />

        {/* Featured Lead Story */}
        <FeaturedArticle
          article={featuredArticle}
          onSelect={(slug) => navigateTo(`/article/${slug}`)}
          onToggleSave={handleToggleSaveArticle}
          isSaved={savedArticleIds.includes(featuredArticle.id)}
        />

        {/* Latest Essays Grid */}
        <ArticleGrid
          articles={nonFeaturedArticles}
          onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
          onToggleSaveArticle={handleToggleSaveArticle}
          savedArticleIds={savedArticleIds}
          title="Recent Consumer Behavior Analysis"
          showCategoryTabs={true}
        />
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1918] selection:bg-[#E2DDD3] selection:text-[#1A1918]">
      {/* Top Bar Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSaved={() => setSavedOpen(true)}
        savedCount={savedArticleIds.length}
      />

      {/* Main Page Body */}
      <div className="flex-1">
        {renderMainContent()}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectCategory={(catId) => navigateTo(`/category/${catId}`)}
      />

      {/* Search Modal Overlay */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
      />

      {/* Saved Articles Drawer */}
      <SavedDrawer
        isOpen={savedOpen}
        onClose={() => setSavedOpen(false)}
        savedIds={savedArticleIds}
        onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
        onRemoveSaved={handleRemoveSaved}
        onClearAllSaved={handleClearAllSaved}
      />
    </div>
  );
}
