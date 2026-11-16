
import type {
  GenerateStoryOptions,
  StoryResult,
} from '../types';

export async function generateStory(
  options: GenerateStoryOptions,
): Promise<StoryResult> {
  const response = await fetch('/api/generate-story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.input),
    signal: options.signal,
  });

  let data: {
    result?: StoryResult;
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
    throw new Error(data.error || 'Não foi possível criar a história.');
  }

  return data.result;
}
