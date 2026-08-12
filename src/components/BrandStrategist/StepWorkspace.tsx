import React, { useState } from 'react';
import { Download, ChevronRight, CheckCircle2 } from 'lucide-react';
import { StrategyWorkspaceData } from '../../types/brandStrategist';

interface Props {
  workspace: StrategyWorkspaceData;
}

export default function StepWorkspace({ workspace }: Props) {
  const [activeTab, setActiveTab] = useState<string>('businessFoundation');

  const tabs = [
    { id: 'businessFoundation', label: 'Business Foundation', content: workspace.businessFoundation },
    { id: 'targetAudience', label: 'Target Audience', content: workspace.targetAudience },
    { id: 'marketLandscape', label: 'Market Landscape', content: workspace.marketLandscape },
    { id: 'competitorAnalysis', label: 'Competitor Analysis', content: workspace.competitorAnalysis },
    { id: 'customerPainPoints', label: 'Customer Pain Points', content: workspace.customerPainPoints },
    { id: 'differentiation', label: 'Differentiation', content: workspace.differentiation },
    { id: 'brandPurpose', label: 'Brand Purpose', content: workspace.brandPurpose },
    { id: 'brandVoice', label: 'Brand Voice', content: workspace.brandVoice },
    { id: 'mission', label: 'Mission', content: workspace.mission },
    { id: 'vision', label: 'Vision', content: workspace.vision },
    { id: 'brandArchetype', label: 'Brand Archetype', content: workspace.brandArchetype },
    { id: 'valueProposition', label: 'Value Proposition', content: workspace.valueProposition },
    { id: 'visualDirection', label: 'Visual Direction', content: workspace.visualDirection },
  ];

  const renderContent = () => {
    if (activeTab === 'brandPersonality' && workspace.brandPersonality) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase block mb-2">Primary</span>
              <span className="text-xl font-sora font-bold text-white">{workspace.brandPersonality.primary}</span>
            </div>
            <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase block mb-2">Secondary</span>
              <span className="text-xl font-sora font-bold text-white">{workspace.brandPersonality.secondary}</span>
            </div>
            <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase block mb-2">Tertiary</span>
              <span className="text-xl font-sora font-bold text-white">{workspace.brandPersonality.tertiary}</span>
            </div>
          </div>
          
          <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-red-500/20">
            <span className="text-xs font-mono text-red-400 uppercase block mb-4">What to Avoid</span>
            <div className="flex flex-wrap gap-2">
              {workspace.brandPersonality.avoid.map((t, i) => (
                <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-300 rounded-full text-sm font-medium">{t}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
            <h4 className="text-lg font-sora font-bold text-white mb-2">Communication Style</h4>
            <p className="text-[#E4E4E7] leading-relaxed">{workspace.brandPersonality.communicationStyle}</p>
          </div>
        </div>
      );
    }

    if (activeTab === 'lists') {
      return (
        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-sora font-bold text-white mb-4">Brand Values</h4>
            <ul className="space-y-2">
              {workspace.brandValues?.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-[#E4E4E7]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-violet)] shrink-0 mt-0.5" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-sora font-bold text-white mb-4">Messaging Pillars</h4>
            <ul className="space-y-2">
              {workspace.messagingPillars?.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-[#E4E4E7]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-violet)] shrink-0 mt-0.5" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-sora font-bold text-white mb-4">Tagline Directions</h4>
            <ul className="space-y-2">
              {workspace.taglineDirections?.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-[#E4E4E7]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-violet)] shrink-0 mt-0.5" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    const activeItem = tabs.find(t => t.id === activeTab);
    return (
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#E4E4E7] leading-relaxed whitespace-pre-wrap">
          {activeItem?.content}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-[32px] overflow-hidden flex flex-col md:flex-row min-h-[70vh]">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 border-r border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/50 p-6 flex flex-col">
        <h3 className="font-sora font-bold text-white mb-6 tracking-tight">Strategy Workspace</h3>
        
        <div className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-between group ${
                activeTab === tab.id 
                  ? 'bg-[var(--color-brand-violet)]/10 text-white font-medium border border-[var(--color-brand-violet)]/20' 
                  : 'text-[#A1A1AA] hover:bg-white/5 hover:text-[#E4E4E7]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <ChevronRight className="w-4 h-4 text-[var(--color-brand-violet)]" />}
            </button>
          ))}
          
          <button
            onClick={() => setActiveTab('brandPersonality')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-between group ${
              activeTab === 'brandPersonality' 
                ? 'bg-[var(--color-brand-violet)]/10 text-white font-medium border border-[var(--color-brand-violet)]/20' 
                : 'text-[#A1A1AA] hover:bg-white/5 hover:text-[#E4E4E7]'
            }`}
          >
            Brand Personality
            {activeTab === 'brandPersonality' && <ChevronRight className="w-4 h-4 text-[var(--color-brand-violet)]" />}
          </button>
          
          <button
            onClick={() => setActiveTab('lists')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-between group ${
              activeTab === 'lists' 
                ? 'bg-[var(--color-brand-violet)]/10 text-white font-medium border border-[var(--color-brand-violet)]/20' 
                : 'text-[#A1A1AA] hover:bg-white/5 hover:text-[#E4E4E7]'
            }`}
          >
            Core Pillars & Values
            {activeTab === 'lists' && <ChevronRight className="w-4 h-4 text-[var(--color-brand-violet)]" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 relative flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-sora font-bold text-white">
            {activeTab === 'brandPersonality' ? 'Brand Personality' : 
             activeTab === 'lists' ? 'Core Pillars & Values' : 
             tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <button className="p-2 text-[#A1A1AA] hover:text-white transition-colors bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border-primary)]">
            <Download className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1">
          {renderContent()}
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--color-border-primary)] flex justify-between items-center">
           <button className="text-sm font-mono text-[#A1A1AA] hover:text-white transition-colors">
              Request Refinement
           </button>
           <button className="btn-primary px-6 py-2">
              Approve Section
           </button>
        </div>
      </div>
    </div>
  );
}
