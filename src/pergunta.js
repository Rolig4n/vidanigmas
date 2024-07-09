import React from 'react';

const Pergunta = ({ pergunta, handleResposta }) => {
  const { pergunta: textoPergunta, resposta_correta } = pergunta;

  return (
    <div onClick={() => handleResposta(resposta_correta)}>
      <h2>{textoPergunta}</h2>
    </div>
  );
};

export default Pergunta;
