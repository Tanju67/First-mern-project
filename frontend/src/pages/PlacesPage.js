import React, { useEffect, useState } from "react";
import Places from "../components/places/Places";
import { useHttpRequest } from "../shared/hooks/useHttpRequest";
import { url } from "../shared/util/url";

function PlacesPage() {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const [placeData, setPlaceData] = useState([]);

  const fetchPlacesData = () => {
    sendRequest(
      url + `api/v1/place`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        setPlaceData(data);
      }
    );
  };

  useEffect(() => {
    fetchPlacesData();
  }, []);

  return (
    <Places
      data={placeData}
      isLoading={isLoading}
      clearErrorHandler={clearErrorHandler}
      error={error}
    />
  );
}

export default PlacesPage;
