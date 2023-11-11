import React from "react";
import MyPlaces from "../components/myPlaces/MyPlaces";
import data from "../data/data";

function MyPlacesPage() {
  console.log(data);
  return <MyPlaces places={data} />;
}

export default MyPlacesPage;
