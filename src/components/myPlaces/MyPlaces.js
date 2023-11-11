import React from "react";

import MyPlaceItem from "./MyPlaceItem";
import classes from "./MyPlaces.module.css";
import Profile from "./Profile";

function MyPlaces({ places, detail }) {
  return (
    <div className={classes.page}>
      <Profile image={places[0].creatorImg} />
      <div className={classes.placesContainer}>
        {detail && (
          <MyPlaceItem
            key={places[0].id}
            title={places[0].title}
            description={places[0].description}
            image={places[0].image}
          />
        )}

        {!detail &&
          places.map((d) => {
            if (d.creator === "u2") {
              return (
                <MyPlaceItem
                  key={d.id}
                  title={d.title}
                  description={d.description}
                  image={d.image}
                />
              );
            }
          })}
      </div>
    </div>
  );
}

export default MyPlaces;
