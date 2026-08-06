import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { PromptGenerator } from './components/PromptGenerator';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultPage } from './components/ResultPage';
import { IdeasPage } from './components/IdeasPage';
import { PricingPage } from './components/PricingPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { ContactPage } from './components/ContactPage';
import { ContentStudio } from './components/ContentStudio';
import { DirectorLogoIcon } from './components/DirectorLogo';
import { MasterPromptInput, MasterPromptResult, AiConceptCard } from './types';
import { generateLocalMasterPrompt, generateMasterPrompt } from './data/generatorEngine';
import { PageCurtain } from './components/PageCurtain';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Music, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Zap, 
  Globe,
  ChevronDown
} from 'lucide-react';
export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p === '/generate' || p === '/result' || p === '/ideas' || p === '/pricing' || p === '/privacy' || p === '/terms' || p === '/contact' || p === '/studio') {
        return p;
      }
    }
    return '/';
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState<boolean>(false);
  const [pendingResult, setPendingResult] = useState<MasterPromptResult | null>(null);
  const [activeResult, setActiveResult] = useState<MasterPromptResult | null>(null);
  const [initialGeneratorValues, setInitialGeneratorValues] = useState<Partial<MasterPromptInput>>({});

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [incomingPageName, setIncomingPageName] = useState<string>('');

  // Sync route with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path === currentPath) return;

    let pageName = 'Home';
    if (path === '/generate') pageName = 'Generate';
    if (path === '/ideas') pageName = 'Trending Concepts';
    if (path === '/pricing') pageName = 'Pricing';
    if (path === '/privacy') pageName = 'Privacy Policy';
    if (path === '/terms') pageName = 'Terms of Service';
    if (path === '/contact') pageName = 'Contact Us';
    if (path === '/result') pageName = 'Master Prompt';
    if (path === '/studio') pageName = 'Content Studio';

    setIncomingPageName(pageName);
    setIsTransitioning(true);

    // Wait for the curtain to fully cover the screen (matches animation duration)
    setTimeout(() => {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });

      // After route changes, pull the curtain away
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 600);
  };

  const handleGeneratePrompt = async (input: MasterPromptInput) => {
    setIsGenerating(true);
    setShowLoadingAnimation(true);

    try {
      const resultObj = await generateMasterPrompt(input);
      setPendingResult(resultObj);
    } catch (err) {
      console.warn('Backend API unavailable, using local high-performance engine:', err);
      const fallback = generateLocalMasterPrompt(input);
      setPendingResult(fallback);
    }
  };

  const handleLoadingComplete = () => {
    if (pendingResult) {
      setActiveResult(pendingResult);
      setPendingResult(null);
    }
    setIsGenerating(false);
    setShowLoadingAnimation(false);
    navigateTo('/result');
  };

  const handleCreateAnother = () => {
    setActiveResult(null);
    setPendingResult(null);
    setInitialGeneratorValues({});
    navigateTo('/generate');
  };

  const handleSelectConcept = (concept: AiConceptCard) => {
    setInitialGeneratorValues({
      productName: concept.productNameExample,
      targetAudience: concept.targetAudience,
    });
    navigateTo('/generate');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans selection:bg-[#6615F6]/30">
      <PageCurtain isVisible={isTransitioning} title={incomingPageName} />
      
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      <main className="flex-1">
        {showLoadingAnimation ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
          <>
            {currentPath === '/' && (
              <LandingPage onNavigate={navigateTo} />
            )}

            {currentPath === '/generate' && (
              <PromptGenerator
                onGenerate={handleGeneratePrompt}
                isGenerating={isGenerating}
                initialValues={initialGeneratorValues}
                onNavigate={navigateTo}
              />
            )}

            {currentPath === '/studio' && (
              <ContentStudio onNavigate={navigateTo} />
            )}

            {currentPath === '/result' && activeResult && (
              <ResultPage
                result={activeResult}
                onCreateAnother={handleCreateAnother}
              />
            )}

            {/* Fallback for result page if refreshed or accessed directly without memory state */}
            {currentPath === '/result' && !activeResult && (
              <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] p-8 rounded-[20px] max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  <h2 className="text-xl font-bold text-white mb-2 font-display">No Active Prompt in Memory</h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed font-mono">
                    "Your ideas stay yours." Prompts are held strictly in temporary RAM and erased upon page refresh.
                  </p>
                  <button
                    onClick={() => navigateTo('/generate')}
                    className="px-6 py-3 btn-primary text-sm w-full cursor-pointer"
                  >
                    Generate Master Prompt
                  </button>
                </div>
              </div>
            )}

            {currentPath === '/ideas' && (
              <IdeasPage onSelectConcept={handleSelectConcept} />
            )}

            {currentPath === '/pricing' && (
              <PricingPage onNavigate={navigateTo} />
            )}

            {currentPath === '/privacy' && <PrivacyPage />}

            {currentPath === '/terms' && <TermsPage />}

            {currentPath === '/contact' && <ContactPage />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-bg-primary)] pt-24 pb-8 px-4 sm:px-6 relative border-t border-[var(--color-border-divider)] mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-8 mb-24">
            
            {/* Column 1: Brand & Socials */}
            <div className="md:col-span-1 lg:col-span-2">
              <div className="mb-6">
                <DirectorLogoIcon className="h-10 w-auto mb-2" />
                <div className="text-[10px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase">AI Creative Studio</div>
              </div>
              <p className="font-sans text-[14px] text-[var(--color-text-secondary)] leading-relaxed max-w-sm mb-8">
                The AI UGC Ad Director that turns ideas into scroll-stopping ads — in seconds. <br/> No prompts. Just results.
              </p>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-[14px] bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-border-divider)] transition-colors">
                  <Youtube className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-[14px] bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-border-divider)] transition-colors">
                  <Instagram className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-[14px] bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-border-divider)] transition-colors">
                  <Music className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-[14px] bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-border-divider)] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column 2: PRODUCT */}
            <div className="md:col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-sans text-[12px] font-bold text-white tracking-wider uppercase">PRODUCT</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-violet)] shadow-[0_0_8px_rgba(123,77,255,0.8)]" />
              </div>
              <ul className="space-y-4 font-sans text-[14px] text-[var(--color-text-secondary)]">
                <li><button onClick={() => navigateTo('/ideas')} className="hover:text-white transition-colors">Trending Concepts</button></li>
                <li><button onClick={() => navigateTo('/generate')} className="hover:text-white transition-colors">Generate Prompts</button></li>
              </ul>
            </div>

            {/* Column 3: CREATOR */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-sans text-[12px] font-bold text-white tracking-wider uppercase">CREATOR</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-violet)] shadow-[0_0_8px_rgba(123,77,255,0.8)]" />
              </div>
              <ul className="space-y-4 font-sans text-[14px] text-[var(--color-text-secondary)]">
                <li><button className="hover:text-white transition-colors">GitHub Repository</button></li>
                <li><button className="hover:text-white transition-colors">Developer Portfolio</button></li>
                <li><button onClick={() => navigateTo('/contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[var(--color-border-primary)] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-sans text-[13px] text-[var(--color-text-muted)]">
              © 2025 Director.ai. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-[13px] font-sans text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--color-brand-violet)]" />
                <span>Zero Data Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[var(--color-brand-violet)]" />
                <span>Enterprise Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--color-brand-violet)]" />
                <span>Built for Speed</span>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-elevated)] text-[13px] font-sans transition-colors">
              <Globe className="w-4 h-4 text-[var(--color-brand-violet)]" />
              <span>English</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
