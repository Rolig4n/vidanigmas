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
    <a className="jogar-button" style={{width: "40px"}} onClick={toggle}>{playing ? pause : play}</a>
    </>
  );
};

export default Player;