import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { GoogleGenAI } from '@google/genai';

function expressApiPlugin(): Plugin {
  return {
    name: 'express-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/generate-campaign') && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const apiKey = process.env.GEMINI_API_KEY;

              if (!apiKey) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY is required in environment.' }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey: apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  },
                },
              });

              // Construct detailed prompt for Gemini 3.6 Flash
              const systemPrompt = `You are a World-Class AI Creative Director specializing in high-converting viral UGC (User Generated Content) video ads for platforms like TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels.

Your output must be a valid, highly detailed JSON object conforming EXACTLY to the structure requested.
Return strictly JSON without markdown code blocks surrounding it if possible, or cleanly parseable JSON.`;

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
                // Strip markdown backticks if any
                const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
                jsonRes = JSON.parse(cleaned);
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(jsonRes));
            } catch (err: any) {
              console.error('Error generating campaign:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Failed to generate campaign' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), expressApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
