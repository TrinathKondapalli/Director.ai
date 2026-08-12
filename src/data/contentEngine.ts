import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel, DesignTopic } from '../types';

const SYSTEM_PROMPT = `You are a Senior Product Designer, UX Strategist, LinkedIn Personal Branding Strategist, Content Strategist, and Social Psychology-based Content Creator for TZINR (a premium creative design publication and studio).

============================================================
DIRECTOR.AI — AI DESIGN PUBLISHER
OFFICIAL TZINR TYPOGRAPHY & EDITORIAL SYSTEM (4:5 VERTICAL)
============================================================

1. OFFICIAL TZINR TYPOGRAPHY SYSTEM (STRICTLY MANDATED):
   - TZINR BRAND NAME: Manrope ExtraBold (Compact, bold, clean, black/deep navy).
   - MAIN DISPLAY HEADLINE: Bebas Neue (Very tall condensed letterforms, heavy weight, uppercase, tight line spacing, large dramatic editorial scale).
   - SUBHEADINGS: Manrope Semibold (Clean, modern, highly legible, medium/semibold, selective Cobalt Blue accent).
   - BODY COPY / SHORT PARAGRAPHS: Manrope Regular / Medium (Clean, modern, comfortable line height).
   - METADATA & NUMBERS: IBM Plex Mono (Monospaced, uppercase where appropriate, technical editorial character, e.g. "UX FOUNDATIONS 004", "004 / 100", bottom-left category metadata).
   - BANNED FONTS: NEVER specify or use Inter, Neue Haas Grotesk, SF Pro, Roboto, Space Mono, Akzidenz-Grotesk, or Helvetica Neue.

2. HIERARCHY STACK:
   - TZINR → Manrope ExtraBold
   - UX FOUNDATIONS 004 → IBM Plex Mono
   - MAIN TITLE → Bebas Neue (Uppercase condensed)
   - SUBHEADING → Manrope Semibold
   - BODY → Manrope Regular
   - METADATA / NUMBERS → IBM Plex Mono

3. PERFECT 50/50 SPATIAL LAYOUT (4:5 VERTICAL ASPECT RATIO):
   - ~36px Safe Padding on ALL 4 SIDES.
   - TOP-LEFT: 'TZINR' (Manrope ExtraBold) stacked above 'UX FOUNDATIONS [NUM]' (IBM Plex Mono).
   - TOP-RIGHT: Template post count e.g. '004 / 100' (IBM Plex Mono).
   - LEFT 40-45% COLUMN: Clean vertical typography stack (Bebas Neue Headline e.g. 'MILLER'S LAW', Manrope Semibold Subheading, Manrope Regular Paragraph, IBM Plex Mono Bottom Metadata).
   - RIGHT 50% CANVAS: 3D Hero Visual Metaphor occupying right half, vertically centered and parallel with left text. Zero overlap.

4. RICH BACKGROUND & VISUAL ENVIRONMENT:
   - WARM TACTILE PAPER CANVAS: Premium off-white / ivory paper texture with subtle natural paper fiber grain.
   - FINE EDITORIAL GRID: Faint architectural blueprint grid lines visible across background.
   - SUBTLE DOT MATRIX: Fine technical dot pattern overlay.
   - ATMOSPHERIC COBALT BLUE GLOW: Soft, subtle Cobalt Blue (#1557FF) ambient lighting glowing gently behind the 3D hero visual on the right.
   - ARCHITECTURAL LIGHTING & SHADOWS: Soft directional studio lighting, realistic ambient occlusion, clean drop shadows.

5. BRAND COLOR SYSTEM:
   - Environment: Off-white / ivory paper texture.
   - Primary Typography: Black / Deep Navy.
   - Accent: Cobalt Blue (#1557FF) used selectively for key subheading emphasis or hero visual material highlight.

REQUIRED 17-PART IMAGE PROMPT FORMAT (MUST use this format explicitly):
[FORMAT] Premium editorial social media graphic, 4:5 vertical aspect ratio.
[SAFE PADDING] ~36px safe margin on all 4 edges.
[SPATIAL COMPOSITION] Strict two-column asymmetrical layout: Left 45% is clean typography column; Right 50% is 3D hero object on rich paper canvas. Zero visual overlap.
[TOP-LEFT BRANDING] 'TZINR' in Manrope ExtraBold with 'UX FOUNDATIONS [NUM]' in IBM Plex Mono directly underneath.
[TOP-RIGHT METADATA] '004 / 100' in IBM Plex Mono in top-right corner.
[LEFT TYPOGRAPHY COLUMN] Left-aligned vertical text stack: Large Main Headline in Bebas Neue uppercase condensed typography (e.g. 'MILLER'S LAW'), Subheading in Manrope Semibold with selective Cobalt Blue keyword emphasis, and short concise paragraph in Manrope Regular.
[RIGHT HERO VISUAL] 3D architectural visual object sitting strictly on the right half of the canvas, illuminated by a soft atmospheric Cobalt Blue background glow.
[BOTTOM-LEFT METADATA] Small concept metadata in IBM Plex Mono monospaced font.
[BACKGROUND & TEXTURE] Warm off-white paper texture with fine blue/gray editorial grid lines, subtle dot matrix pattern, soft atmospheric blue background glow, and architectural shadows. Rich multi-layered depth.
[COLOR PALETTE] Off-white/ivory background, Deep Navy typography, Cobalt Blue (#1557FF) strategic accent.
[TYPOGRAPHY SPECIFICATION] Display Headlines in Bebas Neue uppercase condensed; Subheadings & Body in Manrope; Metadata & Numbers in IBM Plex Mono; Brand Name in Manrope ExtraBold.
[TZINR BRANDING] 'TZINR' (Manrope ExtraBold) top-left with 'UX FOUNDATIONS [NUM]' (IBM Plex Mono) directly below, template number (IBM Plex Mono) top-right.
[NEGATIVE] Inter font, Roboto font, SF Pro font, Space Mono font, Helvetica Neue font, flat plain background, zero grid, empty canvas, overlapping text, centered 3D object, text over object, giant blocky text, 7+-2 items, presentation slide, dense infographic, multi-column cards, full article text, purple, pink, orange, green, yellow, visual clutter.`;

export const generateContentFromTopic = async (topic: DesignTopic, format: 'single' | 'carousel'): Promise<DesignContentResult> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API Key missing.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const schemaObj = format === 'single' ? {
      type: 'OBJECT',
      properties: {
        format: { type: 'STRING', description: 'Always exactly "single"' },
        visualType: { type: 'STRING', description: 'One of: editorial_poster, hero_object, asymmetric_editorial, visual_transformation, diagrammatic, typographic_experiment, object_type, full_bleed, editorial_grid, abstract_concept' },
        topicTitle: { type: 'STRING' },
        whyThisMatters: { type: 'STRING' },
        hook: { type: 'STRING' },
        professionalCaption: { type: 'STRING' },
        captions: {
          type: 'OBJECT',
          properties: {
            linkedin: { 
              type: 'OBJECT', properties: { hook: { type: 'STRING' }, context: { type: 'STRING' }, mainInsight: { type: 'STRING' }, keyTakeaways: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["hook", "context", "mainInsight", "keyTakeaways", "cta", "hashtags"]
            },
            instagram: { 
              type: 'OBJECT', properties: { hook: { type: 'STRING' }, story: { type: 'STRING' }, lesson: { type: 'STRING' }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["hook", "story", "lesson", "cta", "hashtags"]
            },
            facebook: { 
              type: 'OBJECT', properties: { opening: { type: 'STRING' }, problem: { type: 'STRING' }, advice: { type: 'STRING' }, example: { type: 'STRING' }, question: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["opening", "problem", "advice", "example", "question", "hashtags"]
            },
            twitter: { 
              type: 'OBJECT', properties: { singleTweet: { type: 'STRING' }, threadVersion: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["singleTweet", "threadVersion", "hashtags"]
            },
            youtube: { 
              type: 'OBJECT', properties: { seoTitle: { type: 'STRING' }, description: { type: 'STRING' }, whatYouWillLearn: { type: 'ARRAY', items: { type: 'STRING' } }, chapters: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, keywords: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["seoTitle", "description", "whatYouWillLearn", "chapters", "cta", "keywords", "hashtags"]
            }
          },
          required: ["linkedin", "instagram", "facebook", "twitter", "youtube"]
        },
        actionableTakeaways: { type: 'ARRAY', items: { type: 'STRING' } },
        cta: { type: 'STRING' },
        imageText: { 
          type: 'OBJECT', properties: { headline: { type: 'STRING' }, supporting: { type: 'STRING' } },
          required: ["headline"]
        },
        tzinrSignatureText: { type: 'STRING', description: 'e.g., TZINR / UX, TZINR / DESIGN' },
        tzinrSignaturePlacement: { type: 'STRING', enum: ['top-left', 'top-right', 'bottom-left', 'bottom-right'] },
        imagePrompt: { type: 'STRING' },
        hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate exactly 20 hashtags' },
        keywords: { type: 'ARRAY', items: { type: 'STRING' } }
      },
      required: ["format", "visualType", "topicTitle", "whyThisMatters", "hook", "professionalCaption", "captions", "actionableTakeaways", "cta", "imageText", "tzinrSignatureText", "tzinrSignaturePlacement", "imagePrompt", "hashtags", "keywords"]
    } : {
      type: 'OBJECT',
      properties: {
        format: { type: 'STRING', description: 'Always exactly "carousel"' },
        visualType: { type: 'STRING', description: 'One of: editorial_poster, hero_object, asymmetric_editorial, visual_transformation, diagrammatic, typographic_experiment, object_type, full_bleed, editorial_grid, abstract_concept' },
        topicTitle: { type: 'STRING' },
        coverTitle: { type: 'STRING' },
        whyThisMatters: { type: 'STRING' },
        captions: {
          type: 'OBJECT',
          properties: {
            linkedin: { type: 'OBJECT', properties: { hook: { type: 'STRING' }, context: { type: 'STRING' }, mainInsight: { type: 'STRING' }, keyTakeaways: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } }, required: ["hook", "context", "mainInsight", "keyTakeaways", "cta", "hashtags"] },
            instagram: { type: 'OBJECT', properties: { hook: { type: 'STRING' }, story: { type: 'STRING' }, lesson: { type: 'STRING' }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } }, required: ["hook", "story", "lesson", "cta", "hashtags"] },
            facebook: { type: 'OBJECT', properties: { opening: { type: 'STRING' }, problem: { type: 'STRING' }, advice: { type: 'STRING' }, example: { type: 'STRING' }, question: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } }, required: ["opening", "problem", "advice", "example", "question", "hashtags"] },
            twitter: { type: 'OBJECT', properties: { singleTweet: { type: 'STRING' }, threadVersion: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } }, required: ["singleTweet", "threadVersion", "hashtags"] },
            youtube: { type: 'OBJECT', properties: { seoTitle: { type: 'STRING' }, description: { type: 'STRING' }, whatYouWillLearn: { type: 'ARRAY', items: { type: 'STRING' } }, chapters: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, keywords: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } }, required: ["seoTitle", "description", "whatYouWillLearn", "chapters", "cta", "keywords", "hashtags"] }
          },
          required: ["linkedin", "instagram", "facebook", "twitter", "youtube"]
        },
        slides: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              heading: { type: 'STRING' },
              description: { type: 'STRING' },
              imageText: { 
                type: 'OBJECT', properties: { headline: { type: 'STRING' }, supporting: { type: 'STRING' } },
                required: ["headline"]
              },
              imagePrompt: { type: 'STRING' }
            },
            required: ["heading", "description", "imageText", "imagePrompt"]
          }
        },
        tzinrSignatureText: { type: 'STRING', description: 'e.g., TZINR, TZINR / UX, TZINR / PRODUCT, @tzinr' },
        tzinrSignaturePlacement: { type: 'STRING', enum: ['top-left', 'top-right', 'bottom-left', 'bottom-right'] },
        actionableTakeaways: { type: 'ARRAY', items: { type: 'STRING' } },
        cta: { type: 'STRING' },
        hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate exactly 20 hashtags' },
        keywords: { type: 'ARRAY', items: { type: 'STRING' } }
      },
      required: ["format", "visualType", "topicTitle", "whyThisMatters", "coverTitle", "captions", "slides", "tzinrSignatureText", "tzinrSignaturePlacement", "actionableTakeaways", "cta", "hashtags", "keywords"]
    };

    const prompt = `Today's objective: Generate Day ${topic.id} of the 100-Day LinkedIn Content Strategy.

CONCEPT: ${topic.title}
CATEGORY: ${topic.category}

ENGINE MINDSET INSTRUCTIONS:
1. HEADLINE: Headline MUST be the clean formal principle name (e.g. "${topic.title}"). DO NOT generate gimmick text like "7 ± 2 ITEMS.".
2. SPATIAL ISOLATION: Left 40% is clean typography; Right 50% is 3D hero object. Zero overlap.
3. NO DASH ACCENTS: Do NOT include blue dash lines, divider bars, or bullet dashes.
4. PADDING: Maintain 36px safe perimeter margin.
5. REQUIRED IMAGE PROMPT FORMAT: Follow the 17-part image prompt structure explicitly.

Format requested: ${format.toUpperCase()}.

[Random Seed to guarantee uniqueness: ${Math.random().toString(36).substring(2, 9)}]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: schemaObj as any,
        temperature: 0.85,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DesignContentResult;
    }
    throw new Error("No text in response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
