// src/data/brandStrategist/engines/psychologyHelpers/common.ts
import {
  BrandStrategySession,
  DiscoveryQuestion,
  DiscoveryAnswer,
  PsychologyInsight,
  EvidenceReference,
  ValidationQuestion,
  ConfidenceLevel,
  InsightType,
} from '../../../../types/brandStrategist';

/** Build a map of question.id -> question object */
export function buildQuestionMap(questions: DiscoveryQuestion[]): Map<string, DiscoveryQuestion> {
  const map = new Map<string, DiscoveryQuestion>();
  for (const q of questions) {
    map.set(q.id, q);
  }
  return map;
}

/** Evidence from a discovery answer */
export function evidenceFromAnswer(
  answer: DiscoveryAnswer,
  questionMap: Map<string, DiscoveryQuestion>,
  description: string,
): EvidenceReference {
  const question = questionMap.get(answer.questionId);
  const qText = question ? question.questionText : 'unknown question';
  return {
    source: 'answer',
    id: answer.id,
    description: `${description} (Q: ${qText})`,
  };
}

/** Evidence from the brief */
export function evidenceFromBrief(field: string, description: string): EvidenceReference {
  return {
    source: 'brief',
    description: `${description} (brief field: ${field})`,
  };
}

/** Construct a PsychologyInsight */
export function buildInsight(
  type: InsightType,
  confidence: ConfidenceLevel,
  content: string,
  evidence: EvidenceReference[],
): PsychologyInsight {
  return { type, confidence, content, evidence };
}

/** Create a validation question */
export function buildValidation(targetArea: string, question: string): ValidationQuestion {
  return { targetArea, question };
}

/** Minimal conflict detection */
export function detectConflict(
  a: PsychologyInsight,
  b: PsychologyInsight,
): { conflict: boolean; description?: string } {
  if (a.type === 'FACT' && b.type === 'FACT' && a.content !== b.content) {
    return { conflict: true, description: 'Contradictory factual statements' };
  }
  return { conflict: false };
}
