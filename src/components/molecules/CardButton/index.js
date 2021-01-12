import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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

const Wrapper = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ secondary }) => (secondary ? "25rem" : "30rem")};
  width: ${({ secondary }) => (secondary ? "25rem" : "30rem")};
  border-radius: 1.5rem;
  border: none;
  background-color: ${({ theme }) => theme.gray5};
  margin: ${({ secondary, nomargin }) =>
    secondary || nomargin ? 0 : "6rem 0rem"};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.05s ease-in-out, box-shadow 0.15s ease-in-out,
    transform 0.15s ease-in-out 0.05s;
  animation: ${Appear} 0.4s ease-in-out backwards;
  animation-delay: ${({ secondary }) => (secondary ? "0.3s" : "0.1s")};

  @media screen and (min-width: 1200px) {
    margin: ${({ secondary, nomargin }) =>
      secondary || nomargin ? 0 : "0 13rem"};
  }

  :hover,
  :focus {
    background-color: ${({ theme, bgcolor }) => theme[bgcolor]};
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

const CardButton = ({
  secondary,
  bgcolor,
  text,
  icon,
  nomargin,
  placeholder,
}) => (
  <Wrapper
    to={text}
    secondary={secondary}
    bgcolor={bgcolor}
    nomargin={nomargin}
  >
    <StyledHeading big={!secondary}>
      {placeholder.length ? placeholder : text}
    </StyledHeading>
    <StyledIcon icon={icon} />
  </Wrapper>
);

CardButton.propTypes = {
  secondary: PropTypes.bool,
  bgcolor: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.object.isRequired,
  nomargin: PropTypes.number,
  placeholder: PropTypes.string,
};

CardButton.defaultProps = {
  secondary: false,
  bgcolor: "blue",
  text: "",
  nomargin: 0,
  placeholder: "",
};

export default CardButton;
