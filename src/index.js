import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  HashRouter, Route, Routes, Link
} from "react-router-dom";
import "./index.css";
import './App2.css'
import Root from "./routes/root";
import Jogo from "./routes/jogo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <nav>
        <Link className="jogar-button" to="/jogo">JOGAR</Link>
        <Link className="jogar-button" to="/">HOME</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/jogo" element={<Jogo />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
