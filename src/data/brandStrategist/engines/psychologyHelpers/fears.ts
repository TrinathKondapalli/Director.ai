// src/data/brandStrategist/engines/psychologyHelpers/fears.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract fear insights */
export async function extractFears(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const fearAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(fear|risk|concern|worry|anxiety)\b/.test(a.answerText.toLowerCase()));

  if (fearAnswers.length > 0) {
    for (const ans of fearAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Fear statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // Brief based assumption
  if (session.brief && (session.brief as any).risk) {
    const content = `Risk concerns: ${(session.brief as any).risk}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('fears', 'What risks keep you up at night?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer may be afraid of adopting new technology due to uncertainty.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('fears', 'Are there any specific risks you are worried about?'));
  return [insights, validation, 'LOW'];
}
