import React from 'react';

const FimDeJogo = ({ onReiniciar }) => {
  return (
    <div>
      <h1>Jogo Encerrado!</h1>
      <p>Você respondeu todas as perguntas.</p>
      <div className='opcoes'>
        <button className='opcao' onClick={onReiniciar}>Jogar Novamente</button>
      </div>
    </div>
  )
};

export default FimDeJogo;