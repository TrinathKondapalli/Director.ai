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

