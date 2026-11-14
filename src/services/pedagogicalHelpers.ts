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
    focus:
      'Exploração sensorial, movimentos, descobertas com o corpo, manipulação de objetos e experiências concretas.',
    participation:
      'A participação pode acontecer por gestos, olhares, movimentos, sons, aproximações, manipulações ou observação.',
    mediation:
      'Oferecer experiências curtas e acolhedoras, demonstrar possibilidades de exploração e respeitar o tempo de cada criança, sem exigir respostas verbais ou movimentos específicos.',
    observation:
      'Observar curiosidade, reações sensoriais, movimentos, formas de manipular os materiais, iniciativas, preferências e sinais de conforto ou desconforto.',
  },
  'Grupo 2': {
    focus:
      'Exploração, linguagem em desenvolvimento, imitação, brincadeira, descobertas, escolhas simples e interação com outras crianças.',
    participation:
      'As crianças podem participar explorando, imitando, apontando, nomeando, fazendo sons, escolhendo ou observando antes de se envolver.',
    mediation:
      'Utilizar orientações simples e concretas, demonstrar ações, oferecer escolhas possíveis e ampliar as descobertas sem exigir que todas as crianças participem da mesma maneira.',
    observation:
      'Observar iniciativas, comunicação verbal e não verbal, curiosidade, interações, escolhas, formas de exploração e interesses demonstrados.',
  },
  'Grupo 3': {
    focus:
      'Ampliação da comunicação, imaginação, autonomia, exploração de diferentes possibilidades e construção de interações.',
    participation:
      'As crianças podem experimentar, fazer escolhas, compartilhar descobertas, criar, conversar ou participar por meio de ações e observações.',
    mediation:
      'Propor desafios acessíveis, incentivar a expressão de ideias, apoiar a autonomia e oferecer ajuda quando necessário, sem antecipar todas as soluções.',
    observation:
      'Observar estratégias, hipóteses, comunicação, criatividade, iniciativa, interação, interesses e diferentes formas de resolver situações.',
  },
  'Grupo 4': {
    focus:
      'Investigação, criatividade, expressão de ideias, cooperação, ampliação de conhecimentos e resolução de pequenos desafios.',
    participation:
      'As crianças podem levantar hipóteses, experimentar, comparar, criar, compartilhar ideias e colaborar, respeitando diferentes formas e ritmos de participação.',
    mediation:
      'Incentivar perguntas, descobertas e trocas entre as crianças, oferecendo pistas e intervenções que ampliem o pensamento sem entregar respostas prontas.',
    observation:
      'Observar hipóteses, argumentos, estratégias, criatividade, cooperação, autonomia, interesses e mudanças nas ideias durante a experiência.',
  },
  'Grupo 5': {
    focus:
      'Autonomia, investigação, planejamento coletivo, argumentação, criatividade e elaboração de estratégias para resolver desafios.',
    participation:
      'As crianças podem propor ideias, planejar ações, negociar possibilidades, investigar, criar e compartilhar descobertas, cada uma conforme suas possibilidades.',
    mediation:
      'Favorecer a reflexão, a tomada de decisões e a colaboração, apresentando desafios significativos e apoio quando necessário, sem transformar a atividade em uma tarefa rígida.',
    observation:
      'Observar iniciativa, argumentação, estratégias, capacidade de rever ideias, colaboração, autonomia, interesses e participação individual e coletiva.',
  },
};

export function getClassPedagogicalProfile(
  classLevel: ClassLevel,
): ClassPedagogicalProfile {
  return CLASS_PEDAGOGICAL_PROFILE[classLevel];
}

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
 * Distribui o tempo total entre as etapas de modo que a soma seja exatamente
 * o total informado. Cada etapa recebe um valor inteiro de minutos.
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

export function verifyTimeSum(
  steps: PlanningStep[],
  expected: number,
): boolean {
  const sum = steps.reduce((acc, step) => acc + step.durationMin, 0);
  return sum === expected;
}
