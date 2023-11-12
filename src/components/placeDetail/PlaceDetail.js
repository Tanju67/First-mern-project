import React from "react";
import UserPlaces from "../UserPlaces/UserPlaces";
import data from "../../data/data";
import { useParams } from "react-router-dom";

function PlaceDetail() {
  const placeId = useParams();
  console.log(data);
  const place = data.filter((d) => d.id === placeId.pid);
  console.log(place);
  return <UserPlaces places={place} detail={true} />;
}

export default PlaceDetail;
