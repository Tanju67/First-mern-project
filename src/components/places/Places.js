import React from "react";
import data from "../../data/data";
import PlaceItem from "./PlaceItem";
import classes from "./Places.module.css";
import usePagination from "../../shared/hooks/usePagination";

function Places() {
  console.log(data);
  const [currentItems, pagination] = usePagination(6, data);
  console.log(currentItems, pagination);
  return (
    <div className={classes.places}>
      {currentItems.map((d) => (
        <PlaceItem
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
