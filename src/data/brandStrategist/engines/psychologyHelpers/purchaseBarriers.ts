// src/data/brandStrategist/engines/psychologyHelpers/purchaseBarriers.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract purchase barrier insights */
export async function extractPurchaseBarriers(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const barrierAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(cost|price|budget|expensive|afford|investment)\b/.test(a.answerText.toLowerCase()));

  if (barrierAnswers.length > 0) {
    for (const ans of barrierAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Purchase barrier statement')];
      insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
    return [insights, validation, 'HIGH'];
  }

  if (session.brief && (session.brief as any).budget) {
    const content = `Budget constraint: ${(session.brief as any).budget}`;
    insights.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
    validation.push(buildValidation('purchaseBarriers', 'What is the budget range you are considering?'));
    return [insights, validation, 'MEDIUM'];
  }

  const hypo = 'Customer may be hesitant due to perceived high cost.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('purchaseBarriers', 'Are there any cost concerns you have?'));
  return [insights, validation, 'LOW'];
}
