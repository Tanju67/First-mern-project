import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./NavLinks.module.css";
import Button from "../UiElements/Button";
import { AuthContext } from "../context/auth-context";
import { AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CSSTransition } from "react-transition-group";
import { url } from "../util/url";

function NavLinks(props) {
  const authCtx = useContext(AuthContext);
  const [logoutMenu, setLogoutMenu] = useState(false);
  const navigate = useNavigate();

  const menuCloseHandler = async () => {
    setLogoutMenu(false);
    try {
      const response = await fetch(url + `api/v1/auth/logout`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      authCtx.logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    // navigate("/");
  };

  const profileHandler = () => {
    setLogoutMenu(false);
  };
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
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to={"/user-places/u2"}
          >
            My Places
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to={"/add-place"}
          >
            Add Place
          </NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <Button
            className={`${classes.loginBtn} ${({ isActive }) =>
              isActive ? classes.active : ""}`}
            to={"/login"}
          >
            Login
          </Button>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <Button
            onClick={() => {
              setLogoutMenu((prev) => !prev);
            }}
            className={`${classes.logout} ${({ isActive }) =>
              isActive ? classes.active : ""}`}
          >
            <div className={classes.imgBox}>
              <img
                src="https://st4.depositphotos.com/10313122/24678/i/450/depositphotos_246788750-stock-photo-handsome-caucasian-man-isolated-against.jpg"
                alt="profile"
              />
            </div>
            <AiOutlineMenu />
          </Button>
          <CSSTransition
            in={logoutMenu}
            mountOnEnter
            unmountOnExit
            timeout={200}
            classNames={"modal"}
          >
            <div className={classes.hoverProfile}>
              <div>
                <p onClick={menuCloseHandler}>
                  <RiLogoutCircleLine /> Logout
                </p>
                <Link onClick={profileHandler} to={"/profile/u2"}>
                  <CgProfile /> Profile
                </Link>
              </div>
            </div>
          </CSSTransition>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
