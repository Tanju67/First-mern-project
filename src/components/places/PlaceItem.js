import React from "react";
import Card from "../../shared/UiElements/Card";
import classes from "./PlaceItem.module.css";
import Button from "../../shared/UiElements/Button";

function PlaceItem(props) {
  return (
    <Card className={classes.placeItem}>
      <div className={classes.userBox}>
        <div className={classes.imgBox}>
          <img src={props.userImg} alt={props.title} />
        </div>
        <span>Tanju Özer</span>
      </div>
      <div className={classes.placeBox}>
        <img src={props.image} alt={props.title} />

        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className={classes.actions}>
        <Button to={props.id}>DETAIL</Button>
      </div>
    </Card>
  );
}

export default PlaceItem;
