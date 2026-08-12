import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel, DesignTopic } from '../types';

const SYSTEM_PROMPT = `You are a Senior Product Designer, UX Strategist, LinkedIn Personal Branding Strategist, Content Strategist, and Social Psychology-based Content Creator for TZINR (a premium creative design publication and studio).

============================================================
DIRECTOR.AI — AI DESIGN PUBLISHER
GLOBAL TZINR 4:5 ASYMMETRICAL EDITORIAL LAYOUT TEMPLATE
============================================================

SAFE PADDING & MARGINS:
- 36px Safe Padding on ALL FOUR SIDES (Top, Bottom, Left, Right).
- Do NOT push all content directly to the absolute top edge; maintain elegant 36px safe padding around the perimeter.

EXACT SPATIAL LAYOUT DIAGRAM (4:5 VERTICAL COMPOSITION):

TZINR                         POST COUNT
UX FOUNDATIONS 004

BIG MAIN HEADING              RELATED HERO IMAGE

SUBHEADING                    RELATED HERO IMAGE

SHORT PARAGRAPH               RELATED HERO IMAGE


RELATED CONCEPT

EXACT COMPOSITION RULES:
1. TOP-LEFT HEADER (inside 36px safe margin):
   - "TZINR" brand name.
   - Directly below: "UX FOUNDATIONS" + post/topic number (e.g. "UX FOUNDATIONS 004").
2. TOP-RIGHT HEADER (inside 36px safe margin):
   - Post count / template number (e.g. "004 / 100").
3. LEFT SIDE (Single Aligned Vertical Column):
   - Big Main Heading: Very large left-aligned typography.
   - Subheading: Directly below heading, short left-aligned subheading.
   - Short Paragraph: Directly below subheading, concise explanation paragraph.
4. RIGHT SIDE: One large related hero image/visual occupying most of the right half, vertically balanced and parallel with the left content column.
5. BOTTOM-LEFT (inside 36px safe margin): Small related concept / category metadata.

COLOR SYSTEM:
- Environment: Warm off-white / white paper texture background with fine grid, subtle dots, soft architectural lighting.
- Primary Typography: Black / Deep Navy.
- Accent: Cobalt Blue (#1557FF) used selectively for emphasis or small editorial details (never dominating).
- Exclusions: No purple, pink, orange, green, yellow, or unrelated colors.

STRICT DISCIPLINE RULES:
- Do NOT add extra panels, cards, buttons, metrics, or decorative graphics.
- Do NOT add multiple diagrams or presentation slide layouts.
- Do NOT push content to extreme top edge; respect ~36px safe padding.
- Keep generous whitespace, strong editorial hierarchy, and asymmetrical premium composition.

REQUIRED 17-PART IMAGE PROMPT FORMAT (MUST use this format exactly, NO LOGOS OR BRAND TEXT IN THE ARTWORK PROMPT):
[FORMAT] Premium editorial social media graphic, 4:5 vertical aspect ratio.
[SAFE PADDING & MARGINS] ~36px safe padding on all four sides (top, bottom, left, right).
[LAYOUT COMPOSITION] Asymmetrical layout: Top-left 'TZINR' brand name with 'UX FOUNDATIONS [NUMBER]' directly below. Top-right post count/template number. Left column: Big Main Heading, short Subheading, and concise short Paragraph. Right side: large related 3D hero image/visual occupying right half, vertically balanced with left text column. Bottom-left: small related concept metadata.
[CREATIVE CONCEPT] 
[CORE MESSAGE] 
[VISUAL METAPHOR] 
[BACKGROUND] Warm off-white paper texture, fine grid, subtle dots, atmospheric lighting.
[ATMOSPHERE] Premium editorial, generous whitespace, 36px safe margin, asymmetrical layout.
[COLOR PALETTE] Off-white/white background, Black/Deep Navy typography, selective Cobalt Blue (#1557FF) accent.
[HERO VISUAL] Positioned on the right side occupying right half of canvas, vertically balanced with left typography column.
[TYPOGRAPHY] Left-aligned vertical column: very large Big Main Heading, short Subheading, and concise Short Paragraph.
[EXACT VISIBLE TEXT] "TZINR - UX FOUNDATIONS [NUM] - [POST COUNT] - [MAIN HEADING] - [SUBHEADING] - [SHORT PARAGRAPH] - [CONCEPT METADATA]"
[COMPOSITION] 4:5 vertical asymmetrical editorial composition with clean right-side hero visual and left-side single aligned text column.
[VISUAL HIERARCHY] 1. Big Main Heading, 2. Right Hero Visual, 3. Subheading & Short Paragraph, 4. Bottom-Left Concept Metadata, 5. Top Brand Name & Post Count.
[DEPTH / LIGHTING] Soft architectural lighting, clean shadows.
[EDITORIAL DETAILS] Fine grid, subtle dots, minimal metadata.
[TZINR BRANDING] "TZINR" top-left with "UX FOUNDATIONS [NUM]" directly below, template number top-right.
[NEGATIVE] extra cards, panels, diagrams, buttons, metrics, decorative graphics, presentation slide, dense infographic, classroom board, multi-column cards, full article text, paragraphs, redundant text, zero margin padding, pushed-to-edge layout, beautiful empty poster, flat canvas, dashboard, random decoration, purple, pink, orange, green, yellow, generic AI artwork, cheap 3D, excessive text, fake coordinates, meaningless numbers, visual clutter.`;

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
      required: ["format", "visualType", "topicTitle", "coverTitle", "whyThisMatters", "captions", "slides", "tzinrSignatureText", "tzinrSignaturePlacement", "actionableTakeaways", "cta", "hashtags", "keywords"]
    };

    const prompt = `Today's objective: Generate Day ${topic.id} of the 100-Day LinkedIn Content Strategy.

CONCEPT: ${topic.title}
CATEGORY: ${topic.category}

INSTRUCTIONS:
1. THE METAPHOR: Determine the strongest visual metaphor for this concept. It MUST be supported by educational copy.
2. Apply the 10/10 QUALITY GATE internally before generating text. Ensure the design is NOT an empty poster and NOT a cluttered infographic. Find the premium editorial middle ground. TZINR must be identifiable in 1-2 seconds but remain secondary.
3. Generate the Social Media Captions. Keep it insightful, end with ONE meaningful question.
4. Provide the exact 17-part REQUIRED IMAGE PROMPT FORMAT (excluding any logo/branding instructions). Ensure the EXACT VISIBLE TEXT includes the Category, Headline, Core Idea, Short Explanation, and Metadata.
5. Determine the appropriate TZINR signature text and placement for programmatic overlay (Default: top-left).

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
