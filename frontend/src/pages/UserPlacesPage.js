import React from "react";
import UserPlaces from "../components/UserPlaces/UserPlaces";
import data from "../data/data";

function UserPlacesPage() {
  return <UserPlaces places={data} />;
}

export default UserPlacesPage;
