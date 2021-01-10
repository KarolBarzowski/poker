import React, {useState, useEffect} from "react";
import {auth, database} from "helpers/firebase";
import {Redirect} from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "assets/bg.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faAt,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {getErrorDescription} from "helpers/functions";
import Heading from "components/atoms/Heading";
import Paragraph from "components/atoms/Paragraph";

const Container = styled.div.attrs(({x, y}) => ({
  style: {
    backgroundPosition: `${x}px ${y}px`,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: 110% 110%;
`;

const Wrapper = styled.main`
  padding: 2.5rem 5rem;
  background-color: ${({theme}) => theme.gray6};
  border-radius: 2.5rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
`;

const InputWrapper = styled.div`
  display: flex;
  height: 4rem;
  width: 30rem;
  border: 1px solid ${({theme}) => theme.gray2};
  border-radius: 5px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.6rem;
  color: ${({theme}) => theme.text};
  font-family: "Poppins", sans-serif;

  ::placeholder {
    color: ${({theme}) => theme.textDisabled};
    font-size: 1.6rem;
  }
`;

const Label = styled.label`
  padding: 0 15px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  height: 100%;
  color: ${({theme}) => theme.textSecondary};
`;

const ButtonIcon = styled.button`
  padding: 0 15px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  ${StyledIcon}:hover {
    color: ${({theme}) => theme.text};
  }
`;

const Button = styled.button`
  background-color: ${({theme, guest}) => (guest ? theme.gray4 : theme.blue)};
  border: none;
  width: 100%;
  border-radius: 5px;
  height: 40px;
  margin: 15px 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.6);

  :hover:not(:disabled) {
    cursor: pointer;
    background-color: ${({theme, guest}) =>
  guest ? theme.gray4Hover : theme.blueHover};
  }

  :disabled {
    background-color: ${({theme, guest}) =>
  guest ? theme.gray4Disabled : theme.blueDisabled};
  }
`;

const ButtonText = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;

  ${Paragraph} {
    color: ${({theme}) => theme.blue};
  }

  :hover ${Paragraph}, :focus ${Paragraph} {
    text-decoration: underline;
    color: ${({theme}) => theme.blueHover};
  }
`;

const Error = styled(Paragraph)`
  color: ${({theme}) => theme.red};
`;

const FORM_TYPES = {
  login: "login",
  register: "register",
  restore: "restore",
};

const TITLES = {
  login: "Sign in",
  register: "Sign up",
  restore: "Forgot password",
};

function Login() {
  const [formType, setFormType] = useState(FORM_TYPES.login);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  
  useEffect(() => {
    const handleMove = (e) => {
      setX((e.pageX * -1) / 20);
      setY((e.pageY * -1) / 20);
    };
    
    document.addEventListener("mousemove", handleMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMove);
    };
  }, []);
  
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
  }, []);
  
  useEffect(() => {
    if (
      formType === FORM_TYPES.register &&
      (password.length || confirmPassword.length)
    ) {
      if (password !== confirmPassword) {
        setIsError(true);
        setErrorDescription(`Passwords are not equal!`);
      } else if (password.length < 6) {
        setIsError(true);
        setErrorDescription(`Password min. 6 characters!`);
      } else {
        setIsError(false);
        setErrorDescription("");
      }
    } else {
      setIsError(false);
      setErrorDescription("");
    }
  }, [password, confirmPassword, formType]);
  
  const handleTogglePassword = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  
  const handleToggleRegister = () => {
    setFormType((prevState) =>
      prevState === FORM_TYPES.login ? FORM_TYPES.register : FORM_TYPES.login
    );
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setIsError(true);
      setErrorDescription(getErrorDescription(error.code));
      setIsLoading(false);
    });
  };
  
  const handleRegister = () => {
    setIsLoading(true);
    if (!nickname.length || nickname.length < 3) {
      setIsLoading(false);
      setIsError(true);
      setErrorDescription("Nickname must have at least 3 letters!");
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          database
            .ref(`users/${result.user.uid}`)
            .set({
              nickname,
              balance: 1000,
              avatarId: Math.floor(Math.random() * 4),
              debt: 0,
            })
            .catch(() => {
              setIsLoading(false);
              setIsError(true);
              setErrorDescription("There was a problem with database");
            });
          setIsLoading(false);
        })
        .catch(({code}) => {
          setIsLoading(false);
          setIsError(true);
          setErrorDescription(getErrorDescription(code));
        });
    }
  };
  
  const handleRestore = () => {
    setIsLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsEmailSent(true);
        setIsLoading(false);
      })
      .catch(({code}) => {
        setIsLoading(false);
        setIsError(true);
        setErrorDescription(getErrorDescription(code));
      });
  };
  
  const handleLoginAsGuest = () => {
    setIsLoading(true);
    auth
      .signInAnonymously()
      .then((result) => {
        database
          .ref(`users/${result.user.uid}`)
          .set({
            nickname: `Guest${Math.floor(Math.random() * 1000)}`,
            balance: 1000,
            avatarId: Math.floor(Math.random() * 4),
            debt: 0,
          })
          .catch(() => {
            setIsLoading(false);
            setIsError(true);
            setErrorDescription("There was a problem with database");
          });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
        setErrorDescription("Unknown error. Try again later.");
      });
  };
  
  if (isLoggedIn) return <Redirect to="/"/>;
  
  return (
    <Container x={x} y={y}>
      <Wrapper>
        <Heading>{TITLES[formType]}</Heading>
        <form>
          {formType === FORM_TYPES.register ? (
            <InputWrapper>
              <Label htmlFor="nickname">
                <StyledIcon icon={faUserCircle}/>
              </Label>
              <Input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </InputWrapper>
          ) : null}
          <InputWrapper>
            <Label htmlFor="email">
              <StyledIcon icon={faAt}/>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          {formType !== FORM_TYPES.restore ? (
            <InputWrapper>
              <Label htmlFor="password">
                <StyledIcon icon={faKey}/>
              </Label>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ButtonIcon type="button" onClick={handleTogglePassword}>
                <StyledIcon icon={isPasswordVisible ? faEyeSlash : faEye}/>
              </ButtonIcon>
            </InputWrapper>
          ) : null}
          {formType === FORM_TYPES.register ? (
            <InputWrapper>
              <Label htmlFor="confirmPassword">
                <StyledIcon icon={faKey}/>
              </Label>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputWrapper>
          ) : null}
          {formType === FORM_TYPES.restore && isEmailSent ? (
            <Paragraph>Reset link sent to your email!</Paragraph>
          ) : null}
          {isError ? <Error>{errorDescription}</Error> : null}
          {formType === FORM_TYPES.login ? (
            <Button type="submit" onClick={handleLogin} disabled={isLoading}>
              <Paragraph>Login</Paragraph>
            </Button>
          ) : null}
          {formType === FORM_TYPES.register ? (
            <Button type="button" onClick={handleRegister} disabled={isLoading}>
              <Paragraph>Sign up</Paragraph>
            </Button>
          ) : null}
          {formType === FORM_TYPES.restore ? (
            <Button type="button" onClick={handleRestore} disabled={isLoading}>
              <Paragraph>Reset password</Paragraph>
            </Button>
          ) : null}
          <Paragraph>
            {formType === FORM_TYPES.login
              ? "Doesn't have an account? "
              : "Already have an account? "}
            <ButtonText type="button" onClick={handleToggleRegister}>
              <Paragraph>
                {formType === FORM_TYPES.login ? "Sign up!" : "Sign in!"}
              </Paragraph>
            </ButtonText>
          </Paragraph>
          {formType !== FORM_TYPES.restore ? (
            <>
              <Button
                type="button"
                onClick={handleLoginAsGuest}
                guest
                disabled={isLoading}
              >
                <Paragraph>Play as Guest</Paragraph>
              </Button>
              <ButtonText
                type="button"
                onClick={() => setFormType(FORM_TYPES.restore)}
              >
                <Paragraph>Forgot password?</Paragraph>
              </ButtonText>
            </>
          ) : null}
        </form>
      </Wrapper>
    </Container>
  );
}

export default Login;
