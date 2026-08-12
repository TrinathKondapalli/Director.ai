// src/data/brandStrategist/engines/psychologyHelpers/hypotheses.ts
import { BrandStrategySession, PsychologyInsight, ValidationQuestion } from '../../../../types/brandStrategist';
import { buildInsight, buildValidation } from './common';

/** Form overall psychological hypotheses */
export async function formPsychologicalHypotheses(
  session: BrandStrategySession,
): Promise<[PsychologyInsight[], ValidationQuestion[]]> {
  const hypotheses: PsychologyInsight[] = [];
  const validation: ValidationQuestion[] = [];

  const hypo1 = 'The customer primary driver is reducing operational complexity.';
  hypotheses.push(buildInsight('HYPOTHESIS', 'MEDIUM', hypo1, []));
  validation.push(buildValidation('hypotheses', 'Is operational complexity your main headache?'));

  const hypo2 = 'Risk aversion slows down purchasing decisions.';
  hypotheses.push(buildInsight('HYPOTHESIS', 'LOW', hypo2, []));
  validation.push(buildValidation('hypotheses', 'Does risk aversion slow down your buying decisions?'));

  return [hypotheses, validation];
}
