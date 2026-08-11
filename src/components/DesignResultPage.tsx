import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle2, ImageIcon, Hash, MessageSquare, List, Target, Type } from 'lucide-react';
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
            className="p-2 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-lg text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
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
      <div className="lg:col-span-2 flex flex-col gap-6">
        <SectionCard 
          title="Educational Content" 
          icon={MessageSquare} 
          copyText={`WHY THIS MATTERS: ${res.whyThisMatters || ''}\n\n${res.hook || ''}\n\n${res.professionalCaption || ''}\n\n${res.cta || ''}`} 
          copyLabel="Content" 
          copyKey="post"
        >
          <div className="space-y-4 text-[15px] leading-relaxed text-[#D4D4D8]">
            <div className="bg-[var(--color-brand-violet)]/10 border border-[var(--color-brand-violet)]/20 rounded-lg p-3">
              <strong className="text-[var(--color-brand-lavender)] text-xs uppercase tracking-wider block mb-1">Why This Matters</strong>
              <p className="text-white italic text-sm">{cleanText(res.whyThisMatters)}</p>
            </div>
            <p className="font-semibold text-white text-lg">{cleanText(res.hook)}</p>
            <p>{cleanText(res.professionalCaption)}</p>
            <p className="font-semibold text-[var(--color-brand-lavender)] italic">{cleanText(res.cta)}</p>
          </div>
        </SectionCard>

        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden mt-6">
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/50">
            <h3 className="text-sm font-sora font-bold text-white flex items-center gap-2">
              <List className="w-4 h-4 text-[var(--color-brand-violet)]" />
              Platform Captions
            </h3>
            <button onClick={() => copyToClipboard(formatCaption(activeTab, res.captions?.[activeTab]) + '\n\n' + formatHashtags(res.hashtags), `${activeTab} Caption`, 'captions')} className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer">
              {activeCopiedKey === 'captions' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />} Copy Caption
            </button>
          </div>
          <div className="flex border-b border-[var(--color-border-primary)] overflow-x-auto custom-scrollbar">
            {(['linkedin', 'instagram', 'facebook', 'twitter', 'youtube'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3.5 text-xs font-semibold capitalize transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab ? 'bg-[var(--color-brand-violet)]/10 text-white border-b-2 border-[var(--color-brand-violet)]' : 'text-[#A1A1AA] hover:bg-[var(--color-bg-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6 md:p-8">
            <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar mb-6">
              <p className="text-sm text-white whitespace-pre-wrap leading-relaxed font-mono">{formatCaption(activeTab, res.captions?.[activeTab])}</p>
            </div>
            <div className="pt-6 border-t border-[var(--color-border-primary)]">
              <div className="flex items-center justify-between mb-3">
                <strong className="text-[10px] uppercase text-[#A1A1AA] tracking-widest">Hashtags</strong>
                <span className="text-[10px] font-mono text-[#71717A]">{formatCaption(activeTab, res.captions?.[activeTab]).length} Chars</span>
              </div>
              <p className="text-xs font-mono text-[var(--color-brand-violet)] leading-relaxed">{formatHashtags(res.hashtags)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {res.imageText && (
          <SectionCard title="Image Text Preview" icon={Type} copyText={`${res.imageText.headline}\n${res.imageText.supporting || ''}`} copyLabel="Image Text" copyKey="imageText">
            <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                <strong className="text-white text-[10px] uppercase tracking-wider text-[#A1A1AA] block mb-2">Slide Content</strong>
                {res.imageText && (
                  <div className="mb-3">
                    <p className="text-lg font-bold text-white leading-snug">{cleanText(res.imageText.headline)}</p>
                    {res.imageText.supporting && (
                      <p className="text-xs text-[#D4D4D8] mt-1">{cleanText(res.imageText.supporting)}</p>
                    )}
                  </div>
                )}
                <div className="pt-3 border-t border-[var(--color-border-primary)]">
                  <strong className="text-white text-[10px] uppercase tracking-wider block mb-2">Programmatic Brand Overlay</strong>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Signature</span>
                        <p className="text-sm font-semibold text-white">{res.tzinrSignatureText || 'TZINR'}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Placement</span>
                        <p className="text-sm font-semibold text-[var(--color-brand-violet)]">{res.tzinrSignaturePlacement || 'top-left'}</p>
                      </div>
                    </div>
                    <div className="bg-[var(--color-bg-surface)] p-3 rounded-lg border border-[var(--color-border-primary)]">
                      <strong className="text-white text-[10px] uppercase tracking-wider block mb-2 text-[#A1A1AA]">Final Acceptance Test</strong>
                      <div className="grid grid-cols-1 gap-y-1">
                        {[
                          'TZINR safe area preserved', 'Official TZINR logo applied', 'Logo has sufficient contrast'
                        ].map((check, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                            <span className="text-[11px] text-[#D4D4D8] leading-none">{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                <strong className="text-white text-[10px] uppercase tracking-wider text-[#A1A1AA] block mb-2">Image Prompt</strong>
                <p className="font-mono text-[11px] text-[var(--color-brand-violet)] leading-relaxed">{cleanText(res.imagePrompt)}</p>
              </div>
            </div> </div>
          </SectionCard>
        )}

        <SectionCard title="AI Image Prompt" icon={ImageIcon} copyText={cleanText(res.imagePrompt)} copyLabel="Prompt" copyKey="prompt">
          <div className="p-4 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl font-mono text-[12px] text-[var(--color-brand-violet)] leading-relaxed mb-4">
            {cleanText(res.imagePrompt)}
          </div>
          <div className="pt-4 border-t border-[var(--color-border-primary)]">
            <strong className="text-white text-[10px] uppercase tracking-wider block mb-2">Programmatic Brand Overlay (Do not generate in AI)</strong>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Signature</span>
                  <p className="text-sm font-semibold text-white">{res.tzinrSignatureText || 'TZINR'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Placement</span>
                  <p className="text-sm font-semibold text-[var(--color-brand-violet)]">{res.tzinrSignaturePlacement || 'top-left'}</p>
                </div>
              </div>
              <div className="bg-[var(--color-bg-surface)] p-3 rounded-lg border border-[var(--color-border-primary)] mt-2">
                <strong className="text-white text-[10px] uppercase tracking-wider block mb-2 text-[#A1A1AA]">Final Acceptance Test (Pre-Export)</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                  {[
                    'AI artwork generated', 'Editorial composition completed', 'TZINR safe area preserved', 'Official TZINR logo applied', 'Logo clearly visible', 'Logo has sufficient contrast', 'Logo is not oversized', 'Logo is not hidden', 'Category metadata remains separate', 'Final preview contains TZINR', 'Export contains TZINR'
                  ].map((check, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                      <span className="text-[11px] text-[#D4D4D8] leading-none">{check}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[var(--color-border-primary)] flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#A1A1AA]">POST STATUS</span>
                  <span className="text-xs font-bold text-[#22C55E] uppercase bg-[#22C55E]/10 px-2 py-0.5 rounded">COMPLETE</span>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="SEO & Tags" icon={Hash} copyText={formatHashtags(res.hashtags)} copyLabel="Tags" copyKey="tags">
          <strong className="text-white text-xs uppercase tracking-wider block mb-2">Keywords</strong>
          <div className="flex flex-wrap gap-2 mb-6">
            {(res.keywords || []).map((k, i) => (
              <span key={i} className="px-2.5 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-[11px] font-mono text-[#A1A1AA]">{cleanText(k)}</span>
            ))}
          </div>
          <strong className="text-white text-xs uppercase tracking-wider block mb-2">Hashtags</strong>
          <div className="font-mono text-[12px] text-[var(--color-brand-magenta)]">
            {formatHashtags(res.hashtags)}
          </div>
        </SectionCard>
      </div>
    </div>
  );

  const renderCarousel = (res: DesignContentResultV2Carousel) => (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard 
            title="Carousel Concept" 
            icon={MessageSquare} 
            copyText={`Title: ${res.coverTitle || ''}\n\nWHY THIS MATTERS: ${res.whyThisMatters || ''}\n\n${res.cta || ''}`} 
            copyLabel="Concept" 
            copyKey="carousel-concept"
          >
            <div className="space-y-4 text-[15px] leading-relaxed text-[#D4D4D8]">
              <div className="mb-2">
                <strong className="text-white text-xs font-mono uppercase tracking-wider">Slide 1 (Cover Title)</strong>
                <p className="text-2xl font-bold text-white mt-1">{cleanText(res.coverTitle)}</p>
              </div>
              <div className="bg-[var(--color-brand-violet)]/10 border border-[var(--color-brand-violet)]/20 rounded-lg p-3">
                <strong className="text-[var(--color-brand-lavender)] text-xs uppercase tracking-wider block mb-1">Why This Matters</strong>
                <p className="text-white italic text-sm">{cleanText(res.whyThisMatters)}</p>
              </div>
              <p className="font-semibold text-[var(--color-brand-lavender)] italic">{cleanText(res.cta)}</p>
            </div>
          </SectionCard>

          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden mt-6">
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/50">
              <h3 className="text-sm font-sora font-bold text-white flex items-center gap-2">
                <List className="w-4 h-4 text-[var(--color-brand-violet)]" />
                Platform Captions
              </h3>
              <button onClick={() => copyToClipboard(formatCaption(activeTab, res.captions?.[activeTab]) + '\n\n' + formatHashtags(res.hashtags), `${activeTab} Caption`, 'captions-carousel')} className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer">
                {activeCopiedKey === 'captions-carousel' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />} Copy Caption
              </button>
            </div>
            <div className="flex border-b border-[var(--color-border-primary)] overflow-x-auto custom-scrollbar">
              {(['linkedin', 'instagram', 'facebook', 'twitter', 'youtube'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-xs font-semibold capitalize transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab ? 'bg-[var(--color-brand-violet)]/10 text-white border-b-2 border-[var(--color-brand-violet)]' : 'text-[#A1A1AA] hover:bg-[var(--color-bg-primary)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8">
              <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar mb-6">
                <p className="text-sm text-white whitespace-pre-wrap leading-relaxed font-mono">{formatCaption(activeTab, res.captions?.[activeTab])}</p>
              </div>
              <div className="pt-6 border-t border-[var(--color-border-primary)]">
                <div className="flex items-center justify-between mb-3">
                  <strong className="text-[10px] uppercase text-[#A1A1AA] tracking-widest">Hashtags</strong>
                  <span className="text-[10px] font-mono text-[#71717A]">{formatCaption(activeTab, res.captions?.[activeTab]).length} Chars</span>
                </div>
                <p className="text-xs font-mono text-[var(--color-brand-violet)] leading-relaxed">{formatHashtags(res.hashtags)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SectionCard title="SEO & Tags" icon={Hash} copyText={formatHashtags(res.hashtags)} copyLabel="Tags" copyKey="tags">
            <strong className="text-white text-xs uppercase tracking-wider block mb-2">Keywords</strong>
            <div className="flex flex-wrap gap-2 mb-6">
              {(res.keywords || []).map((k, i) => (
                <span key={i} className="px-2.5 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-[11px] font-mono text-[#A1A1AA]">{cleanText(k)}</span>
              ))}
            </div>
            <strong className="text-white text-xs uppercase tracking-wider block mb-2">Hashtags</strong>
            <div className="font-mono text-[12px] text-[var(--color-brand-magenta)]">
              {formatHashtags(res.hashtags)}
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-sora font-bold text-xl text-white mt-4 border-b border-[var(--color-border-primary)] pb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--color-brand-violet)]" />
          Carousel Slides
        </h3>
        {(res.slides || []).map((slide, index) => (
          <div key={index} className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6 relative group">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] font-bold flex items-center justify-center text-sm font-mono shrink-0">
                  {index + 2}
                </div>
                <h4 className="font-sora font-bold text-lg text-white">{cleanText(slide.heading)}</h4>
              </div>
              <p className="text-[#D4D4D8] leading-relaxed ml-11">{cleanText(slide.description)}</p>
            </div>
            
            <div className="flex-1 bg-[var(--color-bg-primary)] rounded-xl p-5 border border-[var(--color-border-primary)] relative flex flex-col gap-5">
              {slide.imageText && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                      <Type className="w-4 h-4 text-[#1557FF]" />
                      Image Text
                    </strong>
                    <button
                      onClick={() => copyToClipboard(`${slide.imageText?.headline}\n${slide.imageText?.supporting || ''}`, `Slide ${index + 2} Text`, `text-${index}`)}
                      className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                    >
                      {activeCopiedKey === `text-${index}` ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="bg-[var(--color-bg-surface)] rounded-lg p-3 border border-[var(--color-border-primary)]">
                    <p className="text-sm font-sora font-bold text-white">{cleanText(slide.imageText.headline)}</p>
                    {slide.imageText.supporting && (
                      <p className="text-xs text-[#A1A1AA] mt-1">{cleanText(slide.imageText.supporting)}</p>
                    )}
                  </div>
                </div>
              )}
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <strong className="text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[var(--color-brand-magenta)]" />
                    Image Prompt
                  </strong>
                  <button
                    onClick={() => copyToClipboard(slide.imagePrompt, `Slide ${index + 2} Prompt`, `prompt-${index}`)}
                    className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                  >
                    {activeCopiedKey === `prompt-${index}` ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="font-mono text-[12px] text-[var(--color-brand-violet)] leading-relaxed bg-[var(--color-bg-surface)] p-3 rounded-lg border border-[var(--color-border-primary)]">
                  {cleanText(slide.imagePrompt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[var(--color-border-primary)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase">
                MODULE 02 / DESIGN PUBLISHER
              </span>
              {result.visualType && (
                <span className="px-3 py-1 rounded-full bg-[#1557FF]/15 border border-[#1557FF]/30 text-[#1557FF] text-[11px] font-mono font-semibold tracking-wide uppercase flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5" /> TYPE {result.visualType.toUpperCase()}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-sora font-extrabold text-[#FAFAFA] tracking-tight leading-snug">
              {cleanText(result.topicTitle || (result as any).coverTitle || 'Design Insight')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCreateAnother}
              className="px-6 py-2.5 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white text-sm font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              New Content
            </button>
          </div>
        </div>

        {result.format === 'single' ? renderSinglePost(result as DesignContentResultV2Single) : renderCarousel(result as DesignContentResultV2Carousel)}
      </div>
    </div>
  );
};
