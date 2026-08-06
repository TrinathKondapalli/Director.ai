import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string | React.ReactNode;
  className?: string;
  delayOffset?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  delayOffset = 0
}) => {
  if (typeof text !== 'string') {
    return (
      <motion.span
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: delayOffset, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`inline-block ${className}`}
      >
        {text}
      </motion.span>
    );
  }

  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delayOffset * i },
    }),
  };

  const child: Variants = {
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
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <motion.span
            variants={child}
            className="inline-block"
          >
            {word}
          </motion.span>
          {index < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </motion.span>
  );
};
