
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
  buildSteps,
  verifyTimeSum,
  parseDurationMinutes,
  getClassPedagogicalProfile,
} from './pedagogicalHelpers';

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
    .toLowerCase()
    .trim();
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

  const stepSpecs =
    pattern.buildStepSpecs?.(theme, ageRange, classLevel) ??
    pattern.stepSpecs;

  const steps = buildSteps(
    stepSpecs,
    theme,
    ageRange,
    totalMinutes,
    classLevel,
  );

  if (!verifyTimeSum(steps, totalMinutes)) {
    throw new Error(
      'A distribuição do tempo não corresponde à duração informada.',
    );
  }

  const safety = pattern.buildSafety(classLevel, ageRange);

  const adaptations = pattern.buildAdaptations(
    classLevel,
    ageRange,
  );

  const objectives = pattern.buildObjectives(
    theme,
    ageRange,
    classLevel,
  );

  const bnccFields =
    pattern.buildBnccFields?.(classLevel) ??
    pattern.bnccFields;

  return {
    experienceDescription:
      `Experiência pedagógica sobre ${theme}, organizada para crianças de ${ageRange}. ${pattern.description}`,

    pedagogicalIntent:
      `Promover experiências de ${profile.focus.toLowerCase()} por meio da exploração do tema ${theme}, respeitando os diferentes ritmos e formas de participação das crianças.`,

    objectives,
    bnccFields,

    bnccRationale:
      `Os campos de experiência selecionados orientam vivências relacionadas ao tema ${theme}, considerando a faixa etária de ${ageRange} e as interações e brincadeiras como eixos da prática pedagógica.`,

    materials: pattern.buildMaterials(theme, classLevel),
    steps,
    safetyNotes: safety.notes,
    safetyAlternative: safety.alternative,
    adaptations,
    observationIndicators: [profile.observation],
  };
}

export { CLASS_AGE_RANGE };
