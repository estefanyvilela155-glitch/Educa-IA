
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
  inclusionSupports: string[];
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

export type StoryCharacterType =
  | 'Animais'
  | 'Personagens humanos fictícios'
  | 'Fantasia'
  | 'Natureza'
  | 'Objetos personificados'
  | 'Surpresa da IA';

export interface StoryInput {
  classLevel: ClassLevel;
  theme: string;
  objective: string;
  characterType: StoryCharacterType;
  characterDetails: string;
}

export interface StoryResult {
  title: string;
  introduction: string;
  story: string;
  conversationQuestions: string[];
  followUpActivity: string;
  pedagogicalIntent: string;
}

export interface GenerateStoryOptions {
  input: StoryInput;
  signal?: AbortSignal;
}
