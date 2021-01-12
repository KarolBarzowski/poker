import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  faPlay,
  faPiggyBank,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "components/atoms/Logo";
import CardButton from "components/molecules/CardButton";
import UserPanel from "components/molecules/UserPanel";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
`;

const CardButtonsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 5rem 0;

  @media screen and (min-width: 1200px) {
    flex-flow: row nowrap;
    margin: 0;
  }
`;

function Home({ avatarId, nickname, balance, isGuest }) {
  return (
    <Wrapper>
      <Logo />
      <CardButtonsWrapper>
        <CardButton secondary bgcolor="green" text="bank" icon={faPiggyBank} />
        <CardButton bgcolor="blue" text="play" icon={faPlay} />
        <CardButton secondary bgcolor="orange" text="ranking" icon={faTrophy} />
      </CardButtonsWrapper>
      <UserPanel
        avatarId={avatarId}
        nickname={nickname}
        balance={balance}
        isGuest={isGuest}
      />
    </Wrapper>
  );
}

Home.propTypes = {
  avatarId: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  isGuest: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
};

export default Home;
