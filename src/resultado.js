import React from 'react';

const Resultado = ({ respostaCorreta, proximaPergunta }) => {
  return (
    <div onClick={proximaPergunta}>
      <h2>{respostaCorreta}</h2>
    </div>
  );
};

export default Resultado;
