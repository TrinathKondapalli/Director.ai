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
        {/* Subtle Background Radial Lighting & Grid Overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_70%)] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111113_1px,transparent_1px),linear-gradient(to_bottom,#111113_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none -z-10" />

        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111113] border border-[#27272A] text-[#A78BFA] text-xs font-mono tracking-wide shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
          <span>AI UGC Director</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#FAFAFA] max-w-5xl leading-[1.08] mb-6 font-sans"
        >
          Stop Writing Prompts. <br />
          Start Creating <span className="text-[#8B5CF6]">UGC Ads.</span>
        </motion.h1>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-3xl leading-relaxed mb-10 font-normal"
        >
          Enter product information once. Director.ai builds a complete production-ready MASTER PROMPT including creative strategy, marketing angle, storytelling, camera direction, and everything required to generate a professional AI UGC advertisement.
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
            className="w-full sm:w-auto px-8 py-4 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-base font-semibold rounded-2xl transition-all shadow-lg shadow-[#8B5CF6]/20 hover:shadow-[#A78BFA]/30 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5 fill-current text-white" />
            <span>Generate Master Prompt</span>
          </button>

          <button
            onClick={() => onNavigate('/ideas')}
            className="w-full sm:w-auto px-8 py-4 bg-[#111113] hover:bg-[#1C1C20] text-white text-base font-medium rounded-2xl border border-[#27272A] transition-colors cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Lightbulb className="w-5 h-5 text-[#A78BFA]" />
            <span>See Trending Concepts</span>
          </button>
        </motion.div>

        {/* TRUST INDICATORS (4 CAPABILITY BADGES) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl mb-16 text-left"
        >
          <div className="flex items-start gap-3.5 bg-[#111113] border border-[#27272A] p-4.5 rounded-2xl hover:border-[#8B5CF6]/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA] shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#FAFAFA]">⚡ Fast Generation</div>
              <div className="text-xs text-[#A1A1AA] leading-snug">Instant prompt output</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-[#111113] border border-[#27272A] p-4.5 rounded-2xl hover:border-[#8B5CF6]/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA] shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#FAFAFA]">🎬 Production Ready</div>
              <div className="text-xs text-[#A1A1AA] leading-snug">Formatted for video models</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-[#111113] border border-[#27272A] p-4.5 rounded-2xl hover:border-[#8B5CF6]/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA] shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#FAFAFA]">🧠 Strategy Driven</div>
              <div className="text-xs text-[#A1A1AA] leading-snug">Hooks engineered to convert</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-[#111113] border border-[#27272A] p-4.5 rounded-2xl hover:border-[#22C55E]/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#22C55E]/15 text-[#22C55E] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#FAFAFA]">🔒 Zero Prompt Storage</div>
              <div className="text-xs text-[#A1A1AA] leading-snug">Your ideas stay yours</div>
            </div>
          </div>
        </motion.div>

        {/* REALISTIC BROWSER PRODUCT PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-5xl rounded-3xl border border-[#27272A] bg-[#111113] shadow-2xl overflow-hidden text-left relative"
        >
          {/* Top Browser Bar */}
          <div className="bg-[#09090B] border-b border-[#27272A] px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono text-[#A1A1AA]">director.ai / app</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>AI MODELS READY</span>
            </div>
          </div>

          {/* Inside Split Grid: Left Input Form / Right Code Editor Output */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Input Form */}
            <div className="md:col-span-5 bg-[#111113] p-6 border-b md:border-b-0 md:border-r border-[#27272A] space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#A78BFA]">
                Input Configuration
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1.5 font-medium">Product Name</label>
                  <div className="bg-[#09090B] border border-[#27272A] text-xs text-[#FAFAFA] px-3.5 py-2.5 rounded-xl font-mono">
                    GlowUp Skincare Serum
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1.5 font-medium">Target Audience</label>
                  <div className="bg-[#09090B] border border-[#27272A] text-xs text-[#FAFAFA] px-3.5 py-2.5 rounded-xl font-mono">
                    Young women (18-30)
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1.5 font-medium">Product URL (Optional)</label>
                  <div className="bg-[#09090B] border border-[#27272A] text-xs text-[#A1A1AA]/60 px-3.5 py-2.5 rounded-xl font-mono truncate">
                    https://glowupskincare.com/serum
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/generate')}
                className="w-full py-3 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-xs font-semibold rounded-xl shadow-md shadow-[#8B5CF6]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Generate Master Prompt</span>
              </button>
            </div>

            {/* Right Generated Master Prompt (Code Editor Appearance) */}
            <div className="md:col-span-7 bg-[#09090B] p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272A]">
                <div className="text-xs font-mono font-bold text-[#8B5CF6] flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>MASTER_PROMPT.txt</span>
                </div>
                <button
                  onClick={() => onNavigate('/generate')}
                  className="px-3 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </button>
              </div>

              {/* Code Editor Body with Syntax Highlighting */}
              <div className="font-mono text-xs text-zinc-300 space-y-2 leading-relaxed bg-[#111113] p-4 rounded-xl border border-[#27272A] max-h-[300px] overflow-y-auto">
                <div className="text-[#8B5CF6] font-bold">[CREATIVE STRATEGY]</div>
                <div className="text-zinc-400 pl-2">
                  • Goal: High-Converting E-Commerce UGC Ad <br />
                  • Audience: Young women (18-30) dealing with dull skin <br />
                  • Angle: Unfiltered morning skincare struggle to instant radiant glow
                </div>

                <div className="text-[#22C55E] font-bold pt-1">[VIRAL HOOK (0-2s)]</div>
                <div className="text-zinc-300 pl-2">
                  "Stop doing this if you want to fix dull skin once and for all..."
                </div>

                <div className="text-[#8B5CF6] font-bold pt-1">[CAMERA & LIGHTING]</div>
                <div className="text-zinc-400 pl-2">
                  • 24mm wide selfie lens, 85mm f/1.8 macro texture close-up <br />
                  • Soft 5600K warm morning sunlight key light
                </div>

                <div className="text-[#22C55E] font-bold pt-1">[CALL TO ACTION (8-10s)]</div>
                <div className="text-zinc-300 pl-2">
                  "Tap below right now to get GlowUp Serum before stock sells out!"
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. SUPPORTED AI PLATFORMS */}
      <section className="py-14 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#27272A]">
        <div className="text-center mb-8">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#A1A1AA] font-semibold">
            Optimized Master Prompts Compatible With
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 max-w-5xl mx-auto">
          {[
            { name: 'Google Veo', tag: 'Cinematic' },
            { name: 'Google Flow', tag: 'Interactive' },
            { name: 'Kling AI', tag: 'Hyper-Realism' },
            { name: 'Runway', tag: 'Gen-3 Alpha' },
            { name: 'Pika', tag: 'Animation' },
            { name: 'Hailuo', tag: 'Minimax' },
            { name: 'Luma', tag: 'Dream Machine' },
          ].map((platform) => (
            <motion.div
              key={platform.name}
              whileHover={{ y: -4, borderColor: '#8B5CF6' }}
              transition={{ duration: 0.2 }}
              className="bg-[#111113] border border-[#27272A] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-default transition-all shadow-sm hover:shadow-[#8B5CF6]/15 group"
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
