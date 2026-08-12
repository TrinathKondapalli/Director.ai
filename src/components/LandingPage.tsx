import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Lightbulb,
  Check,
  Zap,
  Target,
  Code,
  Play,
  LayoutTemplate,
  Terminal,
  PenTool,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  User,
  Users,
  Briefcase
} from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { BackgroundGlow } from './BackgroundGlow';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What is Director.ai?',
      a: 'Director.ai is an AI-powered creative studio that transforms ideas and briefs into structured creative concepts, scripts, social content, and production-ready AI prompts.',
    },
    {
      q: 'Does Director.ai generate the final images or videos?',
      a: 'No. Director.ai currently generates the creative direction and prompts. You can take those prompts into external AI image or video generation tools to create the final media.',
    },
    {
      q: 'Do I need to know prompt engineering?',
      a: 'No. That is one of the main problems Director.ai is designed to solve.',
    },
    {
      q: 'What is AI UGC Studio?',
      a: 'AI UGC Studio generates structured UGC advertisement blueprints, including the concept, story, 10-second storyboard, captions, and detailed video-generation prompt.',
    },
    {
      q: 'What is AI Design Publisher?',
      a: 'AI Design Publisher creates a structured 100-day LinkedIn content strategy from 100 predefined UX/UI concepts, including educational content, captions, and consistent TZINR-branded visual prompts.',
    },
    {
      q: 'What is My Journal?',
      a: 'My Journal turns a single written or spoken thought into a stylized visual using a predefined journal design system.',
    },
    {
      q: 'Are my projects stored?',
      a: 'Currently, Director.ai is frontend-only and uses temporary in-memory project data. Projects are erased when the application is refreshed.',
    },
    {
      q: 'Can I use the generated prompts in other AI tools?',
      a: 'Yes. The prompts are designed to be taken into external AI generation platforms.',
    },
  ];

  return (
    <div className="w-full bg-[#09090B] text-white selection:bg-[var(--color-brand-violet)]/30 overflow-hidden relative">
      <BackgroundGlow />
      
      {/* Ambient Global Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(91,75,255,0.08),transparent_60%)]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.05),transparent_60%)]"></div>
      </div>
      
      {/* 01 - HERO */}
      <div className="relative w-full overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img 
            src="/HEROBG.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(102,21,246,0.15),transparent_50%)]"></div>
          <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-violet)]/20 to-transparent"></div>
          {/* Seamless fade to page background */}
          <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent"></div>
        </div>

        <section className="relative pt-24 pb-24 px-4 sm:px-6 max-w-6xl mx-auto text-center flex flex-col items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-brand-violet)]/10 rounded-full border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(102,21,246,0.3)]"
          >
            AI CREATIVE STUDIO
          </motion.div>

          <h1 className="font-sora text-[48px] sm:text-[64px] md:text-[80px] font-extrabold tracking-[-0.04em] text-[#FAFAFA] max-w-5xl leading-[0.95] mb-8">
            <AnimatedText 
              text="Turn Your Ideas Into" 
              className="justify-center"
            />
            <br className="hidden md:block" />
            <AnimatedText 
              text="Production-Ready Creative." 
              className="text-[var(--color-brand-violet)] justify-center"
              delayOffset={0.2}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-inter text-[18px] sm:text-[20px] text-[#A1A1AA] max-w-[800px] leading-relaxed mb-12 font-normal"
          >
            Director.ai acts as your AI Art Director - transforming raw ideas into strategic content concepts, scripts, social posts, and ready-to-use generation prompts.<br className="hidden md:block"/><br className="hidden md:block"/>
            <span className="text-white">No complex prompt engineering. No starting from a blank page.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={() => {
                document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary w-full sm:w-auto px-8 py-4 text-[16px] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-current text-white" />
              <span>Explore Director.ai</span>
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-[16px] font-semibold font-sora rounded-full border border-white/20 hover:border-white/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>See How It Works</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-mono text-[12px] text-[#71717A] tracking-wider uppercase"
          >
            Built for creators, founders, designers, and marketers.
          </motion.div>
        </section>
      </div>

      {/* 02 - WHAT DIRECTOR.AI DOES */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand-violet)] font-bold block mb-4">
              YOUR AI ART DIRECTOR
            </span>
            <h2 className="font-sora text-[40px] md:text-[56px] font-bold text-white tracking-tight mb-6 leading-tight">
              From a Simple Idea to a Complete Creative Direction.
            </h2>
            <p className="font-inter text-[18px] text-[#A1A1AA] leading-relaxed">
              You provide the idea. <br className="hidden sm:block"/>
              Director.ai handles the creative direction - structuring the concept, developing the content, and generating the detailed prompts required to produce the final creative in your preferred AI tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-3xl p-8 hover:border-[var(--color-brand-violet)]/50 transition-colors">
              <div className="w-14 h-14 bg-[var(--color-brand-violet)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-brand-violet)]/20">
                <Target className="w-7 h-7 text-[var(--color-brand-violet)]" />
              </div>
              <h3 className="text-2xl font-sora font-bold text-white mb-4">STRATEGY</h3>
              <p className="text-[#A1A1AA] leading-relaxed">Turn an idea into a clear creative concept and content direction.</p>
            </div>
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-3xl p-8 hover:border-[var(--color-brand-violet)]/50 transition-colors">
              <div className="w-14 h-14 bg-[var(--color-brand-violet)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-brand-violet)]/20">
                <PenTool className="w-7 h-7 text-[var(--color-brand-violet)]" />
              </div>
              <h3 className="text-2xl font-sora font-bold text-white mb-4">CONTENT</h3>
              <p className="text-[#A1A1AA] leading-relaxed">Generate scripts, stories, captions, educational posts, and publishing-ready copy.</p>
            </div>
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-3xl p-8 hover:border-[var(--color-brand-violet)]/50 transition-colors">
              <div className="w-14 h-14 bg-[var(--color-brand-violet)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-brand-violet)]/20">
                <Code className="w-7 h-7 text-[var(--color-brand-violet)]" />
              </div>
              <h3 className="text-2xl font-sora font-bold text-white mb-4">PROMPTS</h3>
              <p className="text-[#A1A1AA] leading-relaxed">Generate detailed production prompts designed for external AI image and video generation tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 - HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand-violet)] font-bold block mb-4">
              THE DIRECTOR.AI WORKFLOW
            </span>
            <h2 className="font-sora text-[40px] md:text-[56px] font-bold text-white tracking-tight mb-6 leading-tight">
              You Bring the Idea. Director.ai Directs the Creative.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[40px] left-10 right-10 h-[1px] bg-[var(--color-border-divider)] z-0" />
            
            <div className="relative z-10 pt-8 md:pt-0">
              <div className="w-20 h-20 bg-[var(--color-bg-card)] border border-[var(--color-brand-violet)]/50 rounded-full flex items-center justify-center text-2xl font-sora font-bold text-[var(--color-brand-violet)] mb-6 mx-auto md:mx-0 shadow-[0_0_20px_rgba(102,21,246,0.15)]">
                01
              </div>
              <h3 className="text-xl font-sora font-bold text-white mb-3 text-center md:text-left">Start With an Idea</h3>
              <p className="text-[#A1A1AA] text-center md:text-left text-sm leading-relaxed">Choose a curated concept or provide your own brief.</p>
            </div>
            <div className="relative z-10 pt-8 md:pt-0">
              <div className="w-20 h-20 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-full flex items-center justify-center text-2xl font-sora font-bold text-white mb-6 mx-auto md:mx-0">
                02
              </div>
              <h3 className="text-xl font-sora font-bold text-white mb-3 text-center md:text-left">Director.ai Builds the Direction</h3>
              <p className="text-[#A1A1AA] text-center md:text-left text-sm leading-relaxed">The system develops the strategy, structure, messaging, and creative approach.</p>
            </div>
            <div className="relative z-10 pt-8 md:pt-0">
              <div className="w-20 h-20 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-full flex items-center justify-center text-2xl font-sora font-bold text-white mb-6 mx-auto md:mx-0">
                03
              </div>
              <h3 className="text-xl font-sora font-bold text-white mb-3 text-center md:text-left">Get Production-Ready Outputs</h3>
              <p className="text-[#A1A1AA] text-center md:text-left text-sm leading-relaxed">Receive scripts, captions, visual direction, and detailed AI generation prompts.</p>
            </div>
            <div className="relative z-10 pt-8 md:pt-0">
              <div className="w-20 h-20 bg-[var(--color-bg-card)] border border-[var(--color-brand-magenta)]/50 rounded-full flex items-center justify-center text-2xl font-sora font-bold text-[var(--color-brand-magenta)] mb-6 mx-auto md:mx-0 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
                04
              </div>
              <h3 className="text-xl font-sora font-bold text-white mb-3 text-center md:text-left">Create With Your AI Tools</h3>
              <p className="text-[#A1A1AA] text-center md:text-left text-sm leading-relaxed">Take the generated prompts into your preferred image or video generation platform and produce the final media.</p>
            </div>
          </div>

          <div className="mt-16 bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 text-center max-w-3xl mx-auto">
            <p className="text-[#E4E4E7] font-medium">
              <strong className="text-[var(--color-brand-violet)]">Note:</strong> Director.ai generates the creative direction and prompts - it does not render the final image or video itself.
            </p>
          </div>
        </div>
      </section>

      {/* 04 - THREE CREATIVE MODULES */}
      <section id="modules" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand-violet)] font-bold block mb-4">
              THE CREATIVE SUITE
            </span>
            <h2 className="font-sora text-[40px] md:text-[56px] font-bold text-white tracking-tight mb-6 leading-tight">
              Three Tools. One Creative Direction.
            </h2>
            <p className="font-inter text-[18px] text-[#A1A1AA] leading-relaxed">
              Director.ai is built as a growing creative workspace, with each module designed for a different type of content creation.
            </p>
          </div>

          <div className="space-y-8">
            {/* MODULE 01 */}
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[32px] overflow-hidden flex flex-col md:flex-row group hover:border-[var(--color-brand-violet)]/50 transition-colors">
              <div className="p-10 md:p-14 md:w-1/2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-brand-violet)]/15 rounded-full border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase w-max mb-6">
                  <Play className="w-3.5 h-3.5" />
                  <span>Module 01</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">AI UGC Studio</h3>
                <h4 className="text-xl font-sora text-[#E4E4E7] mb-6">Create UGC Ads Without Writing Complex Prompts.</h4>
                <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                  Generate structured, short-form UGC ad concepts designed for modern AI video generation. Choose from a curated library of <strong className="text-white">390 UGC concepts</strong> or start with a custom brief.
                </p>
                <div className="mb-8 space-y-2">
                  <p className="text-sm text-[#A1A1AA]"><strong className="text-[var(--color-brand-violet)]">Generates:</strong> UGC concept, Creator profile, Hook, Pain point, Product moment, Result, CTA, 10-second storyboard, Platform-specific captions, Detailed video-generation prompt.</p>
                </div>
                <div className="mt-auto">
                  <p className="text-[#E4E4E7] font-medium mb-6">From idea to a complete UGC ad blueprint in minutes.</p>
                  <button onClick={() => onNavigate('/ugc-studio')} className="btn-primary px-8 py-3.5 flex items-center gap-2 group cursor-pointer">
                    Explore AI UGC Studio <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-[var(--color-border-primary)] relative p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(102,21,246,0.8),transparent_70%)]"></div>
                <div className="relative z-10 w-full max-w-sm space-y-4">
                  <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)] shadow-2xl">
                    <div className="text-[10px] text-[var(--color-brand-violet)] font-mono uppercase mb-2">Storyboard / Scene 01</div>
                    <div className="text-sm text-white font-medium mb-2">Close-up of stressed professional.</div>
                    <div className="text-xs text-[#A1A1AA] font-mono bg-[#000] p-2 rounded border border-[#27272A]">[Cinematic prompt generated...]</div>
                  </div>
                  <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)] shadow-2xl ml-8">
                    <div className="text-[10px] text-[var(--color-brand-magenta)] font-mono uppercase mb-2">Storyboard / Scene 02</div>
                    <div className="text-sm text-white font-medium mb-2">Product reveal shot.</div>
                    <div className="text-xs text-[#A1A1AA] font-mono bg-[#000] p-2 rounded border border-[#27272A]">[Cinematic prompt generated...]</div>
                  </div>
                </div>
              </div>
            </div>

            {/* MODULE 02 */}
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[32px] overflow-hidden flex flex-col md:flex-row-reverse group hover:border-[var(--color-brand-violet)]/50 transition-colors">
              <div className="p-10 md:p-14 md:w-1/2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-brand-violet)]/15 rounded-full border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase w-max mb-6">
                  <LayoutTemplate className="w-3.5 h-3.5" />
                  <span>Module 02</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">AI Design Publisher</h3>
                <h4 className="text-xl font-sora text-[#E4E4E7] mb-6">Build a Consistent 100-Day Design Content System.</h4>
                <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                  Turn a curated library of <strong className="text-white">100 UX/UI concepts</strong> into a consistent educational content strategy. Every visual prompt follows the defined <strong className="text-[var(--color-brand-violet)]">TZINR editorial design system</strong>, maintaining a consistent visual language across the content series.
                </p>
                <div className="mb-8 space-y-2">
                  <p className="text-sm text-[#A1A1AA]"><strong className="text-[var(--color-brand-violet)]">Generates:</strong> Educational content, Social media caption, Visual concept, Detailed image-generation prompt, SEO keywords, Relevant hashtags.</p>
                </div>
                <div className="mt-auto">
                  <p className="text-[#E4E4E7] font-medium mb-6">One design language. 100 concepts. A consistent publishing system.</p>
                  <button onClick={() => onNavigate('/design-publisher')} className="btn-primary px-8 py-3.5 flex items-center gap-2 group cursor-pointer">
                    Explore AI Design Publisher <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 border-t md:border-t-0 md:border-r border-[var(--color-border-primary)] relative p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)]"></div>
                <div className="relative z-10 w-[240px] aspect-[4/5] bg-[#F5F3EF] rounded shadow-2xl p-6 flex flex-col">
                  <div className="text-[#0A0A14] font-sora font-bold text-[8px] mb-4 uppercase">TZINR</div>
                  <div className="text-[#0A0A14] font-sora font-bold text-2xl leading-tight mb-2 uppercase">Jakob's<br/>Law</div>
                  <div className="text-[#1557FF] font-mono text-[8px] mb-8">FAMILIARITY OVER NOVELTY.</div>
                  <div className="mt-auto border-t border-[#0A0A14]/20 pt-4 flex justify-between items-end">
                     <div className="text-[#0A0A14] font-sora text-[6px]">UX PRINCIPLES 003</div>
                     <div className="text-[#0A0A14] font-sora text-[6px]">03 / 100</div>
                  </div>
                </div>
              </div>
            </div>

            {/* MODULE 03 */}
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[32px] overflow-hidden flex flex-col md:flex-row group hover:border-[var(--color-brand-violet)]/50 transition-colors">
              <div className="p-10 md:p-14 md:w-1/2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-brand-violet)]/15 rounded-full border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase w-max mb-6">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Module 03</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">My Journal</h3>
                <h4 className="text-xl font-sora text-[#E4E4E7] mb-6">Turn a Thought Into a Designed Visual.</h4>
                <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                  My Journal is the simplest way to transform a thought, idea, observation, or reflection into a branded visual. Type or speak your thought. Director.ai preserves your exact idea and places it into a predefined sticky-note journal system.
                </p>
                <div className="mb-8 space-y-2">
                  <p className="text-sm text-[#A1A1AA]"><strong className="text-[var(--color-brand-violet)]">Generates:</strong> Your original thought, Stylized journal composition, Ready-to-use image prompt with a dynamic sticky-note color.</p>
                </div>
                <div className="mt-auto">
                  <p className="text-[#E4E4E7] font-medium mb-6">Write the thought. Director.ai handles the visual direction.</p>
                  <button onClick={() => onNavigate('/my-journal')} className="btn-primary px-8 py-3.5 flex items-center gap-2 group cursor-pointer">
                    Open My Journal <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-[var(--color-border-primary)] relative p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(251,207,232,0.8),transparent_70%)]"></div>
                <div className="relative z-10 w-[240px] aspect-square bg-[#F5F3EF] rounded shadow-2xl p-6 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute top-4 right-4 text-[#000] opacity-20">★</div>
                   <div className="absolute bottom-6 left-6 text-[#000] opacity-20">↺</div>
                   <div className="w-[180px] h-[160px] bg-[#fdf2f8] shadow-[0_10px_20px_rgba(0,0,0,0.1)] -rotate-3 p-4 flex items-center justify-center text-center">
                     <span className="font-sora text-sm font-bold text-[#333] transform rotate-1">"Consistency beats motivation."</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 - WHY DIRECTOR.AI */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand-violet)] font-bold block mb-4">
              WHY CREATORS USE IT
            </span>
            <h2 className="font-sora text-[40px] md:text-[56px] font-bold text-white tracking-tight mb-6 leading-tight">
              Stop Writing Prompts. Start Directing Creative.
            </h2>
            <p className="font-inter text-[18px] text-[#A1A1AA] leading-relaxed">
              Generative AI is powerful, but getting consistent results often requires knowing exactly how to communicate with it. Director.ai turns that complexity into a structured creative workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Creative Strategy', desc: 'Start with the idea, not the prompt.', icon: Target },
              { title: 'Production-Ready Direction', desc: 'Get structured outputs designed to move directly into your creative workflow.', icon: Layers },
              { title: 'Consistent Creative Systems', desc: 'Build repeatable content around defined concepts, formats, and visual identities.', icon: LayoutTemplate },
              { title: 'Tool-Agnostic', desc: 'Use the prompts with the external AI image and video tools that fit your workflow.', icon: Cpu },
              { title: 'Fast by Design', desc: 'Move from a blank page to a structured creative direction without spending hours prompt engineering.', icon: Zap },
              { title: 'Privacy by Default', desc: 'Director.ai currently operates as a frontend-only application with temporary in-memory project data. Projects are erased when the application is refreshed.', icon: ShieldCheck }
            ].map((item, idx) => (
              <div key={idx} className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-2xl p-8 hover:bg-[var(--color-bg-surface)] transition-colors">
                <item.icon className="w-8 h-8 text-[var(--color-brand-violet)] mb-6" />
                <h3 className="text-lg font-sora font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 - THE PROMPT PROBLEM */}
      <section className="py-32 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'var(--gradient-brand)' }}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-mono text-[12px] uppercase tracking-widest text-white/80 font-bold block mb-4">
            THE OLD WAY
          </span>
          <h2 className="font-sora text-[40px] md:text-[56px] font-bold text-white tracking-tight mb-8 leading-tight">
            Stop Spending Your Creative Energy Engineering Prompts.
          </h2>
          <p className="font-inter text-[18px] md:text-[22px] text-white/90 leading-relaxed font-medium mb-10">
            You shouldn't need to become a prompt engineer just to create a good advertisement, social post, or visual.
          </p>
          <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-left max-w-2xl mx-auto">
             <div className="mb-6">
                <span className="text-white/60 text-sm font-mono uppercase block mb-2">Instead of asking:</span>
                <p className="text-xl font-sora text-white italic">"How do I describe this to an AI?"</p>
             </div>
             <div className="border-t border-white/10 pt-6">
                <span className="text-white/60 text-sm font-mono uppercase block mb-2">Start with:</span>
                <p className="text-2xl font-sora text-white font-bold">"What do I want to create?"</p>
             </div>
          </div>
          <p className="font-inter text-[16px] text-white/80 mt-10">
            Director.ai handles the translation from creative intent into structured AI-ready direction.
          </p>
        </div>
      </section>

      {/* 07 - WHAT YOU GET */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand-violet)] font-bold block mb-4">
              PRODUCTION-READY OUTPUTS
            </span>
            <h2 className="font-sora text-[40px] md:text-[56px] font-bold text-white tracking-tight leading-tight">
              Everything You Need Before You Hit Generate.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Creative Concept', desc: "A clear direction for what you're creating and why.", icon: Lightbulb },
              { title: 'Script & Story', desc: 'Structured narratives designed around the intended format.', icon: FileTextIcon },
              { title: 'Social Content', desc: 'Platform-specific descriptions and publishing copy.', icon: MessageSquare },
              { title: 'Visual Direction', desc: 'A clear description of the visual language and composition.', icon: ImageIcon },
              { title: 'Generation Prompts', desc: 'Detailed prompts ready to take into external AI generation tools.', icon: Terminal },
              { title: 'SEO & Discovery', desc: 'Relevant keywords and hashtags where applicable.', icon: Target }
            ].map((item, idx) => (
              <div key={idx} className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-sora text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 - IMPORTANT PRODUCT POSITIONING */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand-violet)] font-bold block mb-4">
            HOW DIRECTOR.AI WORKS
          </span>
          <h2 className="font-sora text-[40px] md:text-[48px] font-bold text-white tracking-tight mb-8 leading-tight">
            Director.ai Directs. Your AI Tools Render.
          </h2>
          <p className="font-inter text-[18px] text-[#A1A1AA] leading-relaxed mb-8">
            Director.ai is a creative direction and prompt-generation system. It does not replace the image or video generation platforms you already use.<br/><br/>
            Instead, it prepares the creative thinking, structure, and detailed instructions so you can take the result into your preferred AI tools and produce the final media.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
            <Check className="w-5 h-5" />
            <span className="font-medium">Think of Director.ai as the Art Director between your idea and your generation tools.</span>
          </div>
        </div>
      </section>

      {/* 09 - WHO IT'S FOR */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand-violet)] font-bold block mb-4">
              BUILT FOR
            </span>
            <h2 className="font-sora text-[40px] font-bold text-white tracking-tight">For People Who Create.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-2xl p-8 text-center hover:border-[var(--color-brand-violet)]/50 transition-colors">
               <User className="w-8 h-8 text-white mx-auto mb-4" />
               <h3 className="font-sora font-bold text-xl text-white mb-2">Creator</h3>
               <p className="text-sm text-[#A1A1AA]">Turn ideas into repeatable content without starting from scratch.</p>
            </div>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-2xl p-8 text-center hover:border-[var(--color-brand-violet)]/50 transition-colors">
               <Briefcase className="w-8 h-8 text-white mx-auto mb-4" />
               <h3 className="font-sora font-bold text-xl text-white mb-2">Founder</h3>
               <p className="text-sm text-[#A1A1AA]">Create marketing concepts and UGC ad directions faster.</p>
            </div>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-2xl p-8 text-center hover:border-[var(--color-brand-violet)]/50 transition-colors">
               <PenTool className="w-8 h-8 text-white mx-auto mb-4" />
               <h3 className="font-sora font-bold text-xl text-white mb-2">Designer</h3>
               <p className="text-sm text-[#A1A1AA]">Build consistent educational design content around your expertise.</p>
            </div>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-2xl p-8 text-center hover:border-[var(--color-brand-violet)]/50 transition-colors">
               <Users className="w-8 h-8 text-white mx-auto mb-4" />
               <h3 className="font-sora font-bold text-xl text-white mb-2">Marketer</h3>
               <p className="text-sm text-[#A1A1AA]">Develop structured creative concepts and platform-ready content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 - FAQ */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-sora text-[32px] font-bold text-white tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-2xl overflow-hidden transition-colors hover:border-[var(--color-border-hover)]">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-sora text-[15px] font-semibold text-white pr-8">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-[14px] font-inter text-[#A1A1AA] leading-relaxed border-t border-transparent">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 - FINAL CTA */}
      <section className="py-32 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(102,21,246,0.15),transparent_60%)]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--color-brand-violet)] font-bold block mb-4">
            YOUR IDEA IS THE STARTING POINT
          </span>
          <h2 className="font-sora text-[48px] md:text-[64px] font-bold text-white tracking-tight mb-8 leading-tight">
            You Bring the Idea.<br/>We'll Direct the Creative.
          </h2>
          <p className="font-inter text-[18px] text-[#A1A1AA] leading-relaxed mb-12 max-w-2xl mx-auto">
            From UGC advertisements to educational design content and personal visual journaling, Director.ai turns creative intent into structured, production-ready direction.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/ugc-studio')}
              className="btn-primary w-full sm:w-auto px-10 py-4 text-[16px] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Start Creating</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-10 py-4 bg-transparent text-white border border-[var(--color-border-primary)] hover:border-white font-sora font-semibold text-[16px] rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore the Creative Suite
            </button>
          </div>
          <div className="mt-16 font-sora text-sm text-[#71717A] tracking-wider uppercase">
            Director.ai - Your AI Art Director.
          </div>
        </div>
      </section>
    </div>
  );
};

// Lucide React doesn't have a FileTextIcon, using a functional stand-in for the icon
const FileTextIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
