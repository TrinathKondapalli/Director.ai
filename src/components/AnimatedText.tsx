import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string | React.ReactNode;
  className?: string;
  delayOffset?: number;
  wordSpace?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  delayOffset = 0,
  wordSpace = "\u00A0" 
}) => {
  // If children isn't a simple string, we just animate the whole block as one piece
  if (typeof text !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: delayOffset, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delayOffset * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        mass: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(12px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ marginRight: wordSpace }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
