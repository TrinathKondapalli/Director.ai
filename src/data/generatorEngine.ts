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

CAPTIONS REQUIREMENTS:
Generate highly structured captions for LinkedIn, Instagram, Facebook, Twitter/X, and YouTube.
Instead of a single string, you MUST return a structured object for each platform.
- LinkedIn: { hook, context, mainInsight, keyTakeaways, cta, hashtags }
- Instagram: { hook, story, lesson, cta, hashtags }
- Facebook: { opening, problem, advice, example, question, hashtags }
- Twitter/X: { singleTweet, threadVersion (array of strings), hashtags }
- YouTube: { seoTitle, description, whatYouWillLearn, chapters, cta, keywords, hashtags }

VIDEO SCRIPT & SHOT LIST REQUIREMENTS:
Generate a structured timeline for the video script and a detailed shot list broken down by scene number.

VIDEO PROMPT REQUIREMENTS:
Generate a cinematic AI video prompt suitable for modern models (Veo 3, Runway Gen-4, Pika, Kling, Sora).
The prompt should feel like it was written by a professional film director.
CRITICAL: Every generated video MUST be optimized for exactly 10 seconds. Never generate 30 sec, 45 sec, 60 sec, or longer.`;

export function generateLocalUgcMock(input: UgcStudioInput): UgcStudioResult {
  const prod = input.isRandom ? "Random Trending Concept" : (input.product || "Featured Product");
  
  return {
    originalInput: input,
    oneLineSummary: `Authentic UGC advertisement targeting busy professionals who struggle with productivity.`,
    dailySuggestedTopic: `Why ${prod} is taking over TikTok`,
    hook: `Stop scrolling if you struggle with [Pain Point]!`,
    problem: `Most people waste hours dealing with inefficient workflows.`,
    story: `I tested this for a week and couldn't believe the difference it made.`,
    solution: `${prod} completely automates the process and gives you back your time.`,
    callToAction: `Tap the link in my bio to get yours before it sells out!`,
    captions: {
      linkedin: {
        hook: `As professionals, we are constantly seeking ways to optimize our daily workflows.`,
        context: `I recently implemented ${prod} into my system and the results were profound.`,
        mainInsight: `Efficiency isn't about working harder—it's about working smarter.`,
        keyTakeaways: ["Automate repetitive tasks", "Focus on deep work", "Eliminate digital clutter"],
        cta: `What are your top productivity strategies?`,
        hashtags: ["#ThoughtLeadership", "#Productivity", "#Workflow"]
      },
      instagram: {
        hook: `Stop what you're doing right now! 🛑`,
        story: `I finally found the ultimate hack for your daily routine. ${prod} literally changed everything for me.`,
        lesson: `You don't need more time, you need better systems.`,
        cta: `Link in bio to grab yours! ✨👇`,
        hashtags: ["#DailyHack", "#MustHave", "#Productivity"]
      },
      facebook: {
        opening: `Hey everyone!`,
        problem: `If you're tired of dealing with the same frustrating problems every single day, you need to see this.`,
        advice: `We've been using ${prod} in our community and it's an absolute game-changer.`,
        example: `For example, it saved us 3 hours just yesterday.`,
        question: `What's your biggest time-waster right now?`,
        hashtags: ["#GameChanger", "#CommunityTips"]
      },
      twitter: {
        singleTweet: `Hit a new productivity record today using ${prod}. If you aren't automating this yet, you're falling behind. Work smarter, not harder. 🚀`,
        threadVersion: [
          `Most people waste hours dealing with inefficient workflows. Here is how I fixed mine with ${prod}. 🧵`,
          `Problem: I was spending 3 hours a day on manual tasks.`,
          `Solution: ${prod} automates the entire process in one click.`,
          `The takeaway: You don't need more hours in the day, you just need better tools.`
        ],
        hashtags: ["#ProductivityHack", "#WorkSmarter"]
      },
      youtube: {
        seoTitle: `How I Fixed My Workflow using ${prod} (Save 3 Hours a Day)`,
        description: `In this video, I reveal how I completely transformed my daily routine using the ultimate productivity tool.`,
        whatYouWillLearn: ["How to set up the tool", "My daily routine", "Advanced workflow hacks"],
        chapters: ["0:00 Intro", "1:20 The Problem", "3:45 The Solution"],
        cta: `Don't forget to like and subscribe! Link in description.`,
        keywords: ["productivity", "workflow tutorial", "time management"],
        hashtags: ["#Productivity", "#Tutorial", "#Workflow"]
      }
    },
    seoHashtags: ["#UGC", "#TechTrend", "#ProductivityHack", "#MustHave", "#DailyEssentials", "#TikTokMadeMeBuyIt", "#ViralProduct", "#LifeHack", "#SmartLiving", "#CreatorTips", "#GrowthHack", "#WorkSmarter", "#TechGadget", "#RoutineRefresh", "#GameChanger", "#Efficiency", "#SetupTour", "#TechReview", "#Unboxing", "#Aesthetic"],
    primaryKeywords: [prod, "productivity tool", "daily routine hack"],
    secondaryKeywords: ["how to save time", "best tools for creators"],
    longTailKeywords: [`is ${prod} worth it`, `honest review of ${prod}`],
    videoPrompt: {
      videoConcept: "A fast-paced, high-energy UGC review showing a real person solving a common pain point.",
      hook: "Extreme close-up of a frustrated expression immediately shifting to relief.",
      sceneObjective: "Demonstrate the immediate value of the product within the first 3 seconds.",
      sceneDescription: "A modern, sunlit home office desk cluttered with papers, transitioning to a clean, organized workspace.",
      characterDescription: "Relatable 20-something creator.",
      characterAppearance: "Casual, modern, approachable, messy hair initially.",
      characterClothing: "Neutral-toned oversized hoodie.",
      characterExpressions: "Frustration turning into genuine shock and delight.",
      characterEmotions: "Overwhelmed, relieved, excited.",
      characterActions: "Rubbing temples, then smiling and pointing to the product.",
      cameraAngle: "Eye-level POV.",
      cameraMovement: "Fast push-in followed by a smooth handheld pan.",
      cameraLens: "24mm wide angle.",
      cameraDistance: "Medium close-up.",
      framing: "Subject centered, product held prominently in the foreground.",
      lighting: "Soft natural window light, rim light from a desk lamp.",
      environment: "Home office.",
      background: "Slightly out of focus bookshelf and glowing monitor.",
      props: "Coffee mug, notebook, the product.",
      colorPalette: "Warm amber, crisp white, deep greens.",
      composition: "Rule of thirds leading lines to the product.",
      cinematicStyle: "Documentary vlog style.",
      visualStyle: "Bright, high contrast, sharp.",
      transition: "Quick whip pan.",
      motionDetails: "Natural human motion, slight handheld camera shake.",
      videoQuality: "8K UHD.",
      renderingStyle: "Photorealistic.",
      aspectRatio: "9:16 vertical.",
      frameRate: "60fps.",
      duration: "10 seconds.",
      voiceoverScript: `I used to waste 3 hours a day until I found this. It's called ${prod}, and it completely changed how I work. Just look at this!`,
      voiceStyle: "Energetic, authentic, conversational.",
      voiceGender: "Female.",
      voiceEmotion: "Excited.",
      voiceSpeed: "Fast-paced.",
      accent: "Neutral American.",
      dialogue: "None.",
      backgroundMusic: "Upbeat Lo-Fi hip hop.",
      soundEffects: "Whoosh transition, subtle keyboard typing.",
      ambientSounds: "Faint room tone.",
      negativePrompt: "Poor lighting, messy room, artificial studio lights, stiff acting, robotic, low resolution, longer than 10 seconds."
    },
    videoHook: `You won't believe what this little thing can do...`,
    voiceoverScript: `I used to waste 3 hours a day until I found this. It's called ${prod}, and it completely changed how I work. Just look at this...`,
    videoScriptTimeline: [
      { time: "Second 1-2", action: "Creator looks exhausted at desk.", audio: "I used to waste 3 hours a day..." },
      { time: "Second 3-5", action: "Creator activates product.", audio: "until I found this." },
      { time: "Second 6-8", action: "Time-lapse of getting work done.", audio: "It completely changed how I work." },
      { time: "Second 9-10", action: "Creator points at link.", audio: "Link in bio to get yours!" }
    ],
    shotList: [
      { sceneNumber: "Scene 1", description: "Creator looking frustrated.", camera: "Medium Close-up", movement: "Push in", voice: "I used to waste...", sfx: "Sigh", transition: "Cut" },
      { sceneNumber: "Scene 2", description: "Product being activated.", camera: "Macro", movement: "Static", voice: "until I found this.", sfx: "Click", transition: "Whip pan" },
      { sceneNumber: "Scene 3", description: "Fast workflow.", camera: "Wide", movement: "Time-lapse", voice: "It completely changed...", sfx: "Keyboard typing", transition: "Cut" },
      { sceneNumber: "Scene 4", description: "Smiling creator.", camera: "Close-up", movement: "Handheld", voice: "Link in bio!", sfx: "Pop", transition: "None" }
    ],
    bRollIdeas: [
      `Sunlight hitting the product on a desk.`,
      `Time-lapse of getting work done.`,
      `Extreme close-up of the brand logo.`
    ],
    thumbnailPrompt: `Creator making a shocked face pointing at ${prod} with a bold colorful border.`,
    thumbnailStyle: `High contrast, bold typography, YouTube click-through optimized.`,
    generatedAt: new Date().toISOString()
  };
}

export const generateUgcContent = async (input: UgcStudioInput): Promise<UgcStudioResult> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("No Gemini API Key found. Falling back to mock data.");
      return generateLocalUgcMock(input);
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const schemaObj = {
      type: 'OBJECT',
      properties: {
        oneLineSummary: { type: 'STRING' },
        dailySuggestedTopic: { type: 'STRING' },
        hook: { type: 'STRING' },
        problem: { type: 'STRING' },
        story: { type: 'STRING' },
        solution: { type: 'STRING' },
        callToAction: { type: 'STRING' },
        captions: {
          type: 'OBJECT',
          properties: {
            linkedin: { 
              type: 'OBJECT', 
              properties: { 
                hook: { type: 'STRING' }, context: { type: 'STRING' }, mainInsight: { type: 'STRING' }, 
                keyTakeaways: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } 
              },
              required: ["hook", "context", "mainInsight", "keyTakeaways", "cta", "hashtags"]
            },
            instagram: { 
              type: 'OBJECT', 
              properties: { hook: { type: 'STRING' }, story: { type: 'STRING' }, lesson: { type: 'STRING' }, cta: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["hook", "story", "lesson", "cta", "hashtags"]
            },
            facebook: { 
              type: 'OBJECT', 
              properties: { opening: { type: 'STRING' }, problem: { type: 'STRING' }, advice: { type: 'STRING' }, example: { type: 'STRING' }, question: { type: 'STRING' }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["opening", "problem", "advice", "example", "question", "hashtags"]
            },
            twitter: { 
              type: 'OBJECT', 
              properties: { singleTweet: { type: 'STRING' }, threadVersion: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["singleTweet", "threadVersion", "hashtags"]
            },
            youtube: { 
              type: 'OBJECT', 
              properties: { seoTitle: { type: 'STRING' }, description: { type: 'STRING' }, whatYouWillLearn: { type: 'ARRAY', items: { type: 'STRING' } }, chapters: { type: 'ARRAY', items: { type: 'STRING' } }, cta: { type: 'STRING' }, keywords: { type: 'ARRAY', items: { type: 'STRING' } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } },
              required: ["seoTitle", "description", "whatYouWillLearn", "chapters", "cta", "keywords", "hashtags"]
            }
          },
          required: ["linkedin", "instagram", "facebook", "twitter", "youtube"]
        },
        seoHashtags: { type: 'ARRAY', items: { type: 'STRING' } },
        primaryKeywords: { type: 'ARRAY', items: { type: 'STRING' } },
        secondaryKeywords: { type: 'ARRAY', items: { type: 'STRING' } },
        longTailKeywords: { type: 'ARRAY', items: { type: 'STRING' } },
        videoPrompt: {
          type: 'OBJECT',
          properties: {
            videoConcept: { type: 'STRING' },
            hook: { type: 'STRING' },
            sceneObjective: { type: 'STRING' },
            sceneDescription: { type: 'STRING' },
            characterDescription: { type: 'STRING' },
            characterAppearance: { type: 'STRING' },
            characterClothing: { type: 'STRING' },
            characterExpressions: { type: 'STRING' },
            characterEmotions: { type: 'STRING' },
            characterActions: { type: 'STRING' },
            cameraAngle: { type: 'STRING' },
            cameraMovement: { type: 'STRING' },
            cameraLens: { type: 'STRING' },
            cameraDistance: { type: 'STRING' },
            framing: { type: 'STRING' },
            lighting: { type: 'STRING' },
            environment: { type: 'STRING' },
            background: { type: 'STRING' },
            props: { type: 'STRING' },
            colorPalette: { type: 'STRING' },
            composition: { type: 'STRING' },
            cinematicStyle: { type: 'STRING' },
            visualStyle: { type: 'STRING' },
            transition: { type: 'STRING' },
            motionDetails: { type: 'STRING' },
            videoQuality: { type: 'STRING' },
            renderingStyle: { type: 'STRING' },
            aspectRatio: { type: 'STRING' },
            frameRate: { type: 'STRING' },
            duration: { type: 'STRING', description: 'Always exactly 10 seconds' },
            voiceoverScript: { type: 'STRING' },
            voiceStyle: { type: 'STRING' },
            voiceGender: { type: 'STRING' },
            voiceEmotion: { type: 'STRING' },
            voiceSpeed: { type: 'STRING' },
            accent: { type: 'STRING' },
            dialogue: { type: 'STRING' },
            backgroundMusic: { type: 'STRING' },
            soundEffects: { type: 'STRING' },
            ambientSounds: { type: 'STRING' },
            negativePrompt: { type: 'STRING' }
          },
          required: [
            "videoConcept", "hook", "sceneObjective", "sceneDescription", "characterDescription", 
            "characterAppearance", "characterClothing", "characterExpressions", "characterEmotions", 
            "characterActions", "cameraAngle", "cameraMovement", "cameraLens", "cameraDistance", 
            "framing", "lighting", "environment", "background", "props", "colorPalette", "composition", 
            "cinematicStyle", "visualStyle", "transition", "motionDetails", "videoQuality", 
            "renderingStyle", "aspectRatio", "frameRate", "duration", "voiceoverScript", "voiceStyle", 
            "voiceGender", "voiceEmotion", "voiceSpeed", "accent", "dialogue", "backgroundMusic", 
            "soundEffects", "ambientSounds", "negativePrompt"
          ]
        },
        videoHook: { type: 'STRING' },
        voiceoverScript: { type: 'STRING' },
        videoScriptTimeline: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              time: { type: 'STRING' },
              action: { type: 'STRING' },
              audio: { type: 'STRING' }
            },
            required: ["time", "action", "audio"]
          }
        },
        shotList: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              sceneNumber: { type: 'STRING' },
              description: { type: 'STRING' },
              camera: { type: 'STRING' },
              movement: { type: 'STRING' },
              voice: { type: 'STRING' },
              sfx: { type: 'STRING' },
              transition: { type: 'STRING' }
            },
            required: ["sceneNumber", "description", "camera", "movement", "voice", "sfx", "transition"]
          }
        },
        bRollIdeas: { type: 'ARRAY', items: { type: 'STRING' } },
        thumbnailPrompt: { type: 'STRING' },
        thumbnailStyle: { type: 'STRING' },
        generatedAt: { type: 'STRING' }
      },
      required: ["oneLineSummary", "dailySuggestedTopic", "hook", "problem", "story", "solution", "callToAction", "captions", "seoHashtags", "primaryKeywords", "secondaryKeywords", "longTailKeywords", "videoPrompt", "videoHook", "voiceoverScript", "videoScriptTimeline", "shotList", "bRollIdeas", "thumbnailPrompt", "thumbnailStyle", "generatedAt"]
    };

    let promptText = "";
    if (input.isRandom) {
      const seed = Math.random().toString(36).substring(2, 9);
      promptText = `Generate a random highly viral UGC concept based on current market trends. Ensure video duration is strictly 10 seconds. [Seed: ${seed}]`;
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

Generate the complete UGC Studio Result for this exact product configuration. Ensure video duration is strictly 10 seconds.

[Random Seed for unique generation: ${Math.random().toString(36).substring(2, 9)}]`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: schemaObj as any,
        temperature: 0.8,
      }
    });

    if (response.text) {
      const parsed = JSON.parse(response.text) as UgcStudioResult;
      parsed.originalInput = input;
      return parsed;
    }
    throw new Error("No text in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return generateLocalUgcMock(input);
  }
};
