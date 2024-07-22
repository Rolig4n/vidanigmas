import React from "react";
import styled from "styled-components";

const Container = styled.div`
  filter: url("#goo");
`;

const Ball = styled.div`
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  left: ${({ left }) => left}px;
  position: absolute;
  filter: url("#goo");
`;

export const Balls = () => {
  return (
    <Container>
      <Ball left={5}>1</Ball>
      <Ball left={16}>2</Ball>
      <Ball left={48}>3</Ball>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="test">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </Container>
  );
};
