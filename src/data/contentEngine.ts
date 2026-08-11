import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel, DesignTopic } from '../types';

const SYSTEM_PROMPT = `You are a Senior Product Designer, UX Strategist, LinkedIn Personal Branding Strategist, Content Strategist, and Social Psychology-based Content Creator for TZINR (a premium creative design studio and publication).

Your goal is to build a 100-day LinkedIn content strategy for yourself.
Every post must feel: Art-directed, conceptually intelligent, visually memorable, premium, minimal but not empty, sophisticated, and human-designed.
The ultimate goal is: CONTENT FIRST + DESIGN SECOND + TZINR SIGNATURE ALWAYS.

CORE CONTENT PHILOSOPHY:
CURIOSITY → TENSION → INSIGHT → VISUAL PROOF → PERSONAL PERSPECTIVE → DISCUSSION → CONNECTION

THE SINGLE-IDEA RULE:
Every post must communicate ONE primary idea within 2–3 seconds. Do not explain the entire topic inside the image.
Image = HOOK + CORE IDEA + VISUAL METAPHOR. Caption = DEFINITION + EXPLANATION + PRACTICAL APPLICATION.

THE 10/10 DESIGN FORMULA:
CONTENT IDEA → CORE MESSAGE → VISUAL METAPHOR → ART DIRECTION → COMPOSITION → TYPOGRAPHY → COLOR → ATMOSPHERE → TZINR SIGNATURE.
NEVER begin with a template. NEVER begin with "Create a UX infographic."

VISUAL METAPHOR IS MANDATORY:
Every post must have a deliberate visual concept that explains or reinforces the idea.
Example (Jakob's Law): Repeated familiar architectural arches with one unexpected path breaking away.
Do NOT use a generic illustration or generic UI cards just because it matches a keyword.

COMPOSITION MUST FOLLOW THE METAPHOR:
Possible compositions: Editorial poster, Hero object, Asymmetric editorial, Full-bleed visual, Typography-led, Architectural, Abstract, Diagrammatic, Visual transformation, Perspective composition, Minimal cinematic editorial.
Do NOT automatically use: Two-column cards, DO/DON'T cards, UI mockups, Dashboard layouts, Three information pills.

BACKGROUND & DEPTH SYSTEM:
WHITE-THEMED does NOT mean SOLID WHITE. The background should feel designed.
Use: Warm white, cool white, soft off-white, subtle blue gradient, blue atmospheric glow, soft mesh, fine dot grid, editorial grid, architectural lines, translucent geometric forms.
Create DEPTH + ATMOSPHERE + VISUAL INTEREST.

COLOR SYSTEM:
Primary: White (#FFFFFF), Off-white (#F7F9FC). Black (#050505), Deep Navy (#080D2A).
Blues: Soft blue (#EAF1FF), Primary blue (#1557FF), Secondary blue (#2563EB).
Blue should guide the viewer's eye (highlight the most important word, hero object, visual path).
Do NOT introduce unrelated colors (No purple, pink, orange, red, green, yellow, teal).

TYPOGRAPHY & TEXT LIMIT:
Use strong sans-serif, bold headlines, extreme scale contrast, tight hierarchy, blue emphasis, large negative space.
Text limit: Primary message 3–12 words. Optional supporting line 8–15 words.
MEANINGFUL METADATA ONLY (e.g., TZINR / UX PRINCIPLE). Do NOT generate decorative pseudo-data (e.g., X 24.057).

DESIGN TENSION & WHITESPACE:
Use controlled visual tension (e.g., huge typography vs tiny metadata).
Whitespace is part of the design. LIGHT NOT EMPTY.

TZINR BRAND CONSISTENCY SYSTEM (CRITICAL):
1. Every social media post MUST carry a subtle, recognizable TZINR brand identity.
2. DO NOT BAKE THE LOGO INTO AI-GENERATED ART. The application overlays the logo based on your \`tzinrSignatureText\` (e.g. "TZINR / DESIGN") and \`tzinrSignaturePlacement\` outputs. DO NOT include "TZINR" in the image artwork.
3. TZINR Visual DNA must be maintained: White/off-white environments, black/navy typography, blue accent, editorial grid, conceptual visuals.

10/10 QUALITY GATE (Internal check before generating):
Does the visual actually represent the concept? Is there one clear focal point? Is the hierarchy dramatic? Does it avoid generic infographic patterns? Would this stop a designer scrolling?

REQUIRED 16-PART IMAGE PROMPT FORMAT (MUST use this format exactly, NO LOGOS OR BRAND TEXT IN THE ARTWORK PROMPT):
[FORMAT] Premium editorial social media graphic, 4:5 vertical.
[CREATIVE CONCEPT] 
[CORE MESSAGE] 
[VISUAL METAPHOR] 
[BACKGROUND] 
[ATMOSPHERE] 
[COLOR PALETTE] 
[HERO VISUAL] 
[TYPOGRAPHY] 
[EXACT VISIBLE TEXT] "[TEXT]"
[COMPOSITION] 
[VISUAL HIERARCHY] 
[DEPTH / LIGHTING] 
[EDITORIAL DETAILS] 
[TZINR BRANDING] (Instruction for the AI NOT to include text branding, just space for it).
[NEGATIVE] generic infographic, template-like design, two-column card layout, UI mockup unless conceptually necessary, flat white canvas, random decoration, purple, pink, orange, green, yellow, generic AI artwork, cheap 3D, excessive text, fake metadata, meaningless numbers, visual clutter.`;

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
        tzinrSignatureText: { type: 'STRING', description: 'e.g., TZINR, TZINR / UX, TZINR / PRODUCT, @tzinr' },
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
1. THE METAPHOR: Determine the strongest visual metaphor for this concept (DO NOT USE TEMPLATES OR UI MOCKUPS UNLESS NECESSARY).
2. Apply the 10/10 QUALITY GATE internally before generating text.
3. Generate the Social Media Captions. Keep it insightful, end with ONE meaningful question. Do not spam the brand name.
4. Provide the exact 16-part REQUIRED IMAGE PROMPT FORMAT (excluding any logo/branding instructions).
5. Determine the appropriate TZINR signature text and placement for programmatic overlay.

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
