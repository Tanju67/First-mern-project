import React from "react";
import Card from "../../shared/UiElements/Card";
import classes from "./MyPlaceItem.module.css";
import Button from "../../shared/UiElements/Button";

function MyPlaceItem(props) {
  return (
    <Card className={classes.place}>
      <div className={classes.placeBox}>
        <img src={props.image} alt={props.title} />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <div className={classes.action}>
          <Button>View on map</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      </div>
    </Card>
  );
}

export default MyPlaceItem;
