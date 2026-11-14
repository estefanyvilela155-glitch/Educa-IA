import type { PlanningInput, PlanningResult as PlanningResultType } from '../types';

interface PlanningResultProps {
  input: PlanningInput;
  result: PlanningResultType;
}

function PlanningResult({ input, result }: PlanningResultProps) {
  const totalMinutes = result.steps.reduce((acc, s) => acc + s.durationMin, 0);

  return (
    <div className="planning-result">
      <div className="planning-result__header">
        <p className="planning-result__meta">
          {input.classLevel} &middot; {input.theme} &middot; {input.duration}
        </p>
        <h2 className="planning-result__title">Planejamento gerado</h2>
      </div>

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">Objetivos de aprendizagem</h3>
        <ul className="planning-result__list">
          {result.objectives.map((obj, i) => (
            <li key={i} className="planning-result__list-item">{obj}</li>
          ))}
        </ul>
      </section>

      {result.bnccFields.length > 0 && (
        <section className="planning-result__section">
          <h3 className="planning-result__section-title">Campos de experiência (BNCC)</h3>
          <div className="planning-result__tags">
            {result.bnccFields.map((field, i) => (
              <span key={i} className="planning-result__tag">{field}</span>
            ))}
          </div>
        </section>
      )}

      <section className="planning-result__section">
        <h3 className="planning-result__section-title">Materiais necessários</h3>
        <ul className="planning-result__list planning-result__list--materials">
          {result.materials.map((mat, i) => (
            <li key={i} className="planning-result__list-item">{mat}</li>
          ))}
        </ul>
      </section>

      <section className="planning-result__section">
        <div className="planning-result__section-header">
          <h3 className="planning-result__section-title">Etapas de desenvolvimento</h3>
          <span className="planning-result__time-total">
            Total: {totalMinutes} min
          </span>
        </div>
        <ol className="planning-result__steps">
          {result.steps.map((step, i) => (
            <li key={i} className="planning-result__step">
              <span className="planning-result__step-number">{i + 1}</span>
              <div className="planning-result__step-content">
                <div className="planning-result__step-header">
                  <h4 className="planning-result__step-title">{step.title}</h4>
                  <span className="planning-result__step-time">{step.durationMin} min</span>
                </div>
                <div className="planning-result__step-detail">
                  <p className="planning-result__step-label">O que a professora faz:</p>
                  <p className="planning-result__step-text">{step.teacherAction}</p>
                </div>
                <div className="planning-result__step-detail">
                  <p className="planning-result__step-label">O que as crianças fazem:</p>
                  <p className="planning-result__step-text">{step.childrenAction}</p>
                </div>
                <div className="planning-result__step-detail">
                  <p className="planning-result__step-label">Intervenções pedagógicas:</p>
                  <ul className="planning-result__interventions">
                    {step.interventions.map((inter, j) => (
                      <li key={j} className="planning-result__intervention-item">{inter}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {result.safetyNotes.length > 0 && (
        <section className="planning-result__section planning-result__safety">
          <h3 className="planning-result__section-title planning-result__section-title--safety">
            Cuidados de segurança
          </h3>
          <ul className="planning-result__list planning-result__list--safety">
            {result.safetyNotes.map((note, i) => (
              <li key={i} className="planning-result__list-item planning-result__safety-item">
                {note}
              </li>
            ))}
          </ul>
          {result.safetyAlternative && (
            <div className="planning-result__safety-alt">
              <p className="planning-result__safety-alt-title">Alternativa segura recomendada:</p>
              <p className="planning-result__safety-alt-text">{result.safetyAlternative}</p>
            </div>
          )}
        </section>
      )}

      {result.adaptations.length > 0 && (
        <section className="planning-result__section planning-result__adaptations">
          <h3 className="planning-result__section-title planning-result__section-title--adapt">
            Adaptações e inclusão
          </h3>
          <ul className="planning-result__list planning-result__list--adapt">
            {result.adaptations.map((adapt, i) => (
              <li key={i} className="planning-result__list-item planning-result__adapt-item">
                {adapt}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default PlanningResult;
