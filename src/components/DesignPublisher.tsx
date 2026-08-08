import React, { useState } from 'react';
import { PenTool, Sparkles, Layout, ArrowRight, Database, CheckCircle2, RotateCcw, SkipForward, Layers } from 'lucide-react';
import { BackgroundGlow } from './BackgroundGlow';
import { useTopicTracker } from '../hooks/useTopicTracker';
import { DesignTopic } from '../types';

interface DesignPublisherProps {
  onGenerate: (format: 'single' | 'carousel') => void;
  onGenerateTopic: (topic: DesignTopic, format: 'single' | 'carousel') => void;
  isGenerating: boolean;
}

export const DesignPublisher: React.FC<DesignPublisherProps> = ({ onGenerate, onGenerateTopic, isGenerating }) => {
  const {
    allDesignTopics,
    completedDesignCount,
    totalDesignCount,
    uncompletedDesignTopics,
    markDesignCompleted,
    resetDesignProgress
  } = useTopicTracker();

  const [mode, setMode] = useState<'dataset' | 'custom'>('dataset');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const currentTopic: DesignTopic | undefined = uncompletedDesignTopics[selectedTopicIndex % Math.max(1, uncompletedDesignTopics.length)];

  const handleGenerateTopicFormat = (format: 'single' | 'carousel') => {
    if (!currentTopic) return;
    markDesignCompleted(currentTopic.id);
    onGenerateTopic(currentTopic, format);
  };

  const handleNextTopic = () => {
    if (uncompletedDesignTopics.length > 0) {
      setSelectedTopicIndex(prev => (prev + 1) % uncompletedDesignTopics.length);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
      <BackgroundGlow />
      
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-xs font-mono font-semibold tracking-wide uppercase mb-6">
          <PenTool className="w-3.5 h-3.5" />
          <span>Module 02</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-sora font-extrabold text-[#FAFAFA] tracking-tight leading-tight mb-4">
          AI Design Publisher
        </h1>
        <p className="text-[#A1A1AA] text-lg max-w-2xl font-inter leading-relaxed">
          Generate publish-ready educational content and carousels built on universal UX/UI principles and design laws.
        </p>

        {/* Mode Switcher */}
        <div className="flex bg-[var(--color-bg-surface)] p-1.5 border border-[var(--color-border-primary)] rounded-xl mt-8">
          <button
            onClick={() => setMode('dataset')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold font-sora transition-all ${
              mode === 'dataset'
                ? 'bg-[var(--color-brand-violet)] text-white shadow-lg'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[var(--color-bg-primary)]'
            }`}
          >
            <Database className="w-4 h-4" />
            Curated Principles Mode ({totalDesignCount} Topics)
          </button>
          <button
            onClick={() => setMode('custom')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold font-sora transition-all ${
              mode === 'custom'
                ? 'bg-[var(--color-brand-violet)] text-white shadow-lg'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[var(--color-bg-primary)]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Random AI Topic Mode
          </button>
        </div>
      </div>

      {mode === 'dataset' ? (
        <div className="w-full max-w-3xl relative z-10 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] space-y-6">
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[var(--color-border-divider)] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[var(--color-brand-violet)] uppercase tracking-wider font-semibold">Principles Progress</span>
                <span className="px-2 py-0.5 bg-[var(--color-brand-violet)]/10 text-[var(--color-brand-violet)] text-[10px] font-mono rounded border border-[var(--color-brand-violet)]/20 font-bold">
                  {completedDesignCount} / {totalDesignCount} Completed
                </span>
              </div>
              <h2 className="text-xl font-sora font-bold text-white mt-1">UX/UI Principle Generation</h2>
            </div>
            
            {completedDesignCount > 0 && (
              <button
                onClick={resetDesignProgress}
                className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-[#EF4444] transition-colors"
                title="Reset completed history"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Progress
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[var(--color-bg-primary)] h-2 rounded-full overflow-hidden border border-[var(--color-border-primary)]">
            <div
              className="bg-gradient-to-r from-[var(--color-brand-violet)] to-[var(--color-brand-magenta)] h-full transition-all duration-500"
              style={{ width: `${(completedDesignCount / totalDesignCount) * 100}%` }}
            />
          </div>

          {currentTopic ? (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/30 rounded-2xl p-6 space-y-5 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[var(--color-brand-violet)]/20 text-[var(--color-brand-violet)] font-mono text-xs font-bold rounded-lg border border-[var(--color-brand-violet)]/30">
                    {currentTopic.id}
                  </span>
                  <span className="px-2.5 py-1 bg-[var(--color-bg-primary)] text-[#A1A1AA] font-mono text-[10px] rounded border border-[var(--color-border-primary)] uppercase">
                    {currentTopic.category}
                  </span>
                </div>
                <span className="text-xs text-[#A1A1AA] font-mono">
                  Topic {selectedTopicIndex + 1} of {uncompletedDesignTopics.length} remaining
                </span>
              </div>

              <div>
                <strong className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-violet)] mb-1">
                  Principle / Topic
                </strong>
                <h3 className="text-2xl font-sora font-bold text-white">{currentTopic.principleName}</h3>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-wider mb-1">Core Definition</strong>
                <p className="text-xs text-white leading-relaxed">{currentTopic.coreDefinition}</p>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-wider mb-1">Why This Matters</strong>
                <p className="text-xs text-[#E4E4E7] leading-relaxed">{currentTopic.whyThisMatters}</p>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                <strong className="block text-[10px] uppercase text-[#22C55E] tracking-wider mb-1">Practical Application</strong>
                <p className="text-xs text-[#E4E4E7] leading-relaxed">{currentTopic.practicalApplication}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#22C55E]/10 p-3 rounded-xl border border-[#22C55E]/20">
                  <strong className="block text-[10px] uppercase text-[#22C55E] tracking-wider mb-1">✅ DO</strong>
                  <p className="text-xs text-white leading-relaxed">{currentTopic.visualDo}</p>
                </div>
                <div className="bg-[#EF4444]/10 p-3 rounded-xl border border-[#EF4444]/20">
                  <strong className="block text-[10px] uppercase text-[#EF4444] tracking-wider mb-1">❌ DON'T</strong>
                  <p className="text-xs text-white leading-relaxed">{currentTopic.visualDont}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--color-border-divider)] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleGenerateTopicFormat('single')}
                    disabled={isGenerating}
                    className="py-3.5 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)]/80 text-white font-sora font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    <Layout className="w-4 h-4" />
                    <span>Generate Single Post</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenerateTopicFormat('carousel')}
                    disabled={isGenerating}
                    className="py-3.5 bg-[var(--color-brand-magenta)] hover:bg-[var(--color-brand-magenta)]/80 text-white font-sora font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Generate Carousel</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNextTopic}
                  className="w-full py-3 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] font-sora text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Skip / Next Principle</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border-primary)] space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
              <h3 className="text-xl font-sora font-bold text-white">All 200 Design Principles Completed! 🎉</h3>
              <p className="text-xs text-[#A1A1AA] max-w-md mx-auto">
                You have generated educational posts for every single UX/UI principle in your dataset. Reset progress to start fresh.
              </p>
              <button
                onClick={resetDesignProgress}
                className="px-6 py-2.5 bg-[var(--color-brand-violet)] text-white font-sora text-xs font-bold rounded-xl hover:bg-[var(--color-brand-violet)]/80 transition-all"
              >
                Reset Progress (Start Fresh)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Custom Mode */
        <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Single Post Option */}
          <div 
            className={`bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 transition-colors ${!isGenerating ? 'hover:border-[var(--color-brand-violet)] cursor-pointer group' : 'opacity-50 cursor-not-allowed'}`}
            onMouseEnter={() => !isGenerating && setIsHovered('single')}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => !isGenerating && onGenerate('single')}
          >
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-violet)]/10 border border-[var(--color-brand-violet)]/20 flex items-center justify-center mb-6">
              <Layout className="w-7 h-7 text-[var(--color-brand-violet)]" />
            </div>
            <h2 className="text-2xl font-sora font-bold text-white mb-3">Single Post Insight</h2>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8">
              Generates a focused, single-image post with a deep-dive caption, tailored hooks, and professional insights on UX/UI best practices.
            </p>
            <div className="flex items-center gap-2 text-[var(--color-brand-violet)] font-semibold text-sm group-hover:gap-3 transition-all">
              <span>{isGenerating && isHovered === 'single' ? 'Generating...' : 'Generate Single Post'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Carousel Option */}
          <div 
            className={`bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 transition-colors ${!isGenerating ? 'hover:border-[var(--color-brand-magenta)] cursor-pointer group' : 'opacity-50 cursor-not-allowed'}`}
            onMouseEnter={() => !isGenerating && setIsHovered('carousel')}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => !isGenerating && onGenerate('carousel')}
          >
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-magenta)]/10 border border-[var(--color-brand-magenta)]/20 flex items-center justify-center mb-6">
              <Layers className="w-7 h-7 text-[var(--color-brand-magenta)]" />
            </div>
            <h2 className="text-2xl font-sora font-bold text-white mb-3">Multi-Slide Carousel</h2>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8">
              Generates a full educational carousel with slide titles, slide descriptions, separate visual prompts for each slide, and cross-platform captions.
            </p>
            <div className="flex items-center gap-2 text-[var(--color-brand-magenta)] font-semibold text-sm group-hover:gap-3 transition-all">
              <span>{isGenerating && isHovered === 'carousel' ? 'Generating...' : 'Generate Carousel'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
