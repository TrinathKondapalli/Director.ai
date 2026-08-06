import React, { useState } from 'react';
import { PenTool, Image as ImageIcon, Sparkles, Layout, Video, ArrowRight } from 'lucide-react';
import { BackgroundGlow } from './BackgroundGlow';

interface DesignPublisherProps {
  onNavigate: (path: string) => void;
}

export const DesignPublisher: React.FC<DesignPublisherProps> = ({ onNavigate }) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
      <BackgroundGlow />
      
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-xs font-mono font-semibold tracking-wide uppercase mb-6">
          <PenTool className="w-3.5 h-3.5" />
          <span>Module 02</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-sora font-extrabold text-[#FAFAFA] tracking-tight leading-tight mb-4">
          AI Design Publisher
        </h1>
        <p className="text-[#A1A1AA] text-lg max-w-2xl font-inter leading-relaxed">
          Generate premium educational content for Designers. Choose a format and the AI will analyze current trends to produce a unique, publish-ready asset.
        </p>
      </div>

      <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Single Post Option */}
        <div 
          className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 hover:border-[var(--color-brand-violet)] transition-colors cursor-pointer group"
          onMouseEnter={() => setIsHovered('single')}
          onMouseLeave={() => setIsHovered(null)}
          onClick={() => onNavigate('/design-result?format=single')}
        >
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-violet)]/10 border border-[var(--color-brand-violet)]/20 flex items-center justify-center mb-6">
            <Layout className="w-7 h-7 text-[var(--color-brand-violet)]" />
          </div>
          <h2 className="text-2xl font-sora font-bold text-white mb-3">Single Post Insight</h2>
          <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8">
            Generates a focused, single-image post with a deep-dive caption, tailored hooks, and professional insights on UX/UI best practices.
          </p>
          <div className="flex items-center gap-2 text-[var(--color-brand-violet)] font-semibold text-sm group-hover:gap-3 transition-all">
            <span>Generate Single Post</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Carousel Option */}
        <div 
          className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 hover:border-[var(--color-brand-magenta)] transition-colors cursor-pointer group"
          onMouseEnter={() => setIsHovered('carousel')}
          onMouseLeave={() => setIsHovered(null)}
          onClick={() => onNavigate('/design-result?format=carousel')}
        >
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-magenta)]/10 border border-[var(--color-brand-magenta)]/20 flex items-center justify-center mb-6">
            <ImageIcon className="w-7 h-7 text-[var(--color-brand-magenta)]" />
          </div>
          <h2 className="text-2xl font-sora font-bold text-white mb-3">Educational Carousel</h2>
          <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8">
            Generates a multi-slide educational carousel with cover title, slide content, and unique cinematic image prompts per slide.
          </p>
          <div className="flex items-center gap-2 text-[var(--color-brand-magenta)] font-semibold text-sm group-hover:gap-3 transition-all">
            <span>Generate Carousel</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
};
