import type { ClassLevel } from '../../types';
import type { ActivityPattern, SafetyResult, StepSpec } from '../patternTypes';

function getGroupGuidance(classLevel: ClassLevel) {
  const guidance: Record<ClassLevel, {
    focus: string;
    participation: string;
    mediation: string;
    questions: string[];
  }> = {
    'Grupo 1': {
      focus: 'exploração acompanhada, descoberta por meio dos sentidos e respeito às iniciativas individuais',
      participation: 'As crianças participam por meio de olhares, gestos, movimentos, vocalizações, aproximações e escolhas, conforme suas possibilidades.',
      mediation: 'Apresente um estímulo ou recurso por vez, demonstre ações simples e acompanhe as respostas das crianças. Não exija respostas verbais nem imitação.',
      questions: [
        'Você quer observar mais um pouco?',
        'Posso mostrar como funciona?',
        'Você quer experimentar?',
      ],
    },
    'Grupo 2': {
      focus: 'exploração ativa, repetição, escolhas simples e ampliação das interações',
      participation: 'As crianças observam, experimentam, repetem ações, fazem escolhas e comunicam interesses por gestos, palavras e movimentos.',
      mediation: 'Ofereça oportunidades de experimentar e repetir ações, nomeie descobertas e apresente pequenas variações conforme o interesse das crianças.',
      questions: [
        'O que você quer experimentar primeiro?',
        'O que aconteceu quando você tentou?',
        'Quer fazer de novo ou tentar de outro jeito?',
      ],
    },
    'Grupo 3': {
      focus: 'experimentação, comunicação de descobertas e ampliação da autonomia',
      participation: 'As crianças exploram possibilidades, fazem escolhas, interagem e compartilham descobertas por diferentes linguagens.',
      mediation: 'Convide as crianças a experimentar, comparar e explicar o que perceberam, oferecendo ajuda quando necessário.',
      questions: [
        'O que você percebeu?',
        'O que mudou quando você tentou dessa maneira?',
        'Como você explicaria sua descoberta?',
      ],
    },
    'Grupo 4': {
      focus: 'investigação, comparação de possibilidades, criação e cooperação',
      participation: 'As crianças participam de decisões, experimentações e trocas, construindo explicações e soluções em conjunto.',
      mediation: 'Proponha desafios adequados ao tema, incentive diferentes estratégias e acolha hipóteses sem antecipar todas as respostas.',
      questions: [
        'Que outras possibilidades podemos experimentar?',
        'Por que você escolheu fazer assim?',
        'O que podemos descobrir comparando essas experiências?',
      ],
    },
    'Grupo 5': {
      focus: 'investigação intencional, elaboração de hipóteses, autonomia e compartilhamento de ideias',
      participation: 'As crianças planejam ações, testam possibilidades, argumentam, colaboram e comunicam suas descobertas.',
      mediation: 'Estimule o planejamento, a justificativa das escolhas, a análise dos resultados e a revisão de ideias quando necessário.',
      questions: [
        'O que você imagina que vai acontecer?',
        'Que evidências ajudam a explicar sua ideia?',
        'O que você mudaria se fosse experimentar novamente?',
      ],
    },
  };

  return guidance[classLevel];
}

function buildGenericSteps(classLevel: ClassLevel): StepSpec[] {
  const guidance = getGroupGuidance(classLevel);

  return [
    {
      title: 'Acolhida e aproximação com o tema',
      fraction: 2,
      teacher: (theme) =>
        `Apresente o tema "${theme}" de maneira acolhedora, utilizando uma conversa, imagem, objeto, pergunta, situação ou outro recurso pertinente à proposta. ${guidance.mediation} O objetivo inicial é despertar interesse, não antecipar todas as respostas.`,
      children: () =>
        `As crianças entram em contato com o tema e demonstram interesse, curiosidade ou preferências por diferentes formas de participação. ${guidance.participation}`,
      interventions: () => guidance.questions,
    },
    {
      title: 'Exploração inicial da proposta',
      fraction: 3,
      teacher: (theme) =>
        `Organize o espaço e apresente os recursos necessários à proposta "${theme}". Explique ou demonstre apenas o que for necessário para que as crianças possam começar. ${guidance.mediation}`,
      children: () =>
        'As crianças observam, exploram, interagem ou experimentam os recursos e situações apresentados, conforme a natureza da atividade.',
      interventions: () => [
        'O que chamou sua atenção?',
        'Como você gostaria de começar?',
        'Você quer observar, experimentar ou participar de outra maneira?',
      ],
    },
    {
      title: 'Desenvolvimento da experiência',
      fraction: 7,
      teacher: (theme) =>
        `Acompanhe o desenvolvimento da proposta "${theme}", oferecendo intervenções relacionadas ao que as crianças estão fazendo. ${guidance.mediation} Evite transformar a atividade em uma sequência rígida de comandos. Observe as iniciativas e permita diferentes caminhos de participação.`,
      children: () =>
        `As crianças desenvolvem a experiência por meio de ações, interações, brincadeiras, investigações, conversas ou produções, conforme a proposta. ${guidance.participation}`,
      interventions: () => guidance.questions,
    },
    {
      title: 'Ampliação das descobertas',
      fraction: 4,
      teacher: (theme) =>
        `Retome o que surgiu durante a experiência "${theme}" e ofereça uma possibilidade de aprofundamento coerente com o interesse das crianças. Pode ser uma nova pergunta, uma variação, uma comparação, uma criação ou uma continuidade da brincadeira. Não acrescente desafios que não tenham relação com a proposta.`,
      children: () =>
        'As crianças podem retomar ações, experimentar outras possibilidades, compartilhar ideias ou ampliar suas descobertas com o apoio da professora.',
      interventions: () => [
        'O que mais podemos descobrir sobre isso?',
        'Você gostaria de continuar ou experimentar outra possibilidade?',
        'Como podemos compartilhar essa descoberta?',
      ],
    },
    {
      title: 'Compartilhamento e encerramento',
      fraction: 2,
      teacher: () =>
        `Convide as crianças a compartilhar a experiência por meio de falas, gestos, demonstrações, desenhos ou outras linguagens pertinentes. Valorize os diferentes percursos e organize o espaço e os materiais com participação adequada à idade. Encerre respeitando o envolvimento das crianças e o tempo disponível.`,
      children: () =>
        'As crianças compartilham suas experiências, observam as descobertas dos colegas e participam do encerramento conforme suas possibilidades.',
      interventions: () => [
        'O que mais chamou sua atenção durante a experiência?',
        'Você gostaria de mostrar algo que descobriu?',
        'O que podemos retomar em outro momento?',
      ],
    },
  ];
}

export const generic: ActivityPattern = {
  id: 'generic',

  keywords: [],

  description: 'Proposta pedagógica flexível',

  bnccFields: [
    'O eu, o outro e o nós',
    'Corpo, gestos e movimentos',
    'Traços, sons, cores e formas',
    'Escuta, fala, pensamento e imaginação',
    'Espaços, tempos, quantidades, relações e transformações',
  ],

  buildObjectives: (theme, _ageRange, classLevel) => {
    const objectives: Record<ClassLevel, string[]> = {
      'Grupo 1': [
        `Vivenciar experiências relacionadas ao tema "${theme}", por meio da exploração acompanhada e do contato com diferentes situações e recursos.`,
        'Expressar interesses, preferências e descobertas por meio de gestos, movimentos, olhares e outras formas de comunicação.',
        'Ampliar as possibilidades de interação com pessoas, objetos e ambientes, respeitando as iniciativas individuais.',
      ],
      'Grupo 2': [
        `Explorar situações e recursos relacionados ao tema "${theme}", realizando escolhas e experimentando diferentes possibilidades.`,
        'Ampliar a comunicação de ideias, preferências e descobertas por meio de gestos, palavras, movimentos e interações.',
        'Desenvolver autonomia e participação nas experiências individuais e coletivas.',
      ],
      'Grupo 3': [
        `Investigar aspectos do tema "${theme}" por meio de experiências, brincadeiras e diferentes formas de expressão.`,
        'Ampliar a capacidade de fazer escolhas, comunicar descobertas e participar de situações coletivas.',
        'Experimentar estratégias e possibilidades, desenvolvendo autonomia e cooperação.',
      ],
      'Grupo 4': [
        `Investigar e ampliar conhecimentos relacionados ao tema "${theme}", estabelecendo relações com experiências do cotidiano.`,
        'Elaborar perguntas, compartilhar hipóteses e comunicar ideias por diferentes linguagens.',
        'Participar de experiências coletivas, exercitando a cooperação, a autonomia e o respeito às diferentes perspectivas.',
      ],
      'Grupo 5': [
        `Aprofundar conhecimentos sobre o tema "${theme}", elaborando hipóteses e estabelecendo relações entre diferentes experiências.`,
        'Planejar ações, experimentar possibilidades, analisar resultados e comunicar descobertas.',
        'Desenvolver autonomia, argumentação, colaboração e participação nas decisões do grupo.',
      ],
    };

    return objectives[classLevel];
  },

  buildMaterials: (theme, classLevel) => [
    `Recursos diretamente relacionados à proposta sobre "${theme}", selecionados pela professora conforme a experiência que pretende desenvolver.`,
    `Materiais complementares adequados ao ${classLevel}, somente quando necessários à realização da proposta.`,
    'Mobiliário e espaço organizados para permitir participação, circulação e acessibilidade.',
    'Materiais de registro ou expressão, como papel, lápis, imagens ou outros recursos, apenas se fizerem parte da experiência planejada.',
  ],

  stepSpecs: buildGenericSteps('Grupo 3'),

  buildStepSpecs: (_theme, _ageRange, classLevel) =>
    buildGenericSteps(classLevel),

  buildSafety: (classLevel, ageRange): SafetyResult => {
    const notes = [
      'Avaliar os riscos específicos da atividade antes de selecionar os materiais e organizar o espaço.',
      'Inspecionar os recursos utilizados, retirando objetos quebrados, pontiagudos, tóxicos, deteriorados ou com partes que possam se soltar.',
      'Verificar previamente alergias, sensibilidades, restrições e necessidades individuais das crianças.',
      'Manter supervisão compatível com a natureza da experiência e com as necessidades do grupo.',
      'Organizar o ambiente para evitar obstáculos, quedas, colisões e acesso a materiais inadequados.',
    ];

    if (classLevel === 'Grupo 1' || classLevel === 'Grupo 2') {
      notes.push(
        `Para o ${classLevel}, com faixa etária de ${ageRange}, verificar especialmente o risco de engasgo e aspiração. Não disponibilizar peças pequenas, materiais que se desprendam ou objetos que possam ser levados à boca e ofereçam perigo.`,
        'Acompanhar de perto a exploração e não considerar materiais comestíveis automaticamente seguros.',
      );
    } else {
      notes.push(
        `Para o ${classLevel}, com faixa etária de ${ageRange}, explicar os cuidados necessários e acompanhar o uso dos recursos, mantendo a supervisão adulta durante toda a experiência.`,
      );
    }

    return {
      notes,
      alternative:
        'Se algum recurso não for adequado, substituí-lo por outro de composição conhecida, íntegro e compatível com a faixa etária, preservando o objetivo pedagógico da experiência.',
    };
  },

  buildAdaptations: (classLevel, ageRange) => [
    `Adequar a complexidade e a mediação ao ${classLevel} (${ageRange}), sem estabelecer expectativas rígidas ou exigir resultados iguais.`,
    'Permitir diferentes formas de participação, incluindo observar, apontar, movimentar, falar, desenhar, demonstrar ou utilizar comunicação alternativa.',
    'Para crianças com mobilidade reduzida, ajustar o espaço, a altura dos recursos e o posicionamento dos materiais.',
    'Para crianças com sensibilidade sensorial, observar suas reações e oferecer alternativas de participação sem obrigar o contato com estímulos desconfortáveis.',
    'Para crianças que necessitam de maior apoio, dividir a experiência em pequenas etapas, oferecer demonstrações e respeitar o tempo individual.',
    'Para crianças que demonstram interesse em aprofundar a proposta, oferecer novas perguntas e possibilidades coerentes com o tema.',
  ],
};
