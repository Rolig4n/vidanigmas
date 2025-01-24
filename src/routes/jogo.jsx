import '../App.css';
import App from './jogo_component/AppNovo.tsx';
import styles from './jogo_component/styles.module.css'
import Musica from './musica.js'
import vidanigmas from '../asset/vidanigmas.mp3'

export default function Jogo() {
    return (
        <div>
            <div className={styles.container}>
                <Musica url={vidanigmas}/>
            </div>
            <App/>
        </div>
    );
}