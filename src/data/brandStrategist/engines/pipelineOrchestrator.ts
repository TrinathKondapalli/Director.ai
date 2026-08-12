// src/data/brandStrategist/engines/pipelineOrchestrator.ts
import { BrandStrategySession } from '../../../types/brandStrategist';
import { runPsychologyEngine } from './psychologyEngine';
import { runResearchEngine } from './researchEngine';
import { runCompetitorEngine } from './competitorEngine';
import { runPositioningEngine } from './positioningEngine';
import { runDifferentiationEngine } from './differentiationEngine';
import { runPersonalityEngine } from './personalityEngine';
import { runMessagingEngine } from './messagingEngine';
import { runExperienceEngine } from './experienceEngine';
import { runVisualDirectionEngine } from './visualDirectionEngine';
import { runEvaluationEngine } from './evaluationEngine';
import { runRefinementEngine } from './refinementEngine';
import { runReportEngine } from './reportEngine';

/**
 * Phase A: Run pre-checkpoint-1 pipeline
 * Discovery -> Psychology -> Research -> Competitors -> CHECKPOINT_1
 */
export async function runPipelinePhaseA(session: BrandStrategySession): Promise<BrandStrategySession> {
  let s = await runPsychologyEngine(session);
  s = await runResearchEngine(s);
  s = await runCompetitorEngine(s);
  s.step = 'CHECKPOINT_1';
  return s;
}

/**
 * Phase B: Run pre-checkpoint-2 pipeline
 * CHECKPOINT_1 -> Positioning -> CHECKPOINT_2
 */
export async function runPipelinePhaseB(session: BrandStrategySession): Promise<BrandStrategySession> {
  let s = await runPositioningEngine(session);
  s.step = 'CHECKPOINT_2';
  return s;
}

/**
 * Phase C: Run pre-checkpoint-3 pipeline
 * CHECKPOINT_2 -> Differentiation -> Personality -> Messaging -> Experience -> Visual Direction -> Self-Critique -> CHECKPOINT_3
 */
export async function runPipelinePhaseC(session: BrandStrategySession): Promise<BrandStrategySession> {
  let s = await runDifferentiationEngine(session);
  s = await runPersonalityEngine(s);
  s = await runMessagingEngine(s);
  s = await runExperienceEngine(s);
  s = await runVisualDirectionEngine(s);
  s = await runEvaluationEngine(s);
  s = await runRefinementEngine(s);
  s.step = 'CHECKPOINT_3';
  return s;
}

/**
 * Phase D: Finalize Strategy Report
 * CHECKPOINT_3 -> Final Strategy Report
 */
export async function runPipelinePhaseD(session: BrandStrategySession): Promise<BrandStrategySession> {
  return await runReportEngine(session);
}
