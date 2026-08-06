import { DesignContentResult } from '../types';

export const generateContentMock = async (format: 'single' | 'carousel'): Promise<DesignContentResult> => {
  // Simulate network delay for AI processing
  await new Promise((resolve) => setTimeout(resolve, 3500));

  if (format === 'single') {
    return {
      format: 'single',
      topicTitle: "Stop using pure black (#000000) in your UI designs.",
      hook: "If your dark mode looks harsh and causes eye strain, you're probably making this one critical color mistake. 👇",
      postContent: "Pure black (#000000) against pure white (#FFFFFF) creates a massive contrast ratio that actually over-stimulates the retina. This leads to eye fatigue, especially when reading long paragraphs of text.\n\nInstead of absolute black, use a 'tinted dark'. By mixing a tiny amount of your primary brand color (like a deep navy or rich plum) into a dark gray (e.g., #0F172A), you achieve two things:\n\n1. You reduce eye strain significantly.\n2. You create a deeply premium, cohesive aesthetic that feels custom to your brand.\n\nTake a look at companies like Linear, Stripe, or Vercel. None of them use pure black. They use extremely dark, cool-toned grays that feel softer and more sophisticated.\n\nThe next time you set up your design system variables, replace #000000 with something like #09090B. Your users' eyes will thank you.",
      cta: "Have you audited your dark mode colors recently? Let me know your favorite dark hex code below! 👇",
      imagePrompt: "A sleek, cinematic macro shot of a designer's workspace. A glowing monitor displaying a sophisticated color palette interface in Figma, transitioning from pure black to a premium tinted dark navy. Glassmorphism UI elements floating softly. Luxury, modern, ultra HD, 8k, dark mode aesthetic, purple and blue ambient lighting. --ar 16:9",
      hashtags: ["#UIDesign", "#UXDesign", "#ColorTheory", "#ProductDesign", "#DesignSystem", "#Figma", "#DarkMode", "#UXTips"],
      keywords: ["UI color theory", "Dark mode best practices", "Figma color palette", "How to design dark mode", "UI design tips"]
    };
  }

  // Carousel format
  return {
    format: 'carousel',
    topicTitle: "The Psychology of Micro-Interactions in Product Design",
    coverTitle: "Why Your App Feels 'Cheap' (And How to Fix It)",
    slides: [
      {
        heading: "The 'Cheap' Feeling",
        description: "Have you ever used an app that functioned perfectly, but just felt... cheap? The problem usually isn't the visual design. It's the lack of motion.",
        imagePrompt: "A beautiful, moody shot of a smartphone in a dark room. The screen shows a generic, lifeless UI. Premium cinematic lighting, dark background, ultra-realistic. --ar 4:5"
      },
      {
        heading: "What are Micro-Interactions?",
        description: "Micro-interactions are subtle animations that provide immediate visual feedback. A button pressing down. A toggle gliding over. A success checkmark drawing itself.",
        imagePrompt: "A sleek, glowing digital toggle switch morphing and animating on a dark glassmorphic card. Neon purple accents, futuristic, highly detailed 3D render. --ar 4:5"
      },
      {
        heading: "The Psychological Impact",
        description: "Humans crave physical feedback. When we push a physical button, it resists, then clicks. Micro-interactions recreate this tactile satisfaction in a digital space.",
        imagePrompt: "An abstract, premium 3D visualization of a human brain connected to digital UI elements by glowing, fiber-optic threads. Luxury aesthetic, blue and purple lighting. --ar 4:5"
      },
      {
        heading: "The Common Mistake",
        description: "Junior designers often use linear animations. Things start and stop abruptly. This feels robotic and unnatural.",
        imagePrompt: "A chaotic, glitching UI wireframe glowing aggressively in red, symbolizing harsh, broken movement. Dark cinematic lighting, depth of field. --ar 4:5"
      },
      {
        heading: "The Solution: Spring Physics",
        description: "Use spring animations or custom easing curves (like cubic-bezier). Objects should accelerate quickly and decelerate smoothly, mimicking real-world physics.",
        imagePrompt: "A beautiful, glowing mathematical bezier curve graph overlaid on a sleek, dark mode UI component. High contrast, technical yet artistic, premium finish. --ar 4:5"
      },
      {
        heading: "Key Takeaway",
        description: "Good design is invisible. Great design feels alive. Add purposeful motion to your core interactions, and watch your perceived product value skyrocket.",
        imagePrompt: "A glowing, levitating diamond shape surrounded by soft, dynamic ripples of light. Symbolizing high value and fluid motion. Dark luxury aesthetic. --ar 4:5"
      }
    ],
    cta: "What is your favorite app for micro-interactions? Drop it in the comments! 👇",
    hashtags: ["#ProductDesign", "#MicroInteractions", "#UXDesign", "#MotionDesign", "#UIDesign", "#Figma", "#AppDesign", "#UXPsychology"],
    keywords: ["Micro interactions UI", "UX motion design", "Framer animations", "How to improve app UX", "Perceived value in design"]
  };
};
