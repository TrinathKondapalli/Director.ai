// src/data/brandStrategist/engines/psychologyHelpers/decisionTriggers.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract decision trigger insights */
export async function extractDecisionTriggers(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const triggerAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(decide|when would you choose|trigger|condition)\b/.test(a.answerText.toLowerCase()));

  if (triggerAnswers.length > 0) {
    for (const ans of triggerAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Decision trigger statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // Assume based on brief if present
  if (session.brief && (session.brief as any).decisionTrigger) {
    const content = `Decision trigger hint: ${(session.brief as any).decisionTrigger}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('decisionTriggers', 'What would cause you to decide to purchase?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer may decide based on cost‑benefit analysis.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('decisionTriggers', 'Can you describe the main factor that would trigger a purchase decision?'));
  return [insights, validation, 'LOW'];
}
