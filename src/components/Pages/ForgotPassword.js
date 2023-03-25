import React, { useRef, useState } from "react";
import classes from "./ForgotPassword.module.css";
import { RotatingLines } from "react-loader-spinner";

export const ForgotPassword = () => {
  const emailRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const linkHandler = (e) => {
    e.preventDefault();

    const enteredLink = emailRef.current.value;
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBlvwm2UFysqlxp549MzHN_mTVXIn57d7s",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredLink,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMes = "Authentication Failed";
            throw new Error(errMes);
          });
        }
      })
      .then((data) => console.log(data))
      .catch((err) => alert(err.message));
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