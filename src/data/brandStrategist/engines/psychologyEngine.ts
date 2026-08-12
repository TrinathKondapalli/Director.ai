// src/data/brandStrategist/engines/psychologyEngine.ts
import { BrandStrategySession, PsychologyResult, CustomerPsychology, PsychologyInsight, EvidenceReference, ConfidenceLevel, InsightType, ValidationQuestion, SinglePsychologyProfile } from '../../../types/brandStrategist';
import { extractFunctionalMotivation } from './psychologyHelpers/functionalMotivation';
import { extractEmotionalMotivation } from './psychologyHelpers/emotionalMotivation';
import { extractSocialMotivation } from './psychologyHelpers/socialMotivation';
import { extractPainFrustration } from './psychologyHelpers/painFrustration';
import { extractFears } from './psychologyHelpers/fears';
import { extractDesires } from './psychologyHelpers/desires';
import { extractIdentity } from './psychologyHelpers/identity';
import { extractTrustEngine } from './psychologyHelpers/trustEngine';
import { extractDecisionTriggers } from './psychologyHelpers/decisionTriggers';
import { extractPurchaseBarriers } from './psychologyHelpers/purchaseBarriers';
import { extractSwitchingMotivations } from './psychologyHelpers/switchingMotivations';
import { extractDecisionFriction } from './psychologyHelpers/decisionFriction';
import { extractContextualTriggers } from './psychologyHelpers/contextualTriggers';
import { extractAlternatives } from './psychologyHelpers/alternatives';
import { extractUnmetNeeds } from './psychologyHelpers/unmetNeeds';
import { deriveEmotionalTerritory } from './psychologyHelpers/emotionalTerritory';
import { formPsychologicalHypotheses } from './psychologyHelpers/hypotheses';

async function buildProfile(session: BrandStrategySession, audienceName?: string, audienceId?: string): Promise<SinglePsychologyProfile> {
  const [funcInsights, funcVal] = await extractFunctionalMotivation(session);
  const [emoInsights, emoVal] = await extractEmotionalMotivation(session);
  const [socInsights, socVal] = await extractSocialMotivation(session);
  const [painInsights, frustInsights, painVal] = await extractPainFrustration(session);
  const [fearInsights, fearVal] = await extractFears(session);
  const [desireInsights, desireVal] = await extractDesires(session);
  const [identityInsights, identityVal] = await extractIdentity(session);
  const [trustInsights, trustBarriers, trustVal] = await extractTrustEngine(session);
  const [decisionTriggers, decisionTriggersVal] = await extractDecisionTriggers(session);
  const [purchaseBarriers, purchaseBarriersVal] = await extractPurchaseBarriers(session);
  const [switchingMotivations, switchingVal] = await extractSwitchingMotivations(session);
  const [decisionFriction, frictionVal] = await extractDecisionFriction(session);
  const [contextualTriggers, contextualVal] = await extractContextualTriggers(session);
  const [alternatives, alternativesVal] = await extractAlternatives(session);
  const [unmetNeeds, unmetVal] = await extractUnmetNeeds(session);
  const [emotionalTerritory, territoryVal] = await deriveEmotionalTerritory(session);
  const [hypotheses, hypoVal] = await formPsychologicalHypotheses(session);

  const allValidation: ValidationQuestion[] = [
    ...funcVal, ...emoVal, ...socVal, ...painVal, ...fearVal, ...desireVal,
    ...identityVal, ...trustVal, ...decisionTriggersVal, ...purchaseBarriersVal,
    ...switchingVal, ...frictionVal, ...contextualVal, ...alternativesVal,
    ...unmetVal, ...territoryVal, ...hypoVal,
  ];

  // Grounding with loaded session.knowledge if present
  if (session.knowledge && session.knowledge.length > 0) {
    session.knowledge.forEach((k) => {
      funcInsights.push({
        type: 'FACT',
        confidence: 'HIGH',
        content: `Domain benchmark: ${k.content}`,
        evidence: [{ source: 'knowledge', id: k.id, description: k.source || 'Knowledge Base' }],
      });
    });
  }

  // Grounding for B2B Roles if specified
  if (session.b2bRoles && session.b2bRoles.length > 0) {
    session.b2bRoles.forEach((role) => {
      decisionFriction.push({
        type: 'HYPOTHESIS',
        confidence: 'MEDIUM',
        content: `Role-specific friction for ${role}: Alignment required with buying committee.`,
        evidence: [],
      });
    });
  }

  const customerPsychology: CustomerPsychology = {
    functionalMotivations: funcInsights,
    emotionalMotivations: emoInsights,
    socialMotivations: socInsights,
    pains: painInsights,
    frustrations: frustInsights,
    fears: fearInsights,
    desires: desireInsights,
    desiredOutcomes: desireInsights,
    desiredFeelings: emoInsights,
    currentIdentity: identityInsights.filter(i => i.type === 'FACT' || i.type === 'ASSUMPTION'),
    desiredIdentity: identityInsights.filter(i => i.type === 'HYPOTHESIS'),
    trustDrivers: trustInsights,
    trustBarriers,
    decisionTriggers,
    purchaseBarriers,
    switchingMotivations,
    decisionFriction,
    contextualTriggers,
    alternatives,
    unmetNeeds,
    emotionalTerritory,
    psychologicalHypotheses: hypotheses,
  };

  const emotionalJourney = {
    before: funcInsights[0]?.content ?? 'Seeking workflow efficiency',
    problem: painInsights[0]?.content ?? 'High operational cognitive load',
    frustration: frustInsights[0]?.content ?? 'Manual effort and fragmentation',
    discovery: emoInsights[0]?.content ?? 'Desire for seamless intelligence',
    action: decisionTriggers[0]?.content ?? 'Validation of ROI and trust',
    after: desireInsights[0]?.content ?? 'Complete clarity and performance gain',
  };

  const emotionToBrandRole = {
    emotion: emoInsights[0]?.content ?? 'Anxiety & Overwhelm',
    underlyingNeed: funcInsights[0]?.content ?? 'Control & Predictability',
    desiredFeeling: desireInsights[0]?.content ?? 'Empowered & Confident',
    brandRole: 'Trusted Strategic Advisor',
    strategicImplication: 'Simplify decision making, minimize risk, and demonstrate proof.',
  };

  // Coverage-based summary confidence calculation
  const totalFactOrAssumption = funcInsights.concat(painInsights, trustInsights).filter(i => i.type !== 'HYPOTHESIS').length;
  const overallConfidence: ConfidenceLevel = totalFactOrAssumption > 3 ? 'HIGH' : totalFactOrAssumption > 0 ? 'MEDIUM' : 'LOW';

  return {
    audienceId,
    audienceName,
    customerPsychology,
    emotionalJourney,
    emotionToBrandRole,
    confidence: overallConfidence,
    validationQuestions: allValidation,
  };
}

/**
 * Run PsychologyEngine V2.
 */
export async function runPsychologyEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const missingInfo: string[] = [];
  if (!session.brief) missingInfo.push('brief');
  if (!session.answers || session.answers.length === 0) missingInfo.push('discoveryAnswers');

  if (missingInfo.length > 0) {
    return {
      ...session,
      psychology: {
        insufficientData: {
          missingInformation: missingInfo,
          recommendedQuestions: missingInfo.map((field) => ({
            question: `Please provide ${field} information to enable psychological reasoning.`,
            targetArea: field,
          })),
        },
      },
    };
  }

  const singleProfile = await buildProfile(session);

  let multiAudience: SinglePsychologyProfile[] | undefined;
  if (session.audiences && session.audiences.length > 1) {
    multiAudience = await Promise.all(
      session.audiences.map(aud => buildProfile(session, aud.name, aud.id))
    );
  }

  return {
    ...session,
    psychology: {
      singleProfile,
      multiAudience,
    },
  };
}
