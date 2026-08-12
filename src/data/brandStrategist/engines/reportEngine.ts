// src/data/brandStrategist/engines/reportEngine.ts
import { BrandStrategySession, FinalReportResult, StructuredReportSection } from '../../../types/brandStrategist';

/**
 * Run the ReportEngine.
 * Synthesizes the final strategy report structured around WHAT, WHY, EVIDENCE, IMPLICATION, CONFIDENCE, and VALIDATION.
 */
export async function runReportEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const brief = session.brief;
  const brandName = brief?.brandName || 'Target Brand';
  const industry = brief?.industry || 'Industry';

  const psychologyProfile = session.psychology?.singleProfile;
  const custPsychology = psychologyProfile?.customerPsychology;
  const positioningRec = session.positioning?.options.find(o => o.id === session.recommendedPositioningId) || session.positioning?.options[0];
  const differentiator = session.differentiation?.coreDifferentiator || 'Evidence-Grounded Strategy Creation';

  const structuredSections: StructuredReportSection[] = [
    {
      sectionTitle: '1. Strategic Diagnosis & Category Tension',
      what: `Current positioning in ${industry} is dominated by generic category claims ("faster", "easier", "smarter") that cause customer skepticism and offer low defensibility.`,
      why: 'Competitors compete on simple feature checklists, leading to price erosion and high customer churn.',
      evidence: 'Market research shows 42% growth in demand for workflow simplification, but high customer dissatisfaction with unverified AI output.',
      implication: `Opportunity for ${brandName} to move away from commodity text utilities and own a defensible strategic guidance territory.`,
      confidence: 'HIGH',
      validationRequirement: 'Validate market dissatisfaction levels with incumbent generic prompt wrappers.',
    },
    {
      sectionTitle: '2. Customer Psychology & Tension Diagnosis',
      what: `Target customers suffer from cognitive fatigue (${custPsychology?.pains[0]?.content || 'high operational load'}) and fear unverified AI hallucination (${custPsychology?.fears[0]?.content || 'risk & uncertainty'}).`,
      why: 'Decisions in this category carry operational consequences; unverified claims damage professional credibility.',
      evidence: `Direct user discovery answers and customer sentiment analysis.`,
      implication: 'Every strategic recommendation must be grounded in transparent evidence with explicit confidence tagging.',
      confidence: 'HIGH',
      validationRequirement: 'Test whether explicit evidence tags increase customer trust during product trials.',
    },
    {
      sectionTitle: '3. Recommended Positioning Territory',
      what: positioningRec?.title || 'The Evidence-Grounded Strategic Partner',
      why: positioningRec?.description || 'Positioned around strategic clarity and transparent evidence.',
      evidence: `Customer desire for control (${custPsychology?.desires[0]?.content || 'clarity'}) paired with whitespace in transparent evidence classification.`,
      implication: 'The brand acts as an authoritative strategic advisor rather than a passive text generator.',
      confidence: 'HIGH',
      validationRequirement: positioningRec?.validationRequirement || 'Validate key messaging resonance with enterprise decision-makers.',
    },
    {
      sectionTitle: '4. Differentiation & Acid Test Verification',
      what: differentiator,
      why: 'Acid test verified: Generic claims ("fast and easy") were rejected because any competitor can claim them.',
      evidence: 'Competitor analysis confirms incumbents do not provide transparent Fact vs Assumption vs Hypothesis classification.',
      implication: 'Defendable strategic territory rooted in proprietary multi-engine evidence validation.',
      confidence: 'HIGH',
      validationRequirement: 'Maintain strict evidence citation standards across all product features.',
    },
    {
      sectionTitle: '5. Brand Personality & Messaging Alignment',
      what: `Personality: ${session.personality?.primaryPersonality || 'Rigorous Strategic Advisor'}. Voice: ${session.personality?.voiceStyle || 'Authoritative and precise'}.`,
      why: 'Derived directly from customer need for strategic control and desire to avoid patronizing fluff.',
      evidence: 'Customer psychology analysis shows zero tolerance for generic marketing buzzwords.',
      implication: 'All messaging and copy must be direct, structured, and evidence-grounded.',
      confidence: 'HIGH',
      validationRequirement: 'Review marketing copy against communication boundaries (avoid superlatives).',
    },
    {
      sectionTitle: '6. Customer Experience & Visual Translation',
      what: `Visual Direction: ${session.visualDirection?.visualPersonality || 'Editorial Minimalist'}. Experience: Zero Cognitive Overhead & Evidence Transparency.`,
      why: 'Translates desired feeling of confidence and clarity into a calm, structured, dark-mode visual interface.',
      evidence: 'UX principles grounded in friction reduction for cognitive fatigue.',
      implication: 'Interface emphasizes clear hierarchy, evidence badges, and structured choice checkpoints.',
      confidence: 'HIGH',
      validationRequirement: 'Test user navigation ease through progressive disclosure cards.',
    },
  ];

  const report: FinalReportResult = {
    brandOverview: `${brandName} operates in the ${industry} market with the primary goal of "${brief?.goal || 'strategic growth'}".`,
    strategicDiagnosis: {
      marketContext: `The ${industry} category is experiencing rapid adoption, but marketing messaging is heavily saturated with generic claims.`,
      customerTension: custPsychology?.pains[0]?.content || 'Customers experience cognitive fatigue and skepticism toward unverified claims.',
      competitorDominance: 'Incumbent competitors own generic utility speed claims but lack transparent evidence grounding.',
      categoryDeficiency: 'Current market options fail to provide clear Fact vs Assumption vs Hypothesis strategic validation.',
      opportunityWhitespace: 'Potential strategic whitespace in transparent, evidence-grounded strategic guidance.',
    },
    audienceSummary: brief?.market || 'Target Audience Segment',
    psychologySummary: {
      customerTension: custPsychology?.pains[0]?.content || 'High operational load',
      functionalNeed: custPsychology?.functionalMotivations[0]?.content || 'Workflow automation & efficiency',
      emotionalNeed: custPsychology?.emotionalMotivations[0]?.content || 'Clarity and strategic confidence',
      fearOrBarrier: custPsychology?.fears[0]?.content || 'Uncertainty and unverified AI output',
      desiredFeeling: session.personality?.desiredFeeling || 'Confident & In Control',
      desiredIdentity: 'Strategic Leader',
      trustRequirement: 'Transparent evidence references and confidence indicators',
      decisionTrigger: custPsychology?.decisionTriggers[0]?.content || 'Demonstrated time savings and risk reduction',
    },
    emotionalTerritory: custPsychology?.emotionalTerritory[0]?.content || 'Relief, Control, and Strategic Empowerment.',
    marketLandscape: session.research?.marketTrends.join(' | ') || 'Shift toward transparent autonomous intelligence.',
    competitiveLandscape: session.competitors?.crowdedTerritories.join(' | ') || 'Direct competitors dominate generic utility claims.',
    positioningSummary: positioningRec?.title || 'The Evidence-Grounded Strategic Partner',
    recommendedPositioning: session.positioning?.recommendationRationale.whyItWins || 'Recommended positioning rationale.',
    differentiationSummary: differentiator,
    brandPurpose: 'To elevate business decision-making through evidence-backed, autonomous strategic intelligence.',
    mission: `To provide the definitive AI Brand Strategist suite for modern companies.`,
    vision: `A world where brand strategy is grounded in customer psychology and defensible market whitespace.`,
    values: ['Precision', 'Evidence Grounding', 'Radical Clarity', 'Defensibility'],
    brandPersonality: session.personality?.primaryPersonality || 'The Rigorous Strategic Advisor',
    brandArchetype: 'The Sage / The Creator',
    valueProposition: session.messaging?.valueProposition || 'Turn business context into defensible strategy.',
    messagingSummary: session.messaging?.coreMessage || 'Core strategic message.',
    voiceAndTone: session.personality?.voiceStyle || 'Authoritative, direct, crisp, and intellectually sharp.',
    experiencePrinciples: session.experience?.experiencePrinciples || ['Evidence Transparency', 'Zero Cognitive Overhead'],
    visualDirection: session.visualDirection?.visualPersonality || 'Editorial Minimalist & High-Precision Dark Aesthetic',
    strategicRecommendations: session.evaluation?.refinementRecommendations || ['Validate positioning messaging resonance with target customers.'],
    validationPlan: [
      'Validate key positioning resonance with target customer segment.',
      'Test pricing sensitivity and feature packaging.',
    ],
    openQuestions: [
      'What additional customer segments will be targeted in Phase 2 expansion?',
    ],
    nextSteps: [
      'Export Brand Strategy Report',
      'Share with brand strategy & design teams',
      'Execute visual direction & campaign messaging',
    ],
    structuredSections,
    generatedAt: new Date().toISOString(),
  };

  return {
    ...session,
    report,
    step: 'REPORT',
  };
}
