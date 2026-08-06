import { GoogleGenAI } from '@google/genai';
import { UgcStudioInput, UgcStudioResult } from '../types';

const SYSTEM_PROMPT = `You are DIRECTOR.AI's AI UGC Studio Director.
Your purpose is to generate authentic User Generated Content (UGC) ad ideas that feel natural, trustworthy, and engaging rather than promotional.

Before generating content, you must research and identify:
- Current market trends
- Customer problems
- Emotional triggers
- Buying motivations

Never repeat previous concepts.

Generate captions for LinkedIn, Instagram, Facebook, and Twitter/X. Each platform should have different writing styles. Do NOT copy the same caption.

Generate a cinematic AI video prompt suitable for Veo 3, Runway, Pika, Kling, or Sora.
Prompt must include Scene, Camera Movement, Lighting, Environment, Subject, Emotion, Color Palette, Composition, Transitions, Lens, Frame Rate, Duration, Negative Prompt.`;

export function generateLocalUgcMock(input: UgcStudioInput): UgcStudioResult {
  const prod = input.isRandom ? "Random Trending Concept" : (input.product || "Featured Product");
  
  return {
    dailySuggestedTopic: `Why ${prod} is taking over TikTok`,
    hook: `Stop scrolling if you struggle with [Pain Point]!`,
    problem: `Most people waste hours dealing with inefficient workflows.`,
    story: `I tested this for a week and couldn't believe the difference it made.`,
    solution: `${prod} completely automates the process and gives you back your time.`,
    callToAction: `Tap the link in my bio to get yours before it sells out!`,
    captions: {
      linkedin: `I've been experimenting with ${prod} recently to optimize my daily workflow. The results have been surprisingly profound.\n\nEfficiency isn't just about doing more; it's about doing what matters. How do you optimize your deep work sessions? #Productivity #Workflow #Tech`,
      instagram: `Stop what you're doing! 🛑 I found the ultimate hack for your daily routine. ${prod} changed everything for me. Link in bio to grab yours! ✨ #DailyHack #MustHave`,
      facebook: `If you're tired of dealing with the same old problems every day, you need to see this. We've been using ${prod} and it's a game-changer. Click the link below to check it out!`,
      twitter: `Just hit a new productivity record using ${prod}. If you aren't automating this yet, you're falling behind. 🚀 #Tech #ProductivityHack`
    },
    seoHashtags: ["#UGC", "#TechTrend", "#ProductivityHack", "#MustHave", "#DailyEssentials", "#TikTokMadeMeBuyIt", "#ViralProduct", "#LifeHack", "#SmartLiving", "#CreatorTips", "#GrowthHack", "#WorkSmarter", "#TechGadget", "#RoutineRefresh", "#GameChanger", "#Efficiency", "#SetupTour", "#TechReview", "#Unboxing", "#Aesthetic"],
    primaryKeywords: [prod, "productivity tool", "daily routine hack"],
    secondaryKeywords: ["how to save time", "best tools for creators"],
    longTailKeywords: [`is ${prod} worth it`, `honest review of ${prod}`],
    videoPrompt: {
      scene: `A cozy, modern home office setup with natural sunlight filtering through a window.`,
      cameraMovement: `Slow tracking shot pushing in on the subject.`,
      lighting: `Warm golden hour daylight, soft shadows.`,
      environment: `Clean desk, minimalist aesthetic, glowing screen in the background.`,
      subject: `A relatable 20-something creator holding ${prod} and looking genuinely amazed.`,
      emotion: `Shock, delight, realization.`,
      colorPalette: `Warm neutrals, sage green, and soft amber.`,
      composition: `Rule of thirds, subject framed slightly to the right.`,
      transitions: `None, single continuous take.`,
      lens: `35mm prime lens.`,
      frameRate: `24fps.`,
      duration: `10 seconds.`,
      negativePrompt: `Poor lighting, messy room, artificial studio lights, stiff acting, robotic, low resolution.`
    },
    videoHook: `You won't believe what this little thing can do...`,
    voiceoverScript: `I used to waste 3 hours a day until I found this. It's called ${prod}, and it completely changed how I work. Just look at this...`,
    shotList: [
      `Wide shot of creator looking frustrated at desk.`,
      `Close-up of ${prod} being activated.`,
      `Macro shot of the product texture/interface.`,
      `Creator smiling and pointing to the CTA.`
    ],
    bRollIdeas: [
      `Coffee steaming next to the product.`,
      `Typing quickly on a keyboard.`,
      `Sunset lighting changing over the room.`
    ],
    thumbnailPrompt: `Close-up shot of creator holding ${prod} with a shocked expression. Bright lighting, high contrast.`,
    generatedAt: new Date().toISOString()
  };
}

export const generateUgcContent = async (input: UgcStudioInput): Promise<UgcStudioResult> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("No Gemini API Key found. Falling back to local data.");
      return generateLocalUgcMock(input);
    }

    const ai = new GoogleGenAI({ apiKey });

    const schemaObj = {
      type: 'OBJECT',
      properties: {
        dailySuggestedTopic: { type: 'STRING' },
        hook: { type: 'STRING' },
        problem: { type: 'STRING' },
        story: { type: 'STRING' },
        solution: { type: 'STRING' },
        callToAction: { type: 'STRING' },
        captions: {
          type: 'OBJECT',
          properties: {
            linkedin: { type: 'STRING' },
            instagram: { type: 'STRING' },
            facebook: { type: 'STRING' },
            twitter: { type: 'STRING' }
          },
          required: ["linkedin", "instagram", "facebook", "twitter"]
        },
        seoHashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Exactly 20 hashtags' },
        primaryKeywords: { type: 'ARRAY', items: { type: 'STRING' } },
        secondaryKeywords: { type: 'ARRAY', items: { type: 'STRING' } },
        longTailKeywords: { type: 'ARRAY', items: { type: 'STRING' } },
        videoPrompt: {
          type: 'OBJECT',
          properties: {
            scene: { type: 'STRING' },
            cameraMovement: { type: 'STRING' },
            lighting: { type: 'STRING' },
            environment: { type: 'STRING' },
            subject: { type: 'STRING' },
            emotion: { type: 'STRING' },
            colorPalette: { type: 'STRING' },
            composition: { type: 'STRING' },
            transitions: { type: 'STRING' },
            lens: { type: 'STRING' },
            frameRate: { type: 'STRING' },
            duration: { type: 'STRING' },
            negativePrompt: { type: 'STRING' }
          },
          required: ["scene", "cameraMovement", "lighting", "environment", "subject", "emotion", "colorPalette", "composition", "transitions", "lens", "frameRate", "duration", "negativePrompt"]
        },
        videoHook: { type: 'STRING' },
        voiceoverScript: { type: 'STRING' },
        shotList: { type: 'ARRAY', items: { type: 'STRING' } },
        bRollIdeas: { type: 'ARRAY', items: { type: 'STRING' } },
        thumbnailPrompt: { type: 'STRING' },
        generatedAt: { type: 'STRING' }
      },
      required: ["dailySuggestedTopic", "hook", "problem", "story", "solution", "callToAction", "captions", "seoHashtags", "primaryKeywords", "secondaryKeywords", "longTailKeywords", "videoPrompt", "videoHook", "voiceoverScript", "shotList", "bRollIdeas", "thumbnailPrompt", "generatedAt"]
    };

    let promptText = "";
    if (input.isRandom) {
      const seed = Math.random().toString(36).substring(2, 9);
      promptText = `Generate a random highly viral UGC concept based on current market trends. [Seed: ${seed}]`;
    } else {
      promptText = `
Industry: ${input.industry}
Product: ${input.product}
Service: ${input.service}
Brand: ${input.brand}
Website URL: ${input.websiteUrl || 'None'}
Target Audience: ${input.targetAudience}
Platform: ${input.platform}
Tone: ${input.tone}
Goal: ${input.goal}

Generate the complete UGC Studio Result for this exact product configuration.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: schemaObj as any,
        temperature: 0.8,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as UgcStudioResult;
    }
    throw new Error("No text in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return generateLocalUgcMock(input);
  }
};
