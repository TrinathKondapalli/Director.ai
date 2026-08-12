// src/data/brandStrategist/engines/psychologyHelpers/desires.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract desire insights */
export async function extractDesires(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const desireAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(want|desire|goal|objective|aim)\b/.test(a.answerText.toLowerCase()));

  if (desireAnswers.length > 0) {
    for (const ans of desireAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Desire statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // Brief based assumption
  if (session.brief && (session.brief as any).goals) {
    const content = `Stated goals: ${(session.brief as any).goals}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('desires', 'What are the primary outcomes you want to achieve?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer likely seeks measurable improvements in performance.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('desires', 'Can you describe the outcomes you hope to achieve?'));
  return [insights, validation, 'LOW'];
}
