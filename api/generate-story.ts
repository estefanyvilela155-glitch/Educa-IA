
declare const process: {
  env: Record<string, string | undefined>;
};

const AGE_RANGES: Record<string, string> = {
  'Grupo 1': '1 a 2 anos',
  'Grupo 2': '2 a 3 anos',
  'Grupo 3': '3 a 4 anos',
  'Grupo 4': '4 a 5 anos',
  'Grupo 5': '5 a 6 anos',
};

const CHARACTER_TYPES = [
  'Animais',
  'Personagens humanos fictícios',
  'Fantasia',
  'Natureza',
  'Objetos personificados',
  'Surpresa da IA',
];

const STORY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string' },
    introduction: { type: 'string' },
    story: { type: 'string' },
    conversationQuestions: {
      type: 'array',
      items: { type: 'string' },
    },
    followUpActivity: { type: 'string' },
    pedagogicalIntent: { type: 'string' },
  },
  required: [
    'title',
    'introduction',
    'story',
    'conversationQuestions',
    'followUpActivity',
    'pedagogicalIntent',
  ],
};

const STORY_INSTRUCTIONS = `
Você é o criador de histórias educativas do Educa.IA,
especializado em Educação Infantil brasileira.

Crie histórias originais, sensíveis, interessantes e adequadas
à faixa etária informada.

PRINCÍPIOS:

1. A história deve ter começo, desenvolvimento e encerramento.
2. Use linguagem adequada à idade, sem infantilização excessiva.
3. Crie personagens interessantes e situações significativas.
4. Valorize imaginação, curiosidade, criatividade, convivência,
   respeito, amizade e descoberta.
5. Não transforme a história em uma lição moral rígida.
6. Não use personagens protegidos por direitos autorais.
7. Não reproduza histórias conhecidas.
8. Não use nomes ou dados de crianças reais.
9. Os nomes dos personagens devem ser inventados.
10. Evite estereótipos, preconceitos e representações discriminatórias.
11. Não associe dificuldades, comportamentos ou características
    a diagnósticos.
12. A história deve ser acolhedora e permitir diferentes
    interpretações e formas de participação.

UNIVERSOS POSSÍVEIS:

- Animais: animais reais ou imaginários.
- Personagens humanos fictícios: crianças, famílias,
  profissionais e personagens inventados.
- Fantasia: seres mágicos, criaturas, aventuras e mundos imaginários.
- Natureza: rios, árvores, flores, chuva, sol e elementos naturais.
- Objetos personificados: brinquedos, livros, lápis e objetos
  que ganham personalidade.
- Surpresa da IA: escolha livre e criativa.

Não limite as histórias a animais.
A escolha do universo deve respeitar o pedido da professora.

ESTRUTURA:

- Título criativo.
- Pequena introdução.
- História completa, com parágrafos.
- Perguntas abertas para conversar com as crianças.
- Atividade complementar simples e possível de realizar.
- Intencionalidade pedagógica.

A atividade complementar deve ser coerente com a história,
a faixa etária e o objetivo informado.

Responda exclusivamente no formato estruturado solicitado.
`;

function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}

function validateStory(value: unknown): value is Record<string, any> {
  if (!isObject(value)) return false;

  const requiredText = [
    'title',
    'introduction',
    'story',
    'followUpActivity',
    'pedagogicalIntent',
  ];

  if (!requiredText.every(
    (field) =>
      typeof value[field] === 'string' &&
      value[field].trim().length > 0,
  )) {
    return false;
  }

  return (
    Array.isArray(value.conversationQuestions) &&
    value.conversationQuestions.length > 0 &&
    value.conversationQuestions.every(
      (question: unknown) =>
        typeof question === 'string' && question.trim().length > 0,
    )
  );
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return jsonError('Método não permitido.', 405);
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return jsonError(
        'A conexão com a inteligência artificial ainda não foi configurada.',
        503,
      );
    }

    let input: unknown;

    try {
      input = await request.json();
    } catch {
      return jsonError('Os dados enviados são inválidos.', 400);
    }

    if (!isObject(input)) {
      return jsonError('Informe os dados da história.', 400);
    }

    const {
      classLevel,
      theme,
      objective,
      characterType,
      characterDetails,
    } = input;

    if (
      typeof classLevel !== 'string' ||
      !AGE_RANGES[classLevel]
    ) {
      return jsonError('Selecione uma turma válida.', 400);
    }

    if (
      typeof theme !== 'string' ||
      theme.trim().length < 3 ||
      theme.trim().length > 300
    ) {
      return jsonError('Informe um tema válido.', 400);
    }

    if (
      typeof objective !== 'string' ||
      objective.trim().length < 3 ||
      objective.trim().length > 300
    ) {
      return jsonError('Informe um objetivo pedagógico válido.', 400);
    }

    if (
      typeof characterType !== 'string' ||
      !CHARACTER_TYPES.includes(characterType)
    ) {
      return jsonError('Selecione um universo de personagens válido.', 400);
    }

    const details =
      typeof characterDetails === 'string'
        ? characterDetails.trim().slice(0, 250)
        : '';

    const userInput = `
Faixa etária: ${AGE_RANGES[classLevel]}
Turma: ${classLevel}
Tema: ${theme.trim()}
Objetivo pedagógico: ${objective.trim()}
Universo dos personagens: ${characterType}
Ideia opcional de personagem: ${details || 'Crie livremente.'}

Crie uma história original e completa.
Considere a faixa etária e o objetivo pedagógico.
Não utilize nomes de crianças reais.
`;

    try {
      const apiResponse = await fetch(
        'https://api.openai.com/v1/responses',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || 'gpt-6-astra',
            instructions: STORY_INSTRUCTIONS,
            input: userInput,
            max_output_tokens: 3500,
            text: {
              format: {
                type: 'json_schema',
                name: 'educa_ia_story',
                strict: true,
                schema: STORY_SCHEMA,
              },
            },
          }),
          signal: request.signal,
        },
      );

      const apiData = await apiResponse.json();

      if (!apiResponse.ok) {
        console.error(
          'Erro na geração da história:',
          apiData.error?.message || apiResponse.status,
        );

        return jsonError(
          'A inteligência artificial não conseguiu criar a história.',
          502,
        );
      }

      if (apiData.status === 'incomplete') {
        return jsonError(
          'A história ficou incompleta. Tente novamente.',
          502,
        );
      }

      const outputItems = Array.isArray(apiData.output)
        ? apiData.output
        : [];

      const refusal = outputItems.some((item: any) =>
        Array.isArray(item.content) &&
        item.content.some(
          (content: any) => content.type === 'refusal',
        ),
      );

      if (refusal) {
        return jsonError('Não foi possível atender a essa solicitação.', 422);
      }

      const outputText = outputItems
        .flatMap((item: any) =>
          Array.isArray(item.content) ? item.content : [],
        )
        .find((content: any) => content.type === 'output_text')
        ?.text;

      if (!outputText) {
        return jsonError('A IA não retornou uma história válida.', 502);
      }

      let result: unknown;

      try {
        result = JSON.parse(outputText);
      } catch {
        return jsonError('Não foi possível interpretar a história.', 502);
      }

      if (!validateStory(result)) {
        return jsonError('A história gerada não passou pela validação.', 502);
      }

      return Response.json({ result });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return jsonError('Solicitação cancelada.', 408);
      }

      console.error('Erro ao criar história:', error);

      return jsonError(
        'Não foi possível conectar à inteligência artificial.',
        500,
      );
    }
  },
};
