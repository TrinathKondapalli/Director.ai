import React, { useState } from 'react';
import { UgcStudioResult } from '../types';
import { Copy, CheckCircle2, Video, MessageSquare, Hash, PenTool, Layout } from 'lucide-react';
import { BackgroundGlow } from './BackgroundGlow';
import { motion, AnimatePresence } from 'framer-motion';

interface UgcResultPageProps {
  result: UgcStudioResult;
  onCreateAnother: () => void;
}

export const UgcResultPage: React.FC<UgcResultPageProps> = ({ result, onCreateAnother }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCopiedKey, setActiveCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'instagram' | 'facebook' | 'twitter'>('linkedin');

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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden pb-24 flex justify-center">
      <BackgroundGlow />
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-6 z-50 bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/50 text-[#FAFAFA] px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-3 font-mono text-sm backdrop-blur-xl"
          >
            <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-violet)]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[var(--color-border-primary)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase">
                MODULE 01 / UGC STUDIO
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-sora font-extrabold text-[#FAFAFA] tracking-tight">{result.dailySuggestedTopic}</h1>
          </div>
          <button onClick={onCreateAnother} className="px-6 py-2.5 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] text-white text-sm font-semibold rounded-xl transition-all">
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="UGC Concept Narrative" icon={PenTool} copyText={`Hook: ${result.hook}\n\nProblem: ${result.problem}\n\nStory: ${result.story}\n\nSolution: ${result.solution}\n\nCTA: ${result.callToAction}`} copyLabel="Concept" copyKey="concept">
            <div className="space-y-4 text-white">
              <p><strong>Hook:</strong> {result.hook}</p>
              <p><strong>Problem:</strong> {result.problem}</p>
              <p><strong>Story:</strong> {result.story}</p>
              <p><strong>Solution:</strong> {result.solution}</p>
              <p className="text-[var(--color-brand-violet)]"><strong>CTA:</strong> {result.callToAction}</p>
            </div>
          </SectionCard>

          <SectionCard title="Platform Captions" icon={MessageSquare} copyText={result.captions[activeTab]} copyLabel={`${activeTab} Caption`} copyKey="captions">
            <div className="flex gap-2 mb-4 border-b border-[var(--color-border-primary)] pb-2 overflow-x-auto">
              {(['linkedin', 'instagram', 'facebook', 'twitter'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    activeTab === tab ? 'bg-[var(--color-brand-violet)] text-white' : 'text-[#A1A1AA] hover:bg-[var(--color-border-primary)]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-white whitespace-pre-wrap">{result.captions[activeTab]}</div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SectionCard title="AI Video Generation Prompt" icon={Video} copyText={Object.entries(result.videoPrompt).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join('\n')} copyLabel="Video Prompt" copyKey="videoprompt">
              <div className="space-y-8">
                {[
                  {
                    title: "Core Concept",
                    keys: ["videoConcept", "hook", "sceneObjective", "sceneDescription", "duration", "negativePrompt"]
                  },
                  {
                    title: "Character & Performance",
                    keys: ["characterDescription", "characterAppearance", "characterClothing", "characterExpressions", "characterEmotions", "characterActions"]
                  },
                  {
                    title: "Camera & Framing",
                    keys: ["cameraAngle", "cameraMovement", "cameraLens", "cameraDistance", "framing"]
                  },
                  {
                    title: "Environment & Lighting",
                    keys: ["lighting", "environment", "background", "props"]
                  },
                  {
                    title: "Cinematography & Style",
                    keys: ["colorPalette", "composition", "cinematicStyle", "visualStyle", "transition", "motionDetails", "videoQuality", "renderingStyle", "aspectRatio", "frameRate"]
                  },
                  {
                    title: "Audio & Voiceover",
                    keys: ["voiceoverScript", "voiceStyle", "voiceGender", "voiceEmotion", "voiceSpeed", "accent", "dialogue", "backgroundMusic", "soundEffects", "ambientSounds"]
                  }
                ].map((category, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-primary)] p-5 rounded-xl border border-[var(--color-border-primary)]">
                    <h4 className="text-[#FAFAFA] font-sora font-semibold text-sm mb-4 border-b border-[var(--color-border-primary)] pb-2">{category.title}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.keys.map((key) => {
                        const val = result.videoPrompt[key as keyof typeof result.videoPrompt];
                        if (!val) return null;
                        return (
                          <div key={key} className="bg-[var(--color-bg-surface)] p-3 rounded-lg border border-[var(--color-border-primary)]">
                            <strong className="block text-[10px] uppercase text-[var(--color-brand-violet)] tracking-widest mb-1.5">{key.replace(/([A-Z])/g, ' $1').trim()}</strong>
                            <span className="text-xs text-[#E4E4E7] leading-relaxed">{String(val)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="flex flex-col gap-6">
            <SectionCard title="Video Meta & Script" icon={Layout}>
              <div className="space-y-4 text-white">
                <div>
                  <strong className="block text-xs uppercase text-[#A1A1AA] mb-1">Voiceover Script</strong>
                  <p className="text-sm italic">{result.voiceoverScript}</p>
                </div>
                <div>
                  <strong className="block text-xs uppercase text-[#A1A1AA] mb-1">Thumbnail Prompt</strong>
                  <p className="text-xs font-mono text-[var(--color-brand-magenta)]">{result.thumbnailPrompt}</p>
                </div>
                <div>
                  <strong className="block text-xs uppercase text-[#A1A1AA] mb-1">B-Roll Ideas</strong>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    {result.bRollIdeas.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </SectionCard>
            
            <SectionCard title="SEO & Keywords" icon={Hash} copyText={result.seoHashtags.join(' ')} copyLabel="SEO" copyKey="seo">
              <div className="space-y-4">
                <div>
                  <strong className="block text-xs uppercase text-[#A1A1AA] mb-2">Primary Keywords</strong>
                  <div className="flex flex-wrap gap-2">
                    {result.primaryKeywords.map((k, i) => <span key={i} className="px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-[10px] text-white">{k}</span>)}
                  </div>
                </div>
                <div>
                  <strong className="block text-xs uppercase text-[#A1A1AA] mb-2">Hashtags</strong>
                  <p className="text-xs font-mono text-[var(--color-brand-violet)]">{result.seoHashtags.join(' ')}</p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

      </div>
    </div>
  );
};
