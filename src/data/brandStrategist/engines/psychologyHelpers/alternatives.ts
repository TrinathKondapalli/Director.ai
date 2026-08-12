// src/data/brandStrategist/engines/psychologyHelpers/alternatives.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract alternatives insights */
export async function extractAlternatives(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const altAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(alternative|competitor|other option|different solution)\b/.test(a.answerText.toLowerCase()));

  if (altAnswers.length > 0) {
    for (const ans of altAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Alternative statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // Brief based assumption if brief mentions competitors
  if (session.brief && (session.brief as any).competitors) {
    const content = `Competitors mentioned: ${(session.brief as any).competitors}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('alternatives', 'Who do you consider as alternative providers?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer likely evaluates multiple solutions before deciding.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('alternatives', 'What other solutions are you looking at?'));
  return [insights, validation, 'LOW'];
}
