import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { database } from "helpers/firebase";
import PropTypes from "prop-types";

function Game({
  match: {
    params: { gameId },
  },
  currentUser,
}) {
  const [playersIds, setPlayersIds] = useState([]);
  const [players, setPlayers] = useState([]);

  // add player to players list
  useEffect(() => {
    console.log("ADDING PLAYER TO DATABASE");
    const playersRef = database.ref(`poker/servers/${gameId}/players`);
    playersRef
      .orderByValue()
      .equalTo(currentUser.id)
      .once("value")
      .then((snapshot) => {
        if (!snapshot.exists()) {
          playersRef.push(currentUser.id);
        }
      });
  }, [gameId, currentUser.id]);

  useEffect(() => {
    // download game data
    console.log("DOWNLOADING GAME DATA");
    const serverRef = database.ref(`poker/servers/${gameId}`);

    // download players id's and listen for changes
    const newPlayersIds = [];
    serverRef.child("players").on("value", (snapshot) => {
      setPlayersIds([]);
      snapshot.forEach((playerSnapshot) => {
        const uid = playerSnapshot.val();
        newPlayersIds.push(uid);
      });
      setPlayersIds(newPlayersIds);
    });
  }, [gameId]);

  // TODO: dolaczanie graczy i wychodzenie

  useEffect(() => {
    // download specific data about players
    setPlayers([]);
    playersIds.forEach((pid) => {
      const pRef = database.ref(`users/${pid}`);
      pRef.once("value").then((snapshot) => {
        setPlayers((prevState) => [
          ...prevState,
          { ...snapshot.val(), id: pid },
        ]);
      });
    });
  }, [playersIds]);

  return (
    <div>
      <h2>Game {gameId}</h2>

      <div>
        Players:
        <ol style={{ margin: 0 }}>
          {players.map((p) => (
            <li key={p.id}>
              <ul>
                {console.log(p)}
                <li>Nickname: {p.nickname}</li>
                <li>Balance: {p.balance}</li>
                <li>Debt: {p.debt}</li>
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

Game.propTypes = {
  currentUser: PropTypes.shape({
    avatarId: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    isGuest: PropTypes.bool.isRequired,
    hasServer: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    debt: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      gameId: PropTypes.string.isRequired,
    }),
  }),
};

export default withRouter(Game);
