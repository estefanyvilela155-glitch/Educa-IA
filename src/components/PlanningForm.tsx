
import { useState } from 'react';
import type { ClassLevel, PlanningInput } from '../types';

interface PlanningFormProps {
  onGenerate: (input: PlanningInput) => void;
  isLoading: boolean;
}

const CLASS_LEVELS: ClassLevel[] = [
  'Grupo 1',
  'Grupo 2',
  'Grupo 3',
  'Grupo 4',
  'Grupo 5',
];

const DURATION_PRESETS = [
  '30 minutos',
  '45 minutos',
  '60 minutos',
  '90 minutos',
];

const INCLUSION_OPTIONS = [
  'Apoios visuais e demonstrações',
  'Instruções curtas, divididas em etapas',
  'Diferentes formas de comunicação e resposta',
  'Alternativas para participação e movimento',
  'Atenção a estímulos sensoriais',
  'Flexibilidade de tempo e ritmo',
  'Materiais e recursos acessíveis',
];

function PlanningForm({ onGenerate, isLoading }: PlanningFormProps) {
  const [classLevel, setClassLevel] = useState<ClassLevel | ''>('');
  const [theme, setTheme] = useState('');
  const [duration, setDuration] = useState('');
  const [inclusionSupports, setInclusionSupports] = useState<string[]>([]);
  const [error, setError] = useState('');

  const toggleSupport = (option: string) => {
    setInclusionSupports((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!classLevel || !theme.trim() || !duration.trim()) {
      setError('Preencha a turma, o tema e o tempo disponível.');
      return;
    }

    setError('');

    onGenerate({
      classLevel,
      theme: theme.trim(),
      duration: duration.trim(),
      inclusionSupports,
    });
  };

  return (
    <form className="planning-form" onSubmit={handleSubmit}>
      <div className="planning-form__group">
        <label htmlFor="classLevel" className="planning-form__label">
          Turma
        </label>

        <select
          id="classLevel"
          className="planning-form__select"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
          disabled={isLoading}
        >
          <option value="">Selecione a turma</option>
          {CLASS_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="planning-form__group">
        <label htmlFor="theme" className="planning-form__label">
          Tema da aula
        </label>

        <input
          id="theme"
          type="text"
          className="planning-form__input"
          placeholder="Ex.: As cores, os animais, a amizade..."
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="planning-form__group">
        <label htmlFor="duration" className="planning-form__label">
          Tempo disponível
        </label>

        <input
          id="duration"
          type="text"
          className="planning-form__input"
          placeholder="Ex.: 45 minutos"
          list="duration-presets"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          disabled={isLoading}
        />

        <datalist id="duration-presets">
          {DURATION_PRESETS.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </div>

      <div className="planning-form__inclusion">
        <h3>Inclusão e acessibilidade</h3>
        <p>
          Quais possibilidades de participação você gostaria que
          a IA considerasse nesta proposta?
        </p>

        <div className="inclusion-options">
          {INCLUSION_OPTIONS.map((option) => (
            <label key={option} className="inclusion-option">
              <input
                type="checkbox"
                checked={inclusionSupports.includes(option)}
                onChange={() => toggleSupport(option)}
                disabled={isLoading}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <small>
          Opcional. Não informe nomes, diagnósticos ou dados pessoais
          de crianças. As sugestões são possibilidades para a professora
          avaliar e adaptar.
        </small>
      </div>

      {error && (
        <p className="planning-form__error" role="alert">{error}</p>
      )}

      <button
        type="submit"
        className="planning-form__submit"
        disabled={isLoading}
      >
        {isLoading ? 'Gerando planejamento...' : 'Gerar planejamento'}
      </button>
    </form>
  );
}

export default PlanningForm;
