import React from 'react'
import styles from './styles/styles.module.css'
import { ReactComponent as Instagram} from "./asset/instagram-brands-solid.svg"

const Home = () => {
  const social = <a href="https://www.instagram.com/rolig4n/" target="_blank" rel="noreferrer"><Instagram /></a>

  return (
    <div>
      <h1>Info</h1>
      <h2>Pesos das cartas</h2>
      <p className={styles.padrao}>Vidanigma da 1 ponto</p>
      <p className={styles.marijoke}>Marijoke da 5 pontos</p>
      <p className={styles.expecial}>Carta expecial da 15 pontos</p>
      <p className={styles.charajoes}>Charajoe da 25 pontos</p>
      <p className={styles.cantada}>Cantada da 1 ponto</p>
      <h4 className={styles.programa}>Me da uma moral e me segue no {social}</h4>
    </div>
  );
};

export default Home;
