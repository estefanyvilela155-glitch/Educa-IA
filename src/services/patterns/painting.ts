import type { ClassLevel } from '../../types';
import type { ActivityPattern, SafetyResult, StepSpec } from '../patternTypes';

const GROUP_GUIDANCE: Record<ClassLevel, {
  focus: string;
  experience: string;
  mediation: string;
  questions: string[];
}> = {
  'Grupo 1': {
    focus: 'exploração de cores, marcas, movimentos e sensações, respeitando as possibilidades de cada criança',
    experience: 'experimentar movimentos livres com ferramentas de pintura apropriadas, observando as marcas produzidas no papel',
    mediation: 'oferecer poucos materiais por vez, demonstrar movimentos simples e acompanhar de perto a exploração',
    questions: [
      'O que apareceu no papel?',
      'Vamos experimentar outra cor?',
      'O que acontece quando movimentamos o pincel?',
    ],
  },
  'Grupo 2': {
    focus: 'exploração de ferramentas, movimentos, cores e escolhas pessoais',
    experience: 'experimentar diferentes gestos de pintura, alternar ferramentas e observar as marcas produzidas',
    mediation: 'incentivar escolhas, repetição e experimentação, sem exigir que a criança represente algo reconhecível',
    questions: [
      'Qual ferramenta você quer experimentar?',
      'Que marca apareceu quando você fez esse movimento?',
      'O que acontece se escolhermos outra cor?',
    ],
  },
  'Grupo 3': {
    focus: 'ampliação das possibilidades de expressão, combinação de cores e representação de ideias',
    experience: 'explorar combinações de cores, formas, linhas e diferentes maneiras de representar experiências e interesses',
    mediation: 'conversar sobre as escolhas das crianças e apresentar novas possibilidades sem determinar o resultado da produção',
    questions: [
      'Que cores você escolheu para sua criação?',
      'O que você gostaria de experimentar agora?',
      'Que outras marcas conseguimos produzir?',
    ],
  },
  'Grupo 4': {
    focus: 'experimentação artística, criação, observação e ampliação do repertório visual',
    experience: 'investigar efeitos de ferramentas, suportes, cores e movimentos, construindo composições próprias',
    mediation: 'propor desafios de experimentação e incentivar que as crianças observem e comentem os efeitos de suas escolhas',
    questions: [
      'O que muda quando usamos outra ferramenta?',
      'Como você conseguiu produzir esse efeito?',
      'Que combinação gostaria de testar?',
    ],
  },
  'Grupo 5': {
    focus: 'autoria, investigação de recursos expressivos, planejamento e comunicação por meio da arte',
    experience: 'planejar uma criação, testar recursos e técnicas, rever escolhas e compartilhar os processos e descobertas',
    mediation: 'estimular decisões autorais, investigação de possibilidades e reflexão sobre o processo, sem impor um modelo de pintura',
    questions: [
      'Que ideia você gostaria de explorar na sua produção?',
      'Quais materiais podem ajudar a conseguir o efeito que imaginou?',
      'O que você mudou durante a criação e por quê?',
    ],
  },
};

function createStepSpecs(classLevel: ClassLevel): StepSpec[] {
  const guidance = GROUP_GUIDANCE[classLevel];

  return [
    {
      title: 'Aproximação com o tema e repertório visual',
      fraction: 2,
      teacher: (theme) =>
        `Apresente o tema "${theme}" por meio de imagens, objetos, elementos do cotidiano ou uma breve conversa. Convide as crianças a observar detalhes e compartilhar suas impressões. Para este grupo, valorize ${guidance.focus}. Não apresente um desenho pronto para ser copiado.`,
      children: () =>
        'As crianças observam, apontam, comentam, fazem perguntas ou demonstram interesse por elementos apresentados. Cada uma participa conforme suas possibilidades de comunicação.',
      interventions: () => [
        'Observar quais imagens, formas ou elementos despertam interesse.',
        'Acolher comentários, gestos e diferentes interpretações sobre o tema.',
      ],
    },
    {
      title: 'Exploração dos materiais e ferramentas',
      fraction: 3,
      teacher: (_theme, ageRange) =>
        `Apresente os materiais de pintura previamente selecionados e adequados à faixa de ${ageRange}. Demonstre como utilizar as ferramentas disponíveis e permita experiências iniciais em um suporte de teste. A exploração deve priorizar: ${guidance.experience}.`,
      children: () =>
        'As crianças observam, escolhem ferramentas e experimentam marcas, movimentos e combinações. Podem utilizar pincéis, esponjas ou outras ferramentas adequadas à proposta.',
      interventions: () => [
        'Que marca essa ferramenta consegue produzir?',
        'Você gostaria de experimentar outro material?',
        'Respeitar quem prefere observar antes de experimentar.',
      ],
    },
    {
      title: 'Experimentação de cores, marcas e possibilidades',
      fraction: 3,
      teacher: () =>
        `Convide as crianças a investigar as possibilidades da pintura. Disponibilize cores e ferramentas adequadas e permita que experimentem movimentos, sobreposições e combinações. ${guidance.mediation}.`,
      children: () =>
        'As crianças experimentam diferentes movimentos, cores e ferramentas, observando as marcas e os efeitos produzidos. Podem repetir experiências ou criar novas combinações.',
      interventions: () => guidance.questions,
    },
    {
      title: 'Criação artística',
      fraction: 4,
      teacher: (theme, ageRange) =>
        `Organize os suportes e materiais para a criação relacionada ao tema "${theme}". Cada criança poderá desenvolver sua própria produção, sem modelo obrigatório. Para a faixa de ${ageRange}, considere o foco: ${guidance.focus}. Acompanhe as escolhas, ofereça ajuda quando solicitada e evite corrigir ou substituir as decisões artísticas das crianças.`,
      children: () =>
        'As crianças criam utilizando os materiais disponíveis, fazem escolhas e podem modificar suas produções durante o processo. Algumas podem concentrar-se em movimentos e cores; outras podem construir representações, composições ou narrativas visuais.',
      interventions: () => [
        'O que você gostaria de fazer com esses materiais?',
        'Há alguma coisa que você deseja mudar ou experimentar?',
        'Valorizar o processo de criação, sem comparar as produções.',
        'Oferecer suporte adaptado quando uma criança demonstrar necessidade.',
      ],
    },
    {
      title: 'Compartilhamento e apreciação',
      fraction: 3,
      teacher: () =>
        'Convide as crianças a observar suas produções e, se desejarem, compartilhar o que fizeram. Organize um espaço para deixar os trabalhos secarem e combine com a turma como serão guardados ou apresentados. Valorize as escolhas e os processos, sem estabelecer uma classificação entre as pinturas.',
      children: () =>
        'As crianças podem mostrar suas produções, comentar escolhas, observar trabalhos dos colegas ou simplesmente acompanhar a apreciação. Também podem participar da organização dos materiais.',
      interventions: () => [
        'Que parte da sua produção você gostaria de mostrar?',
        'O que você descobriu enquanto pintava?',
        'Que materiais você gostaria de experimentar em outra ocasião?',
        'Registrar falas, gestos, escolhas e estratégias observadas.',
      ],
    },
  ];
}

export const painting: ActivityPattern = {
  id: 'painting',

  keywords: [
    'pintura',
    'pintar',
    'tinta',
    'aquarela',
    'guache',
    'cor',
    'cores',
    'pincel',
    'arte',
    'desenho',
    'desenhar',
  ],

  description: 'Pintura e expressão artística',

  bnccFields: [
    'Traços, sons, cores e formas',
    'Corpo, gestos e movimentos',
    'Escuta, fala, pensamento e imaginação',
  ],

  buildBnccFields: () => [
    'Traços, sons, cores e formas',
    'Corpo, gestos e movimentos',
    'Escuta, fala, pensamento e imaginação',
  ],

  buildObjectives: (theme, _ageRange, classLevel) => {
    const objectives: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        `Explorar cores, marcas e movimentos por meio de experiências de pintura relacionadas ao tema "${theme}".`,
        'Ampliar as possibilidades de expressão corporal e gestual ao experimentar ferramentas e suportes.',
        'Investigar relações entre os movimentos realizados e as marcas produzidas.',
      ],
      'Grupo 2': [
        `Experimentar diferentes ferramentas e movimentos de pintura relacionados ao tema "${theme}".`,
        'Ampliar as possibilidades de escolha e expressão por meio de cores, marcas e gestos.',
        'Explorar características dos materiais e observar os efeitos de suas ações.',
      ],
      'Grupo 3': [
        `Expressar ideias, experiências e interesses por meio de produções artísticas relacionadas ao tema "${theme}".`,
        'Experimentar combinações de cores, linhas, formas e diferentes ferramentas.',
        'Ampliar a autonomia e o repertório expressivo durante a criação.',
      ],
      'Grupo 4': [
        `Investigar possibilidades de composição e expressão artística a partir do tema "${theme}".`,
        'Experimentar efeitos produzidos por diferentes ferramentas, suportes, cores e movimentos.',
        'Compartilhar impressões e respeitar diferentes formas de criação.',
      ],
      'Grupo 5': [
        `Planejar e desenvolver produções autorais relacionadas ao tema "${theme}", escolhendo recursos expressivos.`,
        'Investigar técnicas, materiais e combinações para produzir diferentes efeitos visuais.',
        'Comunicar ideias e refletir sobre escolhas e descobertas realizadas durante o processo artístico.',
      ],
    };

    return objectives[classLevel];
  },

  buildMaterials: (theme, classLevel) => {
    const materials = [
      'Suportes adequados à proposta, como papel, papelão ou papel kraft',
      'Tintas apropriadas para uso infantil, com identificação e orientação de uso do fabricante',
      'Ferramentas de pintura selecionadas conforme a experiência proposta',
      'Recipientes estáveis para organizar pequenas porções de tinta',
      'Proteção para a superfície de trabalho',
      'Materiais para limpeza e organização após a atividade',
      `Referências visuais ou objetos relacionados ao tema "${theme}", se contribuírem para a exploração`,
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      return [
        ...materials,
        'Ferramentas de fácil preensão, resistentes e adequadas à exploração acompanhada',
        'Suportes amplos e fixados de maneira estável, quando necessário',
      ];
    }

    if (classLevel === 'Grupo 3') {
      return [
        ...materials,
        'Pincéis e esponjas de diferentes formatos para ampliar as possibilidades de criação',
      ];
    }

    return [
      ...materials,
      'Ferramentas variadas para investigar linhas, texturas e efeitos',
      'Suportes de diferentes dimensões, conforme o objetivo da proposta',
    ];
  },

  stepSpecs: createStepSpecs('Grupo 3'),

  buildStepSpecs: (_theme, _ageRange, classLevel) =>
    createStepSpecs(classLevel),

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes = [
      'Verificar a identificação, a procedência e as orientações do fabricante de todos os materiais utilizados.',
      'Utilizar apenas produtos apropriados para a faixa etária e para a finalidade artística proposta.',
      'A supervisão deve ser próxima, especialmente durante o uso de tintas e ferramentas.',
      'Não permitir que tintas, pincéis ou outros materiais sejam colocados na boca, nariz ou ouvidos.',
      'Verificar se ferramentas, recipientes e suportes estão íntegros e sem pontas, farpas ou bordas cortantes.',
      'Considerar alergias, sensibilidades e necessidades individuais antes de selecionar os materiais.',
      'Organizar o espaço para evitar derramamentos e limpar imediatamente superfícies escorregadias.',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      notes.push(
        'Nas turmas de 1 a 3 anos, considerar especialmente a possibilidade de contato com a boca e ingestão acidental. A escolha dos produtos deve seguir as orientações do fabricante e os protocolos da instituição, com acompanhamento direto do adulto.',
      );
    }

    return {
      notes,
      alternative:
        'Se algum material não for adequado a uma criança, substituí-lo por outro recurso artístico previamente avaliado. Não considerar tintas caseiras, alimentos ou produtos alternativos automaticamente seguros.',
    };
  },

  buildAdaptations: (classLevel, _ageRange) => {
    const adaptations: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        'Oferecer experiências curtas, com poucos materiais por vez e acompanhamento próximo.',
        'Disponibilizar suportes estáveis e ferramentas adequadas à exploração motora da criança.',
        'Permitir participação por observação, gestos, movimentos ou experimentação acompanhada.',
      ],
      'Grupo 2': [
        'Oferecer ferramentas de fácil preensão e suportes que permitam movimentos amplos.',
        'Permitir que a criança escolha cores e ferramentas entre opções disponíveis.',
        'Respeitar o tempo de exploração e a repetição de movimentos.',
      ],
      'Grupo 3': [
        'Disponibilizar ferramentas variadas para ampliar as possibilidades de expressão.',
        'Oferecer apoio para organizar materiais e realizar escolhas sem interferir na criação.',
        'Permitir que a criança explique sua produção por fala, gestos ou demonstração.',
      ],
      'Grupo 4': [
        'Propor diferentes suportes e ferramentas para ampliar a investigação artística.',
        'Organizar experiências individuais ou coletivas conforme os interesses da turma.',
        'Disponibilizar referências visuais sem exigir cópias ou resultados padronizados.',
      ],
      'Grupo 5': [
        'Disponibilizar recursos variados para que as crianças planejem e desenvolvam suas criações.',
        'Oferecer oportunidades de experimentar, rever escolhas e compartilhar processos.',
        'Permitir registros e apresentações em diferentes linguagens, respeitando as preferências individuais.',
      ],
    };

    return adaptations[classLevel];
  },
};
