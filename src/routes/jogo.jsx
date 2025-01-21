import '../App.css';
import styled from "styled-components";
import App from './jogo_component/AppNovo.tsx';
import styles from './jogo_component/styles.module.css'
import Musica from './musica.js'
import vidanigmas from '../asset/vidanigmas.mp3'

const Button = styled.button`
  margin-top: 1%;
  background-color: #df3f3d;
  box-shadow: 0px 5px 20px 5px #1e1e1e82;
  border: none;
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
  z-index: 5;
  outline: none;
`;

export default function Jogo() {
    return (
        <div>
            <div className={styles.container}>
                <Musica url={vidanigmas}/>
                <Button><a href={`/`}>VOLTAR</a></Button>
            </div>
            <App/>
        </div>
    );
}