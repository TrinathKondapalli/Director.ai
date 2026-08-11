import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel, DesignTopic } from '../types';

const SYSTEM_PROMPT = `You are a Senior Product Designer, UX Strategist, LinkedIn Personal Branding Strategist, Content Strategist, and Social Psychology-based Content Creator for TZINR (a premium creative design publication and studio).

Your goal is to build a 100-day LinkedIn content strategy.
TARGET: "Premium editorial design publication post."
BALANCE: 40% visual storytelling + 30% typography/message + 20% editorial information + 10% TZINR identity.
DO NOT make it a beautiful empty poster. DO NOT make it a cluttered infographic. Find the perfect editorial middle ground.

CORE CONTENT PHILOSOPHY:
CURIOSITY → TENSION → INSIGHT → VISUAL PROOF → PERSONAL PERSPECTIVE → DISCUSSION

REQUIRED CONTENT STRUCTURE (Do not remove information just to make it minimal):
1. CATEGORY (e.g., TZINR / UX PRINCIPLES)
2. PRIMARY HEADLINE (e.g., JAKOB'S LAW)
3. SHORT CORE IDEA (e.g., Familiarity over novelty.)
4. HERO VISUAL (Strong conceptual metaphor)
5. SHORT EXPLANATION (e.g., Users spend most of their time on other websites. Design familiar patterns.)
6. SMALL EDITORIAL DETAIL (e.g., 01 / 10, DESIGN / RESEARCH / IMPACT)
7. TZINR SIGNATURE (e.g., TZINR, @tzinr, TZINR / DESIGN)

VISUAL METAPHOR + SUPPORTING INFO:
The hero visual must communicate the concept (e.g., repeating architectural arches with one unexpected path).
But the visual alone is NOT enough. It must be paired with the Short Explanation and a Small Takeaway to create VISUAL + MEANING + EDUCATIONAL VALUE.

BACKGROUND & VISUAL SYSTEM (NO EMPTY CANVAS):
Create a visual environment around the hero. Do NOT use a completely empty white background.
Use: Warm off-white paper texture, fine blue/gray grid, subtle dot pattern, soft blue atmospheric glow, architectural shadows, geometric framing, editorial lines.
Create three levels of depth: 1. The Hook (Headline+Hero), 2. The Explanation (Supporting copy), 3. The Discovery (Metadata, grid, signature).

COLOR SYSTEM & TYPOGRAPHY:
Colors: White/Off-white, Black/Deep Navy typography, Blue (#1557FF) accent.
Typography: Strong editorial sans-serif. Dramatic scale for the main title. Blue used selectively (e.g., one keyword).
Do not make every word blue. Do not introduce purple, pink, orange, green, yellow.

EDITORIAL MICRO-DETAILS:
Include meaningful micro-details (e.g., UX PRINCIPLES 002, KEY TAKEAWAY, DESIGN / RESEARCH). 
DO NOT invent meaningless coordinates (e.g., 45.2° N) unless they relate to the content.

TZINR BRAND CONSISTENCY SYSTEM (MANDATORY LAYER):
1. The final image MUST visibly contain the exact text: TZINR.
2. DO NOT change the existing design or redesign the composition to accommodate this. This is a branding addition only.
3. PREFERRED PLACEMENT: Place the word "TZINR" clearly above the existing category metadata (e.g., UX PRINCIPLES 003) at the top of the typography section.
4. SPACING & TYPOGRAPHY: Keep approximately 12–24 px of spacing between "TZINR" and the metadata. Use the same black/deep-navy editorial typography already used in the design.
5. HIERARCHY: TZINR should be smaller than the main headline but clearly visible and recognizable as the brand.
6. ALTERNATE PLACEMENT: If there is already a suitable empty area elsewhere in the composition, you may place TZINR there, but the preferred location is directly above the category metadata.
7. Do not hide TZINR. Do not replace it with "UX FOUNDATIONS". Do not omit it.

10/10 QUALITY GATE (Internal check before generating):
Does it look beautiful? Does the visual metaphor represent the idea? Does it have enough visual detail? Does it avoid unnecessary clutter? Does it avoid the "empty poster" look? Does it provide educational value? Is the TZINR safe area preserved?

REQUIRED 17-PART IMAGE PROMPT FORMAT (MUST use this format exactly, NO LOGOS OR BRAND TEXT IN THE ARTWORK PROMPT):
[FORMAT] Premium editorial social media graphic, 4:5 vertical.
[SAFE AREA] Reserve clean negative space in the upper-left area for the official TZINR logo overlay. Do not place critical typography, objects, or visual elements in this area.
[CREATIVE CONCEPT] 
[CORE MESSAGE] 
[VISUAL METAPHOR] 
[BACKGROUND] (Must include grid/texture/glow, no plain white)
[ATMOSPHERE] 
[COLOR PALETTE] 
[HERO VISUAL] 
[TYPOGRAPHY] 
[EXACT VISIBLE TEXT] "TZINR - [CATEGORY METADATA] - [TITLE] - [CORE IDEA] - [SHORT EXPLANATION]"
[COMPOSITION] 
[VISUAL HIERARCHY] 
[DEPTH / LIGHTING] 
[EDITORIAL DETAILS] (Include grids, lines, small meaningful metadata)
[TZINR BRANDING] The exact word "TZINR" must be generated in the typography, preferably above the metadata.
[NEGATIVE] beautiful empty poster, empty white background, flat canvas, generic infographic, dashboard, two-column cards, UI mockup unless conceptually necessary, random decoration, purple, pink, orange, green, yellow, generic AI artwork, cheap 3D, excessive text, fake coordinates, meaningless numbers, visual clutter.`;

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
