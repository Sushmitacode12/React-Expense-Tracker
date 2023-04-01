import React from 'react'
import MainNavigation from './MainNavigation'
import { useSelector } from "react-redux";

const Layout = (props) => {
  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <div
      style={{ backgroundColor: isDark ? "black" : "white", height: "100vh" }}
    >
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;