# Relatório de revisão e testes — Educa.IA

## Alterações realizadas

- Corrigida a distribuição dos minutos pelo método dos maiores restos, reservando ao menos um minuto por etapa e garantindo a soma exata do tempo informado.
- A geração agora interrompe o processo se a soma das etapas não corresponder à duração solicitada, em vez de apenas registrar um aviso no console.
- A duração informada é validada; valores ausentes ou inválidos não são silenciosamente substituídos por 40 minutos.
- A identificação do tipo de atividade passou a priorizar palavras-chave mais específicas e normalizar acentos, reduzindo classificações equivocadas quando o tema mistura assuntos.
- Corrigidos nomes de campos de experiência da BNCC que estavam escritos incorretamente.
- Ajustados os materiais do padrão genérico para não presumir que toda proposta exige manipulação de materiais ou recursos que podem não ter relação com o tema.

## Validações executadas

- Verificação estrita de tipos TypeScript na camada de geração de planejamentos e em todos os padrões: aprovada.
- Testes de execução com sete propostas: transferência de grãos, pintura, música, contação de histórias, exploração da natureza, exploração sensorial com água e roda de conversa sobre amizade: aprovados.
- Soma dos tempos conferida em cada proposta (30, 45, 60 e 90 minutos conforme o teste): exata.
- Verificada a presença de objetivos, materiais, etapas, cuidados de segurança e adaptações nos resultados.
- Verificada a alternativa de segurança para transferência de grãos no Grupo 2 (2 a 3 anos): presente.

## Limitação da validação

A compilação completa do aplicativo ainda não foi confirmada neste ambiente: as dependências do projeto não estavam instaladas e a tentativa de instalação não terminou. A camada de lógica pedagógica foi verificada separadamente com TypeScript e testes de execução. É necessário executar `npm install` e `npm run build` no ambiente do projeto antes de considerar a publicação validada.
