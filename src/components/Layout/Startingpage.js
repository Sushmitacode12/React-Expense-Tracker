import React from "react";
//import { useHistory } from "react-router";
import classes from "./StartingPage.module.css";

export const StartingPage = () => {
 // const history = useHistory();
  const profileHandler = () => {
 // history.replace("/profile");
  };
  return (
    <div className={classes.welcome}>
      <div>Welcome to Expense Tracker!!!</div>
      <span>Your Profile is Incomplete.</span>
      <button onClick={profileHandler}>Complete Now.</button>
    </div>
  );
};