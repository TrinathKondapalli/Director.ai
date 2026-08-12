import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, PenTool } from 'lucide-react';

const STEPS = [
  'Searching latest design news online...',
  'Finding trending UX/UI topics...',
  'Filtering meaningful updates...',
  'Selecting the best topic...',
  'Researching topic depth...',
  'Analyzing why it matters...',
  'Creating platform-specific posts...',
  'Generating AI image prompts...',
  'Generating hashtags & SEO keywords...',
  'Generating titles & hooks...',
  'Processing...',
];

export const ContentLoadingScreen: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // 3-dot animation loop during Processing... stage
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  const isProcessing = currentStepIndex === STEPS.length - 1;
  const progressPercent = isProcessing ? 92 : Math.min(90, Math.round(((currentStepIndex + 1) / STEPS.length) * 100));
  const activeDotText = '.'.repeat(dotCount);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-12 px-4 flex flex-col items-center justify-center selection:bg-[var(--color-brand-violet)]/30">
      <div className="w-full max-w-md bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Glow pulsing ring */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[var(--color-brand-violet)]/20 animate-ping" />
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-brand-violet)]/50 flex items-center justify-center shadow-lg shadow-[var(--color-brand-violet)]/30 relative z-10 text-[var(--color-brand-violet)]">
            <PenTool className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-extrabold text-[#FAFAFA] mb-1">Studio is Working</h2>
        <p className="text-xs text-[#A1A1AA] font-mono mb-6">Building your 17-section content package...</p>

        {/* Progress Bar */}
        <div className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] h-2.5 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-brand-violet)] to-[var(--color-brand-magenta)] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
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
              <Loader2 className="w-4 h-4 text-[var(--color-brand-violet)] animate-spin" />
              <span>
                {isProcessing ? `Processing${activeDotText}` : STEPS[currentStepIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Completed Log List */}
        <div className="space-y-1.5 text-left bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)] max-h-40 overflow-y-auto font-mono text-[11px] text-[#A1A1AA]">
          {STEPS.slice(0, currentStepIndex + 1).map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            return (
              <div key={idx} className="flex items-center gap-2">
                {isCurrent ? (
                  <Loader2 className="w-3 h-3 text-[var(--color-brand-violet)] animate-spin shrink-0" />
                ) : (
                  <Check className="w-3 h-3 text-[#22C55E] shrink-0" />
                )}
                <span className={isCurrent ? 'text-white font-medium' : 'text-[#A1A1AA]/60'}>
                  {isCurrent && isProcessing ? `Processing${activeDotText}` : step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
