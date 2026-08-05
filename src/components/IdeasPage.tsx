import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, ArrowRight, RefreshCw, Search, Layers, ShieldCheck, Video } from 'lucide-react';
import { TRENDING_UGC_CONCEPTS } from '../data/conceptsData';
import { AiConceptCard } from '../types';

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
        trendScore: Math.min(99, Math.max(92, Math.floor(92 + Math.random() * 8))),
      }));
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setConcepts(shuffled);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#09090B] py-12 px-4 sm:px-6 selection:bg-[#6615F6]/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6615F6]/15 border border-[#6615F6]/30 text-[#6615F6] text-xs font-mono mb-4">
            <Flame className="w-4 h-4 text-[#6615F6]" />
            <span>Updated Real-Time • High-Converting UGC Ad Frameworks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight mb-4">
            Trending Concepts
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
                  className="bg-[#111113] border border-[#27272A] rounded-3xl p-6 flex flex-col justify-between shadow-xl hover:border-[#6615F6]/50 transition-all group"
                >
                  <div>
                    {/* Top Badge Row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#6615F6]/15 border border-[#6615F6]/30 text-[#6615F6] text-[11px] font-mono font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#6615F6]" />
                        <span>Trend Score: {concept.trendScore}/100</span>
                      </span>

                      <span className="px-2 py-0.5 rounded-full bg-[#09090B] border border-[#27272A] text-[#22C55E] text-[10px] font-mono flex items-center gap-1">
                        <Video className="w-3 h-3 text-[#22C55E]" />
                        <span>UGC Ad</span>
                      </span>
                    </div>

                    {/* Niche Tag */}
                    <div className="text-[10px] font-mono uppercase text-[#6615F6] font-bold tracking-wider mb-1">
                      {concept.nicheCategory}
                    </div>

                    {/* Concept Title */}
                    <h2 className="text-lg font-bold text-[#FAFAFA] mb-2 group-hover:text-[#6615F6] transition-colors leading-snug">
                      {concept.conceptTitle}
                    </h2>

                    {/* Why It Works */}
                    <p className="text-xs text-[#A1A1AA] mb-4 leading-relaxed">
                      {concept.whyItWorks}
                    </p>

                    {/* Card Details */}
                    <div className="space-y-2.5 bg-[#09090B] border border-[#27272A] p-3.5 rounded-2xl text-xs font-mono mb-6">
                      <div>
                        <span className="text-[#A1A1AA]/60 block text-[10px] uppercase">Hook Idea (0-3s)</span>
                        <span className="text-[#FAFAFA] italic">{concept.hookIdea}</span>
                      </div>

                      <div className="pt-1 border-t border-[#27272A]">
                        <span className="text-[#A1A1AA]/60 block text-[10px] uppercase">Target Audience</span>
                        <span className="text-[#FAFAFA]">{concept.targetAudience}</span>
                      </div>

                      <div className="pt-1 border-t border-[#27272A]">
                        <span className="text-[#A1A1AA]/60 block text-[10px] uppercase">Example Niche Product</span>
                        <span className="text-[#FAFAFA]">{concept.productNameExample}</span>
                      </div>

                      <div className="pt-1 border-t border-[#27272A] flex justify-between">
                        <div>
                          <span className="text-[#A1A1AA]/60 block text-[10px] uppercase">Angle</span>
                          <span className="text-[#6615F6]">{concept.marketingAngle}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[#A1A1AA]/60 block text-[10px] uppercase">Emotional Trigger</span>
                          <span className="text-[#22C55E]">{concept.emotionalTrigger}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={() => onSelectConcept(concept)}
                    className="w-full py-3 px-4 bg-[#6615F6] hover:bg-[#6615F6] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-[#6615F6]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>{concept.primaryCta}</span>
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
