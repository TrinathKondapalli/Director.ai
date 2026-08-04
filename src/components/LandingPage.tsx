import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Lightbulb,
  Check,
  Zap,
  Copy,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Eye,
  Film,
  Flame,
  ArrowDown
} from 'lucide-react';
import { DirectorLogoBanner } from './DirectorLogo';
import { TRENDING_UGC_CONCEPTS } from '../data/conceptsData';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Preview top 3 trending concepts
  const featuredConcepts = TRENDING_UGC_CONCEPTS.slice(0, 3);

  const faqs = [
    {
      q: 'What is a Master Prompt?',
      a: 'A Master Prompt is an all-in-one, highly engineered text instruction containing creative strategy, hook, scene-by-scene script, lighting specs, camera movement, and audio direction formatted specifically for generative video models like Google Veo, Kling, and Runway Gen-3.',
    },
    {
      q: 'Which AI video tools are supported?',
      a: 'Director.ai prompts are optimized out of the box for Google Veo, Google Flow, Kling AI, Runway Gen-3, Pika, Hailuo (Minimax), and Luma Dream Machine.',
    },
    {
      q: 'Are my prompts or product details stored on any server?',
      a: 'Never. Director.ai operates with zero persistent storage. Your inputs and prompts exist solely in temporary browser memory during generation and are destroyed when you refresh or navigate away.',
    },
    {
      q: 'Can I use generated Master Prompts commercially?',
      a: 'Yes! All Master Prompts created through Director.ai come with 100% full commercial usage rights for your brand, agency, or client ad campaigns.',
    },
    {
      q: 'Do I need any prompt engineering experience?',
      a: 'Zero experience required. You simply provide your product name and target audience. Director.ai acts as your AI Creative Director to handle technical framing, cinematic jargon, and marketing strategy.',
    },
  ];

  return (
    <div className="w-full bg-[#09090B] text-white selection:bg-[#8B5CF6]/30 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-24 px-4 sm:px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#8B5CF6]/15 blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Director.ai Official Logo Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <DirectorLogoBanner size="lg" showBadge={true} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#FAFAFA] max-w-4xl leading-[1.1] mb-6"
        >
          Stop Writing Prompts. <br />
          <span className="bg-gradient-to-r from-white via-[#E9D5FF] to-[#8B5CF6] bg-clip-text text-transparent">
            Start Creating UGC Ads.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#A1A1AA] max-w-3xl leading-relaxed mb-10 font-normal"
        >
          Describe your product once. Director.ai builds a complete AI-ready Master Prompt with strategy, hook, storytelling, camera direction, and everything needed to generate a professional 10-second UGC advertisement.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          <button
            onClick={() => onNavigate('/generate')}
            className="w-full sm:w-auto px-9 py-4.5 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-base font-semibold rounded-2xl transition-all shadow-xl shadow-[#8B5CF6]/25 hover:shadow-[#A78BFA]/40 flex items-center justify-center gap-3 group cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            <span>Generate Master Prompt</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('/ideas')}
            className="w-full sm:w-auto px-8 py-4.5 bg-[#111113] hover:bg-[#1C1C20] text-white text-base font-medium rounded-2xl border border-[#27272A] transition-colors cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Lightbulb className="w-5 h-5 text-[#A78BFA]" />
            <span>See Trending Concepts</span>
          </button>
        </motion.div>

        {/* ANIMATED HERO MOCKUP */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-4xl bg-[#111113]/90 border border-[#27272A] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden text-left"
        >
          {/* Subtle top glow bar inside mockup */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-70" />

          {/* Browser dots header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
              <span className="ml-3 text-xs font-mono text-[#A1A1AA]/60">director.ai / engine-pipeline</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>LIVE WORKFLOW ENGINE</span>
            </div>
          </div>

          {/* Flow visual grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4 pt-6 items-center">
            {/* Step 1 Input Box */}
            <div className="md:col-span-2 bg-[#09090B] border border-[#27272A] rounded-2xl p-4 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#A78BFA]">1. Input Details</div>
              <div>
                <label className="text-[10px] text-[#A1A1AA] block mb-1">Product</label>
                <div className="bg-[#111113] border border-[#27272A] text-xs text-[#FAFAFA] px-3 py-2 rounded-lg font-mono">
                  Aura Track Pro Smart Ring
                </div>
              </div>
              <div>
                <label className="text-[10px] text-[#A1A1AA] block mb-1">Target Audience</label>
                <div className="bg-[#111113] border border-[#27272A] text-xs text-[#FAFAFA] px-3 py-2 rounded-lg font-mono">
                  Busy Tech Professionals & Biohackers
                </div>
              </div>
            </div>

            {/* Arrow Divider */}
            <div className="flex justify-center md:col-span-1">
              <div className="p-2 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA]">
                <ArrowRight className="w-5 h-5 hidden md:block" />
                <ArrowDown className="w-5 h-5 md:hidden" />
              </div>
            </div>

            {/* Step 2 Master Prompt Output Box */}
            <div className="md:col-span-3 bg-[#09090B] border border-[#8B5CF6]/40 rounded-2xl p-4 relative space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#8B5CF6] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>2. Master Prompt Generated</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#A78BFA] text-[10px] font-mono">
                  READY
                </div>
              </div>

              <div className="bg-[#111113] border border-[#27272A] p-3 rounded-xl text-[11px] font-mono text-[#A1A1AA] leading-relaxed line-clamp-3">
                [SCENE START] 9:16 vertical 4K macro. Close-up selfie mode creator holding sleek titanium smart ring under warm morning window light...
              </div>

              {/* Copy & Platform Destinations */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#27272A]/50">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#22C55E]">
                  <Copy className="w-3 h-3" />
                  <span>1-Click Copy</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#A1A1AA]">
                  <span>Paste to:</span>
                  <span className="px-2 py-0.5 rounded bg-[#1C1C20] text-white">Google Veo</span>
                  <span className="px-2 py-0.5 rounded bg-[#1C1C20] text-white">Kling AI</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. TRUSTED AI VIDEO PLATFORMS */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#27272A]">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A1A1AA] font-semibold">
            Optimized Master Prompts Compatible With
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { name: 'Google Veo', tag: 'Cinematic' },
            { name: 'Google Flow', tag: 'Interactive' },
            { name: 'Kling AI', tag: 'Hyper-Realism' },
            { name: 'Runway', tag: 'Gen-3 Alpha' },
            { name: 'Pika', tag: 'Animation' },
            { name: 'Luma', tag: 'Dream Machine' },
            { name: 'Hailuo', tag: 'Minimax' },
          ].map((platform, idx) => (
            <motion.div
              key={platform.name}
              whileHover={{ y: -4, borderColor: '#8B5CF6' }}
              transition={{ duration: 0.2 }}
              className="bg-[#111113] border border-[#27272A] rounded-2xl p-4 text-center cursor-default transition-all shadow-md hover:shadow-[#8B5CF6]/10"
            >
              <div className="text-sm font-bold text-[#FAFAFA] mb-1">{platform.name}</div>
              <div className="text-[10px] text-[#A1A1AA] font-mono">{platform.tag}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS (TIMELINE) */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#27272A]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA] font-semibold block mb-2">
            The Streamlined Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight">
            How Director.ai Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Timeline Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-[#8B5CF6]/10 via-[#8B5CF6]/50 to-[#8B5CF6]/10 -translate-y-8 pointer-events-none" />

          {[
            {
              step: '01',
              title: 'Describe Product',
              desc: 'Enter your product name and who it is for. Optional URL. That is all.',
              icon: Cpu,
            },
            {
              step: '02',
              title: 'AI Strategy',
              desc: 'Director.ai formulates hook, lighting specs, timeline, and emotional triggers.',
              icon: Layers,
            },
            {
              step: '03',
              title: 'Copy Master Prompt',
              desc: 'Get your single production-ready MASTER PROMPT with one click.',
              icon: Copy,
            },
            {
              step: '04',
              title: 'Generate AI Video',
              desc: 'Paste directly into Veo, Kling, Runway, or Luma to produce your UGC ad.',
              icon: Film,
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-[#111113] border border-[#27272A] hover:border-[#8B5CF6]/50 p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-[#8B5CF6] font-mono">{item.step}</span>
                <div className="p-3 rounded-2xl bg-[#1C1C20] border border-[#27272A] text-[#A78BFA]">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#FAFAFA] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TRENDING UGC CONCEPTS PREVIEW */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#27272A]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-mono mb-3">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Daily Creator Discovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
              Trending UGC Concepts
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/ideas')}
            className="px-6 py-3 bg-[#111113] hover:bg-[#1C1C20] text-white text-sm font-semibold rounded-xl border border-[#27272A] transition-colors cursor-pointer flex items-center gap-2 self-start md:self-auto"
          >
            <span>View All Concepts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredConcepts.map((concept) => (
            <motion.div
              key={concept.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-[#111113] border border-[#27272A] hover:border-[#8B5CF6]/40 p-6 rounded-3xl flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/15 text-[#A78BFA] text-[11px] font-mono font-medium">
                    {concept.nicheCategory}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs text-[#22C55E]">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>Score {concept.trendScore}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#FAFAFA] mb-3 leading-snug">
                  {concept.conceptTitle}
                </h3>

                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                  {concept.whyItWorks}
                </p>
              </div>

              <button
                onClick={() => {
                  onNavigate('/generate');
                }}
                className="w-full py-3 px-4 bg-[#1C1C20] hover:bg-[#8B5CF6] text-white text-xs font-semibold rounded-xl border border-[#27272A] hover:border-transparent transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Use Concept</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. WHY DIRECTOR.AI */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#27272A]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA] font-semibold block mb-2">
            Built For Modern Creators & Marketers
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight">
            Why Director.ai?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111113] border border-[#27272A] p-8 rounded-3xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A78BFA] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#FAFAFA] mb-3">Creative Strategy</h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              AI thinks like a veteran marketing director — injecting proven hooks, visual framing, and emotional triggers automatically.
            </p>
          </div>

          <div className="bg-[#111113] border border-[#27272A] p-8 rounded-3xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A78BFA] mb-6">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#FAFAFA] mb-3">Production Ready</h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Formatted specifically for next-gen models. Paste directly into Google Veo, Kling, Runway, or Luma without tweaking camera terms.
            </p>
          </div>

          <div className="bg-[#111113] border border-[#27272A] p-8 rounded-3xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#FAFAFA] mb-3">Privacy First</h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Your prompts, products, and campaign strategies are never stored in databases. Refresh the page and your session data is wiped clean.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PRIVACY SECTION */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#27272A]">
        <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Data Retention</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight mb-6">
            Your Ideas Stay Yours.
          </h2>

          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
            Director.ai never stores prompts, products, or generated content. Everything exists only while you're using the application. Once you refresh or leave the page, it's gone forever.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-[#09090B] border border-[#27272A] p-5 rounded-2xl">
              <Lock className="w-5 h-5 text-[#22C55E] mb-3" />
              <div className="text-sm font-bold text-[#FAFAFA] mb-1">No Database</div>
              <div className="text-xs text-[#A1A1AA]">Zero persistent records</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-5 rounded-2xl">
              <Lock className="w-5 h-5 text-[#22C55E] mb-3" />
              <div className="text-sm font-bold text-[#FAFAFA] mb-1">No History</div>
              <div className="text-xs text-[#A1A1AA]">No prompts saved</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-5 rounded-2xl">
              <Lock className="w-5 h-5 text-[#22C55E] mb-3" />
              <div className="text-sm font-bold text-[#FAFAFA] mb-1">No Cookies</div>
              <div className="text-xs text-[#A1A1AA]">Clean browser session</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-5 rounded-2xl">
              <Lock className="w-5 h-5 text-[#22C55E] mb-3" />
              <div className="text-sm font-bold text-[#FAFAFA] mb-1">Memory Only</div>
              <div className="text-xs text-[#A1A1AA]">Clears on refresh</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#27272A]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-mono mb-4">
            <Zap className="w-4 h-4 text-[#A78BFA]" />
            <span>Transparent Plans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#A1A1AA] mb-2 font-bold">
                Free Plan
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-extrabold text-[#FAFAFA]">$0</span>
                <span className="text-sm text-[#A1A1AA]">/ forever</span>
              </div>
              <p className="text-sm text-[#A1A1AA] mb-8 leading-relaxed">
                Generate Master Prompts instantly to elevate your video ad concepts.
              </p>

              <ul className="space-y-4 text-sm text-[#FAFAFA] mb-10">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#22C55E]" />
                  <span>5 Free Master Prompts per day</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#22C55E]" />
                  <span>Veo, Kling, Runway & Luma formatting</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#22C55E]" />
                  <span>Access to Trending Concepts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#22C55E]" />
                  <span>Zero Data Storage Protection</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('/generate')}
              className="w-full py-4 px-6 bg-[#1C1C20] hover:bg-[#27272A] text-white text-sm font-semibold rounded-2xl border border-[#27272A] transition-colors cursor-pointer"
            >
              Start Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-[#111113] border-2 border-[#8B5CF6] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-4 right-8 px-4 py-1.5 bg-[#8B5CF6] text-white text-xs font-mono uppercase font-bold tracking-wider rounded-full shadow-lg">
              Recommended
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#A78BFA] mb-2 font-bold">
                Pro Plan
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-extrabold text-[#FAFAFA]">$29</span>
                <span className="text-sm text-[#A1A1AA]">/ month</span>
              </div>
              <p className="text-sm text-[#A1A1AA] mb-8 leading-relaxed">
                For power creators, agencies, and performance marketers building high volume ads.
              </p>

              <ul className="space-y-4 text-sm text-[#FAFAFA] mb-10">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#8B5CF6]" />
                  <span>Unlimited Master Prompts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#8B5CF6]" />
                  <span>Priority Generation Speed</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#8B5CF6]" />
                  <span>Advanced UGC Creative Strategies</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#8B5CF6]" />
                  <span>Full Commercial Usage Rights</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('/generate')}
              className="w-full py-4 px-6 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-sm font-semibold rounded-2xl transition-all shadow-xl shadow-[#8B5CF6]/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Get Pro Access</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#27272A]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA] font-semibold block mb-2">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#111113] border border-[#27272A] rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-base text-[#FAFAFA] cursor-pointer hover:text-[#A78BFA] transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#8B5CF6] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#A1A1AA] shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-[#A1A1AA] leading-relaxed border-t border-[#27272A]/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
