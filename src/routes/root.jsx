import "../index.css";
import styled from "styled-components";
import styles from './jogo_component/styles.module.css'
import Home from './home.tsx';

const Button = styled.button`
  background-color: #df3f3d;
  box-shadow: 0px 5px 20px 5px #1e1e1e82;
  border: none;
  border-radius: 5px;
  height: 50%;
  width: 20%;
  cursor: pointer;
  z-index: 5;
  outline: none;
`;

export default function Root() {
    return (
      <div>
        <div className={styles.container} style={{height: "100px"}}>
          <Button><a href={`/jogo`}>JOGAR</a></Button>
        </div>
        <Home/>
      </div>
    );
  }