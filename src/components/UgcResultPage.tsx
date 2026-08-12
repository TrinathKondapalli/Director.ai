import React, { useState } from 'react';
import { UgcStudioResult } from '../types';
import { 
  Copy, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  RotateCcw, 
  Send, 
  Save
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
    return text.replace(/[-–]/g, '-');
  };

  const formatHashtags = (tags?: string[]): string => {
    if (!tags || !Array.isArray(tags)) return '';
    return tags
      .map(t => {
        const clean = t.trim().replace(/[-–]/g, '-');
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

  const getCohesiveVideoPrompt = (): string => {
    if (result.masterUgcPrompt) return cleanText(result.masterUgcPrompt);
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

  const SectionHeader = ({ number, title }: { number: string; title: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-3xl md:text-4xl font-sora font-extrabold text-[#3F3F46]">{number}</span>
      <h2 className="text-xl md:text-2xl font-sora font-bold text-white tracking-widest uppercase">{title}</h2>
    </div>
  );

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

      <div className="w-full max-w-[1000px] relative z-10 flex flex-col gap-16 sm:gap-24 font-inter">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-6 pb-12 border-b border-[var(--color-border-primary)]/50">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-[10px] font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">DIRECTOR.AI</h1>
            <h2 className="text-3xl sm:text-5xl font-sora font-extrabold text-white tracking-tight leading-tight max-w-3xl">
              {cleanText(result.dailySuggestedTopic)}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-mono font-semibold tracking-widest uppercase text-[#A1A1AA]">
                {result.originalInput.industry || 'Short-Form Video'} · 10S FORMAT
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={onCreateAnother}
              className="px-6 py-3 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Regenerate Ad
            </button>
          </div>
        </div>

        {/* 01 - UGC BRIEF */}
        <section>
          <SectionHeader number="01" title="UGC Brief" />
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-8 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
               <div>
                  <strong className="block text-xs uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Creator</strong>
                  <p className="text-white text-lg">{cleanText(result.creatorType || 'Relatable Target Audience Creator')}</p>
               </div>
               <div>
                  <strong className="block text-xs uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Audience</strong>
                  <p className="text-[#D4D4D8] text-lg">{cleanText(result.originalInput.targetAudience)}</p>
               </div>
               <div>
                  <strong className="block text-xs uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Pain Point</strong>
                  <p className="text-[#D4D4D8] text-lg leading-relaxed">{cleanText(result.problem)}</p>
               </div>
               <div>
                  <strong className="block text-xs uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Core Angle</strong>
                  <p className="text-[#D4D4D8] text-lg leading-relaxed">{cleanText(result.coreIdea || result.oneLineSummary)}</p>
               </div>
               <div>
                  <strong className="block text-xs uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Product / Brand</strong>
                  <p className="text-white font-semibold text-lg">{cleanText(result.originalInput.brand || result.originalInput.product)}</p>
               </div>
               <div>
                  <strong className="block text-xs uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Tone & Vibe</strong>
                  <p className="text-[var(--color-brand-lavender)] text-lg">{cleanText(result.toneVibe || result.originalInput.tone || 'Authentic & Conversational')}</p>
               </div>
            </div>
          </div>
        </section>

        {/* 02 - UGC STORY */}
        <section>
          <SectionHeader number="02" title="UGC Story" />
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col gap-10">
             
             <div className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                <div className="md:w-32 shrink-0 border-l-2 border-[var(--color-brand-violet)] pl-4">
                   <strong className="text-sm font-mono text-[var(--color-brand-violet)] uppercase tracking-wider block mb-1">Hook</strong>
                   <span className="text-xs text-[#A1A1AA] font-mono">0–2s</span>
                </div>
                <div>
                   <p className="text-white text-lg sm:text-xl font-medium leading-relaxed italic mb-2">"{cleanText(ugcStoryObj.hook)}"</p>
                   <p className="text-sm text-[#A1A1AA]">Grab immediate attention.</p>
                </div>
             </div>

             <div className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                <div className="md:w-32 shrink-0 border-l-2 border-[#EF4444] pl-4">
                   <strong className="text-sm font-mono text-[#EF4444] uppercase tracking-wider block mb-1">Problem</strong>
                   <span className="text-xs text-[#A1A1AA] font-mono">2–4s</span>
                </div>
                <div>
                   <p className="text-[#D4D4D8] text-lg leading-relaxed mb-2">{cleanText(ugcStoryObj.pain)}</p>
                   <p className="text-sm text-[#A1A1AA]">Expose real frustration.</p>
                </div>
             </div>

             <div className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                <div className="md:w-32 shrink-0 border-l-2 border-[#3B82F6] pl-4">
                   <strong className="text-sm font-mono text-[#3B82F6] uppercase tracking-wider block mb-1">Product</strong>
                   <span className="text-xs text-[#A1A1AA] font-mono">4–7s</span>
                </div>
                <div>
                   <p className="text-[#D4D4D8] text-lg leading-relaxed mb-2">{cleanText(ugcStoryObj.product)}</p>
                   <p className="text-sm text-[#A1A1AA]">Demonstrate the solution in action.</p>
                </div>
             </div>

             <div className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                <div className="md:w-32 shrink-0 border-l-2 border-[var(--color-brand-magenta)] pl-4">
                   <strong className="text-sm font-mono text-[var(--color-brand-magenta)] uppercase tracking-wider block mb-1">Result</strong>
                   <span className="text-xs text-[#A1A1AA] font-mono">7–9s</span>
                </div>
                <div>
                   <p className="text-[#D4D4D8] text-lg leading-relaxed mb-2">{cleanText(ugcStoryObj.result)}</p>
                   <p className="text-sm text-[#A1A1AA]">Personal relief and positive outcome.</p>
                </div>
             </div>

             <div className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                <div className="md:w-32 shrink-0 border-l-2 border-[#22C55E] pl-4">
                   <strong className="text-sm font-mono text-[#22C55E] uppercase tracking-wider block mb-1">CTA</strong>
                   <span className="text-xs text-[#A1A1AA] font-mono">9–10s</span>
                </div>
                <div>
                   <p className="text-white text-lg font-medium leading-relaxed mb-2">{cleanText(ugcStoryObj.cta)}</p>
                   <p className="text-sm text-[#A1A1AA]">Clear next step.</p>
                </div>
             </div>

          </div>
        </section>

        {/* 03 - 10-SECOND STORYBOARD */}
        <section>
          <SectionHeader number="03" title="10-Second Storyboard" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {storyboardItems.map((item, idx) => (
              <div key={idx} className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 shadow-xl flex flex-col gap-6">
                 <div className="border-b border-[var(--color-border-primary)] pb-4">
                    <strong className="text-lg font-sora font-bold text-white block">{item.stage}</strong>
                    <span className="text-xs font-mono text-[#A1A1AA]">{item.timeRange}</span>
                 </div>
                 <div className="flex flex-col gap-5">
                    <div>
                       <strong className="text-[10px] font-mono uppercase text-[#A1A1AA] tracking-widest block mb-1">See</strong>
                       <p className="text-sm text-[#D4D4D8] leading-relaxed">{cleanText(item.whatWeSee)}</p>
                    </div>
                    <div>
                       <strong className="text-[10px] font-mono uppercase text-[#A1A1AA] tracking-widest block mb-1">Do</strong>
                       <p className="text-sm text-[#D4D4D8] leading-relaxed">{cleanText(item.whatCreatorDoes)}</p>
                    </div>
                    <div>
                       <strong className="text-[10px] font-mono uppercase text-[#A1A1AA] tracking-widest block mb-1">Say</strong>
                       <p className="text-sm text-[var(--color-brand-lavender)] italic leading-relaxed">"{cleanText(item.whatCreatorSays)}"</p>
                    </div>
                    <div>
                       <strong className="text-[10px] font-mono uppercase text-[#A1A1AA] tracking-widest block mb-1">Audio</strong>
                       <p className="text-sm text-[#A1A1AA] leading-relaxed">{cleanText(item.audioSfx)}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 - PLATFORM CAPTIONS */}
        <section>
          <SectionHeader number="04" title="Platform Captions" />
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden">
            <div className="flex border-b border-[var(--color-border-primary)] overflow-x-auto custom-scrollbar">
              {(['linkedin', 'instagram', 'facebook', 'twitter', 'youtube'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-5 text-sm font-semibold capitalize transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab ? 'bg-[var(--color-brand-violet)]/10 text-white border-b-2 border-[var(--color-brand-violet)]' : 'text-[#A1A1AA] hover:bg-[var(--color-bg-primary)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8">
              <div className="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar mb-8">
                <p className="text-lg text-[#D4D4D8] whitespace-pre-wrap leading-relaxed">{formatCaption(activeTab, result.captions?.[activeTab])}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-primary)]">
                 <span className="text-sm font-mono text-[#71717A]">{formatCaption(activeTab, result.captions?.[activeTab]).length} Characters</span>
                 <button 
                   onClick={() => copyToClipboard(formatCaption(activeTab, result.captions?.[activeTab]) + '\n\n' + formatHashtags(result.seoHashtags), `${activeTab} Caption`, 'caption')} 
                   className="px-6 py-3 bg-[var(--color-bg-primary)] hover:bg-[#18181B] border border-[var(--color-border-primary)] rounded-lg text-sm font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer"
                 >
                    {activeCopiedKey === 'caption' ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />} Copy Caption
                 </button>
              </div>
            </div>
          </div>
        </section>

        {/* 05 - VIDEO GENERATION PROMPT */}
        <section>
          <SectionHeader number="05" title="Video Generation Prompt" />
          <div className="bg-[#050505] border border-[var(--color-border-primary)] rounded-2xl overflow-hidden flex flex-col shadow-xl">
             <div className="p-8 overflow-y-auto custom-scrollbar max-h-[500px]">
               <p className="font-mono text-sm md:text-base text-[var(--color-brand-violet)] leading-loose whitespace-pre-wrap">{getCohesiveVideoPrompt()}</p>
             </div>
             <div className="bg-[var(--color-bg-surface)] p-6 border-t border-[var(--color-border-primary)] flex items-center justify-between gap-4">
                <button 
                  onClick={() => copyToClipboard(getCohesiveVideoPrompt(), 'Video Prompt', 'video_prompt')} 
                  className="px-6 py-3 bg-[var(--color-bg-primary)] hover:bg-[#18181B] border border-[var(--color-border-primary)] rounded-lg text-sm font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer"
                >
                   {activeCopiedKey === 'video_prompt' ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />} Copy Prompt
                </button>
                <button className="px-6 py-3 bg-transparent border border-[var(--color-border-primary)] hover:bg-[var(--color-border-primary)] rounded-lg text-sm font-semibold text-white transition-colors cursor-pointer hidden sm:block">
                  Edit Prompt
                </button>
             </div>
          </div>
        </section>

        {/* 06 - SEO & HASHTAGS */}
        <section>
          <SectionHeader number="06" title="SEO & Hashtags" />
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-8 shadow-xl">
            <div className="mb-8">
              <strong className="text-white text-xs uppercase tracking-widest block mb-4 font-mono">Primary Keywords</strong>
              <div className="flex flex-wrap gap-3">
                {(result.primaryKeywords || []).map((k, i) => (
                  <span key={i} className="px-4 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-lg text-sm text-[#D4D4D8]">{cleanText(k)}</span>
                ))}
              </div>
            </div>
            <div>
              <strong className="text-white text-xs uppercase tracking-widest block mb-4 font-mono">Relevant Hashtags</strong>
              <div className="font-mono text-sm sm:text-base text-[var(--color-brand-violet)] leading-relaxed">
                {formatHashtags(result.seoHashtags)}
              </div>
            </div>
          </div>
        </section>

        {/* 07 - ADVANCED PRODUCTION DETAILS */}
        <section>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden">
             <button 
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[var(--color-bg-primary)] transition-colors cursor-pointer"
             >
                <div>
                   <h2 className="text-xl font-sora font-bold text-white uppercase tracking-widest flex items-center gap-3">
                      07 Advanced Production Details
                   </h2>
                   <p className="text-sm text-[#A1A1AA] mt-2 font-mono">Camera · Lighting · Voice · Audio · SFX · Negative Prompt</p>
                </div>
                {isAdvancedOpen ? <ChevronUp className="w-6 h-6 text-[#A1A1AA]" /> : <ChevronDown className="w-6 h-6 text-[#A1A1AA]" />}
             </button>
             
             {isAdvancedOpen && (
                <div className="px-8 pb-8 pt-4 border-t border-[var(--color-border-primary)] grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div>
                      <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Camera</strong>
                      <p className="text-[#D4D4D8] text-sm leading-relaxed">{cleanText(result.visualStyle?.camera || 'Handheld smartphone footage (iPhone 15 Pro 4K 60fps)')}</p>
                   </div>
                   <div>
                      <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Lighting</strong>
                      <p className="text-[#D4D4D8] text-sm leading-relaxed">{cleanText(result.visualStyle?.lighting || 'Natural room lighting, realistic imperfections')}</p>
                   </div>
                   <div>
                      <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Voice</strong>
                      <p className="text-[#D4D4D8] text-sm leading-relaxed">{cleanText(result.voiceAndAudio?.voice || 'Conversational creator voice, natural delivery')}</p>
                   </div>
                   <div>
                      <strong className="block text-[10px] uppercase font-mono text-[#A1A1AA] tracking-widest mb-2">Audio / SFX</strong>
                      <p className="text-[#D4D4D8] text-sm leading-relaxed">{cleanText(result.voiceAndAudio?.sfx || 'Natural room ambience')}</p>
                   </div>
                   <div className="sm:col-span-2 bg-[#050505] p-5 rounded-xl border border-[var(--color-border-primary)]">
                      <strong className="block text-[10px] uppercase font-mono text-[#EF4444] tracking-widest mb-2">Negative Prompt</strong>
                      <p className="text-[#A1A1AA] text-sm leading-relaxed font-mono">{cleanText(result.negativePrompt || 'No cinematic commercial look, no studio lighting, no perfect actors, no artificial announcer voice')}</p>
                   </div>
                </div>
             )}
          </div>
        </section>

        {/* PUBLISHING / EXPORT */}
        <section className="pt-8 border-t border-[var(--color-border-primary)]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="w-full sm:w-auto text-center sm:text-left">
             <strong className="text-white text-lg font-sora block mb-1">Ready to produce?</strong>
             <p className="text-[#A1A1AA] text-sm">Save your brief or export to a video generation tool.</p>
           </div>
           <div className="flex w-full sm:w-auto flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-6 py-3.5 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <Save className="w-4 h-4" /> Save Draft
              </button>
              <button 
                onClick={downloadJson}
                className="w-full sm:w-auto px-6 py-3.5 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download JSON
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-100 text-black font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xl cursor-pointer">
                <Send className="w-4 h-4" /> Publish
              </button>
           </div>
        </section>
      </div>
    </div>
  );
};
