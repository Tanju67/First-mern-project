import React from "react";
import AddPlace from "../add-place/AddPlace";
import { useParams } from "react-router-dom";
import data from "../../data/data";

function UpdatePlace() {
  const placeId = useParams().pid;
  const selectedPlace = data.filter((d) => d.id === placeId);
  console.log(selectedPlace);
  const initialState = {
    title: { value: selectedPlace[0].title, isValid: true },
    address: { value: selectedPlace[0].address, isValid: true },
    description: { value: selectedPlace[0].description, isValid: true },
    isValid: true,
  };
  console.log(placeId);
  return <AddPlace initialState={initialState} />;
}

export default UpdatePlace;
