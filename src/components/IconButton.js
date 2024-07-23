import React from "react";
import styled from "styled-components";

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
  p {
    width: 100%;
    height: 100%;
  }
`;

export const IconButton = ({ icon, valor="", className="", ...rest }) => (
  <Button className={className}{...rest}>
    {icon}
  </Button>
);
