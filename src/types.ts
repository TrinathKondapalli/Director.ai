export interface MasterPromptInput {
  productName: string;
  targetAudience: string;
  productUrl?: string;
}

export interface PromptChunk {
  id: string;
  label: string;
  timeframe: string;
  text: string;
}

export interface YouTubePublishingPackage {
  title: string;
  description: string;
  hashtags: string[];
  thumbnailIdea: string;
  thumbnailPrompt: string;
  keywords: string[];
  categoryRecommendation: string;
  seoScore: number;
}

export interface InstagramPublishingPackage {
  caption: string;
  hashtags: string[];
  hook: string;
  callToAction: string;
  emojiSuggestions: string[];
}

export interface FacebookPublishingPackage {
  caption: string;
  hashtags: string[];
  hook: string;
  callToAction: string;
}

export interface MasterPromptResult {
  title: string;
  subtitle: string;
  productName: string;
  masterPromptText: string;
  generatedAt: string;
  creativeStrategy?: {
    objective: string;
    targetAudience: string;
    painPoint: string;
    desiredEmotion: string;
    marketingAngle: string;
  };
  youtubePackage?: YouTubePublishingPackage;
  instagramPackage?: InstagramPublishingPackage;
  facebookPackage?: FacebookPublishingPackage;
}

export interface AiConceptCard {
  id: string;
  conceptTitle: string;
  whyItWorks: string;
  targetAudience: string;
  recommendedCategory: string;
  nicheCategory: string; // e.g., 'Smart Wearables', 'Beauty & Skincare', etc.
  platformFocus?: string; // e.g., 'TikTok / Reels (9:16 UGC)'
  marketingAngle: string;
  hookIdea: string;
  emotionalTrigger: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  trendScore: number; // e.g., 99
  primaryCta: string;
  productNameExample: string;
}

export interface DesignContentResult {
  researchSummary: {
    topicTitle: string;
    source: string;
    date: string;
    summary: string;
    whyItMatters: string;
    keyTakeaways: string[];
    futureImpact: string;
    difficultyLevel: string;
    estimatedReadingTime: string;
  };
  linkedInPost: string;
  instagramCaption: string;
  facebookPost: string;
  twitter: {
    singleTweet: string;
    thread: string[];
  };
  imagePrompt: string;
  thumbnailPrompt: string;
  seoHashtags: {
    linkedin: string[];
    instagram: string[];
    twitter: string[];
  };
  seoKeywords: {
    primary: string[];
    secondary: string[];
    longTail: string[];
  };
  postVariations: {
    professional: string;
    storytelling: string;
    minimal: string;
    technical: string;
    educational: string;
  };
  hooks: string[];
  ctas: string[];
  carouselContent: {
    slide1Cover: string;
    slide2Problem: string;
    slide3Insight: string;
    slide4Example: string;
    slide5Solution: string;
    slide6Takeaway: string;
    slide7Cta: string;
  };
  shortVideoScript: {
    sec30: string;
    sec60: string;
    sec90: string;
  };
  blogOutline: {
    seoTitle: string;
    introduction: string;
    headings: string[];
    subheadings: string[];
    conclusion: string;
  };
  newsletterVersion: string;
  portfolioInsight: string;
}
