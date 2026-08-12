export interface InitialBrief {
  brandName: string;
  description: string;
  industry: string;
  market: string;
  goal: string;
  [key: string]: any;
}

export interface DiscoveryQuestion {
  id: string;
  category: 'BUSINESS' | 'AUDIENCE' | 'MARKET' | 'COMPETITORS' | 'PERSONALITY' | string;
  questionText: string;
}

export interface DiscoveryAnswer {
  id?: string;
  questionId: string;
  answerText: string;
  timestamp?: number;
}

export interface KnowledgeEntry {
  id: string;
  category?: string;
  domain?: string;
  content: string;
  source?: string;
  confidence?: number;
}

export interface BrandPersonality {
  primary: string;
  secondary: string;
  tertiary: string;
  avoid: string[];
  communicationStyle: string;
  tone: string;
}

export interface StrategicAnalysis {
  [key: string]: any;
}

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type InsightType = 'FACT' | 'ASSUMPTION' | 'HYPOTHESIS' | 'RECOMMENDATION';

export interface EvidenceReference {
  source: 'brief' | 'answer' | 'knowledge' | 'research';
  id?: string; // answer id or research id
  description: string;
}

export interface PositioningOption {
  id: string;
  title: string;
  description: string;
  categoryFrame?: string;
  corePromise?: string;
  functionalBenefit?: string;
  emotionalBenefit?: string;
  reasonToBelieve?: string;
  strategicAdvantage?: string;
  weakness?: string;
  competitiveRisk?: string;
  qualitativeScores?: {
    audienceRelevance: ConfidenceLevel;
    differentiation: ConfidenceLevel;
    credibility: ConfidenceLevel;
    emotionalResonance: ConfidenceLevel;
    businessAlignment: ConfidenceLevel;
    competitiveRisk: ConfidenceLevel;
    ownability: ConfidenceLevel;
    clarity: ConfidenceLevel;
    longTermPotential: ConfidenceLevel;
    overallRating: ConfidenceLevel;
  };
  tradeOffs?: {
    strengths: string[];
    weaknesses: string[];
    tradeOffSummary: string;
  };
  evidenceReferences?: EvidenceReference[];
  whatMustBeTrue?: string;
  validationRequirement?: string;
  scores?: {
    audienceRelevance: number | string;
    differentiation: number | string;
    credibility: number | string;
    overallScore?: number | string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface StrategyWorkspaceData {
  businessFoundation: string;
  targetAudience: string;
  marketLandscape: string;
  competitorAnalysis: string;
  customerPainPoints: string;
  differentiation: string;
  brandPurpose: string;
  brandVoice: string;
  mission: string;
  vision: string;
  brandValues: string[];
  brandPersonality: BrandPersonality;
  brandArchetype: string;
  messagingPillars: string[];
  valueProposition: string;
  taglineDirections: string[];
  customerExperiencePrinciples: string[];
  visualDirection: string;
  strategicRecommendations: string[];
}

export interface StrategyVersion {
  id: string;
  name: string;
  createdAt: string;
  workspace: StrategyWorkspaceData;
  notes?: string;
}

export interface Audience {
  id: string;
  name: string;
  segment: string;
  description?: string;
  priority?: number; // 1 = highest
}

export interface ResearchEntry {
  id: string;
  title: string;
  source: string; // e.g., 'Google Scholar', 'Industry Report', 'Web'
  url?: string;
  date?: string; // ISO
  snippet?: string;
  claim?: string; // statement extracted from research
  confidence?: number; // 0-1
}

export interface PsychologyInsight {
  type: InsightType;
  confidence: ConfidenceLevel;
  content: string;
  evidence: EvidenceReference[];
}

export interface ValidationQuestion {
  question: string;
  targetArea: string; // matches a field in the psychology result
}

export interface PsychologyConflict {
  insightA: PsychologyInsight;
  insightB: PsychologyInsight;
  description: string;
}

export interface EmotionalJourney {
  before: string;
  problem: string;
  frustration: string;
  discovery: string;
  action: string;
  after: string;
}

export interface EmotionToBrandRole {
  emotion: string;
  underlyingNeed: string;
  desiredFeeling: string;
  brandRole: string;
  strategicImplication: string;
}

export interface CustomerPsychology {
  functionalMotivations: PsychologyInsight[];
  emotionalMotivations: PsychologyInsight[];
  socialMotivations: PsychologyInsight[];
  pains: PsychologyInsight[];
  frustrations: PsychologyInsight[];
  fears: PsychologyInsight[];
  desires: PsychologyInsight[];
  desiredOutcomes: PsychologyInsight[];
  desiredFeelings: PsychologyInsight[];
  currentIdentity: PsychologyInsight[];
  desiredIdentity: PsychologyInsight[];
  trustDrivers: PsychologyInsight[];
  trustBarriers: PsychologyInsight[];
  decisionTriggers: PsychologyInsight[];
  purchaseBarriers: PsychologyInsight[];
  switchingMotivations: PsychologyInsight[];
  decisionFriction: PsychologyInsight[];
  contextualTriggers: PsychologyInsight[];
  alternatives: PsychologyInsight[];
  unmetNeeds: PsychologyInsight[];
  emotionalTerritory: PsychologyInsight[];
  psychologicalHypotheses: PsychologyInsight[];
}

export interface SinglePsychologyProfile {
  audienceId?: string;
  audienceName?: string;
  customerPsychology: CustomerPsychology;
  emotionalJourney: EmotionalJourney;
  emotionToBrandRole: EmotionToBrandRole;
  confidence: ConfidenceLevel;
  validationQuestions: ValidationQuestion[];
  conflicts?: PsychologyConflict[];
}

export interface PsychologyResult {
  insufficientData?: {
    missingInformation: string[];
    recommendedQuestions: ValidationQuestion[];
  };
  singleProfile?: SinglePsychologyProfile;
  multiAudience?: SinglePsychologyProfile[];
}

export interface ResearchEngineResult {
  researchEntries: ResearchEntry[];
  competitorFindings: string[];
  customerFindings: string[];
  marketTrends: string[];
  researchGaps: string[];
  hypothesisValidation: {
    hypothesis: string;
    status: 'SUPPORTED' | 'PARTIALLY_SUPPORTED' | 'NOT_SUPPORTED' | 'UNRESOLVED';
    evidence: string[];
  }[];
  retrievedAt: string;
}

export interface CompetitorEngineResult {
  directCompetitors: { name: string; corePromise: string; strengths: string[]; weaknesses: string[] }[];
  indirectCompetitors: { name: string; approach: string }[];
  crowdedTerritories: string[];
  genericClaims: string[];
  competitorOwnedTerritories: string[];
  whiteSpaceOpportunities: string[];
}

export interface PositioningEngineResult {
  options: PositioningOption[];
  recommendedPositioningId: string;
  recommendationRationale: {
    whyItWins: string;
    whyOthersWeaker: string;
    whatMustBeTrue: string;
    whatNeedsValidation: string[];
    tradeOffComparison?: string;
  };
}

export interface DifferentiationEngineResult {
  acidTestResults: {
    claim: string;
    couldCompetitorSayThis: boolean;
    isCategoryGeneric: boolean;
    isMeaningful: boolean;
    isCredible: boolean;
    isDefendable: boolean;
    pass: boolean;
  }[];
  coreDifferentiator: string;
  differentiatorType: 'STRATEGIC_TERRITORY' | 'FEATURE_DIFFERENCE';
  defensiblePillars: string[];
  whyItMattersToCustomer: string;
  customerEmotionalValue: string;
  defendabilityAssessment: string;
}

export interface PersonalityEngineResult {
  primaryPersonality: string;
  secondaryTraits: string[];
  voiceStyle: string;
  desiredFeeling: string;
  undesiredFeeling: string;
  communicationBoundaries: { do: string[]; dont: string[] };
  whyItFitsCustomer: string;
  whyItSupportsPositioning: string;
  demonstratedBehaviors: string[];
}

export interface MessagingEngineResult {
  coreMessage: string;
  valueProposition: string;
  messagingPillars: { pillar: string; headline: string; proofPoints: string[] }[];
  taglineDirections: string[];
  websiteHeadlines: string[];
  campaignMessaging: string[];
  ctaDirections: string[];
  derivationNarrative: string;
}

export interface ExperienceEngineResult {
  experiencePrinciples: string[];
  trustMoments: string[];
  emotionalMoments: string[];
  frictionReduction: string[];
  uxImplications: string[];
  psychologyConnection: string;
}

export interface VisualDirectionEngineResult {
  visualPersonality: string;
  colorLogic: { paletteName: string; rationale: string; primaryColor: string; accentColor: string };
  typographyDirection: { headlineFont: string; bodyFont: string; vibe: string };
  imageryStyle: string;
  graphicLanguage: string;
  uiCharacter: string;
  psychologyAndPositioningTranslation: string;
}

export interface EvaluationEngineResult {
  qualitativeScores: {
    businessAlignment: ConfidenceLevel;
    audienceRelevance: ConfidenceLevel;
    differentiation: ConfidenceLevel;
    positioningClarity: ConfidenceLevel;
    overallCoherence: ConfidenceLevel;
  };
  passedAcidTest: boolean;
  strengths: string[];
  weaknesses: string[];
  refinementRecommendations: string[];
  qualityGateQuestions: {
    question: string;
    answer: string;
    passed: boolean;
  }[];
}

export interface RefinementEngineResult {
  lastUpdatedSection: string;
  affectedSections: string[];
  updatedAt: string;
}

export interface StructuredReportSection {
  sectionTitle: string;
  what: string;
  why: string;
  evidence: string;
  implication: string;
  confidence: ConfidenceLevel;
  validationRequirement: string;
}

export interface FinalReportResult {
  brandOverview: string;
  strategicDiagnosis: {
    marketContext: string;
    customerTension: string;
    competitorDominance: string;
    categoryDeficiency: string;
    opportunityWhitespace: string;
  };
  audienceSummary: string;
  psychologySummary: {
    customerTension: string;
    functionalNeed: string;
    emotionalNeed: string;
    fearOrBarrier: string;
    desiredFeeling: string;
    desiredIdentity: string;
    trustRequirement: string;
    decisionTrigger: string;
  };
  emotionalTerritory: string;
  marketLandscape: string;
  competitiveLandscape: string;
  positioningSummary: string;
  recommendedPositioning: string;
  differentiationSummary: string;
  brandPurpose: string;
  mission: string;
  vision: string;
  values: string[];
  brandPersonality: string;
  brandArchetype: string;
  valueProposition: string;
  messagingSummary: string;
  voiceAndTone: string;
  experiencePrinciples: string[];
  visualDirection: string;
  strategicRecommendations: string[];
  validationPlan: string[];
  openQuestions: string[];
  nextSteps: string[];
  structuredSections?: StructuredReportSection[];
  generatedAt: string;
}

export interface BrandStrategySession {
  step:
    | 'CREATE'
    | 'DISCOVERY'
    | 'PSYCHOLOGY'
    | 'RESEARCH'
    | 'COMPETITORS'
    | 'CHECKPOINT_1'
    | 'POSITIONING'
    | 'CHECKPOINT_2'
    | 'DIFFERENTIATION'
    | 'PERSONALITY'
    | 'MESSAGING'
    | 'EXPERIENCE'
    | 'VISUAL_DIRECTION'
    | 'SELF_CRITIQUE'
    | 'CHECKPOINT_3'
    | 'ANALYSIS_LOADING'
    | 'WORKSPACE'
    | 'REPORT';
  brief: InitialBrief | null;
  questions: DiscoveryQuestion[];
  answers: DiscoveryAnswer[];
  currentQuestionIndex: number;
  analysis: any | null;
  positioningOptions: PositioningOption[];
  recommendedPositioningId: string | null;
  workspace: StrategyWorkspaceData | null;
  knowledge?: KnowledgeEntry[];
  research?: ResearchEngineResult;
  audiences?: Audience[];
  b2bRoles?: string[];
  psychology?: PsychologyResult;
  competitors?: CompetitorEngineResult;
  positioning?: PositioningEngineResult;
  differentiation?: DifferentiationEngineResult;
  personality?: PersonalityEngineResult;
  messaging?: MessagingEngineResult;
  experience?: ExperienceEngineResult;
  visualDirection?: VisualDirectionEngineResult;
  evaluation?: EvaluationEngineResult;
  refinement?: RefinementEngineResult;
  report?: FinalReportResult;
  versions?: StrategyVersion[];
}
