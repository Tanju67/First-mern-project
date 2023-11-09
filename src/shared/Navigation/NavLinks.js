import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavLinks.module.css";

function Navigation(props) {
  return (
    <ul className={classes.navLinks} onClick={props.onClick}>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={"/places"}
        >
          All Places
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={"/myplaces"}
        >
          My Places
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={"/login"}
        >
          Login
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
