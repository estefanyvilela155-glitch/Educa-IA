import type { ClassLevel, PlanningStep } from '../types';

export interface StepSpec {
  title: string;
  fraction: number;
  teacher: (theme: string, ageRange: string) => string;
  children: (theme: string, ageRange: string) => string;
  interventions: (theme: string, ageRange: string) => string[];
}

export interface SafetyResult {
  notes: string[];
  alternative: string | null;
}

export interface ActivityPattern {
  id: string;
  keywords: string[];
  description: string;
  bnccFields: string[];
  buildObjectives: (theme: string, ageRange: string) => string[];
  buildMaterials: (theme: string, classLevel: ClassLevel) => string[];
  stepSpecs: StepSpec[];
  buildSafety: (classLevel: ClassLevel, ageRange: string) => SafetyResult;
  buildAdaptations: (classLevel: ClassLevel, ageRange: string) => string[];
}

export type { ClassLevel, PlanningStep };
