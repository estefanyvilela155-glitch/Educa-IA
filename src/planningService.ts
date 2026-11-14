import type { GenerateOptions, PlanningResult } from '../types';
import { generatePlanningContent } from './activityPatterns';

/**
 * Geração de planejamento pedagógico (protótipo).
 *
 * O conteúdo é gerado por um sistema de padrões que interpreta o tema
 * informado e produz objetivos, materiais, etapas e notas de segurança
 * coerentes com a proposta pedagógica.
 *
 * Esta função está estruturada para ser substituída por uma chamada a uma
 * API de IA no futuro. A assinatura (input → PlanningResult) já reflete o
 * contrato esperado; basta trocar o corpo da função por um `fetch` para o
 * endpoint desejado.
 */

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

export async function generatePlanning(
  options: GenerateOptions,
): Promise<PlanningResult> {
  const { input, signal } = options;

  // Simula latência de rede — removido quando a API real for conectada.
  await delay(900, signal);

  return generatePlanningContent(input.classLevel, input.theme, input.duration);
}
