import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, PenTool, LayoutTemplate, Newspaper, FileText } from 'lucide-react';
import { generateContent } from '../data/contentEngine';
import { DesignContentResult } from '../types';
import { ContentLoadingScreen } from './ContentLoadingScreen';
import { ContentResultPage } from './ContentResultPage';
import { BackgroundGlow } from './BackgroundGlow';
import { AnimatedText } from './AnimatedText';

interface ContentStudioProps {
  onNavigate: (path: string) => void;
}

export const ContentStudio: React.FC<ContentStudioProps> = ({ onNavigate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<DesignContentResult | null>(null);
  const [format, setFormat] = useState<'single' | 'carousel'>('single');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult(null);
    try {
      const generatedResult = await generateContent(format);
      setResult(generatedResult);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateAnother = () => {
    setResult(null);
  };

  if (isGenerating) {
    return <ContentLoadingScreen />;
  }

  if (result) {
    return <ContentResultPage result={result} onCreateAnother={handleCreateAnother} />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-20 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center justify-center selection:bg-[var(--color-brand-violet)]/30">
      <BackgroundGlow />

      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center">
        {/* Module Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#A78BFA]/50 bg-[#111113]/50 backdrop-blur-sm text-[#A78BFA] text-[11px] font-semibold tracking-wide shadow-[0_0_15px_rgba(167,139,250,0.6)]"
        >
          <span>AI DESIGN CONTENT STUDIO</span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-sora text-[40px] sm:text-[56px] md:text-[64px] font-extrabold tracking-tight text-[#FAFAFA] leading-[1.05] mb-6">
          <AnimatedText text="Your Daily Design" className="justify-center" />
          <AnimatedText text="Content Package." className="text-[var(--color-brand-violet)] justify-center" delayOffset={0.2} />
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-inter text-[16px] sm:text-[18px] text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Click one button to instantly research today's top design news and generate a complete, professional, 17-section social media publishing package.
        </motion.p>

        {/* Primary CTA & Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20 flex flex-col items-center gap-6"
        >
          {/* Format Toggle */}
          <div className="flex bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-full p-1 w-fit">
            <button
              onClick={() => setFormat('single')}
              className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                format === 'single'
                  ? 'bg-[var(--color-bg-elevated)] text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              Single Post
            </button>
            <button
              onClick={() => setFormat('carousel')}
              className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                format === 'carousel'
                  ? 'bg-[var(--color-bg-elevated)] text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              Carousel
            </button>
          </div>

          <button
            onClick={handleGenerate}
            className="btn-primary px-10 py-5 text-[16px] sm:text-[18px] flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_45px_rgba(139,92,246,0.5)] transition-all duration-300"
          >
            <Sparkles className="w-6 h-6 fill-current text-white" />
            <span>Generate Today's Content</span>
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 text-left hover:border-[var(--color-brand-violet)]/30 transition-colors">
            <Newspaper className="w-6 h-6 text-[var(--color-brand-violet)] mb-4" />
            <h3 className="font-sora text-[17px] font-bold text-[#FAFAFA] mb-2">Live News Research</h3>
            <p className="font-inter text-[14px] text-[#A1A1AA]">Scans OpenAI, Figma, Framer, and 20+ design blogs to find today's most impactful topic.</p>
          </div>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 text-left hover:border-[var(--color-brand-violet)]/30 transition-colors">
            <Layers className="w-6 h-6 text-[var(--color-brand-violet)] mb-4" />
            <h3 className="font-sora text-[17px] font-bold text-[#FAFAFA] mb-2">17-Section Package</h3>
            <p className="font-inter text-[14px] text-[#A1A1AA]">Generates LinkedIn, Instagram, Twitter threads, Image Prompts, Video Scripts, and more.</p>
          </div>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 text-left hover:border-[var(--color-brand-violet)]/30 transition-colors">
            <LayoutTemplate className="w-6 h-6 text-[var(--color-brand-violet)] mb-4" />
            <h3 className="font-sora text-[17px] font-bold text-[#FAFAFA] mb-2">Zero Robotic Tone</h3>
            <p className="font-inter text-[14px] text-[#A1A1AA]">Engineered to write like a Senior Product Designer. No emojis spam. Pure actionable value.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
