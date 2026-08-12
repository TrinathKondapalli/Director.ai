// src/data/brandStrategist/engines/psychologyHelpers/socialMotivation.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract social motivations */
export async function extractSocialMotivation(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  // Look for answers mentioning collaboration, community, status, sharing
  const socialAnswers = session.answers.filter((a: DiscoveryAnswer) => {
    const txt = a.answerText.toLowerCase();
    return /(team|collaborate|community|share|status|recognition)/.test(txt);
  });

  if (socialAnswers.length > 0) {
    for (const ans of socialAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Social motivation statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // If brief includes a social positioning hint, treat as assumption
  if (session.brief && (session.brief as any).socialFocus) {
    const content = `Social focus: ${(session.brief as any).socialFocus}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(
      buildValidation('socialMotivation', 'Do you aim to foster community or status for your customers?'),
    );
    return [insights, validation, 'MEDIUM'];
  }

  // No evidence – low‑confidence hypothesis
  const hypo = 'Customer may value social recognition or collaborative tools.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(
    buildValidation('socialMotivation', 'What social outcomes do you want for your customers?'),
  );
  return [insights, validation, 'LOW'];
}
