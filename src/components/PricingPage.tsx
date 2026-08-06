import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ShieldCheck, Zap, Info } from 'lucide-react';
import { AnimatedText } from './AnimatedText';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [showToast, setShowToast] = useState(false);

  const handleProClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-16 px-4 sm:px-6 selection:bg-[var(--color-brand-violet)]/30 relative overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-primary)] shadow-2xl flex items-center gap-3 backdrop-blur-xl min-w-[300px]"
          >
            <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--color-brand-violet)]/20 flex items-center justify-center">
              <Info className="w-4 h-4 text-[var(--color-brand-violet)]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Pro Access Unavailable</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">This feature is currently in private beta.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-brand-violet)]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[var(--color-brand-magenta)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6615F6]/15 border border-[#6615F6]/30 text-[#6615F6] text-xs font-mono mb-4">
            <Zap className="w-4 h-4 text-[#6615F6]" />
            <span>Simple Transparent Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight mb-4">
            <AnimatedText text="Unlimited AI UGC Master Prompts" className="justify-center" />
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Choose the plan that fits your creation workflow. Zero hidden fees. Zero data retention.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {/* Free Tier */}
          <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#A1A1AA] mb-2 font-bold">
                Free Creator Pass
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-[#FAFAFA]">$0</span>
                <span className="text-xs text-[#A1A1AA]">/ forever</span>
              </div>
              <p className="text-xs text-[#A1A1AA] mb-6 leading-relaxed">
                Perfect for testing Director.ai on your next viral video ad campaign.
              </p>

              <ul className="space-y-3 text-xs text-[#FAFAFA] mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>5 Free UGC Master Prompts per day</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>Veo, Kling, Runway & Luma prompt formatting</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>Access to Trending Concepts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>Zero Data Storage & Privacy Protection</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('/generate')}
              className="w-full py-3.5 px-4 bg-[#1C1C20] hover:bg-[#27272A] text-white text-xs font-semibold rounded-xl border border-[#27272A] transition-colors cursor-pointer"
            >
              Start Generating Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-[#111113] border-2 border-[#6615F6] rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#6615F6] text-white text-[10px] font-mono uppercase font-bold tracking-wider rounded-full shadow-md">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#6615F6] mb-2 font-bold">
                Pro Director
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-[#FAFAFA]">$29</span>
                <span className="text-xs text-[#A1A1AA]">/ month</span>
              </div>
              <p className="text-xs text-[#A1A1AA] mb-6 leading-relaxed">
                For performance marketers, agencies & high-output creators building dozens of ads weekly.
              </p>

              <ul className="space-y-3 text-xs text-[#FAFAFA] mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#6615F6]" />
                  <span>Unlimited Master Prompts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#6615F6]" />
                  <span>Priority Gemini 3.6 Flash Generation Speed</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#6615F6]" />
                  <span>Deep AI Market Research & Pain Point Mapping</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#6615F6]" />
                  <span>Full Commercial Rights to Generated Master Prompts</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleProClick}
              className="w-full py-4 btn-primary flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Get Pro Access</span>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-[#A1A1AA]/60 flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>No credit card required for free generation. "Your ideas stay yours."</span>
        </p>
      </div>
    </div>
  );
};
