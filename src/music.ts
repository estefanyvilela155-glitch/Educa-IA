import type { ActivityPattern, SafetyResult } from '../patternTypes';
import { isUnder2 } from '../pedagogicalHelpers';

export const music: ActivityPattern = {
  id: 'music',
  keywords: ['música', 'musica', 'canção', 'cancao', 'cantar', 'canto', 'cantando', 'cantou', 'cantarol', 'ritmo', 'som', 'sons', 'instrumento', 'dança', 'dancar', 'dança', 'corpo', 'movimento'],
  description: 'Música e expressão corporal',
  bnccFields: [
    'Traços, sons, cores e formas',
    'Corpo, gestos e movimentos',
    'O eu, o outro e o nós',
  ],

  buildObjectives: (theme, ageRange) => [
    `Explorar a musicalidade e a percepção rítmica por meio de canções e sons relacionados ao tema "${theme}", adequadas à faixa de ${ageRange}.`,
    `Desenvolver a coordenação motora ampla e a expressão corporal por meio de movimentos que acompanham o ritmo e a letra das canções.`,
    `Estimular a percepção auditiva, a diferenciação de sons (alto, baixo, forte, suave) e a identificação de instrumentos musicais pela escuta.`,
    `Promover a socialização e a vivência coletiva por meio da prática musical em grupo, desenvolvendo a escuta do outro e a sincronia.`,
    `Favorecer a memória auditiva e a expressão vocal por meio da repetição e da aprendizagem de canções sobre o tema.`,
  ],

  buildMaterials: (theme, classLevel) => {
    const base = [
      `Repertório de 2 a 3 canções relacionadas ao tema "${theme}" (selecionar previamente)`,
      'Instrumentos de percussão simples: chocalhos, pandeiretas e tambores pequenos (um por criança, se possível)',
      'Caixa de som para reproduzir as canções (se necessário)',
      'Espaço livre e seguro para o movimento corporal',
      'Almofadas para os momentos de roda',
    ];

    if (isUnder2(classLevel)) {
      base[1] = 'Chocalhos grandes e leves de plástico (sem partes pequenas) — um por criança';
    }

    return base;
  },

  stepSpecs: [
    {
      title: 'Acolhida musical',
      fraction: 2,
      teacher: (theme, ageRange) =>
        `Receba as crianças com uma música de boas-vindas tocando suavemente. Sente-as em roda sobre as almofadas. Apresente o tema "${theme}" por meio de uma canção simples: cante uma estrofe relacionada ao tema e convide as crianças a escutar. Para a faixa de ${ageRange}, use melodias curtas e repetitivas, com gestos que acompanhem a letra.`,
      children: () =>
        `As crianças chegam ao som da música, sentam-se em roda e escutam a canção apresentada pela professora. Algumas já balançam o corpo no ritmo, outras observam atentamente. Acolhidas pelo ambiente musical.`,
      interventions: (theme) => [
        `"Vocês estão ouvindo esta música? Como ela é: rápida ou devagar?"`,
        `"Esta música fala sobre ${theme}. O que vocês ouviram na letra?"`,
        '"Quem já conhece esta música? Quer cantar comigo?"',
        'Para crianças que não respondem: modelar o gesto de bater palmas no ritmo e convidar a imitar.',
      ],
    },
    {
      title: 'Exploração dos instrumentos',
      fraction: 4,
      teacher: (_theme, ageRange) =>
        `Apresente os instrumentos de percussão um a um, na roda. Mostre cada instrumento, diga seu nome e demonstre como tocar: "Este é o chocalho — ouça o som que ele faz!". Passe o instrumento pela roda para que cada criança o segure e experimente. Para a faixa de ${ageRange}, apresente um instrumente por vez para não sobrecarregar. Nomeie os sons: "Este som é forte, este é suave".`,
      children: () =>
        `As crianças observam cada instrumento apresentado. Quando recebem o instrumento, agitam, batem e experimentam diferentes formas de produzir som. Algumas imitam os gestos da professora, outras exploram livremente. A roda se torna um momento de descoberta sonora.`,
      interventions: () => [
        '"O que acontece quando você sacode o chocalho forte? E quando sacode devagar?"',
        '"Este som é alto ou baixo? E este, é forte ou suave?"',
        '"Qual instrumento faz o som que você mais gostou?"',
        'Para crianças que não tocam: segurar junto e modelar o gesto de agitar, depois soltar gradualmente.',
        'Observar crianças que colocam instrumentos na boca e intervir imediatamente.',
      ],
    },
    {
      title: 'Canto e movimento conjunto',
      fraction: 5,
      teacher: (theme, ageRange) =>
        `Cante junto com as crianças uma das canções sobre "${theme}". Ensine os gestos que acompanham a letra: se a música fala de um animal, proponha imitar seus movimentos; se fala de elementos da natureza, proponha gestos correspondentes. Repita a canção 2 ou 3 vezes para que memorizem. Para a faixa de ${ageRange}, use gestos amplos e simples, e cante em ritmo mais lento na primeira vez.`,
      children: () =>
        `As crianças cantam junto com a professora (as que já falam) e fazem os gestos que acompanham a letra. Algumas imitam os movimentos com o corpo inteiro, outras acompanham batendo palmas. A repetição permite que se familiarizem com a melodia e a coreografia de gestos.`,
      interventions: () => [
        '"Vamos cantar juntos! Prestem atenção nos gestos que eu faço."',
        '"O personagem da música andava assim — mostrem como!"',
        '"Vamos cantar mais uma vez, agora um pouquinho mais rápido!"',
        'Para crianças com menos coordenação motora: simplificar os gestos ou fazer apenas batidas de palma no ritmo.',
      ],
    },
    {
      title: 'Improvisação rítmica com os instrumentos',
      fraction: 5,
      teacher: (theme) =>
        `Distribua os instrumentos para as crianças. Proponha uma "orquequinha": "Agora cada um vai tocar seu instrumento seguindo o ritmo da música sobre ${theme}". Toque a música e incentive que toquem acompanhando. Intercale momentos de som (todos tocam) e de silêncio (todos param): "Quando eu levantar a mão, todos param! Quando eu baixar, todos tocam!". Este exercício desenvolve controle e atenção.`,
      children: () =>
        `As crianças tocam seus instrumentos acompanhando a música. Quando a professora sinaliza, param e esperam. Quando sinaliza novamente, voltam a tocar. A improvisação é livre dentro do ritmo, com momentos de silêncio e som coletivos.`,
      interventions: () => [
        '"Quando eu levantar a mão, todos param de tocar. Vamos tentar?"',
        '"Toque seu instrumento bem suave agora... e agora bem forte!"',
        '"Quem consegue tocar no mesmo ritmo que a música?"',
        'Para crianças que tocam fora do ritmo: não corrigir, mas modelar o ritmo batendo palma junto e incentivando que acompanhem.',
        'Para crianças que dominam o ritmo: propor que liderem o sinal de parar e tocar, invertendo o papel com a professora.',
      ],
    },
    {
      title: 'Encerramento e reflexão musical',
      fraction: 2,
      teacher: () =>
        `Guarde os instrumentos junto com as crianças, organizando-os em um cesto. Reúna todos em roda. Pergunte: "O que mais gostaram de tocar? Qual instrumento fez o som mais legal? Como o corpo se sentiu quando estávamos cantando e mexendo?". Cantem juntos uma música de despedida, encerrando com calma.`,
      children: () =>
        `As crianças ajudam a guardar os instrumentos no cesto. Na roda, compartilham o que mais gostaram de tocar e ouvir. Algumas imitam os sons dos instrumentos preferidos. Participam da canção de despedida em conjunto.`,
      interventions: () => [
        '"Qual instrumento você gostou mais? Por quê?"',
        '"Como seu corpo se sentiu quando estávamos cantando e mexendo?"',
        '"Em casa, quem tem algum instrumento? Quem gosta de cantar?"',
        'Valorizar descobertas: "O Pedro descobriu que o chocalho faz sons diferentes dependendo de como a gente sacode!"',
      ],
    },
  ],

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes: string[] = [];

    notes.push(
      'Garantir que o espaço de movimento esteja livre de móveis, objetos ou obstáculos que possam causar quedas durante a atividade corporal.',
    );

    if (isUnder2(classLevel)) {
      notes.push(
        'Instrumentos de percussão devem ser de tamanho grande (sem partes pequenas destacáveis) e feitos de material não quebrável, pois bebês podem levá-los à boca.',
      );
      return {
        notes,
        alternative:
          'Para bebês que ainda levam objetos à boca, usar exclusivamente chocalhos de plástico grande e atóxico, sem partes destacáveis. Evitar pandeiretas com placas metálicas e tambores com peças soltas.',
      };
    }

    notes.push(
      'Verificar previamente que os instrumentos não tenham partes soltas, lascas ou bordas cortantes.',
    );
    notes.push(
      'Controlar o volume da caixa de som em nível adequado para proteger a audição das crianças.',
    );

    return { notes, alternative: null };
  },

  buildAdaptations: (_classLevel, _ageRange) => [
    'Para crianças com sensibilidade auditiva (hiperacusia): oferecer fones abafadores ou reduzir o volume, permitindo a participação sem desconforto.',
    'Para crianças com mobilidade reduzida: adaptar os gestos para movimentos dos braços ou da cabeça, garantindo que possam participar ativamente da expressão corporal.',
    'Para crianças com menos coordenação motora: oferecer instrumentos mais leves e fáceis de segurar (chocalhos com cabo grosso), e simplificar os gestos da canção.',
    'Para crianças com mais desenvolvimento rítmico: propor que liderem a "orquequinha", escolhendo os momentos de silêncio e som, ou que inventem novos gestos para a canção.',
    'Para crianças com deficiência visual: descrever verbalmente os movimentos e posicionar instrumentes ao alcance, permitindo exploração tátil antes da atividade.',
  ],
};
