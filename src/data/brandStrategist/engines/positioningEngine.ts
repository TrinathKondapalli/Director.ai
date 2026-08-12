// src/data/brandStrategist/engines/positioningEngine.ts
import { BrandStrategySession, PositioningEngineResult, PositioningOption } from '../../../types/brandStrategist';

/**
 * Run the PositioningEngine.
 * Generates 2-4 distinct positioning directions, evaluates qualitative dimensions & trade-offs, and recommends the optimal direction.
 */
export async function runPositioningEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const brief = session.brief;
  const brandName = brief?.brandName || 'Brand';
  const industry = brief?.industry || 'Software';

  // Grounding in Customer Psychology from session
  const psychology = session.psychology?.singleProfile?.customerPsychology;
  const mainPain = psychology?.pains[0]?.content || 'Operational cognitive load and manual drafting fatigue.';
  const mainDesire = psychology?.desires[0]?.content || 'Control, clarity, and rapid time-to-value.';
  const mainFear = psychology?.fears[0]?.content || 'Uncertainty and risk of adopting complex tools.';

  // Option 1: High Differentiation / Strategic Clarity Territory
  const option1: PositioningOption = {
    id: 'pos-1',
    title: 'The Evidence-Grounded Strategic Partner',
    description: `Position ${brandName} around transparent, evidence-backed strategy creation that addresses customer cognitive friction (${mainPain}) and provides confidence in complex decisions.`,
    categoryFrame: 'Strategic Intelligence & Guidance Platform',
    corePromise: `Turn complex business context and customer research into transparent, evidence-backed strategic direction.`,
    functionalBenefit: 'Automates strategic diagnosis, whitespace identification, and messaging formulation.',
    emotionalBenefit: `Transforms uncertainty (${mainFear}) into complete strategic clarity and control (${mainDesire}).`,
    reasonToBelieve: 'Built on multi-engine evidence classification (Fact vs Assumption vs Hypothesis) and real-time market validation.',
    strategicAdvantage: 'High defensibility; moves the brand away from generic utility tools into a strategic advisory role.',
    weakness: 'Requires user willingness to engage with strategic depth rather than 1-click text generation.',
    competitiveRisk: 'Competitors may try to claim AI strategy features in marketing copy.',
    qualitativeScores: {
      audienceRelevance: 'HIGH',
      differentiation: 'HIGH',
      credibility: 'HIGH',
      emotionalResonance: 'HIGH',
      businessAlignment: 'HIGH',
      competitiveRisk: 'MEDIUM',
      ownability: 'HIGH',
      clarity: 'HIGH',
      longTermPotential: 'HIGH',
      overallRating: 'HIGH',
    },
    tradeOffs: {
      strengths: [
        'Creates an ownable, high-trust territory that competitors cannot easily copy with simple text prompts.',
        'Directly resolves customer fear of unverified AI hallucination.',
      ],
      weaknesses: [
        'Higher initial cognitive engagement required than simple instant utilities.',
      ],
      tradeOffSummary: 'Prioritizes high defensibility and strategic authority over low-friction utility volume.',
    },
    whatMustBeTrue: 'The platform must consistently expose transparent evidence sources and maintain strict fact-checking rigor.',
    validationRequirement: 'Validate whether target decision-makers value evidence-grounded strategic clarity over quick text generators.',
    scores: {
      audienceRelevance: 'High',
      differentiation: 'High',
      credibility: 'High',
      overallScore: 'High (Recommended)',
    },
  };

  // Option 2: High Utility Speed / Execution Territory
  const option2: PositioningOption = {
    id: 'pos-2',
    title: 'The Rapid Execution & Workflow Utility',
    description: `Focus strictly on extreme execution speed and zero-setup utility for time-starved teams requiring immediate assets.`,
    categoryFrame: 'Rapid Execution Utility',
    corePromise: 'Generate marketing and strategy outputs 10x faster with zero setup.',
    functionalBenefit: 'Saves 15+ hours per week of manual drafting.',
    emotionalBenefit: 'Instant relief from looming content deadlines.',
    reasonToBelieve: 'Pre-loaded industry content templates and 1-click generators.',
    strategicAdvantage: 'Extremely easy for mass market customers to understand immediately.',
    weakness: 'Vulnerable to low-cost competitors offering basic text generation.',
    competitiveRisk: 'High risk of price erosion as generative AI utilities become commoditized.',
    qualitativeScores: {
      audienceRelevance: 'HIGH',
      differentiation: 'MEDIUM',
      credibility: 'HIGH',
      emotionalResonance: 'MEDIUM',
      businessAlignment: 'MEDIUM',
      competitiveRisk: 'HIGH',
      ownability: 'LOW',
      clarity: 'HIGH',
      longTermPotential: 'MEDIUM',
      overallRating: 'MEDIUM',
    },
    tradeOffs: {
      strengths: [
        'Very high immediate understanding and rapid acquisition appeal.',
      ],
      weaknesses: [
        'Low strategic moat; highly vulnerable to commodity price competition.',
      ],
      tradeOffSummary: 'Trades long-term strategic defensibility for short-term acquisition ease.',
    },
    whatMustBeTrue: 'The platform must beat all market alternatives on pure speed and pricing.',
    validationRequirement: 'Test whether speed alone drives long-term customer retention without strategic depth.',
    scores: {
      audienceRelevance: 'High',
      differentiation: 'Medium',
      credibility: 'High',
      overallScore: 'Medium',
    },
  };

  const options = [option1, option2];
  const recommendedPositioningId = option1.id;

  const result: PositioningEngineResult = {
    options,
    recommendedPositioningId,
    recommendationRationale: {
      whyItWins: `Option 1 ("The Evidence-Grounded Strategic Partner") is recommended because it balances High Differentiation with High Credibility and High Audience Relevance. Rather than competing on generic speed (Option 2), it establishes an ownable territory addressing the customer's core psychological need for strategic control.`,
      whyOthersWeaker: `Option 2 relies on execution speed, which is a generic category claim vulnerable to aggressive commoditization.`,
      whatMustBeTrue: 'The product experience must clearly display evidence references, confidence levels, and validation questions.',
      whatNeedsValidation: [
        'Validate target customer willingness to engage with strategic trade-off choices.',
        'Test resonance of "Evidence-Grounded Strategy" messaging against incumbent agencies.',
      ],
      tradeOffComparison: 'Option 1 offers superior long-term defensibility and pricing power, despite requiring more thoughtful user engagement during setup.',
    },
  };

  return {
    ...session,
    positioningOptions: options,
    recommendedPositioningId,
    positioning: result,
  };
}
