import React from "react";
import data from "../../data/data";
import PlaceItem from "./PlaceItem";
import classes from "./Places.module.css";
import usePagination from "../../shared/hooks/usePagination";

function Places() {
  const [currentItems, pagination] = usePagination(6, data);
  return (
    <div className={classes.places}>
      {currentItems.map((d) => (
        <PlaceItem
          key={d.id}
          id={d.id}
          title={d.title}
          description={d.description}
          image={d.image}
          userImg={d.creatorImg}
        />
      ))}
      {pagination}
    </div>
  );
}

export default Places;
