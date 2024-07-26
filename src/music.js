import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./index.css";
import { ReactComponent as Play} from "./asset/play-solid.svg";
import { ReactComponent as Pause} from "./asset/pause-solid.svg";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  audio.volume = 0.15
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Button = styled.button`
    display: flex;
    color: black;
    border-radius: 50%;
    border: none;
    font-size: 16px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    z-index: 5;
    outline: none;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    `;

const Player = ({ url }) => {
  const play = <Play/>
  const pause = <Pause/>
  const [playing, toggle] = useAudio(url);
  
  return (
    <div>
      <Button onClick={toggle}>{playing ? pause : play}</Button>
    </div>
  );
};

export default Player;