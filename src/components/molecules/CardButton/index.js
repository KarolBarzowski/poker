import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "components/atoms/Heading";
import { Appear } from "helpers/animations";

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.text};
  font-size: 6.4rem;
  opacity: 0;
  transition: opacity 0.15s ease-in-out, transform 0.25s ease-in-out;
`;

const StyledHeading = styled(Heading)`
  text-transform: uppercase;
  transition: transform 0.25s ease-in-out;
`;

const Wrapper = styled.button`
  position: relative;
  height: ${({ secondary }) => (secondary ? "25rem" : "30rem")};
  width: ${({ secondary }) => (secondary ? "25rem" : "30rem")};
  border-radius: 1.5rem;
  border: none;
  background-color: ${({ theme }) => theme.gray5};
  margin: ${({ secondary }) => (!secondary ? "6rem 0rem" : 0)};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  outline: none;
  cursor: pointer;
  transition: background-color 0.05s ease-in-out, box-shadow 0.15s ease-in-out,
    transform 0.15s ease-in-out 0.05s;
  animation: ${Appear} 0.4s ease-in-out backwards;
  animation-delay: ${({ secondary }) => (secondary ? "0.3s" : "0.1s")};

  @media screen and (min-width: 1200px) {
    margin: ${({ secondary }) => (!secondary ? "0 13rem" : 0)};
  }

  :hover,
  :focus {
    background-color: ${({ theme, bgColor }) => theme[bgColor]};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.32);
    transform: scale(1.1);

    ${StyledHeading} {
      transform: ${({ secondary }) =>
        secondary ? "translateY(-2.5rem)" : "translateY(-4rem)"};
    }

    ${StyledIcon} {
      opacity: 1;
      transform: translate(-50%, calc(-50% + 3rem));
    }
  }
`;

const CardButton = ({ secondary, bgColor, text, icon }) => (
  <Wrapper secondary={secondary} bgColor={bgColor}>
    <StyledHeading big={!secondary}>{text}</StyledHeading>
    <StyledIcon icon={icon} />
  </Wrapper>
);

CardButton.propTypes = {
  secondary: PropTypes.bool,
  bgColor: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.object.isRequired,
};

CardButton.defaultProps = {
  secondary: false,
  bgColor: "blue",
  text: "",
};

export default CardButton;
