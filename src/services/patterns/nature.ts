import type { ClassLevel } from '../../types';
import type { ActivityPattern, SafetyResult, StepSpec } from '../patternTypes';

const GROUP_GUIDANCE: Record<ClassLevel, {
  focus: string;
  experience: string;
  mediation: string;
  questions: string[];
}> = {
  'Grupo 1': {
    focus: 'observação, exploração sensorial acompanhada e interação com elementos naturais',
    experience: 'observar características visuais e táteis de elementos previamente avaliados, respeitando as iniciativas e reações das crianças',
    mediation: 'apresentar poucos elementos por vez, nomear características e acompanhar a exploração de perto',
    questions: [
      'Você percebeu esta folha?',
      'Que cor conseguimos observar?',
      'Vamos olhar este elemento novamente?',
    ],
  },
  'Grupo 2': {
    focus: 'exploração, reconhecimento de características, escolhas e descobertas',
    experience: 'explorar elementos naturais, reconhecer diferenças visíveis e participar de pequenas experiências de observação',
    mediation: 'incentivar escolhas, nomear características e apresentar comparações concretas',
    questions: [
      'Qual desses elementos chamou sua atenção?',
      'Esta folha parece igual à outra?',
      'O que você percebeu quando olhou de perto?',
    ],
  },
  'Grupo 3': {
    focus: 'investigação, comparação, agrupamento e comunicação de descobertas',
    experience: 'observar elementos, comparar características e organizar descobertas por critérios simples',
    mediation: 'incentivar hipóteses, comparações e explicações, oferecendo apoio quando necessário',
    questions: [
      'O que esses elementos têm de parecido?',
      'Como podemos organizar nossas descobertas?',
      'O que você percebeu de diferente?',
    ],
  },
  'Grupo 4': {
    focus: 'investigação, relações entre elementos naturais, hipóteses e observação de transformações',
    experience: 'investigar características, estabelecer relações, comparar elementos e observar fenômenos naturais',
    mediation: 'propor perguntas investigativas e incentivar que as crianças expliquem suas observações e revejam hipóteses',
    questions: [
      'Por que você acha que esses elementos são diferentes?',
      'O que pode acontecer com uma folha depois de alguns dias?',
      'Como poderíamos investigar essa ideia?',
    ],
  },
  'Grupo 5': {
    focus: 'investigação planejada, formulação de hipóteses, registros e comunicação de descobertas',
    experience: 'planejar pequenas investigações, observar fenômenos, comparar resultados e comunicar conclusões',
    mediation: 'estimular a elaboração de perguntas, o planejamento de observações e a revisão de ideias diante de novas descobertas',
    questions: [
      'O que queremos descobrir com esta investigação?',
      'Como podemos observar se nossa hipótese faz sentido?',
      'O que os registros mostram sobre o que aconteceu?',
    ],
  },
};

function createStepSpecs(classLevel: ClassLevel): StepSpec[] {
  const guidance = GROUP_GUIDANCE[classLevel];

  return [
    {
      title: 'Aproximação com o tema',
      fraction: 2,
      teacher: (theme, ageRange) =>
        `Apresente o tema "${theme}" por meio de imagens, objetos, observações do ambiente ou conversa. Organize os recursos de maneira acessível e considere a faixa de ${ageRange}. Priorize ${guidance.focus}.`,
      children: () =>
        'As crianças observam, demonstram curiosidade, apontam elementos, fazem comentários ou acompanham a apresentação. Cada uma participa conforme seus interesses e possibilidades.',
      interventions: () => [
        'Observar quais elementos despertam interesse.',
        'Acolher perguntas, gestos, apontamentos e comentários.',
        'Relacionar o tema às experiências e observações das crianças.',
      ],
    },
    {
      title: 'Observação e exploração',
      fraction: 3,
      teacher: (_theme, ageRange) =>
        `Apresente os elementos e recursos selecionados, considerando a faixa de ${ageRange} e a avaliação prévia de segurança. Convide as crianças a observar características, formas, cores e possíveis transformações. A experiência deve favorecer ${guidance.experience}.`,
      children: () =>
        'As crianças observam, exploram os recursos disponibilizados e identificam características que chamam sua atenção. A participação pode ocorrer por observação, gestos, fala, desenhos ou manipulação acompanhada.',
      interventions: () => [
        'O que você percebeu neste elemento?',
        'Que característica chamou sua atenção?',
        'Permitir que cada criança explore no próprio ritmo.',
      ],
    },
    {
      title: 'Investigação e comparação',
      fraction: 4,
      teacher: () =>
        `Proponha uma investigação adequada ao grupo, utilizando os elementos e recursos selecionados. Incentive a observação e a comparação sem antecipar as descobertas. ${guidance.mediation}.`,
      children: () =>
        'As crianças investigam características, comparam elementos e compartilham percepções. Conforme a proposta, podem agrupar materiais, levantar hipóteses ou observar mudanças.',
      interventions: () => guidance.questions,
    },
    {
      title: 'Ampliação e registro das descobertas',
      fraction: 3,
      teacher: (theme) =>
        `Amplie a experiência relacionada ao tema "${theme}". Nos grupos menores, valorize novas observações, escolhas e repetições; nos maiores, incentive investigações, registros e explicações. Proponha desenhos, organização de imagens, relatos ou outros registros adequados ao grupo.`,
      children: () =>
        'As crianças podem desenhar, organizar elementos, contar o que observaram, comparar descobertas ou demonstrar suas ideias por diferentes linguagens.',
      interventions: () => [
        'Como podemos mostrar o que descobrimos?',
        'O que gostaríamos de observar novamente?',
        'Oferecer diferentes formas de registro e expressão.',
      ],
    },
    {
      title: 'Compartilhamento e cuidado com a natureza',
      fraction: 2,
      teacher: () =>
        'Convide as crianças a compartilhar observações e descobertas. Converse sobre o cuidado com os seres vivos e o ambiente, relacionando o tema às experiências realizadas. Organize os materiais e destine os elementos naturais de maneira responsável, conforme sua origem e as orientações da instituição.',
      children: () =>
        'As crianças podem mostrar registros, comentar descobertas, apontar elementos de interesse e participar da organização do espaço conforme suas possibilidades.',
      interventions: () => [
        'O que mais chamou sua atenção durante a investigação?',
        'Que cuidado podemos ter com os elementos da natureza?',
        'Registrar falas, gestos, hipóteses e descobertas.',
      ],
    },
  ];
}

export const nature: ActivityPattern = {
  id: 'nature',

  keywords: [
    'natureza',
    'planta',
    'plantas',
    'folhas',
    'folha',
    'árvore',
    'arvore',
    'flor',
    'flores',
    'jardim',
    'semente',
    'sementes',
    'horta',
    'terra',
    'água',
    'agua',
    'animal',
    'animais',
    'borboleta',
    'passarinho',
    'outono',
    'primavera',
    'meio ambiente',
    'preservação',
    'preservacao',
  ],

  description: 'Exploração da natureza e investigação do meio ambiente',

  bnccFields: [
    'Espaços, tempos, quantidades, relações e transformações',
    'Escuta, fala, pensamento e imaginação',
    'O eu, o outro e o nós',
  ],

  buildBnccFields: () => [
    'Espaços, tempos, quantidades, relações e transformações',
    'Escuta, fala, pensamento e imaginação',
    'O eu, o outro e o nós',
  ],

  buildObjectives: (theme, _ageRange, classLevel) => {
    const objectives: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        `Participar de experiências de observação e exploração relacionadas ao tema "${theme}".`,
        'Perceber características de elementos naturais por meio de experiências visuais e sensoriais acompanhadas.',
        'Ampliar as possibilidades de interação e expressão durante experiências com o ambiente.',
      ],
      'Grupo 2': [
        `Explorar elementos e fenômenos da natureza relacionados ao tema "${theme}".`,
        'Reconhecer características e diferenças observáveis entre elementos naturais.',
        'Participar de experiências de descoberta, escolha e comparação.',
      ],
      'Grupo 3': [
        `Investigar características de elementos naturais relacionados ao tema "${theme}".`,
        'Comparar, agrupar e organizar elementos utilizando critérios observáveis.',
        'Expressar descobertas e participar de experiências de investigação.',
      ],
      'Grupo 4': [
        `Investigar relações e transformações relacionadas ao tema "${theme}".`,
        'Elaborar hipóteses e comparar características de fenômenos e elementos naturais.',
        'Compartilhar observações e construir explicações a partir das experiências.',
      ],
      'Grupo 5': [
        `Planejar pequenas investigações sobre fenômenos e elementos relacionados ao tema "${theme}".`,
        'Formular hipóteses, realizar observações e registrar informações obtidas.',
        'Comunicar descobertas e rever ideias a partir dos resultados observados.',
      ],
    };

    return objectives[classLevel];
  },

  buildMaterials: (theme, classLevel) => {
    const common = [
      `Imagens, livros ou referências visuais relacionadas ao tema "${theme}"`,
      'Bandejas ou recipientes íntegros para organização dos recursos',
      'Materiais para registro e expressão, conforme a proposta',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      return [
        ...common,
        'Elementos naturais selecionados individualmente, identificados, higienizados e avaliados previamente',
        'Recursos visuais e objetos de observação resistentes e apropriados à faixa etária',
        'Espaço organizado para exploração acompanhada pelo adulto',
      ];
    }

    if (classLevel === 'Grupo 3') {
      return [
        ...common,
        'Elementos naturais previamente inspecionados e adequados à manipulação',
        'Lupas resistentes e apropriadas para observação supervisionada',
        'Cartões ou imagens para comparação e agrupamento',
        'Papel e materiais gráficos para desenhos de observação',
      ];
    }

    return [
      ...common,
      'Elementos naturais e recursos de observação selecionados conforme a investigação',
      'Lupas e instrumentos apropriados para observação acompanhada',
      'Materiais para registro de hipóteses, observações e resultados',
      'Cartões, etiquetas ou recursos para organização das descobertas',
    ];
  },

  stepSpecs: createStepSpecs('Grupo 3'),

  buildStepSpecs: (_theme, _ageRange, classLevel) =>
    createStepSpecs(classLevel),

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes = [
      'Identificar previamente plantas e elementos naturais utilizados. Em caso de dúvida sobre toxicidade ou irritação, não disponibilizar às crianças.',
      'Inspecionar os recursos quanto a espinhos, farpas, fungos, insetos, substâncias irritantes e partes que possam se desprender.',
      'Avaliar riscos de alergia, contato com a pele, ingestão e aspiração de componentes.',
      'Higienizar os materiais de acordo com sua composição e finalidade.',
      'Não permitir a ingestão de elementos naturais utilizados na atividade.',
      'Acompanhar continuamente a exploração e higienizar as mãos após o contato com os materiais.',
      'Respeitar os seres vivos e evitar retirar plantas, flores ou animais de seus ambientes sem necessidade pedagógica e autorização adequada.',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      notes.push(
        'Nas turmas de 1 a 3 anos, considerar especialmente a possibilidade de levar objetos à boca. Não utilizar sementes, pedrinhas, flores pequenas, galhos frágeis ou qualquer componente que ofereça risco de ingestão, aspiração ou ferimento.',
      );
    }

    return {
      notes,
      alternative:
        'Se os elementos naturais não forem adequados, realizar a investigação por meio de fotografias, livros, imagens ampliadas, vídeos selecionados ou outros recursos previamente avaliados. Não presumir que um elemento grande ou aparentemente natural seja seguro.',
    };
  },

  buildAdaptations: (classLevel, _ageRange) => {
    const adaptations: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        'Apresentar poucos recursos por vez e acompanhar de perto as manifestações de interesse.',
        'Permitir participação por observação, gestos e exploração acompanhada.',
        'Ajustar a duração e a quantidade de estímulos conforme as reações das crianças.',
      ],
      'Grupo 2': [
        'Oferecer escolhas entre recursos previamente avaliados e permitir repetição das experiências.',
        'Utilizar imagens e demonstrações concretas para apoiar a observação.',
        'Respeitar crianças que prefiram observar antes de manipular os recursos.',
      ],
      'Grupo 3': [
        'Disponibilizar imagens e objetos para apoiar comparações e agrupamentos.',
        'Oferecer apoio motor e recursos de comunicação conforme as necessidades individuais.',
        'Permitir registros por desenhos, gestos, fala e organização de elementos.',
      ],
      'Grupo 4': [
        'Propor diferentes critérios de comparação e investigação.',
        'Disponibilizar recursos visuais e registros para apoiar a elaboração de hipóteses.',
        'Organizar experiências individuais ou coletivas conforme os interesses da turma.',
      ],
      'Grupo 5': [
        'Oferecer recursos para planejamento, observação e registro das investigações.',
        'Permitir diferentes formas de comunicar resultados e explicar hipóteses.',
        'Propor novas perguntas investigativas a partir das descobertas das crianças.',
      ],
    };

    return adaptations[classLevel];
  },
};
