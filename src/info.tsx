import React from "react";
import { ExplodingButtons } from "./components/ExplodingButtons";
import "./styles/index.css";
import styles from './styles/styles.module.css'
import { ReactComponent as Instagram} from "./asset/instagram-brands-solid.svg"
import { ReactComponent as Question} from "./asset/question-solid.svg"
import { ReactComponent as Num1} from "./asset/1-solid.svg"
import { ReactComponent as Num2} from "./asset/2-solid.svg"
import { ReactComponent as Num5} from "./asset/5-solid.svg"

const question = <Question/>
const um = <Num1 />
const cinco = <Num5 />
const quinze = [<Num1 />, <Num5 />]
const vinteCinco = [<Num2 />, <Num5 />]
const social = <a href="https://www.instagram.com/rolig4n/" target="_blank" rel="noreferrer"><Instagram /></a>

function InfoButton() {
  return (
    <div className="footer">
      <ExplodingButtons icon={question}>
        <ExplodingButtons.Button icon={cinco} valor="Essa marijoke da 5 pontos" className={styles.marijoke}/>
        <ExplodingButtons.Button icon={vinteCinco} valor="Essa charajoe da 25 pontos" className={styles.charajoes}/>
        <ExplodingButtons.Button icon={quinze} valor="Essa carta expecial da 15 pontos" className={styles.expecial}/>
        <ExplodingButtons.Button icon={um} valor="Esse vidanigma da 1 pontos" className={styles.padrao}/>
        <ExplodingButtons.Button icon={social} valor="Me da uma moral e me segue no insta"/>
      </ExplodingButtons>
    </div>
  );
}

export default function App() {
  return (
    <InfoButton />
  )
}
