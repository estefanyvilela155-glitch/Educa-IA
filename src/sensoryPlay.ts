import type { ActivityPattern, SafetyResult } from '../patternTypes';
import { isUnder3, isUnder2 } from '../pedagogicalHelpers';

export const sensoryPlay: ActivityPattern = {
  id: 'sensory-play',
  keywords: ['sensório', 'sensorial', 'massinha', 'massa', 'modelar', 'textura', 'tátil', 'areia', 'água', 'agua', 'espuma', 'bolha', 'bolhas', 'tactil', 'cinestésico', 'cinestesico', 'exploração', 'exploracao', 'manipulação', 'manipulacao'],
  description: 'Exploração sensorial e manipulação tátil',
  bnccFields: [
    'Corpo, gestos e movimentos',
    'Traços, sons, cores e formas',
    'Escuta, fala, pensamento e imaginação',
  ],

  buildObjectives: (theme, ageRange) => [
    `Estimular a percepção sensorial por meio da exploração tátil, visual e auditiva de materiais relacionados ao tema "${theme}", adequada à faixa de ${ageRange}.`,
    `Desenvolver a coordenação motora fina e a força dos movimentos de apertar, amassar, modelar e manipular diferentes texturas e consistências.`,
    `Promover a expressão verbal e não-verbal por meio da nomeação de sensações (macio, duro, liso, áspero, quente, frio) e da descrição do que sente ao manipular.`,
    `Favorecer a concentração, a persistência e o envolvimento profundo na atividade sensorial, respeitando o tempo e o ritmo de cada criança.`,
    `Estimular a imaginação e a criatividade por meio da transformação e modelagem dos materiais em formas livremente criadas.`,
  ],

  buildMaterials: (theme, classLevel) => {
    const base = [
      `Massa de modelar caseira (farinha, água e sal) ou massinha atóxica em cores relacionadas ao tema "${theme}"`,
      'Tapete ou plástico grande para forrar a superfície',
      'Cortadores de plástico (sem bordas cortantes) em formas variadas',
      'Rolo de plástico para abrir a massa',
      'Bandejas para organizar os materiais por criança',
      'Pano úmido para limpeza das mãos durante a atividade',
    ];

    if (isUnder2(classLevel)) {
      base[0] = `Massa caseira comestível (farinha, água e óleo, sem sal) em cores relacionadas ao tema "${theme}" — segura em caso de ingestão incidental`;
      base[2] = 'Cortadores grandes de plástico com bordas totalmente sem corte';
    }

    return base;
  },

  stepSpecs: [
    {
      title: 'Acolhida e apresentação dos materiais sensoriais',
      fraction: 3,
      teacher: (theme, ageRange) =>
        `Sente as crianças em roda e apresente o tema "${theme}". Mostre a massa de modelar em seus potes e diga: "Hoje vamos sentir e modelar com esta massinha!". Abra um pote, pegue uma porção e demonstre: aperte, amasse, faça uma bolinha. Nomeie as sensações: "É macia! É fresquinha!". Para a faixa de ${ageRange}, permita que toquem a massa imediatamente, priorizando a experiência sensorial imediata.`,
      children: () =>
        `As crianças observam a apresentação da massa de modelar. Quando recebem uma porção, tocam, apertam, amassam e exploram livremente. Algumas cheiram, outras observam a textura. A primeira reação é de descoberta tátil.`,
      interventions: () => [
        `"Sintam a massa. Como ela é? Macia ou dura? Lisa ou áspera?"`,
        `"O que acontece quando você aperta forte? E quando aperta de leve?"`,
        `"Vamos fazer uma bolinha juntos? Aperta e roda na mão assim!"`,
        'Para crianças que hesitam em tocar: encostar a massa na ponta dos dedos e descrever a sensação, incentivando o toque gradual.',
      ],
    },
    {
      title: 'Exploração livre da textura e consistência',
      fraction: 4,
      teacher: (_theme, ageRange) =>
        `Disponibilize a massa para cada criança sobre a superfície forrada. Permita a exploração livre: apertar, amassar, esticar, rasgar, amassar de novo. Circule entre as crianças nomeando o que cada uma faz: "Você está esticando a massa! Ficou comprida!". Para a faixa de ${ageRange}, o foco é a experiência sensorial pura, sem exigência de criar formas específicas.`,
      children: () =>
        `As crianças manipulam a massa livremente: apertam com os dedos, amassam com as palmas, esticam, rasgam em pedaços, juntam de novo. Algumas fazem bolas, outras cobras, outras apenas apertam repetidamente. A exploração é absorvente e repetitiva.`,
      interventions: () => [
        '"O que você está fazendo com a massa? Como ela está mudando?"',
        '"Faça uma bola grande. Agora uma bola pequena. Qual é mais pesada?"',
        '"Estica a massa até ficar bem fininha. O que acontece se esticar muito?"',
        'Para crianças com hipersensibilidade tátil: oferecer luvas finas ou permitir que usem um pano entre a mão e a massa.',
        'Para crianças que repetem o mesmo gesto: propor uma variação ("E se você rolar a massa na mesa? Fica como?").',
      ],
    },
    {
      title: 'Demonstração de técnicas de modelagem',
      fraction: 2,
      teacher: (theme) =>
        `Chame a atenção do grupo para uma demonstração. Mostre técnicas simples: (1) rolar a massa na mesa para fazer uma "cobrinha"; (2) amassar para fazer uma bolinha; (3) apertar para fazer uma "panqueca"; (4) usar um cortador para fazer uma forma. Conecte com o tema "${theme}": "Quem quer tentar fazer uma forma sobre ${theme}?". Enfatize que não precisa sair perfeito, o importante é explorar.`,
      children: () =>
        `As crianças observam as técnicas demonstradas. Algumas imitam imediatamente o gesto de rolar ou amassar. Quando recebem os cortadores, experimentam apertar na massa para ver a forma que aparece.`,
      interventions: () => [
        '"Vamos fazer uma cobrinha juntos? Rola a massa na mesa, assim!"',
        '"Aperta o cortador na massa e levanta. O que apareceu?"',
        '"Quem consegue fazer uma panquequinha bem fininha?"',
        'Convidar uma criança para demonstrar uma técnica para os colegas, valorizando suas descobertas.',
      ],
    },
    {
      title: 'Criação livre sobre o tema',
      fraction: 7,
      teacher: (theme, ageRange) =>
        `Proponha que cada criança crie livremente algo relacionado ao tema "${theme}" usando as técnicas que aprenderam. Diga: "Agora vocês vão criar algo sobre ${theme} com a massa. Pode ser qualquer coisa que vocês imaginarem!". Distribua cortadores e rolos. Circule entre as crianças, aproximando-se de cada uma, perguntando sobre o que estão criando e oferecendo ajuda técnica sem interferir na criação. Para a faixa de ${ageRange}, valorize o processo de modelagem e manipulação, não o resultado final.`,
      children: () =>
        `As crianças criam livremente com a massa: algumas usam cortadores para fazer formas, outras modelam com as mãos, outras combinam técnicas. Cada uma está concentrada em sua criação. Algumas mostram o resultado para os colegas, outras continuam modelando em silêncio.`,
      interventions: () => [
        '"Me conta o que você está fazendo. O que esta parte representa?"',
        '"Você quer tentar o cortador em formato de estrela? Como fica?"',
        '"Estou vendo que você misturou duas cores. O que surgiu?"',
        'Para crianças que dizem "não consigo": "Não precisa fazer igual a ninguém. Modela do seu jeito!"',
        'Para crianças com mais habilidade: propor que combinem duas formas ou que criem uma cena completa sobre o tema.',
      ],
    },
    {
      title: 'Encerramento e exposição das criações',
      fraction: 2,
      teacher: () =>
        `Convide as crianças a parar a modelagem e reunir as criações em uma mesa de exposição. Reúna todos em roda. Passe por cada criação: "O que você fez? Conte para os amigos!". Valorize a diversidade de produções: "Cada um criou do seu jeito e todas são especiais". Conduza a limpeza das mãos e o guardamento dos materiais. Encerre agradecendo a participação.`,
      children: () =>
        `As crianças levam suas criações para a mesa de exposição. Na roda, cada uma é convidada a falar sobre o que criou. Observam as produções dos colegas e comentam. Ajudam a guardar os materiais e limpam as mãos.`,
      interventions: () => [
        '"João, conte para a turma o que você modelou. Como você fez?"',
        '"Quem usou o cortador? E quem modelou só com as mãos? Ficou diferente?"',
        '"O que vocês sentiram ao mexer com a massinha? Foi legal?"',
        'Reforçar: "Não tem certo ou errado — todas as criações são importantes porque cada uma foi feita com o jeito de cada um."',
      ],
    },
  ],

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes: string[] = [];

    notes.push(
      'Utilizar exclusivamente massas de modelar atóxicas e certificadas para uso infantil, ou massa caseira com ingredientes seguros.',
    );

    if (isUnder3(classLevel)) {
      notes.push(
        'Crianças menores de 3 anos frequentemente levam as mãos e materiais à boca: a supervisão deve ser direta e contínua para evitar ingestão.',
      );
    } else {
      notes.push(
        'Oriente as crianças a não levar a massa à boca, nariz ou ouvidos.',
      );
    }

    notes.push(
      'Verificar que os cortadores e rolos não tenham bordas cortantes nem lascas.',
    );

    if (isUnder2(classLevel)) {
      return {
        notes,
        alternative:
          'Para bebês que ainda levam tudo à boca, usar exclusivamente massa caseira comestível (farinha, água e óleo, sem sal, com corante alimentar). Esta alternativa é segura em caso de ingestão incidental e oferece a mesma experiência sensorial e de modelagem.',
      };
    }

    return { notes, alternative: null };
  },

  buildAdaptations: (_classLevel, _ageRange) => [
    'Para crianças com hipersensibilidade tátil: oferecer luvas finas, permitir o uso de utensílios (rolo, cortadores) como alternativa ao toque direto, ou iniciar com texturas mais firmes antes de passar para massas mais macias.',
    'Para crianças com menor força nas mãos: oferecer massa mais macia (menos farinha ou mais água) e cortadores que exijam menos pressão.',
    'Para crianças com mobilidade reduzida: fixar a massa em uma superfície não deslizante (toalha úmida sob o tapete) e ajustar a altura da mesa.',
    'Para crianças com mais habilidade de modelagem: propor que criem cenas completas sobre o tema, combinando múltiplas formas e detalhes.',
    'Para crianças com deficiência visual: oferecer materiais com texturas distintas e descrever verbalmente as formas e técnicas, permitindo a modelagem pelo tato.',
  ],
};
