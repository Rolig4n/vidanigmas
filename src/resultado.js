import React from 'react';

const Resultado = ({ respostaCorreta, proximaPergunta }) => {
  return (
    <div>
      <h2>{respostaCorreta ? 'Resposta correta!' : 'Resposta incorreta!'}</h2>
      <div className='opcoes'>
        <button className='opcao' onClick={proximaPergunta}>Próxima pergunta</button>
      </div>
    </div>
  );
};

export default Resultado;
