import styled from "styled-components";

const Heading = styled.h1`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  font-size: ${({ big }) => (big ? "5.5rem" : "3.4rem")};
`;

export default Heading;
