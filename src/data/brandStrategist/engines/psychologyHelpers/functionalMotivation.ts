// src/data/brandStrategist/engines/psychologyHelpers/functionalMotivation.ts
import { BrandStrategySession, InsightType, ConfidenceLevel, PsychologyInsight, ValidationQuestion, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { evidenceFromAnswer, buildInsight, buildQuestionMap } from './common';

/**
 * Extract functional motivations from discovery answers and context.
 * Returns [insights, validationQuestions, overallConfidence]
 */
export async function extractFunctionalMotivation(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  // Look for answers that directly state a functional goal (e.g., "save 2 hours", "increase revenue")
  const functionalAnswers = session.answers.filter((a: DiscoveryAnswer) => {
    const txt = a.answerText.toLowerCase();
    return /\b(save|reduce|increase|automate|improve|grow|scale|optimize|cut costs|time saving)\b/.test(txt);
  });

  if (functionalAnswers.length > 0) {
    for (const ans of functionalAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Functional goal stated by user')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // If no explicit functional answer, infer from business description in brief if available
  if (session.brief && session.brief.goal) {
    const content = `Goal: ${session.brief.goal}`;
    const evidence: any[] = [];
    // No direct discovery evidence, mark as ASSUMPTION
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, evidence));
    validation.push({
      question: 'Can you clarify the primary functional outcome you expect from the solution?',
      targetArea: 'functionalMotivation',
    });
    return [insights, validation, 'MEDIUM'];
  }

  // No data – generate hypothesis with low confidence
  const hypoContent = 'Customer likely seeks efficiency improvements.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypoContent, []));
  validation.push({
    question: 'What specific functional outcomes are most important for your business?',
    targetArea: 'functionalMotivation',
  });
  return [insights, validation, 'LOW'];
}
