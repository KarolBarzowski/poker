import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import Heading from "components/atoms/Heading";

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

function NotSupported() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (dimensions.width >= 600) return <Redirect to="/" />;

  return (
    <Wrapper>
      <Heading big>Sorry!</Heading>
      <Heading>Your device size is not supported yet!</Heading>
    </Wrapper>
  );
}

export default NotSupported;
