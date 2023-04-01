import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import classes from "./MainNavigation.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../ReduxStore/AuthSlice";

const MainNavigation = () => {
 // const history = useHistory();
   const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [auth.token]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
     //history.replace("/");
  };

  return (
    <div className={classes.head}>
        <header className={classes.header}>
            {isLoggedIn && <h1>My Website</h1>}
            {isLoggedIn && <NavLink to="/home">Home</NavLink>}
            {isLoggedIn && <NavLink to="/profile">Profile</NavLink>} 
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </header>
    </div>
  )
}

export default MainNavigation;