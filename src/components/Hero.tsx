import React from 'react';
import { ArrowRight, Compass, Sparkles, BookOpen } from 'lucide-react';

interface HeroProps {
  onExploreArticles: () => void;
  onExploreCategories: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreArticles,
  onExploreCategories,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] py-12 md:py-20 border-b border-stone-200/80">
      {/* Decorative Subtle Paper Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2DDD3_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Publication Kicker / Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 border border-stone-300/80 text-xs font-sans font-medium text-stone-700 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>EXAMINING THE HIDDEN MECHANICS OF COMMERCE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#1A1918] leading-[1.1] text-wrap-balance mb-6">
            Every Purchase Has a Story.
          </h1>

          {/* Introduction Paragraph */}
          <p className="text-lg sm:text-xl font-sans text-stone-600 leading-relaxed max-w-2xl mx-auto mb-10">
            <span className="font-semibold text-stone-800">Behind the Buy</span> explores the human psychology behind purchasing decisions, brand strategies, advertising techniques, pricing tactics, and consumer behavior.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreArticles}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-sans font-semibold text-stone-100 bg-[#1A1918] hover:bg-stone-800 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-stone-400 group"
            >
              <BookOpen className="w-4 h-4 text-stone-300" />
              <span>Read Latest Articles</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreCategories}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-sans font-medium text-stone-800 bg-stone-200/60 hover:bg-stone-200 border border-stone-300/80 rounded-md transition-all focus:outline-none"
            >
              <Compass className="w-4 h-4 text-stone-600" />
              <span>Browse Topic Index</span>
            </button>
          </div>

          {/* Editorial Pillars Bar */}
          <div className="mt-14 pt-8 border-t border-stone-300/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="block text-xs uppercase tracking-widest text-stone-500 font-sans font-medium">Focus</span>
              <span className="text-sm font-serif font-bold text-stone-800 mt-0.5 block">Behavioral Economics</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-stone-500 font-sans font-medium">Scope</span>
              <span className="text-sm font-serif font-bold text-stone-800 mt-0.5 block">Pricing & Packaging</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-stone-500 font-sans font-medium">Method</span>
              <span className="text-sm font-serif font-bold text-stone-800 mt-0.5 block">Case Studies & Audits</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-stone-500 font-sans font-medium">Cadence</span>
              <span className="text-sm font-serif font-bold text-stone-800 mt-0.5 block">10 Full Essays</span>
            </div>
          </div>

          {/* AEO Insights Question & Answer Section */}
          <div className="mt-12 pt-8 border-t border-stone-300/60 text-left grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F2EC] p-6 sm:p-8 rounded-xl border border-stone-300/80">
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1A1918] mb-2">
                What is consumer psychology in marketing?
              </h2>
              <p className="text-xs font-sans text-stone-700 leading-relaxed">
                <strong className="font-semibold text-stone-900">Consumer psychology</strong> is the study of how human thoughts, emotional triggers, and cognitive heuristics dictate how buyers evaluate products and make purchasing decisions. Marketers leverage these insights to design intuitive retail experiences, optimize pricing structures, and reduce purchase hesitation.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1A1918] mb-2">
                How do brands influence consumer purchasing decisions?
              </h2>
              <p className="text-xs font-sans text-stone-700 leading-relaxed">
                Brands influence purchasing decisions by triggering emotional connections, applying subtle price anchoring, and displaying social proof that lowers perceived risk. Through repeated visual exposure and symbolic identity alignment, brands turn functional utility into long-term customer loyalty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
