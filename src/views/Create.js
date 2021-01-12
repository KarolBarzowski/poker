import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { database } from "helpers/firebase";
import { Redirect } from "react-router-dom";
import Loading from "components/molecules/Loading";

function Create({ id, nickname }) {
  const [isRedirect, setIsRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  useEffect(() => {
    const userRef = database.ref(`users/${id}`);
    // check if user already has a server
    const userServerRef = database.ref(`users/${id}/pokerServer`);
    userServerRef.once("value").then((snapshot) => {
      if (snapshot.exists()) {
        // redirect to server
        setRedirectTo(snapshot.val());
        setIsRedirect(true);
      } else {
        // create server
        const pokerServersRef = database.ref("poker/servers");
        const newServerRef = pokerServersRef.push();
        newServerRef.set(
          {
            id: newServerRef.key,
            owner: id,
            name: `${nickname}'s table`,
          },
          (error) => {
            if (error) {
              // TODO error
            } else {
              userRef.update(
                {
                  pokerServer: newServerRef.key,
                },
                (error) => {
                  if (error) {
                    // TODO error
                  } else {
                    setRedirectTo(newServerRef.key);
                    setIsRedirect(true);
                  }
                }
              );
            }
          }
        );
      }
    });
  });

  if (isRedirect) return <Redirect to={`/table/${redirectTo}`} />;

  return <Loading />;
}

Create.propTypes = {
  nickname: PropTypes.string,
  id: PropTypes.string,
};

export default Create;
