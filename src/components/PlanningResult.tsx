import type {
  PlanningInput,
  PlanningResult as PlanningResultType,
} from '../types';

interface PlanningResultProps {
  input: PlanningInput;
  result: PlanningResultType;
}

function PlanningResult({ input, result }: PlanningResultProps) {
  const totalMinutes = result.steps.reduce(
    (acc, step) => acc + step.durationMin,
    0,
  );

  return (
    <div className="planning-result">
      <div className="planning-result__header">
        <p className="planning-result__meta">
          {input.classLevel} &middot; {input.theme} &middot; {input.duration}
        </p>

        <h2 className="planning-result__title">
          Planejamento gerado
        </h2>
      </div>

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">
          A experiência proposta
        </h3>

        <p>{result.experienceDescription}</p>
      </section>

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">
          Intencionalidade pedagógica
        </h3>

        <p>{result.pedagogicalIntent}</p>
      </section>

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">
          Objetivos de aprendizagem
        </h3>

        <ul className="planning-result__list">
          {result.objectives.map((objective, index) => (
            <li key={index} className="planning-result__list-item">
              {objective}
            </li>
          ))}
        </ul>
      </section>

      {result.bnccFields.length > 0 && (
        <section className="planning-result__section">
          <h3 className="planning-result__section-title">
            Campos de experiência (BNCC)
          </h3>

          <div className="planning-result__tags">
            {result.bnccFields.map((field, index) => (
              <span key={index} className="planning-result__tag">
                {field}
              </span>
            ))}
          </div>

          <p>{result.bnccRationale}</p>
        </section>
      )}

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">
          Materiais necessários
        </h3>

        <ul className="planning-result__list planning-result__list--materials">
          {result.materials.map((material, index) => (
            <li key={index} className="planning-result__list-item">
              {material}
            </li>
          ))}
        </ul>
      </section>

      <section className="planning-result__section">
        <div className="planning-result__section-header">
          <h3 className="planning-result__section-title">
            Etapas de desenvolvimento
          </h3>

          <span className="planning-result__time-total">
            Total: {totalMinutes} min
          </span>
        </div>

        <ol className="planning-result__steps">
          {result.steps.map((step, index) => (
            <li key={index} className="planning-result__step">
              <span className="planning-result__step-number">
                {index + 1}
              </span>

              <div className="planning-result__step-content">
                <div className="planning-result__step-header">
                  <h4 className="planning-result__step-title">
                    {step.title}
                  </h4>

                  <span className="planning-result__step-time">
                    {step.durationMin} min
                  </span>
                </div>

                <div className="planning-result__step-detail">
                  <p className="planning-result__step-label">
                    O que a professora faz:
                  </p>

                  <p className="planning-result__step-text">
                    {step.teacherAction}
                  </p>
                </div>

                <div className="planning-result__step-detail">
                  <p className="planning-result__step-label">
                    Participação das crianças:
                  </p>

                  <p className="planning-result__step-text">
                    {step.childrenAction}
                  </p>
                </div>

                <div className="planning-result__step-detail">
                  <p className="planning-result__step-label">
                    Intervenções pedagógicas:
                  </p>

                  <ul className="planning-result__interventions">
                    {step.interventions.map((intervention, i) => (
                      <li
                        key={i}
                        className="planning-result__intervention-item"
                      >
                        {intervention}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">
          Cuidados de segurança
        </h3>

        <ul className="planning-result__list planning-result__list--safety">
          {result.safetyNotes.map((note, index) => (
            <li key={index} className="planning-result__list-item">
              {note}
            </li>
          ))}
        </ul>

        {result.safetyAlternative && (
          <div className="planning-result__safety-alt">
            <p className="planning-result__safety-alt-title">
              Alternativa segura:
            </p>

            <p className="planning-result__safety-alt-text">
              {result.safetyAlternative}
            </p>
          </div>
        )}
      </section>

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">
          Adaptações e inclusão
        </h3>

        <ul className="planning-result__list planning-result__list--adapt">
          {result.adaptations.map((adaptation, index) => (
            <li key={index} className="planning-result__list-item">
              {adaptation}
            </li>
          ))}
        </ul>
      </section>

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">
          O que observar durante a experiência
        </h3>

        <ul className="planning-result__list">
          {result.observationIndicators.map((indicator, index) => (
            <li key={index} className="planning-result__list-item">
              {indicator}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default PlanningResult;
