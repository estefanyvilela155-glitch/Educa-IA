import type { ActivityPattern, SafetyResult } from '../patternTypes';
import { isUnder3, isUnder2 } from '../pedagogicalHelpers';

export const nature: ActivityPattern = {
  id: 'nature',
  keywords: ['natureza', 'planta', 'plantas', 'folhas', 'folha', 'árvore', 'arvore', 'flor', 'flores', 'jardim', 'semente', 'sementes', 'horta', 'terra', 'água', 'agua', 'animal', 'animais', 'borboleta', 'passarinho', 'outono', 'primavera'],
  description: 'Exploração da natureza e do meio ambiente',
  bnccFields: [
    'Espaços, tempos, quantidades, relações e transformações',
    'Escuta, fala, pensamento e imaginação',
    'Corpo, gestos e movimentos',
  ],

  buildObjectives: (theme, ageRange) => [
    `Promover a observação e a exploração sensorial dos elementos da natureza relacionados a "${theme}", adequada à faixa de ${ageRange}, estimulando a curiosidade e o olhar detalhado.`,
    `Estimular a formulação de perguntas e hipóteses sobre o mundo natural, desenvolvendo o pensamento investigativo e a capacidade de observação sistemática.`,
    `Desenvolver o respeito e o cuidado com os seres vivos e o meio ambiente, promovendo atitudes de preservação e de valorização da natureza.`,
    `Ampliar o vocabulário por meio da nomeação de elementos naturais (folhas, flores, sementes, galhos) e da descrição de suas características (cor, textura, forma, tamanho).`,
    `Favorecer a classificação e a organização dos elementos por diferentes critérios (cor, tamanho, tipo, textura), desenvolvendo o pensamento lógico e a comparação.`,
  ],

  buildMaterials: (theme, classLevel) => {
    const base = [
      `Elementos da natureza relacionados ao tema "${theme}" (folhas, flores, sementes, galhos finos) — coletados previamente e inspecionados`,
      'Lupas ou lentes de aumento (uma por criança ou para grupos)',
      'Bandejas rasas para organizar e separar os elementos por tipo',
      'Cestos ou caixas para coleta e armazenamento',
      'Papel e lápis de cor para registros de observação (opcional, para grupos 3+)',
    ];

    if (isUnder2(classLevel)) {
      base[0] = `Elementos da natureza grandes e seguros relacionados a "${theme}" (folhas grandes, galhos grossos sem pontas) — inspecionados e higienizados`;
      base[1] = 'Lupas grandes e de plástico resistente (para observação supervisionada)';
    }

    return base;
  },

  stepSpecs: [
    {
      title: 'Acolhida e apresentação dos elementos naturais',
      fraction: 3,
      teacher: (theme, ageRange) =>
        `Receba as crianças em roda e apresente o tema "${theme}". Mostre os elementos da natureza coletados previamente, um tipo por vez: "Olhem esta folha! O que vocês veem?". Passe cada elemento pela roda para que observem e toquem. Nomeie cada elemento e suas características principais (cor, textura, tamanho). Para a faixa de ${ageRange}, priorize a exploração tátil e visual com elementos grandes e seguros.`,
      children: () =>
        `As crianças observam os elementos apresentados na roda. Quando recebem cada elemento, tocam, cheiram, viram de diferentes lados. Algumas apontam cores ou formas que reconhecem, outras comentam o que sentem ao tocar.`,
      interventions: (theme) => [
        `"Olhem esta folha de ${theme}. Que cor ela tem? E esta, é diferente?"`,
        '"Quando você toca, como ela é? Lisa, áspera, macia?"',
        '"Onde será que esta folha estava antes de chegar aqui?"',
        'Para crianças que não tocam: encostar o elemento na mão e nomear a sensação, incentivando o toque gradual.',
      ],
    },
    {
      title: 'Observação guiada com lupas',
      fraction: 4,
      teacher: (_theme, ageRange) =>
        `Distribua os elementos nas bandejas (um tipo por bandeja). Entregue as lupas e ensine como usar: "Coloque a lupa perto do olho e olhe o elemento bem de pertinho!". Guie a observação com perguntas: "O que vocês veem que não dava para ver sem a lupa?". Aponte detalhes como nervuras das folhas, textura das sementes, cores das pétalas. Para a faixa de ${ageRange}, ajude cada criança a posicionar a lupa e nomeie o que ela vê.`,
      children: () =>
        `As crianças usam as lupas para observar os elementos de perto. Descobrem detalhes invisíveis a olho nu: pequenas veias nas folhas, texturas nas sementes, cores nas pétalas. Compartilham descobertas com os colegas ao lado. A observação é atenta e prolongada.`,
      interventions: () => [
        '"O que você está vendo com a lupa que não dava para ver antes?"',
        '"As folhas têm linhas! Vocês veem? Como são essas linhas?"',
        '"Esta semente é lisa ou tem textura? Descrevam para mim."',
        'Para crianças que não focam a lupa: ajudar a posicionar e apontar o detalhe a observar.',
        'Estimular comparações: "A folha da Maria tem o mesmo desenho que a sua?"',
      ],
    },
    {
      title: 'Exploração livre e classificação',
      fraction: 5,
      teacher: (theme) =>
        `Permita que as crianças manipulem os elementos livremente sobre as bandejas. Proponha desafios de organização: "Quem consegue separar as folhas das flores? E as sementes dos galhos?". Outra proposta: "Vamos organizar por cor? E por tamanho?". Circule entre os grupos, nomeando elementos e fazendo perguntas que promovam a classificação. Conecte com o tema "${theme}": "Onde encontramos estes elementos na natureza?".`,
      children: () =>
        `As crianças manipulam os elementos livremente: tocam, cheiram, agrupam, separam. Algumas organizam por cor, outras por tipo, outras por tamanho. A exploração é ativa e cada criança descobre seus próprios critérios de organização. Compartilham descobertas e comparam resultados.`,
      interventions: () => [
        '"Como você separou estes elementos? Por que este ficou aqui e aquele ali?"',
        '"Quantas folhas verdes você encontrou? E amarelas? Tem mais de qual cor?"',
        '"Qual é o maior elemento da sua bandeja? E o menor?"',
        'Para crianças que não classificam sozinhas: sugerir um critério inicial ("Vamos separar as folhas das flores?") e ajudar a iniciar.',
        'Para crianças que classificam com facilidade: propor dois critérios ao mesmo tempo ("Pode separar por cor e depois por tamanho dentro de cada cor?").',
      ],
    },
    {
      title: 'Registro de observação (opcional)',
      fraction: 5,
      teacher: (_theme, ageRange) =>
        `Proponha que cada criança escolha um elemento que mais gostou e faça um desenho de observação, tentando reproduzir cor e forma. Ou organize um "museu da natureza" na sala, onde cada grupo expõe seus elementos classificados com cartões de nome. Para a faixa de ${ageRange}, o registro pode ser o desenho livre do elemento escolhido, sem exigência de detalhamento realista.`,
      children: () =>
        `As crianças escolhem um elemento e fazem um desenho de observação, tentando reproduzir as cores e formas que viram. Outras organizam o "museu da natureza" com os elementos classificados e cartões de identificação. A atividade de registro é individual ou em pequenos grupos.`,
      interventions: () => [
        '"Qual elemento você escolheu desenhar? Por que escolheu este?"',
        '"Tente desenhar as cores que você viu. Tem mais de uma cor?"',
        '"No nosso museu, onde vamos colocar as folhas? E as sementes?"',
        'Para crianças que dizem "não sei desenhar": "Não precisa ser igual! Desenhe do seu jeito o que você viu e sentiu."',
        'Para crianças com mais habilidade: propor que observem e desenhem um detalhe visto com a lupa.',
      ],
    },
    {
      title: 'Encerramento e reflexão sobre a natureza',
      fraction: 2,
      teacher: (_theme) =>
        `Reúna as crianças em roda. Pergunte: "O que descobriram sobre os elementos da natureza? O que mais chamou a atenção?". Conduza uma conversa sobre o cuidado com a natureza: "De onde vieram estes elementos? O que podemos fazer para cuidar das plantas e dos animais?". Combine onde guardar os elementos ou se irão devolvê-los à natureza. Encerre agradecendo a exploração.`,
      children: () =>
        `As crianças compartilham o que descobriram. Algumas falam sobre texturas, cores ou detalhes observados com a lupa. Participam da conversa sobre o cuidado com a natureza. Ajudam a guardar ou devolver os elementos.`,
      interventions: () => [
        '"O que vocês descobriram hoje sobre ${theme} que não sabiam antes?"',
        '"Por que é importante cuidar das plantas e dos animais?"',
        '"O que podemos fazer para ajudar a natureza no nosso dia a dia?"',
        'Registrar descobertas: "A Ana descobriu que as folhas têm linhas chamadas nervuras!"',
      ],
    },
  ],

  buildSafety: (classLevel, _ageRange): SafetyResult => {
    const notes: string[] = [];

    notes.push(
      'Inspecionar previamente todos os elementos naturais quanto a insetos, espinhos, fungos, plantas tóxicas ou substâncias irritantes antes de disponibilizá-los às crianças.',
    );
    notes.push(
      'Identificar previamente as plantas coletadas para garantir que não sejam tóxicas ou venenosas. Em caso de dúvida, não utilizar.',
    );
    notes.push(
      'Lavar as mãos das crianças após a manipulação dos elementos naturais.',
    );

    if (isUnder3(classLevel)) {
      notes.push(
        'Crianças menores de 3 anos podem levar elementos pequenos à boca: selecionar apenas elementos grandes (folhas grandes, galhos grossos) e supervisionar constantemente.',
      );
      notes.push(
        'Evitar sementes pequenas, flores com pétalas soltas e galhos finos que possam quebrar e perfurar.',
      );
    }

    if (isUnder2(classLevel)) {
      return {
        notes,
        alternative:
          'Para bebês, selecionar apenas elementos grandes e seguros (folhas grandes de plantas não tóxicas, galhos grossos sem pontas). Evitar completamente sementes, flores pequenas e elementos que possam se desprender em partes pequenas. Higienizar todos os elementos antes do uso.',
      };
    }

    return { notes, alternative: null };
  },

  buildAdaptations: (_classLevel, _ageRange) => [
    'Para crianças com sensibilidade tátil (hipersensibilidade): permitir que usem luvas finas ou que observem com a lupa sem precisar tocar diretamente.',
    'Para crianças com mobilidade reduzida: posicionar as bandejas e lupas ao alcance, ajustando a altura da mesa ou oferecendo os elementos na mão.',
    'Para crianças com deficiência visual: priorizar a exploração olfativa e tátil, descrevendo verbalmente cores e formas. Oferecer elementos com texturas e aromas distintos.',
    'Para crianças que se distraem com facilidade: propor um foco em um único tipo de elemento por vez, reduzindo a quantidade de materiais na bandeja.',
    'Para crianças com mais capacidade de observação: propor que façam um "diário da natureza" com desenhos e ditados à professora sobre o que observaram.',
  ],
};
