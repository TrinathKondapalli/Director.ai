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
  Terminal,
  Star,
  LayoutTemplate,
  Target,
  Code,
  Play,
  MessageSquare,
  ShoppingBag
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
    <div className="w-full bg-[#09090B] text-white selection:bg-[#8B5CF6]/30 overflow-hidden relative">
      {/* 1. HERO SECTION WRAPPER (Edge-to-edge) */}
      <div className="relative w-full overflow-hidden">
        {/* Background Image from user */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img 
            src="/HEROBG.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
        </div>

        {/* HERO CONTENT */}
        <section className="relative pt-12 sm:pt-16 pb-24 px-4 sm:px-6 max-w-6xl mx-auto text-center flex flex-col items-center z-10">
          <div className="relative flex flex-col items-center w-full">

        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#27272A] bg-[#111113]/50 backdrop-blur-sm text-[#A78BFA] text-[11px] font-semibold tracking-wide"
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
          <span className="text-[#A78BFA]">
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8"
        >
          <button
            onClick={() => onNavigate('/generate')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-[16px] font-semibold font-inter rounded-full transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current text-white" />
            <span>Generate Master Prompt</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => onNavigate('/ideas')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#09090B]/50 hover:bg-[#111113] backdrop-blur-sm text-[#A1A1AA] hover:text-white text-[16px] font-medium font-inter rounded-full border border-[#27272A] transition-colors cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Lightbulb className="w-4 h-4 text-[#A78BFA]" />
            <span>See Trending Concepts</span>
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img src="https://i.pravatar.cc/100?img=1" className="w-8 h-8 rounded-full border-2 border-[#09090B] relative z-40" alt="Creator" />
              <img src="https://i.pravatar.cc/100?img=2" className="w-8 h-8 rounded-full border-2 border-[#09090B] relative z-30" alt="Creator" />
              <img src="https://i.pravatar.cc/100?img=3" className="w-8 h-8 rounded-full border-2 border-[#09090B] relative z-20" alt="Creator" />
              <img src="https://i.pravatar.cc/100?img=4" className="w-8 h-8 rounded-full border-2 border-[#09090B] relative z-10" alt="Creator" />
            </div>
            <span className="text-[#A1A1AA] text-sm font-medium">
              Loved by <strong className="text-[#FAFAFA]">10,000+</strong> creators
            </span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#27272A]"></div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <Star className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
              <Star className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
              <Star className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
              <Star className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
              <Star className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
            </div>
            <span className="text-[#A1A1AA] text-sm font-medium">4.9/5</span>
          </div>
        </motion.div>

        {/* TRUST INDICATORS (DIVIDED COLUMNS) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 w-full max-w-5xl mb-20 text-left"
        >
          <div className="flex items-center justify-center lg:justify-start gap-4 lg:border-r border-[#27272A]/80 lg:pr-6">
            <Zap className="w-8 h-8 text-[#A78BFA] shrink-0" />
            <div>
              <div className="font-sora text-[15px] md:text-[17px] font-bold text-[#E4E4E7]">10X Faster</div>
              <div className="font-inter text-[13px] md:text-[14px] text-[#71717A]">From idea to prompt</div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 lg:border-r border-[#27272A]/80 lg:px-6">
            <Film className="w-8 h-8 text-[#A78BFA] shrink-0" />
            <div>
              <div className="font-sora text-[15px] md:text-[17px] font-bold text-[#E4E4E7]">Production-Ready</div>
              <div className="font-inter text-[13px] md:text-[14px] text-[#71717A]">Made for AI models</div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 lg:border-r border-[#27272A]/80 lg:px-6">
            <Eye className="w-8 h-8 text-[#A78BFA] shrink-0" />
            <div>
              <div className="font-sora text-[15px] md:text-[17px] font-bold text-[#E4E4E7]">Strategy-Driven</div>
              <div className="font-inter text-[13px] md:text-[14px] text-[#71717A]">Hooks that convert</div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 lg:pl-6">
            <ShieldCheck className="w-8 h-8 text-[#A78BFA] shrink-0" />
            <div>
              <div className="font-sora text-[15px] md:text-[17px] font-bold text-[#E4E4E7]">Zero Storage</div>
              <div className="font-inter text-[13px] md:text-[14px] text-[#71717A]">Your ideas stay yours</div>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
      </div>

      {/* INFINITE MARQUEE PLATFORMS */}
      <section className="py-12 overflow-hidden bg-[#07090E]">
        <div className="text-center mb-10">
          <h3 className="font-sora text-[20px] sm:text-[24px] text-[#A1A1AA] font-semibold">
            Works with leading AI video generators
          </h3>
        </div>
        <div className="relative w-full overflow-hidden flex items-center py-4">
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
                    className="font-sora text-2xl sm:text-3xl md:text-4xl font-bold text-[#27272A] whitespace-nowrap tracking-tight leading-relaxed pb-2 transition-colors hover:text-[#3F3F46] cursor-default"
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
      <section id="how-it-works" className="py-32 px-4 sm:px-6 max-w-6xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-inter text-[12px] uppercase tracking-[0.2em] text-[#A78BFA] font-bold block mb-4">
            THE STREAMLINED WORKFLOW
          </span>
          <h2 className="font-sora text-[48px] md:text-[56px] font-bold text-white tracking-tight mb-4">
            How It Works
          </h2>
          <p className="font-inter text-[16px] md:text-[18px] text-[#A1A1AA] leading-relaxed">
            From product details to production-ready AI video.<br className="hidden md:block" />
            Four simple steps. Infinite possibilities.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {[
              {
                step: '01',
                title: 'Describe Product',
                desc: 'Enter your product name and who it is for. Optional URL. That is all.',
                icon: LayoutTemplate,
              },
              {
                step: '02',
                title: 'AI Strategy',
                desc: 'Director.ai formulates hook, lighting specs, timeline, and emotional triggers.',
                icon: Target,
              },
              {
                step: '03',
                title: 'Copy Master Prompt',
                desc: 'Get your single production-ready MASTER PROMPT with one click.',
                icon: Code,
              },
              {
                step: '04',
                title: 'Generate AI Video',
                desc: 'Paste directly into Veo, Kling, Runway, or Luma to produce your UGC ad.',
                icon: Play,
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative group">
                {/* Connecting Node on Line (only on desktop and not first/last if we want, or just between) */}
                {idx > 0 && (
                  <div className="hidden md:block absolute top-1/2 -left-[15px] w-[6px] h-[6px] bg-[#C084FC] rounded-full shadow-[0_0_12px_rgba(192,132,252,0.8)] -translate-y-1/2 z-20" />
                )}

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#09090B]/80 backdrop-blur-sm border border-[#27272A] group-hover:border-[#8B5CF6]/40 p-6 md:p-8 rounded-[24px] h-full sm:h-[400px] flex flex-col justify-between shadow-xl relative overflow-hidden transition-colors"
                >
                  {/* Subtle purple glow at bottom */}
                  <div className="absolute -bottom-12 -inset-x-10 h-32 bg-[#8B5CF6]/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Content */}
                  <div>
                    <span className="text-[28px] font-bold text-[#8B5CF6] font-sora block mb-8">
                      {item.step}
                    </span>
                    
                    {/* CSS Styled Glassmorphic Icon Approximation */}
                    <div className="flex justify-center mb-8">
                      <div className="relative w-24 h-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-transparent border border-[#8B5CF6]/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] backdrop-blur-md rotate-[-5deg] group-hover:rotate-0 transition-transform duration-300">
                        <item.icon className="w-10 h-10 text-[#C084FC] drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10">
                    <h3 className="font-sora text-[22px] font-bold text-[#FAFAFA] mb-3 leading-tight">{item.title}</h3>
                    <p className="font-inter text-[14px] text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info Pill */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-full bg-[#111113] border border-[#27272A]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A78BFA]" />
              <span className="font-inter text-[13px] text-[#E4E4E7]">
                Built for creators, marketers, and brands who move fast.
              </span>
            </div>
            <span className="hidden sm:inline text-[#27272A]">|</span>
            <span className="font-inter text-[13px] text-[#A1A1AA]">
              No prompt engineering. No guesswork.
            </span>
          </div>
        </div>
      </section>

      {/* 4. TRENDING UGC CONCEPTS PREVIEW */}
      <section className="py-32 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#09090B] border border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] text-[#E4E4E7] text-[12px] font-inter font-semibold uppercase tracking-wider mb-6">
              <span>Daily Creator Discovery</span>
            </div>
            <h2 className="font-sora text-[48px] md:text-[56px] font-bold text-white tracking-tight mb-4">
              Trending Concepts
            </h2>
            <p className="font-inter text-[#A1A1AA] text-[16px] md:text-[18px]">
              Fresh, high-performing UGC concepts trending right now.<br className="hidden md:block" />
              Use proven hooks. Create scroll-stopping ads.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/ideas')}
            className="px-6 py-3 bg-[#09090B] hover:bg-[#1C1C20] text-white text-sm font-semibold rounded-full border border-[#27272A] hover:border-[#8B5CF6]/50 transition-colors cursor-pointer flex items-center gap-2 self-start md:self-auto shadow-lg"
          >
            <span>View All Concepts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredConcepts.map((concept, idx) => (
            <motion.div
              key={concept.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#09090B]/80 backdrop-blur-sm border border-[#27272A] hover:border-[#8B5CF6]/40 p-6 rounded-[24px] flex flex-col justify-between shadow-2xl relative group overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111113] border border-[#27272A] text-[#A78BFA] text-[12px] font-inter font-medium shadow-sm">
                    <Layers className="w-3.5 h-3.5" />
                    {concept.nicheCategory}
                  </span>
                </div>

                {/* 3D Glassmorphic Image Placeholder */}
                <div className="relative w-full h-[180px] rounded-2xl mb-8 overflow-hidden bg-[#111113] border border-[#27272A] group-hover:border-[#8B5CF6]/30 transition-colors flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Abstract Glassmorphic Shape */}
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#8B5CF6]/30 to-[#C084FC]/10 backdrop-blur-md border border-[#8B5CF6]/40 shadow-[0_0_40px_rgba(139,92,246,0.3)] rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 blur-md absolute" />
                    <Sparkles className="w-10 h-10 text-[#C084FC] drop-shadow-lg relative z-10" />
                  </div>
                </div>

                <h3 className="font-sora text-[22px] font-bold text-[#FAFAFA] mb-3 leading-snug relative z-10">
                  {concept.conceptTitle}
                </h3>

                <p className="font-inter text-[14px] text-[#A1A1AA] leading-relaxed mb-8 relative z-10">
                  {concept.whyItWorks}
                </p>
              </div>

              <button
                onClick={() => {
                  onNavigate('/generate');
                }}
                className="w-full py-3.5 px-4 bg-[#09090B] hover:bg-[#111113] text-[#FAFAFA] hover:text-white text-sm font-semibold rounded-xl border border-[#27272A] group-hover:border-[#8B5CF6]/60 shadow-[0_0_10px_rgba(139,92,246,0)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all cursor-pointer flex items-center justify-center gap-2 relative z-10"
              >
                <span>Use Concept</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#8B5CF6]" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info Pill */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] border border-[#27272A] shadow-lg">
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span className="font-inter text-[13px] text-[#A1A1AA]">
              All concepts are <span className="text-[#8B5CF6] font-medium">data-backed</span> and updated daily based on performance across top platforms.
            </span>
          </div>
        </div>
      </section>

      {/* 5. WHY DIRECTOR.AI */}
      <section className="py-32 px-4 sm:px-6 relative overflow-hidden bg-[#09090B]">
        {/* Immersive Background Glows & Grid */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/15 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/15 blur-[120px] rounded-full" />
          
          {/* Subtle Dotted Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #FAFAFA 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
            {/* Overline with decorative element */}
            <div className="mb-8">
              <span className="font-inter text-[12px] uppercase tracking-[0.3em] text-[#A78BFA] font-bold block mb-4">
                BUILT FOR MODERN CREATORS & MARKETERS
              </span>
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-12 bg-gradient-to-l from-[#8B5CF6]/60 to-transparent" />
                <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#8B5CF6]/60 to-transparent" />
              </div>
            </div>

            <h2 className="font-sora text-[48px] md:text-[56px] font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-white">Why Creators Choose</span><br />
              <span className="text-[#8B5CF6]">Director.ai</span>
            </h2>
            <p className="font-inter text-[16px] md:text-[18px] text-[#A1A1AA] leading-relaxed max-w-lg mx-auto">
              Everything you need to create high-performing UGC ads, faster, smarter, and more securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Creative Strategy */}
            <div className="group relative bg-[#09090B] rounded-[24px] overflow-hidden p-10 h-full flex flex-col">
              {/* Gradient Border Wrap */}
              <div className="absolute inset-0 rounded-[24px] border border-[#27272A] group-hover:border-transparent transition-colors z-0" />
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#8B5CF6]/30 via-[#27272A]/50 to-[#27272A]/20 opacity-0 group-hover:opacity-100 p-[1px] -z-10 transition-opacity pointer-events-none">
                <div className="w-full h-full bg-[#09090B] rounded-[23px]" />
              </div>
              
              {/* Top Flare Light */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[1px] bg-gradient-to-r from-transparent via-[#C084FC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(192,132,252,1)]" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/15 to-[#8B5CF6]/5 border border-[#8B5CF6]/20 flex items-center justify-center text-[#C084FC] mb-8 shadow-[inset_0_0_12px_rgba(139,92,246,0.1)]">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-sora text-[26px] font-bold text-[#FAFAFA] mb-4">Creative Strategy</h3>
                <div className="h-[2px] w-8 bg-[#27272A] mb-6 group-hover:bg-[#8B5CF6]/50 transition-colors" />
                <p className="font-inter text-[15px] text-[#A1A1AA] leading-relaxed">
                  AI thinks like a veteran marketing director — injecting proven hooks, visual framing, and emotional triggers automatically.
                </p>
              </div>
            </div>

            {/* Card 2: Production Ready */}
            <div className="group relative bg-[#09090B] rounded-[24px] overflow-hidden p-10 h-full flex flex-col">
              <div className="absolute inset-0 rounded-[24px] border border-[#27272A] group-hover:border-transparent transition-colors z-0" />
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#8B5CF6]/30 via-[#27272A]/50 to-[#27272A]/20 opacity-0 group-hover:opacity-100 p-[1px] -z-10 transition-opacity pointer-events-none">
                <div className="w-full h-full bg-[#09090B] rounded-[23px]" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[1px] bg-gradient-to-r from-transparent via-[#C084FC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(192,132,252,1)]" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/15 to-[#8B5CF6]/5 border border-[#8B5CF6]/20 flex items-center justify-center text-[#C084FC] mb-8 shadow-[inset_0_0_12px_rgba(139,92,246,0.1)]">
                  <Film className="w-6 h-6" />
                </div>
                <h3 className="font-sora text-[26px] font-bold text-[#FAFAFA] mb-4">Production Ready</h3>
                <div className="h-[2px] w-8 bg-[#27272A] mb-6 group-hover:bg-[#8B5CF6]/50 transition-colors" />
                <p className="font-inter text-[15px] text-[#A1A1AA] leading-relaxed">
                  Formatted specifically for next-gen models. Paste directly into Google Veo, Kling, Runway, or Luma without tweaking camera terms.
                </p>
              </div>
            </div>

            {/* Card 3: Privacy First (Green glow) */}
            <div className="group relative bg-[#09090B] rounded-[24px] overflow-hidden p-10 h-full flex flex-col">
              <div className="absolute inset-0 rounded-[24px] border border-[#27272A] group-hover:border-transparent transition-colors z-0" />
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#22C55E]/30 via-[#27272A]/50 to-[#27272A]/20 opacity-0 group-hover:opacity-100 p-[1px] -z-10 transition-opacity pointer-events-none">
                <div className="w-full h-full bg-[#09090B] rounded-[23px]" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[1px] bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(74,222,128,1)]" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22C55E]/15 to-[#22C55E]/5 border border-[#22C55E]/20 flex items-center justify-center text-[#4ADE80] mb-8 shadow-[inset_0_0_12px_rgba(34,197,94,0.1)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-sora text-[26px] font-bold text-[#FAFAFA] mb-4">Privacy First</h3>
                <div className="h-[2px] w-8 bg-[#27272A] mb-6 group-hover:bg-[#22C55E]/50 transition-colors" />
                <p className="font-inter text-[15px] text-[#A1A1AA] leading-relaxed">
                  Your prompts, products, and campaign strategies are never stored in databases. Refresh the page and your session data is wiped clean.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRIVACY SECTION */}
      <section className="py-32 px-4 sm:px-6 bg-[#09090B] relative z-10">
        <div className="max-w-6xl mx-auto bg-[#111113] border border-[#27272A] rounded-[32px] p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#4ADE80] text-[13px] font-inter font-medium mb-8 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Data Retention</span>
          </div>

          <h2 className="font-sora text-[40px] md:text-[56px] font-bold text-white tracking-tight mb-6 leading-tight">
            Your Ideas Stay Yours.
          </h2>

          <p className="font-inter text-[16px] sm:text-[18px] text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed mb-14">
            Director.ai never stores prompts, products, or generated content. Everything exists only while you're using the application. Once you refresh or leave the page, it's gone forever.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-4xl mx-auto text-left">
            <div className="bg-[#09090B] border border-[#27272A] p-6 rounded-[24px] hover:border-[#22C55E]/30 transition-colors">
              <Lock className="w-5 h-5 text-[#4ADE80] mb-4" />
              <div className="text-[15px] font-bold text-[#FAFAFA] mb-1.5">No Database</div>
              <div className="text-[13px] text-[#A1A1AA]">Zero persistent records</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-6 rounded-[24px] hover:border-[#22C55E]/30 transition-colors">
              <Lock className="w-5 h-5 text-[#4ADE80] mb-4" />
              <div className="text-[15px] font-bold text-[#FAFAFA] mb-1.5">No History</div>
              <div className="text-[13px] text-[#A1A1AA]">No prompts saved</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-6 rounded-[24px] hover:border-[#22C55E]/30 transition-colors">
              <Lock className="w-5 h-5 text-[#4ADE80] mb-4" />
              <div className="text-[15px] font-bold text-[#FAFAFA] mb-1.5">No Cookies</div>
              <div className="text-[13px] text-[#A1A1AA]">Clean browser session</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-6 rounded-[24px] hover:border-[#22C55E]/30 transition-colors">
              <Lock className="w-5 h-5 text-[#4ADE80] mb-4" />
              <div className="text-[15px] font-bold text-[#FAFAFA] mb-1.5">Memory Only</div>
              <div className="text-[13px] text-[#A1A1AA]">Clears on refresh</div>
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
      <section className="py-32 px-4 sm:px-6 relative overflow-hidden bg-[#09090B]">
        {/* Immersive Background Glows & Grid */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/15 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/15 blur-[120px] rounded-full" />
          
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #FAFAFA 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="font-inter text-[12px] uppercase tracking-[0.3em] text-[#A78BFA] font-bold block mb-4">
              GOT QUESTIONS?
            </span>
            <h2 className="font-sora text-[40px] md:text-[48px] font-bold text-[#FAFAFA] tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="font-inter text-[16px] text-[#A1A1AA] leading-relaxed max-w-lg mx-auto mb-8">
              Everything you need to know about Director.ai and how it helps you create better UGC ads.
            </p>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-gradient-to-l from-[#8B5CF6]/60 to-transparent" />
              <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#8B5CF6]/60 to-transparent" />
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const Icon = [MessageSquare, Sparkles, Lock, ShoppingBag, Terminal][idx] || MessageSquare;
              return (
                <div
                  key={idx}
                  className="bg-[#09090B] border border-[#8B5CF6]/20 rounded-2xl overflow-hidden transition-all hover:border-[#8B5CF6]/40 shadow-lg"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0 group-hover:bg-[#8B5CF6]/10 transition-colors">
                        <Icon className="w-4 h-4 text-[#A78BFA]" />
                      </div>
                      <span className="font-sora font-semibold text-[16px] sm:text-[17px] text-[#FAFAFA] group-hover:text-[#A78BFA] transition-colors">
                        {faq.q}
                      </span>
                    </div>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-[#8B5CF6] shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#A1A1AA] shrink-0 ml-4 group-hover:text-[#8B5CF6] transition-colors" />
                    )}
                  </button>

                  {openFaq === idx && (
                    <div className="px-6 pb-6 pl-[84px] font-inter text-[15px] text-[#A1A1AA] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
