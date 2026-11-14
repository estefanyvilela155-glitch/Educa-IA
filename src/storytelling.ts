import type { ActivityPattern, SafetyResult } from '../patternTypes';
import { isUnder2 } from '../pedagogicalHelpers';

export const storytelling: ActivityPattern = {
  id: 'storytelling',
  keywords: ['história', 'historia', 'conto', 'contar', 'narrativa', 'livro', 'leitura', 'contação', 'contacao', 'fábula', 'fabula', 'lenda'],
  description: 'Contação de histórias e narrativas',
  bnccFields: [
    'Escuta, fala, pensamento e imaginação',
    'O eu, o outro e o nós',
    'Corpo, gestos e movimentos',
  ],

  buildObjectives: (theme, ageRange) => [
    `Despertar o interesse pela escuta atenta e pela fruição da história sobre "${theme}", adequada à faixa de ${ageRange}, promovendo o encantamento pela leitura.`,
    `Ampliar o vocabulário e a compreensão oral por meio da escuta da narrativa, das conversas sobre a história e da repetição de palavras e expressões novas.`,
    `Estimular a imaginação, a criatividade e a capacidade de recontar a história por meio da dramatização e da recriação com fantoches ou imagens.`,
    `Promover o reconhecimento e a expressão de emoções presentes na narrativa, ajudando as crianças a identificar sentimentos nos personagens e em si mesmas.`,
    `Favorecer a participação em uma experiência coletiva de escuta e diálogo, desenvolvendo o respeito pela vez de falar e de ouvir o colega.`,
  ],

  buildMaterials: (theme, classLevel) => {
    const base = [
      `Livro ilustrado ou material impresso da história sobre "${theme}" (com imagens grandes e claras)`,
      'Fantoches ou dedoches relacionados aos personagens da história (se disponível)',
      'Almofadas ou tapete macio para a roda de leitura',
      'Cartões com imagens de cenas ou personagens da história',
      'Caixa de som para sons ambientes ou músicas relacionadas (opcional)',
    ];

    if (isUnder2(classLevel)) {
      base[0] = `Livro de tecido ou cartonado (com texturas e abas) sobre "${theme}" — adequado para manipulação por bebês`;
    }

    return base;
  },

  stepSpecs: [
    {
      title: 'Acolhida e ambientação para a leitura',
      fraction: 2,
      teacher: (theme, ageRange) =>
        `Organize as crianças em roda sobre almofadas ou tapete, em um ambiente tranquilo. Apresente o livro ou material e mostre a capa: "Olhem o que trouxe hoje! Esta é uma história sobre ${theme}. O que vocês acham que vai acontecer nela?". Deixe que toquem a capa e observem as imagens. Para a faixa de ${ageRange}, crie um clima de expectativa com entonação suave e pausas.`,
      children: () =>
        `As crianças sentam-se em roda sobre as almofadas. Observam a capa do livro, apontam detalhes que reconhecem e comentam o que acham que vai acontecer. Algumas podem tocar o livro e tentar virar as páginas.`,
      interventions: (theme) => [
        `"Olhem a capa! O que vocês veem? O que tem na imagem?"`,
        `"Quem adivinha o que vai acontecer nesta história sobre ${theme}?"`,
        '"Vocês já ouviram uma história antes? Como foi?"',
        'Para crianças que não respondem: apontar elementos da capa e nomeá-los, incentivando que apontem de volta.',
      ],
    },
    {
      title: 'Contação da história',
      fraction: 6,
      teacher: (_theme, ageRange) =>
        `Conte a história com entonação expressiva, modulando a voz para cada personagem. Use pausas dramáticas em momentos importantes e gestos que acompanhem a narrativa. Mostre as imagens do livro a cada virada de página, passando por todas as crianças. Se usar fantoches, manipule-os para representar os personagens. Faça pausas estratégicas para perguntar: "O que vocês acham que vai acontecer agora?". Para a faixa de ${ageRange}, use narração curta e ritmada, repetindo palavras-chave da história.`,
      children: () =>
        `As crianças escutam a história atentamente. Olham as imagens, apontam personagens reconhecidos, reagem às cenas com expressões de surpresa, alegria ou preocupação. Algumas repetem palavras ou sons da narrativa. Permanecem engajadas pela entonação e pelos recursos visuais.`,
      interventions: () => [
        '"O que vocês acham que o personagem vai fazer agora?"',
        '"Como o personagem está se sentindo? Feliz ou triste?"',
        '"Já aconteceu algo parecido com vocês?"',
        'Para manter a atenção de crianças inquietas: envolvê-las segurando um fantoche ou apontando a imagem.',
        'Para crianças que se assustam com cenas: acolher verbalmente ("Ficou com medo? Mas olha, o personagem está bem!") e seguir com tom reconfortante.',
      ],
    },
    {
      title: 'Conversa sobre a história',
      fraction: 4,
      teacher: (theme) =>
        `Conduza uma roda de conversa após a história. Pergunte sobre os personagens: "Quem era o protagonista? E os outros personagens?". Pergunte sobre os sentimentos: "Como o personagem se sentiu quando aconteceu aquilo? E vocês, como se sentiriam?". Conecte a história ao cotidiano: "Na nossa casa, já aconteceu algo parecido?". Para ${theme}, explore as principais ideias da narrativa com perguntas abertas.`,
      children: () =>
        `As crianças compartilham o que entenderam da história. Falam sobre os personagens que mais gostaram, as cenas que mais marcaram e como se sentiram. Algumas recontam partes da história com suas palavras, outras dramatizam com gestos.`,
      interventions: () => [
        '"Quem era o personagem principal da história? O que ele fez?"',
        '"Qual parte vocês mais gostaram? Por quê?"',
        '"E se a história fosse diferente, o que vocês mudariam?"',
        '"Como o personagem se sentiu quando...? E vocês, já se sentiram assim?"',
        'Para crianças que não verbalizam: pedir que apontem o personagem preferido na imagem do livro.',
      ],
    },
    {
      title: 'Recriação ou reconto da história',
      fraction: 5,
      teacher: (_theme, ageRange) =>
        `Proponha que as crianças recriem um momento da história. Ofereça os fantoches, os cartões com imagens ou proponha a dramatização corporal. Diga: "Quem quer contar a história de novo usando os fantoches?". Organize em pequenos grupos e incentive que cada um escolha um personagem. Para a faixa de ${ageRange}, a recriação pode ser mais simples: imitar um gesto ou som do personagem, ou apontar a imagem correspondente.`,
      children: () =>
        `As crianças escolhem fantoches ou cartões e recriam cenas da história. Algumas dramatizam com o corpo, imitando os personagens. Outras usam os fantoches para recontar a história para os colegas. A recriação é livre e criativa, com a professora mediando.`,
      interventions: () => [
        '"Quem quer ser o personagem principal? E quem quer ser os outros?"',
        '"Vamos mostrar para os amigos como o personagem andava na história!"',
        '"O que o personagem disse nesta parte? Vamos repetir juntos!"',
        'Para crianças tímidas: sugerir que segurem um fantoche e façam apenas um gesto ou som, sem necessidade de falar.',
        'Para crianças com mais verbalização: propor que narrem a história inteira para o grupo usando os cartões como sequência.',
      ],
    },
    {
      title: 'Encerramento e conexão com o tema',
      fraction: 2,
      teacher: (theme) =>
        `Reúna novamente em roda. Pergunte: "O que cada um levou dessa história? O que aprendemos com ela?". Faça a conexão final com o tema "${theme}". Guarde os materiais junto com as crianças. Encerre com uma música ou gesto de despedida relacionado à história.`,
      children: () =>
        `As crianças compartilham o que mais gostaram na história. Ajudam a guardar os fantoches e cartões. Participam do gesto de despedida (música ou combinado da turma).`,
      interventions: () => [
        '"O que vocês vão contar para a família sobre a história de hoje?"',
        '"O que aprendemos com esta história? Algo para levar para a vida?"',
        '"Quem quer pegar este livrinho para olhar de novo quando quiser?"',
        'Registrar a preferência: "O João gostou mais do lobo, a Ana gostou mais da floresta!"',
      ],
    },
  ],

  buildSafety: (_classLevel, _ageRange): SafetyResult => {
    const notes: string[] = [];
    notes.push(
      'Garantir que o espaço da roda seja livre de obstáculos para que as crianças se sentem e se levantem com segurança.',
    );
    notes.push(
      'Verificar que os fantoches e cartões não tenham partes pequenas soltas que possam se desprender.',
    );
    notes.push(
      'Selecionar histórias adequadas à faixa etária, evitando conteúdos que possam assustar ou causar ansiedade excessiva.',
    );
    notes.push(
      'Observar reações emocionais durante a história e acolher crianças que se sensibilizarem.',
    );
    return { notes, alternative: null };
  },

  buildAdaptations: (_classLevel, _ageRange) => [
    'Para crianças com menos vocabulário: usar mais recursos visuais (cartões, fantoches) e aceitar a recriação por gestos e sons, sem exigir fala.',
    'Para crianças com deficiência auditiva: usar expressões faciais e gestos expressivos, e posicionar a criança de frente para a professora e para os fantoches.',
    'Para crianças com deficiência visual: descrever verbalmente as imagens do livro e oferecer fantoches com texturas distintas para exploração tátil.',
    'Para crianças que se distraem facilmente: manter a contação curta e ritmada, intercalando com momentos de participação ativa (segurar fantoche, repetir um som).',
    'Para crianças com mais desenvolvimento verbal: propor que recontem a história inteira para o grupo, ou que inventem um novo final diferente do livro.',
  ],
};
