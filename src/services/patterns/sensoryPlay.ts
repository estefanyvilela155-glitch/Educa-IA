
import type { ActivityPattern, SafetyResult, StepSpec } from '../patternTypes';
import type { ClassLevel } from '../../types';

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getExperience(theme: string): string {
  const value = normalize(theme);

  if (value.includes('agua') || value.includes('bolha') || value.includes('espuma')) {
    return 'exploração da água, de suas propriedades e de seus movimentos';
  }

  if (value.includes('areia') || value.includes('terra') || value.includes('barro')) {
    return 'exploração de materiais naturais, suas texturas e transformações';
  }

  if (value.includes('massinha') || value.includes('massa') || value.includes('modelar')) {
    return 'manipulação e transformação de massa de modelar';
  }

  if (value.includes('textura') || value.includes('tatil') || value.includes('sensorial') || value.includes('sensório')) {
    return 'investigação de diferentes texturas e sensações';
  }

  return `exploração sensorial relacionada ao tema "${theme}"`;
}

function getGroupFocus(classLevel: ClassLevel): string {
  const focuses: Record<ClassLevel, string> = {
    'Grupo 1': 'experimentação sensorial acompanhada, com materiais grandes, seguros e apresentados individualmente',
    'Grupo 2': 'exploração por meio dos sentidos, repetição de gestos, escolhas simples e descobertas acompanhadas',
    'Grupo 3': 'comparação de características, experimentação de ações e comunicação das descobertas',
    'Grupo 4': 'investigação de propriedades, comparação de resultados e criação de pequenas experiências',
    'Grupo 5': 'investigação intencional, formulação de hipóteses, comparação de resultados e explicação das descobertas',
  };

  return focuses[classLevel];
}

function buildStepsForGroup(classLevel: ClassLevel): StepSpec[] {
  const focus = getGroupFocus(classLevel);

  const groupInstructions: Record<ClassLevel, {
    explore: string;
    investigate: string;
    create: string;
    questions: string[];
  }> = {
    'Grupo 1': {
      explore: 'Apresente um material por vez, em pequenas quantidades e em recipientes estáveis. Permita que a criança observe, toque ou manipule conforme sua disposição, sempre com acompanhamento próximo.',
      investigate: 'Acompanhe os gestos espontâneos da criança. Demonstre ações simples, como tocar, apertar ou movimentar o material, sem exigir imitação.',
      create: 'Ofereça novas oportunidades de exploração com os materiais já apresentados. Valorize o olhar, os gestos, as expressões, os movimentos e as iniciativas da criança.',
      questions: [
        'Você quer tocar ou prefere observar primeiro?',
        'O que acontece quando movimentamos o material?',
        'Você quer experimentar mais uma vez?',
      ],
    },
    'Grupo 2': {
      explore: 'Disponibilize pequenas porções e convide as crianças a tocar, movimentar, apertar ou transferir os materiais, respeitando quem prefere observar inicialmente.',
      investigate: 'Demonstre ações simples e convide as crianças a repeti-las ou modificá-las. Valorize a repetição, a curiosidade e as escolhas individuais.',
      create: 'Proponha combinações simples de movimentos e materiais, permitindo que cada criança escolha como continuar a exploração.',
      questions: [
        'Está diferente quando você aperta?',
        'Você prefere esse material ou aquele?',
        'O que acontece se movimentarmos devagar?',
      ],
    },
    'Grupo 3': {
      explore: 'Convide as crianças a explorar os materiais com as mãos e com utensílios adequados, percebendo diferenças de textura, forma, consistência e movimento.',
      investigate: 'Proponha pequenas comparações: aproximar, afastar, misturar quando apropriado ou modificar a maneira de manipular. Incentive a comunicação das descobertas.',
      create: 'Convide cada criança a escolher materiais e ações para realizar uma pequena criação ou experiência, explicando suas escolhas do modo que conseguir.',
      questions: [
        'O que você percebeu de diferente?',
        'O que mudou quando você fez isso?',
        'Qual material você gostaria de experimentar novamente?',
      ],
    },
    'Grupo 4': {
      explore: 'Apresente os materiais e convide as crianças a observar, tocar, comparar e descrever suas características, respeitando diferentes formas de participação.',
      investigate: 'Proponha desafios simples de investigação, como descobrir maneiras diferentes de movimentar, organizar ou transformar os materiais.',
      create: 'Convide as crianças a planejar uma pequena composição ou experiência, escolher os materiais e contar o que pretendem descobrir.',
      questions: [
        'Quais características você encontrou?',
        'O que mudou depois dessa ação?',
        'Como podemos descobrir se acontece novamente?',
      ],
    },
    'Grupo 5': {
      explore: 'Convide as crianças a observar os materiais, levantar ideias sobre suas propriedades e escolher maneiras de iniciar a investigação.',
      investigate: 'Proponha que testem diferentes ações, comparem os resultados e observem relações entre suas escolhas e as mudanças percebidas.',
      create: 'Desafie as crianças a elaborar uma composição ou experiência própria, justificando escolhas e compartilhando o percurso realizado.',
      questions: [
        'O que você imagina que vai acontecer?',
        'O resultado foi o que você esperava? Por quê?',
        'Que outra maneira podemos experimentar?',
      ],
    },
  };

  const instructions = groupInstructions[classLevel];

  return [
    {
      title: 'Acolhida e apresentação dos materiais',
      fraction: 3,
      teacher: (theme) =>
        `Apresente a proposta "${theme}" e os materiais selecionados. Explique que o grupo realizará uma experiência de exploração sensorial. ${instructions.explore} O foco será ${focus}.`,
      children: () =>
        'As crianças observam a apresentação e participam conforme suas possibilidades, demonstrando curiosidade por meio de gestos, olhares, movimentos, falas ou escolhas.',
      interventions: () => instructions.questions,
    },
    {
      title: 'Primeira exploração sensorial',
      fraction: 4,
      teacher: () =>
        `${instructions.explore} Observe as iniciativas das crianças e descreva características e ações sem determinar uma única maneira correta de explorar.`,
      children: () =>
        'As crianças exploram os materiais disponibilizados, individualmente ou em pequenos grupos, conforme a organização e as condições de segurança da proposta.',
      interventions: () => [
        'O que você percebe ao tocar ou observar esse material?',
        'Você gostaria de experimentar de outra maneira?',
        'Vou acompanhar sua descoberta. Pode me mostrar o que encontrou?',
      ],
    },
    {
      title: 'Investigação e novas descobertas',
      fraction: 4,
      teacher: () =>
        `${instructions.investigate} Observe as reações e proponha intervenções de acordo com o interesse demonstrado, sem apressar as descobertas.`,
      children: () =>
        'As crianças experimentam outras possibilidades de manipulação e observação, repetem ações, fazem escolhas e compartilham descobertas de diferentes formas.',
      interventions: () => instructions.questions,
    },
    {
      title: 'Criação ou experimentação escolhida pelo grupo',
      fraction: 5,
      teacher: (theme) =>
        `Retome a proposta "${theme}" e convide as crianças a ampliar a experiência. ${instructions.create} Ofereça apoio quando necessário, preservando a iniciativa infantil.`,
      children: () =>
        'As crianças escolhem como continuar a experiência, combinam ações e materiais quando isso for adequado e demonstram suas descobertas por meio de produções, gestos, movimentos ou falas.',
      interventions: () => [
        'Qual parte da experiência chamou mais sua atenção?',
        'Você gostaria de mudar alguma coisa?',
        'Como podemos continuar explorando?',
      ],
    },
    {
      title: 'Compartilhamento e organização',
      fraction: 2,
      teacher: () =>
        'Convide as crianças a observar o que foi explorado e a compartilhar suas descobertas por meio de falas, gestos ou demonstrações. Organize a limpeza e o armazenamento dos materiais com participação adequada à idade.',
      children: () =>
        'As crianças compartilham o que descobriram, observam as experiências dos colegas e participam da organização conforme suas possibilidades.',
      interventions: () => [
        'O que você mais gostou de explorar?',
        'O que descobrimos durante a experiência?',
        'Você gostaria de experimentar novamente em outro momento?',
      ],
    },
  ];
}

export const sensoryPlay: ActivityPattern = {
  id: 'sensory-play',

  keywords: [
    'sensório',
    'sensorial',
    'massinha',
    'massa',
    'modelar',
    'textura',
    'tátil',
    'areia',
    'água',
    'agua',
    'espuma',
    'bolha',
    'bolhas',
    'tactil',
    'cinestésico',
    'cinestesico',
    'exploração',
    'exploracao',
    'manipulação',
    'manipulacao',
  ],

  description: 'Exploração sensorial e investigação de materiais',

  bnccFields: [
    'O eu, o outro e o nós',
    'Corpo, gestos e movimentos',
    'Traços, sons, cores e formas',
    'Espaços, tempos, quantidades, relações e transformações',
  ],

  buildObjectives: (theme, _ageRange, classLevel) => {
    const experience = getExperience(theme);
    const objectives: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        `Vivenciar ${experience} por meio de experiências acompanhadas, respeitando as iniciativas e o tempo de cada criança.`,
        'Ampliar as possibilidades de percepção e exploração por meio de gestos, movimentos e contato com materiais adequados.',
        'Expressar curiosidade, preferências e reações por meio de olhares, gestos, movimentos e vocalizações.',
      ],
      'Grupo 2': [
        `Ampliar as experiências de ${experience}, realizando ações variadas e descobrindo características dos materiais.`,
        'Experimentar movimentos de tocar, apertar, movimentar e organizar materiais, desenvolvendo a coordenação motora.',
        'Comunicar preferências, sensações e descobertas por meio de gestos, palavras e interações.',
      ],
      'Grupo 3': [
        `Investigar ${experience}, percebendo semelhanças, diferenças e transformações observáveis.`,
        'Ampliar a coordenação motora e a autonomia ao escolher e manipular materiais e utensílios adequados.',
        'Compartilhar descobertas e comunicar percepções por meio de diferentes linguagens.',
      ],
      'Grupo 4': [
        `Investigar propriedades e possibilidades de ${experience}, estabelecendo comparações entre materiais e resultados.`,
        'Planejar e realizar ações de exploração, ampliando a autonomia e a coordenação dos movimentos.',
        'Formular perguntas, comunicar descobertas e participar de experiências coletivas.',
      ],
      'Grupo 5': [
        `Investigar ${experience}, levantando hipóteses, testando possibilidades e comparando resultados.`,
        'Planejar experiências e fazer escolhas intencionais sobre materiais, movimentos e procedimentos.',
        'Registrar ou comunicar descobertas por meio de falas, desenhos, gestos e outras formas de expressão.',
      ],
    };

    return objectives[classLevel];
  },

  buildMaterials: (theme, classLevel) => {
    const value = normalize(theme);
    const materials: string[] = [
      'Bandejas ou recipientes estáveis, adequados à proposta',
      'Proteção lavável para a superfície de exploração',
      'Panos e materiais de higiene para a organização após a experiência',
    ];

    if (value.includes('agua') || value.includes('bolha') || value.includes('espuma')) {
      materials.push(
        'Recipientes rasos e estáveis com pequenas quantidades de água, quando apropriado',
        'Esponjas grandes e íntegras, sem partes soltas',
        'Utensílios grandes e resistentes para movimentar ou transferir água',
      );
    } else if (value.includes('areia') || value.includes('terra') || value.includes('barro')) {
      materials.push(
        'Areia ou terra de procedência conhecida e apropriada para uso infantil, quando autorizada',
        'Recipientes e pás grandes, resistentes e sem pontas',
        'Elementos naturais selecionados individualmente e previamente inspecionados',
      );
    } else if (value.includes('massinha') || value.includes('massa') || value.includes('modelar')) {
      materials.push(
        'Massa de modelar atóxica, apropriada à faixa etária e utilizada conforme orientação do fabricante',
        'Rolos e utensílios grandes, resistentes e sem bordas cortantes',
        'Superfície limpa e estável para modelagem',
      );
    } else {
      materials.push(
        'Materiais de diferentes texturas, selecionados conforme o tema e a faixa etária',
        'Objetos grandes, resistentes, laváveis e sem partes que possam se soltar',
        'Utensílios adequados para observar, tocar, movimentar ou organizar os materiais',
      );
    }

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      materials.push(
        'Materiais de tamanho adequado, sem peças pequenas, sem risco de aspiração e que não se desfaçam durante a exploração',
      );
    }

    return materials;
  },

  stepSpecs: buildStepsForGroup('Grupo 3'),

  buildStepSpecs: (_theme, _ageRange, classLevel) =>
    buildStepsForGroup(classLevel),

  buildSafety: (classLevel, ageRange): SafetyResult => {
    const notes = [
      'Inspecionar todos os materiais antes da atividade, retirando itens quebrados, pontiagudos, tóxicos, deteriorados ou com partes que possam se soltar.',
      'Verificar previamente possíveis alergias, sensibilidades, restrições e orientações individuais das crianças.',
      'Manter supervisão contínua e próxima durante toda a exploração. Não permitir que materiais sejam colocados na boca, nariz ou ouvidos.',
      'Utilizar água em quantidade controlada e recipientes estáveis; evitar pisos molhados e risco de escorregamento.',
      'Não utilizar materiais de origem desconhecida, produtos químicos, substâncias irritantes ou misturas improvisadas.',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      notes.push(
        `Para o ${classLevel}, com faixa etária de ${ageRange}, evitar peças pequenas, materiais que possam ser engolidos ou aspirados e substâncias cuja composição não seja conhecida. A supervisão deve permitir intervenção imediata.`,
        'Não oferecer materiais comestíveis como garantia de segurança: alergias, engasgos e ingestão de quantidades inadequadas também precisam ser considerados.',
      );
    } else {
      notes.push(
        `Para o ${classLevel}, com faixa etária de ${ageRange}, explicar os combinados de segurança antes da exploração e acompanhar o uso dos utensílios, sem substituir a supervisão adulta.`,
      );
    }

    return {
      notes,
      alternative:
        'Se algum material não for adequado, apresentar outro recurso de composição conhecida, íntegro, higienizável e compatível com a faixa etária, preservando a intenção de investigar texturas, movimentos ou transformações.',
    };
  },

  buildAdaptations: (classLevel, ageRange) => [
    `Organizar a experiência considerando o ${classLevel} (${ageRange}), sem exigir que todas as crianças realizem as mesmas ações ou alcancem o mesmo resultado.`,
    'Para crianças com sensibilidade tátil, permitir observar primeiro, utilizar utensílios como alternativa ao toque direto ou escolher outro material confortável.',
    'Para crianças com mobilidade reduzida, ajustar a altura da superfície, estabilizar os recipientes e posicionar os materiais ao alcance.',
    'Para crianças com deficiência visual, oferecer exploração tátil segura, descrição verbal das características e organização previsível dos materiais.',
    'Para crianças que utilizam comunicação não oral, acolher escolhas por gestos, expressões, movimentos, apontamentos ou recursos de comunicação alternativa.',
    'Ampliar ou simplificar os desafios conforme o interesse, as iniciativas e as necessidades observadas durante a atividade.',
  ],
};
