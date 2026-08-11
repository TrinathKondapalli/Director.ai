import React, { useState } from 'react';
import { PenTool, CheckCircle2, RotateCcw, Play, Check } from 'lucide-react';
import { BackgroundGlow } from './BackgroundGlow';
import { useTopicTracker } from '../hooks/useTopicTracker';
import { DesignTopic } from '../types';

interface DesignPublisherProps {
  onGenerateTopic: (topic: DesignTopic, format: 'single' | 'carousel') => void;
  isGenerating: boolean;
}

export const DesignPublisher: React.FC<DesignPublisherProps> = ({ onGenerateTopic, isGenerating }) => {
  const {
    completedDesignIds,
    allDesignTopics,
    completedDesignCount,
    totalDesignCount,
    toggleDesignCompleted,
    resetDesignProgress
  } = useTopicTracker();

  const [selectedFormat, setSelectedFormat] = useState<'single' | 'carousel'>('single');

  const handleGenerate = (topic: DesignTopic) => {
    onGenerateTopic(topic, selectedFormat);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
      <BackgroundGlow />
      
      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-xs font-mono font-semibold tracking-wide uppercase mb-6">
          <PenTool className="w-3.5 h-3.5" />
          <span>Module 02</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-sora font-extrabold text-[#FAFAFA] tracking-tight leading-tight mb-4">
          100-Day Content Strategy
        </h1>
        <p className="text-[#A1A1AA] text-lg max-w-2xl font-inter leading-relaxed">
          Generate high-value LinkedIn posts using the fixed 100 UX/UI concepts, designed to build authority, curiosity, and client trust.
        </p>
      </div>

      <div className="w-full max-w-5xl relative z-10 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] space-y-8">
        {/* Progress Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[var(--color-border-divider)] gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[var(--color-brand-violet)] uppercase tracking-wider font-semibold">100 Days Progress</span>
              <span className="px-2 py-0.5 bg-[var(--color-brand-violet)]/10 text-[var(--color-brand-violet)] text-[10px] font-mono rounded border border-[var(--color-brand-violet)]/20 font-bold">
                {completedDesignCount} / {totalDesignCount}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-[var(--color-bg-primary)] h-1.5 rounded-full overflow-hidden border border-[var(--color-border-primary)] mt-3">
              <div
                className="bg-gradient-to-r from-[var(--color-brand-violet)] to-[var(--color-brand-magenta)] h-full transition-all duration-500"
                style={{ width: `${(completedDesignCount / totalDesignCount) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center bg-[var(--color-bg-primary)] rounded-lg p-1 border border-[var(--color-border-primary)]">
              <button
                onClick={() => setSelectedFormat('single')}
                className={`px-3 py-1.5 text-xs font-sora font-semibold rounded-md transition-all ${
                  selectedFormat === 'single'
                    ? 'bg-[var(--color-brand-violet)] text-white'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Single Post
              </button>
              <button
                onClick={() => setSelectedFormat('carousel')}
                className={`px-3 py-1.5 text-xs font-sora font-semibold rounded-md transition-all ${
                  selectedFormat === 'carousel'
                    ? 'bg-[var(--color-brand-violet)] text-white'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Carousel
              </button>
            </div>
            
            {completedDesignCount > 0 && (
              <button
                onClick={resetDesignProgress}
                className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-[#EF4444] transition-colors bg-[var(--color-bg-primary)] px-3 py-2 rounded-lg border border-[var(--color-border-primary)]"
                title="Reset completed history"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 100 Days Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {allDesignTopics.map((topic) => {
            const isCompleted = completedDesignIds.includes(topic.id);
            const getPhase = (id: number) => {
              if (id <= 20) return { name: 'Phase 1: Who is this?', color: 'border-blue-500/30 bg-blue-500/5 text-blue-400' };
              if (id <= 40) return { name: 'Phase 2: How do they think?', color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' };
              if (id <= 60) return { name: 'Phase 3: Real Skills', color: 'border-amber-500/30 bg-amber-500/5 text-amber-400' };
              if (id <= 80) return { name: 'Phase 4: Product Context', color: 'border-orange-500/30 bg-orange-500/5 text-orange-400' };
              return { name: 'Phase 5: Point of View', color: 'border-[var(--color-brand-violet)]/30 bg-[var(--color-brand-violet)]/5 text-[var(--color-brand-violet)]' };
            };
            const phase = getPhase(topic.id);

            return (
              <div 
                key={topic.id}
                className={`flex flex-col p-3 rounded-xl border transition-all ${
                  isCompleted 
                    ? 'bg-[#22C55E]/5 border-[#22C55E]/20 opacity-70' 
                    : 'bg-[var(--color-bg-primary)] border-[var(--color-border-primary)] hover:border-[var(--color-brand-violet)]/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] text-[#A1A1AA]">
                      DAY {String(topic.id).padStart(3, '0')}
                    </span>
                    <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${phase.color}`}>
                      {phase.name}
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleDesignCompleted(topic.id)}
                    className="shrink-0 p-1 hover:bg-[var(--color-bg-surface)] rounded text-[#A1A1AA] hover:text-white transition-colors"
                    title={isCompleted ? "Mark uncompleted" : "Mark completed manually"}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> : <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
                
                <h4 className={`font-sora text-sm font-semibold mb-3 line-clamp-2 min-h-[40px] ${isCompleted ? 'text-[#A1A1AA]' : 'text-white'}`}>
                  {topic.title}
                </h4>
                
                <button
                  onClick={() => handleGenerate(topic)}
                  disabled={isGenerating}
                  className={`w-full py-1.5 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isCompleted
                      ? 'bg-[var(--color-bg-surface)] text-[#A1A1AA] hover:bg-[var(--color-border-primary)]'
                      : 'bg-[var(--color-brand-violet)] text-white hover:bg-[var(--color-brand-violet)]/80 shadow-md'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Play className="w-3.5 h-3.5" />
                  {isCompleted ? 'Regenerate' : 'Generate'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
