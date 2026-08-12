import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { UgcStudio } from './components/UgcStudio';
import { UgcResultPage } from './components/UgcResultPage';
import { LoadingScreen } from './components/LoadingScreen';
import { DesignPublisher } from './components/DesignPublisher';
import { DesignResultPage } from './components/DesignResultPage';
import { MyJournal } from './components/MyJournal';
import { PricingPage } from './components/PricingPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { ContactPage } from './components/ContactPage';
import BrandStrategistLayout from './components/BrandStrategist/BrandStrategistLayout';
import { DirectorLogoIcon } from './components/DirectorLogo';
import { UgcStudioInput, UgcStudioResult, DesignContentResult, UgcTopic, DesignTopic } from './types';
import { generateUgcContent, generateLocalUgcMock, generateUgcFromTopic } from './data/generatorEngine';
import { generateContentFromTopic } from './data/contentEngine';
import { PageCurtain } from './components/PageCurtain';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Music, 
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
      if (p === '/ugc-studio' || p === '/ugc-result' || p === '/design-publisher' || p === '/design-result' || p === '/my-journal' || p === '/pricing' || p === '/privacy' || p === '/terms' || p === '/contact' || p === '/brand-strategist') {
        return p;
      }
    }
    return '/';
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState<boolean>(false);
  
  // UGC State
  const [pendingResult, setPendingResult] = useState<UgcStudioResult | null>(null);
  const [activeResult, setActiveResult] = useState<UgcStudioResult | null>(null);

  // Design Publisher State
  const [pendingDesignResult, setPendingDesignResult] = useState<DesignContentResult | null>(null);
  const [activeDesignResult, setActiveDesignResult] = useState<DesignContentResult | null>(null);

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [incomingPageName, setIncomingPageName] = useState<string>('');

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
    if (path === '/ugc-studio') pageName = 'AI UGC Studio';
    if (path === '/design-publisher') pageName = 'AI Design Publisher';
    if (path === '/my-journal') pageName = 'My Journal';
    if (path === '/pricing') pageName = 'Pricing';
    if (path === '/privacy') pageName = 'Privacy Policy';
    if (path === '/terms') pageName = 'Terms of Service';
    if (path === '/contact') pageName = 'Contact Us';
    if (path === '/ugc-result') pageName = 'Studio Result';
    if (path === '/design-result') pageName = 'Design Result';
    if (path === '/brand-strategist') pageName = 'Brand Strategist';

    setIncomingPageName(pageName);
    setIsTransitioning(true);

    setTimeout(() => {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 600);
  };

  const handleGeneratePrompt = async (input: UgcStudioInput) => {
    setIsGenerating(true);
    setShowLoadingAnimation(true);

    const startTime = Date.now();
    let resultObj;
    try {
      resultObj = await generateUgcContent(input);
    } catch (err) {
      console.warn('Backend API unavailable, using local high-performance engine:', err);
      resultObj = generateLocalUgcMock(input);
    }

    const elapsed = Date.now() - startTime;
    const minLoadingTime = 3000;
    if (elapsed < minLoadingTime) {
      await new Promise(r => setTimeout(r, minLoadingTime - elapsed));
    }

    setActiveResult(resultObj);
    setIsGenerating(false);
    setShowLoadingAnimation(false);
    navigateTo('/ugc-result');
  };


  const handleGenerateUgcTopic = async (topic: UgcTopic) => {
    setIsGenerating(true);
    setShowLoadingAnimation(true);

    const startTime = Date.now();
    let resultObj;
    try {
      resultObj = await generateUgcFromTopic(topic);
    } catch (err) {
      console.warn('Backend API unavailable, using local topic engine:', err);
      resultObj = await generateUgcFromTopic(topic);
    }

    const elapsed = Date.now() - startTime;
    const minLoadingTime = 3000;
    if (elapsed < minLoadingTime) {
      await new Promise(r => setTimeout(r, minLoadingTime - elapsed));
    }

    setActiveResult(resultObj);
    setIsGenerating(false);
    setShowLoadingAnimation(false);
    navigateTo('/ugc-result');
  };

  const handleGenerateDesignTopic = async (topic: DesignTopic, format: 'single' | 'carousel') => {
    setIsGenerating(true);
    setShowLoadingAnimation(true);

    const startTime = Date.now();
    let resultObj;
    try {
      resultObj = await generateContentFromTopic(topic, format);
    } catch (err) {
      console.warn('Backend API unavailable, using local topic engine:', err);
      resultObj = await generateContentFromTopic(topic, format);
    }

    const elapsed = Date.now() - startTime;
    const minLoadingTime = 3000;
    if (elapsed < minLoadingTime) {
      await new Promise(r => setTimeout(r, minLoadingTime - elapsed));
    }

    setActiveDesignResult(resultObj);
    setIsGenerating(false);
    setShowLoadingAnimation(false);
    navigateTo('/design-result');
  };

  const handleLoadingComplete = () => {};

  const handleCreateAnotherUgc = () => {
    setActiveResult(null);
    setPendingResult(null);
    navigateTo('/ugc-studio');
  };

  const handleCreateAnotherDesign = () => {
    setActiveDesignResult(null);
    setPendingDesignResult(null);
    navigateTo('/design-publisher');
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

            {currentPath === '/ugc-studio' && (
              <UgcStudio 
                onGenerate={handleGeneratePrompt}
                onGenerateTopic={handleGenerateUgcTopic}
                isGenerating={isGenerating}
                onNavigate={navigateTo}
              />
            )}

            {currentPath === '/design-publisher' && (
              <DesignPublisher 
                onGenerateTopic={handleGenerateDesignTopic}
                isGenerating={isGenerating}
              />
            )}

            {currentPath === '/my-journal' && (
              <MyJournal />
            )}

            {currentPath === '/ugc-result' && activeResult && (
              <UgcResultPage
                result={activeResult}
                onCreateAnother={handleCreateAnotherUgc}
              />
            )}

            {currentPath === '/ugc-result' && !activeResult && (
              <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] p-8 rounded-[20px] max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  <h2 className="text-xl font-bold text-white mb-2 font-display">No Active Project in Memory</h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed font-mono">
                    "Your ideas stay yours." Projects are held strictly in temporary RAM and erased upon page refresh.
                  </p>
                  <button
                    onClick={() => navigateTo('/ugc-studio')}
                    className="px-6 py-3 btn-primary text-sm w-full cursor-pointer"
                  >
                    Go To UGC Studio
                  </button>
                </div>
              </div>
            )}

            {currentPath === '/design-result' && activeDesignResult && (
              <DesignResultPage
                result={activeDesignResult}
                onCreateAnother={handleCreateAnotherDesign}
              />
            )}

            {currentPath === '/design-result' && !activeDesignResult && (
              <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] p-8 rounded-[20px] max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  <h2 className="text-xl font-bold text-white mb-2 font-display">No Active Project in Memory</h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed font-mono">
                    "Your ideas stay yours." Projects are held strictly in temporary RAM and erased upon page refresh.
                  </p>
                  <button
                    onClick={() => navigateTo('/design-publisher')}
                    className="px-6 py-3 btn-primary text-sm w-full cursor-pointer"
                  >
                    Go To Design Publisher
                  </button>
                </div>
              </div>
            )}

            {currentPath === '/pricing' && (
              <PricingPage onNavigate={navigateTo} />
            )}

            {currentPath === '/privacy' && <PrivacyPage />}
            {currentPath === '/terms' && <TermsPage />}
            {currentPath === '/contact' && <ContactPage />}
            {currentPath === '/brand-strategist' && <BrandStrategistLayout onBack={() => navigateTo('/')} />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-bg-primary)] pt-24 pb-8 px-4 sm:px-6 relative border-t border-[var(--color-border-divider)] mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-8 mb-24">
            
            <div className="md:col-span-1 lg:col-span-2">
              <button 
                onClick={() => {
                  if (currentPath === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigateTo('/');
                  }
                }}
                className="mb-6 focus:outline-none cursor-pointer flex flex-col items-center md:items-start group active:scale-95 transition-transform"
              >
                <img 
                  src="/Horizontal_Logo.png" 
                  alt="Director.ai" 
                  className="h-8 md:h-10 w-auto object-contain mb-2"
                />
              </button>
              <p className="font-sans text-[14px] text-[var(--color-text-secondary)] leading-relaxed max-w-sm mb-8">
                The AI Content Studio that turns ideas into scroll-stopping ads and educational posts - in seconds. <br/> No generic templates. Just results.
              </p>

            </div>

            <div className="md:col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-sans text-[12px] font-bold text-white tracking-wider uppercase">PRODUCT</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-violet)] shadow-[0_0_8px_rgba(123,77,255,0.8)]" />
              </div>
              <ul className="space-y-4 font-sans text-[14px] text-[var(--color-text-secondary)]">
                <li><button onClick={() => navigateTo('/ugc-studio')} className="hover:text-white transition-colors">AI UGC Studio</button></li>
                <li><button onClick={() => navigateTo('/design-publisher')} className="hover:text-white transition-colors">AI Design Publisher</button></li>
                <li><button onClick={() => navigateTo('/my-journal')} className="hover:text-white transition-colors">My Journal</button></li>
              </ul>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-sans text-[12px] font-bold text-white tracking-wider uppercase">CREATOR</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-violet)] shadow-[0_0_8px_rgba(123,77,255,0.8)]" />
              </div>
              <ul className="space-y-4 font-sans text-[14px] text-[var(--color-text-secondary)]">
                <li><a href="https://trinath-kondapalli.vercel.app/tzinr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Designer Portfolio</a></li>
                <li><button onClick={() => navigateTo('/contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>

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
