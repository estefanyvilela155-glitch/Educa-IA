
import { useState } from 'react';
import type {
  ClassLevel,
  StoryCharacterType,
  StoryInput,
} from '../types';

interface StoryFormProps {
  onGenerate: (input: StoryInput) => void;
  isLoading: boolean;
}

const CLASS_LEVELS: ClassLevel[] = [
  'Grupo 1',
  'Grupo 2',
  'Grupo 3',
  'Grupo 4',
  'Grupo 5',
];

const CHARACTER_TYPES: StoryCharacterType[] = [
  'Animais',
  'Personagens humanos fictícios',
  'Fantasia',
  'Natureza',
  'Objetos personificados',
  'Surpresa da IA',
];

function StoryForm({ onGenerate, isLoading }: StoryFormProps) {
  const [classLevel, setClassLevel] = useState<ClassLevel | ''>('');
  const [theme, setTheme] = useState('');
  const [objective, setObjective] = useState('');
  const [characterType, setCharacterType] =
    useState<StoryCharacterType>('Surpresa da IA');
  const [characterDetails, setCharacterDetails] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!classLevel || !theme.trim() || !objective.trim()) {
      setError('Informe a turma, o tema e o objetivo da história.');
      return;
    }

    setError('');

    onGenerate({
      classLevel,
      theme: theme.trim(),
      objective: objective.trim(),
      characterType,
      characterDetails: characterDetails.trim(),
    });
  };

  return (
    <form className="planning-form story-form" onSubmit={handleSubmit}>
      <div className="planning-form__group">
        <label htmlFor="story-level" className="planning-form__label">
          Faixa etária
        </label>

        <select
          id="story-level"
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
        <label htmlFor="story-theme" className="planning-form__label">
          Tema da história
        </label>

        <input
          id="story-theme"
          className="planning-form__input"
          placeholder="Ex.: amizade, natureza, emoções, diversidade..."
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="planning-form__group">
        <label htmlFor="story-objective" className="planning-form__label">
          O que deseja desenvolver?
        </label>

        <input
          id="story-objective"
          className="planning-form__input"
          placeholder="Ex.: estimular a imaginação e a oralidade..."
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="planning-form__group">
        <label htmlFor="character-type" className="planning-form__label">
          Universo dos personagens
        </label>

        <select
          id="character-type"
          className="planning-form__select"
          value={characterType}
          onChange={(e) =>
            setCharacterType(e.target.value as StoryCharacterType)
          }
          disabled={isLoading}
        >
          {CHARACTER_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="planning-form__group">
        <label htmlFor="character-details" className="planning-form__label">
          Alguma ideia de personagem? (opcional)
        </label>

        <input
          id="character-details"
          className="planning-form__input"
          placeholder="Ex.: uma menina curiosa, um livro falante..."
          value={characterDetails}
          onChange={(e) => setCharacterDetails(e.target.value)}
          disabled={isLoading}
        />

        <small>
          Use somente personagens fictícios. Não informe nomes ou
          dados de crianças reais.
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
        {isLoading ? 'Criando história...' : 'Criar história'}
      </button>
    </form>
  );
}

export default StoryForm;
