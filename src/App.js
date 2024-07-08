import React, { useState } from 'react';
import './App.css';
import Pergunta from './pergunta';
import Resultado from './resultado';
import data from './perguntas.json';
import backgroundImage from './background.jpg';

function App() {
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState(false);

  const proximaPergunta = () => {
    setPerguntaIndex(perguntaIndex + 1);
    setMostrarResultado(false);
  };

  const handleResposta = (respostaSelecionada) => {
    const perguntaAtual = data[perguntaIndex];
    if (respostaSelecionada === perguntaAtual.resposta_correta) {
      setRespostaCorreta(true);
    } else {
      setRespostaCorreta(false);
    }
    setMostrarResultado(true);
  };

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