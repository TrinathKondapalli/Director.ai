// src/data/brandStrategist/engines/competitorEngine.ts
import { BrandStrategySession, CompetitorEngineResult } from '../../../types/brandStrategist';

/**
 * Run the CompetitorEngine.
 * Analyzes direct/indirect competitors, substitutes, crowded territories, generic claims, and white space opportunities.
 */
export async function runCompetitorEngine(session: BrandStrategySession): Promise<BrandStrategySession> {
  const brief = session.brief;
  const industry = brief?.industry || 'Software';

  const directCompetitors = [
    {
      name: 'Legacy Leader Corp',
      corePromise: 'Complete all-in-one enterprise software suite.',
      strengths: ['Brand recognition', 'Extensive feature matrix', 'Established enterprise sales team'],
      weaknesses: ['Bloated interface', 'Slow onboarding', 'Expensive licensing costs'],
    },
    {
      name: 'Agile Startup X',
      corePromise: 'Fastest lightweight workflow tool.',
      strengths: ['Modern aesthetic', 'Quick setup', 'Low pricing'],
      weaknesses: ['Limited deep analytics', 'Lack of enterprise security certifications'],
    },
  ];

  const indirectCompetitors = [
    { name: 'Custom Internal Spreadsheets', approach: 'Manual tracking using internal Excel/Sheets templates' },
    { name: 'Generic Task Managers', approach: 'Adapting Trello/Asana for specialized industry workflow' },
  ];

  const crowdedTerritories = [
    `The "All-in-one platform for ${industry}" positioning is heavily crowded.`,
    'Generic promises of "faster results with AI" are saturated and lose trust.',
  ];

  const genericClaims = [
    'Work smarter, not harder.',
    'The ultimate platform built for modern teams.',
    'Streamline your workflow effortlessly.',
  ];

  const competitorOwnedTerritories = [
    'Legacy Leader Corp owns the high-end enterprise security territory.',
    'Agile Startup X owns the budget micro-tool territory.',
  ];

  const whiteSpaceOpportunities = [
    'Intelligent Autonomous Guidance: Positioning as the AI Director that acts as a proactive strategic partner rather than a passive task grid.',
    'Guaranteed Time-to-Value: Zero-learning-curve execution that delivers actionable outcome within 5 minutes.',
  ];

  const result: CompetitorEngineResult = {
    directCompetitors,
    indirectCompetitors,
    crowdedTerritories,
    genericClaims,
    competitorOwnedTerritories,
    whiteSpaceOpportunities,
  };

  return {
    ...session,
    competitors: result,
  };
}
