import React, { useState, useEffect } from 'react';
import './App.css';
import Pergunta from './pergunta';
import Resultado from './resultado';
import FimDeJogo from './reinicia';
import data from './perguntas.json';
import backgroundImage from './background.jpg';

function App() {
  const [perguntas, setPerguntas] = useState([]);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState(false);
  const [perguntasFeitas, setPerguntasFeitas] = useState([]);
  const [jogoEncerrado, setJogoEncerrado] = useState(false);

  // Função para embaralhar as perguntas
  const embaralharPerguntas = (perguntas) => {
    for (let i = perguntas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = perguntas[i];
      perguntas[i] = perguntas[j];
      perguntas[j] = temp;
  }
    return perguntas;
  };

  // Efeito para inicializar o jogo
  useEffect(() => {
    reiniciarJogo();
  }, [data]); // Executa sempre que `data` muda

  const reiniciarJogo = () => {
    setPerguntas(embaralharPerguntas([...data]));
    setPerguntaIndex(0);
    setMostrarResultado(false);
    setRespostaCorreta(false);
    setPerguntasFeitas([]);
    setJogoEncerrado(false);
  };

  const proximaPergunta = () => {
    // Adiciona a pergunta atual às perguntas feitas
    setPerguntasFeitas([...perguntasFeitas, perguntaIndex]);
    
    // Verifica se ainda há perguntas não feitas
    if (perguntasFeitas.length + 1 < perguntas.length) {
      setPerguntaIndex(perguntaIndex + 1);
    } else {
      /// Se todas as perguntas foram feitas, encerra o jogo
      setJogoEncerrado(true);
    }
    setMostrarResultado(false);
  };

  const handleResposta = (respostaSelecionada) => {
    const perguntaAtual = perguntas[perguntaIndex];
    setRespostaCorreta(respostaSelecionada);
    setMostrarResultado(true);
  };

  return (
    <body className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="App-header">
        {
        jogoEncerrado ? (<FimDeJogo onReiniciar={reiniciarJogo} />) : mostrarResultado ? (
          <Resultado respostaCorreta={respostaCorreta} proximaPergunta={proximaPergunta} />
        ) : (
          <Pergunta pergunta={perguntas[perguntaIndex]} handleResposta={handleResposta} />
        )
        }
      </header>
    </body>
  );
}

export default App;