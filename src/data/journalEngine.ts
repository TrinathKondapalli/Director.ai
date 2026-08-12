import { GoogleGenAI } from '@google/genai';

const STICKY_NOTE_COLORS = [
  'soft butter yellow',
  'warm cream',
  'blush pink',
  'soft pastel blue',
  'sage green',
  'lavender',
  'soft peach',
];

function getRandomStickyColor(): string {
  return STICKY_NOTE_COLORS[Math.floor(Math.random() * STICKY_NOTE_COLORS.length)];
}

const JOURNAL_SYSTEM_PROMPT = `You are an image-prompt generator for the "My Journal" feature.

Your ONLY job is to take the user's exact text and wrap it inside the fixed My Journal design template as a ready-to-copy image-generation prompt.

CRITICAL TEXT RULE:
- The user's input is the ONLY readable text that should appear in the generated image.
- Preserve the user's text EXACTLY as provided.
- Do NOT correct spelling, grammar, or punctuation.
- Do NOT rewrite, paraphrase, summarize, interpret, add words, or remove words.
- Do NOT add a title, subtitle, description, quote, label, hashtag, number, watermark, or any text that is not in the user's original input.
- The AI's job is ONLY to design around the user's exact sentence.

FIXED DESIGN TEMPLATE (apply to every prompt):

COMPOSITION:
- Square 1:1 format
- Warm off-white textured journal-paper background with subtle paper grain
- One large, slightly imperfect rectangular sticky note placed near the center
- Sticky note has subtle paper texture, slightly imperfect hand-torn edges, and a natural soft shadow beneath it
- The sticky note appears naturally placed, as if stuck onto the journal page

TYPOGRAPHY:
- Bold, expressive, handwritten-style typography on the sticky note
- High readability - the text must be clearly legible
- Text is the user's exact input, nothing else
- Natural letter spacing, as if written by hand with a thick marker or brush pen
- Text is centered on the sticky note with comfortable margins

DECORATIONS:
- Minimal hand-drawn journal decorations scattered around the sticky note on the journal-paper background
- Use: small stars, arrows, circles, pencil marks, simple doodles, tiny hearts, underlines, and subtle decorative elements
- Doodles should feel personal, creative, youthful, handmade
- Do NOT overload with decorations - keep it minimal and tasteful
- Decorations are on the background paper, NOT on the sticky note itself

AESTHETIC:
- Personal, creative, youthful, handmade, premium journal aesthetic
- The overall feel should be like a beautifully curated personal journal or planner page
- Warm, inviting, and visually satisfying

CONSISTENCY RULES (never change these):
- Background style
- Typography style (handwritten, bold, expressive)
- Text placement (centered on sticky note)
- Sticky-note shape (slightly imperfect rectangle)
- Sticky-note size (large, near center)
- Shadow style (natural, soft)
- Doodle style (minimal, hand-drawn)
- Doodle placement style (around the sticky note, on the background)
- Overall composition and visual identity

WHAT CHANGES PER POST:
- ONLY the sticky-note color changes
- The sticky-note color will be provided in the user's message

NEGATIVE (always exclude):
Multiple sticky notes, digital/clean design, computer-generated typography, stock photo, 3D render, glossy surface, neon colors, dark background, complex illustration, brand logos, watermarks, additional text beyond the user's input, titles, subtitles, hashtags, labels, descriptions.

OUTPUT FORMAT:
Return ONLY the image-generation prompt. Do not explain. Do not add commentary. Do not rewrite the user's text outside the prompt.`;

export const generateJournalPrompt = async (userIdea: string): Promise<string> => {
  const stickyColor = getRandomStickyColor();

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API Key missing.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const userMessage = `STICKY-NOTE COLOR FOR THIS POST: ${stickyColor}

USER'S EXACT TEXT (do NOT modify this in any way):
"${userIdea}"

Generate the complete image-generation prompt using the fixed My Journal design template. The ONLY readable text in the image must be the user's exact text above. Do not add any other text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: JOURNAL_SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 1500,
      }
    });

    const text = response?.text?.trim();
    if (!text) {
      throw new Error("Empty response from AI.");
    }
    return text;
  } catch (err) {
    console.warn('AI generation failed, using local fallback:', err);
    return generateLocalJournalPrompt(userIdea, stickyColor);
  }
};

function generateLocalJournalPrompt(userIdea: string, stickyColor: string): string {
  return `Create a square 1:1 composition image of a personal journal page.

BACKGROUND:
Warm off-white textured journal-paper background with visible subtle paper grain and a soft, natural warmth. The paper should feel like a real physical journal page - not a flat digital canvas.

STICKY NOTE:
One large, slightly imperfect rectangular sticky note placed near the center of the journal page. The sticky note color is ${stickyColor}. The sticky note has subtle paper texture, slightly imperfect hand-torn edges, and a natural soft shadow beneath it, as if it was physically placed on the journal paper. The sticky note should feel real and tactile.

TEXT ON THE STICKY NOTE:
Display the following text EXACTLY as written, with no changes, no corrections, no additions, and no omissions:

"${userIdea}"

Use bold, expressive, handwritten-style typography. The text should look like it was written by hand with a thick marker or brush pen. High readability. Text is centered on the sticky note with comfortable margins. Natural letter spacing.

IMPORTANT: This is the ONLY text that should appear anywhere in the entire image. Do NOT add any title, subtitle, label, hashtag, watermark, date, number, quote attribution, or any other text.

JOURNAL DECORATIONS:
Minimal hand-drawn journal decorations scattered around the sticky note on the background journal paper (NOT on the sticky note itself). Include: small hand-drawn stars, a few simple arrows, small circles, light pencil marks, tiny doodles, and subtle decorative elements. The decorations should feel personal, creative, youthful, and handmade - like someone's real journal. Keep decorations minimal and tasteful, do not overload.

AESTHETIC:
Personal, creative, youthful, handmade, premium journal aesthetic. The overall feel should be like a beautifully curated page from a personal journal or planner. Warm, inviting, and visually satisfying.

LIGHTING:
Soft, natural, warm lighting. No harsh shadows. The sticky note has a gentle, natural shadow on the journal paper beneath it.

NEGATIVE PROMPT:
Do NOT include: multiple sticky notes, digital/clean design, computer-generated typography, stock photo look, 3D render, glossy surface, neon colors, dark background, complex illustrations, brand logos, watermarks, any additional text beyond the user's exact input, titles, subtitles, hashtags, labels, descriptions, dates, numbers not in the original text.`;
}
