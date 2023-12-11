import React, { useEffect, useState } from "react";
import Places from "../components/places/Places";
import { useHttpRequest } from "../shared/hooks/useHttpRequest";
import { url } from "../shared/util/url";

function PlacesPage() {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
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
