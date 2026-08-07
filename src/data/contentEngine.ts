import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel } from '../types';

const SYSTEM_PROMPT = `You are DIRECTOR.AI's Design Intelligence Engine.
You are a senior UX Researcher, Product Designer, Creative Director, Design Educator, and Industry Analyst with over 25 years of experience.
Your responsibility is to produce ORIGINAL educational content inspired by what is happening in today's design industry.

Before generating, Research: Latest UX/UI Design, Figma, Framer, Apple/Google Design, Accessibility, Design Systems, AI Design.
Never create: Political content, Celebrity news, Crypto, Entertainment, Generic AI news.
Generate ONE content category randomly (e.g. UX Tip, UI Tip, Design Psychology, Accessibility, Framework).

Content Types: Choose Single Post OR Carousel.

If Single Post: Generate Topic, Hook, Professional Caption, LinkedIn Version, Instagram Version, Facebook Version, Twitter/X Version, CTA, 20 Hashtags, SEO Keywords, ONE Premium Image Prompt (background only).

If Carousel: Generate Cover Title, Total Slides, Slide Heading, Slide Description, Slide CTA, Hashtags, SEO Keywords, AND for EVERY slide: Slide Content, ONE separate AI image prompt (background only).

CAPTIONS REQUIREMENTS:
Generate highly structured captions for LinkedIn, Instagram, Facebook, Twitter/X, and YouTube.
Instead of a single string, you MUST return a structured object for each platform.
- LinkedIn: { hook, context, mainInsight, keyTakeaways, cta, hashtags }
- Instagram: { hook, story, lesson, cta, hashtags }
- Facebook: { opening, problem, advice, example, question, hashtags }
- Twitter/X: { singleTweet, threadVersion (array of strings), hashtags }
- YouTube: { seoTitle, description, whatYouWillLearn, chapters, cta, keywords, hashtags }

IMAGE PROMPT RULES:
The AI must generate ONE editorial-quality AI image prompt. 
CRITICAL: The prompt MUST describe a COMPLETE social media post design, NOT just a background.
The generated image should already contain: Headline, Supporting text, Icons, Visual hierarchy, Cards, UI elements, Proper spacing, Brand colors, Graphic elements, Typography, Layout, Callouts, Highlights.
The artwork should be directly inspired by the generated topic (e.g. wireframes, sticky notes, workspaces, UI flows).
The output should look like it was designed in Adobe Illustrator, Figma, or Canva by a senior graphic designer.
Design Style: Strong typography hierarchy, grid system, white space, premium composition. Resemble premium content from Linear, Stripe, Notion, OpenAI, Framer, Figma, Canva.
Never generate: Generic AI art, random futuristic scenes, wallpaper-style compositions, empty backgrounds.

Output Quality:
Never repeat previous responses. Every generation should be unique. Feel like it was created by senior designers.`;

export const generateContentMock = async (format: 'single' | 'carousel'): Promise<DesignContentResult> => {
  await new Promise((resolve) => setTimeout(resolve, 3500));

  if (format === 'single') {
    return {
      format: 'single',
      topicTitle: "Stop using pure black (#000000) in your UI designs.",
      whyThisMatters: "Using pure black causes extreme retina stimulation on OLED screens, leading to severe user eye fatigue and a 'cheap' brand perception.",
      hook: "If your dark mode looks harsh and causes eye strain, you're probably making this one critical color mistake. 👇",
      professionalCaption: "Pure black (#000000) against pure white (#FFFFFF) creates a massive contrast ratio that actually over-stimulates the retina. Instead of absolute black, use a 'tinted dark'.",
      captions: {
        linkedin: {
          hook: `Designers: Stop using pure black (#000000).`,
          context: `It creates massive contrast that over-stimulates the retina.`,
          mainInsight: `Using a tinted dark instead increases readability and feels instantly more premium. Industry leaders like Stripe and Linear use elevated grays.`,
          keyTakeaways: ["Never use #000000", "Inject 2-5% brand color into a dark base", "Test readability"],
          cta: `How are you handling dark mode in your current projects?`,
          hashtags: ["#UIDesign", "#UX", "#DesignSystems"]
        },
        instagram: {
          hook: `Are you making this rookie color mistake? 🛑 Stop using pure black!`,
          story: `It causes eye strain and feels cheap. Try a deep, cool-toned gray instead for that premium feel. ✨`,
          lesson: `Elevated grays increase readability and reduce contrast fatigue.`,
          cta: `Check our stories for exact hex codes! 👇`,
          hashtags: ["#UIDesign", "#UXTips", "#Figma"]
        },
        facebook: {
          opening: `Hey designers!`,
          problem: `We just audited a major app and found they were using pure black backgrounds.`,
          advice: `Switching to a tinted dark increased reading time by 12% across their entire community!`,
          example: `Try using #09090B instead of #000000.`,
          question: `What's your go-to dark mode color?`,
          hashtags: ["#UIDesign", "#DarkMode"]
        },
        twitter: {
          singleTweet: `Pure black (#000000) is ruining your dark mode. Use #09090B instead. Better readability. Premium feel. Your users will thank you. 🌙`,
          threadVersion: [
            `Stop using pure black (#000000) in your UI designs. Here is why. 🧵`,
            `1/ Extreme contrast causes eye fatigue on OLED screens.`,
            `2/ It feels cheap. Premium brands use tinted darks instead.`
          ],
          hashtags: ["#UI", "#UX"]
        },
        youtube: {
          seoTitle: `Stop Using Pure Black in UI Design (#000000)`,
          description: `Learn why pure black causes eye strain and how to design premium dark mode interfaces.`,
          whatYouWillLearn: ["Why pure black is bad", "How to pick dark mode colors", "Examples from top brands"],
          chapters: ["0:00 Intro", "1:30 The Problem with #000000", "3:00 How to Fix It"],
          cta: `Subscribe for more UI/UX tips!`,
          keywords: ["dark mode", "ui design", "color theory"],
          hashtags: ["#UIDesign", "#UXDesign"]
        }
      },
      actionableTakeaways: [
        "Never use #000000 for backgrounds in dark mode.",
        "Inject 2-5% of your primary brand color into a dark gray base."
      ],
      cta: "Have you audited your dark mode colors recently? Let me know your favorite dark hex code below! 👇",
      imagePrompt: "A fully designed premium social media graphic. A sleek, cinematic dark mode UI card floating on a dark tinted background (#09090B). The card has a bold typography headline 'Stop Using Pure Black', supporting text below, and a comparison graphic showing #000000 vs #09090B. Modern typography hierarchy, clean grid system, subtle glowing UI elements, and sleek layout. Looks like a professional Figma export from Stripe or Linear.",
      hashtags: ["#UIDesign", "#UXDesign", "#ColorTheory", "#ProductDesign", "#DesignSystem", "#Figma", "#DarkMode", "#UXTips"],
      keywords: ["UI color theory", "Dark mode best practices", "Figma color palette", "How to design dark mode", "UI design tips"]
    };
  } else {
    return {
      format: 'carousel',
      topicTitle: "The Psychology of Micro-Interactions in Product Design",
      coverTitle: "Why Your App Feels 'Cheap' (And How to Fix It)",
      whyThisMatters: "Without purposeful motion, digital products feel broken and robotic. Micro-interactions build immediate subconscious trust.",
      captions: {
        linkedin: {
          hook: `Have you ever used an app that functioned perfectly, but just felt... cheap?`,
          context: `The problem usually isn't the visual design. It's the lack of purposeful motion.`,
          mainInsight: `Without purposeful motion, digital products feel broken and robotic. Micro-interactions build immediate subconscious trust.`,
          keyTakeaways: ["Audit your app for missing visual feedback", "Use spring physics", "Motion equals emotion"],
          cta: `What is your favorite app for micro-interactions?`,
          hashtags: ["#ProductDesign", "#MicroInteractions", "#UXDesign"]
        },
        instagram: {
          hook: `Why does your app feel cheap? 📱`,
          story: `The problem usually isn't the visual design. It's the lack of purposeful motion.`,
          lesson: `Micro-interactions build immediate subconscious trust.`,
          cta: `Drop your favorite app in the comments! 👇`,
          hashtags: ["#ProductDesign", "#MotionDesign", "#UIDesign"]
        },
        facebook: {
          opening: `Hey community!`,
          problem: `Have you ever used an app that functioned perfectly, but just felt... cheap?`,
          advice: `The problem usually isn't the visual design. It's the lack of purposeful motion.`,
          example: `Think about the heart animation when you like a post.`,
          question: `What is your favorite app for micro-interactions?`,
          hashtags: ["#UXDesign", "#AppDesign"]
        },
        twitter: {
          singleTweet: `Have you ever used an app that functioned perfectly, but just felt... cheap? The problem usually isn't the visual design. It's the lack of purposeful motion.`,
          threadVersion: [
            `Why your app feels cheap (and how to fix it) 🧵`,
            `1/ Visual design isn't everything. Motion is emotion.`,
            `2/ Micro-interactions build immediate subconscious trust.`
          ],
          hashtags: ["#UXDesign", "#MotionDesign"]
        },
        youtube: {
          seoTitle: `The Psychology of Micro-Interactions in App Design`,
          description: `Learn how purposeful motion can instantly elevate the perceived value of your digital products.`,
          whatYouWillLearn: ["What are micro-interactions?", "Spring physics vs linear", "Best practices"],
          chapters: ["0:00 Intro", "1:45 The Cheap Feeling", "4:00 How to use motion"],
          cta: `Subscribe for weekly product design breakdowns!`,
          keywords: ["micro interactions", "motion design", "ux design"],
          hashtags: ["#ProductDesign", "#UXDesign"]
        }
      },
      slides: [
        {
          heading: "The 'Cheap' Feeling",
          description: "Have you ever used an app that functioned perfectly, but just felt... cheap? The problem usually isn't the visual design. It's the lack of motion.",
          imagePrompt: "A beautiful, moody shot of a smartphone in a dark room. Editorial photography, Luxury minimalism, Modern composition, Professional designer workspace, Cinematic lighting, Soft shadows, Depth of field, Ultra realistic, 8K, 16:9, Background artwork only, NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARK, NO BRANDING"
        },
        {
          heading: "What are Micro-Interactions?",
          description: "Micro-interactions are subtle animations that provide immediate visual feedback. A button pressing down. A toggle gliding over. A success checkmark drawing itself.",
          imagePrompt: "A sleek, glowing digital toggle switch morphing and animating on a dark glassmorphic card. Editorial photography, Luxury minimalism, Modern composition, Professional designer workspace, Cinematic lighting, Soft shadows, Depth of field, Ultra realistic, 8K, 16:9, Background artwork only, NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARK, NO BRANDING"
        }
      ],
      actionableTakeaways: [
        "Audit your app for interactions that lack visual feedback.",
        "Implement spring physics instead of linear animations for natural feel."
      ],
      cta: "What is your favorite app for micro-interactions? Drop it in the comments! 👇",
      hashtags: ["#ProductDesign", "#MicroInteractions", "#UXDesign", "#MotionDesign", "#UIDesign", "#Figma", "#AppDesign", "#UXPsychology"],
      keywords: ["Micro interactions UI", "UX motion design", "Framer animations", "How to improve app UX", "Perceived value in design"]
    };
  }
};

export const generateContent = async (format: 'single' | 'carousel'): Promise<DesignContentResult> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("No Gemini API Key found. Falling back to mock data.");
      return generateContentMock(format);
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const schemaObj = format === 'single' ? {
      type: 'OBJECT',
      properties: {
        format: { type: 'STRING', description: 'Always exactly "single"' },
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
        imagePrompt: { type: 'STRING' },
        hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate exactly 20 hashtags' },
        keywords: { type: 'ARRAY', items: { type: 'STRING' } }
      },
      required: ["format", "topicTitle", "whyThisMatters", "hook", "professionalCaption", "captions", "actionableTakeaways", "cta", "imagePrompt", "hashtags", "keywords"]
    } : {
      type: 'OBJECT',
      properties: {
        format: { type: 'STRING', description: 'Always exactly "carousel"' },
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
              imagePrompt: { type: 'STRING' }
            },
            required: ["heading", "description", "imagePrompt"]
          }
        },
        actionableTakeaways: { type: 'ARRAY', items: { type: 'STRING' } },
        cta: { type: 'STRING' },
        hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate exactly 20 hashtags' },
        keywords: { type: 'ARRAY', items: { type: 'STRING' } }
      },
      required: ["format", "topicTitle", "coverTitle", "whyThisMatters", "captions", "slides", "actionableTakeaways", "cta", "hashtags", "keywords"]
    };

    const designTopics = [
      "Color Theory & Accessibility", "Micro-interactions & Delight", "Advanced Form Design",
      "Typography Hierarchy", "Designing Empty States", "User Onboarding Flows",
      "Perfecting Dark Mode", "Mobile Navigation Patterns", "Call to Action Placement",
      "Error Handling & Validation", "Spacing, Padding & Grids", "Dashboard Data Visualization",
      "Skeuomorphism vs Flat Design", "Designing for Trust", "Iconography Best Practices"
    ];
    const randomTopic = designTopics[Math.floor(Math.random() * designTopics.length)];
    const seed = Math.random().toString(36).substring(2, 9);

    const prompt = `Today's objective:
Research current discussions from trusted design sources about: ${randomTopic}.
Find ONE interesting topic that has momentum today.
Transform it into a practical lesson.
Generate ONE completely original educational social media post.
Format requested: ${format.toUpperCase()}.

[Random Seed to guarantee uniqueness: ${seed}]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: schemaObj as any,
        temperature: 0.8,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DesignContentResult;
    }
    throw new Error("No text in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return generateContentMock(format);
  }
};
