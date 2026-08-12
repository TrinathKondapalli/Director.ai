// src/data/brandStrategist/engines/psychologyHelpers/emotionalTerritory.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion, ConfidenceLevel, DiscoveryAnswer } from '../../../../types/brandStrategist';
import { buildQuestionMap, evidenceFromAnswer, buildInsight, buildValidation } from './common';

/** Derive emotional territory (dominant emotion) */
export async function deriveEmotionalTerritory(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[], ConfidenceLevel]> {
  const insights: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];
  const questionMap = buildQuestionMap(session.questions);

  // Simple frequency count of emotion words in answers
  const emotionMap: Record<string, number> = {};
  const emotionWords = ['relief', 'confidence', 'anxiety', 'frustration', 'joy', 'trust'];
  session.answers.forEach((a: DiscoveryAnswer) => {
    const txt = a.answerText.toLowerCase();
    emotionWords.forEach((w) => {
      if (txt.includes(w)) {
        emotionMap[w] = (emotionMap[w] || 0) + 1;
      }
    });
  });

  const topEmotion = Object.entries(emotionMap).sort((a, b) => b[1] - a[1])[0];

  if (topEmotion) {
    const content = `Dominant emotional theme: ${topEmotion[0]}`;
    const evidence: any[] = [];
    // attach any answer that mentioned the emotion
    const related = session.answers.filter((a: DiscoveryAnswer) => a.answerText.toLowerCase().includes(topEmotion[0]));
    related.forEach((ans: DiscoveryAnswer) => evidence.push(evidenceFromAnswer(ans, questionMap, 'Emotion evidence')));
    insights.push(buildInsight('FACT', 'HIGH', content, evidence));
    return [insights, validation, 'HIGH'];
  }

  // fallback hypothesis
  const hypo = 'Emotional territory is not clearly expressed.';
  insights.push(buildInsight('HYPOTHESIS', 'LOW', hypo, []));
  validation.push(buildValidation('emotionalTerritory', 'Can you describe the core emotion you want customers to feel?'));
  return [insights, validation, 'LOW'];
}
