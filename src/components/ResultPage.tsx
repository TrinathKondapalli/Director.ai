import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  RefreshCw,
  Lock,
  Terminal,
  Sparkles,
  ArrowRight,
  Maximize2,
  Minimize2,
  Youtube,
  Instagram,
  Facebook,
  Share2,
  Tag,
  FileText,
  Image,
  Home,
  CheckCircle2,
  Search,
  Zap,
  TrendingUp
} from 'lucide-react';
import { MasterPromptResult } from '../types';
import { BackgroundGlow } from './BackgroundGlow';

interface ResultPageProps {
  result: MasterPromptResult;
  onCreateAnother: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ result, onCreateAnother }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCopiedKey, setActiveCopiedKey] = useState<string | null>(null);
  const [isPromptExpanded, setIsPromptExpanded] = useState<boolean>(false);

  const showToast = (message: string, key: string) => {
    setActiveCopiedKey(key);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
      setActiveCopiedKey(null);
    }, 2500);
  };

  const copyToClipboard = (text: string, label: string, key: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied successfully.`, key);
  };

  const lines = (result.masterPromptText || '').split('\n');
  const wordCount = (result.masterPromptText || '').trim().split(/\s+/).length;
  const estVideoLength = '0:10 (10 Seconds)';

  // Destructure assets with fallbacks
  const yt = result.youtubePackage;
  const ig = result.instagramPackage;
  const fb = result.facebookPackage;

  // Copy All YouTube Package
  const handleCopyYouTubeAll = () => {
    if (!yt) return;
    const formattedTags = yt.hashtags.map((tag) => tag.replace(/^#/, '').trim()).join(', ');
    const structured = `--- YOUTUBE PUBLISHING PACKAGE ---
TITLE:
${yt.title}

DESCRIPTION:
${yt.description}

YOUTUBE TAGS:
${formattedTags}

THUMBNAIL PROMPT:
${yt.thumbnailPrompt}

KEYWORDS:
${yt.keywords.join(', ')}

CATEGORY:
${yt.categoryRecommendation}`;
    copyToClipboard(structured, 'YouTube Package', 'yt-all');
  };

  // Copy All Instagram & Facebook Package
  const handleCopyIgFbAll = () => {
    const structured = `--- INSTAGRAM PACKAGE ---
CAPTION:
${ig?.caption || ''}

HASHTAGS:
${(ig?.hashtags || []).join(' ')}

CTA:
${ig?.callToAction || ''}

--- FACEBOOK PACKAGE ---
CAPTION:
${fb?.caption || ''}

HASHTAGS:
${(fb?.hashtags || []).join(' ')}

CTA:
${fb?.callToAction || ''}`;
    copyToClipboard(structured, 'Instagram & Facebook Package', 'ig-fb-all');
  };

  // Copy Everything Action
  const handleCopyEverything = () => {
    const masterBlock = `==================================================
1. DIRECTOR.AI - MASTER PROMPT
==================================================
${result.masterPromptText}

==================================================
2. YOUTUBE OPTIMIZATION PACKAGE
==================================================
[TITLE]
${yt?.title || ''}

[DESCRIPTION]
${yt?.description || ''}

[HASHTAGS]
${(yt?.hashtags || []).join(' ')}

[THUMBNAIL PROMPT]
${yt?.thumbnailPrompt || ''}

[KEYWORDS]
${(yt?.keywords || []).join(', ')}

==================================================
3. INSTAGRAM & FACEBOOK PACKAGE
==================================================
[INSTAGRAM CAPTION]
${ig?.caption || ''}

[INSTAGRAM HASHTAGS]
${(ig?.hashtags || []).join(' ')}

[FACEBOOK CAPTION]
${fb?.caption || ''}

[FACEBOOK HASHTAGS]
${(fb?.hashtags || []).join(' ')}`;

    copyToClipboard(masterBlock, 'Complete Publishing Package', 'everything');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative overflow-hidden flex justify-center selection:bg-[var(--color-brand-violet)]/30">
      <BackgroundGlow />
      
      {/* SUCCESS TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-6 z-50 bg-[var(--color-bg-surface)] border-2 border-[#22C55E] text-[#FAFAFA] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 font-mono text-xs sm:text-sm backdrop-blur-xl"
          >
            <div className="w-7 h-7 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl space-y-8 relative z-10">
        {/* TOP HEADER SUMMARY */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--color-border-primary)] pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
                {result.productName}
              </h1>
              <span className="px-3 py-1 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-xs font-mono font-semibold">
                Complete Publishing Package
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              Production-ready AI Video Master Prompt + YouTube, Instagram & Facebook Marketing Assets.
            </p>
          </div>

          <button
            onClick={handleCopyEverything}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xl active:scale-95 shrink-0 ${
              activeCopiedKey === 'everything'
                ? 'bg-[#22C55E] text-white shadow-[#22C55E]/25'
                : 'btn-primary'
            }`}
          >
            {activeCopiedKey === 'everything' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied Everything!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Everything</span>
              </>
            )}
          </button>
        </div>

        {/* SECTION 1: MASTER PROMPT */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] flex items-center justify-center font-mono text-xs font-bold">
                01
              </div>
              <h2 className="text-xl font-bold text-[#FAFAFA] tracking-tight">
                MASTER PROMPT
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#A1A1AA]">
              <span className="hidden sm:inline">Words: <strong className="text-white">{wordCount}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Length: <strong className="text-white">{estVideoLength}</strong></span>
            </div>
          </div>

          {/* CODE EDITOR STYLE CARD */}
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-2xl overflow-hidden transition-all">
            {/* Toolbar Header */}
            <div className="bg-[var(--color-bg-primary)] border-b border-[var(--color-border-primary)] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-[#A1A1AA] font-mono flex items-center gap-1.5 truncate">
                  <Terminal className="w-3.5 h-3.5 text-[var(--color-brand-violet)]" />
                  <span>DIRECTOR.AI // MASTER_PROMPT.txt</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                  className="px-3 py-1.5 bg-[#1C1C20] hover:bg-[var(--color-border-primary)] text-[#A1A1AA] hover:text-white rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isPromptExpanded ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Collapse</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Expand</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => copyToClipboard(result.masterPromptText, 'Master Prompt', 'master-prompt')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeCopiedKey === 'master-prompt'
                      ? 'bg-[#22C55E] text-white'
                      : 'bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)] text-white'
                  }`}
                >
                  {activeCopiedKey === 'master-prompt' ? (
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
            </div>

            {/* Prompt Editor Content Body */}
            <div
              className={`p-4 sm:p-6 bg-[var(--color-bg-primary)] font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed selection:bg-[var(--color-brand-violet)]/40 transition-all ${
                isPromptExpanded ? 'max-h-none' : 'max-h-[500px] overflow-y-auto'
              }`}
            >
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
                            ? 'text-[var(--color-brand-violet)] font-bold text-xs sm:text-sm pt-2 block border-b border-[var(--color-border-primary)]/60 pb-1'
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
          </div>

          {/* Section 1 Button Bar */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={() => copyToClipboard(result.masterPromptText, 'Master Prompt', 'master-prompt-btn')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeCopiedKey === 'master-prompt-btn'
                  ? 'bg-[#22C55E] text-white'
                  : 'bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)] text-white shadow-md shadow-[var(--color-brand-violet)]/20'
              }`}
            >
              <Copy className="w-4 h-4" />
              <span>Copy Prompt</span>
            </button>
            <button
              onClick={onCreateAnother}
              className="px-5 py-2.5 bg-[var(--color-bg-surface)] hover:bg-[#1C1C20] text-white text-xs font-medium rounded-xl border border-[var(--color-border-primary)] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[var(--color-brand-violet)]" />
              <span>Generate Another</span>
            </button>
          </div>
        </section>

        {/* SECTION 2: YOUTUBE OPTIMIZATION */}
        {yt && (
          <section className="space-y-4 pt-4 border-t border-[var(--color-border-primary)]/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center font-mono text-xs font-bold">
                  02
                </div>
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <h2 className="text-xl font-bold text-[#FAFAFA] tracking-tight">
                    YOUTUBE OPTIMIZATION
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] font-semibold hidden sm:inline">
                  SEO Score: {yt.seoScore}/100
                </span>
                <button
                  onClick={handleCopyYouTubeAll}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeCopiedKey === 'yt-all'
                      ? 'bg-[#22C55E] text-white'
                      : 'bg-[#1C1C20] hover:bg-[var(--color-border-primary)] text-white border border-[var(--color-border-primary)]'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* YouTube Title Card */}
              <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-red-400" />
                    <span>YouTube Title (Max 100 chars)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(yt.title, 'YouTube Title', 'yt-title')}
                    className="px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {activeCopiedKey === 'yt-title' ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]/80 p-3.5 rounded-xl text-sm font-semibold text-[#FAFAFA]">
                  {yt.title}
                </div>
              </div>

              {/* YouTube Description Card */}
              <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-red-400" />
                    <span>YouTube Description (150–300 Words)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(yt.description, 'YouTube Description', 'yt-desc')}
                    className="px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {activeCopiedKey === 'yt-desc' ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]/80 p-3.5 rounded-xl text-xs sm:text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-line font-mono">
                  {yt.description}
                </div>
              </div>

              {/* YouTube Search Tags Card (Strict 500-Character Limit for YouTube Studio) */}
              {(() => {
                const rawTagList = yt.hashtags.map((tag) => tag.replace(/^#/, '').trim());
                // Build tag list strictly under 500 characters
                const fitTags: string[] = [];
                let currentLength = 0;
                for (const t of rawTagList) {
                  const addedLength = fitTags.length > 0 ? t.length + 2 : t.length;
                  if (currentLength + addedLength <= 500) {
                    fitTags.push(t);
                    currentLength += addedLength;
                  } else {
                    break;
                  }
                }
                const formattedTagsString = fitTags.join(', ');

                return (
                  <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-bold flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-red-400" />
                          <span>YouTube Tags (Comma-Separated for YouTube Studio)</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          formattedTagsString.length <= 500
                            ? 'bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E]'
                            : 'bg-red-500/15 border border-red-500/30 text-red-400'
                        }`}>
                          {formattedTagsString.length}/500 chars
                        </span>
                      </div>

                      <button
                        onClick={() => copyToClipboard(formattedTagsString, 'YouTube Tags', 'yt-tags')}
                        className="px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {activeCopiedKey === 'yt-tags' ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                        <span>Copy Tags</span>
                      </button>
                    </div>
                    <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]/80 p-4 rounded-xl text-xs font-mono text-[#FAFAFA] leading-relaxed selection:bg-[var(--color-brand-violet)]/40">
                      {formattedTagsString}
                    </div>
                  </div>
                );
              })()}

              {/* Thumbnail Prompt Card */}
              <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-bold flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-red-400" />
                    <span>Thumbnail Image Generator Prompt</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(yt.thumbnailPrompt, 'Thumbnail Prompt', 'yt-thumb')}
                    className="px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {activeCopiedKey === 'yt-thumb' ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]/80 p-3.5 rounded-xl text-xs sm:text-sm text-[#FAFAFA] font-mono leading-relaxed">
                  {yt.thumbnailPrompt}
                </div>
              </div>

              {/* Extra Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-4 rounded-2xl space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#A1A1AA]">Keywords</div>
                  <div className="text-xs text-[#FAFAFA] font-mono">{yt.keywords.join(', ')}</div>
                </div>
                <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-4 rounded-2xl space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#A1A1AA]">Category Recommendation</div>
                  <div className="text-xs text-[#FAFAFA] font-mono">{yt.categoryRecommendation}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: INSTAGRAM & FACEBOOK */}
        <section className="space-y-4 pt-4 border-t border-[var(--color-border-primary)]/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center justify-center font-mono text-xs font-bold">
                03
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-400" />
                <Facebook className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold text-[#FAFAFA] tracking-tight">
                  INSTAGRAM & FACEBOOK
                </h2>
              </div>
            </div>

            <button
              onClick={handleCopyIgFbAll}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCopiedKey === 'ig-fb-all'
                  ? 'bg-[#22C55E] text-white'
                  : 'bg-[#1C1C20] hover:bg-[var(--color-border-primary)] text-white border border-[var(--color-border-primary)]'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy All</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Instagram Caption Card */}
            {ig && (
              <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-bold flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram Caption (100–200 Words)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(ig.caption, 'Instagram Caption', 'ig-caption')}
                    className="px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {activeCopiedKey === 'ig-caption' ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]/80 p-3.5 rounded-xl text-xs sm:text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-line font-mono">
                  {ig.caption}
                </div>
              </div>
            )}

            {/* Instagram Hashtags Card */}
            {ig && (
              <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-bold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram Hashtags (8–12 Targeted)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(ig.hashtags.join(' '), 'Instagram Hashtags', 'ig-tags')}
                    className="px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {activeCopiedKey === 'ig-tags' ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]/80 p-3.5 rounded-xl text-xs font-mono text-pink-400 flex flex-wrap gap-2">
                  {ig.hashtags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action Card */}
            {(ig?.callToAction || fb?.callToAction) && (
              <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-bold flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-[var(--color-brand-violet)]" />
                    <span>Call To Action (CTA)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(ig?.callToAction || fb?.callToAction || '', 'CTA', 'cta')}
                    className="px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {activeCopiedKey === 'cta' ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]/80 p-3.5 rounded-xl text-xs sm:text-sm text-[#FAFAFA] font-mono font-semibold">
                  {ig?.callToAction || fb?.callToAction}
                </div>
              </div>
            )}

            {/* Facebook Caption Card */}
            {fb && (
              <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-bold flex items-center gap-1.5">
                    <Facebook className="w-3.5 h-3.5 text-blue-500" />
                    <span>Facebook Caption & Post Angle</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(fb.caption, 'Facebook Caption', 'fb-caption')}
                    className="px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] hover:bg-[#1C1C20] text-[#A1A1AA] hover:text-white border border-[var(--color-border-primary)] text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {activeCopiedKey === 'fb-caption' ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
                <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]/80 p-3.5 rounded-xl text-xs sm:text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-line font-mono">
                  {fb.caption}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM GLOBAL ACTIONS BAR */}
        <div className="pt-8 border-t border-[var(--color-border-primary)] flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCopyEverything}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-semibold transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] ${
              activeCopiedKey === 'everything'
                ? 'bg-[#22C55E] text-white shadow-[#22C55E]/20'
                : 'bg-[var(--color-brand-violet)] hover:bg-[var(--color-brand-violet)] text-white shadow-[var(--color-brand-violet)]/30'
            }`}
          >
            {activeCopiedKey === 'everything' ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied Everything!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy Everything</span>
              </>
            )}
          </button>

          <button
            onClick={onCreateAnother}
            className="w-full sm:w-auto px-8 py-4 bg-[var(--color-bg-surface)] hover:bg-[#1C1C20] text-[#FAFAFA] text-sm sm:text-base font-medium rounded-2xl border border-[var(--color-border-primary)] transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5 text-[var(--color-brand-violet)]" />
            <span>Generate Another Prompt</span>
          </button>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[var(--color-bg-primary)] hover:bg-[var(--color-bg-surface)] text-[#A1A1AA] hover:text-white text-sm sm:text-base font-medium rounded-2xl border border-[var(--color-border-primary)] transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </a>
        </div>

        {/* PRIVACY WARNING FOOTER */}
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] p-4 rounded-xl text-center flex items-center justify-center gap-2 text-xs text-[#22C55E] font-mono">
          <Lock className="w-4 h-4 shrink-0" />
          <span>
            Everything generated here exists only in your current session. Refreshing or leaving permanently clears this data.
          </span>
        </div>
      </div>
    </div>
  );
};
