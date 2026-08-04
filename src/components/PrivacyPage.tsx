import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, EyeOff, ServerOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#09090B] py-16 px-4 sm:px-6 selection:bg-[#8B5CF6]/30">
      <div className="max-w-3xl mx-auto bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>Strict Zero-Storage Mandate</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight mb-4">
          Privacy Policy
        </h1>

        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-8">
          Privacy is one of Director.ai's core architectural pillars. We strictly guarantee that your concepts, product names, URLs, and generated Master Prompts are never stored anywhere.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 font-mono text-xs">
          <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex items-start gap-3">
            <ServerOff className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#FAFAFA] mb-1">Never Store Prompts</div>
              <div className="text-[#A1A1AA] text-[11px]">All generated prompts exist only in volatile server memory during request duration.</div>
            </div>
          </div>

          <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#FAFAFA] mb-1">Never Store Products or URLs</div>
              <div className="text-[#A1A1AA] text-[11px]">Your product inputs and target audience descriptions are erased immediately upon response.</div>
            </div>
          </div>

          <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#FAFAFA] mb-1">No Database / No Logs</div>
              <div className="text-[#A1A1AA] text-[11px]">There is no database backing Director.ai. We maintain zero user histories or activity logs.</div>
            </div>
          </div>

          <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#FAFAFA] mb-1">Session-Only Runtime</div>
              <div className="text-[#A1A1AA] text-[11px]">Refreshing or navigating away from the page permanently wipes all session data.</div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#27272A] pt-8 text-center text-xs text-[#22C55E] font-mono">
          "Your ideas stay yours."
        </div>
      </div>
    </div>
  );
};
