import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageCurtainProps {
  isVisible: boolean;
  title: string;
}

export const PageCurtain: React.FC<PageCurtainProps> = ({ isVisible, title }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#6615F6] pointer-events-none"
          initial={{ clipPath: 'polygon(0% 0%, 0% 0%, -20% 100%, -20% 100%)' }}
          animate={{ clipPath: 'polygon(0% 0%, 120% 0%, 100% 100%, -20% 100%)' }}
          exit={{ clipPath: 'polygon(120% 0%, 120% 0%, 100% 100%, 100% 100%)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl md:text-7xl font-sora font-extrabold text-white tracking-tight"
          >
            {title}
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
