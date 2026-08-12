// src/data/brandStrategist/engines/psychologyHelpers/trustEngine.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract trust drivers and barriers */
export async function extractTrustEngine(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const drivers: PsychologyInsight[] = [];
  const barriers: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const driverAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(trust|reliable|secure|guarantee)\b/.test(a.answerText.toLowerCase()));
  const barrierAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(doubt|skeptic|risk|unreliable|concern)\b/.test(a.answerText.toLowerCase()));

  if (driverAnswers.length > 0) {
    for (const ans of driverAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Trust driver statement')];
      drivers.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
  } else {
    const hypo = 'Customer likely values reliability and security.';
    drivers.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
    validation.push(buildValidation('trustDrivers', 'What aspects of reliability are most important to you?'));
  }

  if (barrierAnswers.length > 0) {
    for (const ans of barrierAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Trust barrier statement')];
      barriers.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
  } else {
    const hypo = 'Potential trust barriers may include perceived risk or lack of transparency.';
    barriers.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
    validation.push(buildValidation('trustBarriers', 'Are there any concerns about reliability or transparency?'));
  }

  // Determine overall confidence – pick the lower of the two groups
  const overall: ConfidenceLevel = drivers.some(i => i.confidence === 'LOW') || barriers.some(i => i.confidence === 'LOW') ? 'LOW' : 'HIGH';
  return [drivers, barriers, validation, overall];
}
