import React, { useState } from 'react';
import { Sparkles, ArrowRight, Database, CheckCircle2, RotateCcw, SkipForward, Layers, FileText } from 'lucide-react';
import { UgcStudioInput, UgcTopic } from '../types';
import { BackgroundGlow } from './BackgroundGlow';
import { useTopicTracker } from '../hooks/useTopicTracker';

interface UgcStudioProps {
  onGenerate: (input: UgcStudioInput) => void;
  onGenerateTopic: (topic: UgcTopic) => void;
  isGenerating: boolean;
  onNavigate: (path: string) => void;
}

export const UgcStudio: React.FC<UgcStudioProps> = ({ onGenerate, onGenerateTopic, isGenerating, onNavigate }) => {
  const {
    completedUgcIds,
    allUgcTopics,
    completedUgcCount,
    totalUgcCount,
    uncompletedUgcTopics,
    markUgcCompleted,
    resetUgcProgress
  } = useTopicTracker();

  const [mode, setMode] = useState<'dataset' | 'custom'>('dataset');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);

  const currentTopic: UgcTopic | undefined = allUgcTopics[selectedTopicIndex % Math.max(1, allUgcTopics.length)];

  const [formData, setFormData] = useState<Omit<UgcStudioInput, 'isRandom'>>({
    industry: '',
    product: '',
    service: '',
    brand: '',
    websiteUrl: '',
    targetAudience: '',
    platform: '',
    tone: '',
    goal: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ ...formData, isRandom: false });
  };

  const handleGenerateCurrentTopic = () => {
    if (!currentTopic) return;
    markUgcCompleted(currentTopic.id);
    onGenerateTopic(currentTopic);
  };

  const handleNextTopic = () => {
    if (allUgcTopics.length > 0) {
      setSelectedTopicIndex(prev => (prev + 1) % allUgcTopics.length);
    }
  };

  const handleAutoFill = () => {
    setFormData({
      industry: 'SaaS / Tech',
      product: 'AI Productivity Planner',
      service: 'Subscription Software',
      brand: 'FocusPro AI',
      websiteUrl: 'https://focuspro.ai',
      targetAudience: 'Freelancers and Remote Workers',
      platform: 'TikTok / Instagram Reels',
      tone: 'Authentic, Urgent, Educational',
      goal: 'Direct Response / Conversions'
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
      <BackgroundGlow />
      
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-xs font-mono font-semibold tracking-wide uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module 01</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-sora font-extrabold text-[#FAFAFA] tracking-tight leading-tight mb-4">
          AI UGC Studio
        </h1>
        <p className="text-[#A1A1AA] text-lg max-w-2xl font-inter leading-relaxed">
          Generate authentic, high-converting User Generated Content ad ideas, complete with platform-specific captions and 41-parameter cinematic video prompts.
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
            Curated Database Mode ({totalUgcCount} Topics)
          </button>
          <button
            onClick={() => setMode('custom')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold font-sora transition-all ${
              mode === 'custom'
                ? 'bg-[var(--color-brand-violet)] text-white shadow-lg'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[var(--color-bg-primary)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            Custom Brief Mode
          </button>
        </div>
      </div>

      {mode === 'dataset' ? (
        <div className="w-full max-w-3xl relative z-10 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] space-y-6">
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[var(--color-border-divider)] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[var(--color-brand-violet)] uppercase tracking-wider font-semibold">Database Progress</span>
                <span className="px-2 py-0.5 bg-[var(--color-brand-violet)]/10 text-[var(--color-brand-violet)] text-[10px] font-mono rounded border border-[var(--color-brand-violet)]/20 font-bold">
                  {completedUgcCount} / {totalUgcCount} Completed
                </span>
              </div>
              <h2 className="text-xl font-sora font-bold text-white mt-1">Topic-by-Topic Generation</h2>
            </div>
            
            {completedUgcCount > 0 && (
              <button
                onClick={resetUgcProgress}
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
              style={{ width: `${(completedUgcCount / totalUgcCount) * 100}%` }}
            />
          </div>

          {currentTopic ? (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/30 rounded-2xl p-6 space-y-5 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--color-border-primary)]/50 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[var(--color-brand-violet)]/20 text-[var(--color-brand-violet)] font-mono text-xs font-bold rounded-lg border border-[var(--color-brand-violet)]/30">
                    {currentTopic.id}
                  </span>
                  {completedUgcIds.includes(currentTopic.id) && (
                    <span className="px-2 py-0.5 bg-[#22C55E]/15 text-[#22C55E] font-mono text-[10px] font-bold rounded border border-[#22C55E]/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider shrink-0">Jump To Concept:</label>
                  <select
                    value={selectedTopicIndex}
                    onChange={(e) => setSelectedTopicIndex(Number(e.target.value))}
                    className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] hover:border-[var(--color-brand-violet)] text-[#FAFAFA] text-xs font-mono rounded-xl px-3 py-1.5 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors cursor-pointer w-full sm:w-[280px] truncate"
                  >
                    {allUgcTopics.map((t, idx) => {
                      const isDone = completedUgcIds.includes(t.id);
                      return (
                        <option key={t.id} value={idx} className="bg-[#09090B] text-white">
                          {isDone ? '✓ ' : ''}{t.id}: {t.brandName} ({t.industry})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div>
                <strong className="block text-[10px] uppercase tracking-widest text-[var(--color-brand-violet)] mb-1">
                  Product / Brand Name
                </strong>
                <h3 className="text-2xl font-sora font-bold text-white">{currentTopic.brandName}</h3>
                <span className="text-xs text-[#A1A1AA] font-mono">{currentTopic.industry} • {currentTopic.productCategory}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                  <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-wider mb-1">Target Audience</strong>
                  <p className="text-xs text-white leading-relaxed">{currentTopic.targetAudience}</p>
                </div>

                <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                  <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-wider mb-1">Tone / Vibe</strong>
                  <p className="text-xs text-white leading-relaxed">{currentTopic.tone}</p>
                </div>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                <strong className="block text-[10px] uppercase text-[#A1A1AA] tracking-wider mb-1">Core Pain Point</strong>
                <p className="text-xs text-[#E4E4E7] leading-relaxed">{currentTopic.corePainPoint}</p>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                <strong className="block text-[10px] uppercase text-[#22C55E] tracking-wider mb-1">Solution / Angle</strong>
                <p className="text-xs text-[#E4E4E7] leading-relaxed">{currentTopic.solution}</p>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border border-[var(--color-border-primary)]">
                <strong className="block text-[10px] uppercase text-[var(--color-brand-magenta)] tracking-wider mb-1">Visual Hook Angle</strong>
                <p className="text-xs text-[#E4E4E7] leading-relaxed italic">"{currentTopic.visualHookAngle}"</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--color-border-divider)]">
                <button
                  type="button"
                  onClick={handleGenerateCurrentTopic}
                  disabled={isGenerating}
                  className="flex-1 py-4 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)]/80 text-white font-sora font-semibold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Concept for {currentTopic.brandName}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={handleNextTopic}
                  className="px-5 py-4 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] font-sora text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Skip / Next</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border-primary)] space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
              <h3 className="text-xl font-sora font-bold text-white">All 390 UGC Topics Completed! 🎉</h3>
              <p className="text-xs text-[#A1A1AA] max-w-md mx-auto">
                You have systematically generated concepts for every single UGC topic in your database. Reset progress to start over or switch to Custom mode.
              </p>
              <button
                onClick={resetUgcProgress}
                className="px-6 py-2.5 bg-[var(--color-brand-violet)] text-white font-sora text-xs font-bold rounded-xl hover:bg-[var(--color-brand-violet)]/80 transition-all"
              >
                Reset Progress (Start Fresh)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Custom Mode Form */
        <div className="w-full max-w-2xl relative z-10 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-border-divider)]">
            <h2 className="text-xl font-sora font-bold text-white">Custom Project Brief</h2>
            <button
              type="button"
              onClick={handleAutoFill}
              className="px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] hover:text-white bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-lg transition-colors"
            >
              Auto-fill Example
            </button>
          </div>

          <form onSubmit={handleSubmitCustom} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g. SaaS, Fintech, Fitness"
                  required
                  className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Product Name</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  placeholder="e.g. FocusPro AI"
                  required
                  className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Service Type</label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  placeholder="e.g. Productivity App"
                  required
                  className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g. FocusPro"
                  required
                  className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="e.g. Busy Founders, Designers, College Students"
                required
                className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Platform</label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors"
                >
                  <option value="">Select Platform</option>
                  <option value="TikTok / Instagram Reels">TikTok / Instagram Reels</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="Facebook Video Ads">Facebook Video Ads</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Tone</label>
                <input
                  type="text"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  placeholder="e.g. Authentic, Urgent, Educational"
                  required
                  className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">Goal</label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                placeholder="e.g. Drive Conversions, Increase Product Awareness"
                required
                className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)]/80 text-white font-sora font-semibold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate UGC Studio Concept</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
