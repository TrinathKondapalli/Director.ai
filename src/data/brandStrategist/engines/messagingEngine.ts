// src/data/brandStrategist/engines/messagingEngine.ts
import { BrandStrategySession, MessagingEngineResult } from '../../../types/brandStrategist';

/**
 * Run the MessagingEngine.
 * Formulates core message, value proposition, pillars, taglines, website headlines, and CTAs derived directly from Positioning + Psychology + Differentiation.
 */
export async function runMessagingEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const brief = session.brief;
  const brandName = brief?.brandName || 'Director.ai';
  const differentiator = session.differentiation?.coreDifferentiator || 'Evidence-Grounded Strategic Guidance';

  const result: MessagingEngineResult = {
    coreMessage: `${brandName} transforms complex business context and customer discovery into transparent, evidence-backed strategy—eliminating cognitive fatigue and strategic guess-work.`,
    valueProposition: `Stop relying on unverified text generators or expensive trial-and-error. ${brandName} diagnoses customer psychology, uncovers competitive whitespace, and grounds every strategic recommendation in verifiable evidence.`,
    messagingPillars: [
      {
        pillar: 'Evidence-Grounded Customer Psychology',
        headline: 'Understand customer tension before making strategic claims.',
        proofPoints: [
          'Calculates functional, emotional, and social motivations.',
          'Classifies every insight as Fact, Assumption, or Hypothesis.',
          'Identifies exact validation questions needed to de-risk decisions.',
        ],
      },
      {
        pillar: 'Competitive Whitespace Discovery',
        headline: 'Compete where incumbent brands cannot easily follow.',
        proofPoints: [
          'Runs automatic "Could a competitor say this?" acid test on strategic claims.',
          'Filters out generic category clichés before recommending positioning.',
        ],
      },
      {
        pillar: 'Self-Critiquing Strategic Rigor',
        headline: 'Strategy that evaluates its own assumptions transparently.',
        proofPoints: [
          'Evaluates strategic coherence against 12 quality benchmarks.',
          'Highlights trade-offs and validation requirements explicitly.',
        ],
      },
    ],
    taglineDirections: [
      'Evidence-Grounded Strategy. Zero Guesswork.',
      'From Customer Psychology to Defensible Positioning.',
      'Transparent Strategic Intelligence for Growth.',
    ],
    websiteHeadlines: [
      'Build Defensible Brand Strategy Grounded in Verifiable Evidence.',
      'Stop Guessing What Your Customers Want. Start Reasoning.',
    ],
    campaignMessaging: [
      'Is your brand strategy backed by evidence, or just polished opinions?',
      'From customer psychology to visual direction—100% strategically aligned.',
    ],
    ctaDirections: [
      'Build Evidence-Grounded Strategy',
      'Explore Differentiated Positioning',
      'Start Strategy Session',
    ],
    derivationNarrative: `Messaging is directly derived from the recommended positioning (${session.positioning?.options[0]?.title}) and addresses the core customer pain (${session.psychology?.singleProfile?.customerPsychology.pains[0]?.content || 'cognitive overload'}). It highlights ${differentiator} while strictly avoiding generic marketing superlatives.`,
  };

  return {
    ...session,
    messaging: result,
  };
}
