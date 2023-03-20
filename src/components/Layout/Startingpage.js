import React, { useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../Store/auth-context";
import classes from "./StartingPage.module.css";

export const StartingPage = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const verifyHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAkkb-XK6VksUmEGNtyg9DigL89lAAN7GM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMessage = "Authentication Failed";
            throw new Error(errMessage);
          });
        }
      })
      .then((data) => console.log(data))
      .catch((err) => alert(err.message));
  };
  
  const profileHandler = () => {
  history.replace("/profile");
  };

  return (
    <div>
    <div className={classes.welcome}>
      <div>Welcome to Expense Tracker!!!</div>
      <div>
        <span>Your Profile is Incomplete.</span>
        <button onClick={profileHandler}>Complete Now.</button>
      </div>
    </div>
    <div className={classes.btn}>
      <button onClick={verifyHandler}>VERIFY EMAIL ID</button>
    </div>
  </div>
  );
};