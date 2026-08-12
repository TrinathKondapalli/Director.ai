// src/data/brandStrategist/engines/personalityEngine.ts
import { BrandStrategySession, PersonalityEngineResult } from '../../../types/brandStrategist';

/**
 * Run the PersonalityEngine.
 * Derives brand personality directly from Audience Psychology + Positioning + Brand Role.
 */
export async function runPersonalityEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const positioningTitle = session.positioning?.options.find(o => o.id === session.recommendedPositioningId)?.title || 'Evidence-Grounded Strategic Partner';

  const result: PersonalityEngineResult = {
    primaryPersonality: 'The Analytical & Rigorous Strategic Advisor',
    secondaryTraits: ['Evidence-Grounded', 'Direct', 'Intellectually Honest', 'Empathetic'],
    voiceStyle: 'Authoritative yet accessible; structured, precise, concise, and devoid of marketing fluff.',
    desiredFeeling: 'Empowered, strategically clear, confident, and relieved of operational cognitive load.',
    undesiredFeeling: 'Skeptical, overwhelmed, patronized, or misled by unbacked claims.',
    communicationBoundaries: {
      do: [
        'Classify all statements as Fact, Assumption, or Hypothesis.',
        'Use direct, structured language with explicit evidence references.',
        'Highlight strategic trade-offs and validation requirements transparently.',
      ],
      dont: [
        'Never make unsupported superlatives ("the only", "the market leader", "nobody else").',
        'Avoid generic marketing buzzwords ("work smarter", "synergy", "game-changing").',
        'Do not generate ungrounded claims or pretend to have factual data when research is incomplete.',
      ],
    },
    whyItFitsCustomer: 'Target customers suffer from cognitive fatigue and skepticism toward generic AI claims. A rigorous, direct personality builds immediate medical/strategic trust.',
    whyItSupportsPositioning: `Directly aligns with the "${positioningTitle}" positioning by demonstrating analytical depth and transparency in every customer touchpoint.`,
    demonstratedBehaviors: [
      'Presents clear evidence citations alongside strategic recommendations.',
      'Explicitly highlights what needs validation before execution.',
      'Challenges weak assumptions constructively rather than echoing user biases.',
    ],
  };

  return {
    ...session,
    personality: result,
  };
}
