import React from 'react'

const Pergunta = ({ pergunta, mostrarResultado }) => {
  const { pergunta: textoPergunta, resposta_correta } = pergunta;

  return (
    <div>
      <h2>{textoPergunta}</h2>
      <h2>{mostrarResultado ? resposta_correta : ''}</h2>
    </div>
  );
};

export default Pergunta;
