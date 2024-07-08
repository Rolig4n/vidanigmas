import React from 'react';

const Resultado = ({ respostaCorreta, proximaPergunta }) => {
  return (
    <div>
      <h2>{respostaCorreta ? 'Resposta correta!' : 'Resposta incorreta!'}</h2>
      <button onClick={proximaPergunta}>Próxima pergunta</button>
    </div>
  );
};

export default Resultado;
