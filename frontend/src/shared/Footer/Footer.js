import React, { useContext } from "react";
import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";
import { IoBagAddSharp } from "react-icons/io5";
import { RiLoginBoxFill } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

function Footer() {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.footer}>
      <div className={classes.pages}>
        <h2>Pages</h2>
        <ul>
          <li>
            <FaHome />
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <GiWorld />
            <NavLink to={"/places"}>All Places</NavLink>
          </li>
          {authCtx.isLoggedIn && (
            <li>
              <FaLocationDot />
              <NavLink to={`/user-places/${authCtx.user.userId}`}>
                My Places
              </NavLink>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <IoBagAddSharp />
              <NavLink to={"/add-place"}>Add Place</NavLink>
            </li>
          )}

          {!authCtx.isLoggedIn && (
            <li>
              <RiLoginBoxFill />
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          )}

          {!authCtx.isLoggedIn && (
            <li>
              <GiArchiveRegister />
              <NavLink to={"/register"}>Register</NavLink>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <li>
              <CgProfile />
              <NavLink to={`/profile/${authCtx.user.userId}`}>Profile</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className={classes.contact}>
        <h2>Contact</h2>
        <p>Tanju Özer</p>
        <p>tanju_ozer@web.de</p>
        <p>+49 401 53 600</p>
      </div>
      <div className={classes.social}>
        <h2>Social Media</h2>
        <div>
          <FaSquareFacebook />
          <FaInstagramSquare />
          <FaTwitterSquare />
          <FaLinkedin />
          <FaGithub />
          <FaYoutube />
        </div>
      </div>
    </div>
  );
}

export default Footer;
