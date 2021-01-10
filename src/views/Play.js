import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  faChevronLeft,
  faPlus,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { Appear } from "helpers/animations";
import CardButton from "components/molecules/CardButton";
import UserPanel from "components/molecules/UserPanel";
import Heading from "components/atoms/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArrowAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  
  50% {
    transform: translateX(-0.5rem);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100vh;
  padding: 2.5rem 5rem;
`;

const CardButtonsWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  height: calc(100vh - 8.3rem - 5rem);
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  letter-spacing: 0.2rem;
`;

const StyledLinkIcon = styled(FontAwesomeIcon)`
  font-size: 2.4rem;
  margin-right: 1rem;
  transition: transform 0.15s ease-in-out;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: ${({ theme }) => theme.gray5};
  border-radius: 6.4rem;
  height: 4.8rem;
  padding: 0.5rem 2.5rem 0.5rem 1.5rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 2.1rem;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  animation: ${Appear} 0.3s ease-in-out backwards 0.2s;

  :hover {
    background-color: ${({ theme }) => theme.gray4};

    ${StyledLinkIcon} {
      animation: ${ArrowAnimation} 0.6s ease-in-out forwards;
    }
  }
`;

function Play({ currentUser }) {
  return (
    <Wrapper>
      <Row>
        <StyledLink to="/">
          <StyledLinkIcon icon={faChevronLeft} />
          Back
        </StyledLink>
        <StyledHeading big={1}>AVAILABLE TABLES</StyledHeading>
        <UserPanel avatarId={currentUser.avatarId} direction="down" />
      </Row>
      <Row>
        <CardButtonsWrapper>
          <CardButton bgcolor="blue" text="create" icon={faPlus} nomargin={1} />
          <CardButton
            bgcolor="orange"
            text="shop"
            icon={faShoppingBasket}
            nomargin={1}
          />
        </CardButtonsWrapper>
      </Row>
    </Wrapper>
  );
}

Play.propTypes = {
  currentUser: PropTypes.shape({
    avatarId: PropTypes.number,
    balance: PropTypes.number,
    debt: PropTypes.number,
    nickname: PropTypes.string,
    isGuest: PropTypes.bool,
  }).isRequired,
};

export default Play;
