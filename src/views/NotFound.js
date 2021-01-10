import React from "react";
import Heading from "components/atoms/Heading";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.gray6};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledLink = styled(Link)`
  font-size: 2.1rem;
  color: ${({ theme }) => theme.blue};
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

function NotFound() {
  return (
    <Wrapper>
      <Heading big>Page not found!</Heading>
      <StyledLink to="/">Back to home</StyledLink>
    </Wrapper>
  );
}

export default NotFound;
