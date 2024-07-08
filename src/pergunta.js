import React from 'react';

const Pergunta = ({ pergunta, handleResposta }) => {
  const { pergunta: textoPergunta, resposta_correta, respostas_incorretas } = pergunta;
  const opcoesResposta = [resposta_correta, ...respostas_incorretas].sort(() => Math.random() - 0.5);

  return (
    <div >
      <h3>{textoPergunta}</h3>
      <div className='opcoes'>
        {opcoesResposta.map((opcao, index) => (
          <p><button className='opcao' key={index} onClick={() => handleResposta(opcao)}>
            {opcao}
          </button></p>
        ))}
      </div>
    </div>
  );
};

export default Pergunta;
