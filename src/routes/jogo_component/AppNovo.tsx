import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import Pergunta from './pergunta'
import styles from './styles.module.css'
import data from './vidanigmas.json'

function embaralharPerguntas(data) {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
    // Return the first 100 items from the shuffled array
    return data.slice(0, 100);
}

const to = (i: number, max: number) => ({
    x: 0,
    y: 0,
    scale: 1,
    rot: -10 + Math.random() * 10,
    delay: (i * max) * 0.70,
})

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

export default function App() {
    const [cards, setCard] = useState(embaralharPerguntas(data))

    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out

    const [mostrarResultado, setMostrarResultado] = useState(false)

    const handleResposta = () => {
        setMostrarResultado(false);
    }

    const [props, api] = useSprings(cards.length, i => ({
        ...to(i, cards.length),
        from: from(i),
    }))

    const bind = useDrag(({ args: [index], down, movement: [mx, my], direction: [xDir], velocity }) => {
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        const trigger = velocity[1] > 0.8 || velocity[0] > 0.8// If you flick hard enough it should trigger the card to fly out
        if (!down && trigger) gone.add(index)
        api.start(i => {
            if (i !== index) return
            setMostrarResultado(true)
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = mx / 100 + (isGone ? dir * 10 * velocity[0] : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return {
                x,//: down ? mx : 0, y: down ? my : 0, immediate: down, 
                rot, 
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },} 
        })
        if (!down && gone.size === cards.length)
            setTimeout(() => {
                setCard(embaralharPerguntas(cards))// Quando as cartas são todas jogadas, elas serão reembaralhadas depois de voltar ao monte
                gone.clear()
                api.start(i => to(i))
            }, 600)
    })

    const trans = (r: number, s: number) =>
        `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`      

    return (
        <div className={styles.container}>
            <header className="App">
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className={styles.deck} key={i} style={{ x, y }} onClick={() => handleResposta()}>
                    {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                    <animated.div {...bind(i)} className={cards[i].marijokes ? styles.marijoke : cards[i].expecial ? styles.expecial : cards[i].charajoes ? styles.charajoes : cards[i].cantada ? styles.cantada : ""} style={{touchAction: 'none', transform: interpolate([rot, scale], trans)}}>
                        <Pergunta pergunta={cards[i]} mostrarResultado={mostrarResultado}/>
                    </animated.div>
                </animated.div>
            ))}
            </header>
        </div>
    )
}