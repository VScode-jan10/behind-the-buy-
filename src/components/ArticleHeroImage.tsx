import React from 'react';
import { Article } from '../types';

interface ArticleHeroImageProps {
  article: Article;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ArticleHeroImage: React.FC<ArticleHeroImageProps> = ({
  article,
  className = '',
  size = 'md'
}) => {
  const { heroTheme, title, categoryName } = article;

  // Size styling height mapping
  const heightClasses = {
    sm: 'h-48 md:h-56',
    md: 'h-64 md:h-72',
    lg: 'h-80 md:h-96',
    hero: 'h-96 md:h-[480px]'
  };

  return (
    <div
      role="img"
      aria-label={`Editorial illustration for ${title} (${categoryName})`}
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-br ${heroTheme.bgGradient} border border-stone-300/60 shadow-sm flex flex-col justify-between p-6 md:p-8 select-none ${heightClasses[size]} ${className}`}
    >
      {/* Background SVG Patterns */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern
              id={`grid-${article.id}`}
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="#1A1918"
                strokeWidth="1"
              />
            </pattern>
            <pattern
              id={`dots-${article.id}`}
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="12" cy="12" r="2" fill="#1A1918" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={article.heroTheme.pattern === 'grid' ? `url(#grid-${article.id})` : `url(#dots-${article.id})`}
          />
        </svg>
      </div>

      {/* Top Editorial Category Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-stone-700 bg-stone-100/80 backdrop-blur-sm px-3 py-1 rounded-sm border border-stone-300/80">
          {categoryName}
        </span>
        <span className="text-xs font-serif italic text-stone-600">
          Issue {article.id.padStart(2, '0')}
        </span>
      </div>

      {/* Center Symbolic Graphic */}
      <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
        <div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-stone-800/20 bg-stone-100/50 backdrop-blur-md shadow-inner my-2 transition-transform duration-500 hover:scale-105"
          style={{ borderColor: heroTheme.accentColor }}
        >
          <span className="font-serif font-bold text-lg md:text-xl text-stone-900 tracking-wider">
            {heroTheme.symbol}
          </span>
        </div>
      </div>

      {/* Bottom Editorial Caption */}
      <div className="relative z-10 border-t border-stone-800/10 pt-3 flex items-center justify-between text-xs text-stone-700 font-sans">
        <span className="truncate max-w-[70%] font-medium">
          {title}
        </span>
        <span className="font-serif italic text-stone-500 shrink-0">
          Behind the Buy
        </span>
      </div>
    </div>
  );
};
