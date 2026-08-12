import { BrandStrategySession, DiscoveryQuestion, DiscoveryAnswer } from '../../../types/brandStrategist';
import { generateNextDiscoveryQuestion } from '../../brandStrategistEngine';

/**
 * Runs the discovery phase: generates the next strategic question based on the brief and
 * the history of previous Q&A pairs. It updates the session with the new question and
 * increments the question index.
 */
export async function runDiscoveryEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const { brief, questions, answers } = session;
  if (!brief) return session;

  // Build history structure expected by generateNextDiscoveryQuestion
  const history = questions.map((q: DiscoveryQuestion, i: number) => ({
    question: q,
    answer: answers[i] as DiscoveryAnswer,
  }));

  const nextQuestion = await generateNextDiscoveryQuestion(brief, history);

  if (!nextQuestion) {
    // No further questions – signal end of discovery
    return { ...session, step: 'ANALYSIS_LOADING' };
  }

  return {
    ...session,
    step: 'DISCOVERY',
    questions: [...questions, nextQuestion],
    currentQuestionIndex: questions.length, // new question is last index
  };
}
