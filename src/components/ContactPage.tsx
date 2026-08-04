import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#09090B] py-16 px-4 sm:px-6 flex items-center justify-center selection:bg-[#8B5CF6]/30">
      <div className="w-full max-w-lg bg-[#111113] border border-[#27272A] rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-mono mb-6">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight mb-2">
          Contact Director.ai
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mb-8 leading-relaxed">
          Have feedback or enterprise inquiries regarding Director.ai? Send us a message below.
        </p>

        {submitted ? (
          <div className="bg-[#09090B] border border-[#22C55E]/30 p-6 rounded-2xl text-center">
            <CheckCircle2 className="w-10 h-10 text-[#22C55E] mx-auto mb-3" />
            <h2 className="text-base font-bold text-[#FAFAFA] mb-1">Message Sent!</h2>
            <p className="text-xs text-[#A1A1AA]">
              Thank you for reaching out. We will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#FAFAFA] mb-1.5 font-mono uppercase">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@example.com"
                className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] rounded-xl px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#A1A1AA]/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#FAFAFA] mb-1.5 font-mono uppercase">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you create high-converting AI UGC ad prompts?"
                className="w-full bg-[#09090B] border border-[#27272A] focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] rounded-xl px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#A1A1AA]/50 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[#8B5CF6]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
