import React from "react";
import data from "../../data/data";
import PlaceItem from "./PlaceItem";
import classes from "./Places.module.css";
import usePagination from "../../shared/hooks/usePagination";

function Places() {
  const [currentItems, pagination] = usePagination(6, data);
  console.log(currentItems);

  if (currentItems.length === 0) {
    return (
      <div className="noFound">
        <h2>No places found</h2>
      </div>
    );
  }
  return (
    <div className={classes.places}>
      {currentItems.map((item) => (
        <PlaceItem
          key={item.id}
          id={item.id}
          address={item.address}
          title={item.title}
          description={item.description}
          image={item.image}
          userImg={item.creatorImg}
        />
      ))}
      {pagination}
    </div>
  );
}

export default Places;
