import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  CheckCircle2,
  RefreshCw,
  ImageIcon,
  Hash,
  MessageSquare,
  List,
  Target
} from 'lucide-react';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel } from '../types';
import { BackgroundGlow } from './BackgroundGlow';

interface ContentResultPageProps {
  result: DesignContentResult;
  onCreateAnother: () => void;
}

export const ContentResultPage: React.FC<ContentResultPageProps> = ({ result, onCreateAnother }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCopiedKey, setActiveCopiedKey] = useState<string | null>(null);

  const showToast = (message: string, key: string) => {
    setActiveCopiedKey(key);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
      setActiveCopiedKey(null);
    }, 2500);
  };

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied successfully.`, key);
  };

  const copyAll = () => {
    let fullText = '';
    if (result.format === 'single') {
      fullText = `
--- ${result.topicTitle} ---

${result.hook}

${result.postContent}

${result.cta}

---
IMAGE PROMPT:
${result.imagePrompt}
      `.trim();
    } else {
      fullText = `
--- ${result.topicTitle} ---
COVER: ${result.coverTitle}

${result.slides.map((s, i) => `SLIDE ${i + 1}: ${s.heading}\n${s.description}\nIMAGE PROMPT: ${s.imagePrompt}`).join('\n\n')}

CTA: ${result.cta}
      `.trim();
    }
    
    copyToClipboard(fullText, 'All Content', 'all');
  };

  const SectionCard = ({ title, icon: Icon, children, copyText, copyLabel, copyKey }: any) => (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
      <div className="bg-[var(--color-bg-primary)] border-b border-[var(--color-border-primary)] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon className="w-5 h-5 text-[var(--color-brand-violet)]" />
          <h3 className="font-sora font-bold text-[#FAFAFA] text-sm uppercase tracking-wider">{title}</h3>
        </div>
        {copyText && (
          <button
            onClick={() => copyToClipboard(copyText, copyLabel, copyKey)}
            className="p-2 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-lg text-[#A1A1AA] hover:text-white transition-colors"
            title={`Copy ${copyLabel}`}
          >
            {activeCopiedKey === copyKey ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
      <div className="p-5 flex-1 text-sm text-[#A1A1AA] whitespace-pre-wrap font-inter leading-relaxed">
        {children}
      </div>
    </div>
  );

  const renderSinglePost = (res: DesignContentResultV2Single) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Post Content */}
      <div className="lg:col-span-2">
        <SectionCard title="Post Content" icon={MessageSquare} copyText={`${res.hook}\n\n${res.postContent}\n\n${res.cta}`} copyLabel="Post" copyKey="post">
          <div className="space-y-4 text-[15px] leading-relaxed text-[#D4D4D8]">
            <p className="font-semibold text-white">{res.hook}</p>
            <p>{res.postContent}</p>
            <p className="font-semibold text-[var(--color-brand-lavender)] italic">{res.cta}</p>
          </div>
        </SectionCard>
      </div>

      {/* Sidebar: Image & SEO */}
      <div className="flex flex-col gap-6">
        <SectionCard title="AI Image Prompt" icon={ImageIcon} copyText={res.imagePrompt} copyLabel="Prompt" copyKey="prompt">
          <div className="p-4 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl font-mono text-[12px] text-[var(--color-brand-violet)] leading-relaxed">
            {res.imagePrompt}
          </div>
        </SectionCard>

        <SectionCard title="SEO & Tags" icon={Hash} copyText={res.hashtags.join(' ')} copyLabel="Tags" copyKey="tags">
          <strong className="text-white text-xs uppercase tracking-wider block mb-2">Keywords</strong>
          <div className="flex flex-wrap gap-2 mb-6">
            {res.keywords.map((k, i) => (
              <span key={i} className="px-2.5 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-[11px] font-mono text-[#A1A1AA]">{k}</span>
            ))}
          </div>
          <strong className="text-white text-xs uppercase tracking-wider block mb-2">Hashtags</strong>
          <div className="font-mono text-[12px] text-[var(--color-brand-magenta)]">
            {res.hashtags.join(' ')}
          </div>
        </SectionCard>
      </div>
    </div>
  );

  const renderCarousel = (res: DesignContentResultV2Carousel) => (
    <div className="flex flex-col gap-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Carousel Overview" icon={List} copyText={`Title: ${res.coverTitle}\n\nCTA: ${res.cta}`} copyLabel="Overview" copyKey="overview">
          <div className="mb-4">
            <strong className="text-white text-xs font-mono uppercase tracking-wider">Slide 1 (Cover Title)</strong>
            <p className="text-lg font-bold text-white mt-1">{res.coverTitle}</p>
          </div>
          <div>
            <strong className="text-white text-xs font-mono uppercase tracking-wider">Final Slide (Call to Action)</strong>
            <p className="text-[var(--color-brand-lavender)] italic mt-1">{res.cta}</p>
          </div>
        </SectionCard>
        
        <SectionCard title="SEO & Tags" icon={Hash} copyText={res.hashtags.join(' ')} copyLabel="Tags" copyKey="tags">
          <strong className="text-white text-xs uppercase tracking-wider block mb-2">Keywords</strong>
          <div className="flex flex-wrap gap-2 mb-6">
            {res.keywords.map((k, i) => (
              <span key={i} className="px-2.5 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-[11px] font-mono text-[#A1A1AA]">{k}</span>
            ))}
          </div>
          <strong className="text-white text-xs uppercase tracking-wider block mb-2">Hashtags</strong>
          <div className="font-mono text-[12px] text-[var(--color-brand-magenta)]">
            {res.hashtags.join(' ')}
          </div>
        </SectionCard>
      </div>

      {/* Individual Slides */}
      <div className="space-y-6">
        <h3 className="font-sora font-bold text-xl text-white mt-4 border-b border-[var(--color-border-primary)] pb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--color-brand-violet)]" />
          Carousel Slides
        </h3>
        {res.slides.map((slide, index) => (
          <div key={index} className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6 relative group">
            {/* Slide Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] font-bold flex items-center justify-center text-sm font-mono shrink-0">
                  {index + 1}
                </div>
                <h4 className="font-sora font-bold text-lg text-white">{slide.heading}</h4>
              </div>
              <p className="text-[#D4D4D8] leading-relaxed ml-11">{slide.description}</p>
            </div>
            
            {/* Image Prompt */}
            <div className="flex-1 bg-[var(--color-bg-primary)] rounded-xl p-5 border border-[var(--color-border-primary)] relative">
              <div className="flex items-center justify-between mb-3">
                <strong className="text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[var(--color-brand-magenta)]" />
                  Image Prompt
                </strong>
                <button
                  onClick={() => copyToClipboard(slide.imagePrompt, `Slide ${index + 1} Prompt`, `prompt-${index}`)}
                  className="text-[#A1A1AA] hover:text-white transition-colors"
                >
                  {activeCopiedKey === `prompt-${index}` ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="font-mono text-[12px] text-[var(--color-brand-violet)] leading-relaxed">
                {slide.imagePrompt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden pb-24 flex justify-center selection:bg-[var(--color-brand-violet)]/30">
      <BackgroundGlow />
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-6 z-50 bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/50 text-[#FAFAFA] px-5 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.15)] flex items-center gap-3 font-mono text-xs sm:text-sm backdrop-blur-xl"
          >
            <div className="w-7 h-7 rounded-full bg-[var(--color-brand-violet)]/20 text-[var(--color-brand-violet)] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl space-y-8 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[var(--color-border-primary)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase">
                {result.format === 'single' ? 'SINGLE POST' : 'CAROUSEL'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-sora font-extrabold text-[#FAFAFA] tracking-tight leading-snug">
              {result.topicTitle}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={onCreateAnother} className="btn-secondary flex-1 md:flex-none">
              <RefreshCw className="w-4 h-4" />
              <span>New Topic</span>
            </button>
            <button onClick={copyAll} className="btn-primary flex-1 md:flex-none">
              <Copy className="w-4 h-4" />
              <span>Copy All</span>
            </button>
          </div>
        </div>

        {/* DYNAMIC RENDERING BASED ON FORMAT */}
        {result.format === 'single' ? renderSinglePost(result) : renderCarousel(result)}

      </div>
    </div>
  );
};
