import React, { useEffect, useState } from "react";
import UserPlaces from "../components/UserPlaces/UserPlaces";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../shared/hooks/useHttpRequest";
import { url } from "../shared/util/url";

function UserPlacesPage() {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  const [userPlace, setUserPlace] = useState([]);

  const userId = useParams().uid;

  useEffect(() => {
    sendRequest(
      url + `api/v1/place/user/${userId}`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        setUserPlace(data.places);
      }
    );
  }, []);

  return (
    <UserPlaces
      isLoading={isLoading}
      error={error}
      clearErrorHandler={clearErrorHandler}
      places={userPlace}
    />
  );
}

export default UserPlacesPage;
