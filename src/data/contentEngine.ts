import { DesignContentResult } from '../types';

export const generateContentMock = async (format: 'single' | 'carousel'): Promise<DesignContentResult> => {
  // Simulate network delay for AI processing
  await new Promise((resolve) => setTimeout(resolve, 3500));

  if (format === 'single') {
    const isFirst = Math.random() > 0.5;
    
    if (isFirst) {
      return {
        format: 'single',
        topicTitle: "Stop using pure black (#000000) in your UI designs.",
        hook: "If your dark mode looks harsh and causes eye strain, you're probably making this one critical color mistake. 👇",
        postContent: "Pure black (#000000) against pure white (#FFFFFF) creates a massive contrast ratio that actually over-stimulates the retina. This leads to eye fatigue, especially when reading long paragraphs of text.\n\nInstead of absolute black, use a 'tinted dark'. By mixing a tiny amount of your primary brand color (like a deep navy or rich plum) into a dark gray (e.g., #0F172A), you achieve two things:\n\n1. You reduce eye strain significantly.\n2. You create a deeply premium, cohesive aesthetic that feels custom to your brand.\n\nTake a look at companies like Linear, Stripe, or Vercel. None of them use pure black. They use extremely dark, cool-toned grays that feel softer and more sophisticated.\n\nThe next time you set up your design system variables, replace #000000 with something like #09090B. Your users' eyes will thank you.",
        cta: "Have you audited your dark mode colors recently? Let me know your favorite dark hex code below! 👇",
        imagePrompt: "A sleek, cinematic macro shot of a designer's workspace. A glowing monitor displaying a sophisticated color palette transitioning from pure black to a premium tinted dark navy. Glassmorphism UI elements floating softly. Luxury, modern, dark mode aesthetic, purple and blue ambient lighting. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9",
        hashtags: ["#UIDesign", "#UXDesign", "#ColorTheory", "#ProductDesign", "#DesignSystem", "#Figma", "#DarkMode", "#UXTips"],
        keywords: ["UI color theory", "Dark mode best practices", "Figma color palette", "How to design dark mode", "UI design tips"]
      };
    } else {
      return {
        format: 'single',
        topicTitle: "Why 'White Space' is Your Most Powerful Design Tool",
        hook: "If your UI feels cluttered and overwhelming, the solution isn't to make things smaller. It's to add nothing at all. 👇",
        postContent: "White space (or negative space) is often misunderstood by non-designers as 'wasted space'. In reality, it is the active element that binds your layout together.\n\nWhen elements are crammed too closely, the user's brain has to work incredibly hard to parse the visual hierarchy. By intentionally increasing your margins and paddings, you give the content room to breathe.\n\nGenerous white space does three things instantly:\n1. It increases reading comprehension by up to 20%.\n2. It draws the eye naturally to your primary Call to Action.\n3. It elevates the perceived value of your product (think about luxury brands—they always use massive amounts of negative space).\n\nDon't be afraid of emptiness. Use it strategically to guide your user's attention exactly where it needs to go.",
        cta: "Do you struggle with adding enough white space to your designs? Let's discuss below! 👇",
        imagePrompt: "An ultra-minimalist, high-end architectural interior with massive amounts of clean, empty space. A single, beautifully lit sculptural object sitting in the center. Extreme negative space, stark contrast, luxury aesthetic, soft ambient lighting. NO TEXT, NO TYPOGRAPHY, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS, NO SIGNAGE, NO CAPTIONS, NO UI LABELS, NO BRAND NAMES, NO POSTER DESIGN, NO MAGAZINE COVER, NO INFOGRAPHIC, CLEAN VISUAL ONLY. editorial photography, premium composition, ultra realistic, highly detailed, cinematic lighting, clean background, no text, no typography, no letters, no words, no numbers, no logos, no watermark, no branding, background illustration only, 8K, Ultra HD, --ar 16:9",
        hashtags: ["#UIDesign", "#UXDesign", "#WhiteSpace", "#Minimalism", "#DesignTips", "#ProductDesign", "#WebDesign", "#UXPsychology"],
        keywords: ["UI white space", "Minimalist design tips", "Visual hierarchy UI", "How to use negative space", "Improve UI layout"]
      };
    }
  }

  // Carousel format
  const isFirstCarousel = Math.random() > 0.5;

  if (isFirstCarousel) {
    return {
      format: 'carousel',
      topicTitle: "The Psychology of Micro-Interactions in Product Design",
      coverTitle: "Why Your App Feels 'Cheap' (And How to Fix It)",
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
      cta: "What is your favorite app for micro-interactions? Drop it in the comments! 👇",
      hashtags: ["#ProductDesign", "#MicroInteractions", "#UXDesign", "#MotionDesign", "#UIDesign", "#Figma", "#AppDesign", "#UXPsychology"],
      keywords: ["Micro interactions UI", "UX motion design", "Framer animations", "How to improve app UX", "Perceived value in design"]
    };
  } else {
    return {
      format: 'carousel',
      topicTitle: "How to Design Forms that Actually Convert",
      coverTitle: "Stop Losing Users at the Signup Form",
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
      cta: "What's the worst form you've ever had to fill out? Let's vent in the comments! 😅👇",
      hashtags: ["#UXDesign", "#UIForms", "#ConversionRate", "#WebDesign", "#ProductDesign", "#DesignTips", "#UXResearch", "#UIUX"],
      keywords: ["Form design best practices", "How to increase form conversions", "UX UI form layout", "Inline validation UI"]
    };
  }
};
