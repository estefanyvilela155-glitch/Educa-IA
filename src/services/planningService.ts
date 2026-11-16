import type { GenerateOptions, PlanningResult } from '../types';
import { generatePlanningContent } from './activityPatterns';

export async function generatePlanning(
  options: GenerateOptions,
): Promise<PlanningResult> {
  if (options.signal?.aborted) {
    throw new Error('Geração cancelada.');
  }

  const { classLevel, theme, duration } = options.input;

  return generatePlanningContent(
    classLevel,
    theme,
    duration,
  );
}
