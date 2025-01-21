import "../index.css";
import React, { useState } from 'react'
import {useSprings, animated, to as interpolate} from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import Pergunta from './jogo_component/pergunta'
import styles from './jogo_component/styles.module.css'

const cards = [
  {
    "pergunta": "Qual a posição do futebol favorita dos motoristas?",
    "resposta_correta": "É o volante",
    "programa": 73
  },{
    "pergunta": "Uma senhorinha foi ao médico com problemas de gases, \"Doutor, estou com problema de gases, graças a Deus ele são silenciosos e sem cheiro, desde que cheguei aqui soltei vários e ninguém percebeu\" e olhando pra velha deu um remédio e disse \"Volte daqui 1 semana\", 1 semana depois a idosa volta revoltada \"Doutor, não sei o que o senhor fez, mas agora os gases estão muito fedidos mas ainda silenciosos\" \"Agora que cuidamos da sua sinusite vamos cuidar da sua surdez\"",
    "programa": 106,
    "marijokes": true
  },{
    "pergunta": "🤖Porque o Saci atravessou a estrada?",
    "resposta_correta": "🤖Pra mostrar que não era só do mato que ele saia",
    "programa": 63,
    "expecial": true
  },{
    "pergunta": "Você vende brigadeiro? Não?",
    "resposta_correta": "Então aceito um beijinho",
    "programa": 54,
    "cantada": true
  },{
    "pergunta": "Porque o Mau se irritou e raspou logo o cabelo?",
    "resposta_correta": "Porque ficava sempre Mau cortado",
    "programa": 105,
    "charajoes": true
  }
]

const to = () => ({
  x: 0,
  y: 0,
  scale: 0.9,
  rot: -10 + Math.random() * 10
})

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 })

export default function Root() {
  const [mostrarResultado, setMostrarResultado] = useState(false)

  const handleResposta = () => {
      setMostrarResultado(false);
  }

  const [props, api] = useSprings(cards.length, i => ({
    ...to(),
    from: from(i),
  }))

  const bind = useDrag(({ args: [index], down, movement: [mx, my] }) => {
    api.start(i => {
      if (i !== index) return
      setMostrarResultado(true)
      return { x: down ? mx : 0, y: down ? my : 0, immediate: down }})
  })

  const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

  return (
    <div>
      <div className="pontos">
        {cards.map(({}, i) => (
          <span className={cards[i].marijokes ? styles.marijoke : cards[i].expecial ? styles.expecial : cards[i].charajoes ? styles.charajoes : cards[i].cantada ? styles.cantada : ""}>
            {cards[i].marijokes ? "Marijokes" : cards[i].expecial ? "Expecial" : cards[i].charajoes ? "Charajoes" : cards[i].cantada ? "Cantadas" : "Vidanigamas"}
          </span>
        ))}
      </div>
      <div className="cartas">
        {props.map(({x, y, rot, scale}, i) => (
          <animated.div className={styles.deckTeste} key={i} style={{ x, y }} onClick={() => handleResposta()}>
            <animated.div {...bind(i)} className={cards[i].marijokes ? styles.marijoke : cards[i].expecial ? styles.expecial : cards[i].charajoes ? styles.charajoes : cards[i].cantada ? styles.cantada : ""} style={{touchAction: 'none', transform: interpolate([rot, scale], trans)}}>
              <Pergunta pergunta={cards[i]} mostrarResultado={mostrarResultado}/>
            </animated.div>
          </animated.div>
        ))}
      </div>
      <div className="pontos">
        {cards.map(({}, i) => (
          <span className={cards[i].marijokes ? styles.marijoke : cards[i].expecial ? styles.expecial : cards[i].charajoes ? styles.charajoes : cards[i].cantada ? styles.cantada : ""}>
            {cards[i].marijokes ? "2 pontos" : cards[i].expecial ? "10 pontos" : cards[i].charajoes ? "5 pontos" : cards[i].cantada ? "1 ponto" : "1 ponto"}
          </span>
        ))}
      </div>
    </div>
  );
}
  