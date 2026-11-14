import type { ActivityPattern, SafetyResult } from '../patternTypes';
import { isUnder3, isUnder2 } from '../pedagogicalHelpers';

export const grainTransfer: ActivityPattern = {
  id: 'grain-transfer',
  keywords: ['grão', 'grãos', 'milho', 'arroz', 'feijão', 'feijao', 'transferência', 'transferencia', 'transpasse', 'despejar', 'despejo'],
  description: 'Transferência e manipulação de grãos',
  bnccFields: [
    'Corpo, gestos e movimentos',
    'Espaços, tempos, quantidades, relações e transformações',
    'Traços, sons, cores e formas',
  ],

  buildObjectives: (_theme, ageRange) => [
    `Desenvolver a coordenação motora fina por meio dos movimentos de pinça, despejar e transferir grãos entre recipientes, adequado à faixa de ${ageRange}.`,
    `Estimular a percepção sensorial tátil e auditiva ao explorar diferentes texturas, pesos e sons produzidos pelos grãos durante a manipulação.`,
    `Proporcionar a comparação e a noção de quantidades (mais, menos, cheio, vazio, leve, pesado) por meio da transferência entre potes de tamanhos variados.`,
    `Exercitar o controle voluntário de movimentos e a concentração ao utilizar colheres, conchas e funis para despejar com precisão.`,
    `Favorecer a autonomia e a confiança ao realizar a transferência de forma independente, valorizando as conquistas de cada criança.`,
  ],

  buildMaterials: (_theme, classLevel) => {
    const base = [
      'Potes e recipientes de plástico ou acrílico com tamanhos variados (pelo menos 3 tamanhos diferentes)',
      'Colheres de sopa e de chá (plástico ou metal, sem bordas cortantes)',
      'Conchas de diferentes tamanhos',
      'Funis de plástico (boca larga)',
      'Bandejas rasas para apoiar a transferência e conter derramamentos',
      'Jornais ou plástico resistente para forrar toda a superfície da mesa',
      'Pano úmido à disposição para limpeza imediata',
    ];

    if (isUnder3(classLevel)) {
      return [
        'Bolas de plástico grandes (3cm ou mais) ou cubos de espuma — substituição segura para grãos',
        'Potes e recipientes de plástico com boca larga (tamanhos variados)',
        'Colheres grandes de plástico (sem bordas cortantes)',
        'Conchas grandes de plástico',
        'Funis de plástico com boca larga',
        'Bandejas rasas com borda para conter os elementos',
        'Plástico resistente para forrar a mesa',
        'Pano úmido para limpeza',
      ];
    }

    return [
      'Grãos variados (milho, arroz, feijão) — selecionar grãos íntegros e descartar grãos quebrados',
      ...base,
    ];
  },

  stepSpecs: [
    {
      title: 'Acolhida e apresentação dos materiais',
      fraction: 3,
      teacher: (_theme, ageRange) =>
        `Sente as crianças em roda. Apresente os recipientes com os materiais (grãos ou substitutos seguros) dentro de potes transparentes, um tipo por vez. Nomeie cada material claramente: "Este é o milho", "Esta é a colher", "Este é o funil". Explique com palavras simples que cada criança vai transferir o material de um pote para outro usando a colher, a concha e o funil. Mostre cada utensílio e demonstre brevemente sua função. Adapte a linguagem à faixa de ${ageRange}, usando frases curtas e gestos explicativos.`,
      children: () =>
        `As crianças observam os materiais apresentados, tocam os potes fechados e nomeiam ou apontam o que reconhecem. Algumas podem querer segurar os utensílios para sentir o peso e o tamanho. Permanecem em roda atentas à explicação da professora.`,
      interventions: () => [
        '"Olhem bem este pote — o que tem dentro? Quem sabe o nome?"',
        '"Para que serve uma colher? E um funil? Onde já viram um funil?"',
        '"Hoje vamos aprender a passar coisas de um pote para o outro. Vocês conseguem imaginar como?"',
        'Observar quais crianças já mostram interesse em manipular e convidá-las a ajudar na demonstração.',
      ],
    },
    {
      title: 'Exploração sensorial',
      fraction: 3,
      teacher: (_theme, ageRange) =>
        `Disponibilize pequenas porções de cada material em bandejas rasas sobre a mesa. Conduza as crianças em grupos de 3 ou 4 até a mesa. Estimule que toquem, peguem e sintam a textura, o peso e o som dos materiais ao serem movimentados. Nomeie as sensações: "Está liso ou áspero?", "É leve ou pesado?". Para a faixa de ${ageRange}, priorize a exploração tátil e verbalize o que cada criança experimenta.`,
      children: () =>
        `As crianças manipulam livremente os materiais nas bandejas: pegam com as mãos, esfregam, despejam de uma mão para a outra, escutam o som. Algumas agrupam por tipo, outras misturam. A exploração é livre, com a professora próxima nomeando sensações e incentivando verbalização.`,
      interventions: () => [
        '"Como se sente o milho quando você passa o dedo? E o arroz?"',
        '"Faz barulho quando você mexe? Que som é esse?"',
        '"Qual é mais pesado: o pote com milho ou o pote com arroz?"',
        'Para crianças que hesitam em tocar: segurar junto e modelar o gesto, depois incentivar que façam sozinhas.',
        'Observar crianças que levam à boca e intervir imediatamente (ver cuidados de segurança).',
      ],
    },
    {
      title: 'Demonstração da transferência',
      fraction: 2,
      teacher: () =>
        `Chame a atenção das crianças para uma demonstração. Coloque um pote cheio e um vazio sobre a mesa, diante de todos. Mostre lentamente, passo a passo, como pegar o material com a colher e despejar no pote vazio. Repita com a concha e depois com o funil, explicando cada movimento: "Eu mergulho a colher, pego um pouquinho, levo até o outro pote e despejo com cuidado". Enfatize o controle do movimento e o cuidado para não derramar.`,
      children: () =>
        `As crianças observam a demonstração atentamente. Algumas podem seguir os movimentos com o corpo, imitando o gesto de despejar. Algumas são convidadas a ajudar segurando o funil ou o pote receptor durante a demonstração.`,
      interventions: () => [
        '"Vocês viram como a colher pega um pouquinho de cada vez?"',
        '"Para que serve o funil? Ele ajuda a não derramar — por quê?"',
        '"O que acontece se eu despejar muito rápido? E se for devagar?"',
        'Convidar uma criança para segurar o funil durante a demonstração, promovendo participação ativa.',
      ],
    },
    {
      title: 'Experimentação pelas crianças',
      fraction: 7,
      teacher: (_theme, ageRange) =>
        `Organize as crianças em pequenos grupos (3 a 4 por mesa) com os materiais dispostos: potes, colheres, conchas, funis e bandejas. Entregue a cada criança um pote com material e um pote vazio. Oriente que façam a transferência usando diferentes utensílios. Circule entre os grupos oferecendo apoio individual, modelando o gesto quando necessário e fazendo perguntas que promovam reflexão. Para a faixa de ${ageRange}, ofereça colheres maiores e potes de boca larga, simplificando a tarefa. Valorize cada conquista: "Conseguiu despejar sem derramar nadinha!"`,
      children: () =>
        `Cada criança pratica a transferência de seu material entre potes usando colher, concha e funil. Variam os utensílios por iniciativa própria ou por sugestão da professora. Algumas contam quantas conchas precisam para encher o pote, outras comparam qual enche mais rápido. A experimentação é ativa, repetida e concentrada.`,
      interventions: () => [
        '"Quantas colheradas você acha que precisa para encher este pote? Vamos contar juntos?"',
        '"Qual é mais fácil de usar: a colher ou a concha? Por quê?"',
        '"O pote está cheio ou vazio? E agora, depois de mais uma conchada?"',
        '"Qual grão é mais leve: o milho ou o arroz? Como podemos descobrir?"',
        'Para crianças com dificuldade de coordenação: oferecer colheres maiores e potes de boca mais larga, reduzindo a precisão exigida.',
        'Para crianças que dominam a tarefa: propor que usem o funil ou troquem de utensílio para aumentar o desafio.',
      ],
    },
    {
      title: 'Encerramento e roda de conversa',
      fraction: 2,
      teacher: () =>
        `Convide as crianças a guardar os materiais junto com você, reforçando o cuidado com cada objeto. Reúna todos em roda. Conduza uma conversa sobre a experiência: pergunte o que descobriram, o que foi fácil e o que foi difícil, qual utensílio gostaram mais de usar. Faça a ponte com o cotidiano: "Em casa, quem já ajudou a despejar arroz na panela?". Encerre agradecendo a participação.`,
      children: () =>
        `As crianças ajudam a guardar os materiais nos potes e organizar a mesa. Na roda, compartilham o que descobriram e o que mais gostaram. Algumas demonstram com gestos o que fizeram, outras falam sobre os materiais preferidos.`,
      interventions: () => [
        '"O que foi mais difícil de fazer hoje? E o que foi mais fácil?"',
        '"Qual utensílio você gostou mais de usar? A colher, a concha ou o funil?"',
        '"Em casa, quem já viu alguém despejar algo de um pote para o outro?"',
        'Registrar verbalmente as descobertas: "A Maria descobriu que a concha pega mais que a colher!"',
      ],
    },
  ],

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes: string[] = [];

    if (isUnder3(classLevel)) {
      notes.push(
        'Risco de engasgo incompatível com a faixa etária: grãos como milho, arroz e feijão são pequenos e podem obstruir as vias respiratórias de crianças menores de 3 anos. Esta atividade não deve ser realizada com grãos verdadeiros nesta faixa etária.',
      );
      notes.push(
        'A alternativa segura proposta (bolas de plástico grandes ou cubos de espuma) deve ser utilizada no lugar dos grãos. Mesmo assim, supervise constantemente para evitar que levem à boca.',
      );
      notes.push(
        'Evite que as crianças levem qualquer material à boca, nariz ou ouvidos. A supervisão deve ser direta e contínua durante toda a atividade.',
      );
      return {
        notes,
        alternative:
          'Substituir todos os grãos por bolas de plástico grandes (acima de 3cm), cubos de espuma ou pedaços de algodão. Estes elementos são grandes o suficiente para não representar risco de engasgo e permitem o mesmo trabalho de transferência e coordenação motora.',
      };
    }

    notes.push(
      'Grãos pequenos ainda requerem supervisão constante. Oriente as crianças a não colocar os grãos na boca, nariz ou ouvidos.',
    );
    notes.push(
      'Mantenha os grãos fora do alcance das crianças quando não estiverem em uso ativo.',
    );
    notes.push(
      'Inspecione os grãos antes da atividade: descarte grãos quebrados, moídos ou com sinais de contaminação.',
    );
    notes.push(
      'Em caso de derramamento, limpe imediatamente para evitar escorregões e acesso a grãos espalhados no chão.',
    );

    return { notes, alternative: null };
  },

  buildAdaptations: (classLevel, _ageRange) => {
    const adaptations = [
      'Para crianças com coordenação motora menos desenvolvida: oferecer colheres maiores, potes de boca mais larga e funil de abertura maior, reduzindo a precisão exigida.',
      'Para crianças que concluem rapidamente: propor desafios adicionais como transferir usando pinças, comparar quantidades entre dois potes, ou organizar os materiais por tipo em recipientes separados.',
      'Para crianças com hipersensibilidade tátil: permitir o uso de luvas finas ou iniciar a exploração com utensílios antes do toque direto, respeitando o tempo de cada uma.',
      'Para crianças com mobilidade reduzida: posicionar os materiais ao alcance, ajustar a altura da mesa e garantir que os utensílios tenham cabos fáceis de segurar.',
    ];

    if (isUnder2(classLevel)) {
      adaptations.push(
        'Para bebês que ainda não sentam com estabilidade: realizar a atividade no colo da professora ou em mesa baixa com apoio, usando apenas elementos grandes e seguros.',
      );
    }

    return adaptations;
  },
};
