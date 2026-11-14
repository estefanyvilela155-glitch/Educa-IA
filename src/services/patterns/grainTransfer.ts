import type { ClassLevel } from '../../types';
import type { ActivityPattern, SafetyResult, StepSpec } from '../patternTypes';

const GROUP_GUIDANCE: Record<ClassLevel, {
  focus: string;
  experience: string;
  mediation: string;
  questions: string[];
}> = {
  'Grupo 1': {
    focus: 'exploração sensorial, movimentos amplos, gestos e descoberta da relação entre ação e resultado',
    experience: 'explorar recipientes e materiais de diferentes tamanhos, observando movimentos de colocar, retirar e despejar, com apoio próximo do adulto',
    mediation: 'demonstrar lentamente, oferecer poucas opções por vez e acolher a participação por olhares, gestos, movimentos, sons ou manipulação',
    questions: [
      'O que acontece quando colocamos este objeto dentro do pote?',
      'Onde está o objeto agora?',
      'Vamos experimentar colocar e retirar novamente?',
    ],
  },
  'Grupo 2': {
    focus: 'coordenação dos movimentos, exploração, escolhas e primeiras comparações',
    experience: 'experimentar transferências entre recipientes, escolhendo materiais e utensílios e percebendo diferenças de quantidade e movimento',
    mediation: 'oferecer demonstrações concretas, incentivar tentativas e permitir repetição, sem exigir precisão ou resultados iguais',
    questions: [
      'Você consegue colocar de um pote no outro?',
      'O que acontece quando usamos este recipiente?',
      'Qual pote parece estar mais cheio?',
    ],
  },
  'Grupo 3': {
    focus: 'coordenação motora, investigação, comparação e ampliação da autonomia',
    experience: 'experimentar diferentes maneiras de transferir materiais, comparar recipientes e observar mudanças nas quantidades',
    mediation: 'incentivar hipóteses simples, oferecer desafios possíveis e apoiar as crianças que necessitem de ajuda',
    questions: [
      'Qual recipiente recebe mais material?',
      'O que muda quando usamos uma colher maior?',
      'Como podemos evitar que o material caia fora?',
    ],
  },
  'Grupo 4': {
    focus: 'investigação, comparação de quantidades, planejamento de ações e cooperação',
    experience: 'planejar transferências, testar utensílios, comparar resultados e compartilhar descobertas com os colegas',
    mediation: 'estimular previsões, comparações e explicações, valorizando diferentes estratégias para resolver a proposta',
    questions: [
      'Qual recipiente você acredita que ficará cheio primeiro?',
      'Como podemos descobrir qual utensílio transfere mais material?',
      'O que poderíamos mudar para conseguir outro resultado?',
    ],
  },
  'Grupo 5': {
    focus: 'investigação, autonomia, resolução de problemas, argumentação e construção de estratégias',
    experience: 'elaborar estratégias de transferência, levantar hipóteses, testar possibilidades, comparar resultados e explicar descobertas',
    mediation: 'propor problemas investigativos, incentivar decisões e registros das descobertas, sem antecipar as soluções',
    questions: [
      'Como podemos transferir a mesma quantidade usando utensílios diferentes?',
      'Que estratégia pode tornar essa transferência mais eficiente?',
      'O resultado foi igual ao que você imaginou? O que descobriu?',
    ],
  },
};

function createStepSpecs(classLevel: ClassLevel): StepSpec[] {
  const guidance = GROUP_GUIDANCE[classLevel];

  return [
    {
      title: 'Apresentação e aproximação com os materiais',
      fraction: 2,
      teacher: (theme) =>
        `Apresente a proposta "${theme}" e organize os materiais em um espaço acessível. Mostre os recipientes e utensílios disponíveis, nomeando suas características e demonstrando algumas possibilidades de uso. Para este grupo, priorize ${guidance.focus}.`,
      children: () =>
        `As crianças se aproximam dos materiais, observam, escolhem ou exploram os objetos conforme suas possibilidades. Podem participar por gestos, movimentos, fala, apontamentos ou observação.`,
      interventions: () => [
        'Observar quais materiais despertam interesse e como cada criança se aproxima deles.',
        'Permitir que as crianças indiquem preferências e façam escolhas possíveis.',
      ],
    },
    {
      title: 'Exploração e descoberta',
      fraction: 3,
      teacher: () =>
        `Convide as crianças a experimentar os materiais antes de propor um desafio. Apresente possibilidades de colocar, retirar, despejar ou movimentar os elementos entre recipientes. A experiência deve priorizar: ${guidance.experience}.`,
      children: () =>
        `As crianças exploram os materiais e descobrem diferentes possibilidades de manipulação. Podem repetir movimentos, observar os colegas, experimentar utensílios ou propor outras formas de exploração.`,
      interventions: () => [
        'Acolher diferentes formas de participação, sem exigir que todas as crianças realizem os mesmos movimentos.',
        'Observar as estratégias espontâneas e oferecer apoio quando necessário.',
      ],
    },
    {
      title: 'Experimentação orientada',
      fraction: 4,
      teacher: (theme, ageRange) =>
        `Retome a proposta "${theme}" e convide as crianças a realizar transferências entre os recipientes. Considere a faixa etária de ${ageRange}, os interesses observados e as possibilidades de cada criança. ${guidance.mediation}.`,
      children: () =>
        `As crianças experimentam transferir os materiais, utilizando os utensílios disponíveis quando apropriado. Podem repetir a experiência, mudar de recipiente, observar os resultados ou pedir ajuda.`,
      interventions: (_theme, _ageRange) => guidance.questions,
    },
    {
      title: 'Investigação e ampliação das possibilidades',
      fraction: 3,
      teacher: () =>
        `Proponha uma nova possibilidade de exploração adequada ao grupo: mudar o tamanho dos recipientes, experimentar outro utensílio ou comparar os resultados. Para os grupos mais novos, a ampliação pode ocorrer pela repetição e descoberta de novas ações; para os grupos mais velhos, pode envolver hipóteses, planejamento e comparação.`,
      children: () =>
        `As crianças escolhem como continuar a experiência, testam possibilidades e observam o que acontece. A participação pode ser individual, em dupla ou em pequenos grupos, conforme a organização e as necessidades da turma.`,
      interventions: () => [
        'Evitar transformar a proposta em uma competição de rapidez ou precisão.',
        'Valorizar tentativas, descobertas e estratégias diferentes.',
        'Oferecer desafios adicionais apenas quando fizerem sentido para as crianças.',
      ],
    },
    {
      title: 'Partilha das descobertas e organização',
      fraction: 2,
      teacher: () =>
        `Convide as crianças a observar os materiais e compartilhar o que fizeram. Organize a devolução dos objetos com a participação da turma, respeitando as possibilidades individuais. Registre descobertas relevantes para acompanhar o processo de aprendizagem.`,
      children: () =>
        `As crianças podem mostrar o que fizeram, contar ou demonstrar suas descobertas, apontar materiais de que gostaram e participar da organização do espaço conforme suas possibilidades.`,
      interventions: () => [
        'O que você descobriu durante a brincadeira?',
        'Qual material você gostou de explorar?',
        'Que outra maneira de fazer isso poderíamos experimentar?',
        'Registrar também as manifestações não verbais e as estratégias observadas.',
      ],
    },
  ];
}

export const grainTransfer: ActivityPattern = {
  id: 'grain-transfer',

  keywords: [
    'grão',
    'grãos',
    'milho',
    'arroz',
    'feijão',
    'feijao',
    'transferência',
    'transferencia',
    'transpasse',
    'despejar',
    'despejo',
  ],

  description: 'Exploração e transferência de materiais entre recipientes',

  bnccFields: [
    'Corpo, gestos e movimentos',
    'Espaços, tempos, quantidades, relações e transformações',
    'O eu, o outro e o nós',
  ],

  buildBnccFields: () => [
    'Corpo, gestos e movimentos',
    'Espaços, tempos, quantidades, relações e transformações',
    'O eu, o outro e o nós',
  ],

  buildObjectives: (_theme, _ageRange, classLevel) => {
    const objectives: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        'Explorar movimentos de colocar, retirar e transportar objetos, desenvolvendo experiências corporais e motoras.',
        'Perceber relações entre os próprios movimentos e as mudanças produzidas nos materiais.',
        'Investigar características dos objetos por meio da observação, manipulação e exploração sensorial.',
      ],
      'Grupo 2': [
        'Ampliar as possibilidades de coordenação dos movimentos ao transportar e transferir materiais entre recipientes.',
        'Explorar diferenças de tamanho, forma e capacidade dos recipientes durante as experiências.',
        'Desenvolver escolhas e iniciativas próprias na exploração dos materiais.',
      ],
      'Grupo 3': [
        'Aprimorar a coordenação motora e a autonomia ao experimentar diferentes formas de transferência.',
        'Comparar quantidades e observar transformações durante a manipulação dos materiais.',
        'Compartilhar descobertas e participar de experiências coletivas.',
      ],
      'Grupo 4': [
        'Investigar relações entre capacidade dos recipientes, quantidades e diferentes instrumentos de transferência.',
        'Elaborar hipóteses e comparar resultados a partir das experiências realizadas.',
        'Desenvolver estratégias de cooperação e resolução de pequenos desafios.',
      ],
      'Grupo 5': [
        'Planejar e testar estratégias para resolver desafios de transferência de materiais.',
        'Comparar quantidades, observar resultados e comunicar descobertas utilizando diferentes formas de registro.',
        'Argumentar sobre as estratégias utilizadas e colaborar na investigação com os colegas.',
      ],
    };

    return objectives[classLevel];
  },

  buildMaterials: (_theme, classLevel) => {
    const common = [
      'Recipientes resistentes, estáveis e de diferentes capacidades',
      'Bandejas para organizar os materiais e conter possíveis derramamentos',
      'Utensílios de transferência adequados à proposta, como colheres, conchas ou pequenos recipientes',
      'Pano para limpeza e organização do espaço',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      return [
        ...common,
        'Materiais de manipulação com dimensões, composição e características previamente avaliadas para a segurança das crianças',
        'Recipientes com aberturas adequadas à exploração, sem bordas cortantes',
      ];
    }

    return [
      ...common,
      'Material principal da transferência, escolhido conforme a proposta e após avaliação de riscos',
      'Recipientes de diferentes aberturas para comparação',
      'Utensílios variados para testar diferentes estratégias',
    ];
  },

  stepSpecs: createStepSpecs('Grupo 3'),

  buildStepSpecs: (_theme, _ageRange, classLevel) =>
    createStepSpecs(classLevel),

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes = [
      'Avaliar previamente o tamanho, o formato, a composição, a higiene e as condições dos materiais utilizados.',
      'Não utilizar objetos pequenos ou materiais que possam ser aspirados, engolidos ou introduzidos no nariz e nos ouvidos por crianças que apresentem esse risco.',
      'A supervisão deve ser próxima e contínua, especialmente durante a manipulação de materiais soltos.',
      'Verificar se os recipientes e utensílios estão íntegros, estáveis e sem bordas cortantes.',
      'Retirar imediatamente materiais derramados que possam causar escorregões ou oferecer risco.',
      'Considerar alergias, sensibilidades, necessidades específicas e orientações de segurança da instituição.',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      notes.push(
        'Para crianças de 1 a 3 anos, não utilizar grãos pequenos ou peças soltas que possam ser levadas à boca. A escolha de qualquer material alternativo precisa passar por avaliação de segurança; tamanho, formato e resistência, isoladamente, não garantem que um objeto seja seguro.',
      );

      return {
        notes,
        alternative:
          'Se os grãos representarem risco, adaptar a proposta para explorar recipientes e objetos de manipulação apropriados à faixa etária, previamente avaliados pela instituição. Não presumir que bolas, espuma, algodão ou outros materiais sejam automaticamente seguros.',
      };
    }

    notes.push(
      'Mesmo nas turmas de 3 a 6 anos, avaliar individualmente o comportamento das crianças e a possibilidade de levar materiais à boca. A idade do grupo, por si só, não elimina o risco.',
    );

    return {
      notes,
      alternative:
        'Caso o material escolhido não seja adequado a alguma criança, selecionar outra forma de exploração que preserve o objetivo pedagógico sem expô-la ao risco.',
    };
  },

  buildAdaptations: (classLevel, _ageRange) => {
    const adaptations: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        'Oferecer poucas opções de materiais por vez e permitir a exploração acompanhada pelo adulto.',
        'Disponibilizar recipientes estáveis e posicionados ao alcance, respeitando a postura e as possibilidades motoras de cada criança.',
        'Acolher a participação por observação, gestos, movimentos, sons e manipulação.',
      ],
      'Grupo 2': [
        'Oferecer recipientes e utensílios que facilitem a preensão e a exploração, sem exigir precisão excessiva.',
        'Permitir repetição das ações e escolhas entre diferentes possibilidades de exploração.',
        'Utilizar demonstrações curtas e apoio individual quando necessário.',
      ],
      'Grupo 3': [
        'Variar os tamanhos e formatos dos recipientes para ampliar as possibilidades de investigação.',
        'Oferecer apoio motor ou utensílios adaptados às necessidades de cada criança.',
        'Permitir diferentes formas de demonstrar descobertas, inclusive por gestos e ações.',
      ],
      'Grupo 4': [
        'Propor desafios de comparação e investigação com diferentes recipientes e utensílios.',
        'Organizar duplas ou pequenos grupos, valorizando a cooperação e a troca de estratégias.',
        'Oferecer recursos visuais ou demonstrações quando ajudarem na compreensão da proposta.',
      ],
      'Grupo 5': [
        'Convidar as crianças a planejar estratégias e explicar suas escolhas.',
        'Propor registros por desenhos, marcas, contagens ou relatos, conforme o interesse e as possibilidades da turma.',
        'Ampliar o desafio com comparação de resultados e investigação de diferentes soluções.',
      ],
    };

    return adaptations[classLevel];
  },
};
