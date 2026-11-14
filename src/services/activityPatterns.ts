import type { ClassLevel, PlanningResult } from '../types';
import type { ActivityPattern } from './patternTypes';
import { grainTransfer } from './patterns/grainTransfer';
import { painting } from './patterns/painting';
import { storytelling } from './patterns/storytelling';
import { music } from './patterns/music';
import { nature } from './patterns/nature';
import { sensoryPlay } from './patterns/sensoryPlay';
import { generic } from './patterns/generic';
import {
  CLASS_AGE_RANGE,
  getClassPedagogicalProfile,
  buildSteps,
  verifyTimeSum,
  parseDurationMinutes,
} from './pedagogicalHelpers';

/**
 * Sistema de interpretação de atividades pedagógicas (protótipo).
 *
 * Cada padrão descreve um tipo de atividade recorrente na Educação Infantil.
 * O tema informado é comparado a palavras-chave e, quando há correspondência,
 * o padrão fornece objetivos, materiais, etapas e cuidados de segurança.
 *
 * O perfil pedagógico da turma complementa todos os planejamentos,
 * considerando participação, mediação, observação e diferentes ritmos.
 *
 * Esta camada utiliza padrões e regras locais. Não há uma API de IA conectada.
 */

const PATTERNS: ActivityPattern[] = [
  grainTransfer,
  painting,
  storytelling,
  music,
  nature,
  sensoryPlay,
];

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function matchPattern(theme: string): ActivityPattern {
  const normalizedTheme = normalizeText(theme);
  let bestMatch: ActivityPattern | null = null;
  let bestScore = 0;

  for (const pattern of PATTERNS) {
    const matchedKeywords = pattern.keywords
      .map(normalizeText)
      .filter((keyword) => normalizedTheme.includes(keyword));

    if (matchedKeywords.length === 0) continue;

    const score = matchedKeywords.reduce(
      (sum, keyword) => sum + keyword.length ** 2,
      0,
    );

    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }

  return bestMatch ?? generic;
}

export function generatePlanningContent(
  classLevel: ClassLevel,
  theme: string,
  duration: string,
): PlanningResult {
  const pattern = matchPattern(theme);
  const ageRange = CLASS_AGE_RANGE[classLevel];
  const profile = getClassPedagogicalProfile(classLevel);
  const totalMinutes = parseDurationMinutes(duration);

  const steps = buildSteps(
    pattern.stepSpecs,
    theme,
    ageRange,
    totalMinutes,
  );

  // Acrescenta orientações pedagógicas específicas da turma ao planejamento.
  if (steps.length > 0) {
    steps[0] = {
      ...steps[0],
      teacherAction:
        `${steps[0].teacherAction}\n\n` +
        `Mediação pedagógica: ${profile.mediation}`,
      childrenAction:
        `${steps[0].childrenAction}\n\n` +
        `Formas de participação: ${profile.participation}`,
    };

    const lastIndex = steps.length - 1;

    steps[lastIndex] = {
      ...steps[lastIndex],
      interventions: [
        ...steps[lastIndex].interventions,
        `Observação pedagógica: ${profile.observation}`,
      ],
    };
  }

  // A soma dos tempos precisa corresponder exatamente à duração informada.
  if (!verifyTimeSum(steps, totalMinutes)) {
    throw new Error(
      'A distribuição do tempo não corresponde à duração informada.',
    );
  }

  const safety = pattern.buildSafety(classLevel, ageRange);
  const adaptations = pattern.buildAdaptations(classLevel, ageRange);

  return {
    objectives: [
      ...pattern.buildObjectives(theme, ageRange),
      `Foco pedagógico da turma: ${profile.focus}`,
    ],
    bnccFields: pattern.bnccFields,
    materials: pattern.buildMaterials(theme, classLevel),
    steps,
    safetyNotes: safety.notes,
    safetyAlternative: safety.alternative,
    adaptations: [
      ...adaptations,
      `Respeite os diferentes ritmos, interesses e formas de participação. Ofereça apoio quando necessário, sem obrigar todas as crianças a realizar a atividade da mesma maneira.`,
    ],
  };
}

export { CLASS_AGE_RANGE };
