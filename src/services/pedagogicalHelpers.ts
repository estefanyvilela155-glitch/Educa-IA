import type { ClassLevel, PlanningStep } from '../types';
import type { StepSpec } from './patternTypes';


export const CLASS_AGE_RANGE: Record<ClassLevel, string> = {
  'Grupo 1': '1 a 2 anos',
  'Grupo 2': '2 a 3 anos',
  'Grupo 3': '3 a 4 anos',
  'Grupo 4': '4 a 5 anos',
  'Grupo 5': '5 a 6 anos',
};

export interface ClassPedagogicalProfile {
  focus: string;
  participation: string;
  mediation: string;
  observation: string;
}

export const CLASS_PEDAGOGICAL_PROFILE: Record<
  ClassLevel,
  ClassPedagogicalProfile
> = {
  'Grupo 1': {
    focus: 'Experiências concretas, exploração, movimento, expressão e descobertas.',
    participation: 'A participação pode acontecer por movimentos, gestos, olhares, sons, manipulação, aproximação ou observação.',
    mediation: 'Oferecer demonstrações, experiências acessíveis e tempo para exploração, respeitando as iniciativas e os sinais de cada criança.',
    observation: 'Observar interesses, iniciativas, movimentos, formas de exploração, comunicação e reações aos materiais.',
  },
  'Grupo 2': {
    focus: 'Exploração, brincadeira, comunicação, descobertas, escolhas e interação.',
    participation: 'As crianças podem experimentar, imitar, apontar, conversar, escolher, criar ou observar antes de participar.',
    mediation: 'Utilizar orientações concretas, demonstrar possibilidades e ampliar as experiências sem exigir respostas ou ações iguais.',
    observation: 'Observar escolhas, curiosidade, comunicação verbal e não verbal, interações e estratégias de exploração.',
  },
  'Grupo 3': {
    focus: 'Imaginação, comunicação, autonomia, investigação e ampliação das experiências.',
    participation: 'As crianças podem experimentar, criar, conversar, fazer escolhas, compartilhar descobertas ou participar por meio de ações.',
    mediation: 'Propor desafios possíveis, acolher hipóteses e apoiar a autonomia sem antecipar todas as soluções.',
    observation: 'Observar iniciativas, hipóteses, criatividade, comunicação, interesses e diferentes estratégias.',
  },
  'Grupo 4': {
    focus: 'Investigação, criatividade, expressão, cooperação e construção de conhecimentos.',
    participation: 'As crianças podem levantar hipóteses, comparar, experimentar, criar, compartilhar ideias e colaborar.',
    mediation: 'Incentivar perguntas, descobertas e trocas, oferecendo intervenções que ampliem o pensamento.',
    observation: 'Observar hipóteses, argumentos, estratégias, criatividade, colaboração e mudanças nas ideias.',
  },
  'Grupo 5': {
    focus: 'Investigação, autonomia, planejamento, argumentação, criação e resolução de problemas.',
    participation: 'As crianças podem propor ideias, planejar ações, investigar, negociar possibilidades e compartilhar descobertas.',
    mediation: 'Favorecer reflexão, tomada de decisões e colaboração, mantendo desafios significativos e apoio quando necessário.',
    observation: 'Observar iniciativa, argumentação, estratégias, autonomia, colaboração e capacidade de rever ideias.',
  },
};

export function getClassPedagogicalProfile(
  classLevel: ClassLevel,
): ClassPedagogicalProfile {
  return CLASS_PEDAGOGICAL_PROFILE[classLevel];
}

// Mantidas temporariamente para compatibilidade com os padrões existentes.
// Não devem ser utilizadas como regra universal de segurança ou desenvolvimento.
export function isUnder3(classLevel: ClassLevel): boolean {
  return classLevel === 'Grupo 1' || classLevel === 'Grupo 2';
}

export function isUnder2(classLevel: ClassLevel): boolean {
  return classLevel === 'Grupo 1';
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
 * Distribui o tempo entre as etapas.
 * A soma das durações será exatamente igual ao tempo solicitado.
 */
export function distributeTime(
  specs: StepSpec[],
  totalMinutes: number,
): number[] {
  if (specs.length === 0) return [];

  if (!Number.isInteger(totalMinutes) || totalMinutes < specs.length) {
    throw new RangeError(
      'O tempo disponível precisa permitir ao menos 1 minuto por etapa.',
    );
  }

  const weights = specs.map((spec) => Math.max(0, spec.fraction));
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);

  if (weightSum <= 0) {
    throw new RangeError('As etapas precisam ter frações de tempo positivas.');
  }

  const remaining = totalMinutes - specs.length;
  const raw = weights.map((weight) => (weight / weightSum) * remaining);
  const extra = raw.map(Math.floor);

  const minutesLeft =
    remaining - extra.reduce((sum, value) => sum + value, 0);

  const order = raw
    .map((value, index) => ({
      index,
      remainder: value - Math.floor(value),
    }))
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
  classLevel: ClassLevel,
): PlanningStep[] {
  const durations = distributeTime(specs, totalMinutes);

  return specs.map((spec, i) => ({
    title: spec.title,
    durationMin: durations[i],
    teacherAction: spec.teacher(theme, ageRange, classLevel),
    childrenAction: spec.children(theme, ageRange, classLevel),
    interventions: spec.interventions(theme, ageRange, classLevel),
  }));
}

export function verifyTimeSum(
  steps: PlanningStep[],
  expected: number,
): boolean {
  const sum = steps.reduce((acc, step) => acc + step.durationMin, 0);
  return sum === expected;
}
