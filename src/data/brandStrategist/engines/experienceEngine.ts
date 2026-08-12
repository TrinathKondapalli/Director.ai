// src/data/brandStrategist/engines/experienceEngine.ts
import { BrandStrategySession, ExperienceEngineResult } from '../../../types/brandStrategist';

/**
 * Run the ExperienceEngine.
 * Translates positioning and customer psychology into experience principles, trust moments, emotional moments, friction reduction, and UX implications.
 */
export async function runExperienceEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const desiredFeeling = session.personality?.desiredFeeling || 'Confidence, clarity, and control';

  const result: ExperienceEngineResult = {
    experiencePrinciples: [
      'Evidence Transparency: Never present a strategic conclusion without visible evidence classification (Fact, Assumption, Hypothesis).',
      'Zero Cognitive Overhead: Guide the user through progressive discovery steps so complex strategy feels structured and self-explanatory.',
      'Honest Validation: Explicitly highlight what must be validated before large budget execution.',
    ],
    trustMoments: [
      'Discovery Grounding Summary: Displaying exact evidence links back to customer answers.',
      'Live Research Citations: Exposing web research entries and market trend sources.',
      'Acid Test Transparency: Demonstrating why specific claims passed or failed differentiation.',
    ],
    emotionalMoments: [
      'Whitespace Discovery: Highlighting underserved customer opportunities.',
      'Strategy Finalization: Delivering a complete, structured 25-section report.',
    ],
    frictionReduction: [
      'Eliminate empty form fields by generating targeted discovery questions.',
      'Provide instant "Run Again" and "Refine" actions for individual strategy engines.',
    ],
    uxImplications: [
      'Use dark-mode glassmorphic cards and crisp typography to reinforce strategic authority.',
      'Implement collapsible progressive disclosure sections to prevent cognitive fatigue.',
    ],
    psychologyConnection: `Directly designed to transform customer anxiety and skepticism into ${desiredFeeling} by providing transparent evidence tags and structured choice checkpoints.`,
  };

  return {
    ...session,
    experience: result,
  };
}
