export interface UgcStudioInput {
  industry: string;
  product: string;
  service: string;
  brand: string;
  websiteUrl?: string;
  targetAudience: string;
  platform: string;
  tone: string;
  goal: string;
  isRandom: boolean;
}

export interface UgcTopic {
  id: string;
  industry: string;
  productCategory: string;
  brandName: string;
  targetAudience: string;
  corePainPoint: string;
  solution: string;
  visualHookAngle: string;
  why: string;
  tone: string;
}

export interface UgcTopic {
  id: string;
  category: string;
  conceptName: string;
  description: string;
  targetAudience: string;
  emotionalHook: string;
}

export interface DesignTopic {
  id: number;
  title: string;
  category: string;
}

export interface PlatformCaptions {
  linkedin: { hook: string; context: string; mainInsight: string; keyTakeaways: string[]; cta: string; hashtags: string[]; };
  instagram: { hook: string; story: string; lesson: string; cta: string; hashtags: string[]; };
  facebook: { opening: string; problem: string; advice: string; example: string; question: string; hashtags: string[]; };
  twitter: { singleTweet: string; threadVersion: string[]; hashtags: string[]; };
  youtube: { seoTitle: string; description: string; whatYouWillLearn: string[]; chapters: string[]; cta: string; keywords: string[]; hashtags: string[]; };
}

export interface VideoPrompt {
  videoConcept: string;
  hook: string;
  sceneObjective: string;
  sceneDescription: string;
  characterDescription: string;
  characterAppearance: string;
  characterClothing: string;
  characterExpressions: string;
  characterEmotions: string;
  characterActions: string;
  cameraAngle: string;
  cameraMovement: string;
  cameraLens: string;
  cameraDistance: string;
  framing: string;
  lighting: string;
  environment: string;
  background: string;
  props: string;
  colorPalette: string;
  composition: string;
  cinematicStyle: string;
  visualStyle: string;
  transition: string;
  motionDetails: string;
  videoQuality: string;
  renderingStyle: string;
  aspectRatio: string;
  frameRate: string;
  duration: string;
  voiceoverScript: string;
  voiceStyle: string;
  voiceGender: string;
  voiceEmotion: string;
  voiceSpeed: string;
  accent: string;
  dialogue: string;
  backgroundMusic: string;
  soundEffects: string;
  ambientSounds: string;
  negativePrompt: string;
}

export interface UgcStudioResult {
  originalInput: UgcStudioInput;
  oneLineSummary: string;
  dailySuggestedTopic: string;
  creatorType?: string;
  coreIdea?: string;
  toneVibe?: string;
  ugcStory?: {
    hook: string;
    pain: string;
    product: string;
    result: string;
    cta: string;
  };
  storyboardTimeline?: {
    stage: 'HOOK' | 'PAIN' | 'PRODUCT' | 'RESULT' | 'CTA';
    timeRange: string;
    whatWeSee: string;
    whatCreatorDoes: string;
    whatCreatorSays: string;
    audioSfx: string;
  }[];
  masterUgcPrompt?: string;
  hook: string;
  problem: string;
  story: string;
  solution: string;
  callToAction: string;
  captions: PlatformCaptions;
  seoHashtags: string[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
  videoPrompt: VideoPrompt;
  videoHook: string;
  voiceoverScript: string;
  videoScriptTimeline: { time: string; action: string; audio: string }[];
  shotList: {
    sceneNumber: string;
    description: string;
    camera: string;
    movement: string;
    voice: string;
    sfx: string;
    transition: string;
  }[];
  bRollIdeas: string[];
  thumbnailPrompt: string;
  thumbnailStyle: string;
  generatedAt: string;
}

export interface DesignContentResultV2Single {
  format: 'single';
  visualType?: 'editorial_poster' | 'hero_object' | 'asymmetric_editorial' | 'visual_transformation' | 'diagrammatic' | 'typographic_experiment' | 'object_type' | 'full_bleed' | 'editorial_grid' | 'abstract_concept';
  topicTitle: string;
  whyThisMatters: string;
  hook: string;
  professionalCaption: string;
  captions: PlatformCaptions;
  actionableTakeaways: string[];
  cta: string;
  imagePrompt: string;
  imageText?: { headline: string; supporting?: string };
  tzinrSignatureText: string;
  tzinrSignaturePlacement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  hashtags: string[];
  keywords: string[];
}

export interface DesignContentResultV2Carousel {
  format: 'carousel';
  visualType?: 'editorial_poster' | 'hero_object' | 'asymmetric_editorial' | 'visual_transformation' | 'diagrammatic' | 'typographic_experiment' | 'object_type' | 'full_bleed' | 'editorial_grid' | 'abstract_concept';
  topicTitle: string;
  coverTitle: string;
  whyThisMatters: string;
  captions: PlatformCaptions;
  slides: {
    heading: string;
    description: string;
    imagePrompt: string;
    imageText?: { headline: string; supporting?: string };
  }[];
  tzinrSignatureText: string;
  tzinrSignaturePlacement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  actionableTakeaways: string[];
  cta: string;
  hashtags: string[];
  keywords: string[];
}

export type DesignContentResult = DesignContentResultV2Single | DesignContentResultV2Carousel;
