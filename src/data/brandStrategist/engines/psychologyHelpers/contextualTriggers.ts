// src/data/brandStrategist/engines/psychologyHelpers/contextualTriggers.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract contextual trigger insights */
export async function extractContextualTriggers(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const ctxAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(when|where|scenario|context|environment)\b/.test(a.answerText.toLowerCase()));

  if (ctxAnswers.length > 0) {
    for (const ans of ctxAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Contextual trigger statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // Brief based assumption if brief contains a context field
  if (session.brief && (session.brief as any).context) {
    const content = `Context hint: ${(session.brief as any).context}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('contextualTriggers', 'What context influences your decision making?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer decision may be affected by specific situational contexts.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('contextualTriggers', 'Can you describe any situations that affect your purchasing behavior?'));
  return [insights, validation, 'LOW'];
}
