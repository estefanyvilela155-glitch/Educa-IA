import type { ClassLevel } from '../../types';
import type { ActivityPattern, SafetyResult, StepSpec } from '../patternTypes';

const GROUP_GUIDANCE: Record<ClassLevel, {
  focus: string;
  experience: string;
  mediation: string;
  questions: string[];
}> = {
  'Grupo 1': {
    focus: 'escuta, exploração de sons, movimentos espontâneos e interação com experiências musicais',
    experience: 'explorar sons produzidos pela voz, pelo corpo e por recursos sonoros apropriados, respeitando as reações e iniciativas das crianças',
    mediation: 'utilizar músicas breves, variações de entonação, gestos e pausas, observando as respostas individuais e evitando excesso de estímulos',
    questions: [
      'Você ouviu esse som?',
      'Vamos escutar novamente?',
      'O que acontece quando fazemos esse movimento?',
    ],
  },
  'Grupo 2': {
    focus: 'exploração de sons, imitação, movimentos corporais e participação em brincadeiras musicais',
    experience: 'experimentar ritmos simples, produzir sons com o corpo e explorar recursos musicais por meio de escolhas e movimentos',
    mediation: 'repetir pequenas sequências sonoras, demonstrar possibilidades e incentivar a participação espontânea',
    questions: [
      'Você consegue fazer um som parecido?',
      'Vamos bater palmas juntos?',
      'Qual desses sons você gostaria de ouvir novamente?',
    ],
  },
  'Grupo 3': {
    focus: 'percepção de ritmos, exploração de possibilidades sonoras, expressão corporal e criação',
    experience: 'investigar sons, acompanhar sequências rítmicas simples e experimentar diferentes formas de expressão musical',
    mediation: 'propor desafios acessíveis, incentivar a imitação e a criação de pequenas sequências, respeitando os diferentes ritmos de participação',
    questions: [
      'Que som conseguimos produzir com as mãos?',
      'O que muda quando fazemos o ritmo mais devagar?',
      'Como podemos criar uma sequência diferente?',
    ],
  },
  'Grupo 4': {
    focus: 'investigação sonora, organização de sequências, expressão musical e criação coletiva',
    experience: 'comparar sons, experimentar ritmos, organizar sequências e construir pequenas composições em grupo',
    mediation: 'incentivar a escuta, a comparação e a criação, permitindo que as crianças proponham variações e compartilhem descobertas',
    questions: [
      'Como podemos organizar esses sons em uma sequência?',
      'O que acontece quando combinamos sons diferentes?',
      'Como podemos representar um ritmo sem utilizar instrumentos?',
    ],
  },
  'Grupo 5': {
    focus: 'autoria musical, investigação de ritmos, criação de sequências e colaboração',
    experience: 'planejar e criar composições, explorar variações de ritmo e intensidade e organizar produções musicais coletivas',
    mediation: 'estimular decisões, experimentações, registros e justificativas sobre as escolhas musicais, sem exigir execução técnica uniforme',
    questions: [
      'Como podemos criar uma sequência musical própria?',
      'Que mudanças podemos fazer para transformar esse ritmo?',
      'Como podemos organizar uma composição com as ideias de todos?',
    ],
  },
};

function createStepSpecs(classLevel: ClassLevel): StepSpec[] {
  const guidance = GROUP_GUIDANCE[classLevel];

  return [
    {
      title: 'Acolhida e escuta musical',
      fraction: 2,
      teacher: (theme, ageRange) =>
        `Apresente a proposta musical relacionada ao tema "${theme}". Utilize uma canção, gravação, sons do ambiente ou produção vocal. Organize um ambiente confortável, considerando a faixa de ${ageRange}. Priorize ${guidance.focus}.`,
      children: () =>
        'As crianças escutam, observam, movimentam o corpo, demonstram preferências ou reagem aos sons. Podem participar cantando, por gestos, movimentos ou simplesmente acompanhando a experiência.',
      interventions: () => [
        'Observar as reações das crianças aos diferentes sons e músicas.',
        'Respeitar quem prefere escutar antes de participar.',
        'Perceber sinais de desconforto com o volume ou com determinados estímulos.',
      ],
    },
    {
      title: 'Exploração de sons e possibilidades',
      fraction: 3,
      teacher: (_theme, ageRange) =>
        `Convide as crianças a investigar sons produzidos pela voz, pelo corpo e pelos recursos disponíveis. Selecione materiais adequados à faixa de ${ageRange}, demonstrando possibilidades de utilização. A experiência deve favorecer ${guidance.experience}.`,
      children: () =>
        'As crianças experimentam sons, movimentos, gestos e diferentes formas de expressão. Podem imitar, repetir, criar ou observar as descobertas dos colegas.',
      interventions: () => [
        'Que som conseguimos produzir com o corpo?',
        'O que acontece quando repetimos esse som?',
        'Quais recursos despertaram maior interesse?',
      ],
    },
    {
      title: 'Brincadeiras e experimentações rítmicas',
      fraction: 4,
      teacher: (theme) =>
        `Proponha uma brincadeira musical relacionada ao tema "${theme}". Explore variações de ritmo, pausas, movimentos e intensidade, de acordo com as possibilidades do grupo. ${guidance.mediation}.`,
      children: () =>
        'As crianças participam das brincadeiras musicais por meio de movimentos, sons, gestos, cantos ou exploração de instrumentos. Podem acompanhar as propostas ou criar suas próprias formas de participação.',
      interventions: () => guidance.questions,
    },
    {
      title: 'Criação e expressão musical',
      fraction: 3,
      teacher: () =>
        `Convide as crianças a ampliar a experiência criando sons, movimentos ou sequências musicais. Nos grupos menores, valorize a exploração e a repetição espontânea; nos grupos maiores, incentive a organização de sequências, a combinação de sons e a criação coletiva. Considere sempre o foco: ${guidance.focus}.`,
      children: () =>
        'As crianças experimentam possibilidades próprias, combinam sons, repetem sequências, criam movimentos ou colaboram em uma produção musical. A participação não depende de cantar ou executar um ritmo de maneira precisa.',
      interventions: () => [
        'Que outra possibilidade podemos experimentar?',
        'Como podemos combinar as ideias da turma?',
        'Oferecer diferentes formas de participação, sem exigir que todas as crianças realizem a mesma ação.',
      ],
    },
    {
      title: 'Compartilhamento e encerramento',
      fraction: 2,
      teacher: () =>
        'Retome os sons, movimentos ou músicas que despertaram interesse durante a experiência. Convide as crianças a compartilhar suas descobertas e organize os materiais com a participação da turma. Finalize com uma música tranquila ou outro encerramento coerente com a atividade.',
      children: () =>
        'As crianças podem repetir um som, demonstrar um movimento, escolher uma música, comentar suas descobertas ou acompanhar o encerramento por meio da escuta.',
      interventions: () => [
        'Qual som ou música chamou sua atenção?',
        'O que você descobriu durante a experiência?',
        'Que outra brincadeira musical poderíamos realizar?',
        'Registrar diferentes formas de expressão e participação.',
      ],
    },
  ];
}

export const music: ActivityPattern = {
  id: 'music',

  keywords: [
    'música',
    'musica',
    'canção',
    'cancao',
    'cantar',
    'canto',
    'cantando',
    'cantou',
    'cantarol',
    'ritmo',
    'som',
    'sons',
    'instrumento',
    'dança',
    'danca',
    'dançar',
    'dancar',
    'corpo',
    'movimento',
    'musical',
    'percussão',
    'percussao',
  ],

  description: 'Música, exploração sonora e expressão corporal',

  bnccFields: [
    'Traços, sons, cores e formas',
    'Corpo, gestos e movimentos',
    'O eu, o outro e o nós',
  ],

  buildBnccFields: () => [
    'Traços, sons, cores e formas',
    'Corpo, gestos e movimentos',
    'O eu, o outro e o nós',
  ],

  buildObjectives: (theme, _ageRange, classLevel) => {
    const objectives: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        `Participar de experiências de escuta e exploração sonora relacionadas ao tema "${theme}".`,
        'Explorar possibilidades de expressão por meio de sons, gestos e movimentos corporais.',
        'Perceber diferentes manifestações sonoras e suas relações com as próprias ações.',
      ],
      'Grupo 2': [
        `Explorar músicas e brincadeiras sonoras relacionadas ao tema "${theme}".`,
        'Ampliar as possibilidades de expressão por meio da voz, do corpo e de recursos sonoros.',
        'Experimentar movimentos e imitações em situações de interação musical.',
      ],
      'Grupo 3': [
        `Investigar possibilidades sonoras e rítmicas em experiências relacionadas ao tema "${theme}".`,
        'Experimentar sequências simples de sons, movimentos e expressões musicais.',
        'Participar de brincadeiras cantadas e criações musicais individuais ou coletivas.',
      ],
      'Grupo 4': [
        `Investigar ritmos, sons e possibilidades de composição a partir do tema "${theme}".`,
        'Organizar e experimentar sequências sonoras utilizando diferentes recursos expressivos.',
        'Compartilhar descobertas e participar de produções musicais coletivas.',
      ],
      'Grupo 5': [
        `Criar e organizar produções musicais autorais relacionadas ao tema "${theme}".`,
        'Investigar variações de ritmo, intensidade e combinação de sons.',
        'Planejar, compartilhar e rever escolhas durante experiências de criação musical.',
      ],
    };

    return objectives[classLevel];
  },

  buildMaterials: (theme, classLevel) => {
    const common = [
      `Repertório musical relacionado ao tema "${theme}", selecionado previamente`,
      'Espaço organizado e adequado para escuta, movimento e expressão corporal',
      'Recursos de reprodução sonora, se necessários, com volume controlado',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      return [
        ...common,
        'Recursos sonoros apropriados à faixa etária e previamente avaliados',
        'Objetos ou instrumentos resistentes, sem componentes pequenos ou partes destacáveis, quando seu uso for considerado adequado',
        'Imagens ou recursos visuais relacionados às músicas, se contribuírem para a experiência',
      ];
    }

    if (classLevel === 'Grupo 3') {
      return [
        ...common,
        'Instrumentos musicais apropriados à turma e previamente inspecionados',
        'Recursos para exploração de sons produzidos pelo corpo',
        'Cartões ou imagens para apoiar brincadeiras de sequência sonora, se necessário',
      ];
    }

    return [
      ...common,
      'Instrumentos musicais variados, selecionados conforme a proposta',
      'Materiais adequados para criação de instrumentos ou objetos sonoros, após avaliação de segurança',
      'Recursos para registrar sequências e composições, como papel, lápis e cartões',
    ];
  },

  stepSpecs: createStepSpecs('Grupo 3'),

  buildStepSpecs: (_theme, _ageRange, classLevel) =>
    createStepSpecs(classLevel),

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes = [
      'Organizar o espaço para evitar obstáculos durante os movimentos e deslocamentos.',
      'Verificar a integridade dos instrumentos e recursos sonoros antes da atividade.',
      'Controlar o volume dos equipamentos e evitar exposição prolongada a sons intensos.',
      'Observar sinais de desconforto, incômodo ou sensibilidade auditiva e adaptar a experiência.',
      'Garantir que os instrumentos sejam utilizados conforme sua finalidade e com supervisão adequada.',
      'Considerar as necessidades individuais de mobilidade, comunicação e percepção sensorial.',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      notes.push(
        'Nas turmas de 1 a 3 anos, avaliar especialmente o risco de ingestão, aspiração, quebra ou desprendimento de componentes dos instrumentos e objetos sonoros. A supervisão deve ser próxima e contínua.',
      );
    }

    return {
      notes,
      alternative:
        'Se um instrumento ou recurso não for adequado, realizar a experiência com sons produzidos pela voz, pelo corpo, por gravações ou por outros recursos previamente avaliados.',
    };
  },

  buildAdaptations: (classLevel, _ageRange) => {
    const adaptations: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        'Permitir participação por escuta, movimentos espontâneos, gestos e vocalizações.',
        'Oferecer experiências breves e observar a resposta de cada criança aos estímulos sonoros.',
        'Evitar excesso de instrumentos e sons simultâneos quando isso dificultar a participação.',
      ],
      'Grupo 2': [
        'Utilizar demonstrações simples e brincadeiras de repetição sonora.',
        'Oferecer escolhas entre recursos adequados e permitir diferentes formas de exploração.',
        'Respeitar crianças que prefiram acompanhar pela escuta ou pela observação.',
      ],
      'Grupo 3': [
        'Oferecer instrumentos e recursos de diferentes formas de manipulação, conforme as necessidades individuais.',
        'Permitir que as crianças participem por movimentos, voz, gestos ou exploração sonora.',
        'Utilizar referências visuais ou demonstrações para apoiar a compreensão das brincadeiras.',
      ],
      'Grupo 4': [
        'Propor diferentes possibilidades de criação rítmica e expressão corporal.',
        'Organizar experiências individuais, em duplas ou coletivas, conforme os interesses da turma.',
        'Oferecer recursos visuais, gestuais ou comunicação alternativa quando necessários.',
      ],
      'Grupo 5': [
        'Disponibilizar recursos variados para planejamento e criação de composições musicais.',
        'Permitir registros de sequências por desenhos, símbolos, movimentos ou outras linguagens.',
        'Apoiar a participação de todas as crianças na criação coletiva, respeitando diferentes formas de expressão.',
      ],
    };

    return adaptations[classLevel];
  },
};
