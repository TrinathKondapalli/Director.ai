import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { DiscoveryQuestion } from '../../types/brandStrategist';

interface Props {
  question: DiscoveryQuestion;
  onAnswer: (answer: string) => void;
  isLoading: boolean;
  progress: number;
}

export default function StepDiscovery({ question, onAnswer, isLoading, progress }: Props) {
  const [answer, setAnswer] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [answer]);

  // Reset answer when question changes
  useEffect(() => {
    setAnswer('');
  }, [question.id]);

  const handleSubmit = () => {
    if (!answer.trim() || isLoading) return;
    onAnswer(answer);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col min-h-[60vh]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-violet)]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Header & Progress */}
      <div className="mb-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-brand-violet)]/15 rounded-full border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Consultant</span>
          </div>
          <span className="text-sm font-mono text-[#A1A1AA] uppercase tracking-wider">{question.category}</span>
        </div>
        
        <div className="w-full h-1 bg-[var(--color-bg-primary)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#5B4BFF] to-[#D946EF] transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center mb-12 relative z-10">
        <h2 className="text-2xl md:text-4xl font-sora font-semibold text-white leading-tight mb-2">
          {question.questionText}
        </h2>
      </div>

      {/* Answer Area */}
      <div className="relative z-10 mt-auto">
        <div className="relative flex items-end bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-2xl focus-within:border-[var(--color-brand-violet)]/50 transition-colors p-2">
          <textarea
            ref={textareaRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            className="w-full bg-transparent text-white px-4 py-3 focus:outline-none resize-none min-h-[56px] max-h-[200px]"
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || isLoading}
            className="mb-2 mr-2 w-10 h-10 rounded-xl bg-[var(--color-bg-surface)] hover:bg-[var(--color-brand-violet)]/20 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {isLoading ? (
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
               <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-[#A1A1AA] mt-3 ml-2 font-mono">
          Press <kbd className="bg-[var(--color-bg-primary)] border border-white/10 rounded px-1">Enter</kbd> to submit, <kbd className="bg-[var(--color-bg-primary)] border border-white/10 rounded px-1">Shift</kbd> + <kbd className="bg-[var(--color-bg-primary)] border border-white/10 rounded px-1">Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
