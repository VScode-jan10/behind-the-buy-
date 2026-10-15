import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenSaved,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Articles', path: '/articles' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs'
          : 'bg-[#FAF8F5] border-b border-stone-200/60'
      }`}
    >
      {/* Upper Date & Issue Ribbon */}
      <div className="border-b border-stone-200/40 py-1.5 px-4 text-[11px] font-sans tracking-widest text-stone-500 uppercase flex items-center justify-between max-w-7xl mx-auto">
        <span>VOL. IV • CONSUMER PSYCHOLOGY & BRAND STRATEGY</span>
        <span className="hidden sm:inline">ISSUE 2026 • PUBLISHED WEEKLY</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single Element) */}
          <button
            onClick={() => handleLinkClick('/')}
            className="group flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1918] group-hover:text-stone-700 transition-colors whitespace-nowrap shrink-0">
              Behind the Buy
            </span>
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-stone-500 font-semibold -mt-1">
              Journal of Commerce & Behavior
            </span>
          </button>

          {/* Zone 2: 4 Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium font-sans text-stone-700">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 transition-colors hover:text-[#1A1918] whitespace-nowrap shrink-0 focus:outline-none ${
                    isActive ? 'text-[#1A1918] font-semibold' : 'text-stone-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A1918] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Search & Saved Articles) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium text-stone-700 bg-stone-200/50 hover:bg-stone-200 border border-stone-300/60 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-stone-400"
              aria-label="Search articles"
            >
              <Search className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-stone-500 bg-stone-100 rounded border border-stone-300">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={onOpenSaved}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-[#1A1918] bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-md transition-all shadow-2xs focus:outline-none"
              aria-label="View saved articles"
            >
              <Bookmark className="w-3.5 h-3.5 text-stone-300" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-stone-100 text-stone-900 text-[10px] font-bold rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF8F5] px-6 py-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-serif font-medium text-stone-800">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className="flex items-center justify-between text-left py-2 border-b border-stone-200/60"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
