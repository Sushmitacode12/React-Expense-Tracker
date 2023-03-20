import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import AuthContext from '../Store/auth-context';
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn

  return (
    <div className={classes.head}>
        <header className={classes.header}>
            {isLoggedIn && <h1>My Website</h1>}
            {isLoggedIn && <NavLink to="/home">Home</NavLink>}
            {isLoggedIn && <h3>Products</h3>}
            {isLoggedIn && <NavLink to="/profile">Profile</NavLink>} 
            {isLoggedIn && <h3>About Us</h3>} 
        </header>
    </div>
  )
}

export default MainNavigation;