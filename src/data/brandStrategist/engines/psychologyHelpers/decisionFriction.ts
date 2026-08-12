// src/data/brandStrategist/engines/psychologyHelpers/decisionFriction.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract decision friction insights */
export async function extractDecisionFriction(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const frictionAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(frict|hesitat|delay|stall|confuse)\b/.test(a.answerText.toLowerCase()));

  if (frictionAnswers.length > 0) {
    for (const ans of frictionAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Decision friction statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  if (session.brief && (session.brief as any).friction) {
    const content = `Decision friction hint: ${(session.brief as any).friction}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('decisionFriction', 'What obstacles slow down your decision process?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer may experience friction due to unclear ROI.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('decisionFriction', 'Can you describe any hesitation you have about purchasing?'));
  return [insights, validation, 'LOW'];
}
