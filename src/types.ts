export type ClassLevel =
  | 'Grupo 1'
  | 'Grupo 2'
  | 'Grupo 3'
  | 'Grupo 4'
  | 'Grupo 5';

export interface PlanningInput {
  classLevel: ClassLevel;
  theme: string;
  duration: string;
}

export interface PlanningStep {
  title: string;
  durationMin: number;
  teacherAction: string;
  childrenAction: string;
  interventions: string[];
}

export interface PlanningResult {
  experienceDescription: string;
  pedagogicalIntent: string;
  objectives: string[];
  bnccFields: string[];
  bnccRationale: string;
  materials: string[];
  steps: PlanningStep[];
  safetyNotes: string[];
  safetyAlternative: string | null;
  adaptations: string[];
  observationIndicators: string[];
}

export interface GenerateOptions {
  input: PlanningInput;
  signal?: AbortSignal;
}
