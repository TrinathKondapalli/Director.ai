import React, { useState } from 'react';
import { Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { UgcStudioInput } from '../types';
import { BackgroundGlow } from './BackgroundGlow';

interface UgcStudioProps {
  onGenerate: (input: UgcStudioInput) => void;
  isGenerating: boolean;
  onNavigate: (path: string) => void;
}

export const UgcStudio: React.FC<UgcStudioProps> = ({ onGenerate, isGenerating, onNavigate }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ ...formData, isRandom: false });
  };

  const handleRandom = () => {
    onGenerate({ ...formData, isRandom: true });
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
      
      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-xs font-mono font-semibold tracking-wide uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module 01</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-sora font-extrabold text-[#FAFAFA] tracking-tight leading-tight mb-4">
          AI UGC Studio
        </h1>
        <p className="text-[#A1A1AA] text-lg max-w-2xl font-inter leading-relaxed">
          Generate authentic, high-converting User Generated Content ad ideas, complete with platform-specific captions and cinematic video prompts.
        </p>
      </div>

      <div className="w-full max-w-2xl relative z-10 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-border-divider)]">
          <h2 className="text-xl font-sora font-bold text-white">Project Brief</h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAutoFill}
              className="px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] hover:text-white bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-lg transition-colors"
            >
              Auto-fill Example
            </button>
            <button
              type="button"
              onClick={handleRandom}
              disabled={isGenerating}
              className="px-4 py-2 text-xs font-medium text-[var(--color-brand-violet)] hover:text-white bg-[var(--color-brand-violet)]/10 hover:bg-[var(--color-brand-violet)]/20 border border-[var(--color-brand-violet)]/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              Generate Random
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Industry</label>
              <input required name="industry" value={formData.industry} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="e.g. Skincare, SaaS, Fitness" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Brand</label>
              <input required name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="e.g. Acme Corp" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Product</label>
              <input required name="product" value={formData.product} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="e.g. Glow Serum" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Service</label>
              <input required name="service" value={formData.service} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="e.g. Monthly Subscription" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Website URL (Optional)</label>
            <input name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="https://" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Target Audience</label>
              <input required name="targetAudience" value={formData.targetAudience} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="e.g. Busy professionals in their 30s" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Platform</label>
              <input required name="platform" value={formData.platform} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="e.g. TikTok / Instagram Reels" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Tone</label>
              <input required name="tone" value={formData.tone} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="e.g. Authentic, Urgent" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Goal</label>
              <input required name="goal" value={formData.goal} onChange={handleInputChange} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors" placeholder="e.g. Direct Response / App Installs" />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 btn-primary text-[15px] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>{isGenerating ? 'Generating Studio Assets...' : 'Generate Studio Assets'}</span>
              {!isGenerating && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
