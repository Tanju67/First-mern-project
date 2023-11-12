import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavLinks.module.css";
import Button from "../UiElements/Button";

function NavLinks(props) {
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
          to={"/user-places/u2"}
        >
          My Places
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={"/add-place"}
        >
          Add Place
        </NavLink>
      </li>

      <li>
        <Button
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={"/login"}
        >
          Login
        </Button>
      </li>
    </ul>
  );
}

export default NavLinks;
