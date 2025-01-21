import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Play} from "../asset/play-solid.svg";
import { ReactComponent as Pause} from "../asset/pause-solid.svg";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  audio.volume = 0.15
  const [playing, setPlaying] = useState(true);

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
    margin: 1% 1% 0 0;
    background-color: #df3f3d;
    box-shadow: 0px 5px 20px 5px #1e1e1e82;
    border: none;
    border-radius: 5px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    z-index: 5;
    outline: none;
    align-items: center;
    justify-content: center;
    svg {fill: url(#gradiente)};
    svg:hover, svg:focus {fill: url(#gradienteFocus)};
`;

const Player = ({ url }) => {
  const play = <Play/>
  const pause = <Pause/>
  const [playing, toggle] = useAudio(url);
  
  return (
    <>
    <svg style={{width:0, height:0,position:"absolute"}} aria-hidden="true" focusable="false">
        <linearGradient id="gradiente" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#1e1e1e82" />
            <stop offset="100%" stop-color="rgb(223, 63, 61, 0.6)" />
        </linearGradient>
        <linearGradient id="gradienteFocus" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#1e1e1e" />
            <stop offset="100%" stop-color="rgba(252, 63, 61, 0.9)" />
        </linearGradient>
    </svg>
    <Button onClick={toggle}>{playing ? pause : play}</Button>
    </>
  );
};

export default Player;