import type { ClassLevel } from '../../types';
import type { ActivityPattern, SafetyResult } from '../patternTypes';

export const generic: ActivityPattern = {
  id: 'generic',
  keywords: [],
  description: 'Atividade pedagógica geral',
  bnccFields: [
    'O eu, o outro e o nós',
    'Corpo, gestos e movimentos',
    'Escuta, fala, pensamento e imaginação',
  ],

  buildObjectives: (theme, ageRange) => [
    `Promover a exploração e a vivência do tema "${theme}" de forma lúdica e significativa, adequada à faixa de ${ageRange}, valorizando o envolvimento ativo das crianças.`,
    `Desenvolver a coordenação motora (ampla e fina) e a percepção sensorial por meio da manipulação dos materiais e da realização das ações da atividade proposta.`,
    `Estimular a expressão verbal e não-verbal por meio das conversas, das perguntas e das interações durante a atividade sobre "${theme}".`,
    `Favorecer a interação social e a cooperação entre as crianças, promovendo a escuta, o respeito pela vez do outro e a participação coletiva.`,
    `Ampliar o vocabulário e a compreensão sobre o tema "${theme}", conectando a atividade às experiências e conhecimentos prévios das crianças.`,
  ],

  buildMaterials: (theme, _classLevel) => [
    `Um recurso central diretamente relacionado a "${theme}" (por exemplo, imagem, livro, objeto ou material de exploração), escolhido conforme a ação pedagógica que a professora pretende desenvolver.`,
    'Espaço organizado e acessível, com mobiliário adequado à atividade escolhida.',
    'Recurso de registro ou expressão somente se fizer parte da proposta (por exemplo, papel e giz de cera atóxico para desenho).',
  ],

  stepSpecs: [
    {
      title: 'Acolhida e apresentação do tema',
      fraction: 2,
      teacher: (theme, ageRange) =>
        `Receba as crianças em roda, em um ambiente acolhedor. Apresente o tema "${theme}" de forma lúdica: mostre imagens, objetos ou cartazes relacionados e pergunte o que as crianças sabem sobre o tema. Para a faixa de ${ageRange}, use linguagem simples e gestos explicativos. Estabeleça o combinado da atividade: "Hoje vamos aprender sobre ${theme} e todos vão participar do seu jeito."`,
      children: () =>
        `As crianças sentam-se em roda, observam os materiais ou imagens apresentados e compartilham o que sabem ou imaginam sobre o tema. Algumas fazem comentários, outras apontam o que reconhecem. Acolhidas e preparadas para a atividade.`,
      interventions: (theme) => [
        `"O que vocês sabem sobre ${theme}? Quem já viu ou ouviu falar?"`,
        `"Olhem esta imagem. O que vocês veem? O que chamou a atenção?"`,
        `"O que vocês acham que vamos fazer hoje com estes materiais?"`,
        'Para crianças que não respondem: apontar elementos visuais e nomeá-los, incentivando que apontem de volta.',
      ],
    },
    {
      title: 'Apresentação e exploração dos materiais',
      fraction: 3,
      teacher: (theme, ageRange) =>
        `Conduza as crianças até a mesa ou espaço da atividade. Apresente cada material individualmente: mostre, nomeie e explique sua função na atividade sobre "${theme}". Permita que cada criança manuseie os materiais brevemente antes de iniciar. Para a faixa de ${ageRange}, demonstre com gestos claros como cada material será usado e verifique se todas entenderam.`,
      children: () =>
        `As crianças aproximam-se da mesa e observam os materiais. Quando recebem cada material, tocam, exploram e tentam entender para que serve. Algumas fazem perguntas, outras imitam os gestos da professora. A exploração inicial é livre e curiosa.`,
      interventions: () => [
        '"O que este material faz? Para que serve na nossa atividade?"',
        '"Sintam a textura. É duro, macio, liso, áspero?"',
        '"Quem já usou algo parecido com isto antes? Onde?"',
        'Para crianças que hesitam: segurar o material junto e demonstrar o uso, depois convidar a repetir.',
      ],
    },
    {
      title: 'Demonstração da atividade',
      fraction: 3,
      teacher: (theme) =>
        `Reúna a atenção do grupo para uma demonstração. Mostre passo a passo como a atividade sobre "${theme}" será realizada, executando cada etapa lentamente e verbalizando o que está fazendo. Enfatize os pontos importantes: como segurar, como usar, como cuidar dos materiais. Verifique se as crianças estão compreendendo: "Vocês entenderam? Alguém tem alguma dúvida?".`,
      children: () =>
        `As crianças observam a demonstração atentamente. Algumas acompanham com gestos no ar, imitando o que a professora faz. Quando convidadas, fazem perguntas ou pedem para tentar. A demonstração prepara a realização autônoma.`,
      interventions: () => [
        '"Vocês viram como eu fiz? Qual foi o primeiro passo?"',
        '"O que acontece se fizer diferente? Vamos descobrir?"',
        '"Alguém quer me ajudar na demonstração? Vem aqui mostrar para a turma!"',
        'Repetir a demonstração se necessário, simplificando os passos para crianças que mostram dúvida.',
      ],
    },
    {
      title: 'Realização da atividade pelas crianças',
      fraction: 7,
      teacher: (theme, ageRange) =>
        `Organize as crianças individualmente ou em pequenos grupos. Distribua os materiais e oriente a realização da atividade sobre "${theme}". Circule entre as crianças oferecendo apoio individual: ajude quem tem dificuldade, faça perguntas que estimulem a reflexão e valorize cada produção. Para a faixa de ${ageRange}, o foco é o processo de exploração e participação, não o resultado final. Adapte a complexidade conforme o ritmo de cada criança.`,
      children: () =>
        `As crianças realizam a atividade: manipulam os materiais, seguem os passos demonstrados e criam ou produzem sobre o tema. Umas trabalham com concentração silenciosa, outras conversam com os colegas. Cada uma participa no seu ritmo e do seu jeito.`,
      interventions: () => [
        '"Me conte o que você está fazendo. Como está sendo?"',
        '"O que você descobriu enquanto fazia esta parte?"',
        '"Você quer tentar de outro jeito? O que aconteceria?"',
        'Para crianças com dificuldade: dividir a tarefa em passos menores e acompanhar um por um.',
        'Para crianças que terminam rápido: propor um desafio adicional relacionado ao tema ou pedir que ajudem um colega.',
      ],
    },
    {
      title: 'Encerramento e roda de conversa',
      fraction: 3,
      teacher: (theme) =>
        `Convide as crianças a guardar os materiais junto com você. Reúna todos em roda. Conduza uma conversa sobre a experiência: "O que fizeram? O que descobriram? O que foi fácil e o que foi difícil?". Conecte a atividade ao tema "${theme}" e ao cotidiano: "O que aprendemos hoje que podemos usar em outros momentos?". Encerre valorizando a participação de cada criança.`,
      children: () =>
        `As crianças ajudam a guardar os materiais. Na roda, compartilham o que fizeram, o que descobriram e como se sentiram. Algumas mostram o que produziram, outras falam sobre a experiência. A conversa de encerramento consolida o aprendizado.`,
      interventions: () => [
        '"O que vocês descobriram hoje sobre ${theme}?"',
        '"O que foi mais fácil de fazer? E o que foi mais difícil?"',
        '"O que vocês vão contar para a família sobre a atividade de hoje?"',
        'Registrar descobertas coletivas: "Hoje a turma aprendeu que..." para valorizar o aprendizado do grupo.',
      ],
    },
  ],

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes: string[] = [];

    if (isUnder3Safe(classLevel)) {
      notes.push(
        'Crianças menores de 3 anos podem levar materiais pequenos à boca: selecionar materiais de tamanho adequado (sem partes menores que possam se desprender) e supervisionar constantemente.',
      );
    }

    notes.push(
      'Verificar previamente que todos os materiais não tenham bordas cortantes, lascas, pontas ou partes pequenas soltas.',
    );
    notes.push(
      'Garantir que o espaço de atividade esteja livre de obstáculos e que as crianças tenham espaço suficiente para se movimentar com segurança.',
    );
    notes.push(
      'Adaptar os materiais à faixa etária, evitando peças pequenas, pontiagudas ou quebráveis.',
    );

    return { notes, alternative: null };
  },

  buildAdaptations: (_classLevel, _ageRange) => [
    'Para crianças com ritmo mais lento: oferecer mais tempo para a realização, dividir a tarefa em etapas menores e acompanhar individualmente sem pressa.',
    'Para crianças com mais habilidade ou que concluem rapidamente: propor desafios adicionais relacionados ao tema, ou convidar a ajudar colegas que precisam de apoio.',
    'Para crianças com sensibilidade sensorial: observar reações aos materiais e adaptar texturas, sons ou intensidades conforme necessário.',
    'Para crianças com mobilidade reduzida: posicionar os materiais ao alcance, ajustar a altura da mesa e garantir utensílios fáceis de segurar.',
    'Para crianças com menos verbalização: aceitar a participação por gestos, apontamentos e expressões, sem exigir fala, e nomear verbalmente o que cada criança faz.',
  ],
};

function isUnder3Safe(classLevel: ClassLevel): boolean {
  return classLevel === 'Berçário' || classLevel === 'Grupo 1' || classLevel === 'Grupo 2';
}
