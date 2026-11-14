import type { GenerateOptions, PlanningResult } from '../types';

export async function generatePlanning(
  options: GenerateOptions,
): Promise<PlanningResult> {
  const response = await fetch('/api/generate-planning', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.input),
    signal: options.signal,
  });

  let data: {
    result?: PlanningResult;
    error?: string;
  };

  try {
    data = await response.json();
  } catch {
    throw new Error(
      'O servidor retornou uma resposta inválida. Tente novamente.',
    );
  }

  if (!response.ok || !data.result) {
    throw new Error(
      data.error || 'Não foi possível gerar o planejamento.',
    );
  }

  return data.result;
}
