import React from 'react';

const Pergunta = ({ pergunta }) => {
  const { pergunta: textoPergunta, resposta_correta } = pergunta;

  return (
    <h2>{textoPergunta}</h2>
  );
};

export default Pergunta;
