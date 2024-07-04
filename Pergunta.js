import React from 'react';

const Pergunta = ({ pergunta, handleResposta }) => {
  const { pergunta: textoPergunta, resposta_correta, respostas_incorretas } = pergunta;
  const opcoesResposta = [resposta_correta, ...respostas_incorretas].sort(() => Math.random() - 0.5);

  return (
    <div>
      <h3>{textoPergunta}</h3>
      {opcoesResposta.map((opcao, index) => (
        <button key={index} onClick={() => handleResposta(opcao)}>
          {opcao}
        </button>
      ))}
    </div>
  );
};

export default Pergunta;
