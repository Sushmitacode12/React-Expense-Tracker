import React, { useRef, useState } from "react";
import classes from "./ForgotPassword.module.css";
import { RotatingLines } from "react-loader-spinner";
import { verifyPassword } from "../ReduxStore/AuthSlice";
import { useDispatch } from "react-redux";

export const ForgotPassword = () => {
  const emailRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const linkHandler = (e) => {
    e.preventDefault();

    const enteredLink = emailRef.current.value;
    setIsLoading(true);
    
    dispatch(
      verifyPassword({ requestType: "PASSWORD_RESET", email: enteredLink })
    );
    setIsLoading(false);
  };

  return (
    <div className={classes.forgotpassword}>
      <label>Enter the email with which you have registered.</label>
      <input type="email" id="forgotpassword" ref={emailRef} />
      <div>
        {!isLoading && <button onClick={linkHandler}>Send Link</button>}
        {isLoading && <RotatingLines />}
      </div>
    </div>
  );
};