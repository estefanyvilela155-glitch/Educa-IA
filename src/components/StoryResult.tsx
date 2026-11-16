
import type { StoryResult as StoryResultType } from '../types';

interface StoryResultProps {
  result: StoryResultType;
}

function StoryResult({ result }: StoryResultProps) {
  return (
    <div className="story-result">
      <header className="story-result__header">
        <p className="story-result__eyebrow">História educativa</p>
        <h2>{result.title}</h2>
        <p>{result.introduction}</p>
      </header>

      <section className="story-result__section">
        <h3>A história</h3>
        <div className="story-result__text">
          {result.story.split('\n').filter(Boolean).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="story-result__section">
        <h3>Conversando sobre a história</h3>
        <ul>
          {result.conversationQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </section>

      <section className="story-result__section">
        <h3>Vamos continuar aprendendo?</h3>
        <p>{result.followUpActivity}</p>
      </section>

      <section className="story-result__intent">
        <h3>Intencionalidade pedagógica</h3>
        <p>{result.pedagogicalIntent}</p>
      </section>
    </div>
  );
}

export default StoryResult;
