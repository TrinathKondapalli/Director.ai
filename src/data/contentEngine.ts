import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel, DesignTopic } from '../types';

const SYSTEM_PROMPT = `You are a Senior Product Designer, UX Strategist, LinkedIn Personal Branding Strategist, Content Strategist, and Social Psychology-based Content Creator for TZINR (a premium creative design publication and studio).

============================================================
DIRECTOR.AI — TZINR BRAND-FIRST EDITORIAL PROMPT ENGINE
MANDATORY BRAND FOUNDATION CONSISTENCY RULE (4:5 VERTICAL, 1080 x 1350)
============================================================

1. MANDATORY BRAND FOUNDATION (CONSISTENT IN EVERY POST):
   - EVERY POST MUST ALWAYS BE: TZINR FIRST → CONCEPT SECOND.
   - ABSOLUTELY NO DARK BACKGROUNDS, NO BLACK ENVIRONMENTS, NO NIGHT SCENES, NO DARK CINEMATIC VIBES, NO ALTERNATE COLOR THEMES.
   - Warm off-white / ivory (#FBFBFA) is the MANDATORY DOMINANT BACKGROUND FOUNDATION spanning the full 1080 × 1350 frame.
   - Deep navy / black (#0A0A10) for ALL typography and structural details.
   - Cobalt blue (#1557FF) as a restrained strategic focal accent ONLY.
   - Clean, light, premium, editorial atmosphere with ~36px safe perimeter padding on all 4 edges.
   - Top-left 'TZINR' (Manrope ExtraBold) + 'UX FOUNDATIONS [NUM]' (IBM Plex Mono); Top-right '[NUM] / 100' (IBM Plex Mono).

2. SCOPE OF CREATIVE FREEDOM (APPLIES ONLY TO HERO ARTWORK):
   - Creative freedom applies ONLY to: hero artwork, visual metaphor, materials (stone, plaster, glass, paper, metal, ceramic, wood, fabric, acrylic, light), composition details, lighting, and concept-specific objects.
   - The background MUST remain inside the TZINR light editorial world.
   - Do NOT let the hero artwork turn the entire composition dark.
   - Do NOT change the overall color temperature or brand atmosphere.

3. ONE INTEGRATED COHESIVE ARTWORK (NO INSERTED IMAGE BOXES):
   - DO NOT create "text half + image half", split screens, or inserted photo boxes.
   - Output MUST be ONE SINGLE COHESIVE EDITORIAL ARTWORK where typography, warm ivory background, natural daylighting, material, and hero visual are art-directed together into a single unified scene.

4. MANDATORY 17-PART IMAGE PROMPT CONSTRUCTION ORDER:
   Every generated image prompt MUST be written as a DIRECT IMAGE-GENERATION PROMPT instructing the model to CREATE / GENERATE / RENDER:
   [FORMAT] [BRAND FOUNDATION] [COMPOSITION MANDATE] [CONTENT] [CORE IDEA] [VISUAL METAPHOR] [ART DIRECTION] [HERO VISUAL] [ENVIRONMENT] [MATERIAL] [LIGHTING] [COLOR APPLICATION] [TYPOGRAPHY] [VISIBLE TEXT] [BACKGROUND & ATMOSPHERE] [NEGATIVE RULES]

5. NEGATIVE RULES (BANS DARK BACKGROUNDS & SPLIT-SCREEN BOXES):
   - Prohibit: Dark background, black environment, night scene, dark cinematic lighting, inverted white text on dark background, text half + image half, split screen, two panels, vertical division line, inserted photo box, rectangular picture frame border, collage seam, low-quality rendering, unreadable typography, visual clutter, unrelated random objects, generic stock art, accidental watermarks, distorted text, broken composition.`;

const ART_DIRECTIONS = [
  {
    family: 'ARCHITECTURAL & GRID SYSTEMS',
    metaphor: 'Cascading architectural staircases and converging concrete planes creating dramatic scale contrast.',
    environment: 'Bright sunlit Italian alabaster gallery space with fine architectural blueprint grid lines.',
    material: 'Warm Travertino stone, hand-carved smooth architectural concrete, and matte Venetian alabaster plaster.',
    lighting: 'High-contrast 10 AM natural directional morning sunlight streaming through an overhead glass skylight.',
    blueAccent: 'Cobalt Blue (#1557FF) applied with high-gloss lacquer precision to the single illuminated focal portal lens at the convergence point.',
    background: 'Warm off-white (#FBFBFA) gallery environment with fine blueprint grid lines, structural shadow depth, and subtle paper grain.'
  },
  {
    family: 'EDITORIAL STILL LIFE',
    metaphor: 'Curated arrangement of precision design tools, glass prisms, and tactile paper samples resting on a plaster pedestal.',
    environment: 'Clean editorial sunlit studio tabletop setting.',
    material: 'Flawless 10mm optical quartz crystal glass, 350gsm hot-pressed ivory cotton paper stock, and carved limestone pedestal.',
    lighting: 'Soft diffused morning studio window lighting with gentle, razor-thin contact shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) optical spectral tint refracted precisely inside the focal center of the quartz prism.',
    background: 'Warm tactile off-white (#FBFBFA) paper canvas with subtle organic cotton fiber texture and soft studio window shadows.'
  },
  {
    family: 'SCULPTURAL & KINETIC',
    metaphor: 'A bronze kinetic pendulum suspended in static equilibrium over a carved limestone base.',
    environment: 'Minimalist warm plaster gallery alcove.',
    material: 'Patinated solid bronze wire, raw porous limestone block, and hand-polished mirror chrome.',
    lighting: 'Dramatic 45-degree side spotlight casting razor-sharp geometric shadows across warm ivory plaster walls.',
    blueAccent: 'Cobalt Blue (#1557FF) high-gloss enamel ring marking the central balance pivot point.',
    background: 'Warm ivory plaster alcove with sharp directional shadow projections and subtle stippled surface texture.'
  },
  {
    family: 'SHADOW / LIGHT & ATMOSPHERE',
    metaphor: 'Single sharp beam of warm sunlight cutting across an ivory gallery room to reveal hidden architectural depth.',
    environment: 'Atmospheric sunlit ivory studio pavilion with subtle spatial depth.',
    material: 'Pale travertine stone, powder-coated white matte steel, and translucent frosted acrylic glass.',
    lighting: 'Single tight key sunlight beam creating stark chiaroscuro shadow contrast against warm off-white walls.',
    blueAccent: 'Cobalt Blue (#1557FF) illuminated edge glowing where the light beam refracts through the frosted acrylic barrier.',
    background: 'Warm off-white studio environment with soft architectural shadow depth and natural ambient daylight.'
  },
  {
    family: 'DATA MATRIX & CHUNKING',
    metaphor: '5 modular limestone pedestals arranged in distinct visual chunk groups with translucent glass boundary markers.',
    environment: 'Technical design research laboratory setting on warm ivory epoxy floor.',
    material: 'Porous limestone blocks, crystal optical glass plates, and brushed anodized aluminum.',
    lighting: 'Clean 45-degree directional key daylight with soft omnidirectional fill.',
    blueAccent: 'Cobalt Blue (#1557FF) precision anodized edge highlight on the 5th chunk pedestal boundary.',
    background: 'Technical off-white paper canvas with fine monospaced dot matrix density clusters and margin alignment marks.'
  },
  {
    family: 'OPTICAL / PERSPECTIVE',
    metaphor: 'Forced-perspective corridor of receding archways guiding the viewer toward a single vanishing point.',
    environment: 'Minimalist warm ivory architectural gallery corridor.',
    material: 'Monolithic travertine marble archways and 6mm translucent acrylic panels.',
    lighting: 'Bright symmetrical morning daylight fill with subtle directional rim lighting on arch edges.',
    blueAccent: 'Cobalt Blue (#1557FF) vertical neon edge framing the central vanishing portal.',
    background: 'Warm off-white corridor background with subtle receding perspective grid lines and soft daylight gradient depth.'
  },
  {
    family: 'NEGATIVE SPACE & VOIDS',
    metaphor: 'Interlocking geometric voids in a wall forming a complete conceptual icon through spatial subtraction.',
    environment: 'Architectural facade wall on warm off-white heavy cardstock.',
    material: '350gsm fine-grain ivory cardstock with laser-cut geometric voids.',
    lighting: 'Soft backlit ambient diffusion accentuating precise, clean laser-cut cutout edges.',
    blueAccent: 'Cobalt Blue (#1557FF) solid backplate visible exclusively through the primary focal cutout void.',
    background: 'Warm ivory cardstock texture with natural shadow depth casting from laser-cut void edges.'
  },
  {
    family: 'HUMAN INTERACTION',
    metaphor: 'A designer\'s hand precisely aligning a translucent glass visual filter over an architectural blueprint.',
    environment: 'Warm sunlit tactile design workspace desk.',
    material: 'Natural warm skin tones, 100% thick cotton paper, and optical glass precision filter.',
    lighting: 'Warm natural morning window light illuminating paper grain and skin texture.',
    blueAccent: 'Cobalt Blue (#1557FF) precision alignment crosshair etched onto the optical glass filter.',
    background: 'Tactile off-white cotton paper workspace with subtle blueprint crosshair grid overlay.'
  },
  {
    family: 'ORGANIC FORM & FLOW',
    metaphor: 'Fluid ceramic ribbon sculpting through space, contrasting with rigid geometric framework pins.',
    environment: 'Soft ivory studio backdrop with gentle ambient shadow gradient.',
    material: 'Hand-glazed matte porcelain ceramic ribbon and solid brass framework pins.',
    lighting: 'Soft top-down dome daylight diffusion casting smooth, continuous contact shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) ceramic dip-glaze applied to the primary organic curve zenith.',
    background: 'Warm off-white studio backdrop with smooth ambient lighting gradient and gentle porcelain shadows.'
  },
  {
    family: 'PHOTOGRAPHIC & LETTERPRESS',
    metaphor: 'Macro studio photography of raw editorial paper grain with debossed typographic letterforms.',
    environment: 'Macro studio copy stand in bright overhead daylight.',
    material: '350gsm warm ivory cotton paper stock with deep tactile letterpress impression.',
    lighting: 'Low-angle grazing daylight casting long, dramatic micro-shadows inside debossed letterforms.',
    blueAccent: 'Cobalt Blue (#1557FF) metallic foil stamp on the primary emphasis keyword.',
    background: 'Macro 350gsm warm off-white paper texture with tactile debossed depth and soft grazing light.'
  },
  {
    family: 'SURREAL HORIZON',
    metaphor: 'A floating marble archway opening to reveal a calm open horizon within an indoor gallery room.',
    environment: 'Sunlit museum hall with open ceiling sky portal.',
    material: 'Polished Carrara marble, quiet atmospheric air, and seamless glass horizon plane.',
    lighting: 'Ethereal ambient sky illumination streaming down from the open ceiling portal.',
    blueAccent: 'Cobalt Blue (#1557FF) sharp horizontal line separating interior floor and horizon void.',
    background: 'Warm off-white museum gallery hall with subtle atmospheric sky gradient glowing through portal.'
  },
  {
    family: 'ABSTRACT GEOMETRY & FILTERS',
    metaphor: 'Overlapping geometric glass filters in space resolving multiple visual layers into one clear composite image.',
    environment: 'Clean sunlit ivory studio environment.',
    material: 'Multi-density tint-free optical glass plates and chrome mounting stands.',
    lighting: 'Direct multi-angle studio daylight casting overlapping translucent color shadows across the floor.',
    blueAccent: 'Cobalt Blue (#1557FF) optical glass plate positioned as the final resolving lens.',
    background: 'Clean warm off-white studio background with translucent glass color shadow reflections.'
  },
  {
    family: 'CONCEPTUAL MEASUREMENT',
    metaphor: 'Precision brass calipers measuring the exact focal gap between two structural elements.',
    environment: 'Editorial product design bench in bright natural daylight.',
    material: 'Solid machined brass calipers, pale limestone block, and optical glass lens.',
    lighting: 'Focused technical daylight task beam illuminating metal bevels.',
    blueAccent: 'Cobalt Blue (#1557FF) precision indicator needle pointing to the exact measurement gap.',
    background: 'Warm off-white workbench with fine technical measurement tick marks and task light focus.'
  },
  {
    family: 'MOTION / FROZEN STROBE',
    metaphor: 'Stroboscopic sequence of a falling glass sphere caught in 5 static frozen mid-air stages.',
    environment: 'Bright high-speed photography studio soundstage.',
    material: 'Solid optical glass spheres and warm ivory studio backdrop wall.',
    lighting: 'High-speed microsecond daylight strobe flash freezing motion crisp without blur.',
    blueAccent: 'Cobalt Blue (#1557FF) thin laser streak line trailing the final frozen impact position.',
    background: 'Warm off-white studio backdrop with frozen motion blur paths and subtle directional lighting glow.'
  },
  {
    family: 'ENVIRONMENTAL COURTYARD',
    metaphor: 'Quiet courtyard setting where sunlight creates geometric shadows aligned perfectly with architectural grid floor.',
    environment: 'Open-air Mediterranean minimalist limestone courtyard.',
    material: 'Terracotta tiles, pale limestone walls, and razor-sharp shadow lines.',
    lighting: 'Late afternoon warm sun at 45-degree angle casting long geometric wall shadows.',
    blueAccent: 'Cobalt Blue (#1557FF) glazed ceramic bench positioned as the visual anchor point.',
    background: 'Warm off-white Mediterranean courtyard wall with clean sunlight shadow grid projections.'
  },
  {
    family: 'LIGHT INSTALLATION',
    metaphor: 'Kinetic LED light tubes sculpting dramatic spatial planes over raw plaster walls.',
    environment: 'Sunlit contemporary art installation pavilion.',
    material: 'Diffused white acrylic light tubes and raw troweled ivory plaster wall.',
    lighting: 'Self-illuminating LED light planes blending with ambient morning daylight fill.',
    blueAccent: 'Cobalt Blue (#1557FF) light tube establishing the primary spatial axis.',
    background: 'Raw warm off-white plaster gallery wall illuminated by soft spatial light plane reflections.'
  },
  {
    family: 'CONCEPTUAL PHOTOGRAPHY',
    metaphor: 'High-contrast studio macro photography capturing a single ray of light refracting through a crystal prism.',
    environment: 'Sunlit photography studio setting.',
    material: 'Heavy K9 optical crystal glass prism and warm ivory paper canvas backdrop.',
    lighting: 'Collimated beam of natural daylight refracting into spectral wavelengths.',
    blueAccent: 'Cobalt Blue (#1557FF) isolated spectral wavelength beam projected onto off-white canvas.',
    background: 'Warm off-white photographic studio setting with sharp light ray refraction reflections.'
  },
  {
    family: 'LAYERED MATERIALS',
    metaphor: 'Staggered vertical planes of translucent vellum, frosted glass, and pale slate creating deep spatial translucency.',
    environment: 'Material research laboratory exhibition on warm ivory floor.',
    material: '90gsm natural tracing vellum, 6mm frosted tempered glass, and pale limestone slate.',
    lighting: 'Soft daylight rear backlighting casting layered translucent shadows through vellum.',
    blueAccent: 'Cobalt Blue (#1557FF) polished edge banding on the central glass plate.',
    background: 'Warm off-white exhibition space with backlit translucent material shadow gradients.'
  },
  {
    family: 'ATMOSPHERIC FOG CHAMBER',
    metaphor: 'Minimalist sunlit chamber where a single directional light beam reveals spatial depth and volume.',
    environment: 'Architectural light chamber installation in bright morning light.',
    material: 'Micro-water vapor mist, matte ivory epoxy floor, and brushed aluminum pillars.',
    lighting: 'Volumetric morning daylight shaft cutting through clean mist.',
    blueAccent: 'Cobalt Blue (#1557FF) thin laser line marking the spatial grid floor.',
    background: 'Warm off-white volumetric mist atmosphere with soft directional light beam depth.'
  },
  {
    family: 'CONTEMPORARY INSTALLATION ART',
    metaphor: 'Suspended acrylic geometric frames floating in a sunlit atrium, casting overlapping colored shadows.',
    environment: 'Sunlit museum atrium with warm limestone floor.',
    material: 'Invisible monofilament wire, tinted acrylic geometric frames, and pale polished concrete.',
    lighting: 'Bright natural overhead sunlight creating vivid geometric floor projections.',
    blueAccent: 'Cobalt Blue (#1557FF) acrylic frame suspended precisely at eye level.',
    background: 'Warm off-white concrete atrium floor with geometric acrylic shadow projections.'
  },
  {
    family: 'SCALE CONTRAST',
    metaphor: 'A tiny monolithic pin standing beside a giant illuminated sphere, demonstrating extreme visual hierarchy scale.',
    environment: 'Minimalist sunlit studio soundstage.',
    material: 'Machined anodized solid brass pin and translucent white fiberglass sphere.',
    lighting: 'Soft internal daylight glow with clear directional shadow on warm ivory floor.',
    blueAccent: 'Cobalt Blue (#1557FF) core glowing subtly inside the giant translucent sphere.',
    background: 'Warm off-white studio soundstage with soft ambient illumination halo surrounding the focal sphere.'
  }
];

export function build17PartImagePrompt(topic: DesignTopic, variantSeed?: number): string {
  const seed = variantSeed !== undefined ? Math.abs(variantSeed) : Math.floor(Math.random() * 10000);
  const selectIndex = (topic.id + seed) % ART_DIRECTIONS.length;
  const artDir = ART_DIRECTIONS[selectIndex];
  const headline = topic.title.toUpperCase();
  const templateNum = String(topic.id).padStart(3, '0');

  return `[FORMAT] CREATE / RENDER a single cohesive 4:5 vertical editorial publication artwork (1080 x 1350 pixels resolution).
[BRAND FOUNDATION - TZINR FIRST] Mandatory warm off-white / ivory environment background (#FBFBFA), Deep Navy structural typography (#0A0A10), Cobalt Blue (#1557FF) strategic restrained accent. ABSOLUTELY NO DARK BACKGROUNDS, NO BLACK ENVIRONMENTS, NO NIGHT SCENES, NO alternate color themes.
[COMPOSITION MANDATE] ONE INTEGRATED EDITORIAL ARTWORK WITH INTEGRATED TYPOGRAPHY. DO NOT CREATE A SPLIT-SCREEN OR TWO SEPARATE PANELS. DO NOT INSERT AN IMAGE BOX. The warm off-white environment (${artDir.environment}), daylighting, and soft ambient shadows span seamlessly across the ENTIRE 4:5 frame from left edge to right edge.
[CONTENT] LAYER B: Left column features clean Deep Navy typography printed directly onto the warm off-white canvas: Headline '${headline}' (Bebas Neue uppercase condensed in Deep Navy #0A0A10), Subheading in Manrope Semibold with Cobalt Blue accent, concise explanation in Manrope Regular, category metadata in IBM Plex Mono. ~36px safe margins.
[CORE IDEA] Visualizing ${topic.title}: Human/behavioral UX principle expressed through bespoke physical visual metaphor.
[VISUAL METAPHOR] ${artDir.metaphor}
[ART DIRECTION] LAYER C: ${artDir.family} (Variant ${seed % 100})
[HERO VISUAL] Right 50% features the concept hero artwork: ${artDir.metaphor}, integrated into the warm off-white scene, casting realistic soft light reflections and directional shadows extending across the surrounding floor and wall canvas.
[ENVIRONMENT] ${artDir.environment}
[MATERIAL] ${artDir.material}
[LIGHTING] ${artDir.lighting}
[COLOR APPLICATION] Primary warm off-white environment foundation (#FBFBFA), Deep Navy structural text (#0A0A10), ${artDir.blueAccent}
[TYPOGRAPHY] Headlines in Bebas Neue uppercase condensed (Deep Navy #0A0A10); Subheadings & body in Manrope; Metadata & numbers in IBM Plex Mono; Brand name in Manrope ExtraBold.
[VISIBLE TEXT] Top-left 'TZINR' (Manrope ExtraBold) + 'UX FOUNDATIONS ${templateNum}' (IBM Plex Mono); Top-right '${templateNum} / 100' (IBM Plex Mono); Left column Headline '${headline}' (Bebas Neue); Subheading 'Guiding attention through scale' with Cobalt Blue keyword accent (Manrope Semibold); Bottom-left 'CONCEPT: ${headline}' (IBM Plex Mono).
[BACKGROUND & ATMOSPHERE] ${artDir.background} within the light TZINR editorial world.
[NEGATIVE RULES] Dark background, black environment, night scene, dark cinematic lighting, inverted white text on dark background, text half + image half, split screen, two panels, vertical division line, inserted photo box, rectangular picture frame border, collage seam, low-quality rendering, unreadable typography, visual clutter, unrelated random objects, generic stock art, accidental watermarks, distorted text, broken composition.`;
}

export function generateLocalContentMock(topic: DesignTopic, format: 'single' | 'carousel'): DesignContentResult {
  const headline = topic.title.toUpperCase();
  const baseSeed = Math.floor(Math.random() * 10000);
  const imagePromptText = build17PartImagePrompt(topic, baseSeed);

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
          imagePrompt: build17PartImagePrompt(topic, baseSeed),
          imageText: { headline: headline, supporting: `Slide 1 / 5` }
        },
        {
          heading: `SCALE & CONTRAST`,
          description: `Primary anchors require dramatic typographic size contrast.`,
          imagePrompt: build17PartImagePrompt(topic, baseSeed + 1),
          imageText: { headline: `SCALE & CONTRAST`, supporting: `Slide 2 / 5` }
        },
        {
          heading: `FOCAL ISOLATION`,
          description: `Use Cobalt Blue accents only for key directional paths.`,
          imagePrompt: build17PartImagePrompt(topic, baseSeed + 2),
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
