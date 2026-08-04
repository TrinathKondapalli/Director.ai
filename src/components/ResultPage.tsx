import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RefreshCw, Lock, Terminal, Sparkles, ArrowRight } from 'lucide-react';
import { MasterPromptResult } from '../types';

interface ResultPageProps {
  result: MasterPromptResult;
  onCreateAnother: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ result, onCreateAnother }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = result.masterPromptText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const lines = (result.masterPromptText || '').split('\n');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#09090B] py-10 px-4 sm:px-6 flex flex-col items-center justify-start selection:bg-[#8B5CF6]/30">
      <div className="w-full max-w-4xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#FAFAFA] tracking-tight">
                {result.productName} — Master Prompt
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-[11px] font-mono font-semibold">
                Production-Ready
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA]">
              Paste directly into Google Veo, Google Flow, Kling AI, Runway, Pika, Hailuo, or Luma.
            </p>
          </div>

          {/* Primary Copy Button in Header */}
          <button
            onClick={handleCopy}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 shrink-0 ${
              copied
                ? 'bg-[#22C55E] text-white shadow-[#22C55E]/20'
                : 'bg-[#8B5CF6] hover:bg-[#A78BFA] text-white shadow-[#8B5CF6]/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied Master Prompt!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Master Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Strategy Highlights Badge if present */}
        {result.creativeStrategy && (
          <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#09090B] p-3 rounded-xl border border-[#27272A]/80">
              <span className="text-[10px] text-[#A1A1AA] uppercase font-mono block mb-1">Target Audience</span>
              <span className="font-semibold text-[#FAFAFA]">{result.creativeStrategy.targetAudience}</span>
            </div>
            <div className="bg-[#09090B] p-3 rounded-xl border border-[#27272A]/80">
              <span className="text-[10px] text-[#A1A1AA] uppercase font-mono block mb-1">Marketing Angle</span>
              <span className="font-semibold text-[#FAFAFA]">{result.creativeStrategy.marketingAngle}</span>
            </div>
            <div className="bg-[#09090B] p-3 rounded-xl border border-[#27272A]/80">
              <span className="text-[10px] text-[#A1A1AA] uppercase font-mono block mb-1">Target Emotion</span>
              <span className="font-semibold text-[#FAFAFA]">{result.creativeStrategy.desiredEmotion}</span>
            </div>
          </div>
        )}

        {/* MASTER PROMPT CODE/TERMINAL CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111113] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden mb-6"
        >
          {/* Terminal Title Bar */}
          <div className="bg-[#09090B] border-b border-[#27272A] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-[#A1A1AA] font-mono flex items-center gap-1.5 truncate">
                <Terminal className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>DIRECTOR.AI // UGC_MASTER_PROMPT.txt</span>
              </span>
            </div>

            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                copied
                  ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                  : 'bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[#27272A]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Master Prompt Content */}
          <div className="p-4 sm:p-6 bg-[#09090B] font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed max-h-[580px] overflow-y-auto selection:bg-[#8B5CF6]/40">
            <div className="space-y-1">
              {lines.map((line, lIdx) => {
                const isHeader = line.startsWith('#');
                const isBracket = line.startsWith('[');
                return (
                  <div key={lIdx} className="flex gap-2 sm:gap-4 group">
                    <span className="text-[#A1A1AA]/30 select-none w-6 sm:w-8 text-right shrink-0 font-mono text-[10px] sm:text-xs pt-0.5">
                      {lIdx + 1}
                    </span>
                    <span
                      className={`whitespace-pre-wrap break-words min-w-0 flex-1 ${
                        isHeader
                          ? 'text-[#8B5CF6] font-bold text-xs sm:text-sm pt-2 block border-b border-[#27272A]/60 pb-1'
                          : isBracket
                          ? 'text-[#22C55E] font-semibold'
                          : line.startsWith('-')
                          ? 'text-zinc-300'
                          : 'text-zinc-400'
                      }`}
                    >
                      {line}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* PRIMARY ACTION BUTTONS BELOW MASTER PROMPT */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={handleCopy}
            className={`w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-semibold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] ${
              copied
                ? 'bg-[#22C55E] text-white shadow-[#22C55E]/20'
                : 'bg-[#8B5CF6] hover:bg-[#A78BFA] text-white shadow-[#8B5CF6]/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied Master Prompt!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy Master Prompt</span>
              </>
            )}
          </button>

          <button
            onClick={onCreateAnother}
            className="w-full sm:w-auto px-8 py-4 bg-[#111113] hover:bg-[#1C1C20] text-[#FAFAFA] text-sm sm:text-base font-medium rounded-2xl border border-[#27272A] transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5 text-[#8B5CF6]" />
            <span>Create Another Prompt</span>
          </button>
        </div>

        {/* PRIVACY WARNING FOOTER */}
        <div className="bg-[#111113] border border-[#27272A] p-4 rounded-xl text-center flex items-center justify-center gap-2 text-xs text-[#22C55E] font-mono">
          <Lock className="w-4 h-4 shrink-0" />
          <span>
            Memory-Only Runtime: Leaving or refreshing this page permanently clears this generated prompt. "Your ideas stay yours."
          </span>
        </div>
      </div>
    </div>
  );
};
