import React, { useEffect, useState } from "react";
import Places from "../components/places/Places";
import { useHttpRequest } from "../shared/hooks/useHttpRequest";
import { url } from "../shared/util/url";

function PlacesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [placeData, setPlaceData] = useState([]);

  const clearErrorHandler = () => {
    setError(null);
  };

  const fetchPlacesData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url + `api/v1/place`);
      if (!res.ok) {
        throw new Error("Fetching data failed!");
      }
      const data = await res.json();
      setPlaceData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
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
