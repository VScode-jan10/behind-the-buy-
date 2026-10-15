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

// Helper function to extract normalized clean pathname
export const getCleanPath = (path: string): string => {
  if (!path) return '/';
  let clean = path.split('?')[0].split('#')[0];
  // Remove trailing slashes except for homepage '/'
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }
  return clean;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    getCleanPath(window.location.pathname || '/')
  );
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
      setCurrentPath(getCleanPath(window.location.pathname || '/'));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic Page Metadata Manager for SEO (Title Tags & Meta Descriptions)
  useEffect(() => {
    const cleanPath = getCleanPath(currentPath);
    let title = 'Consumer Psychology Blog | Behind the Buy Publication';
    let description =
      'Behind the Buy is a consumer psychology blog uncovering brand strategies, advertising techniques, pricing tactics, and human purchasing heuristics.';

    if (cleanPath.startsWith('/article/')) {
      const slug = cleanPath.replace('/article/', '');
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) {
        title = article.seoTitle || `${article.title} | Behind the Buy`;
        description = article.seoDescription || article.excerpt;
      } else {
        title = 'Article Not Found | Behind the Buy';
        description = 'The requested consumer psychology essay could not be found.';
      }
    } else if (cleanPath === '/articles') {
      title = 'All Essays | Consumer Psychology & Brand Strategy';
      description =
        'Explore 10 comprehensive essays on pricing tactics, brand identity, advertising psychology, and consumer purchasing behavior.';
    } else if (cleanPath === '/categories') {
      title = 'Topic Categories | Behind the Buy Publication';
      description =
        'Browse Behind the Buy topic verticals: Pricing Tactics, Brand Strategy, Advertising & Media, Consumer Psychology, and Luxury Prestige.';
    } else if (cleanPath.startsWith('/category/')) {
      const categoryId = cleanPath.replace('/category/', '');
      const categoryMeta: Record<string, { title: string; description: string }> = {
        'pricing-tactics': {
          title: 'Pricing Tactics & Behavioral Economics | Behind the Buy',
          description:
            'Explore pricing tactics essays analyzing price anchoring, charm pricing, decoy effects, and volume packaging strategies in retail commerce.'
        },
        'brand-strategy': {
          title: 'Brand Strategy & Consumer Loyalty | Behind the Buy',
          description:
            'Discover brand strategy essays on building emotional moats, distinct identity architectures, storytelling, and scarcity-driven drop mechanics.'
        },
        'advertising-media': {
          title: 'Advertising Psychology & Media | Behind the Buy',
          description:
            'Examine advertising psychology essays on persuasion mechanics, sensory priming, mere exposure, and storytelling in modern media campaigns.'
        },
        'consumer-psychology': {
          title: 'Consumer Psychology & Heuristics | Behind the Buy',
          description:
            'Analyze consumer psychology essays on mental shortcuts, herding instincts, review validation, and social proof in purchasing decisions.'
        },
        'luxury-prestige': {
          title: 'Luxury Goods & Prestige Pricing | Behind the Buy',
          description:
            'Investigate luxury pricing essays covering Veblen goods, status signaling, exquisite friction, and the economics of unattainable exclusivity.'
        }
      };

      if (categoryMeta[categoryId]) {
        title = categoryMeta[categoryId].title;
        description = categoryMeta[categoryId].description;
      } else {
        title = 'Topic Categories | Behind the Buy Publication';
        description =
          'Browse Behind the Buy topic verticals: Pricing Tactics, Brand Strategy, Advertising & Media, Consumer Psychology, and Luxury Prestige.';
      }
    } else if (cleanPath === '/about') {
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

    // Dynamic Canonical URL Tag Management
    const DOMAIN = 'https://behind-the-buy-upkc.vercel.app';
    const canonicalUrl = cleanPath === '/' ? `${DOMAIN}/` : `${DOMAIN}${cleanPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // -------------------------------------------------------------
    // Dynamic Schema.org JSON-LD Structured Data Management (@graph)
    // -------------------------------------------------------------
    const formatIsoDate = (dateStr: string): string => {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '2026-10-15T00:00:00Z';
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}T00:00:00Z`;
    };

    const organizationSchema = {
      '@type': 'Organization',
      '@id': `${DOMAIN}/#organization`,
      'name': 'Behind the Buy',
      'url': `${DOMAIN}/`,
      'description': 'An independent digital publication dedicated to analyzing consumer psychology, pricing tactics, and brand strategy.'
    };

    const websiteSchema = {
      '@type': 'WebSite',
      '@id': `${DOMAIN}/#website`,
      'url': `${DOMAIN}/`,
      'name': 'Behind the Buy',
      'description': 'Consumer psychology, pricing tactics, and brand strategy analysis publication.',
      'publisher': { '@id': `${DOMAIN}/#organization` }
    };

    const graphItems: any[] = [organizationSchema, websiteSchema];

    if (cleanPath.startsWith('/article/')) {
      const slug = cleanPath.replace('/article/', '');
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) {
        const articleIsoDate = formatIsoDate(article.publishedAt);
        const articleUrl = `${DOMAIN}/article/${article.slug}`;

        graphItems.push({
          '@type': 'BlogPosting',
          '@id': `${articleUrl}#article`,
          'mainEntityOfPage': articleUrl,
          'headline': article.title,
          'description': article.seoDescription || article.excerpt,
          'datePublished': articleIsoDate,
          'author': {
            '@type': 'Person',
            'name': article.author.name,
            'jobTitle': article.author.title
          },
          'publisher': { '@id': `${DOMAIN}/#organization` },
          'isPartOf': { '@id': `${DOMAIN}/#website` },
          'articleSection': article.categoryName,
          'keywords': article.tags ? article.tags.join(', ') : undefined
        });

        graphItems.push({
          '@type': 'BreadcrumbList',
          '@id': `${articleUrl}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': `${DOMAIN}/`
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': article.categoryName,
              'item': `${DOMAIN}/category/${article.category}`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': article.title,
              'item': articleUrl
            }
          ]
        });
      } else {
        graphItems.push({
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          'url': canonicalUrl,
          'name': title,
          'description': description,
          'isPartOf': { '@id': `${DOMAIN}/#website` }
        });
      }
    } else if (cleanPath.startsWith('/category/')) {
      const categoryId = cleanPath.replace('/category/', '') as CategoryId;
      const categoryObj = CATEGORIES.find((c) => c.id === categoryId);
      const categoryUrl = `${DOMAIN}/category/${categoryId}`;

      graphItems.push({
        '@type': 'CollectionPage',
        '@id': `${categoryUrl}#webpage`,
        'url': categoryUrl,
        'name': categoryObj ? categoryObj.name : 'Topic Category',
        'description': categoryObj ? categoryObj.description : description,
        'isPartOf': { '@id': `${DOMAIN}/#website` }
      });

      graphItems.push({
        '@type': 'BreadcrumbList',
        '@id': `${categoryUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Categories',
            'item': `${DOMAIN}/categories`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': categoryObj ? categoryObj.name : 'Category',
            'item': categoryUrl
          }
        ]
      });
    } else if (cleanPath === '/categories') {
      const categoriesUrl = `${DOMAIN}/categories`;
      graphItems.push({
        '@type': 'CollectionPage',
        '@id': `${categoriesUrl}#webpage`,
        'url': categoriesUrl,
        'name': title,
        'description': description,
        'isPartOf': { '@id': `${DOMAIN}/#website` }
      });

      graphItems.push({
        '@type': 'BreadcrumbList',
        '@id': `${categoriesUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Categories',
            'item': categoriesUrl
          }
        ]
      });
    } else if (cleanPath === '/articles') {
      const articlesUrl = `${DOMAIN}/articles`;
      graphItems.push({
        '@type': 'CollectionPage',
        '@id': `${articlesUrl}#webpage`,
        'url': articlesUrl,
        'name': title,
        'description': description,
        'isPartOf': { '@id': `${DOMAIN}/#website` }
      });

      graphItems.push({
        '@type': 'BreadcrumbList',
        '@id': `${articlesUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'All Essays',
            'item': articlesUrl
          }
        ]
      });
    } else if (cleanPath === '/about') {
      const aboutUrl = `${DOMAIN}/about`;
      graphItems.push({
        '@type': 'AboutPage',
        '@id': `${aboutUrl}#webpage`,
        'url': aboutUrl,
        'name': title,
        'description': description,
        'isPartOf': { '@id': `${DOMAIN}/#website` },
        'about': { '@id': `${DOMAIN}/#organization` }
      });

      graphItems.push({
        '@type': 'BreadcrumbList',
        '@id': `${aboutUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'About Us',
            'item': aboutUrl
          }
        ]
      });
    } else {
      graphItems.push({
        '@type': 'WebPage',
        '@id': `${DOMAIN}/#webpage`,
        'url': `${DOMAIN}/`,
        'name': title,
        'description': description,
        'isPartOf': { '@id': `${DOMAIN}/#website` },
        'about': { '@id': `${DOMAIN}/#organization` }
      });
    }

    // Single script tag injection / update using fixed id to prevent duplication
    let jsonLdScript = document.querySelector('script[id="schema-jsonld"]') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'schema-jsonld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }

    jsonLdScript.textContent = JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@graph': graphItems
      },
      null,
      2
    );
  }, [currentPath]);

  // Router helper
  const navigateTo = (path: string) => {
    const targetPath = getCleanPath(path);
    if (getCleanPath(window.location.pathname) !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentPath(targetPath);
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
    const cleanPath = getCleanPath(currentPath);

    // 1. Article Detail View: /article/:slug
    if (cleanPath.startsWith('/article/')) {
      const slug = cleanPath.replace('/article/', '');
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
      } else {
        return (
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1918] mb-4">
              Article Not Found
            </h1>
            <p className="text-stone-600 font-sans text-base mb-8 max-w-md mx-auto">
              The essay you are looking for does not exist or may have been moved.
            </p>
            <button
              onClick={() => navigateTo('/articles')}
              className="px-6 py-3 bg-stone-900 text-stone-100 font-sans text-sm font-semibold rounded-lg shadow-sm hover:bg-stone-800 transition-colors"
            >
              Browse All 10 Editorial Essays
            </button>
          </main>
        );
      }
    }

    // 2. All Articles View: /articles
    if (cleanPath === '/articles') {
      return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ArticleGrid
            articles={ARTICLES}
            onSelectArticle={(slug) => navigateTo(`/article/${slug}`)}
            onToggleSaveArticle={handleToggleSaveArticle}
            savedArticleIds={savedArticleIds}
            title="All 10 Editorial Essays"
            titleTag="h1"
            showCategoryTabs={true}
          />
        </main>
      );
    }

    // 3. Category View: /categories or /category/:id
    if (cleanPath === '/categories' || cleanPath.startsWith('/category/')) {
      const categoryId = cleanPath.startsWith('/category/')
        ? (cleanPath.replace('/category/', '') as CategoryId)
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
    if (cleanPath === '/about') {
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
