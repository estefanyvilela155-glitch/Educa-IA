import type { ClassLevel } from '../../types';
import type { ActivityPattern, SafetyResult, StepSpec } from '../patternTypes';

const GROUP_GUIDANCE: Record<ClassLevel, {
  focus: string;
  experience: string;
  mediation: string;
  questions: string[];
}> = {
  'Grupo 1': {
    focus: 'escuta, observação de imagens, reconhecimento de sons, gestos e interação com a narrativa',
    experience: 'acompanhar uma narrativa breve com imagens expressivas, objetos e entonação, respeitando as manifestações de cada criança',
    mediation: 'utilizar frases curtas, repetição, expressões faciais, pausas e recursos visuais, acolhendo respostas por olhares, gestos, sons e movimentos',
    questions: [
      'Onde está o personagem?',
      'Que som será que ele faz?',
      'Vamos olhar o que aparece nesta imagem?',
    ],
  },
  'Grupo 2': {
    focus: 'participação na narrativa, ampliação do vocabulário, reconhecimento de personagens e antecipação de acontecimentos',
    experience: 'acompanhar histórias com repetição, imagens, objetos e oportunidades de completar sons, gestos e pequenas expressões',
    mediation: 'incentivar a participação espontânea, repetir palavras importantes e relacionar elementos da história às experiências das crianças',
    questions: [
      'Quem apareceu na história?',
      'O que será que acontece agora?',
      'Como podemos imitar esse personagem?',
    ],
  },
  'Grupo 3': {
    focus: 'compreensão de acontecimentos, expressão de ideias, imaginação e reconto com diferentes linguagens',
    experience: 'acompanhar narrativas, comentar acontecimentos, organizar imagens e representar cenas por fala, gestos e brincadeiras',
    mediation: 'convidar as crianças a relacionar acontecimentos, expressar opiniões e recontar partes da história com apoio de imagens',
    questions: [
      'O que aconteceu primeiro?',
      'Por que você acha que o personagem fez isso?',
      'Como podemos representar essa parte da história?',
    ],
  },
  'Grupo 4': {
    focus: 'interpretação, sequência narrativa, criação de hipóteses e expressão de diferentes pontos de vista',
    experience: 'investigar personagens e acontecimentos, organizar sequências de cenas e imaginar possibilidades para a narrativa',
    mediation: 'estimular a construção de explicações, a escuta entre colegas e a elaboração de diferentes interpretações',
    questions: [
      'O que levou o personagem a agir dessa maneira?',
      'O que poderia ter acontecido se ele tivesse escolhido outra coisa?',
      'Como podemos organizar as cenas na ordem dos acontecimentos?',
    ],
  },
  'Grupo 5': {
    focus: 'autoria, elaboração de narrativas, argumentação, imaginação e criação coletiva',
    experience: 'analisar a estrutura da narrativa, criar novos desdobramentos, inventar personagens e produzir versões próprias da história',
    mediation: 'incentivar a autoria, a organização de ideias, a argumentação e a colaboração na construção de narrativas',
    questions: [
      'Que outro caminho a história poderia seguir?',
      'Como podemos criar um novo final que faça sentido?',
      'Que personagem ou acontecimento poderíamos acrescentar?',
    ],
  },
};

function createStepSpecs(classLevel: ClassLevel): StepSpec[] {
  const guidance = GROUP_GUIDANCE[classLevel];

  return [
    {
      title: 'Aproximação com a história',
      fraction: 2,
      teacher: (theme, ageRange) =>
        `Apresente a narrativa relacionada ao tema "${theme}". Utilize um livro, imagens, objetos ou outros recursos que despertem curiosidade. Organize o espaço de maneira confortável e acessível. Para a faixa de ${ageRange}, valorize ${guidance.focus}.`,
      children: () =>
        'As crianças observam os materiais, demonstram curiosidade, apontam elementos, fazem comentários ou se aproximam dos recursos apresentados. Cada uma participa conforme seu interesse e suas possibilidades.',
      interventions: () => [
        'Observar quais imagens e personagens despertam interesse.',
        'Acolher manifestações verbais e não verbais.',
        'Criar um ambiente de escuta sem exigir que todas as crianças permaneçam na mesma posição.',
      ],
    },
    {
      title: 'Contação e exploração da narrativa',
      fraction: 4,
      teacher: (_theme, ageRange) =>
        `Conte a história utilizando entonação, pausas, expressões e recursos visuais adequados à faixa de ${ageRange}. A experiência deve permitir ${guidance.experience}. Mostre as ilustrações e dê tempo para que as crianças observem e reajam aos acontecimentos.`,
      children: () =>
        'As crianças acompanham a narrativa, observam imagens, reconhecem personagens, fazem comentários, repetem expressões, produzem sons ou demonstram reações aos acontecimentos.',
      interventions: () => [
        ...guidance.questions,
        'Observar sinais de interesse, curiosidade, desconforto ou necessidade de pausa.',
      ],
    },
    {
      title: 'Interação e construção de sentidos',
      fraction: 3,
      teacher: () =>
        `Retome elementos importantes da história e convide as crianças a interagir com personagens, imagens e acontecimentos. ${guidance.mediation}. Não transforme a conversa em uma sequência de perguntas com respostas obrigatórias.`,
      children: () =>
        'As crianças podem comentar, apontar, imitar personagens, relacionar acontecimentos às próprias experiências ou demonstrar interpretações por diferentes linguagens.',
      interventions: () => [
        'O que chamou sua atenção nesta parte?',
        'Que outro detalhe conseguimos observar?',
        'Acolher interpretações diferentes, sem apresentar uma única resposta como obrigatória.',
      ],
    },
    {
      title: 'Recriação e ampliação da narrativa',
      fraction: 4,
      teacher: (theme) =>
        `Proponha uma experiência de recriação relacionada à história "${theme}". A atividade deve considerar as possibilidades do grupo: imitar sons e gestos, representar personagens, reorganizar imagens, recontar acontecimentos ou criar novos episódios. Incentive a autoria e não obrigue todas as crianças a falar ou dramatizar.`,
      children: () =>
        'As crianças participam da recriação por meio de gestos, sons, falas, brincadeiras, imagens, dramatizações ou criação de novas possibilidades para a narrativa.',
      interventions: () => [
        'Que parte da história você gostaria de representar?',
        'Como podemos mostrar esse acontecimento de outra maneira?',
        'Oferecer diferentes formas de participação, inclusive observar antes de entrar na brincadeira.',
      ],
    },
    {
      title: 'Compartilhamento e encerramento',
      fraction: 2,
      teacher: () =>
        'Convide as crianças a compartilhar o que mais chamou sua atenção. Retome personagens, imagens ou acontecimentos significativos e organize os materiais com a participação da turma. Registre manifestações e descobertas para acompanhar o envolvimento das crianças com as narrativas.',
      children: () =>
        'As crianças podem mostrar personagens, comentar acontecimentos, demonstrar uma cena ou escolher uma imagem de que gostaram. Também podem participar da organização dos recursos.',
      interventions: () => [
        'Que personagem ou parte da história você gostaria de rever?',
        'O que você descobriu ou imaginou durante a atividade?',
        'Registrar falas, gestos, escolhas e formas de participação.',
      ],
    },
  ];
}

export const storytelling: ActivityPattern = {
  id: 'storytelling',

  keywords: [
    'história',
    'historia',
    'conto',
    'contar',
    'narrativa',
    'livro',
    'leitura',
    'contação',
    'contacao',
    'fábula',
    'fabula',
    'lenda',
  ],

  description: 'Contação de histórias e experiências narrativas',

  bnccFields: [
    'Escuta, fala, pensamento e imaginação',
    'O eu, o outro e o nós',
    'Corpo, gestos e movimentos',
  ],

  buildBnccFields: () => [
    'Escuta, fala, pensamento e imaginação',
    'O eu, o outro e o nós',
    'Corpo, gestos e movimentos',
  ],

  buildObjectives: (theme, _ageRange, classLevel) => {
    const objectives: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        `Participar de experiências de escuta e observação de narrativas relacionadas ao tema "${theme}".`,
        'Explorar imagens, sons, gestos e expressões presentes nas histórias.',
        'Ampliar as possibilidades de interação e comunicação durante experiências narrativas.',
      ],
      'Grupo 2': [
        `Ampliar o interesse por histórias e narrativas relacionadas ao tema "${theme}".`,
        'Reconhecer e explorar personagens, imagens, sons e acontecimentos da narrativa.',
        'Participar de situações de escuta, repetição e interação por diferentes linguagens.',
      ],
      'Grupo 3': [
        `Expressar ideias e interpretações sobre narrativas relacionadas ao tema "${theme}".`,
        'Reconhecer acontecimentos e personagens e participar de experiências de reconto.',
        'Utilizar fala, gestos, imagens e brincadeiras para representar partes da história.',
      ],
      'Grupo 4': [
        `Interpretar acontecimentos e relações entre personagens em narrativas relacionadas ao tema "${theme}".`,
        'Organizar sequências de acontecimentos e elaborar hipóteses sobre a história.',
        'Participar de situações de reconto, dramatização e criação de diferentes possibilidades narrativas.',
      ],
      'Grupo 5': [
        `Criar e compartilhar narrativas próprias a partir de histórias e experiências relacionadas ao tema "${theme}".`,
        'Organizar ideias e acontecimentos em sequências narrativas com coerência.',
        'Expressar opiniões, justificar escolhas e colaborar na produção de narrativas coletivas.',
      ],
    };

    return objectives[classLevel];
  },

  buildMaterials: (theme, classLevel) => {
    const materials = [
      `Livro, texto ou narrativa relacionada ao tema "${theme}"`,
      'Imagens, ilustrações ou objetos que ajudem a representar personagens e acontecimentos',
      'Espaço organizado e acessível para a experiência narrativa',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      return [
        ...materials,
        'Livros resistentes e adequados à manipulação infantil, sem partes pequenas destacáveis',
        'Objetos ou recursos visuais previamente avaliados para a faixa etária',
        'Recursos sonoros simples, se contribuírem para a narrativa',
      ];
    }

    if (classLevel === 'Grupo 3') {
      return [
        ...materials,
        'Cartões com imagens de personagens e acontecimentos',
        'Fantoches ou objetos de representação adequados à turma',
      ];
    }

    return [
      ...materials,
      'Cartões ou imagens para organização de sequências narrativas',
      'Materiais para desenho, registro ou criação de novas cenas',
      'Recursos para dramatização e produção coletiva, conforme a proposta',
    ];
  },

  stepSpecs: createStepSpecs('Grupo 3'),

  buildStepSpecs: (_theme, _ageRange, classLevel) =>
    createStepSpecs(classLevel),

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes = [
      'Organizar o espaço para permitir circulação e acomodação confortável das crianças.',
      'Verificar livros, fantoches, cartões e objetos para identificar pontas, partes soltas ou componentes pequenos.',
      'Selecionar narrativas considerando a faixa etária, o contexto e as possíveis reações emocionais das crianças.',
      'Respeitar manifestações de medo, desconforto ou desinteresse, oferecendo acolhimento e possibilidade de afastamento.',
      'Garantir que todos os recursos estejam acessíveis e sejam utilizados com acompanhamento adequado.',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      notes.push(
        'Para crianças de 1 a 3 anos, verificar especialmente o risco de ingestão ou aspiração de partes pequenas de livros, fantoches e objetos utilizados na contação.',
      );
    }

    return {
      notes,
      alternative:
        'Se algum recurso não for adequado, substituí-lo por imagens, narração oral, gestos ou objetos maiores e previamente avaliados.',
    };
  },

  buildAdaptations: (classLevel, _ageRange) => {
    const adaptations: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        'Utilizar imagens expressivas, repetição de palavras e sons e narrativas breves, respeitando o interesse das crianças.',
        'Permitir que a criança acompanhe a história por olhares, gestos, movimentos ou sons.',
        'Oferecer apoio próximo e liberdade para mudar de posição ou observar de outro lugar.',
      ],
      'Grupo 2': [
        'Utilizar objetos, imagens e repetições para apoiar a compreensão e a participação.',
        'Permitir que as crianças imitem personagens, apontem imagens ou completem sons e expressões.',
        'Oferecer tempo para observar e interagir antes de solicitar uma manifestação.',
      ],
      'Grupo 3': [
        'Disponibilizar imagens para apoiar o reconto e a organização de acontecimentos.',
        'Permitir que a criança represente a história por fala, gestos, desenhos ou dramatização.',
        'Oferecer apoio para expressar ideias e relacionar acontecimentos.',
      ],
      'Grupo 4': [
        'Disponibilizar sequências de imagens e recursos para dramatização.',
        'Propor diferentes formas de interpretar e representar acontecimentos.',
        'Apoiar a participação de crianças que necessitem de recursos visuais, gestuais ou comunicação alternativa.',
      ],
      'Grupo 5': [
        'Disponibilizar materiais para criação de personagens, cenários e novos episódios.',
        'Permitir produções narrativas individuais ou coletivas por diferentes linguagens.',
        'Oferecer recursos de apoio à organização das ideias sem retirar a autoria das crianças.',
      ],
    };

    return adaptations[classLevel];
  },
};
