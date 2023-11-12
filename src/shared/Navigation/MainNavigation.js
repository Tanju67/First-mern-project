import React, { useState } from "react";
import classes from "./MainNavigation.module.css";
import Navigation from "./NavLinks";
import { AiOutlineMenu } from "react-icons/ai";
import BackDrop from "../UiElements/Backdrop";
import SideDrawer from "./SideDrawer";
import logo from "../../assets/oie_o75FzJ35Mzez.png";

function MainNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  return (
    <div className={classes.mainNavigation}>
      {drawerIsOpen && (
        <BackDrop
          show={drawerIsOpen}
          onClick={() => {
            setDrawerIsOpen(false);
          }}
        />
      )}

      <SideDrawer
        show={drawerIsOpen}
        onClick={() => {
          setDrawerIsOpen(false);
        }}
      >
        <nav className={classes.drawerNav}>
          <Navigation
            onClick={() => {
              setDrawerIsOpen(false);
            }}
          />
        </nav>
      </SideDrawer>

      <img className={classes.logo} src={logo} alt="img-logo" />
      <nav className={classes.bigScreen}>
        <Navigation />
      </nav>

      <AiOutlineMenu
        onClick={() => {
          setDrawerIsOpen(true);
        }}
        className={classes.menu}
      />
    </div>
  );
}

export default MainNavigation;
