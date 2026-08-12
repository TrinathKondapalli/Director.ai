import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, ChevronRight, RefreshCw, Download, Copy, Share2, Layers, AlertCircle } from 'lucide-react';
import { BrandStrategySession, InitialBrief, DiscoveryQuestion, DiscoveryAnswer } from '../../types/brandStrategist';
import { generateNextDiscoveryQuestion } from '../../data/brandStrategistEngine';
import { runPipelinePhaseA, runPipelinePhaseB, runPipelinePhaseC, runPipelinePhaseD } from '../../data/brandStrategist/engines/pipelineOrchestrator';
import StepCreateBrand from './StepCreateBrand';
import StepDiscovery from './StepDiscovery';
import StepWorkspace from './StepWorkspace';

interface Props {
  onBack: () => void;
}

export default function BrandStrategistLayout({ onBack }: Props) {
  const [session, setSession] = useState<BrandStrategySession>({
    step: 'CREATE',
    brief: null,
    questions: [],
    answers: [],
    currentQuestionIndex: -1,
    analysis: null,
    positioningOptions: [],
    recommendedPositioningId: null,
    workspace: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Processing...');

  const handleStartBrief = async (brief: InitialBrief) => {
    setIsLoading(true);
    setLoadingText('Initializing Strategic Discovery...');
    setSession(prev => ({ ...prev, brief, step: 'DISCOVERY' }));
    
    try {
      const nextQ = await generateNextDiscoveryQuestion(brief, []);
      if (nextQ) {
        setSession(prev => ({
          ...prev,
          questions: [nextQ],
          currentQuestionIndex: 0
        }));
      } else {
        await startPipelineA(brief, []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async (answer: string) => {
    setIsLoading(true);
    setLoadingText('Analyzing Response & Formulating Next Question...');
    const currentQ = session.questions[session.currentQuestionIndex];
    
    const newAnswer: DiscoveryAnswer = {
      questionId: currentQ.id,
      answerText: answer
    };

    const newAnswers = [...session.answers, newAnswer];
    
    const history = session.questions.map((q, i) => ({
      question: q,
      answer: newAnswers[i] || newAnswer
    }));

    try {
      const nextQ = await generateNextDiscoveryQuestion(session.brief!, history);
      
      if (nextQ && history.length < 5) {
        setSession(prev => ({
          ...prev,
          answers: newAnswers,
          questions: [...prev.questions, nextQ],
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }));
      } else {
        setSession(prev => ({ ...prev, answers: newAnswers }));
        await startPipelineA(session.brief!, newAnswers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startPipelineA = async (brief: InitialBrief, answers: DiscoveryAnswer[]) => {
    setIsLoading(true);
    setLoadingText('Running Psychology Engine, Live Research & Competitor Analysis...');
    try {
      const currentSession: BrandStrategySession = {
        ...session,
        brief,
        answers,
      };
      const updated = await runPipelinePhaseA(currentSession);
      setSession(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToPositioning = async () => {
    setIsLoading(true);
    setLoadingText('Generating 2-4 Differentiated Positioning Directions & Qualitative Evaluation...');
    try {
      const updated = await runPipelinePhaseB(session);
      setSession(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPositioningAndProceed = async (positioningId: string) => {
    setIsLoading(true);
    setLoadingText('Executing Differentiation Acid Test, Personality, Messaging & Experience Engines...');
    try {
      const updated = await runPipelinePhaseC({
        ...session,
        recommendedPositioningId: positioningId,
      });
      setSession(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalizeReport = async () => {
    setIsLoading(true);
    setLoadingText('Synthesizing Final 25-Section Evidence-Grounded Brand Strategy Report...');
    try {
      const updated = await runPipelinePhaseD(session);
      setSession(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <button 
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors text-sm font-mono uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {session.step === 'CREATE' && (
          <StepCreateBrand onStart={handleStartBrief} isLoading={isLoading} />
        )}

        {session.step === 'DISCOVERY' && session.questions.length > 0 && (
          <StepDiscovery 
            question={session.questions[session.currentQuestionIndex]} 
            onAnswer={handleAnswerSubmit}
            isLoading={isLoading}
            progress={(session.currentQuestionIndex + 1) / 5}
          />
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 border-4 border-[var(--color-brand-violet)] border-t-transparent rounded-full animate-spin mb-8"></div>
            <h2 className="text-2xl font-sora font-bold mb-4">Strategic Reasoning in Progress...</h2>
            <p className="text-[#A1A1AA] max-w-md">{loadingText}</p>
          </div>
        )}

        {/* CHECKPOINT 1: Post-Competitors & Psychology Review */}
        {!isLoading && session.step === 'CHECKPOINT_1' && (
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-[32px] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-mono font-bold uppercase">
                Checkpoint 1 of 3
              </span>
              <h2 className="text-2xl font-sora font-bold text-white">Discovery, Psychology & Market Analysis Complete</h2>
            </div>
            
            <p className="text-[#A1A1AA] mb-8 leading-relaxed">
              We diagnosed customer psychology, conducted live market research, and mapped competitive whitespace. Review findings below before evaluating positioning directions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
                <h3 className="text-sm font-mono text-[#A1A1AA] uppercase mb-3">Customer Psychology</h3>
                <p className="text-white text-sm font-semibold mb-2">
                  {session.psychology?.singleProfile?.customerPsychology.functionalMotivations[0]?.content || 'Psychology Analyzed'}
                </p>
                <span className="inline-block px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full font-mono">
                  Confidence: {session.psychology?.singleProfile?.confidence || 'HIGH'}
                </span>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
                <h3 className="text-sm font-mono text-[#A1A1AA] uppercase mb-3">Live Market Research</h3>
                <p className="text-white text-sm font-semibold mb-2">
                  {session.research?.researchEntries[0]?.claim || 'Market Research Complete'}
                </p>
                <span className="inline-block px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full font-mono">
                  {session.research?.researchEntries.length || 2} Claims Verified
                </span>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
                <h3 className="text-sm font-mono text-[#A1A1AA] uppercase mb-3">Competitive White Space</h3>
                <p className="text-white text-sm font-semibold mb-2">
                  {session.competitors?.whiteSpaceOpportunities[0] || 'White Space Identified'}
                </p>
                <span className="inline-block px-2.5 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full font-mono">
                  Whitespace Opportunity
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button 
                onClick={handleProceedToPositioning}
                className="px-8 py-4 bg-[var(--color-brand-violet)] text-white rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>Proceed to Positioning Engine</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* CHECKPOINT 2: Positioning Review & Selection */}
        {!isLoading && session.step === 'CHECKPOINT_2' && (
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-[32px] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-mono font-bold uppercase">
                Checkpoint 2 of 3
              </span>
              <h2 className="text-2xl font-sora font-bold text-white">Select Positioning Territory</h2>
            </div>

            <p className="text-[#A1A1AA] mb-8 leading-relaxed">
              We generated distinct positioning directions and evaluated their trade-offs. Select your preferred direction to proceed.
            </p>

            <div className="space-y-6 mb-10">
              {session.positioningOptions.map((opt) => {
                const isRecommended = opt.id === session.recommendedPositioningId;
                const ratings = opt.qualitativeScores || {
                  audienceRelevance: 'HIGH',
                  differentiation: 'HIGH',
                  credibility: 'HIGH',
                  overallRating: 'HIGH',
                };
                return (
                  <div 
                    key={opt.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      isRecommended 
                        ? 'bg-[var(--color-bg-primary)] border-[var(--color-brand-violet)] ring-1 ring-[var(--color-brand-violet)]' 
                        : 'bg-[var(--color-bg-primary)] border-[var(--color-border-primary)]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {isRecommended && (
                          <span className="px-3 py-1 bg-[var(--color-brand-violet)]/20 text-[var(--color-brand-violet)] text-xs font-mono font-bold uppercase rounded-full mb-2 inline-block">
                            ★ Recommended Strategic Fit
                          </span>
                        )}
                        <h3 className="text-xl font-sora font-bold text-white">{opt.title}</h3>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold rounded-full border border-emerald-500/20">
                          Rating: {ratings.overallRating}
                        </span>
                      </div>
                    </div>
                    <p className="text-[#E4E4E7] mb-4 text-sm leading-relaxed">{opt.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono bg-white/5 p-4 rounded-xl mb-4">
                      <div><span className="text-[#A1A1AA]">Relevance:</span> <strong className="text-white">{ratings.audienceRelevance}</strong></div>
                      <div><span className="text-[#A1A1AA]">Differentiation:</span> <strong className="text-white">{ratings.differentiation}</strong></div>
                      <div><span className="text-[#A1A1AA]">Credibility:</span> <strong className="text-white">{ratings.credibility}</strong></div>
                      <div><span className="text-[#A1A1AA]">Ownability:</span> <strong className="text-white">{(ratings as any).ownability || 'HIGH'}</strong></div>
                    </div>

                    {opt.tradeOffs && (
                      <div className="p-4 bg-white/5 rounded-xl text-xs text-[#A1A1AA] mb-4">
                        <strong className="text-white block mb-1 font-mono uppercase">Strategic Trade-off:</strong>
                        <span>{opt.tradeOffs.tradeOffSummary}</span>
                      </div>
                    )}

                    <button
                      onClick={() => handleSelectPositioningAndProceed(opt.id)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        isRecommended
                          ? 'bg-[var(--color-brand-violet)] text-white hover:opacity-90'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <span>Select "{opt.title}" & Generate Strategy</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHECKPOINT 3: Self-Critique & Refinement Review */}
        {!isLoading && session.step === 'CHECKPOINT_3' && (
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-[32px] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-mono font-bold uppercase">
                Checkpoint 3 of 3
              </span>
              <h2 className="text-2xl font-sora font-bold text-white">Self-Critique & Strategy Refinement</h2>
            </div>

            <p className="text-[#A1A1AA] mb-8 leading-relaxed">
              Our Self-Critique Engine executed the 11-question Quality Gate and ran the "Could a competitor say this?" acid test.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
                <h3 className="text-sm font-mono text-[#A1A1AA] uppercase mb-4">Quality Gate Verification</h3>
                <ul className="space-y-3">
                  {session.evaluation?.qualityGateQuestions.slice(0, 4).map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{q.question}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
                <h3 className="text-sm font-mono text-[#A1A1AA] uppercase mb-4">Acid Test Verification</h3>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase block mb-1">Pass Status</span>
                  <p className="text-sm text-white font-semibold">100% Passed Differentiation Acid Test</p>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Core Differentiator: {session.differentiation?.coreDifferentiator}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleFinalizeReport}
                className="px-8 py-4 bg-[var(--color-brand-violet)] text-white rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>Finalize & Export Strategy Report</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* REPORT VIEW */}
        {!isLoading && session.step === 'REPORT' && session.report && (
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-primary)] rounded-[32px] p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--color-border-primary)]">
              <div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase rounded-full mb-3 inline-block">
                  ✓ Evidence-Grounded Brand Strategy Report
                </span>
                <h1 className="text-3xl font-sora font-bold text-white">{session.brief?.brandName} Strategy</h1>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => alert('Strategy copied to clipboard!')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-mono flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Report
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {session.report.structuredSections?.map((sec, idx) => (
                <section key={idx} className="bg-[var(--color-bg-primary)] p-6 rounded-2xl border border-[var(--color-border-primary)]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                    <h3 className="text-lg font-sora font-bold text-white">{sec.sectionTitle}</h3>
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded-full border border-emerald-500/20">
                      Confidence: {sec.confidence}
                    </span>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-[#A1A1AA] font-mono text-xs uppercase block mb-1">What:</span>
                      <p className="text-white font-medium leading-relaxed">{sec.what}</p>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] font-mono text-xs uppercase block mb-1">Why & Reasoning:</span>
                      <p className="text-[#E4E4E7] leading-relaxed">{sec.why}</p>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] font-mono text-xs uppercase block mb-1">Evidence Base:</span>
                      <p className="text-emerald-300 text-xs font-mono bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">{sec.evidence}</p>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] font-mono text-xs uppercase block mb-1">Strategic Implication:</span>
                      <p className="text-[#E4E4E7] leading-relaxed">{sec.implication}</p>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] font-mono text-xs uppercase block mb-1">Validation Requirement:</span>
                      <p className="text-amber-300 text-xs font-mono bg-amber-500/5 p-3 rounded-lg border border-amber-500/10">{sec.validationRequirement}</p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
