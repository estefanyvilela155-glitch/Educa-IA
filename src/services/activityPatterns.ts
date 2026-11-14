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
} from './pedagogicalHelpers';

/**
 * Sistema de interpretação de atividades pedagógicas (protótipo).
 *
 * Cada padrão descreve um tipo de atividade recorrente na Educação Infantil.
 * O tema informado pelo professor é comparado a palavras-chave e, quando há
 * correspondência, o padrão fornece objetivos, materiais, etapas, cuidados de
 * segurança, adaptações e campos da BNCC coerentes com a proposta. Quando
 * nenhum padrão corresponde, usa-se o plano genérico, que respeita o tema sem
 * inserir materiais alheios à proposta.
 *
 * Esta camada está preparada para ser substituída por uma API de IA: o
 * contrato (tema + turma + duração → PlanningResult) já é o mesmo.
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

    // Prioriza a proposta mais específica: palavras-chave mais informativas
    // têm maior peso; em empate, vence o padrão com mais correspondências.
    const score = matchedKeywords.reduce((sum, keyword) => sum + keyword.length ** 2, 0);
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
  const totalMinutes = parseDurationMinutes(duration);

  const steps = buildSteps(pattern.stepSpecs, theme, ageRange, totalMinutes);

  // Verificação interna: a soma dos tempos deve ser exatamente o total informado.
  // A geração só prossegue se a soma corresponder exatamente ao tempo informado.
  if (!verifyTimeSum(steps, totalMinutes)) {
    throw new Error('A distribuição do tempo não corresponde à duração informada.');
  }

  const safety = pattern.buildSafety(classLevel, ageRange);
  const adaptations = pattern.buildAdaptations(classLevel, ageRange);

  return {
    objectives: pattern.buildObjectives(theme, ageRange),
    bnccFields: pattern.bnccFields,
    materials: pattern.buildMaterials(theme, classLevel),
    steps,
    safetyNotes: safety.notes,
    safetyAlternative: safety.alternative,
    adaptations,
  };
}

export { CLASS_AGE_RANGE };
