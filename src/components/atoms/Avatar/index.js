import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as Avatar0 } from "assets/avatars/0.svg";
import { ReactComponent as Avatar1 } from "assets/avatars/1.svg";
import { ReactComponent as Avatar2 } from "assets/avatars/2.svg";
import { ReactComponent as Avatar3 } from "assets/avatars/3.svg";

const Avatars = [<Avatar0 />, <Avatar1 />, <Avatar2 />, <Avatar3 />];

const Wrapper = styled.div`
  svg {
    height: 64px;
    width: 64px;
  }
`;

const Avatar = ({ id }) => <Wrapper>{Avatars[id]}</Wrapper>;

Avatar.propTypes = {
  id: PropTypes.number,
};

Avatar.defaultProps = {
  id: 0,
};

export default Avatar;
