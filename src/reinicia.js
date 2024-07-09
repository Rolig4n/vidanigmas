import React from 'react';

const FimDeJogo = ({ onReiniciar }) => {
  return (
    <div onClick={onReiniciar}>
      <h2>Você respondeu todas as perguntas!</h2>
    </div>
  )
};

export default FimDeJogo;