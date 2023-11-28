import React, { useContext, useEffect, useState } from "react";
import Card from "../../shared/UiElements/Card";
import classes from "./PlaceItem.module.css";
import Button from "../../shared/UiElements/Button";
import { url } from "../../shared/util/url";
import personImg from "../../assets/person-icon-8.png";
import { AuthContext } from "../../shared/context/auth-context";

function PlaceItem(props) {
  const authCtx = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});

  const content = {
    name:
      profileData.profile?.length > 0
        ? `${profileData.profile[0].firstName} ${profileData.profile[0].lastName}`
        : profileData.name,
    image:
      profileData.profile?.length > 0
        ? profileData.profile[0].image
        : personImg,
  };

  const date = new Date(props.date).toLocaleDateString("de-DE");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(url + `api/v1/auth/user/${props.creator}`);
        const data = await response.json();
        setProfileData(data);
      } catch (error) {}
    };
    fetchProfileData();
  }, []);

  return (
    <Card className={classes.placeItem}>
      <div className={classes.userBox}>
        <div className={classes.userProfile}>
          <div className={classes.imgBox}>
            <img src={content.image} alt={"user img"} />
          </div>
          <span>{content.name}</span>
        </div>
        <div className={classes.postDate}>
          <span>{date}</span>
        </div>
      </div>
      <div className={classes.placeBox}>
        <img src={props.image} alt={props.title} />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>{props.address}</p>
      </div>
      {authCtx.isLoggedIn && (
        <>
          <hr />
          <div className={classes.actions}>
            <Button to={props.id}>DETAIL</Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default PlaceItem;
