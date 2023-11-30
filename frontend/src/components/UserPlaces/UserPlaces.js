import React from "react";

import UserPlaceItem from "./UserPlaceItem";
import classes from "./UserPlaces.module.css";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import Button from "../../shared/UiElements/Button";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";

function UserPlaces({ places, detail, isLoading, error, clearErrorHandler }) {
  const userId = useParams().uid;
  const placeId = useParams().pid;

  // const userPlace = places.filter((place) => place.creator === userId);
  if (!detail && places.length === 0) {
    return (
      <div className={classes.page}>
        <Profile id={userId} />
        <div className={classes.placesContainer}>
          <div className={classes.noFound}>
            <h2 className="center">No place found.</h2>
            <Button to={"/add-place"}>Add New Place</Button>
          </div>
        </div>
      </div>
    );
  }

  if (detail && places.length === 0) {
    return (
      <div className={classes.page}>
        <Profile id={userId} />
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
      {!detail && <Profile id={userId} sharedPlaceCount={places.length} />}
      {detail && <Profile id={places.creator} sharedPlaceCount={false} />}
      <ul className={classes.placesContainer}>
        <ErrorModal error={error} onClear={clearErrorHandler} />
        {isLoading && <LoadingSpinner asOverlay />}
        {detail && (
          <UserPlaceItem
            key={places._id}
            id={places._id}
            address={places.address}
            title={places.title}
            description={places.description}
            image={places.image}
            creator={places.creator}
            location={places.location}
          />
        )}

        {!detail &&
          places.map((place) => {
            return (
              <UserPlaceItem
                key={place._id}
                id={place._id}
                title={place.title}
                address={place.address}
                description={place.description}
                image={place.image}
                creator={place.creator}
                location={place.location}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default UserPlaces;
