import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundGlow: React.FC = () => {
  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--color-brand-violet)] blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-magenta)] blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen"
      />
    </>
  );
};
