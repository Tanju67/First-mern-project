import React from "react";

import UserPlaceItem from "./UserPlaceItem";
import classes from "./UserPlaces.module.css";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import Button from "../../shared/UiElements/Button";

function UserPlaces({ places, detail }) {
  const userId = useParams().uid;
  console.log(userId);
  const userPlace = places.filter((place) => place.creator === userId);
  if (userPlace.length === 0) {
    return (
      <div className={classes.page}>
        <Profile image={places[0].creatorImg} />
        <div className={classes.placesContainer}>
          <div className={classes.noFound}>
            <h2 className="center">No place found.</h2>
            <Button to={"/add-place"}>Add New Place</Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.page}>
      <Profile image={places[0].creatorImg} />
      <ul className={classes.placesContainer}>
        {detail && (
          <UserPlaceItem
            key={places[0].id}
            title={places[0].title}
            description={places[0].description}
            image={places[0].image}
          />
        )}

        {!detail &&
          userPlace.map((place) => {
            return (
              <UserPlaceItem
                key={place.id}
                title={place.title}
                description={place.description}
                image={place.image}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default UserPlaces;
