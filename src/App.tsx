import { useState } from 'react';
import Header from './components/Header';
import PlanningForm from './components/PlanningForm';
import PlanningResult from './components/PlanningResult';
import { generatePlanning } from './services/planningService';
import type {
  PlanningInput,
  PlanningResult as PlanningResultType,
} from './types';
import './App.css';

function App() {
  const [result, setResult] = useState<PlanningResultType | null>(null);
  const [lastInput, setLastInput] = useState<PlanningInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (input: PlanningInput) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const generated = await generatePlanning({ input });

      setLastInput(input);
      setResult(generated);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível gerar o planejamento. Tente novamente.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setLastInput(null);
    setError('');
  };

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <div className="app__hero">
          <h2 className="app__hero-title">
            Crie planejamentos pedagógicos com facilidade
          </h2>

          <p className="app__hero-text">
            Selecione a turma, informe o tema e o tempo disponível.
            O Educa.IA interpreta a proposta e estrutura uma experiência
            pedagógica contextualizada.
          </p>
        </div>

        <div className="app__card">
          <PlanningForm
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div className="app__error" role="alert">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="app__loading" aria-live="polite">
            <div className="app__spinner" />
            <p>
              Analisando o tema e construindo seu planejamento...
            </p>
          </div>
        )}

        {result && lastInput && !isLoading && (
          <div className="app__card app__card--result">
            <PlanningResult
              input={lastInput}
              result={result}
            />

            <button className="app__reset" onClick={handleReset}>
              Criar novo planejamento
            </button>
          </div>
        )}
      </main>

      <footer className="app__footer">
        <p>
          Educa.IA &middot; Protótipo com inteligência artificial
          &middot; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
