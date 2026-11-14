import type { ActivityPattern, SafetyResult } from '../patternTypes';
import { isUnder3, isUnder2 } from '../pedagogicalHelpers';

export const painting: ActivityPattern = {
  id: 'painting',
  keywords: ['pintura', 'pintar', 'tinta', 'aquarela', 'guache', 'cor', 'cores', 'pincel', 'arte', 'desenho', 'desenhar'],
  description: 'Pintura e expressão artística',
  bnccFields: [
    'Traços, sons, cores e formas',
    'Corpo, gestos e movimentos',
    'Escuta, fala, pensamento e imaginação',
  ],

  buildObjectives: (theme, ageRange) => [
    `Explorar a expressão artística por meio da pintura sobre o tema "${theme}", adequada à faixa de ${ageRange}, valorizando a livre criação sem modelos pré-definidos.`,
    `Desenvolver a coordenação motora fina e o controle voluntário de movimentos ao manusear pincéis de diferentes tamanhos e espessuras.`,
    `Estimular a percepção visual e a diferenciação de cores, promovendo a experimentação de misturas cromáticas e a identificação de tonalidades.`,
    `Promover a criatividade, a imaginação e a expressão pessoal por meio da produção artística individual.`,
    `Favorecer a apreciação estética e o respeito pelas produções dos colegas, desenvolvendo a escuta e a observação atenta.`,
  ],

  buildMaterials: (theme, classLevel) => {
    const base = [
      `Tinta guache atóxica (certificada para uso infantil) nas cores relacionadas ao tema "${theme}"`,
      'Pincéis de cerdas macias em pelo menos 2 tamanhos (fino e grosso)',
      `Papel sulfite ou papel kraft (tamanho suficiente para a faixa etária) para a atividade sobre "${theme}"`,
      'Aventais ou camisetas velhas para proteger as roupas',
      'Potinhos com água para enxaguar os pincéis',
      'Plástico ou toalha de mesa para forrar toda a superfície',
      'Pano úmido para limpeza imediata de respingos',
      'Cartazes, imagens ou objetos relacionados ao tema para inspiração visual',
    ];

    if (isUnder2(classLevel)) {
      base[1] = 'Pincéis de cabo grosso e cerdas macias (fácil de segurar para bebês)';
      base[2] = 'Papel kraft em folhas grandes (pelo menos A3) fixado na mesa com fita';
    }

    return base;
  },

  stepSpecs: [
    {
      title: 'Acolhida e apresentação do tema',
      fraction: 3,
      teacher: (theme, ageRange) =>
        `Receba as crianças em roda e apresente o tema "${theme}" por meio de imagens, objetos ou cartazes. Conduza uma conversa inicial: "O que vocês veem nestas imagens? Quais cores aparecem?". Apresente as tintas em potes abertos, nomeando cada cor. Mostre os pincéis e explique que vão pintar sobre o que observaram. Para a faixa de ${ageRange}, use frases curtas e demonstrações visuais claras.`,
      children: () =>
        `As crianças observam as imagens e objetos, comentam o que veem e apontam cores que reconhecem. Quando as tintas são apresentadas, algumas podem querer apontar ou tocar os potes. Participam da roda atentas e curiosas.`,
      interventions: (theme) => [
        `"Olhem esta imagem sobre ${theme}. O que vocês veem? Que cores tem?"`,
        '"Quem já viu essa cor em algum lugar? Onde?"',
        '"O que vocês acham que vamos fazer com estas tintas e pincéis?"',
        'Para crianças que não verbalizam: apontar cores e nomeá-las, incentivando que apontem de volta.',
      ],
    },
    {
      title: 'Exploração das cores e dos materiais',
      fraction: 3,
      teacher: (_theme, ageRange) =>
        `Conduza as crianças à mesa forrada. Permita que observem as tintas de perto e, se adequado à faixa de ${ageRange}, que toquem levemente com o dedo para sentir a textura e a temperatura. Mostre como mergulhar o pincel na tinta e como passar no papel. Demonstre traços largos e finos, e incentive que observem a diferença. Apresente a possibilidade de misturar duas cores para descobrir uma nova.`,
      children: () =>
        `As crianças tocam as tintas (se permitido), observam as cores de perto e experimentam segurar o pincel. Algumas já começam a fazer traços no papel de forma exploratória. A exploração é livre, com a professora próxima nomeando cores e demonstrando possibilidades.`,
      interventions: () => [
        '"O que acontece quando misturamos o vermelho com o amarelo? Vamos descobrir juntos?"',
        '"O pincel grosso faz um traço diferente do pincel fino. Qual a diferença?"',
        '"Sintam a tinta no dedo — é quente ou fria? É lisinha ou grossinha?"',
        'Para crianças que hesitam: segurar a mão e fazer os primeiros traços juntos, depois soltar gradualmente.',
      ],
    },
    {
      title: 'Demonstração do uso dos pincéis',
      fraction: 2,
      teacher: () =>
        `Reúna a atenção do grupo. Demonstre passo a passo: (1) segurar o pincel pelo cabo; (2) mergulhar a ponta na tinta sem encharcar; (3) deixar o excesso escorrer no bordo do pote; (4) passar no papel com movimentos suaves. Mostre como limpar o pincel na água antes de trocar de cor. Enfatize o cuidado com a roupa (aventais) e com a mesa forrada.`,
      children: () =>
        `As crianças observam a demonstração. Algumas imitam o gesto de segurar o pincel e o movimento de pintar no ar. Permanecem atentas aos passos mostrados pela professora.`,
      interventions: () => [
        '"Por que precisamos limpar o pincel na água antes de trocar de cor?"',
        '"O que acontece se a gente mergulhar o pincel todo na tinta?"',
        '"Vamos contar os passos juntos: pega, mergulha, escorre, pinta!"',
        'Convidar uma criança para repetir os passos na demonstração, consolidando o aprendizado.',
      ],
    },
    {
      title: 'Criação individual ou em pequenos grupos',
      fraction: 7,
      teacher: (theme, ageRange) =>
        `Distribua o papel e os pincéis para cada criança ou para grupos de 2 ou 3. Cada criança pinta livremente sobre o tema "${theme}", sem modelo a copiar. A professora circula entre as mesas, aproximando-se de cada criança, valorizando cada produção e fazendo perguntas abertas sobre o que estão criando. Para a faixa de ${ageRange}, o foco é o processo de explorar a tinta e os movimentos, não o resultado final. Ofereça ajuda técnica (limpar o pincel, trocar a cor) sem interferir na criação.`,
      children: () =>
        `As crianças pintam livremente sobre o tema. Algumas fazem traços largos e cobrem grandes áreas, outras fazem pontos e linhas detalhadas. Misturam cores, trocam de pincel, pedem mais tinta. A produção é individual e autônoma, com a professora próxima apoiando.`,
      interventions: () => [
        '"Me conta sobre o que você está pintando. O que é esta parte aqui?"',
        '"Você quer misturar estas duas cores? O que acha que vai acontecer?"',
        '"Estou vendo que você usou muita cor vermelha. Por que escolheu essa cor?"',
        'Para crianças que dizem "não sei pintar": "Não precisa saber! Pintar é brincar com as cores. Que tal começar com a cor que você mais gosta?"',
        'Para crianças que terminam rápido: oferecer outro papel ou propor que experimentem uma cor que ainda não usaram.',
      ],
    },
    {
      title: 'Exposição e roda de apreciação',
      fraction: 3,
      teacher: () =>
        `Organize os trabalhos em uma "exposição" sobre uma mesa ou varal na sala. Reúna as crianças em roda e conduza a apreciação: passe por cada trabalho, pergunte à autora sobre o que pintou e convide os colegas a observarem. Valorize a diversidade de produções: "Cada um pintou do seu jeito e todos são especiais". Encerre agradecendo a participação e combinando onde os trabalhos ficarão expostos.`,
      children: () =>
        `As crianças acompanham a exposição de seus trabalhos. Cada uma é convidada a falar sobre o que pintou. Observam as produções dos colegas, comentam cores e formas que reconhecem. A roda é de apreciação e respeito mútuo.`,
      interventions: () => [
        '"Maria, conte para seus amigos o que você pintou. O que estas cores significam para você?"',
        '"Quem mais usou a cor azul? Vocês notaram como cada um usou de um jeito diferente?"',
        '"O que vocês sentiram ao ver o trabalho do colega? O que mais chamou a atenção?"',
        'Reforçar que não existe "certo" ou "errado" na arte: "Todas as pinturas são bonitas porque cada uma foi feita com o jeito de cada um."',
      ],
    },
  ],

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes: string[] = [];

    notes.push(
      'Utilizar exclusivamente tintas atóxicas certificadas para uso infantil (verificar rótulo e certificação do produto).',
    );

    if (isUnder3(classLevel)) {
      notes.push(
        'Crianças menores de 3 anos frequentemente levam as mãos à boca: a supervisão deve ser direta e contínua para evitar ingestão de tinta.',
      );
      notes.push(
        'Considere tintas comestíveis (feitas com corante alimentar e água) como alternativa mais segura para crianças que ainda levam tudo à boca.',
      );
    } else {
      notes.push(
        'Oriente as crianças a não levar os pincéis ou as mãos tintadas à boca.',
      );
    }

    notes.push(
      'Proteger as roupas com aventais e forrar toda a superfície de trabalho com plástico ou toalha.',
    );
    notes.push(
      'Manter os potes de tinta fechados quando não estiverem em uso ativo para evitar derramamentos e contato inadvertido.',
    );

    if (isUnder2(classLevel)) {
      return {
        notes,
        alternative:
          'Para bebês que ainda levam tudo à boca, substituir a tinta guache por tintas caseiras comestíveis (iogurte com corante alimentar ou água com corante e amido de milho). Estas alternativas são seguras em caso de ingestão incidental e oferecem a mesma experiência sensorial e de exploração cromática.',
      };
    }

    return { notes, alternative: null };
  },

  buildAdaptations: (classLevel, _ageRange) => {
    const adaptations = [
      'Para crianças com coordenação motora menos desenvolvida: oferecer pincéis de cabo grosso e mais leves, ou permitir a pintura com os dedos e esponjas como alternativa ao pincel.',
      'Para crianças com deficiência visual: usar tintas com texturas distintas (tinta com areia, tinta em relevo) e nomear as cores verbalmente, proporcionando reconhecimento pelo tato.',
      'Para crianças com hipersensibilidade tátil: permitir o uso de luvas finas ou oferecer pincéis com cabo mais longo para maior distância da tinta.',
      'Para crianças que concluem rapidamente: propor a mistura de novas cores, a pintura em formato maior ou a criação de uma segunda obra sobre o tema.',
    ];

    if (isUnder2(classLevel)) {
      adaptations.push(
        'Para bebês que ainda não seguram o pincel: fixar o papel na mesa e oferecer pintura com as mãos ou com esponjas grandes, que são mais fáceis de manipular.',
      );
    }

    return adaptations;
  },
};
