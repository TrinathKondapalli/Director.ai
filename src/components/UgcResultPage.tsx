import React, { useState } from 'react';
import { UgcStudioResult } from '../types';
import { Copy, CheckCircle2, ChevronDown, ChevronUp, Download, Video } from 'lucide-react';
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
  const [isPromptOpen, setIsPromptOpen] = useState(false);

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

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "director_ai_ugc_result.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportPdf = () => {
    window.print();
  };

  const copyMarkdown = () => {
    const md = `# ${result.dailySuggestedTopic}\n\n## 01. UGC Overview\nSummary: ${result.oneLineSummary}\nAudience: ${result.originalInput.targetAudience}\nPlatform: ${result.originalInput.platform}\nGoal: ${result.originalInput.goal}\n\n## 02. UGC Story Script\nHook: ${result.hook}\nProblem: ${result.problem}\nStory: ${result.story}\nSolution: ${result.solution}\nCTA: ${result.callToAction}\n\n## 03. Social Media Captions\nLinkedIn: ${result.captions.linkedin}\nInstagram: ${result.captions.instagram}\nFacebook: ${result.captions.facebook}\nTwitter/X: ${result.captions.twitter}\nYouTube: ${result.captions.youtube}\n\n## 04. Video Overview\nDuration: ${result.videoPrompt.duration}\nVideo Style: ${result.videoPrompt.cinematicStyle}\nTarget Emotion: ${result.videoPrompt.characterEmotions}\nVideo Objective: ${result.videoPrompt.sceneObjective}\nAspect Ratio: ${result.videoPrompt.aspectRatio}\nRendering Style: ${result.videoPrompt.renderingStyle}\n\n## 05. Complete Video Script\nVoiceover: ${result.voiceoverScript}\nDialogue: ${result.videoPrompt.dialogue}\n\n## 09. SEO\nPrimary: ${result.primaryKeywords.join(', ')}\nSecondary: ${result.secondaryKeywords.join(', ')}\nHashtags: ${result.seoHashtags.join(' ')}`;
    copyToClipboard(md, 'Markdown', 'markdown');
  };

  const copyAll = () => {
    copyMarkdown();
  };

  const formatCaption = (platform: string, captionObj: any) => {
    if (!captionObj) return '';
    if (typeof captionObj === 'string') return captionObj;
    
    switch (platform) {
      case 'linkedin':
        return `${captionObj.hook}\n\n${captionObj.context}\n\n${captionObj.mainInsight}\n\n${(captionObj.keyTakeaways || []).map((t: string) => `• ${t}`).join('\n')}\n\n${captionObj.cta}`;
      case 'instagram':
        return `${captionObj.hook}\n\n${captionObj.story}\n\n${captionObj.lesson}\n\n${captionObj.cta}`;
      case 'facebook':
        return `${captionObj.opening}\n\n${captionObj.problem}\n\n${captionObj.advice}\n\n${captionObj.example}\n\n${captionObj.question}`;
      case 'twitter':
        const threadStr = (captionObj.threadVersion || []).join('\n\n');
        return `[ SINGLE TWEET ]\n${captionObj.singleTweet}\n\n------------------------\n\n[ THREAD VERSION ]\n${threadStr}`;
      case 'youtube':
        return `${captionObj.seoTitle}\n\n${captionObj.description}\n\nWhat You'll Learn:\n${(captionObj.whatYouWillLearn || []).map((t: string) => `• ${t}`).join('\n')}\n\nChapters:\n${(captionObj.chapters || []).join('\n')}\n\n${captionObj.cta}\n\nKeywords: ${(captionObj.keywords || []).join(', ')}`;
      default:
        return '';
    }
  };

  const compileMasterPrompt = (p: any) => {
    if (!p) return '';
    return `[SCENE CONCEPT]: ${p.videoConcept} ${p.hook}
    
[SUBJECT]: ${p.characterDescription}, ${p.characterAppearance}, wearing ${p.characterClothing}. ${p.characterExpressions}. ${p.characterEmotions}. Action: ${p.characterActions}.

[CAMERA & FRAMING]: ${p.cameraAngle} shot, ${p.cameraDistance} on a ${p.cameraLens}. ${p.cameraMovement}. ${p.framing}.

[ENVIRONMENT]: ${p.environment}. ${p.background}. Lighting: ${p.lighting}. Props: ${p.props}.

[CINEMATOGRAPHY]: ${p.cinematicStyle}, ${p.visualStyle}, ${p.colorPalette} color palette. ${p.composition}.

[TECHNICAL]: ${p.renderingStyle}, ${p.videoQuality}, ${p.aspectRatio}, ${p.frameRate}. Duration: ${p.duration}.

[AUDIO]: ${p.backgroundMusic}, ${p.soundEffects}, ${p.ambientSounds}. Voice: ${p.voiceGender}, ${p.voiceEmotion}, ${p.voiceSpeed} (${p.accent}).

[NEGATIVE PROMPT]: ${p.negativePrompt}`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden pb-32 flex justify-center">
      <BackgroundGlow />
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-6 z-50 bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/50 text-[#FAFAFA] px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-3 font-mono text-sm backdrop-blur-xl print:hidden"
          >
            <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-violet)]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-4xl space-y-12 relative z-10 font-inter text-[#FAFAFA]">
        
        {/* ========================================================= */}
        {/* PAGE HEADER */}
        {/* ========================================================= */}
        <div className="border-b border-[var(--color-border-primary)] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase">
                UGC STUDIO
              </span>
              <span className="text-[11px] font-mono text-[#A1A1AA] uppercase border border-[#A1A1AA]/30 px-3 py-1 rounded-full">
                {result.originalInput.industry}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-sora font-extrabold text-[#FAFAFA] tracking-tight">{result.dailySuggestedTopic}</h1>
            <p className="text-xs text-[#71717A] mt-3 font-mono">GENERATED AT: {new Date(result.generatedAt).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <button onClick={copyAll} className="px-4 py-2 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-sm font-semibold rounded-lg transition-all flex items-center gap-2">
              <Copy className="w-4 h-4" /> Copy All
            </button>
            <button onClick={onCreateAnother} className="px-4 py-2 bg-[var(--color-brand-violet)] hover:bg-[#7C3AED] text-white text-sm font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              Regenerate
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 01. UGC OVERVIEW */}
        {/* ========================================================= */}
        <section>
          <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A] mb-4">01. UGC Overview</h2>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl">
            <div className="md:col-span-2">
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">Topic</strong>
              <p className="text-xl font-medium text-white">{result.dailySuggestedTopic}</p>
            </div>
            <div className="md:col-span-2">
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">One-Line Summary</strong>
              <p className="text-sm text-[#E4E4E7] leading-relaxed">{result.oneLineSummary}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">Target Audience</strong>
              <p className="text-sm text-[#E4E4E7]">{result.originalInput.targetAudience}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">Platform</strong>
              <p className="text-sm text-[#E4E4E7] capitalize">{result.originalInput.platform}</p>
            </div>
            <div className="md:col-span-2">
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">Goal</strong>
              <p className="text-sm text-[#E4E4E7]">{result.originalInput.goal}</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 02. UGC STORY SCRIPT */}
        {/* ========================================================= */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A]">02. UGC Story Script</h2>
            <button onClick={() => copyToClipboard(`Hook: ${result.hook}\nProblem: ${result.problem}\nStory: ${result.story}\nSolution: ${result.solution}\nCTA: ${result.callToAction}`, 'Story Script', 'script')} className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors print:hidden">
              <Copy className="w-3.5 h-3.5" /> Copy Script
            </button>
          </div>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            <div>
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">Hook</strong>
              <p className="text-sm text-white italic">"{result.hook}"</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-2">Problem</strong>
              <p className="text-sm text-[#E4E4E7]">{result.problem}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-2">Story</strong>
              <p className="text-sm text-[#E4E4E7]">{result.story}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-2">Solution</strong>
              <p className="text-sm text-[#E4E4E7]">{result.solution}</p>
            </div>
            <div className="p-4 bg-[var(--color-brand-violet)]/10 rounded-xl border border-[var(--color-brand-violet)]/20">
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">Call To Action</strong>
              <p className="text-sm font-semibold text-white">{result.callToAction}</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03. SOCIAL MEDIA CAPTIONS */}
        {/* ========================================================= */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A]">03. Social Media Captions</h2>
            <button onClick={() => copyToClipboard(formatCaption(activeTab, result.captions[activeTab]) + '\n\n' + result.seoHashtags.join(' '), 'Caption', 'caption')} className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors print:hidden">
              <Copy className="w-3.5 h-3.5" /> Copy Caption
            </button>
          </div>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden">
            <div className="flex border-b border-[var(--color-border-primary)] overflow-x-auto custom-scrollbar">
              {(['linkedin', 'instagram', 'facebook', 'twitter', 'youtube'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-xs font-semibold capitalize transition-colors whitespace-nowrap ${
                    activeTab === tab ? 'bg-[var(--color-brand-violet)]/10 text-white border-b-2 border-[var(--color-brand-violet)]' : 'text-[#A1A1AA] hover:bg-[var(--color-bg-primary)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8">
              <p className="text-sm text-white whitespace-pre-wrap leading-relaxed mb-6 font-mono">{formatCaption(activeTab, result.captions[activeTab])}</p>
              <div className="pt-6 border-t border-[var(--color-border-primary)]">
                <div className="flex items-center justify-between mb-3">
                  <strong className="text-[10px] uppercase text-[#A1A1AA] tracking-widest">Hashtags</strong>
                  <span className="text-[10px] font-mono text-[#71717A]">{formatCaption(activeTab, result.captions[activeTab]).length} Chars</span>
                </div>
                <p className="text-xs font-mono text-[var(--color-brand-violet)] leading-relaxed">{result.seoHashtags.join(' ')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04. VIDEO OVERVIEW */}
        {/* ========================================================= */}
        <section>
          <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A] mb-4">04. Video Overview</h2>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-3 gap-6 shadow-xl">
            <div className="col-span-2 sm:col-span-3">
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-1">Video Title</strong>
              <p className="text-sm text-white font-medium">{result.dailySuggestedTopic}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-1">Duration</strong>
              <p className="text-xs text-[#E4E4E7] px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded inline-block">{result.videoPrompt.duration}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-1">Aspect Ratio</strong>
              <p className="text-xs text-[#E4E4E7] px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded inline-block">{result.videoPrompt.aspectRatio}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-1">Video Style</strong>
              <p className="text-xs text-[#E4E4E7] truncate">{result.videoPrompt.cinematicStyle}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-1">Target Emotion</strong>
              <p className="text-xs text-[#E4E4E7] truncate">{result.videoPrompt.characterEmotions}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-1">Objective</strong>
              <p className="text-xs text-[#E4E4E7] truncate" title={result.videoPrompt.sceneObjective}>{result.videoPrompt.sceneObjective}</p>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-1">Rendering</strong>
              <p className="text-xs text-[#E4E4E7] truncate">{result.videoPrompt.renderingStyle}</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05. COMPLETE VIDEO SCRIPT */}
        {/* ========================================================= */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A]">05. Complete Video Script</h2>
            <button onClick={() => copyToClipboard(result.voiceoverScript, 'Script', 'vo')} className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors print:hidden">
              <Copy className="w-3.5 h-3.5" /> Copy Script
            </button>
          </div>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">Voiceover Script</strong>
                <p className="text-sm text-white italic">"{result.voiceoverScript}"</p>
              </div>
              {result.videoPrompt.dialogue !== "None." && result.videoPrompt.dialogue !== "None" && (
                <div>
                  <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-2">Dialogue</strong>
                  <p className="text-sm text-white">{result.videoPrompt.dialogue}</p>
                </div>
              )}
            </div>
            <div className="bg-[var(--color-bg-primary)] border-t border-[var(--color-border-primary)] p-6">
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-4">Scene Timing</strong>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.videoScriptTimeline.map((item, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-[var(--color-brand-violet)] border border-[var(--color-brand-violet)]/30 bg-[var(--color-brand-violet)]/10 rounded px-2 py-0.5 inline-block self-start mb-3">{item.time}</span>
                    <p className="text-xs text-[#E4E4E7] mb-2">{item.action}</p>
                    <p className="text-xs text-white italic opacity-80 mt-auto pt-2 border-t border-[var(--color-border-primary)]">🎤 "{item.audio}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06. SHOT LIST */}
        {/* ========================================================= */}
        <section>
          <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A] mb-4">06. Shot List</h2>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-border-primary)] before:to-transparent">
            {result.shotList.map((shot, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--color-bg-primary)] bg-[var(--color-brand-violet)] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="text-xs font-mono font-bold">{idx + 1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl shadow-xl transition-all group-hover:border-[var(--color-brand-violet)]/50">
                  <h4 className="text-sm font-bold text-white mb-3">{shot.sceneNumber}</h4>
                  <p className="text-xs text-[#E4E4E7] mb-4">{shot.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-[var(--color-bg-primary)] rounded p-2 border border-[var(--color-border-primary)]">
                      <span className="block text-[8px] uppercase text-[#A1A1AA] mb-0.5">Camera</span>
                      <span className="text-[10px] text-white truncate block" title={shot.camera}>{shot.camera}</span>
                    </div>
                    <div className="bg-[var(--color-bg-primary)] rounded p-2 border border-[var(--color-border-primary)]">
                      <span className="block text-[8px] uppercase text-[#A1A1AA] mb-0.5">Movement</span>
                      <span className="text-[10px] text-white truncate block" title={shot.movement}>{shot.movement}</span>
                    </div>
                    <div className="bg-[var(--color-bg-primary)] rounded p-2 border border-[var(--color-border-primary)]">
                      <span className="block text-[8px] uppercase text-[#A1A1AA] mb-0.5">SFX</span>
                      <span className="text-[10px] text-[var(--color-brand-violet)] truncate block" title={shot.sfx}>{shot.sfx}</span>
                    </div>
                    <div className="bg-[var(--color-bg-primary)] rounded p-2 border border-[var(--color-border-primary)]">
                      <span className="block text-[8px] uppercase text-[#A1A1AA] mb-0.5">Transition</span>
                      <span className="text-[10px] text-[#22C55E] truncate block" title={shot.transition}>{shot.transition}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 07. CINEMATIC PROMPT */}
        {/* ========================================================= */}
        <section>
          <div 
            onClick={() => setIsPromptOpen(!isPromptOpen)}
            className="flex items-center justify-between bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] hover:border-[var(--color-brand-violet)]/50 rounded-2xl p-6 shadow-xl cursor-pointer transition-all"
          >
            <div>
              <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-white mb-1">07. Cinematic Prompt</h2>
              <p className="text-xs text-[#71717A]">41-Parameter Director Level AI Video Prompt</p>
            </div>
            {isPromptOpen ? <ChevronUp className="text-[#A1A1AA]" /> : <ChevronDown className="text-[#A1A1AA]" />}
          </div>
          
          <AnimatePresence>
            {isPromptOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] border-t-0 rounded-b-2xl p-6 md:p-8 space-y-8 -mt-2 pt-8">
                  
                  {/* MASTER PROMPT BLOCK */}
                  <div className="bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/30 rounded-xl overflow-hidden shadow-lg relative group">
                    <div className="flex items-center justify-between bg-[var(--color-brand-violet)]/10 px-4 py-3 border-b border-[var(--color-brand-violet)]/20">
                      <strong className="text-xs uppercase text-[var(--color-brand-violet)] tracking-widest flex items-center gap-2">
                        <Video className="w-3.5 h-3.5" />
                        Master Video Prompt
                      </strong>
                      <button onClick={() => copyToClipboard(compileMasterPrompt(result.videoPrompt), 'Master Prompt', 'cinematic_prompt')} className="px-3 py-1.5 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)]/80 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5">
                        <Copy className="w-3 h-3" /> Copy Master Prompt
                      </button>
                    </div>
                    <div className="p-5 font-mono text-xs text-[#E4E4E7] leading-relaxed whitespace-pre-wrap">
                      {compileMasterPrompt(result.videoPrompt)}
                    </div>
                  </div>

                  <h3 className="text-sm font-sora font-bold text-white border-b border-[var(--color-border-primary)] pb-3">41-Parameter Breakdown</h3>
                  
                  {[
                    {
                      title: "Character",
                      keys: ["characterDescription", "characterAppearance", "characterClothing", "characterExpressions", "characterEmotions", "characterActions"]
                    },
                    {
                      title: "Environment & Lighting",
                      keys: ["lighting", "environment", "background", "props"]
                    },
                    {
                      title: "Camera & Composition",
                      keys: ["cameraAngle", "cameraMovement", "cameraLens", "cameraDistance", "framing", "composition"]
                    },
                    {
                      title: "Style & Motion",
                      keys: ["colorPalette", "cinematicStyle", "visualStyle", "transition", "motionDetails"]
                    }
                  ].map((category, idx) => (
                    <div key={idx}>
                      <h4 className="text-[11px] uppercase tracking-widest text-[#71717A] mb-3">{category.title}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {category.keys.map((key) => {
                          const val = result.videoPrompt[key as keyof typeof result.videoPrompt];
                          if (!val) return null;
                          return (
                            <div key={key} className="bg-[var(--color-bg-surface)] p-3 rounded-lg border border-[var(--color-border-primary)]">
                              <strong className="block text-[9px] uppercase text-[var(--color-brand-violet)] tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</strong>
                              <span className="text-xs text-[#E4E4E7] leading-relaxed">{String(val)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-[#EF4444] mb-3">Negative Prompt</h4>
                    <p className="text-xs text-white p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl leading-relaxed">{result.videoPrompt.negativePrompt}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ========================================================= */}
        {/* 08. THUMBNAIL */}
        {/* ========================================================= */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A]">08. Thumbnail</h2>
            <button onClick={() => copyToClipboard(result.thumbnailPrompt, 'Thumbnail Prompt', 'thumb')} className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors print:hidden">
              <Copy className="w-3.5 h-3.5" /> Copy Prompt
            </button>
          </div>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 shadow-xl">
            <div className="mb-4">
              <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-2">Thumbnail Prompt</strong>
              <p className="text-sm text-white italic">"{result.thumbnailPrompt}"</p>
            </div>
            <div className="p-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-lg">
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-1">Thumbnail Style</strong>
              <p className="text-xs text-[#E4E4E7]">{result.thumbnailStyle}</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 09. SEO */}
        {/* ========================================================= */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A]">09. SEO</h2>
            <button onClick={() => copyToClipboard([...result.primaryKeywords, ...result.secondaryKeywords, ...result.seoHashtags].join(', '), 'Keywords', 'seo')} className="text-[var(--color-brand-violet)] hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors print:hidden">
              <Copy className="w-3.5 h-3.5" /> Copy All
            </button>
          </div>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-3">Primary Keywords</strong>
              <div className="flex flex-wrap gap-2">
                {result.primaryKeywords.map((k, i) => <span key={i} className="px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded text-[10px] text-white">{k}</span>)}
              </div>
            </div>
            <div>
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-3">Secondary Keywords</strong>
              <div className="flex flex-wrap gap-2">
                {result.secondaryKeywords.map((k, i) => <span key={i} className="px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded text-[10px] text-white">{k}</span>)}
              </div>
            </div>
            <div className="md:col-span-2">
              <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-widest mb-3">Hashtags</strong>
              <p className="text-xs font-mono text-[var(--color-brand-violet)] leading-relaxed">{result.seoHashtags.join(' ')}</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10. EXPORT */}
        {/* ========================================================= */}
        <section className="print:hidden">
          <h2 className="text-sm font-sora font-bold uppercase tracking-widest text-[#71717A] mb-4 border-t border-[var(--color-border-primary)] pt-8">10. Export</h2>
          <div className="flex flex-wrap gap-4">
            <button onClick={downloadJson} className="px-6 py-3 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Download JSON
            </button>
            <button onClick={copyAll} className="px-6 py-3 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
              <Copy className="w-4 h-4" /> Copy All
            </button>
            <button onClick={exportPdf} className="px-6 py-3 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button onClick={copyMarkdown} className="px-6 py-3 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
              <Copy className="w-4 h-4" /> Export Markdown
            </button>
            <button onClick={onCreateAnother} className="px-6 py-3 bg-[var(--color-brand-violet)] hover:bg-[#7C3AED] rounded-xl text-sm font-semibold text-white transition-colors ml-auto shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              Generate Again
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
