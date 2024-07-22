import React from "react";
import { ExplodingButtons } from "./components/ExplodingButtons";
import "./index.css";
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, fa1, fa5, fa2 } from '@fortawesome/free-solid-svg-icons'

const info = <FontAwesomeIcon icon={faInfo} />
const um = <FontAwesomeIcon icon={fa1} />
const cinco = <FontAwesomeIcon icon={fa5} />
const quinze = [<FontAwesomeIcon icon={fa1} />, <FontAwesomeIcon icon={fa5} />]
const vinteCinco = [<FontAwesomeIcon icon={fa2} />, <FontAwesomeIcon icon={fa5} />]

function InfoButton() {
  return (
    <div className="footer">
      <ExplodingButtons icon={info}>
        <ExplodingButtons.Button icon={cinco} className={styles.marijoke}/>
        <ExplodingButtons.Button icon={vinteCinco} className={styles.charajoes}/>
        <ExplodingButtons.Button icon={quinze} className={styles.expecial}/>
        <ExplodingButtons.Button icon={um} className={styles.padrao}/>
      </ExplodingButtons>
    </div>
  );
}

export default function App() {
  return (
    <InfoButton />
  )
}
