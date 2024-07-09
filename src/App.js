import React, { useState, useEffect } from 'react';
import './App.css';
import Pergunta from './pergunta';
import Resultado from './resultado';
import data from './perguntas.json';
import backgroundImage from './background.jpg';

function App() {
  const [perguntas, setPerguntas] = useState([]);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState(false);
  const [perguntasFeitas, setPerguntasFeitas] = useState([]);

  // Função para embaralhar as perguntas
  const embaralharPerguntas = (perguntas) => {
    for (let i = perguntas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [perguntas[i], perguntas[j]] = [perguntas[j], perguntas[i]];
    }
    return perguntas;
  };

  // Efeito para inicializar o jogo
  useEffect(() => {
    // Embaralha as perguntas quando o componente monta
    setPerguntas(embaralharPerguntas([...data]));
    setPerguntaIndex(0);
    setMostrarResultado(false);
    setRespostaCorreta(false);
    setPerguntasFeitas([]);
  }, [data]); // Executa sempre que `data` muda

  const proximaPergunta = () => {
    // Adiciona a pergunta atual às perguntas feitas
    setPerguntasFeitas([...perguntasFeitas, perguntaIndex]);
    
    // Verifica se ainda há perguntas não feitas
    if (perguntasFeitas.length + 1 < perguntas.length) {
      setPerguntaIndex(perguntaIndex + 1);
    } else {
      // Se todas as perguntas foram feitas, encerra o jogo
      setPerguntaIndex(-1); // Sinaliza o fim do jogo
    }
    setMostrarResultado(false);
  };

  const handleResposta = (respostaSelecionada) => {
    const perguntaAtual = perguntas[perguntaIndex];
    if (respostaSelecionada === perguntaAtual.resposta_correta) {
      setRespostaCorreta(true);
    } else {
      setRespostaCorreta(false);
    }
    setMostrarResultado(true);
  };

  if (perguntaIndex === -1) {
    // Jogo encerrado
    return (
      <div>
        <h1>Jogo Encerrado!</h1>
        <p>Você respondeu todas as perguntas.</p>
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="App-header">
        {mostrarResultado ? (
          <Resultado respostaCorreta={respostaCorreta} proximaPergunta={proximaPergunta} />
        ) : (
          <Pergunta pergunta={data[perguntaIndex]} handleResposta={handleResposta} />
        )}
      </header>
    </div>
  );
}

export default App;