import React, { useEffect, useState } from "react";
import UserPlaces from "../UserPlaces/UserPlaces";
import data from "../../data/data";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";
import { url } from "../../shared/util/url";

function PlaceDetail() {
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
        setPlace(data.place);
      }
    );
  }, []);

  return <UserPlaces places={place} detail={true} />;
}

export default PlaceDetail;
