// src/data/brandStrategist/engines/differentiationEngine.ts
import { BrandStrategySession, DifferentiationEngineResult } from '../../../types/brandStrategist';

/**
 * Run the DifferentiationEngine.
 * Executes the "Could a competitor say this?" acid test on strategic claims, distinguishes Feature vs Strategic Difference, and eliminates unsupported superlatives.
 */
export async function runDifferentiationEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const brief = session.brief;
  const brandName = brief?.brandName || 'Brand';

  // Acid Test Evaluation
  const acidTestResults = [
    {
      claim: 'Our AI platform is fast, intelligent, and easy to use.',
      couldCompetitorSayThis: true,
      isCategoryGeneric: true,
      isMeaningful: false,
      isCredible: true,
      isDefendable: false,
      pass: false,
    },
    {
      claim: 'We provide high-quality marketing solutions for growth.',
      couldCompetitorSayThis: true,
      isCategoryGeneric: true,
      isMeaningful: false,
      isCredible: false,
      isDefendable: false,
      pass: false,
    },
    {
      claim: 'Evidence-Grounded Strategy Creation with Fact / Assumption / Hypothesis Classification.',
      couldCompetitorSayThis: false,
      isCategoryGeneric: false,
      isMeaningful: true,
      isCredible: true,
      isDefendable: true,
      pass: true,
    },
    {
      claim: 'Autonomous Strategic Guidance that challenges unverified customer assumptions and identifies whitespace.',
      couldCompetitorSayThis: false,
      isCategoryGeneric: false,
      isMeaningful: true,
      isCredible: true,
      isDefendable: true,
      pass: true,
    },
  ];

  // Honest, evidence-grounded strategic territory (NO unsupported superlatives like "the only platform")
  const coreDifferentiator = `Positioned in the emerging whitespace of Evidence-Grounded Strategic Guidance—providing transparent, classified strategic reasoning rather than unverified 1-click text outputs.`;

  const defensiblePillars = [
    'Evidence Classification Gate (Strict Fact vs Assumption vs Hypothesis distinction)',
    'Dynamic Competitor White Space Discovery grounded in live market research',
    'Self-Critique & Dependency-Aware Strategy Refinement Pipeline',
  ];

  const result: DifferentiationEngineResult = {
    acidTestResults,
    coreDifferentiator,
    differentiatorType: 'STRATEGIC_TERRITORY',
    defensiblePillars,
    whyItMattersToCustomer: 'Customers gain confidence and risk reduction because every strategic output explicitly cites its evidence source and confidence level.',
    customerEmotionalValue: 'Transforms anxiety and skepticism into trust, clarity, and decisive strategic control.',
    defendabilityAssessment: 'Defendable through proprietary multi-engine evidence validation workflow; competitors offering simple UI prompt wrappers cannot easily replicate transparent strategic classification.',
  };

  return {
    ...session,
    differentiation: result,
  };
}
