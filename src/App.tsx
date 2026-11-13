import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  GraduationCap,
  Clock,
  Lightbulb,
  ClipboardList,
  Heart,
} from "lucide-react";

type Plano = {
  objetivos: string[];
  materiais: string[];
  etapas: { titulo: string; descricao: string }[];
};

function App() {
  const [turma, setTurma] = useState("Grupo 2");
  const [tema, setTema] = useState("");
  const [tempo, setTempo] = useState("30 a 40 minutos");
  const [plano, setPlano] = useState<Plano | null>(null);
  const [carregando, setCarregando] = useState(false);

  function gerarPlano() {
    if (!tema.trim()) {
      alert("Digite o tema da aula antes de continuar.");
      return;
    }

    setCarregando(true);
    setPlano(null);

    setTimeout(() => {
      const bebe = /berçário|bercario|grupo 1/i.test(turma);

      setPlano({
        objetivos: [
          `Explorar o tema "${tema}" por meio de experiências e brincadeiras.`,
          "Estimular a curiosidade, a participação e a interação entre as crianças.",
          "Ampliar as experiências de aprendizagem respeitando o desenvolvimento infantil.",
        ],
        materiais: bebe
          ? [
              "Objetos seguros de diferentes texturas",
              "Tapete ou colchonete",
              "Garrafas sensoriais bem vedadas",
              "Músicas infantis",
            ]
          : [
              "Papel kraft",
              "Tinta guache atóxica",
              "Pincéis grossos",
              "Objetos relacionados ao tema",
            ],
        etapas: [
          {
            titulo: "1. Acolhimento",
            descricao: `Receba as crianças em roda e apresente o tema ${tema} de maneira lúdica e acolhedora.`,
          },
          {
            titulo: "2. Exploração",
            descricao: bebe
              ? "Disponibilize os materiais para exploração sensorial, sempre com supervisão."
              : "Apresente os materiais e incentive as crianças a observar, experimentar e compartilhar descobertas.",
          },
          {
            titulo: "3. Atividade principal",
            descricao: `Proponha uma experiência coletiva relacionada a ${tema}, respeitando o ritmo e a participação de cada criança.`,
          },
          {
            titulo: "4. Encerramento",
            descricao: "Retome as descobertas, valorize a participação das crianças e organize os materiais com a turma.",
          },
        ],
      });

      setCarregando(false);
    }, 900);
  }

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon"><BookOpen size={24} /></span>
          <span>Educa<span className="brand-highlight">.IA</span></span>
        </a>
        <span className="top-label">Planejamento pedagógico</span>
      </header>

      <section className="hero">
        <div className="hero-icon"><Sparkles size={19} /></div>
        <p className="eyebrow">TECNOLOGIA A FAVOR DA EDUCAÇÃO</p>
        <h1>Seu planejamento,<br /><span>mais simples e criativo.</span></h1>
        <p className="hero-description">
          Transforme suas ideias em propostas pedagógicas para a Educação Infantil.
        </p>
      </section>

      <section className="workspace">
        <div className="form-card">
          <div className="section-heading">
            <div className="heading-icon"><GraduationCap size={21} /></div>
            <div>
              <h2>Vamos planejar?</h2>
              <p>Conte um pouco sobre sua aula.</p>
            </div>
          </div>

          <label htmlFor="turma">Turma</label>
          <select id="turma" value={turma} onChange={(e) => setTurma(e.target.value)}>
            <option>Berçário</option>
            <option>Grupo 1</option>
            <option>Grupo 2</option>
            <option>Grupo 3</option>
            <option>Grupo 4</option>
            <option>Grupo 5</option>
          </select>

          <label htmlFor="tema">Tema da aula</label>
          <input
            id="tema"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Ex.: Cores, natureza, animais..."
          />

          <label htmlFor="tempo">Tempo disponível</label>
          <div className="input-with-icon">
            <Clock size={18} />
            <select id="tempo" value={tempo} onChange={(e) => setTempo(e.target.value)}>
              <option>15 a 20 minutos</option>
              <option>30 a 40 minutos</option>
              <option>45 a 60 minutos</option>
              <option>Mais de 1 hora</option>
            </select>
          </div>

          <button className="generate-button" onClick={gerarPlano} disabled={carregando}>
            <Sparkles size={19} />
            {carregando ? "Preparando planejamento..." : "Gerar planejamento"}
          </button>
          <p className="form-note">Uma sugestão inicial para inspirar sua prática pedagógica.</p>
        </div>

        <aside className="tip-card">
          <Lightbulb size={23} />
          <h3>Educar é criar possibilidades.</h3>
          <p>Cada criança aprende de um jeito. Adapte as propostas à realidade e às necessidades da sua turma.</p>
          <div className="tip-decoration"><Heart size={17} /> Feito com carinho pela educação.</div>
        </aside>
      </section>

      {plano && (
        <section className="result-card">
          <div className="result-heading">
            <div className="heading-icon"><ClipboardList size={22} /></div>
            <div>
              <p className="eyebrow">SUGESTÃO DE PLANEJAMENTO</p>
              <h2>{tema}</h2>
              <p>{turma} · {tempo}</p>
            </div>
          </div>

          <h3>Objetivos de aprendizagem</h3>
          <ul>{plano.objetivos.map((item, i) => <li key={i}>{item}</li>)}</ul>

          <h3>Materiais necessários</h3>
          <ul>{plano.materiais.map((item, i) => <li key={i}>{item}</li>)}</ul>

          <h3>Desenvolvimento da atividade</h3>
          {plano.etapas.map((etapa, i) => (
            <div className="step" key={i}>
              <strong>{etapa.titulo}</strong>
              <p>{etapa.descricao}</p>
            </div>
          ))}

          <p className="disclaimer">
            Esta é uma sugestão inicial gerada por regras do protótipo, não por uma IA conectada.
            Revise e adapte o planejamento antes de utilizá-lo.
          </p>
        </section>
      )}

      <footer>
        <span>Educa.IA</span> · Um apoio à prática pedagógica na Educação Infantil.
      </footer>
    </main>
  );
}

export default App;
