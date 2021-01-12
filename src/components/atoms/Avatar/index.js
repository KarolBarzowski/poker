import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as Guest } from "assets/avatars/guest.svg";
import { ReactComponent as Avatar0 } from "assets/avatars/0.svg";
import { ReactComponent as Avatar1 } from "assets/avatars/1.svg";
import { ReactComponent as Avatar2 } from "assets/avatars/2.svg";
import { ReactComponent as Avatar3 } from "assets/avatars/3.svg";

const Avatars = [<Guest />, <Avatar0 />, <Avatar1 />, <Avatar2 />, <Avatar3 />];

const Wrapper = styled.div`
  svg {
    height: 64px;
    width: 64px;
  }
`;

const Avatar = ({ id, isGuest }) => (
  <Wrapper>{isGuest ? Avatars[0] : Avatars[id + 1]}</Wrapper>
);

Avatar.propTypes = {
  id: PropTypes.number,
  isGuest: PropTypes.bool.isRequired,
};

Avatar.defaultProps = {
  id: 0,
};

export default Avatar;
