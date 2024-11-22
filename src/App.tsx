import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import Pergunta from './components/pergunta'
import styles from './styles/styles.module.css'
import data from './vidanigmas.json'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number, max: number) => ({
  x: 0,
  y: (i * (-100 / max)),
  scale: 1,
  rot: -10 + Math.random() * 10,
  delay: i * 50,
})
const num_cartas = 10 // Numero de cartas para jogar
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

// Função para embaralhar as perguntas
function embaralharPerguntas() {
  let dados = data
  for (let i = dados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = dados[i];
    dados[i] = dados[j];
    dados[j] = temp;
  }
  // Return the first num_cartas items from the shuffled array
  return dados.slice(0, num_cartas);
}

function Deck({perguntas}) {
  const [cards, setCard] = useState(perguntas)
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, api] = useSprings(num_cartas, i => ({
    ...to(i, num_cartas),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  const [mostrarResultado, setMostrarResultado] = useState(false)
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      setMostrarResultado(true)
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!down && gone.size === num_cartas)
      setTimeout(() => {
        setCard(embaralharPerguntas())// Quando as cartas são todas jogadas, elas serão reembaralhadas depois de voltar ao monte
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })
  const handleResposta = () => {
    setMostrarResultado(false);
  }
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <header className="App">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }} onClick={() => handleResposta()}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div {...bind(i)} className={cards[i].tipo===2 ? styles.marijoke : cards[i].tipo===3 ? styles.expecial : cards[i].tipo===4 ? styles.charajoes : cards[i].tipo===5 ? styles.cantada : ""} style={{transform: interpolate([rot, scale], trans)}}>
            <Pergunta pergunta={cards[i]} mostrarResultado={mostrarResultado}/>
          </animated.div>
        </animated.div>
      ))}
    </header>
  )
}

export default function App() {
  const perguntas = embaralharPerguntas()
  return (
    <div className={styles.container}>
      <Deck perguntas={perguntas}/>
    </div>
  )
}
