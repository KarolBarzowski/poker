import React from "react";
import styled from "styled-components";
import logo from "assets/logo.png";
import { SlideInDown } from "helpers/animations";

const Img = styled.img`
  width: 400px;
  height: auto;
  user-select: none;
  pointer-events: none;
  animation: ${SlideInDown} 0.4s ease-in-out 0.2s backwards;
`;

const Logo = () => <Img src={logo} alt="Poker Logo" />;

export default Logo;
