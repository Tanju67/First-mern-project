import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import personImg from "../../assets/person-icon-8.png";
import { IoPersonCircle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoEarthSharp } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";
import { url } from "../../shared/util/url";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";

function Profile(props) {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const [user, setUser] = useState({});

  useEffect(() => {
    sendRequest(
      url + `api/v1/auth/user/${props.id}`,
      undefined,
      undefined,
      undefined,
      undefined,
      (data) => {
        setUser({
          name:
            data.profile.length > 0
              ? `${data.profile[0].firstName} ${data.profile[0].lastName}`
              : data.name,
          email: data.email,
          age: data.profile.length > 0 ? data.profile[0].birthYear : null,
          address: data.profile.length > 0 ? data.profile[0].address : null,
          country: data.profile.length > 0 ? data.profile[0].country : null,
          image: data.profile.length > 0 ? data.profile[0].image : null,
        });
      }
    );
  }, []);
  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <div className={classes.profile}>
        <div className={classes.imgBox}>
          {isLoading && <LoadingSpinner asOverlay />}
          <img src={user.image || personImg} alt={props.title} />
        </div>
        <div className={classes.informationBox}>
          <p>
            <IoPersonCircle />
            {user.name}
          </p>
          <p>
            <MdEmail />
            {user.email}
          </p>
          {user.age && (
            <p>
              <FaBirthdayCake />
              {user.age}
            </p>
          )}

          {user.address && (
            <p>
              <FaRegAddressCard /> {user.address}
            </p>
          )}
          {user.country && (
            <p>
              <IoEarthSharp /> {user.country}
            </p>
          )}
          {props.sharedPlaceCount && (
            <p>
              <IoMdPhotos />
              {props.sharedPlaceCount || "0"} Shared Photos
            </p>
          )}

          <p></p>
        </div>
      </div>
    </>
  );
}

export default Profile;
