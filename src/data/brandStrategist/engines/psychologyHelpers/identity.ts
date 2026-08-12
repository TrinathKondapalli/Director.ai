// src/data/brandStrategist/engines/psychologyHelpers/identity.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract identity insights (current and desired) */
export async function extractIdentity(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  // Look for answers mentioning "identity", "brand voice", "personality"
  const identityAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(identity|personality|voice|character)\b/.test(a.answerText.toLowerCase()));

  if (identityAnswers.length > 0) {
    for (const ans of identityAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Identity statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  // Use brief fields if available
  if (session.brief && (session.brief as any).brandVoice) {
    const content = `Brand voice: ${(session.brief as any).brandVoice}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('identity', 'How would you describe the desired brand identity?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer likely aspires to a professional, trustworthy brand identity.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('identity', 'What brand identity do you want to portray?'));
  return [insights, validation, 'LOW'];
}
