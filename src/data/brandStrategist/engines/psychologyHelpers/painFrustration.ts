// src/data/brandStrategist/engines/psychologyHelpers/painFrustration.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Extract pains and frustrations */
export async function extractPainFrustration(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], PsychologyInsight[], ValidationQuestion[]]> {
  const pains: PsychologyInsight[] = [];
  const frustrations: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  const painAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(pain|problem|challenge|issue|difficulty)\b/.test(a.answerText.toLowerCase()));
  const frustrationAnswers = session.answers.filter((a: DiscoveryAnswer) => /\b(frustration|annoy|slow|inefficient|waste)\b/.test(a.answerText.toLowerCase()));

  if (painAnswers.length > 0) {
    for (const ans of painAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Pain statement')];
      pains.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
  } else {
    if (session.brief && (session.brief as any).painPoints) {
      const content = `Pain points: ${(session.brief as any).painPoints}`;
      pains.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
      validation.push(buildValidation('pains', 'What are the biggest pain points you face today?'));
    } else {
      const hypo = 'Customer likely experiences operational pain.';
      pains.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
      validation.push(buildValidation('pains', 'Can you describe any operational pain you encounter?'));
    }
  }

  if (frustrationAnswers.length > 0) {
    for (const ans of frustrationAnswers) {
      const content = ans.answerText.trim();
      const evidence = [evidenceFromAnswer(ans, questionMap, 'Frustration statement')];
      frustrations.push(buildInsight('FACT', 'HIGH', content, evidence));
    }
  } else {
    if (session.brief && (session.brief as any).frustrations) {
      const content = `Frustrations: ${(session.brief as any).frustrations}`;
      frustrations.push(buildInsight('ASSUMPTION', 'MEDIUM', content, []));
      validation.push(buildValidation('frustrations', 'What frustrates you most about the current process?'));
    } else {
      const hypo = 'Customer may feel frustration around slow processes.';
      frustrations.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
      validation.push(buildValidation('frustrations', 'What aspects of your workflow cause frustration?'));
    }
  }

  return [pains, frustrations, validation];
}
