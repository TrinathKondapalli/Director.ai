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

const ART_DIRECTIONS = [
  {
    family: 'ARCHITECTURAL',
    metaphor: 'Cascading architectural staircases and converging concrete planes creating dramatic scale contrast.',
    environment: 'Sunlit concrete gallery space with deep structural shadows.',
    material: 'Smooth architectural concrete and matte white plaster.',
    lighting: 'High-contrast natural directional sunlight from an overhead skylight.',
    blueAccent: 'Cobalt Blue (#1557FF) applied to the single illuminated focal portal lens at the convergence point.'
  },
  {
    family: 'EDITORIAL STILL LIFE',
    metaphor: 'Curated arrangement of precision design tools, glass prisms, and tactile paper samples resting on a plaster pedestal.',
    environment: 'Clean editorial studio tabletop setting.',
    material: 'Flawless optical glass, heavy matte paper stock, and carved limestone.',
    lighting: 'Soft diffused studio window lighting with gentle contact shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) tint inside the optical center of the glass prism.'
  },
  {
    family: 'SCULPTURAL',
    metaphor: 'A bronze kinetic pendulum suspended in static equilibrium over a carved limestone base.',
    environment: 'Minimalist gallery alcove with neutral plaster backdrop.',
    material: 'Patinated bronze wire, raw limestone block, and polished chrome.',
    lighting: 'Dramatic side spotlight casting razor-sharp geometric shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) high-gloss enamel ring marking the balance pivot point.'
  },
  {
    family: 'SHADOW / LIGHT',
    metaphor: 'Single sharp beam of light cutting across a dark void to reveal hidden architectural depth.',
    environment: 'Atmospheric dark studio space with subtle environmental haze.',
    material: 'Dark slate, matte black metal, and translucent frosted glass.',
    lighting: 'Single tight key spotlight creating stark chiaroscuro shadow contrast.',
    blueAccent: 'Cobalt Blue (#1557FF) illuminated edge glowing where light hits the glass barrier.'
  },
  {
    family: 'MATERIAL STUDY',
    metaphor: 'Juxtaposition of rough volcanic rock resting against a polished glass sphere reflecting the room.',
    environment: 'Raw material exhibition pedestal.',
    material: 'Porous basalt stone, crystal optical sphere, and raw linen.',
    lighting: 'Directional 45-degree key light creating rich tactile surface texture.',
    blueAccent: 'Cobalt Blue (#1557FF) refraction line visible through the optical sphere center.'
  },
  {
    family: 'OPTICAL / PERSPECTIVE',
    metaphor: 'Forced-perspective corridor of receding archways guiding the viewer toward a single vanishing point.',
    environment: 'Minimalist architectural corridor.',
    material: 'Monolithic travertine marble and translucent acrylic.',
    lighting: 'Symmetrical ambient fill with subtle directional rim lighting.',
    blueAccent: 'Cobalt Blue (#1557FF) vertical neon edge framing the central vanishing portal.'
  },
  {
    family: 'NEGATIVE SPACE',
    metaphor: 'Interlocking geometric voids in a wall forming a complete conceptual icon through spatial subtraction.',
    environment: 'Architectural facade wall on warm paper canvas.',
    material: 'Fine grain ivory paper cardstock with laser-cut geometric voids.',
    lighting: 'Backlit ambient diffusion accentuating precise cutout edges.',
    blueAccent: 'Cobalt Blue (#1557FF) backplate visible exclusively through the central cutout void.'
  },
  {
    family: 'HUMAN INTERACTION',
    metaphor: 'A designer\'s hand precisely aligning a translucent glass visual filter over an architectural blueprint.',
    environment: 'Warm tactile design workspace desk.',
    material: 'Natural skin tones, thick cotton paper, optical glass filter.',
    lighting: 'Warm overhead desk lamp ambient lighting.',
    blueAccent: 'Cobalt Blue (#1557FF) alignment crosshair etched onto the glass filter.'
  },
  {
    family: 'ORGANIC FORM',
    metaphor: 'Fluid ceramic ribbon sculpting through space, contrasting with rigid geometric framework pins.',
    environment: 'Soft studio background with gentle shadow gradient.',
    material: 'Glazed matte porcelain ceramic and brass pins.',
    lighting: 'Soft top-down dome diffusion lighting.',
    blueAccent: 'Cobalt Blue (#1557FF) ceramic glaze applied to the primary organic curve zenith.'
  },
  {
    family: 'PHOTOGRAPHIC',
    metaphor: 'Macro studio photography of raw editorial paper grain with debossed typographic letterforms.',
    environment: 'Macro studio copy stand.',
    material: '350gsm warm ivory cotton paper with tactile letterpress texture.',
    lighting: 'Low-angle grazing light casting deep tactile letterpress shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) foil stamp on the primary focus keyword.'
  },
  {
    family: 'SURREAL',
    metaphor: 'A floating marble archway opening to reveal a calm open horizon within a indoor gallery room.',
    environment: 'Minimalist museum hall with open ceiling portal.',
    material: 'Carrara marble, quiet atmospheric air, and glass horizon.',
    lighting: 'Ethereal ambient sky illumination from above.',
    blueAccent: 'Cobalt Blue (#1557FF) horizon line separating room and open space.'
  },
  {
    family: 'ABSTRACT GEOMETRY',
    metaphor: 'Overlapping geometric glass filters in space resolving multiple visual layers into one clear composite image.',
    environment: 'Clean white studio environment.',
    material: 'Multi-density colored glass plates and chrome stands.',
    lighting: 'Direct multi-angle studio lighting casting overlapping color shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) glass plate positioned as the final resolving lens.'
  },
  {
    family: 'CONCEPTUAL OBJECTS',
    metaphor: 'Precision brass calipers measuring the exact focal gap between two structural elements.',
    environment: 'Editorial product design bench.',
    material: 'Machined brass, dark oxidized steel, and optical lens.',
    lighting: 'Focused technical task light.',
    blueAccent: 'Cobalt Blue (#1557FF) precision indicator needle pointing to exact measurement.'
  },
  {
    family: 'MOTION / FROZEN MOTION',
    metaphor: 'Stroboscopic sequence of a falling glass sphere caught in 5 static frozen mid-air stages.',
    environment: 'High-speed photography studio void.',
    material: 'Solid glass sphere and dark acoustic foam background.',
    lighting: 'High-speed microsecond strobe flash.',
    blueAccent: 'Cobalt Blue (#1557FF) streak line trailing the final frozen impact position.'
  },
  {
    family: 'ENVIRONMENTAL SCENE',
    metaphor: 'Quiet courtyard setting where sunlight creates geometric shadows aligned perfectly with architectural grid floor.',
    environment: 'Open-air Mediterranean minimalist courtyard.',
    material: 'Terracotta tiles, pale limestone walls, and clean shadow lines.',
    lighting: 'Late afternoon warm sun at 45-degree angle.',
    blueAccent: 'Cobalt Blue (#1557FF) ceramic bench positioned as the visual anchor.'
  }
];

export function build15PartImagePrompt(topic: DesignTopic): string {
  const artDir = ART_DIRECTIONS[topic.id % ART_DIRECTIONS.length];
  const headline = topic.title.toUpperCase();
  const templateNum = String(topic.id).padStart(3, '0');

  return `[FORMAT] Premium 4:5 vertical editorial social media graphic (1080 x 1350 pixels resolution).
[BRAND SYSTEM] TZINR brand identity. Warm off-white/ivory base (#FBFBFA), Deep Navy typography (#0A0A10), Cobalt Blue (#1557FF) strategic accent.
[FIXED LAYOUT] ~36px safe padding on all 4 edges. Strict asymmetrical split: Left 45% typography column; Right 50% hero visual area. Zero text overlap.
[CORE IDEA] Explaining ${topic.title} through clear visual hierarchy and structural clarity.
[VISUAL METAPHOR] ${artDir.metaphor}
[SELECTED ART DIRECTION] ${artDir.family}
[HERO VISUAL] Right 50% hero visual: ${artDir.metaphor}
[ENVIRONMENT] ${artDir.environment}
[MATERIAL] ${artDir.material}
[LIGHTING] ${artDir.lighting}
[COLOR APPLICATION] Off-white environment, Deep Navy text structure, ${artDir.blueAccent}
[TYPOGRAPHY] Display headline in Bebas Neue uppercase condensed; Subheadings & body in Manrope; Metadata in IBM Plex Mono.
[VISIBLE TEXT] Top-left 'TZINR' (Manrope ExtraBold) + 'UX FOUNDATIONS ${templateNum}' (IBM Plex Mono); Top-right '${templateNum} / 100' (IBM Plex Mono); Left headline '${headline}' (Bebas Neue); Subheading with Cobalt Blue keyword accent (Manrope Semibold); Bottom-left 'CONCEPT: ${headline}' (IBM Plex Mono).
[EDITORIAL DETAILS] Clean 36px margins, high-precision layout alignment, zero visual clutter.
[NEGATIVE RULES] Do NOT add generic grids, dot patterns, blue gradients, blue glow, or stacked 3D blocks unless explicitly justified by the selected concept.`;
}

export function generateLocalContentMock(topic: DesignTopic, format: 'single' | 'carousel'): DesignContentResult {
  const headline = topic.title.toUpperCase();
  const imagePromptText = build15PartImagePrompt(topic);

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
          imagePrompt: imagePromptText,
          imageText: { headline: headline, supporting: `Slide 1 / 5` }
        },
        {
          heading: `SCALE & CONTRAST`,
          description: `Primary anchors require dramatic typographic size contrast.`,
          imagePrompt: imagePromptText,
          imageText: { headline: `SCALE & CONTRAST`, supporting: `Slide 2 / 5` }
        },
        {
          heading: `FOCAL ISOLATION`,
          description: `Use Cobalt Blue accents only for key directional paths.`,
          imagePrompt: imagePromptText,
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
