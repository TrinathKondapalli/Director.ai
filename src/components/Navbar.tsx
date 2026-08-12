import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Menu, X, Home, Lightbulb, Tag, ArrowRight, PenTool, BookOpen } from 'lucide-react';
import { DirectorLogoBanner } from './DirectorLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    onNavigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    setIsMobileMenuOpen(false);
  };

  const handleHowItWorksClick = () => {
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-4 z-50 px-4 w-full flex justify-center mb-4">
      <header className="glass-panel rounded-[20px] md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full md:w-auto">
        <div className="px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between md:gap-12 lg:gap-16">
          {/* Left: Brand Logo Banner */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="cursor-pointer focus:outline-none flex items-center group active:scale-95 transition-transform"
            >
              <img 
                src="/Horizontal_Logo.png" 
                alt="Director.ai" 
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </button>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium tracking-wide">
            <button
              onClick={() => onNavigate('/ugc-studio')}
              className={`transition-colors cursor-pointer ${
                currentPath === '/ugc-studio' ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              AI UGC Studio
            </button>
            <button
              onClick={() => onNavigate('/design-publisher')}
              className={`transition-colors cursor-pointer ${
                currentPath === '/design-publisher' ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              AI Design Publisher
            </button>
            <button
              onClick={() => onNavigate('/my-journal')}
              className={`transition-colors cursor-pointer ${
                currentPath === '/my-journal' ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              My Journal
            </button>
            <button
              onClick={() => onNavigate('/brand-strategist')}
              className={`transition-colors cursor-pointer ${
                currentPath === '/brand-strategist' ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              Brand Strategist
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop Primary Action Button */}
            <button
              onClick={() => onNavigate('/ugc-studio')}
              className="hidden md:flex px-6 py-2.5 btn-primary text-[14px] items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>AI UGC Studio</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => onNavigate('/ugc-studio')}
                className="px-4 py-2 btn-primary text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>UGC Studio</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 text-[var(--color-text-secondary)] hover:text-white bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] border border-[var(--color-border-primary)] rounded-[14px] transition-colors cursor-pointer focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden absolute top-20 left-0 right-0 bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="px-4 py-5 space-y-2.5">
              <button
                onClick={() => handleMobileNav('/ugc-studio')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-[14px] text-sm font-medium transition-colors ${
                  currentPath === '/ugc-studio'
                    ? 'bg-[var(--color-brand-violet)]/15 text-[var(--color-brand-lavender)] border border-[var(--color-brand-violet)]/30'
                    : 'text-[var(--color-text-secondary)] hover:text-white bg-[var(--color-bg-primary)] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[var(--color-brand-violet)]" />
                  <span>AI UGC Studio</span>
                </div>
              </button>
              <button
                onClick={() => handleMobileNav('/design-publisher')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-[14px] text-sm font-medium transition-colors ${
                  currentPath === '/design-publisher'
                    ? 'bg-[var(--color-brand-violet)]/15 text-[var(--color-brand-lavender)] border border-[var(--color-brand-violet)]/30'
                    : 'text-[var(--color-text-secondary)] hover:text-white bg-[var(--color-bg-primary)] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <PenTool className="w-4 h-4 text-[var(--color-brand-violet)]" />
                  <span>AI Design Publisher</span>
                </div>
              </button>
              <button
                onClick={() => handleMobileNav('/my-journal')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-[14px] text-sm font-medium transition-colors ${
                  currentPath === '/my-journal'
                    ? 'bg-[var(--color-brand-violet)]/15 text-[var(--color-brand-lavender)] border border-[var(--color-brand-violet)]/30'
                    : 'text-[var(--color-text-secondary)] hover:text-white bg-[var(--color-bg-primary)] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[var(--color-brand-violet)]" />
                  <span>My Journal</span>
                </div>
              </button>
              <button
                onClick={() => handleMobileNav('/brand-strategist')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-[14px] text-sm font-medium transition-colors ${
                  currentPath === '/brand-strategist'
                    ? 'bg-[var(--color-brand-violet)]/15 text-[var(--color-brand-lavender)] border border-[var(--color-brand-violet)]/30'
                    : 'text-[var(--color-text-secondary)] hover:text-white bg-[var(--color-bg-primary)] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-[var(--color-brand-violet)]" />
                  <span>Brand Strategist</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
