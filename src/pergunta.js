import React from 'react'
import styles from './styles.module.css'

const Pergunta = ({ pergunta, mostrarResultado }) => {
  const { pergunta: textoPergunta, resposta_correta, programa } = pergunta;

  return (
    <div>
      <h2>{textoPergunta}</h2>
      <h1>{mostrarResultado ? resposta_correta : ""}</h1>
      <p className={styles.programa}>ep.{programa}</p>
    </div>
  );
};

export default Pergunta;
