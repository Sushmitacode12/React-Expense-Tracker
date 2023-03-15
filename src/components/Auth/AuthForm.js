import React, { useRef } from "react";
import classes from "./AuthForm.module.css";

export const AuthForm = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkkb-XK6VksUmEGNtyg9DigL89lAAN7GM",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
          returnSecureToken: true,
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
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => console.log(" User has successfully signed up."))
      .catch((err) => alert(err.message));

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmPasswordInputRef.current.value = "";
  };
  return (
    <div className={classes.authtop}>
      <div className={classes.auth}>
        <h2>Sign Up</h2>
        <div>
          <label>Email</label>
        </div>
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          ref={emailInputRef}
          required
        />
        <div>
          <label>Password</label>
        </div>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          ref={passwordInputRef}
          required
        />
        <div>
          <label>Confirm Password</label>
        </div>
        <input
          type="password"
          id="confirmpassword"
          placeholder="Confirm Password"
          ref={confirmPasswordInputRef}
          required
        />
        <div>
          <button onClick={submitHandler}>Sign Up</button>
        </div>
      </div>
      <div>
        <button className={classes.button}>Have an account? Login</button>
      </div>
    </div>
  );
};