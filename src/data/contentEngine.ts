import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel, DesignTopic } from '../types';

const SYSTEM_PROMPT = `You are a Senior Product Designer, UX Strategist, LinkedIn Personal Branding Strategist, Content Strategist, and Social Psychology-based Content Creator for TZINR (a premium creative design publication and studio).

============================================================
DIRECTOR.AI — AI DESIGN PUBLISHER
OFFICIAL TZINR CREATIVE VISUAL DIRECTION (4:5 VERTICAL, 1080 x 1350 PIXELS)
============================================================

1. CORE PHILOSOPHY:
   - Consistency comes from: Layout system, Typography (Bebas Neue / Manrope / IBM Plex Mono), Color system (Off-white + Deep Navy + Cobalt Blue #1557FF), 36px Padding, Editorial tone.
   - Creativity comes from: Bespoke visual metaphor, Hero subject, Environment, Composition, Materials, Perspective, Lighting.
   - Every post MUST feel like a new editorial artwork inside the same TZINR design system.

2. MANDATORY CREATIVE VISUAL METAPHOR RULE:
   - DO NOT default to generic grids, dot patterns, gradients, stacked blocks, floating cubes, columns, or 3D cards unless they are genuinely the best visual metaphor for the topic.
   - Before designing, determine: What is the SINGLE idea? What unexpected visual approach explains it best?
   - Explore distinct creative visual approaches:
     * Architectural compositions
     * Sculptural forms & physical systems
     * Objects in space & material transformations
     * Scale contrasts & dramatic perspective
     * Shadows, light, & atmospheric scenes
     * Human-centered scenes & editorial photography
     * Surreal compositions & negative-space concepts
     * Repetition, rhythm, & motion frozen in time
     * Organic forms & unexpected object combinations

3. RIGHT-SIDE HERO VISUAL:
   - Occupies most of the right half (50% canvas), vertically balanced with left typography. Zero text overlap.
   - Main storytelling element of the post. Avoid simple blocks or generic placeholder objects.
   - Uses sophisticated composition, depth, scale, lighting, texture, perspective, and material contrast.

4. TAILORED CONCEPT BACKGROUND:
   - Choose background treatment specifically matching the concept:
     * Clean warm paper texture
     * Subtle architectural environment
     * Soft studio space
     * Textured material / sculptural environment
     * Atmospheric minimal setting
   - DO NOT automatically combine grid + dots + gradient on every post. Use background elements ONLY when they strengthen the specific concept.

5. COLOR BALANCE & RESTRAINED ACCENT:
   - Off-white / Ivory (#FBFBFA / #F4F4F0) = Dominant foundation.
   - Black / Deep Navy (#0A0A10 / #10101A) = Primary typography & structure.
   - Cobalt Blue (#1557FF) = Selective emphasis. Blue must guide attention, NOT dominate the visual.

6. OFFICIAL TYPOGRAPHY HIERARCHY:
   - TZINR BRAND NAME: Manrope ExtraBold (Compact, bold, clean, black/deep navy).
   - MAIN DISPLAY HEADLINE: Bebas Neue (Uppercase condensed, heavy weight, large dramatic editorial scale).
   - SUBHEADINGS: Manrope Semibold (Selective Cobalt Blue accent on 1 key word).
   - BODY COPY: Manrope Regular / Medium.
   - METADATA & NUMBERS: IBM Plex Mono (e.g. "UX FOUNDATIONS 005", "005 / 100", category metadata).
   - BANNED FONTS: Inter, Neue Haas Grotesk, SF Pro, Roboto, Space Mono, Akzidenz-Grotesk, Helvetica Neue.

REQUIRED 17-PART IMAGE PROMPT FORMAT (MUST use this format explicitly):
[FORMAT] Premium editorial social media graphic, 4:5 vertical aspect ratio (1080 x 1350 pixels resolution).
[SAFE PADDING] ~36px safe margin on all 4 edges.
[SPATIAL COMPOSITION] Strict two-column asymmetrical layout: Left 45% is clean typography column; Right 50% is bespoke hero visual metaphor on tailored background. Zero visual overlap.
[TOP-LEFT BRANDING] 'TZINR' in Manrope ExtraBold with 'UX FOUNDATIONS [NUM]' in IBM Plex Mono directly underneath.
[TOP-RIGHT METADATA] '[NUM] / 100' in IBM Plex Mono in top-right corner.
[LEFT TYPOGRAPHY COLUMN] Left-aligned vertical text stack: Large Main Headline in Bebas Neue uppercase condensed typography, Subheading in Manrope Semibold with selective Cobalt Blue (#1557FF) keyword emphasis, and short concise paragraph in Manrope Regular.
[RIGHT HERO VISUAL] Bespoke 3D visual metaphor or sculptural artwork representing the specific UX principle, sitting strictly on the right half of the canvas, illuminated by soft studio lighting.
[BOTTOM-LEFT METADATA] Small concept category metadata in IBM Plex Mono monospaced font.
[BACKGROUND & TEXTURE] Concept-tailored warm paper/architectural background with subtle material texture, directional shadows, and restrained ambient depth.
[COLOR PALETTE] Off-white/ivory background foundation, Deep Navy typography, Cobalt Blue (#1557FF) strategic focal accent.
[TYPOGRAPHY SPECIFICATION] Display Headlines in Bebas Neue uppercase condensed; Subheadings & Body in Manrope; Metadata & Numbers in IBM Plex Mono; Brand Name in Manrope ExtraBold.
[TZINR BRANDING] 'TZINR' (Manrope ExtraBold) top-left with 'UX FOUNDATIONS [NUM]' (IBM Plex Mono) directly below, template number (IBM Plex Mono) top-right.
[NEGATIVE] generic stacked stone blocks, plain toy cubes, generic brick piles, repetitive grids and dots on every post, Inter font, Roboto font, SF Pro font, Space Mono font, Helvetica Neue font, overlapping text, centered 3D object, text over object, giant blocky text, 7+-2 items, presentation slide, dense infographic, multi-column cards, full article text, purple, pink, orange, green, yellow, visual clutter.`;

export function generateLocalContentMock(topic: DesignTopic, format: 'single' | 'carousel'): DesignContentResult {
  const headline = topic.title.toUpperCase();
  const baseCaptions = {
    linkedin: {
      hook: `Why ${topic.title} defines modern product design excellence:`,
      context: `In complex digital interfaces, visual clarity is achieved through intentional spatial hierarchy and visual weight.`,
      mainInsight: `Guiding attention through scale allows users to parse information rapidly without cognitive strain.`,
      keyTakeaways: [
        `Establish clear visual scale contrast between primary headlines and supporting copy.`,
        `Use strategic Cobalt Blue accents to focus attention on primary action paths.`,
        `Maintain generous safe margins to preserve editorial breathability.`
      ],
      cta: `How do you apply ${topic.title} in your design system? Let's discuss in the comments.`,
      hashtags: [`#UXDesign`, `#VisualHierarchy`, `#ProductDesign`, `#UIUX`, `#DesignSystems`]
    },
    instagram: {
      hook: `Guiding attention through scale with ${topic.title}. 🎯`,
      story: `Design isn't just about making things look good—it's about directing the human eye effortlessly.`,
      lesson: `Size, contrast, and layout work together to create clear reading orders.`,
      cta: `Save this post for your next UI audit! 📌`,
      hashtags: [`#uxdesign`, `#uidesign`, `#designrules`, `#productdesign`]
    },
    facebook: {
      opening: `Here's a key UX principle every designer should master: ${topic.title}.`,
      problem: `Users get overwhelmed when every element competes for equal visual attention.`,
      advice: `Structure your canvas with clear typographic contrast and focal isolation.`,
      example: `Notice how Bebas Neue headlines create instant anchor points for the reader.`,
      question: `What's your biggest takeaway from this layout?`,
      hashtags: [`#UX`, `#DesignStrategy`, `#UIUX`]
    },
    twitter: {
      singleTweet: `${topic.title}: Guiding user attention through scale, contrast, and spatial hierarchy. 📐✨`,
      threadVersion: [
        `1/5 Most interface clutter comes from lack of visual hierarchy. Here's how to fix it 🧵`,
        `2/5 Establish primary anchors using bold condensed typography like Bebas Neue.`,
        `3/5 Use selective color accents (Cobalt Blue #1557FF) only where focal action is needed.`,
        `4/5 Maintain 36px safe perimeter margins for breathing room.`,
        `5/5 Follow @tzinr for daily UX foundations & design strategy!`
      ],
      hashtags: [`#UX`, `#DesignStrategy`]
    },
    youtube: {
      seoTitle: `${topic.title} Explained: Master Visual Hierarchy & UI Design`,
      description: `Deep dive into ${topic.title} and how to structure modern editorial layouts.`,
      whatYouWillLearn: [`Visual hierarchy principles`, `Typographic scale contrast`, `Spatial composition`],
      chapters: [`0:00 Introduction`, `1:30 Core Principle`, `4:15 Real-World Case Study`, `7:00 Key Takeaways`],
      cta: `Subscribe to Director.ai for weekly design breakdowns!`,
      keywords: [`UX Design`, topic.title, `Visual Hierarchy`, `UI UX`],
      hashtags: [`#UXDesign`, `#UIUX`]
    }
  };

  if (format === 'carousel') {
    return {
      format: 'carousel',
      visualType: 'hero_object',
      topicTitle: topic.title,
      coverTitle: topic.title,
      whyThisMatters: `${topic.title} is a core foundation of effective digital product design, ensuring visual clarity and cognitive ease.`,
      captions: baseCaptions,
      slides: [
        {
          heading: headline,
          description: `Guiding attention through scale and layout.`,
          imagePrompt: `[FORMAT] 4:5 vertical editorial carousel slide. Cover slide for ${topic.title}.`,
          imageText: { headline: headline, supporting: `Slide 1 / 5` }
        },
        {
          heading: `SCALE & CONTRAST`,
          description: `Primary anchors require dramatic typographic size contrast.`,
          imagePrompt: `[FORMAT] 4:5 vertical editorial carousel slide. Focus on scale contrast.`,
          imageText: { headline: `SCALE & CONTRAST`, supporting: `Slide 2 / 5` }
        },
        {
          heading: `FOCAL ISOLATION`,
          description: `Use Cobalt Blue accents only for key directional paths.`,
          imagePrompt: `[FORMAT] 4:5 vertical editorial carousel slide. Cobalt Blue focal highlights.`,
          imageText: { headline: `FOCAL ISOLATION`, supporting: `Slide 3 / 5` }
        }
      ],
      tzinrSignatureText: `TZINR / UX`,
      tzinrSignaturePlacement: `top-left`,
      actionableTakeaways: [
        `Use Bebas Neue for tall condensed primary headlines.`,
        `Apply Manrope Semibold for clear, readable subheadings.`,
        `Maintain IBM Plex Mono for technical metadata and counts.`
      ],
      cta: `Follow TZINR for daily UX foundations.`,
      hashtags: [`#UXDesign`, `#VisualHierarchy`, `#ProductDesign`, `#UIUX`, `#DesignSystems`],
      keywords: [`UX Design`, topic.title, `Visual Hierarchy`, `UI UX`]
    };
  }

  return {
    format: 'single',
    visualType: 'hero_object',
    topicTitle: topic.title,
    whyThisMatters: `${topic.title} is a core foundation of effective digital product design, ensuring visual clarity and cognitive ease.`,
    hook: `Master ${topic.title} to transform how users navigate your interface.`,
    professionalCaption: `Understanding ${topic.title}: Clear visual hierarchy guides attention through scale, contrast, and strategic spatial layout.`,
    captions: baseCaptions,
    actionableTakeaways: [
      `Use Bebas Neue for tall condensed primary headlines.`,
      `Apply Manrope Semibold for clear, readable subheadings.`,
      `Maintain IBM Plex Mono for technical metadata and counts.`
    ],
    cta: `Follow TZINR for daily UX foundations.`,
    imageText: {
      headline: headline,
      supporting: `Guiding attention through scale`
    },
    tzinrSignatureText: `TZINR / UX`,
    tzinrSignaturePlacement: `top-left`,
    hashtags: [`#UXDesign`, `#VisualHierarchy`, `#ProductDesign`, `#UIUX`, `#DesignSystems`],
    keywords: [`UX Design`, topic.title, `Visual Hierarchy`, `UI UX`],
    imagePrompt: `[FORMAT] Premium editorial social media graphic, 4:5 vertical aspect ratio (1080 x 1350 pixels resolution).
[SAFE PADDING] ~36px safe margin on all 4 edges.
[SPATIAL COMPOSITION] Strict two-column asymmetrical layout: Left 45% is clean typography column; Right 50% is bespoke 3D hero sculpture on rich paper canvas. Zero visual overlap.
[TOP-LEFT BRANDING] 'TZINR' in Manrope ExtraBold with 'UX FOUNDATIONS ${String(topic.id).padStart(3, '0')}' in IBM Plex Mono.
[TOP-RIGHT METADATA] '${String(topic.id).padStart(3, '0')} / 100' in IBM Plex Mono.
[LEFT TYPOGRAPHY COLUMN] Headline '${headline}' in Bebas Neue uppercase condensed, Subheading 'Guiding attention through scale' in Manrope Semibold with 'scale' highlighted in Cobalt Blue (#1557FF), Paragraph explaining visual hierarchy in Manrope Regular.
[RIGHT HERO VISUAL] Bespoke 3D architectural sculpture representing ${topic.title}, illuminated by a soft atmospheric Cobalt Blue background glow.
[BOTTOM-LEFT METADATA] 'CONCEPT: ${topic.title.toUpperCase()}' in IBM Plex Mono.
[BACKGROUND & TEXTURE] Warm off-white paper texture with fine blueprint grid lines, subtle dot matrix pattern, soft atmospheric blue background glow, and architectural shadows.
[COLOR PALETTE] Off-white background, Deep Navy typography, Cobalt Blue (#1557FF) strategic accent.
[TZINR BRANDING] 'TZINR' (Manrope ExtraBold) top-left with 'UX FOUNDATIONS ${String(topic.id).padStart(3, '0')}' (IBM Plex Mono).`
  };
}

export const generateContentFromTopic = async (topic: DesignTopic, format: 'single' | 'carousel'): Promise<DesignContentResult> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'DUMMY_KEY') {
    console.warn("No valid Gemini API Key found. Returning instant local design content mock.");
    return generateLocalContentMock(topic, format);
  }

  try {
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
      model: 'gemini-2.5-flash',
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
