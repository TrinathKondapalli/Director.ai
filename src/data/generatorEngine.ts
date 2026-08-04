import { MasterPromptInput, MasterPromptResult } from '../types';

export function buildUgcMasterPromptText(input: MasterPromptInput): string {
  const productName = input.productName?.trim() || 'Smart Productivity Tool';
  const targetAudience = input.targetAudience?.trim() || 'Tech-savvy creators and busy professionals';
  const productUrl = input.productUrl?.trim() || '';

  return `[DIRECTOR.AI - PRODUCTION-READY MASTER PROMPT FOR AI UGC ADS]

# 1. CREATIVE STRATEGY & MARKETING BLUEPRINT
- Product Name: ${productName}${productUrl ? ` (${productUrl})` : ''}
- Target Audience: ${targetAudience}
- Marketing Objective: High-Converting E-Commerce / Lead Conversion
- Core Marketing Angle: Unfiltered "I wish I knew this earlier" problem-to-solution revelation
- Primary Pain Point: Persistent daily friction and frustration with traditional options
- Desired Emotion: Instant relief, intrigue, and urgent buy-intent
- Platform Optimization: TikTok, Instagram Reels, YouTube Shorts (9:16 Vertical)

# 2. VIRAL HOOK & STORYTELLING STRUCTURE
- Unfiltered Hook (0-2s): "Stop scrolling right now if you struggle with [Pain Point]!"
- Storytelling Concept: Candid, handheld selfie-style video. Creator holds ${productName} in authentic lighting, demonstrating immediate value and relatable awe.
- Call To Action (8-10s): "Tap below right now to get ${productName} before stock sells out!"

# 3. CHARACTER & ENVIRONMENT DIRECTION
- Character Profile: Relatable 24-30 year old creator, casual modern streetwear, natural expressive facial features, highly authentic eye contact with camera lens.
- Setting: Bright, natural cozy room with soft daylight filtering in, clean clutter-free background.
- Performance: Energetic, candid, trustworthy, zero artificial infomercial vibes.

# 4. CONSISTENCY & CONTINUITY LOCKS
[A] CHARACTER CONSISTENCY LOCK:
- Evaluation Mode: Single Creator Testimonial / Product Review (Strict 100% Identity Continuity)
- Preserved Identity Anchors:
  • Face & Facial Structure: Unchanged throughout all 10s video sequence
  • Age & Gender: Consistent 26-year-old female/male actor
  • Hairstyle & Color: Locked texture, length, and hair parting
  • Clothing & Style: Identical casual modern hoodie/tee across all shot changes
  • Accessories & Details: Matching delicate ring/earrings, identical skin tone
  • Expressions & Body Language: Natural authentic micro-expressions & movement
  • Voice Style & Tone: Uniform natural conversational acoustic cadence
- Anti-Morphing Negative Directives:
  • STRICTLY PREVENT: Face swapping, clothing changes, hairstyle shifts, identity flickering, AI skin-smoothing morphing, inconsistent eye colors, or frame-to-frame body proportion drift.
  *(Note: If creative concept uses multi-actor montage, intentionally assign distinct actors while preserving visual grade & brand story).*

[B] ENVIRONMENT CONSISTENCY LOCK:
- Locked Spatial Elements:
  • Room Architecture: Identical modern aesthetic living space / bedroom corner
  • Furniture & Props: Consistent desk, planter, and wall decor placement
  • Lighting & Time of Day: Steady 5600K soft daylight filtering from camera-left window
  • Color Grading & Camera Style: Matching 35mm filmic tone, zero sudden white-balance or contrast shifts

[C] PRODUCT CONSISTENCY LOCK:
- Locked Physical Attributes for ${productName}:
  • Product Geometry & Size: Identical scale relative to creator's hand in all angles
  • Color & Finish: Exact Pantone shade, satin/matte finish with matching specular highlights
  • Branding & Packaging: Crisp high-contrast logo placement, clear legible label typography
  • Texture & Reflections: Photorealistic material reflections, zero warping or AI geometry melting

# 5. SCENE TIMELINE (10-SECOND CINEMATIC FLOW)
[0.0s - 2.0s] Phase: Pattern Interrupt Hook
• Camera: Close-up handheld selfie angle, 24mm prime lens, slight natural micro-wobble.
• Visual: Creator looks directly into camera with shocked facial expression, holding ${productName}.
• Voice Audio: "Stop scrolling right now!"

[2.0s - 5.0s] Phase: Problem Agitation & Discovery
• Camera: Quick snap zoom to medium shot.
• Visual: Creator demonstrates the common struggle vs how ${productName} effortlessly solves it.
• Voice Audio: "I tested ${productName} for a week, and it literally solved everything."

[5.0s - 8.0s] Phase: Macro Benefit Reveal
• Camera: Macro 85mm close-up, shallow depth of field (f/1.8), smooth pan over product texture.
• Visual: Close-up of ${productName} in action showing instant high-end finish and transformation.
• Voice Audio: "Look at how incredible this actually works!"

[8.0s - 10.0s] Phase: High-Converting Call To Action
• Camera: Front-facing close-up, creator points down toward link overlay.
• Visual: Creator smiles, pointing toward bottom CTA area with ${productName} in frame.
• Voice Audio: "Tap below right now to grab yours today!"

# 6. CAMERA, LIGHTING & VISUAL STYLE
- Lens: 24mm f/1.8 wide for selfie scenes | 85mm f/1.8 macro for product close-up
- Camera Movement: Handheld organic tracking with natural movement
- Lighting: Soft warm window key light (5600K) + subtle ambient fill
- Visual Grade: Photorealistic 4K 60fps render, natural skin tones, zero AI plastic smoothing
- Color Palette: Punchy vibrant product tones with clean neutral backdrop

# 7. SOUND DESIGN & AUDIO ENGINE
- Natural Voice Script: "Stop scrolling right now! I tested ${productName} for a week, and it literally solved everything. Look at how incredible this actually works! Tap below right now to grab yours today!"
- Background Music: Upbeat trending lo-fi / indie pop instrumental, mixed cleanly under voiceover
- Sound Effects (SFX): Soft whoosh on snap zoom (2.0s), crisp pop sound effect on product reveal (5.0s), subtle chime on CTA (8.0s)

# 8. CALL TO ACTION & THUMBNAIL PROMPT
- Primary CTA: "Tap Below To Shop ${productName} Now"
- Thumbnail Prompt: High-contrast close-up shot of creator holding ${productName} with shocked facial expression in bright natural sunlight, 4K render.

[GENERATED BY DIRECTOR.AI - ZERO DATA FOOTPRINT / PRIVACY PROTECTED]`;
}

export function generateLocalMasterPrompt(input: MasterPromptInput): MasterPromptResult {
  const productName = input.productName?.trim() || 'Featured Product';
  const masterPromptText = buildUgcMasterPromptText(input);

  return {
    title: `${productName} — Production-Ready Master Prompt`,
    subtitle: 'Generated by Director.ai • Optimized for Veo, Flow, Kling, Runway & Luma',
    productName,
    masterPromptText,
    generatedAt: new Date().toISOString(),
    creativeStrategy: {
      objective: 'High-Converting UGC Sales Campaign',
      targetAudience: input.targetAudience || 'Target Consumers',
      painPoint: 'Frustration with traditional alternatives',
      desiredEmotion: 'Urgent curiosity & instant trust',
      marketingAngle: 'Pattern-Interrupt Problem-to-Solution Transformation',
    },
  };
}
