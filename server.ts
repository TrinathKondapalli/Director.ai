import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Master Prompt Generation Endpoint for Director.ai UGC Ads
app.post('/api/generate-master-prompt', async (req, res) => {
  try {
    const body = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is missing in environment.' });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemPrompt = `You are Director.ai, an elite AI Creative Director specialized ONLY for creating high-converting AI UGC advertisements and complete publishing packages.
Your goal is to output ONE production-ready MASTER PROMPT that users can directly paste into Google Veo, Google Flow, Kling AI, Runway, Pika, Hailuo, or Luma, ALONG WITH a complete publishing package for YouTube, Instagram, and Facebook.

STRICT GUIDELINES:
1. Automatically determine the ideal: Platform, Marketing Goal, Tone, Target Emotion, Hook, Marketing Angle, CTA, Story Structure, Visual Style, Camera, Lighting, and Sound Design.
2. INTELLIGENTLY EVALUATE CONSISTENCY MODE:
   - Determine whether the ad relies on a SINGLE CREATOR (testimonial, review, unboxing, lifestyle demo) or MULTI-ACTOR / MONTAGE SCENES.
   - For Single Creator Ads: Enforce 100% STRICT CHARACTER CONSISTENCY throughout all 10 seconds.
   - For Multi-Actor Ads: Intentionally assign distinct characters while preserving visual quality, product continuity, and storytelling coherence.

3. The Master Prompt MUST internally contain:
   - Creative Strategy & Marketing Blueprint
   - Viral Hook & Storytelling Structure
   - CHARACTER CONSISTENCY LOCK
   - ENVIRONMENT CONSISTENCY LOCK
   - PRODUCT CONSISTENCY LOCK
   - 10-Second Scene Timeline (0-2s Hook, 2-5s Agitate/Problem, 5-8s Solution, 8-10s CTA)
   - Natural Voice Script (embedded into scene audio)
   - Camera Direction, Lens (e.g. 35mm/85mm), Movement, & Lighting
   - Sound Design & Background Audio
   - Call To Action (CTA)
   - Thumbnail Prompt & Platform Optimization
4. Also generate matching YouTube (Title max 100 chars, Description 150-300 words with CTA & website mention, 10-15 Tags formatted as comma-separated phrase tags STRICTLY under 500 total characters for YouTube Studio, Thumbnail Idea & Prompt), Instagram (Caption 100-200 words with hook & CTA, 8-12 Hashtags, Emojis), and Facebook package (Conversational Caption, Hashtags, CTA).
5. Output ONLY a JSON object conforming strictly to the format specified.`;

    const userPrompt = `Generate the Ultimate AI UGC Ad Master Prompt & Complete Publishing Package for Director.ai based on:
- Product Name: ${body.productName || 'Featured Product'}
- Target Audience: ${body.targetAudience || 'Target Consumers'}
- Product URL: ${body.productUrl || 'N/A'}

Format JSON with:
{
  "productName": "${body.productName || 'Featured Product'}",
  "masterPromptText": "FULL COMPLETE PRODUCTION-READY MONOSPACED MASTER PROMPT CONTAINING ALL STRATEGY, SCENE TIMELINE (0-10S), NATURAL VOICE AUDIO, CAMERA, LIGHTING & CTA SECTIONS",
  "creativeStrategy": {
    "objective": "High-Converting UGC Sales Drive",
    "targetAudience": "${body.targetAudience || 'Target Consumers'}",
    "painPoint": "Frustration with traditional underperforming alternatives",
    "desiredEmotion": "Curiosity, Validation & Urgency",
    "marketingAngle": "Pattern-Interrupt Problem-to-Solution Transformation"
  },
  "youtubePackage": {
    "title": "Natural, high-CTR YouTube title under 100 chars",
    "description": "Professional 150-300 word description with website mention and CTA",
    "hashtags": ["#tag1", "#tag2", "#tag3"],
    "thumbnailIdea": "Brief visual concept for thumbnail",
    "thumbnailPrompt": "Detailed AI image generator prompt describing expression, lighting, composition, product placement, camera angle, and typography space",
    "keywords": ["keyword1", "keyword2"],
    "categoryRecommendation": "Science & Technology",
    "seoScore": 96
  },
  "instagramPackage": {
    "caption": "Conversational 100-200 word caption with strong hook, short paragraphs, and CTA",
    "hashtags": ["#igtag1", "#igtag2"],
    "hook": "Single line pattern interrupt hook",
    "callToAction": "Direct link in bio CTA",
    "emojiSuggestions": ["🔥", "✨"]
  },
  "facebookPackage": {
    "caption": "Slightly more conversational Facebook caption",
    "hashtags": ["#fbtag1", "#fbtag2"],
    "hook": "Conversational hook line",
    "callToAction": "Direct offer CTA link"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    let jsonRes;
    try {
      jsonRes = JSON.parse(text);
    } catch (e) {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      jsonRes = JSON.parse(cleaned);
    }

    return res.json(jsonRes);
  } catch (error: any) {
    console.error('Server error generating master prompt:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

// AI Cooking ASMR 30-Second Generator Endpoint (3 Continuous Prompts)
app.post('/api/generate-cooking-asmr', async (req, res) => {
  try {
    const body = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is missing in environment.' });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemPrompt = `You are DIRECTOR.AI, an elite AI Film Director & Sound Designer specializing in peaceful, immersive, handcrafted animated food films and 30-second 4K Cinematic Cooking ASMR videos.

YOUR GOAL:
Generate THREE CONTINUOUS MASTER PROMPTS (Part 1: 0-10s, Part 2: 10-20s, Part 3: 20-30s) that create a peaceful, immersive, premium animated food film.
This is NOT a recipe tutorial, NOT a fast-paced cooking reel, and NOT a food commercial. The objective is to create a relaxing, cozy atmosphere.

STRICT CINEMATIC ANIMATION STYLE GUIDE:
1. VISUAL DIRECTION & RENDERING:
   - Original handcrafted visual language: hand-painted appearance, soft painterly textures, rich organic brush details, smooth cel-inspired shading, gentle natural imperfections, premium animated feature-film quality.
   - Cinematic lighting: soft bloom, volumetric light, warm golden sunlight through window, soft practical kitchen glow, natural environmental depth, rich steam, beautiful food textures, smooth rendering.
   - Every frame looks intentionally handcrafted rather than computer generated.

2. MOOD & PACING:
   - Relaxing emotional atmosphere: comfort, warmth, peace, curiosity, relaxation, satisfaction, hunger.
   - Calm, intentional pacing. Never rush the cooking. Allow every action to breathe naturally.

3. FOOD PRESENTATION & STYLING:
   - Food is always the hero. Fresh, detailed, richly textured, naturally cooked, beautifully seasoned, visually appetizing.
   - Expressive steam, glistening oil reflections, sauce movement, fresh herbs, natural moisture, golden crispy textures.

4. CINEMATOGRAPHY & LIGHTING:
   - Macro shots, close-ups, top-down flat-lays, over-the-shoulder views. Slow push-in movements, gentle tracking, shallow depth of field.
   - Slow, smooth, stable camera movement. Warm cozy kitchen environment with natural wood, stone countertops, ceramic bowls, wooden utensils.

5. ASMR DIRECTION & AUDIO SYNC:
   - Visual timing engineered for satisfying ASMR (rhythmic knife chopping, sizzling sear, sauce drizzle, ceramic contact, crunch bite).

6. STRICT CONTINUITY ACROSS ALL 3 PROMPTS:
   - All three prompts MUST share 100% IDENTICAL: Kitchen, Lighting, Camera Language, Props, Ingredients, Utensils, Character Hands, Animation Style, Color Grading, and Food Styling.

Output ONLY a JSON object conforming strictly to the specified schema.`;

    const userPrompt = `Generate a 30-second, 3-part continuous Handcrafted Animated Cooking ASMR Master Prompt series for:
- Dish Name: ${body.dishName || 'Crispy Wagyu Beef Smash Burger'}
- Cuisine / Style: ${body.cuisineStyle || 'Modern Gourmet Street Food'}
- Key Ingredients: ${body.keyIngredients || 'Wagyu Beef Patty, Caramelized Onions, Melted Cheddar, Toasted Brioche'}
- Kitchen Aesthetic: ${body.kitchenAesthetic || 'Dark Slate & Matte Black Steel Luxury Kitchen'}
- Chef Vibe: ${body.chefVibe || 'Precision Chef with Clean Black Apron & Heavy Wooden Cutting Board'}
- Sound Focus: ${body.soundFocus || 'Crisp Knife Chopping, Loud Patty Sizzle, Sauce Squeeze & Crunch Bite'}
- Target AI Video Model: ${body.targetModel || 'Google Veo'}
- Aspect Ratio: ${body.aspectRatio || '9:16 Vertical'}

Format JSON with:
{
  "dishName": "${body.dishName || 'Crispy Wagyu Beef Smash Burger'}",
  "sharedContinuity": "Detailed summary of shared handcrafted animated kitchen, hand-painted painterly textures, warm volumetric golden sunlight, matte black slate background, macro 85mm lens, and chef hands styling to ensure 100% visual consistency across video generators.",
  "prompts": [
    {
      "id": "part-1",
      "label": "Video 1 (0-10s): Prep, Chopping & Initial Sizzle",
      "timeframe": "0-10s",
      "text": "FULL COMPLETE MONOSPACED MASTER PROMPT FOR VIDEO 1 (0-10 SECONDS) IN CORPORATING CINEMATIC ANIMATED STYLE GUIDE"
    },
    {
      "id": "part-2",
      "label": "Video 2 (10-20s): Sear, High-Heat Fry & Sauce Drizzle",
      "timeframe": "10-20s",
      "text": "FULL COMPLETE MONOSPACED MASTER PROMPT FOR VIDEO 2 (10-20 SECONDS) INCORPORATING CINEMATIC ANIMATED STYLE GUIDE"
    },
    {
      "id": "part-3",
      "label": "Video 3 (20-30s): Plating, Garnish & Hero Crunch Taste Shot",
      "timeframe": "20-30s",
      "text": "FULL COMPLETE MONOSPACED MASTER PROMPT FOR VIDEO 3 (20-30 SECONDS) INCORPORATING CINEMATIC ANIMATED STYLE GUIDE"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    let jsonRes;
    try {
      jsonRes = JSON.parse(text);
    } catch (e) {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      jsonRes = JSON.parse(cleaned);
    }

    return res.json(jsonRes);
  } catch (error: any) {
    console.error('Server error generating cooking ASMR master prompt:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

// AI Campaign Generation Endpoint
app.post('/api/generate-campaign', async (req, res) => {
  try {
    const body = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is missing in environment.' });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemPrompt = `You are a World-Class AI Creative Director specializing in high-converting viral UGC (User Generated Content) video ads for platforms like TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels.

Your output must be a valid, highly detailed JSON object conforming EXACTLY to the structure requested.`;

    const userPrompt = `Generate a complete end-to-end 21-part UGC Ad Campaign strategy and production blueprint based on the following input:

Product Name: ${body.productName || 'Not specified'}
Product URL: ${body.productUrl || 'N/A'}
Category: ${body.category || 'E-Commerce'}
Price: ${body.price || 'N/A'}
USP: ${body.usp || 'High performance and convenience'}
Brand Voice: ${body.brandVoice || 'Relatable, enthusiastic, authentic'}

Target Audience:
- Age: ${body.audienceAge || '18-35'}
- Gender: ${body.audienceGender || 'All'}
- Country: ${body.audienceCountry || 'United States'}
- Interests: ${body.interests || 'Lifestyle, Trending Products'}
- Pain Points: ${body.painPoints || 'Wasting time, frustration with existing solutions'}
- Desired Goals: ${body.goals || 'Quick results, ease of use'}
- Buying Intent: ${body.buyingIntent || 'High / Ready to purchase'}

Campaign Settings:
- Platform: ${body.platform || 'Instagram Reels'}
- Video Duration: ${body.durationSec || 10} seconds
- Language: ${body.language || 'English'}
- Tone: ${body.tone || 'Relatable & Authentic UGC'}
- CTA: ${body.ctaStyle || 'Direct Buy Now'}
- Ad Objective: ${body.marketingGoal || 'Sales'}

Produce a JSON object with EXACTLY these fields:
{
  "creativeStrategy": {
    "objective": "...",
    "targetAudience": "...",
    "painPoint": "...",
    "desiredEmotion": "...",
    "marketingFramework": "...",
    "psychologyUsed": "...",
    "buyerJourney": "...",
    "storyType": "...",
    "brandVoice": "..."
  },
  "hooks": [
    { "id": 1, "type": "Pattern Interrupt", "text": "...", "reasoning": "..." },
    { "id": 2, "type": "Problem-First", "text": "...", "reasoning": "..." },
    { "id": 3, "type": "Curiosity", "text": "...", "reasoning": "..." },
    { "id": 4, "type": "Bold Claim", "text": "...", "reasoning": "..." },
    { "id": 5, "type": "Relatable Story", "text": "...", "reasoning": "..." }
  ],
  "marketingAngle": {
    "primaryAngle": "...",
    "secondaryAngle": "...",
    "explanation": "...",
    "proofPoints": ["...", "..."]
  },
  "characterProfile": {
    "age": "...",
    "gender": "...",
    "clothing": "...",
    "hairstyle": "...",
    "expressions": "...",
    "energy": "...",
    "voiceStyle": "...",
    "personality": "...",
    "bodyLanguage": "..."
  },
  "emotionStrategy": {
    "primaryEmotion": "...",
    "secondaryEmotions": ["...", "..."],
    "triggerMechanisms": "..."
  },
  "masterVideoPrompt": {
    "fullPrompt": "...",
    "creativeDirection": "...",
    "storytelling": "...",
    "character": "...",
    "environment": "...",
    "camera": "...",
    "movement": "...",
    "productPlacement": "...",
    "timing": "...",
    "lighting": "...",
    "lens": "...",
    "rendering": "...",
    "resolution": "...",
    "composition": "...",
    "transitions": "...",
    "emotion": "...",
    "pacing": "...",
    "branding": "...",
    "ending": "..."
  },
  "timeline": [
    { "timeframe": "0-2s", "phase": "Hook", "visual": "...", "camera": "...", "dialogue": "...", "subtitles": "...", "sfx": "...", "purpose": "..." },
    { "timeframe": "2-5s", "phase": "Agitate & Problem", "visual": "...", "camera": "...", "dialogue": "...", "subtitles": "...", "sfx": "...", "purpose": "..." },
    { "timeframe": "5-8s", "phase": "Solution Reveal", "visual": "...", "camera": "...", "dialogue": "...", "subtitles": "...", "sfx": "...", "purpose": "..." },
    { "timeframe": "8-10s", "phase": "Call to Action", "visual": "...", "camera": "...", "dialogue": "...", "subtitles": "...", "sfx": "...", "purpose": "..." }
  ],
  "voiceScript": {
    "fullScript": "...",
    "toneNotes": "...",
    "pacingSpeed": "...",
    "suggestedVoiceId": "..."
  },
  "subtitleScript": [
    { "line": 1, "text": "...", "emphasisWords": ["..."] },
    { "line": 2, "text": "...", "emphasisWords": ["..."] },
    { "line": 3, "text": "...", "emphasisWords": ["..."] },
    { "line": 4, "text": "...", "emphasisWords": ["..."] }
  ],
  "cameraDirection": {
    "shotList": ["...", "..."],
    "primaryMovement": "...",
    "framing": "...",
    "angle": "..."
  },
  "lensSelection": {
    "focalLength": "...",
    "aperture": "...",
    "depthOfField": "...",
    "visualImpact": "..."
  },
  "lightingPlan": {
    "setup": "...",
    "colorTemp": "...",
    "mood": "...",
    "highlights": "..."
  },
  "soundDesign": {
    "bgMusicGenre": "...",
    "bgMusicTempo": "...",
    "ambientSounds": ["...", "..."],
    "sfxList": ["...", "..."],
    "audioMixNotes": "..."
  },
  "bRollSuggestions": [
    { "title": "...", "description": "...", "framing": "..." },
    { "title": "...", "description": "...", "framing": "..." },
    { "title": "...", "description": "...", "framing": "..." }
  ],
  "ctaOptions": [
    { "type": "Direct", "text": "...", "urgency": "High" },
    { "type": "Soft", "text": "...", "urgency": "Medium" },
    { "type": "Curiosity", "text": "...", "urgency": "Medium" },
    { "type": "FOMO", "text": "...", "urgency": "High" }
  ],
  "thumbnailPrompt": {
    "fullPrompt": "...",
    "facialExpression": "...",
    "textOverlay": "...",
    "composition": "...",
    "lighting": "...",
    "background": "...",
    "contrastPoint": "..."
  },
  "youtubeSeo": {
    "titleOptions": ["...", "...", "..."],
    "description": "...",
    "tags": ["...", "...", "..."],
    "keywords": ["...", "..."],
    "pinnedComment": "...",
    "chapters": ["00:00 - Intro", "00:02 - Problem", "00:05 - Solution", "00:08 - Offer"]
  },
  "instagramSeo": {
    "caption": "...",
    "hashtags": ["...", "..."],
    "cta": "...",
    "firstComment": "...",
    "storyCaption": "..."
  },
  "tikTokSeo": {
    "caption": "...",
    "hashtags": ["...", "..."],
    "hookTextOnScreen": "...",
    "commentsStrategy": "..."
  },
  "facebookSeo": {
    "primaryText": "...",
    "headline": "...",
    "description": "...",
    "ctaButtonText": "..."
  },
  "linkedInSeo": {
    "professionalCaption": "...",
    "thoughtLeadershipVersion": "...",
    "hashtags": ["...", "..."]
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    let jsonRes;
    try {
      jsonRes = JSON.parse(text);
    } catch (e) {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      jsonRes = JSON.parse(cleaned);
    }

    return res.json(jsonRes);
  } catch (error: any) {
    console.error('Server error generating campaign:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
