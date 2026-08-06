import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  CheckCircle2,
  RefreshCw,
  Search,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Image as ImageIcon,
  Hash,
  Wand2,
  List,
  Video,
  FileText,
  Mail,
  Briefcase
} from 'lucide-react';
import { DesignContentResult } from '../types';

interface ContentResultPageProps {
  result: DesignContentResult;
  onCreateAnother: () => void;
}

export const ContentResultPage: React.FC<ContentResultPageProps> = ({ result, onCreateAnother }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCopiedKey, setActiveCopiedKey] = useState<string | null>(null);

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

  const copyAll = () => {
    const fullText = `
--- ${result.researchSummary.topicTitle} ---
${result.researchSummary.summary}

LINKEDIN:
${result.linkedInPost}

TWITTER THREAD:
${result.twitter.thread.join('\n\n')}
    `.trim();
    copyToClipboard(fullText, 'All Content', 'all');
  };

  const SectionCard = ({ title, icon: Icon, children, copyText, copyLabel, copyKey }: any) => (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-xl overflow-hidden flex flex-col">
      <div className="bg-[var(--color-bg-primary)] border-b border-[var(--color-border-primary)] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon className="w-5 h-5 text-[var(--color-brand-violet)]" />
          <h3 className="font-sora font-bold text-[#FAFAFA] text-sm uppercase tracking-wider">{title}</h3>
        </div>
        {copyText && (
          <button
            onClick={() => copyToClipboard(copyText, copyLabel, copyKey)}
            className="p-2 bg-[var(--color-bg-surface)] hover:bg-[var(--color-border-primary)] border border-[var(--color-border-primary)] rounded-lg text-[#A1A1AA] hover:text-white transition-colors"
            title={`Copy ${copyLabel}`}
          >
            {activeCopiedKey === copyKey ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
      <div className="p-5 flex-1 text-sm text-[#A1A1AA] whitespace-pre-wrap font-inter leading-relaxed">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] py-10 px-4 sm:px-6 relative pb-24 flex justify-center selection:bg-[var(--color-brand-violet)]/30">
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

      <div className="w-full max-w-6xl space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[var(--color-border-primary)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-[var(--color-brand-violet)]/15 border border-[var(--color-brand-violet)]/30 text-[var(--color-brand-violet)] text-[11px] font-mono font-semibold tracking-wide uppercase">
                {result.researchSummary.source} • {result.researchSummary.date}
              </span>
              <span className="px-3 py-1 rounded-full bg-[var(--color-brand-magenta)]/10 border border-[var(--color-brand-magenta)]/20 text-[var(--color-brand-magenta)] text-[11px] font-mono font-semibold tracking-wide uppercase">
                {result.researchSummary.difficultyLevel}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-sora font-extrabold text-[#FAFAFA] tracking-tight leading-snug">
              {result.researchSummary.topicTitle}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={onCreateAnother} className="btn-secondary flex-1 md:flex-none">
              <RefreshCw className="w-4 h-4" />
              <span>New Topic</span>
            </button>
            <button onClick={copyAll} className="btn-primary flex-1 md:flex-none">
              <Copy className="w-4 h-4" />
              <span>Copy All</span>
            </button>
          </div>
        </div>

        {/* MASONRY GRID FOR SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Research Summary */}
          <SectionCard title="Research Summary" icon={Search}>
            <strong className="text-white">Summary:</strong><br/>
            {result.researchSummary.summary}<br/><br/>
            <strong className="text-white">Why It Matters:</strong><br/>
            {result.researchSummary.whyItMatters}<br/><br/>
            <strong className="text-white">Key Takeaways:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {result.researchSummary.keyTakeaways.map((k, i) => <li key={i}>{k}</li>)}
            </ul>
          </SectionCard>

          {/* LinkedIn */}
          <SectionCard title="LinkedIn Post" icon={Linkedin} copyText={result.linkedInPost} copyLabel="LinkedIn" copyKey="linkedin">
            {result.linkedInPost}
          </SectionCard>

          {/* Twitter */}
          <SectionCard title="Twitter Thread" icon={Twitter} copyText={result.twitter.thread.join('\n\n')} copyLabel="Twitter Thread" copyKey="twitter">
            {result.twitter.thread.map((tweet, i) => (
              <div key={i} className="mb-4 pb-4 border-b border-[var(--color-border-primary)] last:border-0 last:mb-0 last:pb-0">
                {tweet}
              </div>
            ))}
          </SectionCard>

          {/* Instagram */}
          <SectionCard title="Instagram Caption" icon={Instagram} copyText={result.instagramCaption} copyLabel="Instagram" copyKey="instagram">
            {result.instagramCaption}
          </SectionCard>

          {/* AI Prompts */}
          <SectionCard title="AI Image & Thumbnail" icon={ImageIcon} copyText={`IMAGE:\n${result.imagePrompt}\n\nTHUMBNAIL:\n${result.thumbnailPrompt}`} copyLabel="Prompts" copyKey="prompts">
            <strong className="text-white text-xs font-mono uppercase">Editorial Image Prompt</strong><br/>
            <div className="bg-[var(--color-bg-primary)] p-3 rounded-lg border border-[var(--color-border-primary)] font-mono text-[11px] text-[var(--color-brand-violet)] mt-2 mb-4">
              {result.imagePrompt}
            </div>
            <strong className="text-white text-xs font-mono uppercase">Thumbnail Prompt</strong><br/>
            <div className="bg-[var(--color-bg-primary)] p-3 rounded-lg border border-[var(--color-border-primary)] font-mono text-[11px] text-[var(--color-brand-magenta)] mt-2">
              {result.thumbnailPrompt}
            </div>
          </SectionCard>

          {/* Video Script */}
          <SectionCard title="Short Video Scripts" icon={Video} copyText={result.shortVideoScript.sec60} copyLabel="Video Script" copyKey="script">
            <strong className="text-white">60-Second Hook & Script:</strong><br/><br/>
            {result.shortVideoScript.sec60}
          </SectionCard>

          {/* Carousel */}
          <SectionCard title="Carousel Content" icon={List} copyText={Object.values(result.carouselContent).join('\n')} copyLabel="Carousel" copyKey="carousel">
            <div className="space-y-3">
              {Object.entries(result.carouselContent).map(([k, v], i) => (
                <div key={k} className="flex gap-3">
                  <div className="w-6 h-6 rounded-md bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] flex items-center justify-center font-mono text-[10px] shrink-0">{i+1}</div>
                  <div className="text-sm">{v}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Post Variations */}
          <SectionCard title="Post Variations" icon={Wand2} copyText={Object.values(result.postVariations).join('\n\n')} copyLabel="Variations" copyKey="variations">
            <strong className="text-white">Minimal Version:</strong><br/>
            {result.postVariations.minimal}<br/><br/>
            <strong className="text-white">Storytelling Version:</strong><br/>
            {result.postVariations.storytelling}
          </SectionCard>

          {/* Blog & Newsletter */}
          <SectionCard title="Newsletter & Blog" icon={Mail} copyText={result.newsletterVersion} copyLabel="Newsletter" copyKey="newsletter">
            <strong className="text-white">Email Subject:</strong><br/>
            {result.newsletterVersion.split('\n')[0]}<br/><br/>
            <strong className="text-white">Blog SEO Title:</strong><br/>
            {result.blogOutline.seoTitle}
          </SectionCard>

          {/* Portfolio Insight */}
          <SectionCard title="Portfolio Insight" icon={Briefcase} copyText={result.portfolioInsight} copyLabel="Portfolio Insight" copyKey="portfolio">
            {result.portfolioInsight}
          </SectionCard>

          {/* SEO & Hashtags */}
          <SectionCard title="Keywords & Hashtags" icon={Hash} copyText={result.seoKeywords.primary.join(', ')} copyLabel="SEO" copyKey="seo">
            <strong className="text-white">Primary Keywords:</strong><br/>
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {result.seoKeywords.primary.map((k, i) => <span key={i} className="px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md text-[11px] font-mono">{k}</span>)}
            </div>
            <strong className="text-white">LinkedIn Hashtags:</strong><br/>
            <div className="text-[12px] mt-2 font-mono text-[var(--color-brand-violet)]">
              {result.seoHashtags.linkedin.slice(0, 10).join(' ')}
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
};
