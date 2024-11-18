import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/App.css'
import App from './App.tsx'
// import Info from './info.tsx'
import Music from './components/music.js'
import vidanigmas from './asset/vidanigmas.mp3'
import reportWebVitals from './reportWebVitals.js'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Music url={vidanigmas}/>
    <App />
    {/* <Info /> */}
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
