import { useState } from 'react';
import type { ClassLevel, PlanningInput } from '../types';

interface PlanningFormProps {
  onGenerate: (input: PlanningInput) => void;
  isLoading: boolean;
}

const CLASS_LEVELS: ClassLevel[] = [
  'Berçário',
  'Grupo 1',
  'Grupo 2',
  'Grupo 3',
  'Grupo 4',
  'Grupo 5',
];

const DURATION_PRESETS = ['30 minutos', '45 minutos', '60 minutos', '90 minutos'];

function PlanningForm({ onGenerate, isLoading }: PlanningFormProps) {
  const [classLevel, setClassLevel] = useState<ClassLevel | ''>('');
  const [theme, setTheme] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classLevel || !theme.trim() || !duration.trim()) {
      setError('Por favor, preencha todos os campos antes de gerar o planejamento.');
      return;
    }
    setError('');
    onGenerate({ classLevel, theme: theme.trim(), duration: duration.trim() });
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
            <option key={level} value={level}>
              {level}
            </option>
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
          placeholder="Ex.: As cores do outono, Os animais da fazenda..."
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
          {DURATION_PRESETS.map((d) => (
            <option key={d} value={d} />
          ))}
        </datalist>
      </div>

      {error && <p className="planning-form__error" role="alert">{error}</p>}

      <button type="submit" className="planning-form__submit" disabled={isLoading}>
        {isLoading ? 'Gerando planejamento...' : 'Gerar planejamento'}
      </button>
    </form>
  );
}

export default PlanningForm;
