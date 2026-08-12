// src/data/brandStrategist/engines/psychologyHelpers/unmetNeeds.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract unmet needs insights */
export async function extractUnmetNeeds(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const unmetAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(unmet|missing|need|lack)\b/.test(a.answerText.toLowerCase()));

  if (unmetAnswers.length > 0) {
    for (const ans of unmetAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Unmet need statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // Brief based assumption
  if (session.brief && (session.brief as any).unmetNeeds) {
    const content = `Unmet needs: ${(session.brief as any).unmetNeeds}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('unmetNeeds', 'What needs are currently not addressed by your solution?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer likely has additional unmet needs not yet identified.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('unmetNeeds', 'Can you describe any needs you feel are not currently met?'));
  return [insights, validation, 'LOW'];
}
