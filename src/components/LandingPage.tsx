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
  ArrowDown,
  Terminal
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
        {/* Subtle Background Lighting matching screenshot */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#8B5CF6]/15 to-transparent blur-[120px] pointer-events-none -z-10" />

        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#27272A] text-[#A1A1AA] text-[11px] font-semibold tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
          <span>AI UGC AD DIRECTOR</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-sora text-[40px] sm:text-[64px] md:text-[72px] font-extrabold tracking-[-0.04em] text-[#FAFAFA] max-w-5xl leading-[0.92] mb-6"
        >
          Create AI UGC Ads <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#A78BFA] to-[#C084FC] bg-clip-text text-transparent">
            Without Writing Complex Prompts.
          </span>
        </motion.h1>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-inter text-[16px] sm:text-[18px] text-[#A1A1AA] max-w-[800px] leading-relaxed mb-10 font-normal"
        >
          Describe your product once. Director.ai builds a complete AI-ready Master Prompt<br className="hidden md:block"/> with strategy, hook, storytelling, camera direction, and everything needed to<br className="hidden md:block"/> generate a professional 10-second UGC advertisement.
        </motion.p>

        {/* Primary + Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          <button
            onClick={() => onNavigate('/generate')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-[16px] font-semibold font-inter rounded-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current text-white" />
            <span>Generate Master Prompt</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => onNavigate('/ideas')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#09090B] hover:bg-[#111113] text-white text-[16px] font-medium font-inter rounded-2xl border border-[#27272A] transition-colors cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Lightbulb className="w-4 h-4 text-[#A78BFA]" />
            <span>See Trending Concepts</span>
          </button>
        </motion.div>

        {/* TRUST INDICATORS (4 CAPABILITY BADGES WITHOUT BOXES) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-14 w-full max-w-5xl mb-20 text-left"
        >
          <div className="flex items-start gap-3">
            <Zap className="w-7 h-7 text-[#A78BFA] shrink-0 mt-0.5" />
            <div>
              <div className="font-sora text-[18px] md:text-[20px] font-semibold text-[#E4E4E7]">10X Faster</div>
              <div className="font-inter text-[14px] md:text-[16px] text-[#71717A]">From idea to prompt</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Film className="w-7 h-7 text-[#A78BFA] shrink-0 mt-0.5" />
            <div>
              <div className="font-sora text-[18px] md:text-[20px] font-semibold text-[#E4E4E7]">Production-Ready</div>
              <div className="font-inter text-[14px] md:text-[16px] text-[#71717A]">Made for AI models</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="w-7 h-7 text-[#A78BFA] shrink-0 mt-0.5" />
            <div>
              <div className="font-sora text-[18px] md:text-[20px] font-semibold text-[#E4E4E7]">Strategy-Driven</div>
              <div className="font-inter text-[14px] md:text-[16px] text-[#71717A]">Hooks that convert</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-7 h-7 text-[#A78BFA] shrink-0 mt-0.5" />
            <div>
              <div className="font-sora text-[18px] md:text-[20px] font-semibold text-[#E4E4E7]">Zero Storage</div>
              <div className="font-inter text-[14px] md:text-[16px] text-[#71717A]">Your ideas stay yours</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INFINITE MARQUEE PLATFORMS */}
      <section className="py-12 overflow-hidden bg-[#07090E]">
        <div className="text-center mb-10">
          <h3 className="font-sora text-[20px] sm:text-[24px] text-[#A1A1AA] font-semibold">
            Works with leading AI video generators
          </h3>
        </div>
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Fade edges */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#07090E] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#07090E] to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 sm:gap-24 px-6 sm:px-12">
                {[
                  'Google Veo',
                  'Kling AI',
                  'Runway Gen-3',
                  'Pika Labs',
                  'Hailuo AI',
                  'Luma Dream Machine',
                  'OpenAI Sora'
                ].map((name, idx) => (
                  <span
                    key={`${i}-${idx}`}
                    className="font-sora text-2xl sm:text-3xl md:text-4xl font-bold text-[#27272A] whitespace-nowrap tracking-tight transition-colors hover:text-[#3F3F46] cursor-default"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (TIMELINE) */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-inter text-[14px] uppercase tracking-widest text-[#A78BFA] font-medium block mb-3">
            The Streamlined Workflow
          </span>
          <h2 className="font-sora text-[40px] md:text-[48px] font-bold text-[#FAFAFA] tracking-tight">
            How It Works
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
                <h3 className="font-sora text-[24px] font-semibold text-[#FAFAFA] mb-2">{item.title}</h3>
                <p className="font-inter text-[16px] text-[#A1A1AA] leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TRENDING UGC CONCEPTS PREVIEW */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-[14px] font-inter font-medium mb-3">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Daily Creator Discovery</span>
            </div>
            <h2 className="font-sora text-[40px] md:text-[48px] font-bold text-[#FAFAFA] tracking-tight">
              Trending Concepts
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
                  <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/15 text-[#A78BFA] text-[14px] font-inter font-medium">
                    {concept.nicheCategory}
                  </span>
                  <div className="flex items-center gap-1 font-inter text-[14px] text-[#22C55E]">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>Score {concept.trendScore}</span>
                  </div>
                </div>

                <h3 className="font-sora text-[24px] font-semibold text-[#FAFAFA] mb-3 leading-snug">
                  {concept.conceptTitle}
                </h3>

                <p className="font-inter text-[16px] text-[#A1A1AA] leading-relaxed mb-6">
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
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-inter text-[14px] uppercase tracking-widest text-[#A78BFA] font-medium block mb-3">
            Built For Modern Creators & Marketers
          </span>
          <h2 className="font-sora text-[40px] md:text-[48px] font-bold text-[#FAFAFA] tracking-tight">
            Why Creators Choose Director.ai
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111113] border border-[#27272A] p-8 rounded-3xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A78BFA] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-sora text-[24px] font-semibold text-[#FAFAFA] mb-3">Creative Strategy</h3>
            <p className="font-inter text-[16px] text-[#A1A1AA] leading-relaxed">
              AI thinks like a veteran marketing director — injecting proven hooks, visual framing, and emotional triggers automatically.
            </p>
          </div>

          <div className="bg-[#111113] border border-[#27272A] p-8 rounded-3xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A78BFA] mb-6">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="font-sora text-[24px] font-semibold text-[#FAFAFA] mb-3">Production Ready</h3>
            <p className="font-inter text-[16px] text-[#A1A1AA] leading-relaxed">
              Formatted specifically for next-gen models. Paste directly into Google Veo, Kling, Runway, or Luma without tweaking camera terms.
            </p>
          </div>

          <div className="bg-[#111113] border border-[#27272A] p-8 rounded-3xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-sora text-[24px] font-semibold text-[#FAFAFA] mb-3">Privacy First</h3>
            <p className="font-inter text-[16px] text-[#A1A1AA] leading-relaxed">
              Your prompts, products, and campaign strategies are never stored in databases. Refresh the page and your session data is wiped clean.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PRIVACY SECTION */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Data Retention</span>
          </div>

          <h2 className="font-sora text-[40px] md:text-[48px] font-bold text-[#FAFAFA] tracking-tight mb-6">
            Your Ideas Stay Yours.
          </h2>

          <p className="font-inter text-[16px] sm:text-[18px] text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
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
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-[14px] font-inter font-medium mb-4">
            <Zap className="w-4 h-4 text-[#A78BFA]" />
            <span>Transparent Plans</span>
          </div>
          <h2 className="font-sora text-[40px] md:text-[48px] font-bold text-[#FAFAFA] tracking-tight">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-[14px] font-inter uppercase tracking-widest text-[#A1A1AA] mb-2 font-medium">
                Free Plan
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-sora text-5xl font-bold text-[#FAFAFA]">$0</span>
                <span className="font-inter text-sm text-[#A1A1AA]">/ forever</span>
              </div>
              <p className="font-inter text-[16px] text-[#A1A1AA] mb-8 leading-relaxed">
                Generate Master Prompts instantly to elevate your video ad concepts.
              </p>

              <ul className="space-y-4 font-inter text-[16px] text-[#FAFAFA] mb-10">
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
              className="w-full py-4 px-6 bg-[#1C1C20] hover:bg-[#27272A] text-white text-[16px] font-semibold font-inter rounded-2xl border border-[#27272A] transition-colors cursor-pointer"
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
              <div className="text-[14px] font-inter uppercase tracking-widest text-[#A78BFA] mb-2 font-medium">
                Pro Plan
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-sora text-5xl font-bold text-[#FAFAFA]">$29</span>
                <span className="font-inter text-sm text-[#A1A1AA]">/ month</span>
              </div>
              <p className="font-inter text-[16px] text-[#A1A1AA] mb-8 leading-relaxed">
                For power creators, agencies, and performance marketers building high volume ads.
              </p>

              <ul className="space-y-4 font-inter text-[16px] text-[#FAFAFA] mb-10">
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
              className="w-full py-4 px-6 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-[16px] font-semibold font-inter rounded-2xl transition-all shadow-xl shadow-[#8B5CF6]/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Get Pro Access</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-inter text-[14px] uppercase tracking-widest text-[#A78BFA] font-medium block mb-2">
            Got Questions?
          </span>
          <h2 className="font-sora text-[40px] md:text-[48px] font-bold text-[#FAFAFA] tracking-tight">
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
                className="w-full px-6 py-5 text-left flex items-center justify-between font-sora font-semibold text-[18px] text-[#FAFAFA] cursor-pointer hover:text-[#A78BFA] transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#8B5CF6] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#A1A1AA] shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-6 font-inter text-[16px] text-[#A1A1AA] leading-relaxed border-t border-[#27272A]/50 pt-4">
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
