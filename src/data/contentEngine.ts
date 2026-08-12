import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel, DesignTopic } from '../types';

const SYSTEM_PROMPT = `You are a Senior Product Designer, UX Strategist, LinkedIn Personal Branding Strategist, Content Strategist, and Social Psychology-based Content Creator for TZINR (a premium creative design publication and studio).

============================================================
DIRECTOR.AI — UNIVERSAL AI DESIGN PUBLISHER PROMPT-ENGINE
CONCEPT-DRIVEN CREATIVE BACKGROUND GENERATION ENGINE
============================================================

1. BRAND SYSTEM (ALWAYS CONSISTENT):
   - Format: 4:5 vertical editorial graphic (1080 × 1350 pixels resolution).
   - Safe Margin: ~36px safe padding on all 4 edges.
   - Header: Top-left 'TZINR' (Manrope ExtraBold) + 'UX FOUNDATIONS [NUM]' (IBM Plex Mono); Top-right '[NUM] / 100' (IBM Plex Mono).
   - Layout: Strict asymmetrical split: Left 45% typography column + Right 50% hero artwork area (zero text overlap).
   - Foundation & Colors: Warm off-white / ivory (#FBFBFA), Deep Navy structural typography (#0A0A10), Cobalt Blue (#1557FF) strategic focal accent.
   - Fonts: Bebas Neue (Headline), Manrope (Subheading/Body), IBM Plex Mono (Metadata).

2. CONCEPT-DRIVEN CREATIVE FREEDOM (BACKGROUND & VISUAL ELEMENTS):
   - ALL visual treatments (grids, dot matrix, gradients, blue lighting, paper textures, architectural structures, shadows, organic curves, photographic lighting) are FULLY ALLOWED.
   - Select visual treatments INTENTIONALLY based on what strengthens the specific concept:
     * GRID: Use for design systems, visual hierarchy, alignment, structure, and consistency.
     * DOTS / DOT MATRIX: Use for data chunking, Miller's Law, networks, scale, and repetition.
     * GRADIENT / BLUE GLOW: Use for focal depth, spatial transition, atmosphere, and focal isolation.
     * TEXTURE & PAPER: Use for tactility, editorial warm print quality, and physical presence.
     * ARCHITECTURE: Use for structural hierarchy, Jakob's Law, Fitts's Law, and scale contrast.
     * ORGANIC FORMS: Use for human behavior, fluid UX motion, and Gestalt proximity.
     * SHADOW & LIGHT: Use for attention direction, chiaroscuro, and spatial perception.
   - The background must NEVER be plain or empty; it should have intentional visual character while remaining clean and premium.

3. MANDATORY 17-PART IMAGE PROMPT CONSTRUCTION ORDER:
   Every generated image prompt MUST be written as a DIRECT IMAGE-GENERATION PROMPT instructing the model to CREATE / GENERATE / RENDER:
   [FORMAT] [BRAND SYSTEM] [FIXED LAYOUT] [CONTENT] [CORE IDEA] [VISUAL METAPHOR] [ART DIRECTION] [HERO VISUAL] [ENVIRONMENT] [MATERIAL] [COMPOSITION] [LIGHTING] [COLOR APPLICATION] [TYPOGRAPHY] [VISIBLE TEXT] [BACKGROUND] [NEGATIVE RULES]

4. NEGATIVE RULES (ONLY PROHIBIT GENUINELY BAD OUTPUT):
   - Prohibit: Low-quality rendering, unreadable typography, visual clutter, unrelated random objects, generic stock-art appearance, accidental watermarks, distorted text, broken composition.
   - DO NOT globally ban grids, dots, gradients, textures, architectural environments, or blue lighting. Use them intentionally when they elevate the concept.`;

const ART_DIRECTIONS = [
  {
    family: 'ARCHITECTURAL & GRID SYSTEMS',
    metaphor: 'Cascading architectural staircases and converging concrete planes creating dramatic scale contrast.',
    environment: 'Sunlit concrete gallery space with fine architectural blueprint grid lines.',
    material: 'Smooth architectural concrete and matte white plaster.',
    lighting: 'High-contrast natural directional sunlight from an overhead skylight.',
    blueAccent: 'Cobalt Blue (#1557FF) applied to the single illuminated focal portal lens at the convergence point.',
    background: 'Architectural gallery environment with fine blueprint grid lines, structural shadow depth, and subtle paper grain.'
  },
  {
    family: 'EDITORIAL STILL LIFE',
    metaphor: 'Curated arrangement of precision design tools, glass prisms, and tactile paper samples resting on a plaster pedestal.',
    environment: 'Clean editorial studio tabletop setting.',
    material: 'Flawless optical glass, heavy matte paper stock, and carved limestone.',
    lighting: 'Soft diffused studio window lighting with gentle contact shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) tint inside the optical center of the glass prism.',
    background: 'Warm tactile off-white paper canvas with subtle fiber texture and soft studio window shadows.'
  },
  {
    family: 'SCULPTURAL & KINETIC',
    metaphor: 'A bronze kinetic pendulum suspended in static equilibrium over a carved limestone base.',
    environment: 'Minimalist gallery alcove with neutral plaster backdrop.',
    material: 'Patinated bronze wire, raw limestone block, and polished chrome.',
    lighting: 'Dramatic side spotlight casting razor-sharp geometric shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) high-gloss enamel ring marking the balance pivot point.',
    background: 'Gallery plaster alcove with sharp directional shadow projections and subtle surface stippling.'
  },
  {
    family: 'SHADOW / LIGHT & ATMOSPHERE',
    metaphor: 'Single sharp beam of light cutting across a dark void to reveal hidden architectural depth.',
    environment: 'Atmospheric dark studio space with subtle environmental haze and radial gradient glow.',
    material: 'Dark slate, matte black metal, and translucent frosted glass.',
    lighting: 'Single tight key spotlight creating stark chiaroscuro shadow contrast.',
    blueAccent: 'Cobalt Blue (#1557FF) illuminated edge glowing where light hits the glass barrier.',
    background: 'Atmospheric dark studio background with soft Cobalt Blue ambient radial glow gradient and mist depth.'
  },
  {
    family: 'DATA MATRIX & CHUNKING',
    metaphor: '5 modular limestone pedestals arranged in distinct visual chunk groups with translucent glass boundary markers.',
    environment: 'Technical design laboratory setting.',
    material: 'Porous limestone, crystal optical glass, and anodized aluminum.',
    lighting: 'Clean 45-degree directional key light with technical fill.',
    blueAccent: 'Cobalt Blue (#1557FF) highlight on the 5th chunk pedestal boundary.',
    background: 'Technical off-white paper canvas with fine monospaced dot matrix density clusters and margin alignment marks.'
  },
  {
    family: 'OPTICAL / PERSPECTIVE',
    metaphor: 'Forced-perspective corridor of receding archways guiding the viewer toward a single vanishing point.',
    environment: 'Minimalist architectural corridor.',
    material: 'Monolithic travertine marble and translucent acrylic.',
    lighting: 'Symmetrical ambient fill with subtle directional rim lighting.',
    blueAccent: 'Cobalt Blue (#1557FF) vertical neon edge framing the central vanishing portal.',
    background: 'Perspective corridor background with subtle receding grid lines and soft atmospheric gradient depth.'
  },
  {
    family: 'NEGATIVE SPACE & VOIDS',
    metaphor: 'Interlocking geometric voids in a wall forming a complete conceptual icon through spatial subtraction.',
    environment: 'Architectural facade wall on warm paper canvas.',
    material: 'Fine grain ivory paper cardstock with laser-cut geometric voids.',
    lighting: 'Backlit ambient diffusion accentuating precise cutout edges.',
    blueAccent: 'Cobalt Blue (#1557FF) backplate visible exclusively through the central cutout void.',
    background: 'Ivory cardstock texture with shadow depth from laser-cut void edges.'
  },
  {
    family: 'HUMAN INTERACTION',
    metaphor: 'A designer\'s hand precisely aligning a translucent glass visual filter over an architectural blueprint.',
    environment: 'Warm tactile design workspace desk.',
    material: 'Natural skin tones, thick cotton paper, optical glass filter.',
    lighting: 'Warm overhead desk lamp ambient lighting.',
    blueAccent: 'Cobalt Blue (#1557FF) alignment crosshair etched onto the glass filter.',
    background: 'Tactile cotton paper workspace with subtle blueprint crosshair grid overlay.'
  },
  {
    family: 'ORGANIC FORM & FLOW',
    metaphor: 'Fluid ceramic ribbon sculpting through space, contrasting with rigid geometric framework pins.',
    environment: 'Soft studio background with gentle shadow gradient.',
    material: 'Glazed matte porcelain ceramic and brass pins.',
    lighting: 'Soft top-down dome diffusion lighting.',
    blueAccent: 'Cobalt Blue (#1557FF) ceramic glaze applied to the primary organic curve zenith.',
    background: 'Soft studio backdrop with smooth ambient lighting gradient and gentle porcelain shadows.'
  },
  {
    family: 'PHOTOGRAPHIC & LETTERPRESS',
    metaphor: 'Macro studio photography of raw editorial paper grain with debossed typographic letterforms.',
    environment: 'Macro studio copy stand.',
    material: '350gsm warm ivory cotton paper with tactile letterpress texture.',
    lighting: 'Low-angle grazing light casting deep tactile letterpress shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) foil stamp on the primary focus keyword.',
    background: 'Macro 350gsm paper texture with tactile debossed depth and soft grazing light.'
  },
  {
    family: 'SURREAL HORIZON',
    metaphor: 'A floating marble archway opening to reveal a calm open horizon within an indoor gallery room.',
    environment: 'Minimalist museum hall with open ceiling portal.',
    material: 'Carrara marble, quiet atmospheric air, and glass horizon.',
    lighting: 'Ethereal ambient sky illumination from above.',
    blueAccent: 'Cobalt Blue (#1557FF) horizon line separating room and open space.',
    background: 'Museum gallery hall with subtle atmospheric sky gradient glowing through portal.'
  },
  {
    family: 'ABSTRACT GEOMETRY & FILTERS',
    metaphor: 'Overlapping geometric glass filters in space resolving multiple visual layers into one clear composite image.',
    environment: 'Clean white studio environment.',
    material: 'Multi-density colored glass plates and chrome stands.',
    lighting: 'Direct multi-angle studio lighting casting overlapping color shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) glass plate positioned as the final resolving lens.',
    background: 'Clean white studio background with translucent glass color shadow reflections.'
  },
  {
    family: 'CONCEPTUAL MEASUREMENT',
    metaphor: 'Precision brass calipers measuring the exact focal gap between two structural elements.',
    environment: 'Editorial product design bench.',
    material: 'Machined brass, dark oxidized steel, and optical lens.',
    lighting: 'Focused technical task light.',
    blueAccent: 'Cobalt Blue (#1557FF) precision indicator needle pointing to exact measurement.',
    background: 'Dark slate workbench with fine technical measurement tick marks and task light focus.'
  },
  {
    family: 'MOTION / FROZEN STROBE',
    metaphor: 'Stroboscopic sequence of a falling glass sphere caught in 5 static frozen mid-air stages.',
    environment: 'High-speed photography studio void.',
    material: 'Solid glass sphere and dark acoustic foam background.',
    lighting: 'High-speed microsecond strobe flash.',
    blueAccent: 'Cobalt Blue (#1557FF) streak line trailing the final frozen impact position.',
    background: 'High-speed studio void with frozen motion blur paths and subtle directional lighting glow.'
  },
  {
    family: 'ENVIRONMENTAL COURTYARD',
    metaphor: 'Quiet courtyard setting where sunlight creates geometric shadows aligned perfectly with architectural grid floor.',
    environment: 'Open-air Mediterranean minimalist courtyard.',
    material: 'Terracotta tiles, pale limestone walls, and clean shadow lines.',
    lighting: 'Late afternoon warm sun at 45-degree angle.',
    blueAccent: 'Cobalt Blue (#1557FF) ceramic bench positioned as the visual anchor.',
    background: 'Mediterranean courtyard wall with clean sunlight shadow grid projections.'
  },
  {
    family: 'LIGHT INSTALLATION',
    metaphor: 'Kinetic LED light tubes sculpting dramatic spatial planes over raw plaster walls.',
    environment: 'Contemporary art installation pavilion.',
    material: 'Diffused acrylic light tubes and raw troweled plaster.',
    lighting: 'Self-illuminating LED light planes with soft ambient glow.',
    blueAccent: 'Cobalt Blue (#1557FF) light tube establishing the primary spatial axis.',
    background: 'Raw plaster gallery wall illuminated by soft spatial light plane reflections.'
  },
  {
    family: 'CONCEPTUAL PHOTOGRAPHY',
    metaphor: 'High-contrast studio macro photography capturing a single ray of light refracting through a crystal prism.',
    environment: 'Darkened photographic studio.',
    material: 'Optical glass prism and matte black background.',
    lighting: 'Ultra-narrow collimated beam of light.',
    blueAccent: 'Cobalt Blue (#1557FF) spectral wavelength beam isolated on black.',
    background: 'Dark photographic studio setting with sharp light ray refraction reflections.'
  },
  {
    family: 'LAYERED MATERIALS',
    metaphor: 'Staggered vertical planes of translucent vellum, smoked glass, and raw slate creating deep spatial translucency.',
    environment: 'Material research laboratory exhibition.',
    material: '90gsm tracing vellum, 6mm smoked tempered glass, and natural slate.',
    lighting: 'Soft rear backlighting casting layered translucent shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) edge banding on the central glass plate.',
    background: 'Exhibition space with backlit translucent material shadow gradients.'
  },
  {
    family: 'ATMOSPHERIC FOG CHAMBER',
    metaphor: 'Minimalist mist-filled chamber where a single directional light beam reveals spatial depth and volume.',
    environment: 'Architectural fog chamber installation.',
    material: 'Water vapor mist, matte epoxy floor, and brushed aluminum.',
    lighting: 'Volumetric light shaft cutting through fog.',
    blueAccent: 'Cobalt Blue (#1557FF) laser line marking the spatial grid floor.',
    background: 'Volumetric mist atmosphere with soft directional light beam depth.'
  },
  {
    family: 'CONTEMPORARY INSTALLATION ART',
    metaphor: 'Suspended acrylic geometric frames floating in a sunlit atrium, casting overlapping colored shadows.',
    environment: 'Sunlit museum atrium.',
    material: 'Monofilament wire, tinted acrylic frames, and polished concrete.',
    lighting: 'Bright natural sunlight creating vivid floor projections.',
    blueAccent: 'Cobalt Blue (#1557FF) acrylic frame suspended at eye level.',
    background: 'Concrete atrium floor with vibrant geometric acrylic shadow projections.'
  },
  {
    family: 'SCALE CONTRAST',
    metaphor: 'A tiny monolithic pin standing beside a giant illuminated sphere, demonstrating extreme visual hierarchy scale.',
    environment: 'Minimalist studio soundstage.',
    material: 'Anodized black aluminum pin and translucent fiberglass sphere.',
    lighting: 'Internal glow from sphere with soft key light on pin.',
    blueAccent: 'Cobalt Blue (#1557FF) core glowing inside the giant sphere.',
    background: 'Studio soundstage with soft ambient illumination halo surrounding the focal sphere.'
  }
];

export function build17PartImagePrompt(topic: DesignTopic): string {
  const artDir = ART_DIRECTIONS[topic.id % ART_DIRECTIONS.length];
  const headline = topic.title.toUpperCase();
  const templateNum = String(topic.id).padStart(3, '0');

  return `[FORMAT] CREATE / RENDER a premium 4:5 vertical editorial social media graphic (1080 x 1350 pixels resolution).
[BRAND SYSTEM] LAYER A: TZINR Brand System. Warm off-white/ivory foundation (#FBFBFA), Deep Navy typography (#0A0A10), Cobalt Blue (#1557FF) strategic accent.
[FIXED LAYOUT] ~36px safe padding on all 4 edges. Asymmetrical two-column composition: Left 45% is clean typography column; Right 50% is hero visual artwork. Zero visual overlap.
[CONTENT] LAYER B: Content System for ${headline}. 1 main headline, 1 short subheading, 1 concise explanation, category metadata. High signal, zero infographic clutter.
[CORE IDEA] Visualizing the core principle of ${topic.title} through physical form and spatial clarity.
[VISUAL METAPHOR] ${artDir.metaphor}
[ART DIRECTION] LAYER C: ${artDir.family}
[HERO VISUAL] Right 50% hero artwork: ${artDir.metaphor}
[ENVIRONMENT] ${artDir.environment}
[MATERIAL] ${artDir.material}
[COMPOSITION] Strict asymmetrical 50/50 balance. Left text column aligned parallel with right hero artwork.
[LIGHTING] ${artDir.lighting}
[COLOR APPLICATION] Primary off-white environment foundation, Deep Navy structural text, ${artDir.blueAccent}
[TYPOGRAPHY] Headlines in Bebas Neue uppercase condensed; Subheadings & body in Manrope; Metadata & numbers in IBM Plex Mono; Brand name in Manrope ExtraBold.
[VISIBLE TEXT] Top-left 'TZINR' (Manrope ExtraBold) + 'UX FOUNDATIONS ${templateNum}' (IBM Plex Mono); Top-right '${templateNum} / 100' (IBM Plex Mono); Left column Headline '${headline}' (Bebas Neue); Subheading 'Guiding attention through scale' with Cobalt Blue keyword accent (Manrope Semibold); Bottom-left 'CONCEPT: ${headline}' (IBM Plex Mono).
[BACKGROUND] ${artDir.background}
[NEGATIVE RULES] Low-quality rendering, unreadable typography, visual clutter, unrelated random objects, generic stock-art appearance, accidental watermarks, distorted text, broken composition.`;
}

export function generateLocalContentMock(topic: DesignTopic, format: 'single' | 'carousel'): DesignContentResult {
  const headline = topic.title.toUpperCase();
  const imagePromptText = build17PartImagePrompt(topic);

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
