import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { ArrowUpRight, Mail, Check, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 font-sans border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Brand & Manifesto (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-left focus:outline-none"
            >
              <span className="font-serif text-2xl font-bold text-white tracking-tight block">
                Behind the Buy
              </span>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-stone-400 font-semibold">
                Journal of Commerce & Behavior
              </span>
            </button>

            <p className="text-xs font-sans text-stone-400 leading-relaxed max-w-sm">
              Behind the Buy explores the psychology behind purchasing decisions, brand strategies, advertising techniques, pricing tactics, and consumer behavior.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-sans text-amber-400 uppercase tracking-widest font-bold block mb-1">
                Editorial Independence
              </span>
              <p className="text-[11px] text-stone-500 italic font-serif">
                100% independent analysis. No paid promotional reviews or corporate bias.
              </p>
            </div>
          </div>

          {/* Col 2: Category Index (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-white">
              Topic Index
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-white transition-colors text-stone-400 flex items-center justify-between w-full text-left py-0.5"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-stone-600" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation & Legal (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-white">
              Publication
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/articles')} className="hover:text-white transition-colors">
                  All Essays
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/categories')} className="hover:text-white transition-colors">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Dispatch Newsletter (2 cols / responsive span) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-white">
              Weekly Dispatch
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              New essay alerts every Sunday morning.
            </p>
            {subscribed ? (
              <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-3 py-1.5 text-xs bg-stone-800 border border-stone-700 text-stone-100 placeholder-stone-500 rounded focus:outline-none focus:border-stone-500"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 px-3 bg-stone-100 hover:bg-white text-stone-900 font-bold text-xs rounded transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal / Copyright Strip */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Behind the Buy Digital Publication. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>ISSN 2026-8894</span>
            <span>Crafted for Curious Minds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
