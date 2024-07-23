import React, { PureComponent } from "react";
import styled from "styled-components";
import { IconButton } from "./IconButton";

const ANIMATION_LENGTH = 0.33;
const RADIUS = 360;

const ButtonsContainer = styled.div`
  width: 160px;
  height: 160px;
  margin: 8px auto auto 8px;
  border-radius: 50%;
  position: relative;
  transition: transform ${ANIMATION_LENGTH}s ease-in-out;
  filter: url("#goo");

  .default {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    transition: all ${ANIMATION_LENGTH}s ease-in-out;
    line-height: 50px;
    text-align: center;
  }

  ${({ open }) =>
    open &&
    `
    transform: rotate(135deg);

    .default {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
  `}
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 160px;
  height: 40px;
  top: calc(50% - 20px);
  z-index: -1;
  transform: rotate(${({ count, pos }) => (RADIUS / count) * pos}deg);

  button {
    position: absolute;
    left: calc(50% - 20px);
    transition: left ${ANIMATION_LENGTH}s ease-in-out;
    /* p {
      transform: scale(0);
    } */
  }

  @keyframes beat {
    0% {
      transform: scale(0.7);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  ${({ open, count, pos }) =>
    open &&
    `
    button {
      left: 0;
      z-index: 5;
      transition-delay: ${pos * 0.05}s;
      transform: rotate(-${135 + (RADIUS / count) * pos}deg);
      p{
        animation-name: beat;
        animation-duration: ${ANIMATION_LENGTH}s;
        animation-delay: ${ANIMATION_LENGTH + pos * 0.05}s;
        animation-timming-function: ease-in-out;
        animation-fill-mode: forwards;
      }
    }
  `}
`;

// TODO: refactor with hooks, improve perf, decouple styles

export class ExplodingButtons extends PureComponent {
  static Button = IconButton;

  state = {
    open: true
  };

  toggleOpen = bool => () => {
    this.setState({ open: bool });
  };

  exclaim = content => () => alert(`${content}`);

  render() {
    const { children, icon = "💡" } = this.props;
    const count = React.Children.count(children);
    const { open } = this.state;
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
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
        <ButtonsContainer
          open={open}
          count={count}
          className="outside"
          onMouseLeave={this.toggleOpen(false)}
        >
          <IconButton
            onMouseEnter={this.toggleOpen(true)}
            onClick={this.toggleOpen(!open)}
            className="default"
            icon={icon}
          />
          {React.Children.map(children, (child, i) => (
            <ButtonContainer
              onClick={this.exclaim(child.props.valor)}
              open={open}
              key={i}
              count={count}
              pos={i}
            >
              {child}
            </ButtonContainer>
          ))}
        </ButtonsContainer>
      </>
    );
  }
}
