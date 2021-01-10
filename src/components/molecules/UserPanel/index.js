import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Avatar from "components/atoms/Avatar";
import Paragraph from "components/atoms/Paragraph";
import { Appear } from "helpers/animations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { auth } from "helpers/firebase";
import { useOutsideClick } from "hooks/useOutsideClick";

const StyledAvatar = styled.div`
  position: relative;
  height: 6.4rem;
  width: 6.4rem;
  overflow: hidden;
  border-radius: 50%;
`;

const Container = styled.div`
  position: relative;
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.7rem;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  transform: ${({ direction, open }) =>
    direction === "up"
      ? open
        ? "rotate(180deg)"
        : "rotate(0deg)"
      : open
      ? "rotate(0deg)"
      : "rotate(180deg)"};
  transition: transform 0.3s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: ${({ theme }) => theme.gray5};
  border-radius: 6.4rem;
  height: 6rem;
  padding: 0.5rem 1.5rem 0.5rem 0;
  margin-bottom: ${({ direction }) => (direction === "up" ? "5rem" : 0)};
  cursor: pointer;
  animation: ${Appear} 0.4s ease-in-out backwards 0.2s;

  :hover {
    ${DropdownIcon} {
      background-color: ${({ theme }) => theme.gray4};
    }
  }
`;

const UserInfo = styled.div`
  padding-left: 1.5rem;
`;

const Username = styled(Paragraph)`
  font-weight: 500;
  font-size: 2.1rem;
`;

const Balance = styled(Paragraph)`
  color: ${({ theme }) => theme.textSecondary};
`;

const Dropdown = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.gray5};
  border-radius: 1.5rem;
  overflow: hidden;

  ${({ direction }) => (direction === "up" ? "bottom: 100%" : "top: 100%")};

  ${({ visible, direction }) =>
    visible
      ? css`
          visibility: visible;
          transform: ${direction === "up"
            ? "translateY(-1rem)"
            : "translateY(1rem)"};
          opacity: 1;
          transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
        `
      : css`
          transform: translateY(0);
          opacity: 0;
          visibility: hidden;
          transition: visibility 0s linear 0.3s, transform 0.3s ease-in-out,
            opacity 0.2s ease-in-out;
        `}
`;

const DropdownItem = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 1.5rem;
  width: 100%;
  border-radius: 1.5rem;
  font-size: 2.1rem;
  border: none;
  background-color: ${({ theme }) => theme.gray5};
  color: ${({ theme }) => theme.red};
  font-family: "Poppins", sans-serif;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.gray4};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 2.4rem;
`;

const DropdownItemIcon = styled(StyledIcon)`
  margin-right: 1rem;
`;

function UserPanel({ avatarId, direction }) {
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <Container ref={dropdownRef}>
      <Dropdown visible={isDropdownOpen} direction={direction}>
        <DropdownItem type="button" onClick={() => auth.signOut()}>
          <DropdownItemIcon icon={faSignOutAlt} />
          Logout
        </DropdownItem>
      </Dropdown>
      <Wrapper
        direction={direction}
        onClick={() => setIsDropdownOpen((prevState) => !prevState)}
      >
        <StyledAvatar>
          <Avatar id={avatarId} />
        </StyledAvatar>
        <UserInfo>
          <Username>John Doe</Username>
          <Balance>$15.4k</Balance>
        </UserInfo>
        <DropdownIcon open={isDropdownOpen} direction={direction}>
          <StyledIcon icon={faChevronUp} />
        </DropdownIcon>
      </Wrapper>
    </Container>
  );
}

UserPanel.propTypes = {
  avatarId: PropTypes.number,
  direction: PropTypes.oneOf(["up", "down"]),
};

UserPanel.defaultProps = {
  avatarId: 0,
  direction: "up",
};

export default UserPanel;
