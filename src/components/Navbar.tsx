import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Menu, X, Home, Lightbulb, Tag } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-50 bg-[#09090B]/95 backdrop-blur-md border-b border-[#27272A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo Banner */}
        <button
          onClick={() => handleMobileNav('/')}
          className="cursor-pointer focus:outline-none flex items-center group active:scale-95 transition-transform"
        >
          <DirectorLogoBanner size="sm" showBadge={true} />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <button
            onClick={() => onNavigate('/')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPath === '/' ? 'text-white font-medium bg-[#111113]' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('/generate')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPath === '/generate' ? 'text-white font-medium bg-[#111113]' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Generate
          </button>
          <button
            onClick={() => onNavigate('/ideas')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/ideas' ? 'text-white font-medium bg-[#111113]' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-[#A78BFA]" />
            <span>Trending Concepts</span>
          </button>
          <button
            onClick={() => onNavigate('/pricing')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPath === '/pricing' ? 'text-white font-medium bg-[#111113]' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => onNavigate('/privacy')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/privacy' ? 'text-white font-medium bg-[#111113]' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>Privacy</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onNavigate('/generate')}
            className="ml-2 px-4 py-2 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-[#8B5CF6]/20 hover:shadow-[#A78BFA]/30 flex items-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Generate Master Prompt</span>
          </button>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => onNavigate('/generate')}
            className="px-3 py-1.5 bg-[#8B5CF6] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Generate</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#A1A1AA] hover:text-white bg-[#111113] hover:bg-[#1C1C20] border border-[#27272A] rounded-xl transition-colors cursor-pointer focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#111113] border-b border-[#27272A] shadow-2xl"
          >
            <div className="px-4 py-5 space-y-2.5 max-w-6xl mx-auto">
              <button
                onClick={() => handleMobileNav('/')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPath === '/'
                    ? 'bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30'
                    : 'text-[#A1A1AA] hover:text-white bg-[#09090B] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </div>
              </button>

              <button
                onClick={() => handleMobileNav('/generate')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPath === '/generate'
                    ? 'bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30'
                    : 'text-[#A1A1AA] hover:text-white bg-[#09090B] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Generate Master Prompt</span>
                </div>
              </button>

              <button
                onClick={() => handleMobileNav('/ideas')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPath === '/ideas'
                    ? 'bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30'
                    : 'text-[#A1A1AA] hover:text-white bg-[#09090B] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-4 h-4 text-[#A78BFA]" />
                  <span>Trending Concepts</span>
                </div>
              </button>

              <button
                onClick={() => handleMobileNav('/pricing')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPath === '/pricing'
                    ? 'bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30'
                    : 'text-[#A1A1AA] hover:text-white bg-[#09090B] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-[#A1A1AA]" />
                  <span>Pricing</span>
                </div>
              </button>

              <button
                onClick={() => handleMobileNav('/privacy')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPath === '/privacy'
                    ? 'bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30'
                    : 'text-[#A1A1AA] hover:text-white bg-[#09090B] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                  <span>Privacy Policy</span>
                </div>
              </button>

              <div className="pt-2">
                <button
                  onClick={() => handleMobileNav('/generate')}
                  className="w-full py-3.5 px-4 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#8B5CF6]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Generate Master Prompt</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
