import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SlideIn = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.gray6};
  animation: ${SlideIn} 0.3s ease-in-out both 0.1s;
`;

function Loading() {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faSpinner} size="4x" spin />
    </Wrapper>
  );
}

export default Loading;
