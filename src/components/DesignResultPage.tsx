import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle2, ImageIcon, Download, RefreshCcw, Send, Save } from 'lucide-react';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel } from '../types';
import { BackgroundGlow } from './BackgroundGlow';

interface DesignResultPageProps {
  result: DesignContentResult;
  onCreateAnother: () => void;
}

export const DesignResultPage: React.FC<DesignResultPageProps> = ({ result, onCreateAnother }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCopiedKey, setActiveCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'instagram' | 'facebook' | 'twitter' | 'youtube'>('linkedin');

  const showToast = (message: string, key: string) => {
    setActiveCopiedKey(key);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
      setActiveCopiedKey(null);
    }, 2500);
  };

  const cleanText = (text?: string): string => {
    if (!text) return '';
    return text.replace(/[—–]/g, '-');
  };

  const formatHashtags = (tags?: string[]): string => {
    if (!tags || !Array.isArray(tags)) return '';
    return tags
      .map(t => {
        const clean = t.trim().replace(/[—–]/g, '-');
        if (!clean) return '';
        return clean.startsWith('#') ? clean : `#${clean}`;
      })
      .filter(Boolean)
      .join(' ');
  };

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(cleanText(text) || '');
    showToast(`${label} copied successfully.`, key);
  };

  const formatCaption = (platform: string, captionObj: any) => {
    if (!captionObj) return '';
    if (typeof captionObj === 'string') return cleanText(captionObj);
    let resultText = '';
    switch (platform) {
      case 'linkedin': 
        resultText = `${captionObj.hook || ''}\n\n${captionObj.context || ''}\n\n${captionObj.mainInsight || ''}\n\n${(captionObj.keyTakeaways || []).map((t: string) => `• ${t}`).join('\n')}\n\n${captionObj.cta || ''}`;
        break;
      case 'instagram': 
        resultText = `${captionObj.hook || ''}\n\n${captionObj.story || ''}\n\n${captionObj.lesson || ''}\n\n${captionObj.cta || ''}`;
        break;
      case 'facebook': 
        resultText = `${captionObj.opening || ''}\n\n${captionObj.problem || ''}\n\n${captionObj.advice || ''}\n\n${captionObj.example || ''}\n\n${captionObj.question || ''}`;
        break;
      case 'twitter': 
        resultText = `[ SINGLE TWEET ]\n${captionObj.singleTweet || ''}\n\n------------------------\n\n[ THREAD VERSION ]\n${(captionObj.threadVersion || []).join('\n\n')}`;
        break;
      case 'youtube': 
        resultText = `${captionObj.seoTitle || ''}\n\n${captionObj.description || ''}\n\nWhat You'll Learn:\n${(captionObj.whatYouWillLearn || []).map((t: string) => `• ${t}`).join('\n')}\n\nChapters:\n${(captionObj.chapters || []).join('\n')}\n\n${captionObj.cta || ''}\n\nKeywords: ${(captionObj.keywords || []).join(', ')}`;
        break;
      default: 
        resultText = '';
    }
    return cleanText(resultText);
  };

  const SectionHeader = ({ number, title }: { number: string; title: string }) => (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-3xl md:text-4xl font-sora font-extrabold text-[#3F3F46]">{number}</span>
      <h2 className="text-xl md:text-2xl font-sora font-bold text-white tracking-widest uppercase">{title}</h2>
    </div>
  );

  const renderSinglePost = (res: DesignContentResultV2Single) => (
    <div className="flex flex-col gap-24 max-w-[900px] mx-auto w-full">
      {/* 01 - CONTENT */}
      <section>
        <SectionHeader number="01" title="Content" />
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-6 text-[15px] leading-relaxed text-[#D4D4D8]">
            {res.whyThisMatters && (
              <div className="mb-6">
                <strong className="text-[var(--color-brand-violet)] text-xs uppercase tracking-widest block mb-2 font-mono">Why This Matters</strong>
                <p className="text-white italic text-base">{cleanText(res.whyThisMatters)}</p>
              </div>
            )}
            <p className="font-sora font-semibold text-white text-xl sm:text-2xl leading-snug">{cleanText(res.hook)}</p>
            <p className="text-lg">{cleanText(res.professionalCaption)}</p>
            <p className="font-semibold text-[var(--color-brand-lavender)] italic text-lg">{cleanText(res.cta)}</p>
          </div>
        </div>
      </section>

      {/* 02 - POST PREVIEW */}
      <section>
        <SectionHeader number="02" title="Post Preview" />
        <div className="flex flex-col gap-6">
          <div className="w-full aspect-[4/5] sm:aspect-video md:aspect-[4/5] lg:h-[700px] bg-[#050505] border border-[var(--color-border-primary)] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1557FF]/5 to-transparent pointer-events-none" />
            
            <ImageIcon className="w-16 h-16 text-[#27272A] mb-8" />
            
            <div className="text-center max-w-lg px-8 relative z-10 flex flex-col items-center">
              {res.imageText ? (
                <>
                  <h3 className="text-3xl md:text-5xl font-sora font-extrabold text-white mb-4 uppercase leading-tight tracking-tight">{cleanText(res.imageText.headline)}</h3>
                  <p className="text-[#A1A1AA] text-lg font-light leading-relaxed">{cleanText(res.imageText.supporting)}</p>
                </>
              ) : (
                <p className="text-[#A1A1AA] text-lg">Visual Asset Placeholder</p>
              )}
            </div>

            {/* Simulated Brand Overlay */}
            <div className={`absolute ${res.tzinrSignaturePlacement === 'top-right' ? 'top-8 right-8' : res.tzinrSignaturePlacement === 'bottom-left' ? 'bottom-8 left-8' : res.tzinrSignaturePlacement === 'bottom-right' ? 'bottom-8 right-8' : 'top-8 left-8'} flex flex-col`}>
              <span className="text-white text-xs sm:text-sm font-bold tracking-widest">{res.tzinrSignatureText || 'TZINR'}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
             <button className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-lavender)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
               <Download className="w-5 h-5" /> Download
             </button>
             <button className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
               <RefreshCcw className="w-5 h-5" /> Regenerate Image
             </button>
          </div>
        </div>
      </section>

      {/* 03 - IMAGE PROMPT */}
      <section>
        <SectionHeader number="03" title="Image Prompt" />
        <div className="bg-[#050505] border border-[var(--color-border-primary)] rounded-2xl overflow-hidden flex flex-col shadow-xl">
           <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar max-h-[400px]">
             <p className="font-mono text-sm md:text-base text-[var(--color-brand-violet)] leading-loose whitespace-pre-wrap">{cleanText(res.imagePrompt)}</p>
           </div>
           <div className="bg-[var(--color-bg-surface)] p-4 border-t border-[var(--color-border-primary)] flex items-center justify-between">
              <button 
                onClick={() => copyToClipboard(res.imagePrompt, 'Image Prompt', 'prompt')} 
                className="px-5 py-2.5 bg-[var(--color-bg-primary)] hover:bg-[#18181B] border border-[var(--color-border-primary)] rounded-lg text-sm font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                 {activeCopiedKey === 'prompt' ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />} Copy Prompt
              </button>
           </div>
        </div>
      </section>

      {/* 04 - POST DESCRIPTION */}
      <section>
        <SectionHeader number="04" title="Post Description" />
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-[var(--color-border-primary)] overflow-x-auto custom-scrollbar">
            {(['linkedin', 'instagram', 'facebook', 'twitter', 'youtube'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab ? 'bg-[var(--color-brand-violet)]/10 text-white border-b-2 border-[var(--color-brand-violet)]' : 'text-[#A1A1AA] hover:bg-[var(--color-bg-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6 sm:p-8">
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-8">
              <p className="text-base text-white whitespace-pre-wrap leading-relaxed font-inter">{formatCaption(activeTab, res.captions?.[activeTab])}</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-primary)]">
               <span className="text-xs font-mono text-[#71717A]">{formatCaption(activeTab, res.captions?.[activeTab]).length} Characters</span>
               <button 
                 onClick={() => copyToClipboard(formatCaption(activeTab, res.captions?.[activeTab]) + '\n\n' + formatHashtags(res.hashtags), `${activeTab} Description`, 'desc')} 
                 className="px-5 py-2.5 bg-[var(--color-bg-primary)] hover:bg-[#18181B] border border-[var(--color-border-primary)] rounded-lg text-sm font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer"
               >
                  {activeCopiedKey === 'desc' ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />} Copy Description
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05 - SEO & TAGS */}
      <section>
        <SectionHeader number="05" title="SEO & Tags" />
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="mb-8">
            <strong className="text-white text-xs uppercase tracking-widest block mb-4 font-mono">Keywords</strong>
            <div className="flex flex-wrap gap-2.5">
              {(res.keywords || []).map((k, i) => (
                <span key={i} className="px-3 py-1.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-sm text-[#D4D4D8]">{cleanText(k)}</span>
              ))}
            </div>
          </div>
          <div>
            <strong className="text-white text-xs uppercase tracking-widest block mb-4 font-mono">Hashtags</strong>
            <div className="font-mono text-sm text-[var(--color-brand-violet)] leading-relaxed">
              {formatHashtags(res.hashtags)}
            </div>
          </div>
        </div>
      </section>

      {/* 06 - PUBLISHING */}
      <section>
        <SectionHeader number="06" title="Publishing" />
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="w-full sm:w-auto">
             <strong className="text-white text-sm font-sora block mb-1">Ready to export?</strong>
             <p className="text-[#A1A1AA] text-sm">Save your progress or publish directly to platforms.</p>
           </div>
           <div className="flex w-full sm:w-auto items-center gap-3">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Draft
              </button>
              <button className="flex-1 sm:flex-none px-8 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Send className="w-4 h-4" /> Publish
              </button>
           </div>
        </div>
      </section>
    </div>
  );

  const renderCarousel = (res: DesignContentResultV2Carousel) => (
    <div className="flex flex-col gap-24 max-w-[900px] mx-auto w-full">
      {/* 01 - CONTENT */}
      <section>
        <SectionHeader number="01" title="Content" />
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-6 text-[15px] leading-relaxed text-[#D4D4D8]">
            <div className="mb-6">
              <strong className="text-[var(--color-brand-violet)] text-xs uppercase tracking-widest block mb-2 font-mono">Slide 1 (Cover)</strong>
              <p className="text-2xl font-sora font-bold text-white leading-snug">{cleanText(res.coverTitle)}</p>
            </div>
            {res.whyThisMatters && (
              <div className="mb-6">
                <strong className="text-[var(--color-brand-violet)] text-xs uppercase tracking-widest block mb-2 font-mono">Why This Matters</strong>
                <p className="text-white italic text-base">{cleanText(res.whyThisMatters)}</p>
              </div>
            )}
            <p className="font-semibold text-[var(--color-brand-lavender)] italic text-lg">{cleanText(res.cta)}</p>
          </div>
        </div>
      </section>

      {/* 02 - POST PREVIEW (Carousel) */}
      <section>
        <SectionHeader number="02" title="Post Preview" />
        <div className="flex flex-col gap-6">
           {/* We could render multiple slides or just a scrollable row, let's do a vertical stack of preview cards for clarity */}
           <div className="flex overflow-x-auto gap-6 pb-4 custom-scrollbar snap-x">
             {(res.slides || []).map((slide, index) => (
                <div key={index} className="w-[300px] sm:w-[400px] shrink-0 aspect-[4/5] bg-[#050505] border border-[var(--color-border-primary)] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-xl snap-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1557FF]/5 to-transparent pointer-events-none" />
                  <ImageIcon className="w-10 h-10 text-[#27272A] mb-6" />
                  <div className="text-center px-6 relative z-10">
                     <h3 className="text-xl font-sora font-extrabold text-white mb-2 uppercase">{cleanText(slide.imageText?.headline)}</h3>
                     <p className="text-[#A1A1AA] text-sm">{cleanText(slide.imageText?.supporting)}</p>
                  </div>
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-[#A1A1AA]">
                     Slide {index + 2}
                  </div>
                </div>
             ))}
           </div>
           
           <div className="flex flex-col sm:flex-row items-center gap-4">
             <button className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-lavender)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
               <Download className="w-5 h-5" /> Download All
             </button>
             <button className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
               <RefreshCcw className="w-5 h-5" /> Regenerate Carousel
             </button>
          </div>
        </div>
      </section>

      {/* 03 - IMAGE PROMPT */}
      <section>
        <SectionHeader number="03" title="Image Prompts" />
        <div className="space-y-6">
          {(res.slides || []).map((slide, index) => (
            <div key={index} className="bg-[#050505] border border-[var(--color-border-primary)] rounded-2xl overflow-hidden flex flex-col shadow-xl">
               <div className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border-primary)] px-6 py-3 flex items-center justify-between">
                  <strong className="text-white text-xs uppercase tracking-widest font-mono">Slide {index + 2}</strong>
               </div>
               <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar max-h-[300px]">
                 <p className="font-mono text-sm text-[var(--color-brand-violet)] leading-loose whitespace-pre-wrap">{cleanText(slide.imagePrompt)}</p>
               </div>
               <div className="bg-[var(--color-bg-surface)] p-4 border-t border-[var(--color-border-primary)] flex items-center justify-end">
                  <button 
                    onClick={() => copyToClipboard(slide.imagePrompt, `Slide ${index+2} Prompt`, `prompt-${index}`)} 
                    className="px-5 py-2.5 bg-[var(--color-bg-primary)] hover:bg-[#18181B] border border-[var(--color-border-primary)] rounded-lg text-sm font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer"
                  >
                     {activeCopiedKey === `prompt-${index}` ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />} Copy
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 - POST DESCRIPTION */}
      <section>
        <SectionHeader number="04" title="Post Description" />
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-[var(--color-border-primary)] overflow-x-auto custom-scrollbar">
            {(['linkedin', 'instagram', 'facebook', 'twitter', 'youtube'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab ? 'bg-[var(--color-brand-violet)]/10 text-white border-b-2 border-[var(--color-brand-violet)]' : 'text-[#A1A1AA] hover:bg-[var(--color-bg-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6 sm:p-8">
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-8">
              <p className="text-base text-white whitespace-pre-wrap leading-relaxed font-inter">{formatCaption(activeTab, res.captions?.[activeTab])}</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-primary)]">
               <span className="text-xs font-mono text-[#71717A]">{formatCaption(activeTab, res.captions?.[activeTab]).length} Characters</span>
               <button 
                 onClick={() => copyToClipboard(formatCaption(activeTab, res.captions?.[activeTab]) + '\n\n' + formatHashtags(res.hashtags), `${activeTab} Description`, 'desc')} 
                 className="px-5 py-2.5 bg-[var(--color-bg-primary)] hover:bg-[#18181B] border border-[var(--color-border-primary)] rounded-lg text-sm font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer"
               >
                  {activeCopiedKey === 'desc' ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />} Copy Description
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05 - SEO & TAGS */}
      <section>
        <SectionHeader number="05" title="SEO & Tags" />
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="mb-8">
            <strong className="text-white text-xs uppercase tracking-widest block mb-4 font-mono">Keywords</strong>
            <div className="flex flex-wrap gap-2.5">
              {(res.keywords || []).map((k, i) => (
                <span key={i} className="px-3 py-1.5 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-sm text-[#D4D4D8]">{cleanText(k)}</span>
              ))}
            </div>
          </div>
          <div>
            <strong className="text-white text-xs uppercase tracking-widest block mb-4 font-mono">Hashtags</strong>
            <div className="font-mono text-sm text-[var(--color-brand-violet)] leading-relaxed">
              {formatHashtags(res.hashtags)}
            </div>
          </div>
        </div>
      </section>

      {/* 06 - PUBLISHING */}
      <section>
        <SectionHeader number="06" title="Publishing" />
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="w-full sm:w-auto">
             <strong className="text-white text-sm font-sora block mb-1">Ready to export?</strong>
             <p className="text-[#A1A1AA] text-sm">Save your progress or publish directly to platforms.</p>
           </div>
           <div className="flex w-full sm:w-auto items-center gap-3">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Draft
              </button>
              <button className="flex-1 sm:flex-none px-8 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Send className="w-4 h-4" /> Publish
              </button>
           </div>
        </div>
      </section>
    </div>
  );

  if (!result) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 text-center">
        <p className="text-[#A1A1AA]">No result available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 relative overflow-hidden pb-32 flex justify-center selection:bg-[var(--color-brand-violet)]/30">
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

      <div className="w-full max-w-5xl relative z-10 flex flex-col gap-12 sm:gap-16">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-6 pb-12 border-b border-[var(--color-border-primary)]/50">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-[10px] font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">DIRECTOR.AI</h1>
            <h2 className="text-3xl sm:text-5xl font-sora font-extrabold text-white tracking-tight leading-tight">
              {cleanText(result.topicTitle || (result as any).coverTitle || 'Design Insight')}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-mono font-semibold tracking-widest uppercase text-[#A1A1AA]">
                {result.visualType ? `TYPE ${result.visualType} · ` : ''}TZINR
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={onCreateAnother}
              className="px-6 py-2.5 bg-transparent hover:bg-[var(--color-bg-surface)] border border-[#3F3F46] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
            >
              Regenerate
            </button>
            <button
              className="px-6 py-2.5 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>

        {/* CONTENT */}
        {result.format === 'single' ? renderSinglePost(result as DesignContentResultV2Single) : renderCarousel(result as DesignContentResultV2Carousel)}
      </div>
    </div>
  );
};
