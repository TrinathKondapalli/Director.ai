import React, { useState } from 'react';
import { UgcStudioResult } from '../types';
import { 
  Copy, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Video, 
  RotateCcw, 
  User, 
  Target, 
  Flame, 
  Sparkles, 
  Clock, 
  Layers, 
  MessageSquare, 
  Hash, 
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { BackgroundGlow } from './BackgroundGlow';
import { motion, AnimatePresence } from 'framer-motion';

interface UgcResultPageProps {
  result: UgcStudioResult;
  onCreateAnother: () => void;
}

export const UgcResultPage: React.FC<UgcResultPageProps> = ({ result, onCreateAnother }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCopiedKey, setActiveCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'instagram' | 'facebook' | 'twitter' | 'youtube'>('linkedin');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

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

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "director_ai_ugc_ad_result.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
        const threadStr = (captionObj.threadVersion || []).join('\n\n');
        resultText = `[ SINGLE TWEET ]\n${captionObj.singleTweet || ''}\n\n------------------------\n\n[ THREAD VERSION ]\n${threadStr}`;
        break;
      case 'youtube':
        resultText = `${captionObj.seoTitle || ''}\n\n${captionObj.description || ''}\n\nWhat You'll Learn:\n${(captionObj.whatYouWillLearn || []).map((t: string) => `• ${t}`).join('\n')}\n\nChapters:\n${(captionObj.chapters || []).join('\n')}\n\n${captionObj.cta || ''}\n\nKeywords: ${(captionObj.keywords || []).join(', ')}`;
        break;
      default:
        resultText = '';
    }
    return cleanText(resultText);
  };

  // Cohesive AI Video Prompt Compiler
  const getCohesiveVideoPrompt = (): string => {
    if (result.masterUgcPrompt) return cleanText(result.masterUgcPrompt);
    const p = result.videoPrompt || {};
    return cleanText(`Create a natural 10-second vertical UGC advertisement featuring a relatable ${result.creatorType || result.originalInput.targetAudience || 'creator'} recording themselves in an authentic environment.

0–2 seconds (HOOK):
Handheld selfie camera. Creator looks directly into camera with an engaging reaction and says: "${result.ugcStory?.hook || result.hook}"

2–4 seconds (PAIN):
Creator turns phone toward laptop/desk showing the frustration of dealing with ${result.problem}.

4–7 seconds (PRODUCT):
Creator quickly demonstrates using ${result.originalInput.brand || result.originalInput.product || 'the product'} to deliver ${result.solution}. The product interaction feels spontaneous and unscripted.

7–9 seconds (RESULT):
Problem is resolved. Creator looks back at camera genuinely relieved: "${result.ugcStory?.result || 'Honestly, it saved me hours of headache.'}"

9–10 seconds (CTA):
Creator points toward screen overlay: "${result.ugcStory?.cta || result.callToAction}"

Visual style:
Authentic creator-shot UGC, handheld smartphone footage (iPhone 15 Pro 4K 60fps), natural room lighting, realistic imperfections, casual clothing, believable facial expressions, natural pacing, non-commercial feeling.

Voice:
Conversational creator voice. Energetic at hook, relieved at result. Natural delivery, not an artificial announcer.

Audio:
Natural room ambience, subtle keyboard sounds, clean chime when the feature is demonstrated.

Format:
9:16 vertical. Duration: Exactly 10 seconds.

Negative:
No cinematic commercial look, no studio lighting, no perfect actors, no dramatic camera movements, no generic stock footage, no corporate presenter, no artificial announcer voice, no glossy advertisement look.`);
  };

  // Storyboard Items
  const storyboardItems = result.storyboardTimeline || [
    {
      stage: 'HOOK' as const,
      timeRange: '0–2s',
      whatWeSee: `Handheld selfie angle of creator looking directly into smartphone camera. ${result.hook}`,
      whatCreatorDoes: `Points at camera with engaging expression to grab immediate scroll attention.`,
      whatCreatorSays: `"${result.hook}"`,
      audioSfx: `Natural room tone, energetic visual pop effect`
    },
    {
      stage: 'PAIN' as const,
      timeRange: '2–4s',
      whatWeSee: `Close-up on creator's screen/workspace showing the frustrating problem.`,
      whatCreatorDoes: `Sighs or shakes head showing real frustration with ${result.problem}.`,
      whatCreatorSays: `"I was wasting hours dealing with ${result.problem} every single day."`,
      audioSfx: `Keyboard clicks, subtle frustration sound effect`
    },
    {
      stage: 'PRODUCT' as const,
      timeRange: '4–7s',
      whatWeSee: `Clean demonstration of ${result.originalInput.brand || result.originalInput.product} solving the problem.`,
      whatCreatorDoes: `Interacts with interface/product showing how fast ${result.solution} works.`,
      whatCreatorSays: `"Then I found ${result.originalInput.brand || result.originalInput.product}. It literally handles this in seconds."`,
      audioSfx: `Smooth UI click chime sound`
    },
    {
      stage: 'RESULT' as const,
      timeRange: '7–9s',
      whatWeSee: `Creator back on camera with a relieved, happy smile.`,
      whatCreatorDoes: `Leans back with a relaxed smile showing completed outcome.`,
      whatCreatorSays: `"Honestly, it saved me hours of headache this week."`,
      audioSfx: `Satisfying success chime sound`
    },
    {
      stage: 'CTA' as const,
      timeRange: '9–10s',
      whatWeSee: `Screen overlay with brand CTA link and creator pointing forward.`,
      whatCreatorDoes: `Nods confidently and points to the link on screen.`,
      whatCreatorSays: `"${result.callToAction}"`,
      audioSfx: `Clean end notification chime`
    }
  ];

  const ugcStoryObj = result.ugcStory || {
    hook: result.hook,
    pain: result.problem,
    product: result.solution,
    result: result.story || `Saves hours of friction instantly with verified results`,
    cta: result.callToAction
  };

  const copyStoryText = () => {
    const text = `UGC STORY (10 SECONDS)\n\n[0–2s HOOK]: ${ugcStoryObj.hook}\n[2–4s PAIN]: ${ugcStoryObj.pain}\n[4–7s PRODUCT]: ${ugcStoryObj.product}\n[7–9s RESULT]: ${ugcStoryObj.result}\n[9–10s CTA]: ${ugcStoryObj.cta}`;
    copyToClipboard(text, 'UGC Story', 'ugc_story');
  };

  const copyAllMarkdown = () => {
    const md = `# DIRECTOR.AI UGC AD CONCEPT: ${result.dailySuggestedTopic}\n\n` +
      `Brand: ${result.originalInput.brand || result.originalInput.product}\n` +
      `Creator Archetype: ${result.creatorType || 'Relatable Creator'}\n` +
      `Target Audience: ${result.originalInput.targetAudience}\n` +
      `Core Pain: ${result.problem}\n` +
      `Duration: 10 Seconds (Fixed)\n\n` +
      `## 02. THE UGC STORY\n` +
      `- HOOK (0–2s): ${ugcStoryObj.hook}\n` +
      `- PAIN (2–4s): ${ugcStoryObj.pain}\n` +
      `- PRODUCT (4–7s): ${ugcStoryObj.product}\n` +
      `- RESULT (7–9s): ${ugcStoryObj.result}\n` +
      `- CTA (9–10s): ${ugcStoryObj.cta}\n\n` +
      `## 03. 10-SECOND STORYBOARD\n` +
      storyboardItems.map(item => `[${item.timeRange} ${item.stage}]\nSEE: ${item.whatWeSee}\nDOES: ${item.whatCreatorDoes}\nSAYS: ${item.whatCreatorSays}\nAUDIO: ${item.audioSfx}`).join('\n\n') +
      `\n\n## 05. VIDEO GENERATION PROMPT\n${getCohesiveVideoPrompt()}\n\n` +
      `## 06. HASHTAGS & KEYWORDS\n${formatHashtags(result.seoHashtags)}\nKeywords: ${(result.primaryKeywords || []).join(', ')}`;
    copyToClipboard(md, 'Full UGC Ad Brief', 'copy_all');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden pb-40 flex justify-center selection:bg-[var(--color-brand-violet)]/30">
      <BackgroundGlow />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/50 text-[#FAFAFA] px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 font-mono text-xs sm:text-sm backdrop-blur-xl"
          >
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-4xl space-y-12 relative z-10 font-inter text-[#FAFAFA]">
        
        {/* PAGE HEADER */}
        <div className="border-b border-[var(--color-border-primary)] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase">
                UGC AD STUDIO
              </span>
              <span className="text-[11px] font-mono text-[#A1A1AA] uppercase border border-[#A1A1AA]/30 px-3 py-1 rounded-full">
                {result.originalInput.industry || 'Short-Form Video'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-sora font-extrabold text-white tracking-tight leading-snug">
              {cleanText(result.dailySuggestedTopic)}
            </h1>
          </div>

          <button
            onClick={onCreateAnother}
            className="px-6 py-2.5 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)]/80 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[var(--color-brand-violet)]/25 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Generate Another Ad
          </button>
        </div>

        {/* ========================================================= */}
        {/* 01 — UGC CONCEPT */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-brand-violet)]" />
              01 — UGC Concept
            </h2>
            <span className="text-[11px] font-mono text-[var(--color-brand-lavender)] bg-[var(--color-brand-violet)]/10 px-2.5 py-1 rounded-md border border-[var(--color-brand-violet)]/20">
              10s Short-Form Format
            </span>
          </div>

          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
            <div className="md:col-span-2 space-y-1">
              <strong className="block text-[10px] uppercase font-mono text-[var(--color-brand-violet)] tracking-widest">Ad Title</strong>
              <p className="text-lg font-bold text-white font-sora">{cleanText(result.dailySuggestedTopic)}</p>
            </div>

            <div>
              <strong className="block text-[10px] uppercase font-mono text-[var(--color-brand-violet)] tracking-widest">Product / Brand</strong>
              <p className="text-base font-semibold text-white">{cleanText(result.originalInput.brand || result.originalInput.product)}</p>
            </div>

            <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
              <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[var(--color-brand-violet)]" />
                Creator Archetype
              </strong>
              <p className="text-xs font-semibold text-white">{cleanText(result.creatorType || 'Relatable Target Audience Creator')}</p>
            </div>

            <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
              <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-wider mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[var(--color-brand-violet)]" />
                Target Audience
              </strong>
              <p className="text-xs text-[#E4E4E7]">{cleanText(result.originalInput.targetAudience)}</p>
            </div>

            <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
              <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-wider mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#EF4444]" />
                Core Pain Point
              </strong>
              <p className="text-xs text-[#E4E4E7]">{cleanText(result.problem)}</p>
            </div>

            <div className="md:col-span-2 bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
              <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-wider mb-1">Core Idea & Angle</strong>
              <p className="text-xs text-white font-medium">{cleanText(result.coreIdea || result.oneLineSummary)}</p>
            </div>

            <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)] flex items-center justify-between">
              <div>
                <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-wider mb-1">Tone & Vibe</strong>
                <p className="text-xs text-[var(--color-brand-lavender)] font-semibold">{cleanText(result.toneVibe || result.originalInput.tone || 'Authentic & Conversational')}</p>
              </div>
              <div className="text-right">
                <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-wider mb-1">Duration</strong>
                <p className="text-xs text-[#22C55E] font-mono font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 10s Fixed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 02 — THE UGC STORY */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[var(--color-brand-violet)]" />
              02 — The UGC Story
            </h2>
            <button
              onClick={copyStoryText}
              className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer"
            >
              {activeCopiedKey === 'ugc_story' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />} Copy Story
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* HOOK (0-2s) */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[var(--color-brand-violet)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[var(--color-brand-violet)]/20 text-[var(--color-brand-violet)] border border-[var(--color-brand-violet)]/30">
                  0–2s HOOK
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Stop Scroll</span>
              </div>
              <p className="text-sm font-semibold text-white leading-relaxed italic">"{cleanText(ugcStoryObj.hook)}"</p>
              <div className="text-[10px] text-[#A1A1AA] font-mono border-t border-[var(--color-border-primary)] pt-2">
                Hook attention immediately
              </div>
            </div>

            {/* PAIN (2-4s) */}
            <div className="bg-[var(--color-bg-surface)] border border-[#EF4444]/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#EF4444]/60 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
                  2–4s PAIN
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Relatable</span>
              </div>
              <p className="text-xs text-[#E4E4E7] leading-relaxed">{cleanText(ugcStoryObj.pain)}</p>
              <div className="text-[10px] text-[#A1A1AA] font-mono border-t border-[var(--color-border-primary)] pt-2">
                Expose real frustration
              </div>
            </div>

            {/* PRODUCT (4-7s) */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-brand-magenta)]/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[var(--color-brand-magenta)]/60 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[var(--color-brand-magenta)]/15 text-[var(--color-brand-magenta)] border border-[var(--color-brand-magenta)]/30">
                  4–7s PRODUCT
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Solution</span>
              </div>
              <p className="text-xs text-[#E4E4E7] leading-relaxed">{cleanText(ugcStoryObj.product)}</p>
              <div className="text-[10px] text-[#A1A1AA] font-mono border-t border-[var(--color-border-primary)] pt-2">
                Demonstrate in action
              </div>
            </div>

            {/* RESULT (7-9s) */}
            <div className="bg-[var(--color-bg-surface)] border border-[#3B82F6]/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#3B82F6]/60 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30">
                  7–9s RESULT
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Reaction</span>
              </div>
              <p className="text-xs text-[#E4E4E7] leading-relaxed">{cleanText(ugcStoryObj.result)}</p>
              <div className="text-[10px] text-[#A1A1AA] font-mono border-t border-[var(--color-border-primary)] pt-2">
                Personal relief/outcome
              </div>
            </div>

            {/* CTA (9-10s) */}
            <div className="bg-[var(--color-bg-surface)] border border-[#22C55E]/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#22C55E] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                  9–10s CTA
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA]">Natural</span>
              </div>
              <p className="text-xs font-semibold text-white leading-relaxed">{cleanText(ugcStoryObj.cta)}</p>
              <div className="text-[10px] text-[#A1A1AA] font-mono border-t border-[var(--color-border-primary)] pt-2">
                Short conversational CTA
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 — 10-SECOND STORYBOARD */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--color-brand-violet)]" />
              03 — 10-Second Storyboard
            </h2>
            <span className="text-xs font-mono text-[#A1A1AA]">
              5 Storyboard Cards
            </span>
          </div>

          <div className="space-y-4">
            {storyboardItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] hover:border-[var(--color-brand-violet)]/40 rounded-2xl p-5 md:p-6 shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] flex flex-col items-center justify-center font-mono shrink-0">
                    <span className="text-[10px] font-bold uppercase">{item.stage}</span>
                    <span className="text-[11px] font-extrabold text-white">{item.timeRange}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 w-full text-xs">
                  <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                    <strong className="block text-[9px] uppercase font-mono text-[var(--color-brand-violet)] tracking-wider mb-1">What We See</strong>
                    <p className="text-[#E4E4E7] leading-relaxed">{cleanText(item.whatWeSee)}</p>
                  </div>

                  <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                    <strong className="block text-[9px] uppercase font-mono text-[#A1A1AA] tracking-wider mb-1">What Creator Does</strong>
                    <p className="text-[#E4E4E7] leading-relaxed">{cleanText(item.whatCreatorDoes)}</p>
                  </div>

                  <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                    <strong className="block text-[9px] uppercase font-mono text-[var(--color-brand-lavender)] tracking-wider mb-1">What Creator Says</strong>
                    <p className="text-white italic leading-relaxed">{cleanText(item.whatCreatorSays)}</p>
                  </div>

                  <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                    <strong className="block text-[9px] uppercase font-mono text-[#22C55E] tracking-wider mb-1">Audio / SFX</strong>
                    <p className="text-[#E4E4E7] leading-relaxed">{cleanText(item.audioSfx)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 — PLATFORM CAPTIONS */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--color-brand-violet)]" />
              04 — Platform Captions
            </h2>
            <button 
              onClick={() => copyToClipboard(formatCaption(activeTab, result.captions?.[activeTab]) + '\n\n' + formatHashtags(result.seoHashtags), `${activeTab} Caption`, 'platform_caption')} 
              className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer"
            >
              {activeCopiedKey === 'platform_caption' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />} Copy Caption
            </button>
          </div>

          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-[var(--color-border-primary)] overflow-x-auto custom-scrollbar bg-[var(--color-bg-primary)]/50">
              {(['linkedin', 'instagram', 'facebook', 'twitter', 'youtube'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-[var(--color-brand-violet)]/10 text-white border-b-2 border-[var(--color-brand-violet)]' 
                      : 'text-[#A1A1AA] hover:bg-[var(--color-bg-primary)]'
                  }`}
                >
                  {tab === 'twitter' ? 'X / Twitter' : tab}
                </button>
              ))}
            </div>

            {/* Caption Text Box */}
            <div className="p-6 md:p-8">
              <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar mb-6">
                <p className="text-sm text-white whitespace-pre-wrap leading-relaxed font-mono">{formatCaption(activeTab, result.captions?.[activeTab])}</p>
              </div>

              <div className="pt-6 border-t border-[var(--color-border-primary)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <strong className="text-[10px] uppercase font-mono text-[#A1A1AA] tracking-widest">Hashtags</strong>
                <p className="text-xs font-mono text-[var(--color-brand-violet)] leading-relaxed">{formatHashtags(result.seoHashtags)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 — VIDEO GENERATION PROMPT */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
              <Video className="w-4 h-4 text-[var(--color-brand-violet)]" />
              05 — Video Generation Prompt
            </h2>
            <button 
              onClick={() => copyToClipboard(getCohesiveVideoPrompt(), 'Video Prompt', 'video_prompt')}
              className="px-3.5 py-1.5 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)]/80 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {activeCopiedKey === 'video_prompt' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />} Copy Video Prompt
            </button>
          </div>

          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/40 rounded-2xl p-6 md:p-8 shadow-xl space-y-4 relative">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--color-brand-violet)]">
              <span>Production-Ready AI Video Prompt (Veo 3, Runway Gen-4, Sora, Kling, Luma)</span>
              <span>10s Vertical (9:16)</span>
            </div>
            
            <div className="p-5 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl font-mono text-xs text-[#FAFAFA] leading-relaxed whitespace-pre-wrap">
              {getCohesiveVideoPrompt()}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 — SEO & HASHTAGS */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-2">
              <Hash className="w-4 h-4 text-[var(--color-brand-violet)]" />
              06 — SEO & Hashtags
            </h2>
            <button 
              onClick={() => copyToClipboard(formatHashtags(result.seoHashtags) + '\n\nKeywords: ' + (result.primaryKeywords || []).join(', '), 'SEO Tags', 'seo_tags')}
              className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer"
            >
              {activeCopiedKey === 'seo_tags' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />} Copy Tags
            </button>
          </div>

          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="text-white text-xs uppercase font-mono tracking-wider block mb-3">Primary Keywords</strong>
              <div className="flex flex-wrap gap-2">
                {(result.primaryKeywords || []).map((k, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-[11px] font-mono text-[#A1A1AA]">
                    {cleanText(k)}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <strong className="text-white text-xs uppercase font-mono tracking-wider block mb-3">Relevant Hashtags</strong>
              <div className="font-mono text-[12px] text-[var(--color-brand-magenta)] leading-relaxed">
                {formatHashtags(result.seoHashtags)}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 07 — ADVANCED PRODUCTION DETAILS (COLLAPSIBLE ACCORDION) */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full flex items-center justify-between bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] hover:border-[var(--color-brand-violet)]/50 rounded-2xl p-5 shadow-xl transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-[var(--color-brand-violet)]" />
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                  07 — Advanced Production Details
                </h3>
                <p className="text-[11px] text-[#A1A1AA]">Internal technical specs (Camera, Lens, Lighting, Technical Render Details)</p>
              </div>
            </div>
            {isAdvancedOpen ? <ChevronUp className="w-4 h-4 text-[#A1A1AA]" /> : <ChevronDown className="w-4 h-4 text-[#A1A1AA]" />}
          </button>

          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 space-y-6 shadow-xl font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                      <strong className="text-[10px] text-[var(--color-brand-violet)] uppercase block mb-1">Camera Angle</strong>
                      <p className="text-white">{result.videoPrompt?.cameraAngle || 'Handheld Selfie Shot'}</p>
                    </div>

                    <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                      <strong className="text-[10px] text-[var(--color-brand-violet)] uppercase block mb-1">Camera Lens</strong>
                      <p className="text-white">{result.videoPrompt?.cameraLens || '24mm Wide Lens'}</p>
                    </div>

                    <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                      <strong className="text-[10px] text-[var(--color-brand-violet)] uppercase block mb-1">Camera Movement</strong>
                      <p className="text-white">{result.videoPrompt?.cameraMovement || 'Handheld Organic Motion'}</p>
                    </div>

                    <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                      <strong className="text-[10px] text-[var(--color-brand-violet)] uppercase block mb-1">Lighting</strong>
                      <p className="text-white">{result.videoPrompt?.lighting || 'Natural Room Ambient'}</p>
                    </div>

                    <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                      <strong className="text-[10px] text-[var(--color-brand-violet)] uppercase block mb-1">Environment</strong>
                      <p className="text-white">{result.videoPrompt?.environment || 'Home Office / Workspace'}</p>
                    </div>

                    <div className="bg-[var(--color-bg-primary)] p-3 rounded-xl border border-[var(--color-border-primary)]">
                      <strong className="text-[10px] text-[var(--color-brand-violet)] uppercase block mb-1">Aspect Ratio & FPS</strong>
                      <p className="text-white">{result.videoPrompt?.aspectRatio || '9:16 Vertical'} @ {result.videoPrompt?.frameRate || '60 fps'}</p>
                    </div>
                  </div>

                  <div>
                    <strong className="text-[10px] text-[#EF4444] uppercase block mb-2">Negative Prompt</strong>
                    <p className="p-3 bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border-primary)] text-[#A1A1AA] text-[11px] leading-relaxed">
                      {result.videoPrompt?.negativePrompt || 'corporate commercial, TV ad, polished stock footage, professional studio lighting, artificial CGI render, broadcast advertisement, fake actors'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>

      {/* ========================================================= */}
      {/* 08 — BOTTOM STICKY ACTION BAR */}
      {/* ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-bg-surface)]/95 border-t border-[var(--color-border-primary)] backdrop-blur-xl px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
            <button
              onClick={copyAllMarkdown}
              className="px-4 py-2 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Copy className="w-3.5 h-3.5 text-[var(--color-brand-violet)]" /> Copy All
            </button>

            <button
              onClick={copyStoryText}
              className="px-4 py-2 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[var(--color-brand-violet)]" /> Copy Story
            </button>

            <button
              onClick={() => copyToClipboard(getCohesiveVideoPrompt(), 'Video Prompt', 'prompt_sticky')}
              className="px-4 py-2 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Video className="w-3.5 h-3.5 text-[var(--color-brand-violet)]" /> Copy Video Prompt
            </button>

            <button
              onClick={downloadJson}
              className="px-3.5 py-2 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-[#A1A1AA] hover:text-white text-xs font-mono rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              title="Download JSON"
            >
              <Download className="w-3.5 h-3.5" /> JSON
            </button>
          </div>

          <button
            onClick={onCreateAnother}
            className="px-6 py-2 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)]/80 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-[var(--color-brand-violet)]/25 flex items-center gap-2 cursor-pointer whitespace-nowrap ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Regenerate Ad
          </button>
        </div>
      </div>

    </div>
  );
};
