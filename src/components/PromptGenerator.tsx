import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Link as LinkIcon, ShieldCheck, Clapperboard, Lightbulb } from 'lucide-react';
import { MasterPromptInput } from '../types';

interface PromptGeneratorProps {
  onGenerate: (input: MasterPromptInput) => void;
  isGenerating: boolean;
  initialValues?: Partial<MasterPromptInput>;
  onNavigate?: (path: string) => void;
}

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({
  onGenerate,
  isGenerating,
  initialValues,
  onNavigate,
}) => {
  const [formData, setFormData] = useState<MasterPromptInput>({
    productName: initialValues?.productName || '',
    targetAudience: initialValues?.targetAudience || '',
    productUrl: initialValues?.productUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName?.trim() || !formData.targetAudience?.trim()) return;
    onGenerate(formData);
  };

  const handlePreFillSample = (sampleType: 'serum' | 'ring') => {
    if (sampleType === 'serum') {
      setFormData({
        productName: 'Lumora Hydra-Glow Vitamin C Serum',
        targetAudience: 'Women aged 20-35 struggling with dull skin & dark spots',
        productUrl: 'https://lumora.beauty/serum',
      });
    } else {
      setFormData({
        productName: 'Aura Track Pro Smart Ring',
        targetAudience: 'Busy professionals seeking seamless sleep and recovery tracking',
        productUrl: 'https://auraring.app/fit',
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 flex flex-col items-center justify-center selection:bg-[var(--color-brand-violet)]/30 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-brand-violet)]/15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[var(--color-brand-magenta)]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-xl relative z-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2 text-xs text-[#22C55E] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span>Zero Data Storage • Memory-Only</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#A1A1AA]/60 text-[11px] font-mono">Try Presets:</span>
            <button
              type="button"
              onClick={() => handlePreFillSample('serum')}
              className="text-[11px] text-[#6615F6] hover:text-white transition-colors underline cursor-pointer"
            >
              Skincare
            </button>
            <span className="text-[#27272A]">|</span>
            <button
              type="button"
              onClick={() => handlePreFillSample('ring')}
              className="text-[11px] text-[#6615F6] hover:text-white transition-colors underline cursor-pointer"
            >
              Smart Ring
            </button>
          </div>
        </div>

        {/* SINGLE CENTERED FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111113] border border-[#27272A] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#6615F6]/20 border border-[#6615F6]/40 flex items-center justify-center text-[#6615F6] mb-4">
              <Clapperboard className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#FAFAFA] mb-1.5 tracking-tight">
              Generate Master Prompt
            </h1>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Describe your product below. Director.ai automatically builds the hook, story structure, camera angles, voice script, and lighting plan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field 1: Product Name */}
            <div>
              <label className="block text-xs font-bold text-[#FAFAFA] mb-1.5 uppercase tracking-wider font-mono">
                Product Name <span className="text-[#6615F6]">*</span>
              </label>
              <input
                type="text"
                name="productName"
                required
                value={formData.productName}
                onChange={handleChange}
                placeholder="e.g. Lumora Hydra-Glow Serum"
                className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#6615F6] focus:ring-1 focus:ring-[#6615F6] rounded-xl px-4 py-3.5 text-sm text-[#FAFAFA] placeholder-[#A1A1AA]/50 outline-none transition-colors"
              />
            </div>

            {/* Field 2: Who is this product for? */}
            <div>
              <label className="block text-xs font-bold text-[#FAFAFA] mb-1.5 uppercase tracking-wider font-mono">
                Who is this product for? <span className="text-[#6615F6]">*</span>
              </label>
              <textarea
                name="targetAudience"
                required
                rows={2}
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="e.g. Women aged 20-35 struggling with dull skin & dark spots"
                className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#6615F6] focus:ring-1 focus:ring-[#6615F6] rounded-xl px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#A1A1AA]/50 outline-none transition-colors resize-none"
              />
            </div>

            {/* Field 3: Product URL (Optional) */}
            <div>
              <label className="block text-xs font-bold text-[#A1A1AA] mb-1.5 flex items-center justify-between font-mono">
                <span>Product URL</span>
                <span className="text-[10px] text-[#A1A1AA]/50 uppercase tracking-wider">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="productUrl"
                  value={formData.productUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/product"
                  className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#6615F6] focus:ring-1 focus:ring-[#6615F6] rounded-xl pl-9 pr-4 py-3 text-sm text-[#FAFAFA] placeholder-[#A1A1AA]/50 outline-none transition-colors"
                />
                <LinkIcon className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Auto-Determined AI Callout */}
            <div className="bg-[#09090B] border border-[#27272A]/80 p-3.5 rounded-xl text-[11px] text-[#A1A1AA] flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4 text-[#6615F6] shrink-0" />
              <span>
                Director.ai auto-calculates viral hooks, marketing angles, voiceover scripts, camera movements & lighting setups.
              </span>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isGenerating || !formData.productName?.trim() || !formData.targetAudience?.trim()}
              className="w-full py-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
            >
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Generate Master Prompt</span>
            </button>
          </form>
        </motion.div>

        {/* Footer info note */}
        <p className="text-center text-xs text-[#A1A1AA]/60 mt-6 flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Your ideas stay yours. Prompts are never stored.</span>
        </p>
      </div>
    </div>
  );
};
