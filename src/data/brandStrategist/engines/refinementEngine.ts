// src/data/brandStrategist/engines/refinementEngine.ts
import { BrandStrategySession, RefinementEngineResult, StrategyVersion, StrategyWorkspaceData } from '../../../types/brandStrategist';

/**
 * Run the RefinementEngine.
 * Dependency-aware engine to recompute affected strategic areas when decisions are updated and save strategy versions.
 */
export async function runRefinementEngine(
  session: BrandStrategySession,
  updatedSection?: string
): Promise<BrandStrategySession> {
  const section = updatedSection || 'positioning';

  const dependencyMap: Record<string, string[]> = {
    brief: ['psychology', 'research', 'competitors', 'positioning', 'differentiation', 'messaging', 'report'],
    discoveryAnswers: ['psychology', 'positioning', 'differentiation', 'messaging', 'report'],
    psychology: ['positioning', 'differentiation', 'messaging', 'experience', 'report'],
    positioning: ['differentiation', 'personality', 'messaging', 'experience', 'visualDirection', 'report'],
    differentiation: ['messaging', 'report'],
  };

  const affectedSections = dependencyMap[section] || ['report'];

  // Construct current StrategyWorkspaceData
  const workspaceData: StrategyWorkspaceData = {
    businessFoundation: session.brief?.description || 'Business Foundation',
    targetAudience: session.brief?.market || 'Target Audience',
    marketLandscape: session.research?.marketTrends.join(', ') || 'Market Trends',
    competitorAnalysis: session.competitors?.crowdedTerritories.join(', ') || 'Competitors',
    customerPainPoints: session.psychology?.singleProfile?.customerPsychology.pains.map(p => p.content).join(', ') || 'Pains',
    differentiation: session.differentiation?.coreDifferentiator || 'Core Differentiator',
    brandPurpose: 'To empower organizations with evidence-backed strategic clarity.',
    brandVoice: session.personality?.voiceStyle || 'Authoritative and crisp',
    mission: `To provide the world's most advanced AI-driven brand strategy suite.`,
    vision: `A world where every business operates with clear, defensible strategy.`,
    brandValues: ['Precision', 'Evidence Grounding', 'Radical Clarity', 'Defensibility'],
    brandPersonality: {
      primary: session.personality?.primaryPersonality || 'Elite Advisor',
      secondary: session.personality?.secondaryTraits[0] || 'Analytical',
      tertiary: session.personality?.secondaryTraits[1] || 'Direct',
      avoid: session.personality?.communicationBoundaries.dont || [],
      communicationStyle: session.personality?.voiceStyle || 'Crisp',
      tone: session.personality?.desiredFeeling || 'Confident',
    },
    brandArchetype: 'The Sage / The Creator',
    messagingPillars: session.messaging?.messagingPillars.map(p => p.pillar) || [],
    valueProposition: session.messaging?.valueProposition || 'Value Proposition',
    taglineDirections: session.messaging?.taglineDirections || [],
    customerExperiencePrinciples: session.experience?.experiencePrinciples || [],
    visualDirection: session.visualDirection?.visualPersonality || 'Editorial Minimalist',
    strategicRecommendations: session.evaluation?.refinementRecommendations || [],
  };

  const newVersion: StrategyVersion = {
    id: Math.random().toString(36).substring(2, 9),
    name: `Version ${ (session.versions?.length || 0) + 1 } (Refined ${section})`,
    createdAt: new Date().toLocaleTimeString(),
    workspace: workspaceData,
    notes: `Updated section: ${section}`,
  };

  const existingVersions = session.versions || [];

  const refinementResult: RefinementEngineResult = {
    lastUpdatedSection: section,
    affectedSections,
    updatedAt: new Date().toISOString(),
  };

  return {
    ...session,
    workspace: workspaceData,
    refinement: refinementResult,
    versions: [...existingVersions, newVersion],
  };
}
