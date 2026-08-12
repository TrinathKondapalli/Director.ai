import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { InitialBrief } from '../../types/brandStrategist';

interface Props {
  onStart: (brief: InitialBrief) => void;
  isLoading: boolean;
}

export default function StepCreateBrand({ onStart, isLoading }: Props) {
  const [brief, setBrief] = useState<InitialBrief>({
    brandName: '',
    description: '',
    industry: '',
    market: '',
    goal: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief.brandName || !brief.description) return;
    onStart(brief);
  };

  return (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-[32px] p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-violet)]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="mb-10 relative z-10">
        <div className="w-14 h-14 bg-[var(--color-brand-violet)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-brand-violet)]/20">
          <Target className="w-7 h-7 text-[var(--color-brand-violet)]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4 tracking-tight">Create New Brand</h2>
        <p className="text-[#A1A1AA] text-lg max-w-xl leading-relaxed">
          Let's establish the foundation. Provide the core business details to begin the AI discovery interview.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-mono text-[#A1A1AA] uppercase tracking-wider">Brand / Company Name *</label>
            <input 
              required
              type="text" 
              value={brief.brandName}
              onChange={e => setBrief({...brief, brandName: e.target.value})}
              placeholder="e.g. Nova Ledger"
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-violet)]/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-mono text-[#A1A1AA] uppercase tracking-wider">Industry *</label>
            <input 
              required
              type="text" 
              value={brief.industry}
              onChange={e => setBrief({...brief, industry: e.target.value})}
              placeholder="e.g. SaaS / FinTech"
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-violet)]/50 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-mono text-[#A1A1AA] uppercase tracking-wider">What does your business do? *</label>
          <textarea 
            required
            rows={3}
            value={brief.description}
            onChange={e => setBrief({...brief, description: e.target.value})}
            placeholder="e.g. AI-powered accounting software for small businesses."
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-violet)]/50 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-mono text-[#A1A1AA] uppercase tracking-wider">Location / Market</label>
            <input 
              type="text" 
              value={brief.market}
              onChange={e => setBrief({...brief, market: e.target.value})}
              placeholder="e.g. US, UK, Global"
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-violet)]/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-mono text-[#A1A1AA] uppercase tracking-wider">Primary Goal</label>
            <input 
              type="text" 
              value={brief.goal}
              onChange={e => setBrief({...brief, goal: e.target.value})}
              placeholder="e.g. Differentiate from legacy platforms."
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-brand-violet)]/50 transition-colors"
            />
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full md:w-auto px-10 py-4 text-base font-semibold"
          >
            {isLoading ? 'Preparing Strategy Engine...' : 'Start Strategy'}
          </button>
        </div>
      </form>
    </div>
  );
}
