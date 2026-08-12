import { GoogleGenAI } from '@google/genai';
import { UgcStudioInput, UgcStudioResult, UgcTopic } from '../types';

const SYSTEM_PROMPT = `You are DIRECTOR.AI's AI UGC Studio Director.
Your purpose is to generate authentic User Generated Content (UGC) ad video prompts and strategy that look, feel, and convert like genuine TikTok / Instagram Reels creator ads — NOT corporate TV commercials, cinematic promotional films, or polished brand advertisements.

==================================================
CORE UGC AUTHENTICITY RULES — MANDATORY
==================================================

THE VIDEO MUST FEEL LIKE:
A real creator casually recording a useful, genuine recommendation for their audience.

NOT:
- A traditional advertisement
- A cinematic commercial
- A social-media UI mockup
- A polished promotional film

==================================================
NEVER START WITH POV
==================================================
Do NOT use: "POV:", "POV shot", "POV perspective", "POV-style opening", or any POV framing language.
The video must begin naturally:
- Creator looking into the phone camera
- Creator already interacting with the product
- Creator casually showing the problem
- Creator reacting naturally to the situation

==================================================
NO INVENTED SOCIAL-MEDIA UI
==================================================
NEVER generate: subscribe buttons, subscribed buttons, bell icons, like buttons, follow buttons, comment bubbles, share buttons, notification overlays, TikTok UI, YouTube UI, Instagram UI, fake platform graphics, floating CTA graphics — UNLESS that element is genuinely part of the product being demonstrated.
Do NOT add decorative social-media elements just because the video is intended for social media.

==================================================
CTA MUST BE NATURAL
==================================================
Do NOT force a large visual CTA overlay. Avoid forced text overlays: "DOWNLOAD NOW", "SUBSCRIBE", "CLICK HERE", "GET STARTED" unless specifically requested.
Prefer natural creator language:
- "Honestly, I'd use this again."
- "Try it yourself."
- "That's what I use now."
- "If you're editing a lot, give it a try."

==================================================
10-SECOND STORY STRUCTURE
==================================================
ALWAYS follow this structure:
  0–2s  → HOOK: Short, conversational, specific, relatable, curiosity-driven
  2–4s  → PAIN: Show the problem VISUALLY, minimal dialogue
  4–7s  → PRODUCT: Show the actual product solving the problem
  7–9s  → RESULT: Emotional change — relieved, satisfied, confident
  9–10s → CTA: Natural creator recommendation, NOT a promotional announcement

Each section communicates ONE idea only.

==================================================
SPOKEN SCRIPT WORD COUNT RULE
==================================================
For a 10-second ad, the TOTAL spoken dialogue must be MAXIMUM 20–28 words.
Do NOT write long paragraphs. Natural delivery is more important than information density.

==================================================
HOOK RULES
==================================================
Hook must be SHORT, conversational, specific, relatable, curiosity-driven.
Examples:
  "Editing was taking me forever."
  "I was spending way too long on every video."
  "I finally found a faster way to do this."
AVOID corporate advertising language or announcer-style openers.

==================================================
PAIN SECTION RULES
==================================================
Show the problem VISUALLY. Do not explain everything verbally.
Example: Creator shows messy timeline, scrolls through clips, looks frustrated.
Keep dialogue minimal — the visual carries the message.

==================================================
PRODUCT SECTION RULES
==================================================
Show the actual product solving the problem. The product must be clearly visible.
Do NOT describe the same product action twice.
BAD: "[Product] auto-generates captions, suggests cuts on the beat, and provides ready-to-use trending templates instantly."
BETTER: "Creator quickly shows [Product] generating captions and cutting clips to the beat."

==================================================
RESULT SECTION RULES
==================================================
Show an emotional change: frustrated → relieved, satisfied, excited, or confident.
Keep the reaction believable. AVOID exaggerated acting or over-the-top enthusiasm.

==================================================
SCRIPT = SOURCE OF TRUTH (STRICT RULE)
==================================================
If an element is not explicitly present in:
1. Hook
2. Problem
3. Product
4. Result
5. CTA

DO NOT ADD IT. 
Only include visual elements that are explicitly relevant to the script.
Do NOT add decorative UI, random interface elements, fake social-media graphics, or floating buttons.

==================================================
CAMERA STYLE
==================================================
Handheld smartphone footage, natural room lighting, realistic imperfections, casual clothing, believable facial expressions, natural pacing, non-commercial feeling.
Do NOT make it cinematic. Do NOT make it studio-like.

==================================================
VOICE & AUDIO
==================================================
Voice: Conversational creator voice. Natural pauses. Natural breathing. Natural reactions. No announcer voice. No commercial voiceover. No exaggerated sales enthusiasm.
Audio: Natural room ambience, natural environmental sounds, relevant product interaction sounds. No cinematic sound effects. No dramatic trailer music.

==================================================
MANDATORY NEGATIVE PROMPT
==================================================
ALWAYS include in negativePrompt:
"POV opening, POV framing, POV shot, cinematic commercial, studio lighting, corporate presenter, stock footage, perfect acting, dramatic camera movement, fake social-media interface, YouTube interface, TikTok interface, Instagram interface, subscribe button, subscribed button, bell icon, like icon, follow button, comment bubble, notification popup, floating CTA, random text overlay, decorative UI, fake platform graphics, sales banner, corporate voiceover, announcer voice, overly polished advertisement, SUBSCRIBED text, FOLLOW text, LIKE text, BELL text, DOWNLOAD text"

==================================================
FINAL QUALITY CHECK — BEFORE OUTPUT
==================================================
Verify:
[ ] Dialogue fits the duration (max 28 words total).
[ ] No duplicated product description.
[ ] Hook is conversational, not corporate.
[ ] Pain is visually understandable.
[ ] Product is clearly demonstrated.
[ ] Result shows a believable emotional change.
[ ] CTA sounds like a creator recommendation.
[ ] No POV language anywhere.
[ ] No fake social-media UI.
[ ] No unnecessary overlays.
[ ] No invented subscribe/follow/bell elements.
[ ] Product promotion remains natural.
[ ] Entire video feels like authentic UGC.

==================================================
STRUCTURED OUTPUTS
==================================================
CAPTIONS: Generate structured captions for LinkedIn, Instagram, Facebook, Twitter/X, and YouTube.
- LinkedIn: { hook, context, mainInsight, keyTakeaways, cta, hashtags }
- Instagram: { hook, story, lesson, cta, hashtags }
- Facebook: { opening, problem, advice, example, question, hashtags }
- Twitter/X: { singleTweet, threadVersion (array of strings), hashtags }
- YouTube: { seoTitle, description, whatYouWillLearn, chapters, cta, keywords, hashtags }

VIDEO SCRIPT & SHOT LIST: Generate a structured timeline for the video script and a detailed shot list broken down by scene number.

VIDEO PROMPT: Generate an authentic UGC AI video prompt suitable for Veo 3, Runway Gen-4, Sora, Kling, Pika, Luma Dream Machine.
CRITICAL: Every generated video MUST be optimized for exactly 10 seconds. Aspect Ratio: 9:16 vertical.`;

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
        mainInsight: `Efficiency isn't about working harder-it's about working smarter.`,
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
      videoConcept: `Authentic UGC ad: A relatable creator casually shares how ${prod} solved a real daily problem. Feels like a genuine creator recommendation, not a commercial.`,
      hook: `Creator sitting at their desk, already mid-task, looks into camera with a tired expression and says: "I was losing so much time on this every day."`,
      sceneObjective: `Show the contrast between the creator's before-state (frustrated, manual effort) and after-state (relieved, done) through natural interaction with ${prod}.`,
      sceneDescription: `Real home workspace or kitchen counter. Creator interacts naturally with ${prod} on their laptop or phone. No staged props or styled set.`,
      characterDescription: `Relatable creator, late 20s to early 30s, natural appearance, no professional styling.`,
      characterAppearance: `Casual, approachable, natural hair, no heavy makeup.`,
      characterClothing: `Everyday casual clothing — t-shirt, hoodie, or comfortable top. Nothing styled.`,
      characterExpressions: `Genuine frustration transitioning to quiet relief and a natural satisfied smile.`,
      characterEmotions: `Stressed and overwhelmed → genuinely relieved and confident.`,
      characterActions: `Scrolls through work or device showing the problem, then naturally opens and uses ${prod}. Looks back at camera with honest reaction.`,
      cameraAngle: `Handheld eye-level creator angle — facing camera directly, or slightly below eye-level for intimacy.`,
      cameraMovement: `Subtle natural handheld motion. No dramatic push-ins or cinematic moves. Small, organic micro-movements only.`,
      cameraLens: `24mm mobile wide lens — iPhone 15 Pro aesthetic.`,
      cameraDistance: `Medium close-up creator talking-head shot.`,
      framing: `Vertical 9:16 portrait. Creator centered or slightly off-center. Natural, casual composition.`,
      lighting: `Natural ambient room light — window light, overhead household lighting. No ring lights or studio setup visible.`,
      environment: `Authentic real-world space — home office, kitchen table, bedroom desk. No staged studio backgrounds.`,
      background: `Out-of-focus everyday background — shelf, plant, neutral wall. Nothing styled.`,
      props: `Laptop or phone showing ${prod} interface. Everyday items nearby — coffee mug, notebook. Nothing decorative.`,
      colorPalette: `Warm natural skin tones, everyday interior colors. No oversaturated grade. Natural organic color.`,
      composition: `Casual mobile creator composition. Creator fills frame naturally.`,
      cinematicStyle: `Raw authentic mobile UGC — handheld smartphone footage. Non-commercial. Non-cinematic.`,
      visualStyle: `Unpolished native 4K smartphone video, 60fps. Slight natural grain acceptable.`,
      transition: `Quick natural jump cut on spoken phrase change. No dramatic whip pans.`,
      motionDetails: `Natural creator gestures — hand pointing to screen, leaning in slightly, nodding. Human and unscripted-feeling.`,
      videoQuality: `iPhone 15 Pro 4K HDR 60fps.`,
      renderingStyle: `Raw organic creator video. Zero commercial sheen. Zero polished production look.`,
      aspectRatio: `9:16 vertical.`,
      frameRate: `60fps.`,
      duration: `Exactly 10 seconds.`,
      voiceoverScript: `"Was losing so much time on this. Then I found ${prod}. Honestly — try it."`,
      voiceStyle: `Conversational, honest, low-key energetic. Natural creator recommendation voice.`,
      voiceGender: `Neutral.`,
      voiceEmotion: `Genuine — honest relief transitioning to quiet recommendation.`,
      voiceSpeed: `Natural conversational pace. No fast-talking. Not rushed.`,
      accent: `Neutral American.`,
      dialogue: `Natural spoken recommendation — not scripted announcer delivery.`,
      backgroundMusic: `Optional: Subtle trending lo-fi background audio at very low volume. Not distracting.`,
      soundEffects: `Natural keyboard click sounds when product is used. Quiet ambient room tone. No cinematic whooshes.`,
      ambientSounds: `Soft natural room ambience — faint background hum, subtle environment. Nothing dramatic.`,
      negativePrompt: `POV opening, POV framing, POV shot, POV perspective, cinematic commercial, studio lighting, corporate presenter, stock footage, perfect acting, dramatic camera movement, fake social-media interface, YouTube interface, TikTok interface, Instagram interface, subscribe button, subscribed button, bell icon, like icon, follow button, comment bubble, notification popup, floating CTA, random text overlay, decorative UI, fake platform graphics, sales banner, corporate voiceover, announcer voice, overly polished advertisement, SUBSCRIBED text, FOLLOW text, LIKE text, BELL text, DOWNLOAD text, promotional banner, social media UI mockup`
    },
    videoHook: `"I was losing so much time on this every day."`,
    voiceoverScript: `"Was losing so much time on this. Then I found ${prod}. Honestly — try it."`,
    videoScriptTimeline: [
      { time: "0–2s (HOOK)", action: `Creator looks into camera from desk, tired but casual expression.`, audio: `"I was losing so much time on this every day."` },
      { time: "2–4s (PAIN)", action: `Creator turns camera to show the frustrating workflow — scrolling, messy files, manual work.`, audio: `Minimal or silent — visual carries the message.` },
      { time: "4–7s (PRODUCT)", action: `Creator opens ${prod} naturally and quickly demonstrates the key feature solving the problem.`, audio: `"Then I found ${prod}. It handles it in seconds."` },
      { time: "7–9s (RESULT)", action: `Creator looks back at camera with a genuine quiet smile — visibly relieved.`, audio: `"Honestly, it saved me so much time."` },
      { time: "9–10s (CTA)", action: `Creator nods toward camera or gives a casual thumbs-up.`, audio: `"Give it a try."` }
    ],
    shotList: [
      { sceneNumber: "Scene 1 (HOOK)", description: `Creator at desk, looking directly into camera. Tired but relatable expression. Casual setting.`, camera: `Medium Close-Up`, movement: `Subtle handheld hold`, voice: `"I was losing so much time on this every day."`, sfx: `Natural room tone`, transition: `Jump cut` },
      { sceneNumber: "Scene 2 (PAIN)", description: `Creator turns phone/laptop to show cluttered workflow or frustrating manual task.`, camera: `Over-the-shoulder close-up of screen`, movement: `Natural handheld`, voice: `Minimal — visual emphasis`, sfx: `Soft keyboard clicks`, transition: `Jump cut` },
      { sceneNumber: "Scene 3 (PRODUCT)", description: `Close-up of creator using ${prod} — quick, natural product interaction showing the key fix.`, camera: `Close-up of hands and screen`, movement: `Steady handheld`, voice: `"Then I found ${prod}. It handles it in seconds."`, sfx: `Clean UI click sound`, transition: `Jump cut` },
      { sceneNumber: "Scene 4 (RESULT + CTA)", description: `Creator back on camera — genuine quiet smile. Nods and says recommendation naturally.`, camera: `Medium Close-Up`, movement: `Subtle handheld`, voice: `"Honestly, try it."`, sfx: `Natural room tone`, transition: `Fade` }
    ],
    bRollIdeas: [
      `Natural close-up of creator's hands on keyboard while using ${prod}.`,
      `Screen-recording style clip showing the key feature in action.`,
      `Wide shot of authentic real-world workspace — no staged styling.`
    ],
    thumbnailPrompt: `Creator with a natural relieved expression holding up their device showing ${prod} on screen. Authentic, no heavy graphic overlay.`,
    thumbnailStyle: `Clean authentic UGC photo portrait — natural expression, no shouting text, no heavy borders.`,
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
      promptText = `Generate a random authentic UGC concept based on current market trends.

MANDATORY RULES:
- SCRIPT = SOURCE OF TRUTH: If an element is not explicitly in the Hook, Problem, Product, Result, or CTA, DO NOT ADD IT.
- Video duration: strictly 10 seconds
- Total spoken dialogue: maximum 20–28 words
- 10-second structure: 0–2s HOOK | 2–4s PAIN (visual) | 4–7s PRODUCT | 7–9s RESULT | 9–10s CTA
- NEVER start with POV framing or POV language
- NEVER add fake social-media UI (subscribe, bell, like, follow buttons, comment bubbles)
- CTA must sound like a natural creator recommendation, not a promotional announcement
- Negative prompt MUST include: POV opening, POV framing, fake social-media interface, subscribe button, bell icon, like button, follow button, comment bubble, notification popup, floating CTA, decorative UI, SUBSCRIBED text, FOLLOW text, cinematic commercial, studio lighting, corporate presenter, announcer voice

[Seed: ${seed}]`;
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

Generate the complete UGC Studio Result for this exact product configuration.

MANDATORY RULES:
- SCRIPT = SOURCE OF TRUTH: If an element is not explicitly in the Hook, Problem, Product, Result, or CTA, DO NOT ADD IT.
- Video duration: strictly 10 seconds
- Total spoken dialogue: maximum 20–28 words
- 10-second structure: 0–2s HOOK | 2–4s PAIN (visual) | 4–7s PRODUCT | 7–9s RESULT | 9–10s CTA
- NEVER start with POV framing or POV language
- NEVER add fake social-media UI (subscribe, bell, like, follow buttons, comment bubbles, notification overlays)
- CTA must sound like a natural creator recommendation, not a promotional announcement
- Negative prompt MUST include: POV opening, POV framing, fake social-media interface, subscribe button, bell icon, like button, follow button, comment bubble, notification popup, floating CTA, decorative UI, SUBSCRIBED text, FOLLOW text, cinematic commercial, studio lighting, corporate presenter, announcer voice

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

export function generateLocalUgcMockFromTopic(topic: UgcTopic): UgcStudioResult {
  const masterPromptText = `Create a natural 10-second vertical UGC ad featuring a relatable ${topic.targetAudience} creator recording themselves in a real-world workspace setting.

0–2 seconds (HOOK):
Creator looks directly into camera — already in the middle of their work, casually relatable expression. They say: "${topic.visualHookAngle}"
Do NOT use POV framing or POV language. Begin naturally.

2–4 seconds (PAIN):
Creator turns camera toward laptop/desk SHOWING the frustration of dealing with ${topic.corePainPoint}.
Minimal spoken dialogue — let the visual carry the message.

4–7 seconds (PRODUCT):
Creator naturally opens and uses ${topic.brandName} to handle ${topic.solution}. Fast, authentic, spontaneous feel.
Do NOT repeat the same product action twice.

7–9 seconds (RESULT):
Creator looks back at camera — genuinely relieved quiet smile. Says: "Honestly, this saved me so much time."

9–10 seconds (CTA):
Creator nods naturally: "If you deal with this — give ${topic.brandName} a try."
NO forced graphic CTA overlay. NO DOWNLOAD/SUBSCRIBE/FOLLOW text. Natural creator recommendation.

Total spoken dialogue: MAXIMUM 25 words across the entire video.
SCRIPT = SOURCE OF TRUTH: If an element is not explicitly in the script, DO NOT ADD IT.

Visual style:
Authentic creator-shot UGC, handheld smartphone footage (iPhone 15 Pro 4K 60fps), natural room lighting, realistic imperfections, casual clothing, believable facial expressions, natural pacing, non-commercial feeling.

Voice:
Conversational creator voice. Natural pauses, natural breathing. Honest recommendation tone. NOT an announcer, NOT a corporate voiceover.

Audio:
Natural room ambience, subtle keyboard/product interaction sounds. No cinematic effects. No dramatic music.

Format:
9:16 vertical. Duration: Exactly 10 seconds.

Negative:
POV opening, POV framing, POV shot, cinematic commercial, studio lighting, corporate presenter, stock footage, perfect acting, dramatic camera movement, fake social-media interface, YouTube UI, TikTok UI, Instagram UI, subscribe button, subscribed button, bell icon, like button, follow button, comment bubble, notification popup, floating CTA, random text overlay, decorative UI, fake platform graphics, sales banner, corporate voiceover, announcer voice, overly polished advertisement, SUBSCRIBED text, FOLLOW text, LIKE text, BELL text, DOWNLOAD text`;

  return {
    originalInput: {
      industry: topic.industry,
      product: topic.brandName,
      service: topic.productCategory,
      brand: topic.brandName,
      targetAudience: topic.targetAudience,
      platform: 'TikTok / Reels',
      tone: topic.tone,
      goal: topic.why,
      isRandom: false
    },
    oneLineSummary: `${topic.brandName} UGC ad addressing ${topic.corePainPoint}`,
    dailySuggestedTopic: `Why ${topic.brandName} is Taking Over ${topic.industry}`,
    creatorType: `${topic.targetAudience} Creator`,
    coreIdea: `${topic.visualHookAngle} - demonstrating ${topic.solution}`,
    toneVibe: `${topic.tone} & Authentic Creator Energy`,
    ugcStory: {
      hook: topic.visualHookAngle,
      pain: `Visually shows the frustration of ${topic.corePainPoint} — creator's messy workflow or frustrated expression`,
      product: `${topic.brandName} quickly handles ${topic.solution} — natural product interaction, not over-explained`,
      result: `Creator genuinely relieved — quiet, authentic satisfied smile`,
      cta: `"If you deal with this — give ${topic.brandName} a try."`
    },
    storyboardTimeline: [
      {
        stage: 'HOOK',
        timeRange: '0–2s',
        whatWeSee: `Creator at their real workspace, looking directly into camera. Already mid-task, casual and relatable.`,
        whatCreatorDoes: `Makes natural eye contact with camera, tired-but-casual expression.`,
        whatCreatorSays: `"${topic.visualHookAngle}"`,
        audioSfx: `Natural room tone`
      },
      {
        stage: 'PAIN',
        timeRange: '2–4s',
        whatWeSee: `Creator turns camera to show cluttered workflow, messy file management, or repetitive manual task representing ${topic.corePainPoint}.`,
        whatCreatorDoes: `Sighs or shakes head with genuine low-key frustration. Lets visual carry the message.`,
        whatCreatorSays: `Minimal — visual emphasis. Optional: "Every. Single. Day."`,
        audioSfx: `Soft keyboard clicks, subtle ambient room sounds`
      },
      {
        stage: 'PRODUCT',
        timeRange: '4–7s',
        whatWeSee: `Natural close-up of creator's hands using ${topic.brandName} on screen — showing ${topic.solution} working quickly.`,
        whatCreatorDoes: `Interacts with ${topic.brandName} naturally. One clear product action — not repeated.`,
        whatCreatorSays: `"Then I found ${topic.brandName}. Done in seconds."`,
        audioSfx: `Clean UI click sound`
      },
      {
        stage: 'RESULT',
        timeRange: '7–9s',
        whatWeSee: `Creator back on camera with a quiet, genuine relieved smile.`,
        whatCreatorDoes: `Leans back slightly, relaxed. Honest satisfied expression — not exaggerated.`,
        whatCreatorSays: `"Honestly, this saved me so much time."`,
        audioSfx: `Soft natural room ambience`
      },
      {
        stage: 'CTA',
        timeRange: '9–10s',
        whatWeSee: `Creator nods naturally toward camera. No graphic overlays. No floating buttons.`,
        whatCreatorDoes: `Nods or gives a casual thumbs-up — no forced pointing at invisible screen graphic.`,
        whatCreatorSays: `"Give ${topic.brandName} a try."`,
        audioSfx: `Natural fade out`
      }
    ],
    masterUgcPrompt: masterPromptText,
    hook: topic.visualHookAngle,
    problem: topic.corePainPoint,
    story: `Was dealing with ${topic.corePainPoint} constantly. Found ${topic.brandName}. Genuinely changed my workflow.`,
    solution: topic.solution,
    callToAction: `Give ${topic.brandName} a try — honestly worth it.`,
    captions: {
      linkedin: {
        hook: `Struggling with ${topic.corePainPoint}? Here's how ${topic.brandName} changes the game.`,
        context: topic.solution,
        mainInsight: topic.why,
        keyTakeaways: ["Identify core friction", `Implement ${topic.brandName}`, "Scale your results"],
        cta: `How does your team handle ${topic.corePainPoint}?`,
        hashtags: [`#${topic.brandName.replace(/\s+/g, '')}`, `#${topic.industry.replace(/\s+/g, '')}`, "#Productivity"]
      },
      instagram: {
        hook: `Stop making this mistake! 🛑`,
        story: `${topic.visualHookAngle} But then I found ${topic.brandName}.`,
        lesson: topic.solution,
        cta: `Link in bio to check out ${topic.brandName}! ✨`,
        hashtags: [`#${topic.brandName.replace(/\s+/g, '')}`, `#${topic.industry.replace(/\s+/g, '')}`]
      },
      facebook: {
        opening: `Attention ${topic.targetAudience}!`,
        problem: topic.corePainPoint,
        advice: topic.solution,
        example: topic.visualHookAngle,
        question: `Ready to upgrade your workflow?`,
        hashtags: [`#${topic.brandName.replace(/\s+/g, '')}`, `#${topic.industry.replace(/\s+/g, '')}`]
      },
      twitter: {
        singleTweet: `${topic.visualHookAngle} ${topic.solution} Check out ${topic.brandName}!`,
        threadVersion: [
          `Struggling with ${topic.corePainPoint}? 🧵`,
          `1/ The problem: ${topic.corePainPoint}`,
          `2/ The solution: ${topic.solution}`,
          `3/ Why it works: ${topic.why}`
        ],
        hashtags: [`#${topic.brandName.replace(/\s+/g, '')}`, `#Tech`]
      },
      youtube: {
        seoTitle: `How ${topic.brandName} Solves ${topic.corePainPoint}`,
        description: `Full breakdown of ${topic.brandName} and how it helps ${topic.targetAudience}.`,
        whatYouWillLearn: [topic.corePainPoint, topic.solution, topic.why],
        chapters: ["0:00 Intro", "1:30 The Problem", "3:00 The Solution"],
        cta: `Subscribe for more ${topic.industry} breakdowns!`,
        keywords: [topic.brandName, topic.industry, topic.productCategory],
        hashtags: [`#${topic.brandName.replace(/\s+/g, '')}`, `#${topic.industry.replace(/\s+/g, '')}`]
      }
    },
    seoHashtags: [`#${topic.brandName.replace(/\s+/g, '')}`, `#${topic.industry.replace(/\s+/g, '')}`, "#UGCAds", "#Marketing"],
    primaryKeywords: [topic.brandName, topic.industry, topic.productCategory],
    secondaryKeywords: [topic.targetAudience, topic.why],
    longTailKeywords: [`best ${topic.productCategory} for ${topic.targetAudience}`, `how to solve ${topic.corePainPoint}`],
    videoPrompt: {
      videoConcept: `${topic.brandName} UGC Ad: ${topic.solution}`,
      hook: topic.visualHookAngle,
      sceneObjective: `Show immediate contrast between ${topic.corePainPoint} and ${topic.solution}`,
      sceneDescription: `A ${topic.targetAudience} in an authentic workspace setting. ${topic.visualHookAngle}`,
      characterDescription: `A relatable ${topic.targetAudience} individual`,
      characterAppearance: `Casual professional, early 30s, natural appearance`,
      characterClothing: `Minimalist ergonomic outfit`,
      characterExpressions: `Initial frustration shifting to instant delight and relief`,
      characterEmotions: `Stressed to empowered`,
      characterActions: `Interacting with ${topic.brandName} interface on screen`,
      cameraAngle: `Handheld Front-Facing Creator Shot (Selfie / Desk Mount)`,
      cameraMovement: `Natural Handheld Motion with subtle organic movement`,
      cameraLens: `24mm Mobile Wide Lens (iPhone 15 Pro Aesthetic)`,
      cameraDistance: `Close-up Creator Talking Head`,
      framing: `Vertical 9:16 portrait framing, subject direct to camera`,
      lighting: `Natural ambient room lighting mixed with soft ring light`,
      environment: `Relatable real-world workspace / home setup`,
      background: `Authentic desk setup with subtle background depth blur (f/1.8)`,
      props: `Smartphone / Laptop displaying ${topic.brandName}`,
      colorPalette: `Natural organic color grading, warm relatable skin tones`,
      composition: `Casual mobile creator composition`,
      cinematicStyle: `Raw Authentic Mobile TikTok/Reels UGC Creator Style`,
      visualStyle: `Unpolished Native 4K Smartphone Video (60fps)`,
      transition: `Quick jump cut on spoken phrase`,
      motionDetails: `Natural creator gestures and screen pointing`,
      videoQuality: `iPhone 15 Pro 4K HDR 60fps`,
      renderingStyle: `Raw Organic Creator Video — Zero Commercial Sheen, Zero Polished Production`,
      aspectRatio: `9:16 vertical`,
      frameRate: `60 fps`,
      duration: `Exactly 10 seconds`,
      voiceoverScript: `"Was dealing with ${topic.corePainPoint} constantly. Then I found ${topic.brandName}. Honestly — give it a try."`,
      voiceStyle: `Conversational creator voice — natural pacing, honest tone, genuine recommendation`,
      voiceGender: `Neutral`,
      voiceEmotion: `Genuine quiet relief — not exaggerated excitement or sales enthusiasm`,
      voiceSpeed: `Natural conversational pace — not rushed, not announcer speed`,
      accent: `Neutral American`,
      dialogue: `Natural spoken creator recommendation — not scripted commercial delivery`,
      backgroundMusic: `Optional: Very subtle trending lo-fi background audio at low volume. Not distracting.`,
      soundEffects: `Natural product interaction sounds — keyboard clicks, subtle UI chime. No cinematic whooshes.`,
      ambientSounds: `Soft natural room ambience — faint background hum, everyday environment`,
      negativePrompt: `POV opening, POV framing, POV shot, POV perspective, cinematic commercial, studio lighting, corporate presenter, stock footage, perfect acting, dramatic camera movement, fake social-media interface, YouTube UI, TikTok UI, Instagram UI, subscribe button, subscribed button, bell icon, like button, follow button, comment bubble, notification popup, floating CTA, random text overlay, decorative UI, fake platform graphics, sales banner, corporate voiceover, announcer voice, overly polished advertisement, SUBSCRIBED text, FOLLOW text, LIKE text, BELL text, DOWNLOAD text, promotional banner`
    },
    videoHook: topic.visualHookAngle,
    voiceoverScript: `"Was dealing with ${topic.corePainPoint} constantly. Then I found ${topic.brandName}. Honestly — give it a try."`,
    videoScriptTimeline: [
      { time: "0–2s (HOOK)", action: `Creator at real workspace, looks directly into camera with casual tired expression. No POV framing.`, audio: topic.visualHookAngle },
      { time: "2–4s (PAIN)", action: `Creator turns camera to show the frustrating workflow — messy files, repetitive manual work, ${topic.corePainPoint} visually shown.`, audio: `Minimal — visual carries the message.` },
      { time: "4–7s (PRODUCT)", action: `Creator naturally opens and uses ${topic.brandName} — one clear product action showing ${topic.solution}.`, audio: `"Then I found ${topic.brandName}. Done in seconds."` },
      { time: "7–9s (RESULT)", action: `Creator back on camera — quiet genuine relieved smile. Not exaggerated.`, audio: `"Honestly, this saved me so much time."` },
      { time: "9–10s (CTA)", action: `Creator nods naturally. No graphic overlay. No pointing at floating UI element.`, audio: `"Give ${topic.brandName} a try."` }
    ],
    shotList: [
      { sceneNumber: "Scene 1 (HOOK)", description: `Creator at authentic workspace looking directly into camera. Casual, tired-but-relatable expression. No POV language.`, camera: `Handheld Medium Close-Up, eye-level`, movement: `Subtle natural handheld hold`, voice: topic.visualHookAngle, sfx: `Natural room tone`, transition: `Jump cut` },
      { sceneNumber: "Scene 2 (PAIN)", description: `Creator turns camera to show frustrating workflow — ${topic.corePainPoint} shown visually on screen.`, camera: `Over-the-shoulder close-up of screen`, movement: `Natural handheld micro-movement`, voice: `Minimal`, sfx: `Soft keyboard clicks, ambient room tone`, transition: `Jump cut` },
      { sceneNumber: "Scene 3 (PRODUCT)", description: `Natural close-up of creator using ${topic.brandName} — showing ${topic.solution}. One clear action, not repeated.`, camera: `Close-up of hands + screen`, movement: `Steady natural handheld`, voice: `"Then I found ${topic.brandName}. Done in seconds."`, sfx: `Clean UI click sound`, transition: `Jump cut` },
      { sceneNumber: "Scene 4 (RESULT + CTA)", description: `Creator back on camera with genuine quiet relieved smile. Natural nod. No graphic overlay.`, camera: `Medium Close-Up`, movement: `Subtle handheld hold`, voice: `"Honestly — give it a try."`, sfx: `Natural room tone, soft fade`, transition: `Fade` }
    ],
    bRollIdeas: [
      `Natural close-up of creator's hands on keyboard using ${topic.brandName}.`,
      `Screen-recording clip of the key ${topic.solution} feature working.`,
      `Wide shot of authentic everyday workspace — no styled props.`
    ],
    thumbnailPrompt: `Creator with genuine relieved expression, holding device showing ${topic.brandName} on screen. Natural, authentic — no heavy graphic overlay or shouting text.`,
    thumbnailStyle: `Clean authentic UGC portrait — natural expression, minimal text, no heavy border styling.`,
    generatedAt: new Date().toISOString()
  };
}

export async function generateUgcFromTopic(topic: UgcTopic): Promise<UgcStudioResult> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("No Gemini API Key found. Returning dataset-driven mock result.");
      return generateLocalUgcMockFromTopic(topic);
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
            audioMixing: { type: 'STRING' },
            negativePrompt: { type: 'STRING' }
          },
          required: ["videoConcept", "hook", "sceneObjective", "sceneDescription", "characterDescription", "characterAppearance", "characterClothing", "characterExpressions", "characterEmotions", "characterActions", "cameraAngle", "cameraMovement", "cameraLens", "cameraDistance", "framing", "lighting", "environment", "background", "props", "colorPalette", "composition", "cinematicStyle", "visualStyle", "transition", "motionDetails", "videoQuality", "renderingStyle", "aspectRatio", "frameRate", "duration", "voiceoverScript", "voiceStyle", "voiceGender", "voiceEmotion", "voiceSpeed", "accent", "dialogue", "backgroundMusic", "soundEffects", "ambientSounds", "audioMixing", "negativePrompt"]
        },
        videoHook: { type: 'STRING' },
        voiceoverScript: { type: 'STRING' },
        videoScriptTimeline: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: { timestamp: { type: 'STRING' }, visual: { type: 'STRING' }, audio: { type: 'STRING' } },
            required: ["timestamp", "visual", "audio"]
          }
        },
        shotList: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: { sceneNumber: { type: 'STRING' }, description: { type: 'STRING' }, camera: { type: 'STRING' }, movement: { type: 'STRING' }, voice: { type: 'STRING' }, sfx: { type: 'STRING' }, transition: { type: 'STRING' } },
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

    const promptText = `
You are creating a complete UGC Ad specification strictly based on this CURATED CONCEPT:

[PRODUCT/BRAND]: ${topic.brandName} (${topic.productCategory})
[INDUSTRY]: ${topic.industry}
[TARGET AUDIENCE]: ${topic.targetAudience}
[CORE PAIN POINT]: ${topic.corePainPoint}
[SOLUTION / HOW IT IS USED]: ${topic.solution}
[VISUAL HOOK ANGLE]: ${topic.visualHookAngle}
[MOTIVATION / WHY]: ${topic.why}
[TONE / VIBE]: ${topic.tone}

Generate the complete UGC Studio Result based on this topic.

MANDATORY QUALITY RULES — ENFORCE STRICTLY:
- SCRIPT = SOURCE OF TRUTH: If an element is not explicitly in the Hook, Problem, Product, Result, or CTA, DO NOT ADD IT.
- Video duration: strictly 10 seconds
- Total spoken dialogue: MAXIMUM 20–28 words across the entire video
- 10-second structure: 0–2s HOOK | 2–4s PAIN (visual, minimal dialogue) | 4–7s PRODUCT | 7–9s RESULT | 9–10s CTA
- NEVER use POV framing, POV shot, POV perspective, or POV language anywhere
- NEVER add fake social-media UI: no subscribe buttons, bell icons, like buttons, follow buttons, comment bubbles, notification overlays, TikTok/YouTube/Instagram UI
- CTA must sound like a natural creator recommendation — NOT a promotional announcement (avoid DOWNLOAD NOW, SUBSCRIBE, CLICK HERE)
- The hook must be short, conversational, and relatable — NOT a corporate advertising opener
- The pain section must rely on VISUAL storytelling, not verbal explanation
- The product section must show ONE clear product action — do NOT describe the same action twice
- The result must show genuine emotional change — believable, not exaggerated
- negativePrompt MUST include: POV opening, POV framing, POV shot, fake social-media interface, subscribe button, bell icon, like button, follow button, comment bubble, notification popup, floating CTA, decorative UI, SUBSCRIBED text, FOLLOW text, LIKE text, BELL text, DOWNLOAD text, cinematic commercial, studio lighting, corporate presenter, announcer voice, overly polished advertisement

[Random Seed: ${Math.random().toString(36).substring(2, 9)}]`;

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
      parsed.originalInput = {
        industry: topic.industry,
        product: topic.brandName,
        service: topic.productCategory,
        brand: topic.brandName,
        targetAudience: topic.targetAudience,
        platform: 'TikTok / Reels',
        tone: topic.tone,
        goal: topic.why,
        isRandom: false
      };
      return parsed;
    }
    throw new Error("No text in response");
  } catch (error) {
    console.error("Gemini API Error (fallback to topic mock):", error);
    return generateLocalUgcMockFromTopic(topic);
  }
}
