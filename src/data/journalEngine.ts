import { GoogleGenAI } from '@google/genai';

const JOURNAL_SYSTEM_PROMPT = `You are a Senior Art Director and Visual Designer for TZINR, a premium creative design publication and studio.

Your ONLY job is to take a user's raw content idea and transform it into a detailed, ready-to-paste image-generation prompt that maintains the TZINR brand identity.

FIXED TZINR DESIGN SYSTEM (apply to EVERY prompt you generate):

BRAND IDENTITY:
- Brand: TZINR
- Style: Premium editorial design publication
- The word "TZINR" must appear visibly in the generated image typography

COLOR SYSTEM:
- Primary background: White / Off-white with subtle texture
- Typography: Black / Deep Navy (#0A0A14)
- Accent: Blue (#1557FF) used selectively on ONE keyword or element
- DO NOT use purple, pink, orange, green, yellow, or any other accent colors

TYPOGRAPHY:
- Strong editorial sans-serif typeface
- Dramatic scale contrast between headline and supporting text
- Clean, confident, professional

BACKGROUND & TEXTURE:
- Never use a completely empty/flat white background
- Always include: warm off-white paper texture, fine blue/gray grid lines, subtle dot pattern, soft atmospheric glow, architectural shadows, geometric framing, or editorial guide lines
- Create three depth levels: 1. The Hook (Headline + Hero), 2. The Explanation (Supporting copy), 3. The Discovery (Metadata, grid, signature)

COMPOSITION:
- Format: 4:5 vertical (social media optimized)
- Reserve clean negative space in the upper-left area for TZINR branding
- Balance: 40% visual storytelling + 30% typography/message + 20% editorial information + 10% TZINR identity
- NOT an empty minimalist poster
- NOT a cluttered infographic
- Find the perfect editorial middle ground

REQUIRED ELEMENTS IN EVERY IMAGE:
1. TZINR brand text (above category metadata)
2. Category label (e.g., TZINR / INSIGHTS, TZINR / PERSPECTIVES)
3. Strong primary headline derived from the user's idea
4. A conceptual visual metaphor that represents the idea
5. Short supporting explanation text
6. Small editorial metadata (numbering, date, category tags)
7. Background texture/grid (never plain white)

EDITORIAL MICRO-DETAILS:
- Include meaningful details: numbering (e.g., 001), category tags, subtle grid lines
- Do NOT invent meaningless coordinates or random numbers

NEGATIVE (always exclude):
Beautiful empty poster, empty white background, flat canvas, generic infographic, dashboard, two-column cards, UI mockup, random decoration, purple, pink, orange, green, yellow, generic AI artwork, cheap 3D, excessive text, fake coordinates, meaningless numbers, visual clutter, stock photo look.

INSTRUCTIONS:
1. Read the user's idea carefully
2. Extract the core message
3. Invent a powerful visual metaphor that represents the idea
4. Write a compelling headline
5. Generate the complete 17-part image prompt using the format below

OUTPUT FORMAT (return ONLY this, nothing else):

[FORMAT] Premium editorial social media graphic, 4:5 vertical.
[SAFE AREA] Reserve clean negative space in the upper-left area for the official TZINR logo overlay.
[CREATIVE CONCEPT] ...
[CORE MESSAGE] ...
[VISUAL METAPHOR] ...
[BACKGROUND] ...
[ATMOSPHERE] ...
[COLOR PALETTE] ...
[HERO VISUAL] ...
[TYPOGRAPHY] ...
[EXACT VISIBLE TEXT] "TZINR - [CATEGORY] - [HEADLINE] - [CORE IDEA] - [SHORT EXPLANATION]"
[COMPOSITION] ...
[VISUAL HIERARCHY] ...
[DEPTH / LIGHTING] ...
[EDITORIAL DETAILS] ...
[TZINR BRANDING] The exact word "TZINR" must be generated in the typography, preferably above the metadata.
[NEGATIVE] beautiful empty poster, empty white background, flat canvas, generic infographic, dashboard, two-column cards, UI mockup, random decoration, purple, pink, orange, green, yellow, generic AI artwork, cheap 3D, excessive text, fake coordinates, meaningless numbers, visual clutter.`;

export const generateJournalPrompt = async (userIdea: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API Key missing.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `The user's idea/content for this post is:\n\n"${userIdea}"\n\nTransform this into a complete, detailed image-generation prompt following the TZINR design system. Return ONLY the 17-part prompt, nothing else.`,
      config: {
        systemInstruction: JOURNAL_SYSTEM_PROMPT,
        temperature: 0.85,
        maxOutputTokens: 2048,
      }
    });

    const text = response?.text?.trim();
    if (!text) {
      throw new Error("Empty response from AI.");
    }
    return text;
  } catch (err) {
    console.warn('AI generation failed, using local fallback:', err);
    return generateLocalJournalPrompt(userIdea);
  }
};

function generateLocalJournalPrompt(userIdea: string): string {
  const headline = userIdea.length > 60 ? userIdea.substring(0, 57) + '...' : userIdea;
  const headlineUpper = headline.toUpperCase();

  return `[FORMAT] Premium editorial social media graphic, 4:5 vertical.
[SAFE AREA] Reserve clean negative space in the upper-left area for the official TZINR logo overlay. Do not place critical typography, objects, or visual elements in this area.
[CREATIVE CONCEPT] A thought-provoking editorial design that communicates the idea: "${userIdea}" through a powerful visual metaphor combined with strong typographic hierarchy.
[CORE MESSAGE] ${userIdea}
[VISUAL METAPHOR] An abstract architectural or geometric composition that symbolically represents the core idea - using intersecting planes, structural forms, or organic shapes that create visual tension and resolution.
[BACKGROUND] Warm off-white textured paper surface with a fine blue-gray architectural grid overlay. Subtle dot pattern in the margins. Soft atmospheric blue glow emanating from behind the hero visual element. Faint editorial guide lines visible at the edges.
[ATMOSPHERE] Premium editorial publication feel. Confident, intellectual, and visually sophisticated. The design should feel like a page from a high-end design journal.
[COLOR PALETTE] Primary: Off-white (#F5F3EF) background. Typography: Deep Navy (#0A0A14). Accent: Blue (#1557FF) used on one key word only. No other colors.
[HERO VISUAL] A striking conceptual object or architectural form rendered in deep navy and blue accent tones, positioned as the focal point of the composition. The visual should feel intentional and symbolic, not decorative.
[TYPOGRAPHY] Strong editorial sans-serif. Main headline at dramatic large scale. Supporting text at refined smaller scale. Clean font weight contrast between bold headlines and light body text.
[EXACT VISIBLE TEXT] "TZINR - INSIGHTS 001 - ${headlineUpper} - A TZINR PERSPECTIVE"
[COMPOSITION] Asymmetric editorial layout with the hero visual occupying 40% of the canvas. Headline positioned with confident negative space. Supporting text and metadata arranged in a clean typographic hierarchy below. TZINR branding above category metadata at the top.
[VISUAL HIERARCHY] 1. Hero visual + Main headline (immediate attention), 2. Supporting explanation text (understanding), 3. Editorial metadata + TZINR signature (brand recognition and depth).
[DEPTH / LIGHTING] Three-layer depth: foreground typography with subtle shadow, mid-ground hero visual with soft blue atmospheric glow, background texture with fine grid. Soft directional light from upper-left creating gentle shadows on dimensional elements.
[EDITORIAL DETAILS] Include: "INSIGHTS 001" category label, "DESIGN / PERSPECTIVE / IMPACT" tags, subtle numbered grid markers at margins, fine horizontal rule separating headline from body text, small "Read more at tzinr.com" footer text.
[TZINR BRANDING] The exact word "TZINR" must be generated in the typography, placed clearly above the category metadata "INSIGHTS 001" at the top of the content section. Use deep navy editorial sans-serif, smaller than the main headline but clearly visible and recognizable.
[NEGATIVE] beautiful empty poster, empty white background, flat canvas, generic infographic, dashboard, two-column cards, UI mockup, random decoration, purple, pink, orange, green, yellow, generic AI artwork, cheap 3D, excessive text, fake coordinates, meaningless numbers, visual clutter, stock photo look.`;
}
