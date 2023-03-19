import React from 'react'
import { NavLink } from 'react-router-dom';
//import { Link, NavLink } from 'react-router-dom';
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <div className={classes.head}>
        <header className={classes.header}>
            <h1>My Website</h1>
            <NavLink to="/home">Home</NavLink>
            {/* <NavLink to="/login">Login</NavLink> */}
            {/* <h3>About Us</h3> */}
            <NavLink to="/profile">Profile</NavLink>
        </header>
    </div>
  )
}

export default MainNavigation;