import styled from "styled-components";

const Paragraph = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: 400;
  font-size: 1.6rem;
  font-family: "Poppins", sans-serif;
  margin: 0;
`;

export default Paragraph;
