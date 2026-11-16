import { useState } from 'react';
import Header from './components/Header';
import PlanningForm from './components/PlanningForm';
import PlanningResult from './components/PlanningResult';
import StoryForm from './components/StoryForm';
import StoryResult from './components/StoryResult';
import { generatePlanning } from './services/planningService';
import { generateStory } from './services/storyService';
import type {
  PlanningInput,
  PlanningResult as PlanningResultType,
  StoryInput,
  StoryResult as StoryResultType,
} from './types';
import './App.css';

type ActiveFeature = 'planning' | 'story';

function App() {
  const [activeFeature, setActiveFeature] =
    useState<ActiveFeature>('planning');

  const [planningResult, setPlanningResult] =
    useState<PlanningResultType | null>(null);

  const [lastPlanningInput, setLastPlanningInput] =
    useState<PlanningInput | null>(null);

  const [storyResult, setStoryResult] =
    useState<StoryResultType | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePlanning = async (input: PlanningInput) => {
    setIsLoading(true);
    setError('');
    setPlanningResult(null);

    try {
      const generated = await generatePlanning({ input });
      setLastPlanningInput(input);
      setPlanningResult(generated);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível gerar o planejamento.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStory = async (input: StoryInput) => {
    setIsLoading(true);
    setError('');
    setStoryResult(null);

    try {
      const generated = await generateStory({ input });
      setStoryResult(generated);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível criar a história.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPlanningResult(null);
    setLastPlanningInput(null);
    setStoryResult(null);
    setError('');
  };

  const changeFeature = (feature: ActiveFeature) => {
    handleReset();
    setActiveFeature(feature);
  };

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <div className="app__hero">
          <h2 className="app__hero-title">
            Educação com criatividade, intenção e inclusão
          </h2>

          <p className="app__hero-text">
            O Educa.IA apoia educadores na criação de experiências
            pedagógicas e histórias educativas, respeitando diferentes
            formas de aprender, participar e descobrir o mundo.
          </p>
        </div>

        <nav className="feature-tabs" aria-label="Funcionalidades">
          <button
            type="button"
            className={activeFeature === 'planning' ? 'feature-tabs__button active' : 'feature-tabs__button'}
            onClick={() => changeFeature('planning')}
          >
            Planejamento pedagógico
          </button>

          <button
            type="button"
            className={activeFeature === 'story' ? 'feature-tabs__button active' : 'feature-tabs__button'}
            onClick={() => changeFeature('story')}
          >
            Criar história educativa
          </button>
        </nav>

        <div className="app__card">
          {activeFeature === 'planning' ? (
            <>
              <div className="feature-heading">
                <h2>Planejamento pedagógico</h2>
                <p>
                  Organize experiências contextualizadas e considere
                  diferentes possibilidades de participação.
                </p>
              </div>

              <PlanningForm
                onGenerate={handleGeneratePlanning}
                isLoading={isLoading}
              />
            </>
          ) : (
            <>
              <div className="feature-heading">
                <h2>Histórias educativas</h2>
                <p>
                  Crie narrativas originais para estimular imaginação,
                  linguagem, criatividade e aprendizagem.
                </p>
              </div>

              <StoryForm
                onGenerate={handleGenerateStory}
                isLoading={isLoading}
              />
            </>
          )}
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
              {activeFeature === 'planning'
                ? 'Construindo seu planejamento...'
                : 'Criando sua história...'}
            </p>
          </div>
        )}

        {planningResult && lastPlanningInput && !isLoading && (
          <div className="app__card app__card--result">
            <PlanningResult
              input={lastPlanningInput}
              result={planningResult}
            />

            <button className="app__reset" onClick={handleReset}>
              Criar novo planejamento
            </button>
          </div>
        )}

        {storyResult && !isLoading && (
          <div className="app__card app__card--result">
            <StoryResult result={storyResult} />

            <button className="app__reset" onClick={handleReset}>
              Criar outra história
            </button>
          </div>
        )}
      </main>

      <footer className="app__footer">
        <p>
          Educa.IA · Tecnologia como apoio à educação ·{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
