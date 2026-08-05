import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#09090B] py-16 px-4 sm:px-6 selection:bg-[#6615F6]/30">
      <div className="max-w-3xl mx-auto bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-12 shadow-2xl text-[#FAFAFA]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6615F6]/15 border border-[#6615F6]/30 text-[#8B5CF6] text-xs font-mono mb-6">
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Terms of Service
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
          <p>
            Welcome to Director.ai. By accessing or using our platform, you agree to be bound by these Terms of Service.
          </p>

          <div className="bg-[#09090B] border border-[#27272A] p-5 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-[#FAFAFA]">1. Ownership & Commercial Rights</h2>
            <p>
              You retain 100% full ownership and commercial rights to all Master Prompts generated through Director.ai. You are free to paste them into Google Veo, Kling AI, Runway, Pika, Hailuo, or Luma to generate commercial advertisements.
            </p>

            <h2 className="text-sm font-bold text-[#FAFAFA]">2. Zero-Storage Architecture</h2>
            <p>
              Director.ai operates on a volatile memory-only architecture. Prompts are not stored, indexed, or backed up by our servers. You are solely responsible for copying and saving your generated prompts before closing your browser session.
            </p>

            <h2 className="text-sm font-bold text-[#FAFAFA]">3. Acceptable Use</h2>
            <p>
              You agree not to use Director.ai to generate Master Prompts for illegal, deceptive, harmful, or non-consensual content.
            </p>
          </div>

          <p className="text-[11px] font-mono text-[#A1A1AA]/60 text-center">
            Last Updated: August 2026 • Director.ai
          </p>
        </div>
      </div>
    </div>
  );
};
