import type { ClassLevel, PlanningStep } from '../types';
import type { StepSpec } from './patternTypes';

export const CLASS_AGE_RANGE: Record<ClassLevel, string> = {
  Berçário: '0 a 1 ano',
  'Grupo 1': '1 a 2 anos',
  'Grupo 2': '2 a 3 anos',
  'Grupo 3': '3 a 4 anos',
  'Grupo 4': '4 a 5 anos',
  'Grupo 5': '5 a 6 anos',
};

export function isUnder3(classLevel: ClassLevel): boolean {
  return classLevel === 'Berçário' || classLevel === 'Grupo 1' || classLevel === 'Grupo 2';
}

export function isUnder2(classLevel: ClassLevel): boolean {
  return classLevel === 'Berçário' || classLevel === 'Grupo 1';
}

export function parseDurationMinutes(durationStr: string): number {
  const match = durationStr.match(/(\d+)/);
  const minutes = match ? Number.parseInt(match[1], 10) : Number.NaN;
  if (!Number.isFinite(minutes) || minutes <= 0) {
    throw new RangeError('Informe uma duração válida em minutos.');
  }
  return minutes;
}

/**
 * Distribui o tempo total entre as etapas de modo que a soma seja exatamente
 * o total informado. Cada etapa recebe um valor inteiro de minutos, com o
 * arredondamento aplicado na última etapa para compensar diferenças.
 */
export function distributeTime(specs: StepSpec[], totalMinutes: number): number[] {
  if (!Number.isInteger(totalMinutes) || totalMinutes < specs.length) {
    throw new RangeError('O tempo disponível precisa permitir ao menos 1 minuto por etapa.');
  }
  if (specs.length === 0) return [];

  const weights = specs.map((spec) => Math.max(0, spec.fraction));
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  if (weightSum <= 0) {
    throw new RangeError('As etapas precisam ter frações de tempo positivas.');
  }

  // Reserva um minuto por etapa e distribui o restante pelo método dos
  // maiores restos. Assim, nenhuma etapa fica zerada e a soma é exata.
  const remaining = totalMinutes - specs.length;
  const raw = weights.map((weight) => (weight / weightSum) * remaining);
  const extra = raw.map(Math.floor);
  let minutesLeft = remaining - extra.reduce((sum, value) => sum + value, 0);
  const order = raw
    .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
    .sort((a, b) => b.remainder - a.remainder);

  for (let i = 0; i < minutesLeft; i++) {
    extra[order[i].index] += 1;
  }

  return extra.map((value) => value + 1);
}

export function buildSteps(
  specs: StepSpec[],
  theme: string,
  ageRange: string,
  totalMinutes: number,
): PlanningStep[] {
  const durations = distributeTime(specs, totalMinutes);
  return specs.map((spec, i) => ({
    title: spec.title,
    durationMin: durations[i],
    teacherAction: spec.teacher(theme, ageRange),
    childrenAction: spec.children(theme, ageRange),
    interventions: spec.interventions(theme, ageRange),
  }));
}

export function verifyTimeSum(steps: PlanningStep[], expected: number): boolean {
  const sum = steps.reduce((acc, s) => acc + s.durationMin, 0);
  return sum === expected;
}
