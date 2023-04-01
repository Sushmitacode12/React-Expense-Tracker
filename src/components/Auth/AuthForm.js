import React, { useRef, useState, useEffect } from "react";
import classes from "./AuthForm.module.css";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUsers } from "../ReduxStore/AuthSlice";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
   //const history = useHistory();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      //history.replace("/home");
    }
  }, [auth.token]);

  const dispatch = useDispatch();

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");
  
  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    let url;
    if(enteredEmail && enteredPassword === enteredConfirmPassword) {
      
      if(isLogin) {
        url = 
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNVxXpsDegs-5H2vmDbmQSr_ngPiYwQwo";
      } else {
        url = 
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNVxXpsDegs-5H2vmDbmQSr_ngPiYwQwo";
      }
      dispatch(loginUsers({ url, enteredEmail, enteredPassword }));  
    } else if (
      enteredEmail.length === 0 ||
      enteredPassword.length === 0 ||
      enteredConfirmPassword.length === 0
    ) {
      alert("Enter All Required Details");
    } else if (enteredEmail && enteredPassword !== enteredConfirmPassword) {
      alert("Confirm Password Not Matched");
    }
  };  
  return (
    <div className={classes.authtop}>
      <div className={classes.auth}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
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
          <button onClick={submitHandler}>
            {isLogin ? "Login" : "Sign Up"}
            </button>
        </div>
      </div>
      <div>
          {isLogin ? (
            <NavLink to="/forgotpassword">Forgot Password</NavLink>
          ) : null}
        </div>
      <div>
        <button className={classes.button} onClick={switchAuthHandler}>
          {isLogin 
            ? "Don't Have an account ? Sign Up" 
            : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
};