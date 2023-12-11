import React from "react";
import classes from "./PlaceContent.module.css";
import { url } from "../../shared/util/url";

function PlaceContent(props) {
  return (
    <div className={classes.placeBox}>
      <img src={url + props.image} alt={props.title} />
      <h3>{props.title}</h3>
    </div>
  );
}

export default PlaceContent;
