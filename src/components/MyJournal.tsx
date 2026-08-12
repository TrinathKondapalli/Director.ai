import React, { useState, useRef } from 'react';
import { Copy, CheckCircle2, RotateCcw, Mic, MicOff, Sparkles, ArrowRight } from 'lucide-react';
import { BackgroundGlow } from './BackgroundGlow';
import { motion, AnimatePresence } from 'framer-motion';
import { generateJournalPrompt } from '../data/journalEngine';

export const MyJournal: React.FC = () => {
  const [userIdea, setUserIdea] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleGenerate = async () => {
    if (!userIdea.trim()) return;
    setIsGenerating(true);
    setGeneratedPrompt(null);
    setIsCopied(false);

    const startTime = Date.now();
    try {
      const prompt = await generateJournalPrompt(userIdea.trim());
      const elapsed = Date.now() - startTime;
      if (elapsed < 1500) {
        await new Promise(r => setTimeout(r, 1500 - elapsed));
      }
      setGeneratedPrompt(prompt);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Generation failed:', err);
      showToast('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    showToast('Prompt copied to clipboard!');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleRegenerate = () => {
    if (!userIdea.trim()) return;
    handleGenerate();
  };

  const handleVoiceInput = async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Voice input requires Chrome or Edge browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    // Check microphone permission first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Permission granted — stop the stream immediately (we only needed the permission)
      stream.getTracks().forEach(track => track.stop());
    } catch (permErr) {
      showToast('Microphone access denied. Please allow microphone in browser settings.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + ' ';
      }
      setUserIdea(prev => prev ? prev + ' ' + transcript.trim() : transcript.trim());
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      const errorMap: Record<string, string> = {
        'not-allowed': 'Microphone access denied. Allow it in browser settings.',
        'no-speech': 'No speech detected. Please try again.',
        'network': 'Network error. Voice input requires an internet connection.',
        'aborted': 'Voice input was cancelled.',
      };
      showToast(errorMap[event.error] || `Voice error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    showToast('Listening... Speak your idea.');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center selection:bg-[var(--color-brand-violet)]/30">
      <BackgroundGlow />

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-6 z-50 bg-[var(--color-bg-surface)] border border-[var(--color-brand-violet)]/50 text-[#FAFAFA] px-5 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.15)] flex items-center gap-3 font-mono text-xs sm:text-sm backdrop-blur-xl"
          >
            <div className="w-7 h-7 rounded-full bg-[var(--color-brand-violet)]/20 text-[var(--color-brand-violet)] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[800px] relative z-10 flex flex-col gap-16">

        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-xs font-mono font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Module 03</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-sora font-extrabold text-white tracking-tight leading-tight">
            My Journal
          </h1>
          <p className="text-[#A1A1AA] text-lg max-w-xl font-inter leading-relaxed">
            Turn your idea into a brand-consistent image-generation prompt. Just write what you want to say — the design system handles the rest.
          </p>
        </div>

        {/* INPUT SECTION */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[24px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-widest mb-4">
            What I want to say
          </label>
          <textarea
            value={userIdea}
            onChange={(e) => setUserIdea(e.target.value)}
            placeholder="e.g. AI is changing how students learn and build their careers..."
            rows={5}
            className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl px-6 py-5 text-white text-lg leading-relaxed placeholder:text-[#52525B] focus:outline-none focus:border-[var(--color-brand-violet)] transition-colors resize-none font-inter"
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
            {/* Voice Input */}
            <button
              onClick={handleVoiceInput}
              className={`px-5 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                isListening
                  ? 'bg-[#EF4444]/15 border-[#EF4444]/50 text-[#EF4444] animate-pulse'
                  : 'bg-[var(--color-bg-surface)] border-[var(--color-border-primary)] text-[#A1A1AA] hover:text-white hover:border-[var(--color-brand-violet)]'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? 'Stop Listening' : 'Voice Input'}
            </button>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !userIdea.trim()}
              className="flex-1 py-4 bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)]/80 text-white font-sora font-semibold text-sm rounded-xl shadow-lg shadow-[var(--color-brand-violet)]/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating Prompt...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Prompt</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* GENERATED PROMPT OUTPUT */}
        <AnimatePresence>
          {generatedPrompt && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-4xl font-sora font-extrabold text-[#3F3F46]">01</span>
                <h2 className="text-xl md:text-2xl font-sora font-bold text-white tracking-widest uppercase">Generated Prompt</h2>
              </div>

              <div className="bg-[#050505] border border-[var(--color-border-primary)] rounded-2xl overflow-hidden flex flex-col shadow-xl">
                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar max-h-[500px]">
                  <p className="font-mono text-sm md:text-base text-[var(--color-brand-violet)] leading-loose whitespace-pre-wrap">
                    {generatedPrompt}
                  </p>
                </div>

                <div className="bg-[var(--color-bg-surface)] p-5 border-t border-[var(--color-border-primary)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <span className="text-xs font-mono text-[#71717A]">
                    {generatedPrompt.length} characters
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRegenerate}
                      disabled={isGenerating}
                      className="px-5 py-3 bg-[var(--color-bg-primary)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-lg text-sm font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Regenerate
                    </button>
                    <button
                      onClick={handleCopy}
                      className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      {isCopied ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
                      {isCopied ? 'Copied!' : 'Copy Prompt'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
