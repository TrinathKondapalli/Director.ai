import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Clapperboard } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STEPS = [
  'Understanding your product...',
  'Researching the market...',
  'Finding winning UGC concepts...',
  'Selecting the strongest hook...',
  'Building creative strategy...',
  'Writing cinematic scenes...',
  'Optimizing for AI video...',
  'Generating MASTER PROMPT...',
  'Done.',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Step interval timing (total ~2.7 seconds)
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return prev;
        }
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / STEPS.length) * 100));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-12 px-4 flex flex-col items-center justify-center selection:bg-[var(--color-brand-violet)]/30">
      <div className="w-full max-w-md bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Glow pulsing ring */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[var(--color-brand-violet)]/20 animate-ping" />
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-brand-violet)]/50 flex items-center justify-center shadow-lg shadow-[var(--color-brand-violet)]/30 relative z-10 text-[var(--color-brand-violet)]">
            <Clapperboard className="w-8 h-8" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-extrabold text-[#FAFAFA] mb-1">Director.ai is Working</h2>
        <p className="text-xs text-[#A1A1AA] font-mono mb-6">Building your high-converting UGC Master Prompt...</p>

        {/* Progress Bar */}
        <div className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] h-2.5 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-brand-violet)] to-[var(--color-brand-magenta)] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>

        {/* Active Animated Message */}
        <div className="h-10 flex items-center justify-center overflow-hidden mb-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 text-xs text-[#FAFAFA] font-medium font-mono"
            >
              {currentStepIndex === STEPS.length - 1 ? (
                <Check className="w-4 h-4 text-[#22C55E]" />
              ) : (
                <Loader2 className="w-4 h-4 text-[var(--color-brand-violet)] animate-spin" />
              )}
              <span>{STEPS[currentStepIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Completed Log List */}
        <div className="space-y-1.5 text-left bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)] max-h-36 overflow-y-auto font-mono text-[11px] text-[#A1A1AA]">
          {STEPS.slice(0, currentStepIndex + 1).map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[#22C55E] shrink-0" />
              <span className={idx === currentStepIndex ? 'text-white font-medium' : 'text-[#A1A1AA]/60'}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
