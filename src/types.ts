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

export interface PlatformCaptions {
  linkedin: string;
  instagram: string;
  facebook: string;
  twitter: string;
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
  dailySuggestedTopic: string;
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
  shotList: string[];
  bRollIdeas: string[];
  thumbnailPrompt: string;
  generatedAt: string;
}

export interface DesignContentResultV2Single {
  format: 'single';
  topicTitle: string;
  whyThisMatters: string;
  hook: string;
  professionalCaption: string;
  captions: PlatformCaptions;
  cta: string;
  imagePrompt: string;
  hashtags: string[];
  keywords: string[];
}

export interface DesignContentResultV2Carousel {
  format: 'carousel';
  topicTitle: string;
  coverTitle: string;
  whyThisMatters: string;
  caption: string;
  slides: {
    heading: string;
    description: string;
    imagePrompt: string;
  }[];
  cta: string;
  hashtags: string[];
  keywords: string[];
}

export type DesignContentResult = DesignContentResultV2Single | DesignContentResultV2Carousel;
