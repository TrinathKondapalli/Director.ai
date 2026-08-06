import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, ArrowRight, RefreshCw, Search, Layers, ShieldCheck, Video, Lightbulb, Users, ShoppingBag } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { TRENDING_UGC_CONCEPTS } from '../data/conceptsData';
import { AiConceptCard } from '../types';
import { BackgroundGlow } from './BackgroundGlow';

interface IdeasPageProps {
  onSelectConcept: (concept: AiConceptCard) => void;
}

const CATEGORIES = [
  'All Niches',
  'Smart Tech & Wearables',
  'Beauty & Skincare',
  'Health & Biohacking',
  'Home & Kitchen',
  'Productivity & SaaS',
  'Eco & Sustainability',
];

export const IdeasPage: React.FC<IdeasPageProps> = ({ onSelectConcept }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Niches');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [concepts, setConcepts] = useState<AiConceptCard[]>(TRENDING_UGC_CONCEPTS);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Filtered concepts based on category and search query
  const filteredConcepts = useMemo(() => {
    return concepts.filter((c) => {
      const matchesCategory =
        selectedCategory === 'All Niches' || c.nicheCategory === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.conceptTitle.toLowerCase().includes(q) ||
        c.productNameExample.toLowerCase().includes(q) ||
        c.hookIdea.toLowerCase().includes(q) ||
        c.marketingAngle.toLowerCase().includes(q) ||
        c.recommendedCategory.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [concepts, selectedCategory, searchQuery]);

  // Refresh / Reshuffle concepts with AI variation angles
  const handleRefreshConcepts = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Shuffle array and randomly increment trend score slightly to simulate live feed update
      const shuffled = [...concepts].map((item) => ({
        ...item,
        id: item.id.split('-')[0] + '-' + Math.random().toString(36).substring(2, 7), // Generate new ID so animation replays
        trendScore: Math.min(99, Math.max(92, Math.floor(92 + Math.random() * 8))),
      }));
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setConcepts(shuffled);
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#09090B] py-12 px-4 sm:px-6 selection:bg-[#6615F6]/30 relative overflow-hidden">
      <BackgroundGlow />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#A78BFA]/50 bg-[#111113]/50 backdrop-blur-sm text-[#A78BFA] text-[11px] font-semibold tracking-wide shadow-[0_0_15px_rgba(167,139,250,0.6)]">
            <span>Updated Real-Time • High-Converting UGC Ad Frameworks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight mb-4">
            <AnimatedText text="Trending Concepts" className="justify-center" />
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Discover viral-proven 9:16 vertical UGC advertisement structures across leading e-commerce niches. Click any concept to load Director.ai immediately.
          </p>
        </div>

        {/* CONTROLS BAR: SEARCH & CATEGORY FILTERS & LIVE REFRESH */}
        <div className="bg-[#111113] border border-[#27272A] p-4 sm:p-5 rounded-3xl mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search niche, hook, or product (e.g. serum, ring, espresso)..."
                className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#6615F6] focus:ring-1 focus:ring-[#6615F6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#FAFAFA] placeholder-[#A1A1AA]/50 outline-none transition-colors"
              />
            </div>

            {/* Refresh Market Trends Button */}
            <button
              onClick={handleRefreshConcepts}
              disabled={isRefreshing}
              className="px-4 py-2.5 bg-[#1C1C20] hover:bg-[#27272A] text-white text-xs font-semibold rounded-xl border border-[#27272A] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#6615F6] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Market Feed</span>
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#6615F6] text-white font-semibold shadow-md shadow-[#6615F6]/20'
                      : 'bg-[#09090B] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[#27272A]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONCEPT CARDS GRID */}
        {filteredConcepts.length === 0 ? (
          <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-12 text-center max-w-md mx-auto my-12 shadow-2xl">
            <Layers className="w-10 h-10 text-[#A1A1AA] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#FAFAFA] mb-1">No Concepts Found</h3>
            <p className="text-xs text-[#A1A1AA] mb-4">
              Try adjusting your search query or selecting "All Niches".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Niches');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#6615F6] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <AnimatePresence mode="popLayout">
              {filteredConcepts.map((concept, index) => (
                <motion.div
                  key={concept.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="bg-[#09090B] border border-[#27272A] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-[#6615F6]/50 transition-all group"
                >
                  <div>
                    {/* Top Badge Row */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="px-3 py-1 rounded-full bg-[#6615F6]/10 border border-[#6615F6]/30 text-[#C084FC] text-[11px] font-mono font-medium flex items-center">
                        Trend Score: {concept.trendScore}/100
                      </span>

                      <span className="px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#4ADE80] text-[10px] font-mono font-medium flex items-center">
                        UGC Ad
                      </span>
                    </div>

                    {/* Niche Tag */}
                    <div className="text-[12px] font-mono uppercase text-[#A78BFA] font-bold tracking-wider mb-2">
                      {concept.nicheCategory}
                    </div>

                    {/* Concept Title */}
                    <h2 className="text-[24px] font-bold text-[#FAFAFA] mb-3 group-hover:text-[#C084FC] transition-colors leading-tight font-sora">
                      "{concept.conceptTitle}"
                    </h2>

                    {/* Why It Works */}
                    <p className="text-[14px] text-[#A1A1AA] mb-8 leading-relaxed font-inter">
                      {concept.whyItWorks}
                    </p>

                    {/* Card Details */}
                    <div className="flex flex-col gap-5 pt-6 border-t border-[#27272A] mb-8">
                      {/* Hook Idea */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#111113] border border-[#27272A] flex items-center justify-center shrink-0 group-hover:border-[#6615F6]/30 transition-colors">
                          <Lightbulb className="w-4 h-4 text-[#A78BFA]" />
                        </div>
                        <div>
                          <div className="text-[12px] text-[#71717A] mb-1 font-inter">Hook Idea (0-3s)</div>
                          <div className="text-[14px] text-[#FAFAFA] leading-snug font-inter">"{concept.hookIdea}"</div>
                        </div>
                      </div>

                      {/* Target Audience */}
                      <div className="flex items-start gap-4 pt-5 border-t border-[#27272A]/50">
                        <div className="w-10 h-10 rounded-xl bg-[#111113] border border-[#27272A] flex items-center justify-center shrink-0 group-hover:border-[#6615F6]/30 transition-colors">
                          <Users className="w-4 h-4 text-[#A78BFA]" />
                        </div>
                        <div>
                          <div className="text-[12px] text-[#71717A] mb-1 font-inter">Target Audience</div>
                          <div className="text-[14px] text-[#FAFAFA] leading-snug font-inter">{concept.targetAudience}</div>
                        </div>
                      </div>

                      {/* Example Product */}
                      <div className="flex items-start gap-4 pt-5 border-t border-[#27272A]/50">
                        <div className="w-10 h-10 rounded-xl bg-[#111113] border border-[#27272A] flex items-center justify-center shrink-0 group-hover:border-[#6615F6]/30 transition-colors">
                          <ShoppingBag className="w-4 h-4 text-[#A78BFA]" />
                        </div>
                        <div>
                          <div className="text-[12px] text-[#71717A] mb-1 font-inter">Example Product</div>
                          <div className="text-[14px] text-[#FAFAFA] leading-snug font-inter">{concept.productNameExample}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={() => onSelectConcept(concept)}
                    className="w-full py-4 btn-primary flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Use This Concept</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
