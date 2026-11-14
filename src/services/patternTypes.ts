import type { ClassLevel, PlanningStep } from '../types';

export interface StepSpec {
  title: string;
  fraction: number;
  teacher: (
    theme: string,
    ageRange: string,
    classLevel: ClassLevel,
  ) => string;
  children: (
    theme: string,
    ageRange: string,
    classLevel: ClassLevel,
  ) => string;
  interventions: (
    theme: string,
    ageRange: string,
    classLevel: ClassLevel,
  ) => string[];
}

export interface SafetyResult {
  notes: string[];
  alternative: string | null;
}

export interface ActivityPattern {
  id: string;
  keywords: string[];
  description: string;

  // Campos de experiência específicos do grupo selecionado.
  bnccFields: string[];
  buildBnccFields?: (classLevel: ClassLevel) => string[];

  // Objetivos construídos conforme a atividade e o grupo.
  buildObjectives: (
    theme: string,
    ageRange: string,
    classLevel: ClassLevel,
  ) => string[];

  // Materiais escolhidos conforme a proposta e o grupo.
  buildMaterials: (
    theme: string,
    classLevel: ClassLevel,
  ) => string[];

  // Etapas específicas, quando o padrão precisar variar por grupo.
  stepSpecs: StepSpec[];
  buildStepSpecs?: (
    theme: string,
    ageRange: string,
    classLevel: ClassLevel,
  ) => StepSpec[];

  // Segurança e inclusão contextualizadas.
  buildSafety: (
    classLevel: ClassLevel,
    ageRange: string,
  ) => SafetyResult;

  buildAdaptations: (
    classLevel: ClassLevel,
    ageRange: string,
  ) => string[];
}

export type { ClassLevel, PlanningStep };
