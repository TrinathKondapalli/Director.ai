// src/data/brandStrategist/engines/psychologyHelpers/switchingMotivations.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract switching motivation insights */
export async function extractSwitchingMotivations(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const switchAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(switch|change|migrate|replace)\b/.test(a.answerText.toLowerCase()));

  if (switchAnswers.length > 0) {
    for (const ans of switchAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Switching motivation statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // Brief based assumption
  if (session.brief && (session.brief as any).switchReason) {
    const content = `Switching reason hint: ${(session.brief as any).switchReason}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('switchingMotivations', 'What would cause you to switch from your current solution?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer may be motivated to switch for better efficiency or cost.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('switchingMotivations', 'Can you describe any reasons you might consider changing providers?'));
  return [insights, validation, 'LOW'];
}
