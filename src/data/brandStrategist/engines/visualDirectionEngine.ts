// src/data/brandStrategist/engines/visualDirectionEngine.ts
import { BrandStrategySession, VisualDirectionEngineResult } from '../../../types/brandStrategist';

/**
 * Run the VisualDirectionEngine.
 * Translates desired customer feeling + brand personality + positioning into visual typography, color logic, imagery, layout, and UI character.
 */
export async function runVisualDirectionEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const desiredFeeling = session.personality?.desiredFeeling || 'Confidence & Control';
  const personality = session.personality?.primaryPersonality || 'Analytical & Rigorous Strategic Advisor';

  const result: VisualDirectionEngineResult = {
    visualPersonality: 'Structured Editorial Minimalist & High-Precision Dark Aesthetic',
    colorLogic: {
      paletteName: 'Deep Obsidian, Charcoal & Electric Violet',
      rationale: 'Obsidian (#09090B) and Charcoal (#18181B) create a calm, distraction-free environment that reduces visual cognitive noise, while Electric Violet (#8B5CF6) highlights key strategic insights and evidence badges.',
      primaryColor: '#09090B',
      accentColor: '#8B5CF6',
    },
    typographyDirection: {
      headlineFont: 'Sora / Inter Display (Structured, Bold, High Contrast)',
      bodyFont: 'Inter / JetBrains Mono (High Legibility, Technical Precision)',
      vibe: 'Clean editorial grid with strong visual hierarchy and disciplined spacing',
    },
    imageryStyle: 'Abstract architectural shapes, macro studio lighting, negative space focus, no generic corporate stock photos.',
    graphicLanguage: '1px border lines (white/10), translucent glassmorphic surfaces, crisp evidence badges.',
    uiCharacter: 'Calm, responsive micro-interactions, seamless tab navigation, zero visual clutter.',
    psychologyAndPositioningTranslation: `Visual choices translate the desired feeling (${desiredFeeling}) and personality (${personality}) into a calm, highly structured interface that signals strategic authority, clarity, and precision.`,
  };

  return {
    ...session,
    visualDirection: result,
  };
}
