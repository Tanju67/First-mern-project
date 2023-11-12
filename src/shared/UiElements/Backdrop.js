import React from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css";
import { CSSTransition } from "react-transition-group";

function BackdropOverlay(props) {
  const content = (
    <div className={classes.backdrop} onClick={props.onClick}></div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook")
  );
}

const Backdrop = (props) => {
  return (
    <>
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={"modal"}
      >
        <BackdropOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Backdrop;
