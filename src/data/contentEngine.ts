import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel, DesignTopic } from '../types';

const SYSTEM_PROMPT = `You are a Senior Product Designer, UX Strategist, LinkedIn Personal Branding Strategist, Content Strategist, and Social Psychology-based Content Creator for TZINR (a premium creative design publication and studio).

============================================================
DIRECTOR.AI - TZINR BRAND-FIRST EDITORIAL PROMPT ENGINE
MANDATORY BRAND FOUNDATION CONSISTENCY RULE (4:5 VERTICAL, 1080 x 1350)
============================================================

1. MANDATORY BRAND FOUNDATION (CONSISTENT IN EVERY POST):
   - EVERY POST MUST ALWAYS BE: TZINR FIRST → CONCEPT SECOND.
   - ABSOLUTELY NO HERO IMAGES, NO ILLUSTRATIONS, NO 3D OBJECTS.
   - Deep Black / near-black (#131112) is the MANDATORY DOMINANT BACKGROUND FOUNDATION spanning the full 1080 × 1350 frame.
   - Warm off-white / ivory (#F8F1E7) for primary typography.
   - Electric Lime (#C8F423) as a restrained strategic focal accent ONLY.
   - Clean, dark, premium, editorial atmosphere with ~36px safe perimeter padding on all 4 edges.

2. UNIVERSAL TEMPLATE RULE:
   When a new topic/concept is provided, preserve every fixed design parameter in this template exactly.
   Only replace the variable content:
   - Main statement
   - Supporting statement
   - Body copy
   - Highlighted keyword
   - Category metadata
   - Post number

   Adapt line breaks and text scale only when necessary to fit the supplied content while preserving the same visual hierarchy.
   Never redesign the template because the topic is different. The topic changes the CONTENT, not the DESIGN SYSTEM.

3. TEXT HANDLING:
   Use the exact supplied text. Do not paraphrase. Do not add extra sentences. Do not add quotes or commentary that were not provided.

4. NEGATIVE RULES:
   - TYPOGRAPHY RULE: DO NOT USE the em-dash character "-". YOU MUST ALWAYS USE a standard hyphen "-" in all generated text and descriptions.
   - DO NOT ADD: photographs, illustrations, 3D objects, UI mockups, dashboards, icons unrelated to the editorial composition, complex graphics, excessive decoration, multiple accent colors, unnecessary paragraphs, infographic elements.`;

export function buildEditorialTextPrompt(topic: DesignTopic): string {
  const templateNum = String(topic.id).padStart(3, '0');
  const mainStatement = (topic.message || topic.title).toUpperCase();
  const supportingStatement = topic.insight || 'Clarity is often created by what you choose to remove.';
  const bodyCopy = topic.visualMetaphor || 'Guiding user attention through intentional spatial layout and scale contrast.';
  const categoryMeta = (topic.category || 'DESIGN / UX / PRODUCT / THINKING').toUpperCase();

  return `CREATE / RENDER a premium 4:5 vertical LinkedIn editorial poster at EXACTLY 1080 × 1350 px.

DESIGN STYLE:
Bold, modern, editorial, typography-led, highly intentional, minimal but visually rich. The typography is the primary visual element. No hero image or illustration.

COLOR SYSTEM:
- Background: Deep Black / near-black #131112
- Primary text: Warm Ivory #F8F1E7
- Accent: Electric Lime #C8F423
- Use electric lime selectively on key words or small graphic details.
- Maintain strong ivory/black contrast.
- Do not introduce unrelated colors.

CANVAS & PADDING:
- Canvas: 1080 × 1350 px
- Safe area: 36 px on all four sides.
- Keep all essential text inside the 36 px safe area.

TOP HEADER:
At x=36-60 px and y=36-70 px:
- "TZINR"
- IBM Plex Mono (small mono metadata)
- Font size: 14-16 px
- Uppercase
- Warm Ivory
- Do NOT include any numbering like "1/100" at the top right. Remove it entirely.

Add a very subtle 1 px horizontal divider beneath the header.

MAIN STATEMENT:
Place the main statement in the upper-middle and center-left portion of the canvas.

Use Bebas Neue (or Archivo Black / Anton):
- Very large display typography (Bold Grotesk)
- Dominates 70-80% of visual attention
- Approx. 110-140 px font size
- Tight line-height: approximately 0.85-0.95
- Strong editorial block composition

Statement:
${mainStatement}

Use Electric Lime on ONE strategically important word or phrase only.

The headline should occupy approximately 70-80% of the visual width while remaining inside the safe area.
Do not center every line mechanically. Use deliberate editorial line breaks.

SUPPORTING THOUGHT:
Below the main statement with approximately 40-55 px separation.

Manrope Medium / Regular:
- Small and restrained
- 20-24 px
- Clean line-height
- Maximum 2 short lines

Statement:
"${supportingStatement}"

CATEGORY / SERIES (FOOTER):
Place near the bottom-left inside the safe area as a tiny technical footer.

IBM Plex Mono:
- 12-14 px
- Uppercase
- Text:
${categoryMeta}

Use Electric Lime only for one metadata word or separator.

BOTTOM-RIGHT:
A small minimal editorial arrow or circular navigation mark may be used.
Keep it subtle and geometric.

LAYOUT PRINCIPLES & COMPOSITION:
- Typography first. Space second. Everything else third.
- Very large headline scale with short text blocks.
- Generous line spacing and large gaps between sections.
- Strong alignment with plenty of empty canvas around the typography.
- Deep Black #131112 background + huge Ivory typography + Electric Lime emphasis + generous negative space.
- Clear reading hierarchy from top -> statement -> supporting thought -> footer.
- AVOID: Crowded compositions, too many text elements, decorative UI elements, excessive borders/cards.
- AVOID: Filling empty space just because it exists, multiple competing font styles.

TEXT HANDLING:
Use the exact supplied text.
Do not paraphrase.
Do not add extra sentences.
Do not add quotes or commentary that were not provided.

DO NOT ADD:
- photographs
- illustrations
- 3D objects
- UI mockups
- dashboards
- icons unrelated to the editorial composition
- complex graphics
- excessive decoration
- multiple accent colors
- unnecessary paragraphs
- infographic elements

FINAL FEEL:
A premium TZINR design statement for LinkedIn - bold enough to stop the scroll, restrained enough to feel sophisticated, and typography-led rather than image-led.`;
}

export function generateLocalContentMock(topic: DesignTopic, format: 'single' | 'carousel'): DesignContentResult {
  const headline = topic.title.toUpperCase();
  const imagePromptText = buildEditorialTextPrompt(topic);

  const baseCaptions = {
    linkedin: {
      hook: `Why ${topic.title} defines modern product design excellence:`,
      context: `In complex digital interfaces, visual clarity is achieved through intentional spatial hierarchy and visual weight.`,
      mainInsight: `Guiding attention through scale allows users to parse information rapidly without cognitive strain.`,
      keyTakeaways: [
        `Establish clear visual scale contrast between primary headlines and supporting copy.`,
        `Use strategic Electric Lime accents to focus attention on primary action paths.`,
        `Maintain generous safe margins to preserve editorial breathability.`
      ],
      cta: `How do you apply ${topic.title} in your design system? Let's discuss in the comments.`,
      hashtags: [`#UXDesign`, `#VisualHierarchy`, `#ProductDesign`, `#UIUX`, `#DesignSystems`, `#DesignStrategy`, `#CreativeDirection`, `#UserExperience`, `#WebDesign`, `#DesignCommunity`, `#DesignInspiration`, `#TechTrends`]
    },
    instagram: {
      hook: `Guiding attention through scale with ${topic.title}. 🎯`,
      story: `Design isn't just about making things look good-it's about directing the human eye effortlessly.`,
      lesson: `Size, contrast, and layout work together to create clear reading orders.`,
      cta: `Save this post for your next UI audit! 📌`,
      hashtags: [`#uxdesign`, `#uidesign`, `#designrules`, `#productdesign`, `#designstrategy`, `#userexperience`, `#creativeprocess`, `#designthinking`, `#uiux`, `#designinspiration`, `#techdesign`, `#designcommunity`]
    },
    facebook: {
      opening: `Here's a key UX principle every designer should master: ${topic.title}.`,
      problem: `Users get overwhelmed when every element competes for equal visual attention.`,
      advice: `Structure your canvas with clear typographic contrast and focal isolation.`,
      example: `Notice how Bebas Neue headlines create instant anchor points for the reader.`,
      question: `What's your biggest takeaway from this layout?`,
      hashtags: [`#UX`, `#DesignStrategy`, `#UIUX`, `#DesignSystems`, `#CreativeDirection`, `#UserExperience`, `#WebDesign`, `#DesignCommunity`, `#DesignInspiration`, `#TechTrends`, `#DigitalDesign`, `#UXResearch`]
    },
    twitter: {
      singleTweet: `${topic.title}: Guiding user attention through scale, contrast, and spatial hierarchy. 📐✨`,
      threadVersion: [
        `1/5 Most interface clutter comes from lack of visual hierarchy. Here's how to fix it 🧵`,
        `2/5 Establish primary anchors using bold condensed typography like Bebas Neue.`,
        `3/5 Use selective color accents (Electric Lime #C8F423) only where focal action is needed.`,
        `4/5 Maintain 36px safe perimeter margins for breathing room.`,
        `5/5 Follow @tzinr for daily UX foundations & design strategy!`
      ],
      hashtags: [`#UX`, `#DesignStrategy`, `#UIUX`, `#DesignSystems`, `#CreativeDirection`, `#UserExperience`, `#WebDesign`, `#DesignCommunity`, `#DesignInspiration`, `#TechTrends`, `#DigitalDesign`, `#UXResearch`]
    },
    youtube: {
      seoTitle: `${topic.title} Explained: Master Visual Hierarchy & UI Design`,
      description: `Deep dive into ${topic.title} and how to structure modern editorial layouts.`,
      whatYouWillLearn: [`Visual hierarchy principles`, `Typographic scale contrast`, `Spatial composition`],
      chapters: [`0:00 Introduction`, `1:30 Core Principle`, `4:15 Real-World Case Study`, `7:00 Key Takeaways`],
      cta: `Subscribe to Director.ai for weekly design breakdowns!`,
      keywords: [`UX Design`, topic.title, `Visual Hierarchy`, `UI UX`],
      hashtags: [`#UXDesign`, `#UIUX`, `#DesignSystems`, `#CreativeDirection`, `#UserExperience`, `#WebDesign`, `#DesignCommunity`, `#DesignInspiration`, `#TechTrends`, `#DigitalDesign`, `#UXResearch`, `#DesignStrategy`]
    }
  };

  if (format === 'carousel') {
    return {
      format: 'carousel',
      visualType: 'typographic_experiment',
      topicTitle: topic.title,
      coverTitle: topic.title,
      whyThisMatters: `${topic.title} is a core foundation of effective digital product design, ensuring visual clarity and cognitive ease.`,
      captions: baseCaptions,
      slides: [
        {
          heading: headline,
          description: `Guiding attention through scale and layout.`,
          imagePrompt: buildEditorialTextPrompt(topic),
          imageText: { headline: headline, supporting: `Slide 1 / 5` }
        },
        {
          heading: `SCALE & CONTRAST`,
          description: `Primary anchors require dramatic typographic size contrast.`,
          imagePrompt: buildEditorialTextPrompt(topic),
          imageText: { headline: `SCALE & CONTRAST`, supporting: `Slide 2 / 5` }
        },
        {
          heading: `FOCAL ISOLATION`,
          description: `Use Electric Lime accents only for key directional paths.`,
          imagePrompt: buildEditorialTextPrompt(topic),
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
      hashtags: [`#UXDesign`, `#VisualHierarchy`, `#ProductDesign`, `#UIUX`, `#DesignSystems`, `#DesignStrategy`, `#CreativeDirection`, `#UserExperience`, `#WebDesign`, `#DesignCommunity`, `#DesignInspiration`, `#TechTrends`],
      keywords: [`UX Design`, topic.title, `Visual Hierarchy`, `UI UX`]
    };
  }

  return {
    format: 'single',
    visualType: 'typographic_experiment',
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
    hashtags: [`#UXDesign`, `#VisualHierarchy`, `#ProductDesign`, `#UIUX`, `#DesignSystems`, `#DesignStrategy`, `#CreativeDirection`, `#UserExperience`, `#WebDesign`, `#DesignCommunity`, `#DesignInspiration`, `#TechTrends`],
    keywords: [`UX Design`, topic.title, `Visual Hierarchy`, `UI UX`],
    imagePrompt: imagePromptText
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
              type: 'OBJECT', properties: { hook: { type: 'STRING' }, context: { type: 'STRING' }, mainInsight: { type: 'STRING' }, keyTakeaways: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } },
              required: ["hook", "context", "mainInsight", "keyTakeaways", "cta", "hashtags"]
            },
            instagram: { 
              type: 'OBJECT', properties: { hook: { type: 'STRING' }, story: { type: 'STRING' }, lesson: { type: 'STRING' }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } },
              required: ["hook", "story", "lesson", "cta", "hashtags"]
            },
            facebook: { 
              type: 'OBJECT', properties: { opening: { type: 'STRING' }, problem: { type: 'STRING' }, advice: { type: 'STRING' }, example: { type: 'STRING' }, question: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } },
              required: ["opening", "problem", "advice", "example", "question", "hashtags"]
            },
            twitter: { 
              type: 'OBJECT', properties: { singleTweet: { type: 'STRING' }, threadVersion: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } },
              required: ["singleTweet", "threadVersion", "hashtags"]
            },
            youtube: { 
              type: 'OBJECT', properties: { seoTitle: { type: 'STRING' }, description: { type: 'STRING' }, whatYouWillLearn: { type: 'ARRAY', items: { type: 'STRING' } }, chapters: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, keywords: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } },
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
            linkedin: { type: 'OBJECT', properties: { hook: { type: 'STRING' }, context: { type: 'STRING' }, mainInsight: { type: 'STRING' }, keyTakeaways: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } }, required: ["hook", "context", "mainInsight", "keyTakeaways", "cta", "hashtags"] },
            instagram: { type: 'OBJECT', properties: { hook: { type: 'STRING' }, story: { type: 'STRING' }, lesson: { type: 'STRING' }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } }, required: ["hook", "story", "lesson", "cta", "hashtags"] },
            facebook: { type: 'OBJECT', properties: { opening: { type: 'STRING' }, problem: { type: 'STRING' }, advice: { type: 'STRING' }, example: { type: 'STRING' }, question: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } }, required: ["opening", "problem", "advice", "example", "question", "hashtags"] },
            twitter: { type: 'OBJECT', properties: { singleTweet: { type: 'STRING' }, threadVersion: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } }, required: ["singleTweet", "threadVersion", "hashtags"] },
            youtube: { type: 'OBJECT', properties: { seoTitle: { type: 'STRING' }, description: { type: 'STRING' }, whatYouWillLearn: { type: 'ARRAY', items: { type: 'STRING' } }, chapters: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, keywords: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate 10-12 highly relevant hashtags for maximum reach' } }, required: ["seoTitle", "description", "whatYouWillLearn", "chapters", "cta", "keywords", "hashtags"] }
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

    const prompt = `Today's objective: Generate Day ${topic.id} of the 100-Concept Creative Library.

CONCEPT: ${topic.title}
CATEGORY: ${topic.category}
INSIGHT: ${topic.insight || ''}
MESSAGE: ${topic.message || ''}
VISUAL METAPHOR: ${topic.visualMetaphor || ''}

ENGINE MINDSET INSTRUCTIONS:
1. DESIGN STYLE: Strictly TEXT-BASED editorial typography poster. No hero images. Deep Black background with Warm Ivory text.
2. The imagePrompt field MUST contain the exact universal typography template structure but with the variable text swapped out for this concept.
3. NO DASH ACCENTS: Do NOT include blue dash lines, divider bars, or bullet dashes. Use hyphens instead.
4. PADDING: Maintain 36px safe perimeter margin.

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
