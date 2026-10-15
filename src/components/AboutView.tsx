import React, { useState } from 'react';
import { AUTHORS } from '../data/articles';
import { BookOpen, ShieldCheck, Mail, Check, Sparkles, Award, Globe, Users } from 'lucide-react';

export const AboutView: React.FC = () => {
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Kicker */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 border border-stone-300/80 text-xs font-sans font-medium text-stone-700 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>EDITORIAL MANIFESTO</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1A1918] mb-6">
          About Behind the Buy
        </h1>

        <p className="text-lg sm:text-xl font-serif italic text-stone-700 leading-relaxed">
          "Deconstructing the subtle psychological triggers, pricing tactics, and brand architectures that shape modern decision-making."
        </p>
      </div>

      {/* Main Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-12 items-center">
        <div className="md:col-span-7 bg-[#FAF8F5] border border-stone-300/80 rounded-2xl p-8 space-y-4 font-sans text-stone-800 text-base leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-[#1A1918] mb-2">
            Our Editorial Purpose
          </h2>
          <p>
            Every single day, the average consumer makes dozens of transaction decisions. We choose between $4.99 coffee and $6.50 cold brew, upgrade phone memory capacities, collect store loyalty points, and gravitate toward brands that make us feel aligned with an ideal lifestyle.
          </p>
          <p>
            <strong className="text-stone-900 font-semibold">Behind the Buy</strong> was founded as an independent digital publication dedicated to illuminating the cognitive heuristics, pricing anchors, and brand mechanics that operate beneath conscious awareness.
          </p>
          <p>
            We combine insights from behavioral economics, cognitive neuroscience, and commercial strategy to write rigorous, accessible essays. Our goal is neither to glorify nor condemn retail marketing—it is to foster deep understanding.
          </p>
        </div>

        <div className="md:col-span-5 space-y-4">
          <div className="p-6 bg-stone-900 text-stone-100 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
              <Award className="w-4 h-4" />
              <span>Rigorous Standard</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Zero-Fluff Research</h3>
            <p className="text-xs font-sans text-stone-300 leading-relaxed">
              Every essay is grounded in empirical research, real case studies, and behavioral frameworks.
            </p>
          </div>

          <div className="p-6 bg-stone-200/80 border border-stone-300 rounded-xl space-y-2 text-stone-900">
            <div className="flex items-center gap-2 text-stone-700 font-bold text-xs uppercase tracking-wider font-mono">
              <Globe className="w-4 h-4" />
              <span>Independent Voice</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Uncompromised Editorial</h3>
            <p className="text-xs font-sans text-stone-600 leading-relaxed">
              No sponsored product rankings, hidden affiliate links, or pay-for-play coverage.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Team */}
      <section className="my-16 pt-12 border-t border-stone-300">
        <div className="text-center mb-10">
          <span className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-stone-500">
            Contributors & Editors
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1A1918] mt-1">
            Meet Our Editorial Board
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(AUTHORS).map((author, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#FAF8F5] border border-stone-300/80 rounded-xl flex flex-col items-center text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-stone-300 flex items-center justify-center font-bold text-lg text-stone-900 shadow-inner">
                {author.avatar}
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">{author.name}</h3>
                <span className="text-[11px] font-sans text-stone-500 font-medium block mt-0.5">{author.title}</span>
              </div>
              <p className="text-xs font-sans text-stone-600 leading-relaxed">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Dispatch Newsletter Signup */}
      <section className="my-16 p-8 sm:p-12 bg-stone-900 text-stone-100 rounded-2xl text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 text-amber-400 rounded-full text-xs font-sans font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>WEEKLY EDITORIAL DISPATCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Get Behind the Buy in Your Inbox
          </h2>

          <p className="text-sm font-sans text-stone-300 leading-relaxed">
            Join over 18,000 strategy directors, behavioral researchers, and curious consumers who receive our Sunday morning analysis.
          </p>

          {subscribed ? (
            <div className="p-4 bg-stone-800 border border-stone-700 rounded-lg inline-flex items-center gap-2 text-emerald-400 text-sm font-medium animate-in fade-in">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>Thank you for subscribing! Check your inbox for issue #104.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 rounded-md bg-stone-800 border border-stone-700 text-stone-100 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-white text-stone-900 font-sans font-bold text-sm rounded-md transition-all shrink-0"
              >
                Subscribe Free
              </button>
            </form>
          )}

          <p className="text-[11px] text-stone-500 font-sans">
            No spam. Unsubscribe at any time with one click.
          </p>
        </div>
      </section>
    </div>
  );
};
