import React from "react";
import Card from "../../shared/UiElements/Card";
import data from "../../data/data";
import PlaceItem from "./PlaceItem";
import classes from "./Places.module.css";

function Places() {
  return (
    <div className={classes.places}>
      {data.map((d) => (
        <PlaceItem
          title={d.title}
          description={d.description}
          image={d.image}
          userImg={d.creatorImg}
        />
      ))}
    </div>
  );
}

export default Places;
