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
import personImg from "../../assets/person-icon-8.png";

function NavLinks(props) {
  const authCtx = useContext(AuthContext);
  const [logoutMenu, setLogoutMenu] = useState(false);
  const navigate = useNavigate();

  console.log(authCtx.user);

  const menuCloseHandler = async () => {
    setLogoutMenu(false);
    try {
      await fetch(url + `api/v1/auth/logout`, {
        credentials: "include",
      });

      authCtx.logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
            to={`/user-places/${authCtx.user.userId}`}
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
              <img src={authCtx.user.image || personImg} alt="profile" />
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
