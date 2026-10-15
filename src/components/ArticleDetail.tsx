import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { ArticleHeroImage } from './ArticleHeroImage';
import { ArticleCard } from './ArticleCard';
import { 
  ArrowLeft, 
  Clock, 
  Bookmark, 
  Share2, 
  Check, 
  Type, 
  BookOpen, 
  ChevronRight,
  CheckCircle2,
  Building2
} from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onNavigateSlug: (slug: string) => void;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
  isSaved?: boolean;
  savedArticleIds?: string[];
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  onNavigateSlug,
  onToggleSave,
  isSaved = false,
  savedArticleIds = [],
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Find related articles in same category or adjacent
  const relatedArticles = ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || Math.random() > 0.5)
  ).slice(0, 3);

  const fontSizeClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
    xlarge: 'text-xl leading-loose'
  };

  return (
    <article className="min-h-screen bg-[#FAF8F5] pb-20">
      {/* Top Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-stone-200">
        <div
          className="h-full bg-stone-900 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sub-Header Breadcrumb & Utility Toolbar */}
      <div className="border-b border-stone-200/80 bg-[#FAF8F5] py-4 sticky top-1 z-30 shadow-xs backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-sans">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 font-semibold transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-200/60 p-1 rounded-md border border-stone-300/60">
              <Type className="w-3.5 h-3.5 text-stone-500 ml-1" />
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  fontSize === 'normal' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  fontSize === 'large' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
              >
                A+
              </button>
            </div>

            {/* Share Button */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-200/60 hover:bg-stone-200 border border-stone-300/60 text-stone-800 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="font-semibold text-emerald-800">Copied Link</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-600" />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* Bookmark Action */}
            {onToggleSave && (
              <button
                onClick={(e) => onToggleSave(article.id, e)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                  isSaved
                    ? 'bg-stone-900 text-stone-100 font-medium'
                    : 'bg-stone-200/60 hover:bg-stone-200 text-stone-800 border border-stone-300/60'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-stone-100' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        {/* Article Header Header */}
        <header className="mb-10 text-center max-w-3xl mx-auto">
          {/* Zero-Pill Text Metadata */}
          <div className="flex items-center justify-center gap-2 text-xs font-sans text-stone-500 uppercase tracking-widest font-semibold mb-4">
            <span>{article.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-stone-600">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {article.readTimeMinutes} minute read
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1A1918] leading-[1.12] text-wrap-balance mb-6">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-stone-700 max-w-2xl mx-auto mb-8">
            "{article.subtitle}"
          </p>

          {/* Author Byline Box */}
          <div className="inline-flex items-center gap-3 pt-6 border-t border-stone-300/60">
            <div className="w-10 h-10 rounded-full bg-stone-300 flex items-center justify-center font-bold text-xs text-stone-800">
              {article.author.avatar}
            </div>
            <div className="text-left">
              <span className="block font-semibold text-sm text-stone-900">{article.author.name}</span>
              <span className="block text-xs text-stone-500">{article.author.title}</span>
            </div>
          </div>
        </header>

        {/* Hero Artwork */}
        <div className="mb-12">
          <ArticleHeroImage article={article} size="hero" />
        </div>

        {/* Essay Body Content */}
        <div className={`prose prose-stone max-w-none text-stone-800 font-sans ${fontSizeClasses[fontSize]}`}>
          {/* Introduction Paragraph with Drop Cap */}
          <div className="drop-cap mb-8 text-stone-900 font-sans leading-relaxed text-lg sm:text-xl">
            {article.content.intro}
          </div>

          {/* Article Sections */}
          {article.content.sections.map((section, idx) => (
            <section key={idx} className="my-10">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1918] mt-8 mb-3">
                {section.heading}
              </h2>

              {section.subheading && (
                <p className="text-xs font-sans uppercase tracking-widest font-semibold text-stone-500 mb-4">
                  {section.subheading}
                </p>
              )}

              {section.body.map((para, pIdx) => (
                <p key={pIdx} className="mb-5 text-stone-800 leading-relaxed">
                  {para}
                </p>
              ))}

              {/* Editorial Pull Quote */}
              {section.pullQuote && (
                <blockquote className="my-8 py-6 px-8 border-y border-stone-300/80 bg-stone-100/50 rounded-sm text-center">
                  <p className="text-xl sm:text-2xl font-serif italic text-stone-900 leading-snug">
                    "{section.pullQuote}"
                  </p>
                </blockquote>
              )}

              {/* Real World Case Study Box */}
              {section.exampleBox && (
                <div className="my-8 p-6 bg-[#F5F2EC] border border-stone-300/80 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-xs font-sans font-bold uppercase tracking-wider text-stone-700">
                    <Building2 className="w-4 h-4 text-stone-800" />
                    <span>Case Study: {section.exampleBox.brandName}</span>
                  </div>
                  <p className="text-sm font-sans text-stone-700 leading-relaxed mb-3">
                    {section.exampleBox.context}
                  </p>
                  <div className="text-xs font-sans bg-stone-200/80 p-3 rounded-md text-stone-900 font-medium">
                    <strong className="font-bold">Key Strategy: </strong>
                    {section.exampleBox.takeaway}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Key Takeaways Summary Box */}
          <div className="my-12 p-6 sm:p-8 bg-stone-900 text-stone-100 rounded-2xl shadow-md">
            <div className="flex items-center gap-2 mb-6 border-b border-stone-800 pb-4">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                Key Editorial Takeaways
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.content.takeaways.map((item, tIdx) => (
                <div key={tIdx} className="space-y-1">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-400 font-bold">
                    0{tIdx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-stone-100 text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs font-sans text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="my-10 pt-6 border-t border-stone-300/80">
            <h3 className="text-xl font-serif font-bold text-[#1A1918] mb-3">
              Conclusion & Strategic Outlook
            </h3>
            <p className="text-stone-800 leading-relaxed">
              {article.content.conclusion}
            </p>
          </div>
        </div>

        {/* Author Bio Card */}
        <div className="mt-12 p-6 bg-stone-200/50 border border-stone-300/80 rounded-xl flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-stone-300 flex items-center justify-center font-bold text-base text-stone-900 shrink-0">
            {article.author.avatar}
          </div>
          <div>
            <span className="text-xs font-sans uppercase tracking-wider font-bold text-stone-500">About the Author</span>
            <h4 className="text-lg font-serif font-bold text-stone-900">{article.author.name}</h4>
            <p className="text-xs font-sans text-stone-600 font-medium mb-1">{article.author.title}</p>
            <p className="text-xs font-sans text-stone-600 leading-relaxed">{article.author.bio}</p>
          </div>
        </div>

        {/* Related Articles Section */}
        <section className="mt-16 pt-10 border-t border-stone-300">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif font-bold text-[#1A1918]">
              Recommended Follow-Up Reading
            </h3>
            <button
              onClick={() => onNavigateSlug('/articles')}
              className="text-xs font-sans font-semibold text-stone-800 hover:text-stone-900 flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                onSelect={(slug) => onNavigateSlug(`/article/${slug}`)}
                onToggleSave={onToggleSave}
                isSaved={savedArticleIds.includes(rel.id)}
                compact
              />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};
