import React, { useEffect, useState } from "react";
import AddPlace from "../add-place/AddPlace";
import { useParams } from "react-router-dom";
import data from "../../data/data";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";
import { url } from "../../shared/util/url";

function UpdatePlace() {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const [place, setPlace] = useState([]);
  const placeId = useParams().pid;

  useEffect(() => {
    sendRequest(
      url + `api/v1/place/${placeId}`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        setPlace([{ ...data.place }]);
      }
    );
  }, []);

  if (place.length === 0) {
    return (
      <div className="center">
        <h2>No place found.</h2>
      </div>
    );
  }

  const initialState = {
    title: { value: place[0].title, isValid: true },
    description: { value: place[0].description, isValid: true },
    isValid: true,
  };

  return (
    <>
      <AddPlace initialState={initialState} update={true} placeId={placeId} />
    </>
  );
}

export default UpdatePlace;
