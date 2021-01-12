import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/mainTheme";
import GlobalStyle from "theme/GlobalStyle";
import { auth, database } from "helpers/firebase";
import Loading from "components/molecules/Loading";
import Home from "views/Home";
import Login from "views/Login";
import Play from "views/Play";
import NotFound from "views/NotFound";
import NotSupported from "views/NotSupported";
import Create from "views/Create";

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        database.ref(`users/${user.uid}`).on("value", (snapshot) => {
          const {
            avatarId,
            balance,
            debt,
            nickname,
            pokerServer,
          } = snapshot.val();
          const isGuest = user.isAnonymous;
          setCurrentUser({
            avatarId,
            balance,
            debt,
            nickname,
            isGuest,
            id: user.uid,
            hasServer: !!pokerServer,
          });
          setIsLoggedIn(true);
          setIsLoading(false);
        });
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Helmet>
        <title>Poker</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {!isLoggedIn ? <Redirect to="/login" /> : null}
          {dimensions.width < 600 ? <Redirect to="/sorry" /> : null}
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Home
                  avatarId={currentUser.avatarId}
                  nickname={currentUser.nickname}
                  balance={currentUser.balance}
                  isGuest={currentUser.isGuest}
                />
              )}
            />
            <Route
              path="/play"
              render={() => (
                <Play
                  avatarId={currentUser.avatarId}
                  nickname={currentUser.nickname}
                  balance={currentUser.balance}
                  isGuest={currentUser.isGuest}
                  hasServer={currentUser.hasServer}
                />
              )}
            />
            <Route
              path="/create"
              render={() => (
                <Create id={currentUser.id} nickname={currentUser.nickname} />
              )}
            />
            <Route path="/login" component={Login} />
            <Route path="/sorry" component={NotSupported} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}

export default Root;
