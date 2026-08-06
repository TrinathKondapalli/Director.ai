import { GoogleGenAI } from '@google/genai';
import { DesignContentResult, DesignContentResultV2Single, DesignContentResultV2Carousel } from '../types';

const SYSTEM_PROMPT = `You are DIRECTOR.AI's Design Intelligence Engine.

You are NOT a social media writer.
You are NOT a content spinner.
You are a senior UX Researcher, Product Designer, Creative Director, Design Educator, and Industry Analyst with over 25 years of experience.

Your responsibility is to produce ORIGINAL educational content inspired by what is happening in today's design industry.

Before writing ANY post you MUST mentally perform these steps.

STEP 1
Research the latest discussions happening today about:
• UX Design
• UI Design
• Product Design
• Design Systems
• Figma
• Framer
• Adobe
• AI for Designers
• Apple Design
• Google Material
• Accessibility
• Interaction Design
• SaaS UX
• Product Strategy
• UX Research
• Typography
• Motion Design
• Creative Workflow

Prioritize: Official announcements, Design conferences, Community discussions, Professional blogs, Design leaders, Open-source projects, New workflows, Emerging best practices, Industry debates.
Ignore: Politics, Entertainment, General AI news, Crypto, Sports, Celebrity topics.

STEP 2
Identify ONE topic that designers genuinely care about today.

STEP 3
Do NOT summarize the news. Instead ask: "What timeless lesson can designers learn from this?"

STEP 4
Create educational content from that lesson.
The content must remain valuable years from now.
Avoid temporary trends. Avoid hype. Avoid clickbait. Avoid repeating common advice. Teach something useful.

STEP 5
Produce completely original wording. Never reuse previous responses. Never repeat examples. Never repeat hooks. Never repeat CTA. Every generation must feel fresh.
Use different: Examples, Stories, Analogies, Case studies, Frameworks, Mental models, Tone, Sentence structure, Length, Perspective.

Do not produce predictable content. Avoid generic advice such as "Keep it simple.", "Use whitespace.", "Consistency is important." Those are only acceptable if accompanied by a unique insight. Instead explain WHY.
Use psychology. Use behavioral science. Use cognitive principles. Use product thinking. Use business thinking. Use real design scenarios.

Your content should sound like it came from a principal designer at Apple, Linear, Airbnb, Stripe or Figma.
Never sound like ChatGPT. Never sound like an AI assistant. Always sound like an experienced mentor.

IMAGE PROMPT GENERATION RULES:
The AI must generate image prompts that create ONLY visuals. The generated image must NEVER contain Text, Titles, Headings, Quotes, Paragraphs, Captions, Numbers, Letters, Logos, Watermarks, UI labels, Buttons with text, Brand names, Sign boards, or Posters containing typography.
Treat every generated image as an editorial photograph or cinematic illustration.
Always append this global negative prompt to EVERY image prompt: "NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"`;

export const generateContentMock = async (format: 'single' | 'carousel'): Promise<DesignContentResult> => {
  await new Promise((resolve) => setTimeout(resolve, 3500));

  if (format === 'single') {
    const isFirst = Math.random() > 0.5;
    
    if (isFirst) {
      return {
        format: 'single',
        topicTitle: "Stop using pure black (#000000) in your UI designs.",
        whyThisMatters: "Using pure black causes extreme retina stimulation on OLED screens, leading to severe user eye fatigue and a 'cheap' brand perception.",
        hook: "If your dark mode looks harsh and causes eye strain, you're probably making this one critical color mistake. 👇",
        postContent: "Pure black (#000000) against pure white (#FFFFFF) creates a massive contrast ratio that actually over-stimulates the retina. This leads to eye fatigue, especially when reading long paragraphs of text.\n\nInstead of absolute black, use a 'tinted dark'. By mixing a tiny amount of your primary brand color (like a deep navy or rich plum) into a dark gray (e.g., #0F172A), you achieve two things:\n\n1. You reduce eye strain significantly.\n2. You create a deeply premium, cohesive aesthetic that feels custom to your brand.\n\nTake a look at companies like Linear, Stripe, or Vercel. None of them use pure black. They use extremely dark, cool-toned grays that feel softer and more sophisticated.\n\nThe next time you set up your design system variables, replace #000000 with something like #09090B. Your users' eyes will thank you.",
        actionableTakeaways: [
          "Never use #000000 for backgrounds in dark mode.",
          "Inject 2-5% of your primary brand color into a dark gray base.",
          "Check contrast ratios to ensure text remains legible but soft."
        ],
        cta: "Have you audited your dark mode colors recently? Let me know your favorite dark hex code below! 👇",
        imagePrompt: "A sleek, cinematic macro shot of a designer's workspace. A glowing monitor displaying a sophisticated color palette transitioning from pure black to a premium tinted dark navy. Glassmorphism UI elements floating softly. Luxury, modern, dark mode aesthetic, purple and blue ambient lighting. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9",
        hashtags: ["#UIDesign", "#UXDesign", "#ColorTheory", "#ProductDesign", "#DesignSystem", "#Figma", "#DarkMode", "#UXTips"],
        keywords: ["UI color theory", "Dark mode best practices", "Figma color palette", "How to design dark mode", "UI design tips"]
      };
    } else {
      return {
        format: 'single',
        topicTitle: "Why 'White Space' is Your Most Powerful Design Tool",
        whyThisMatters: "Cognitive overload is the #1 reason users abandon interfaces. Proper white space reduces cognitive load by up to 30%.",
        hook: "If your UI feels cluttered and overwhelming, the solution isn't to make things smaller. It's to add nothing at all. 👇",
        postContent: "White space (or negative space) is often misunderstood by non-designers as 'wasted space'. In reality, it is the active element that binds your layout together.\n\nWhen elements are crammed too closely, the user's brain has to work incredibly hard to parse the visual hierarchy. By intentionally increasing your margins and paddings, you give the content room to breathe.\n\nGenerous white space does three things instantly:\n1. It increases reading comprehension by up to 20%.\n2. It draws the eye naturally to your primary Call to Action.\n3. It elevates the perceived value of your product (think about luxury brands—they always use massive amounts of negative space).\n\nDon't be afraid of emptiness. Use it strategically to guide your user's attention exactly where it needs to go.",
        actionableTakeaways: [
          "Double your standard padding around critical CTA buttons.",
          "Use a 4pt or 8pt grid system to mathematically structure your empty space.",
          "Group related elements tightly, but separate distinct sections with massive margins."
        ],
        cta: "Do you struggle with adding enough white space to your designs? Let's discuss below! 👇",
        imagePrompt: "An ultra-minimalist, high-end architectural interior with massive amounts of clean, empty space. A single, beautifully lit sculptural object sitting in the center. Extreme negative space, stark contrast, luxury aesthetic, soft ambient lighting. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9",
        hashtags: ["#UIDesign", "#UXDesign", "#WhiteSpace", "#Minimalism", "#DesignTips", "#ProductDesign", "#WebDesign", "#UXPsychology"],
        keywords: ["UI white space", "Minimalist design tips", "Visual hierarchy UI", "How to use negative space", "Improve UI layout"]
      };
    }
  }

  const isFirstCarousel = Math.random() > 0.5;

  if (isFirstCarousel) {
    return {
      format: 'carousel',
      topicTitle: "The Psychology of Micro-Interactions in Product Design",
      coverTitle: "Why Your App Feels 'Cheap' (And How to Fix It)",
      whyThisMatters: "Without purposeful motion, digital products feel broken and robotic. Micro-interactions build immediate subconscious trust.",
      caption: "Have you ever used an app that functioned perfectly, but just felt... cheap? 📱\n\nThe problem usually isn't the visual design. It's the lack of purposeful motion. Micro-interactions are subtle animations that provide immediate visual feedback and recreate the tactile satisfaction of the physical world in a digital space.\n\nSwipe through to see how adding purposeful motion to your core interactions can skyrocket your perceived product value. 👉",
      slides: [
        {
          heading: "The 'Cheap' Feeling",
          description: "Have you ever used an app that functioned perfectly, but just felt... cheap? The problem usually isn't the visual design. It's the lack of motion.",
          imagePrompt: "A beautiful, moody shot of a smartphone in a dark room. The screen shows a generic, lifeless UI wireframe without any readable elements. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        },
        {
          heading: "What are Micro-Interactions?",
          description: "Micro-interactions are subtle animations that provide immediate visual feedback. A button pressing down. A toggle gliding over. A success checkmark drawing itself.",
          imagePrompt: "A sleek, glowing digital toggle switch morphing and animating on a dark glassmorphic card. Neon purple accents, futuristic, highly detailed 3D render. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        },
        {
          heading: "The Psychological Impact",
          description: "Humans crave physical feedback. When we push a physical button, it resists, then clicks. Micro-interactions recreate this tactile satisfaction in a digital space.",
          imagePrompt: "An abstract, premium 3D visualization of a human brain connected to digital UI elements by glowing, fiber-optic threads. Luxury aesthetic, blue and purple lighting. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        },
        {
          heading: "The Common Mistake",
          description: "Junior designers often use linear animations. Things start and stop abruptly. This feels robotic and unnatural.",
          imagePrompt: "A chaotic, glitching UI wireframe glowing aggressively in red, symbolizing harsh, broken movement. Dark cinematic lighting, depth of field. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        },
        {
          heading: "The Solution: Spring Physics",
          description: "Use spring animations or custom easing curves (like cubic-bezier). Objects should accelerate quickly and decelerate smoothly, mimicking real-world physics.",
          imagePrompt: "A beautiful, glowing mathematical bezier curve graph overlaid on a sleek, dark mode abstract component. High contrast, technical yet artistic, premium finish. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        },
        {
          heading: "Key Takeaway",
          description: "Good design is invisible. Great design feels alive. Add purposeful motion to your core interactions, and watch your perceived product value skyrocket.",
          imagePrompt: "A glowing, levitating diamond shape surrounded by soft, dynamic ripples of light. Symbolizing high value and fluid motion. Dark luxury aesthetic. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        }
      ],
      actionableTakeaways: [
        "Audit your app for interactions that lack visual feedback.",
        "Implement spring physics instead of linear animations for natural feel.",
        "Keep interaction times below 300ms to maintain speed."
      ],
      cta: "What is your favorite app for micro-interactions? Drop it in the comments! 👇",
      hashtags: ["#ProductDesign", "#MicroInteractions", "#UXDesign", "#MotionDesign", "#UIDesign", "#Figma", "#AppDesign", "#UXPsychology"],
      keywords: ["Micro interactions UI", "UX motion design", "Framer animations", "How to improve app UX", "Perceived value in design"]
    };
  } else {
    return {
      format: 'carousel',
      topicTitle: "How to Design Forms that Actually Convert",
      coverTitle: "Stop Losing Users at the Signup Form",
      whyThisMatters: "Forms are the ultimate bottleneck. A 10% increase in form completion can double a startup's revenue.",
      caption: "Forms are the highest point of friction in any digital product. Did you know every input field you add drops your conversion rate by roughly 5-10%? 📉\n\nIf you want to stop losing users at the signup form, you need to optimize for vertical momentum, use inline validation, and leverage browser autofill.\n\nSwipe to learn how to design forms that actually convert! 👉",
      slides: [
        {
          heading: "The Friction Point",
          description: "Forms are the highest point of friction in any digital product. Every input field you add drops your conversion rate by roughly 5-10%.",
          imagePrompt: "A macro shot of a sleek glassmorphic keyboard and a glowing input field. High tension, dark aesthetic, purple and blue neon lights. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        },
        {
          heading: "One Column is King",
          description: "Multiple columns disrupt the user's vertical momentum. Our eyes naturally scan downwards in a straight line. Keep your forms strictly to a single column layout.",
          imagePrompt: "A beautifully aligned, abstract vertical stack of glowing glass cards descending in perfect order. Minimalist, satisfying, luxury tech vibe. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        },
        {
          heading: "Inline Validation",
          description: "Don't wait until the user hits 'Submit' to tell them they made a mistake. Use real-time inline validation with clear, helpful visual cues.",
          imagePrompt: "A sleek checkmark icon glowing brightly in neon green against a dark premium UI surface, symbolizing success and validation. Shallow depth of field. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        },
        {
          heading: "Autofill is Mandatory",
          description: "Design your inputs with proper HTML autocomplete attributes. If the browser can fill it in for them, you've just saved them 30 seconds of frustration.",
          imagePrompt: "A futuristic AI core seamlessly assembling digital blocks, representing automation and speed. Blue and violet glowing circuits. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9"
        }
      ],
      actionableTakeaways: [
        "Remove all non-essential fields (ask later).",
        "Stack fields in a single column to reduce eye zigzagging.",
        "Use HTML autocomplete attributes extensively."
      ],
      cta: "What's the worst form you've ever had to fill out? Let's vent in the comments! 😅👇",
      hashtags: ["#UXDesign", "#UIForms", "#ConversionRate", "#WebDesign", "#ProductDesign", "#DesignTips", "#UXResearch", "#UIUX"],
      keywords: ["Form design best practices", "How to increase form conversions", "UX UI form layout", "Inline validation UI"]
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
    
    // We request the AI to return JSON using Structured Output
    const schemaObj = format === 'single' ? {
      type: 'OBJECT',
      properties: {
        format: { type: 'STRING', description: 'Always exactly "single"' },
        topicTitle: { type: 'STRING' },
        whyThisMatters: { type: 'STRING', description: 'A short sentence explaining why this topic is critical to business or psychology' },
        hook: { type: 'STRING' },
        postContent: { type: 'STRING' },
        actionableTakeaways: { type: 'ARRAY', items: { type: 'STRING' } },
        cta: { type: 'STRING' },
        imagePrompt: { type: 'STRING' },
        hashtags: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Generate exactly 20 hashtags' },
        keywords: { type: 'ARRAY', items: { type: 'STRING' } }
      },
      required: ["format", "topicTitle", "whyThisMatters", "hook", "postContent", "actionableTakeaways", "cta", "imagePrompt", "hashtags", "keywords"]
    } : {
      type: 'OBJECT',
      properties: {
        format: { type: 'STRING', description: 'Always exactly "carousel"' },
        topicTitle: { type: 'STRING' },
        coverTitle: { type: 'STRING' },
        whyThisMatters: { type: 'STRING', description: 'A short sentence explaining why this topic is critical to business or psychology' },
        caption: { type: 'STRING' },
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
      required: ["format", "topicTitle", "coverTitle", "whyThisMatters", "caption", "slides", "actionableTakeaways", "cta", "hashtags", "keywords"]
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

Requirements:
• Do not summarize the news.
• Teach a valuable lesson.
• Base it on psychology, usability, accessibility, product thinking or user behavior.
• Every generation must be different.
• Never repeat previous outputs.
• If a similar topic has already been generated, choose another.

[Random Seed to guarantee uniqueness: ${seed}]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: schemaObj as any,
        temperature: 0.7,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DesignContentResult;
    }
    throw new Error("No text in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    console.warn("Falling back to mock data.");
    return generateContentMock(format);
  }
};
