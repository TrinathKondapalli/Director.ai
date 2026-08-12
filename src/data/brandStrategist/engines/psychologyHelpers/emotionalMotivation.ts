// src/data/brandStrategist/engines/psychologyHelpers/emotionalMotivation.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract emotional motivations */
export async function extractEmotionalMotivation(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  // Identify answers that discuss feelings or emotional outcomes
  const emotionAnswers = session.answers.filter((a: DiscoveryAnswer) => {
    const txt = a.answerText.toLowerCase();
    return /(feel|emotion|important|impact|value|meaning)/.test(txt);
  });

  if (emotionAnswers.length > 0) {
    for (const ans of emotionAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Emotional statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // If brief contains a tone description, treat it as an assumption
  if (session.brief && (session.brief as any).tone) {
    const content = `Brand tone: ${(session.brief as any).tone}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(
      buildValidation('emotionalMotivation', 'Can you describe the emotions you want your customers to feel?'),
    );
    return [insights, validation, 'MEDIUM'];
  }

  // No evidence – generate a low‑confidence hypothesis
  const hypo = 'Customer may value emotional connection and relief.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(
    buildValidation('emotionalMotivation', 'What emotions are most important for your brand?'),
  );
  return [insights, validation, 'LOW'];
}
