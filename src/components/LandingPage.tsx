import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Lightbulb,
} from 'lucide-react';
import { DirectorLogoBanner } from './DirectorLogo';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#09090B] text-white selection:bg-[#8B5CF6]/30">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-[#8B5CF6]/15 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* Director.ai Official Logo Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <DirectorLogoBanner size="lg" showBadge={true} />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FAFAFA] max-w-4xl leading-[1.12] mb-6"
        >
          Create Production-Ready AI UGC Ads in Seconds
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#A1A1AA] max-w-2xl leading-relaxed mb-10 font-normal"
        >
          Generate complete cinematic MASTER PROMPTS for AI video generators without writing prompts yourself.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => onNavigate('/generate')}
            className="w-full sm:w-auto px-8 py-4 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-base font-semibold rounded-2xl transition-all shadow-xl shadow-[#8B5CF6]/25 hover:shadow-[#A78BFA]/40 flex items-center justify-center gap-3 group cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            <span>Generate Master Prompt</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('/ideas')}
            className="w-full sm:w-auto px-7 py-4 bg-[#111113] hover:bg-[#1C1C20] text-white text-base font-medium rounded-2xl border border-[#27272A] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-5 h-5 text-[#A78BFA]" />
            <span>Trending Concepts</span>
          </button>
        </motion.div>

        {/* Compatible AI Video Models Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-[#27272A]/60 w-full max-w-3xl flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#A1A1AA]"
        >
          <span className="text-[#A1A1AA]/50 font-mono text-[11px] uppercase tracking-wider">
            Paste directly into:
          </span>
          <span className="font-semibold text-[#FAFAFA]">Google Veo</span>
          <span className="font-semibold text-[#FAFAFA]">Google Flow</span>
          <span className="font-semibold text-[#FAFAFA]">Kling AI</span>
          <span className="font-semibold text-[#FAFAFA]">Runway Gen-3</span>
          <span className="font-semibold text-[#FAFAFA]">Pika</span>
          <span className="font-semibold text-[#FAFAFA]">Hailuo</span>
          <span className="font-semibold text-[#FAFAFA]">Luma</span>
        </motion.div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[#27272A]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A78BFA] font-semibold block mb-2">
            The Streamlined Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            How Director.ai Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-[#111113] border border-[#27272A] p-6 rounded-2xl relative flex flex-col justify-between">
            <div className="text-3xl font-black text-[#8B5CF6]/30 font-mono mb-4">01</div>
            <div>
              <h3 className="text-base font-bold text-[#FAFAFA] mb-2">Describe Your Product</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Enter your product name and who it's for. Optional URL. That's all.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111113] border border-[#27272A] p-6 rounded-2xl relative flex flex-col justify-between">
            <div className="text-3xl font-black text-[#8B5CF6]/30 font-mono mb-4">02</div>
            <div>
              <h3 className="text-base font-bold text-[#FAFAFA] mb-2">Creative Strategy</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Director.ai selects winning hooks, camera specs, lighting, and timeline.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#111113] border border-[#27272A] p-6 rounded-2xl relative flex flex-col justify-between">
            <div className="text-3xl font-black text-[#8B5CF6]/30 font-mono mb-4">03</div>
            <div>
              <h3 className="text-base font-bold text-[#FAFAFA] mb-2">Copy Master Prompt</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                One-click copy of the single production-ready MASTER PROMPT.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#111113] border border-[#27272A] p-6 rounded-2xl relative flex flex-col justify-between">
            <div className="text-3xl font-black text-[#8B5CF6]/30 font-mono mb-4">04</div>
            <div>
              <h3 className="text-base font-bold text-[#FAFAFA] mb-2">Generate Video</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Paste into Veo, Kling, Runway, or Luma to produce your viral UGC ad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY'S AI CONCEPTS PREVIEW CTA */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[#27272A]">
        <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-mono mb-3">
              <Lightbulb className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Daily Creator Discovery</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] mb-3">
              Looking for High-Converting Ad Ideas?
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Explore Trending Concepts — hand-curated viral UGC advertisement frameworks updated daily across popular market niches. Click any concept to auto-populate Director.ai instantly.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/ideas')}
            className="px-7 py-4 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-sm font-semibold rounded-2xl shadow-lg shadow-[#8B5CF6]/20 transition-all shrink-0 cursor-pointer flex items-center gap-2.5"
          >
            <span>Explore Trending Concepts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section className="py-20 px-4 sm:px-6 bg-[#09090B] border-t border-[#27272A]">
        <div className="max-w-4xl mx-auto bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Data Storage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight mb-4">
            "Your ideas stay yours."
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-8">
            Director.ai never stores your prompts, products, or inputs. No databases, no prompt history, no user logs. Every prompt exists only in temporary RAM during your current session.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left">
            <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-xl">
              <Lock className="w-4 h-4 text-[#22C55E] mb-2" />
              <div className="text-xs font-bold text-[#FAFAFA]">No Database</div>
              <div className="text-[11px] text-[#A1A1AA]">Zero persistent records</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-xl">
              <Lock className="w-4 h-4 text-[#22C55E] mb-2" />
              <div className="text-xs font-bold text-[#FAFAFA]">No History</div>
              <div className="text-[11px] text-[#A1A1AA]">No prompt saved</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-xl">
              <Lock className="w-4 h-4 text-[#22C55E] mb-2" />
              <div className="text-xs font-bold text-[#FAFAFA]">No Cookies</div>
              <div className="text-[11px] text-[#A1A1AA]">Clean browser state</div>
            </div>
            <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-xl">
              <Lock className="w-4 h-4 text-[#22C55E] mb-2" />
              <div className="text-xs font-bold text-[#FAFAFA]">Memory Only</div>
              <div className="text-[11px] text-[#A1A1AA]">Clears on refresh</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
