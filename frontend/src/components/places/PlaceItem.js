import React, { useEffect, useState } from "react";
import Card from "../../shared/UiElements/Card";
import classes from "./PlaceItem.module.css";
import Button from "../../shared/UiElements/Button";
import { url } from "../../shared/util/url";

function PlaceItem(props) {
  const [profileData, setProfileData] = useState([]);

  const date = new Date(props.date).toLocaleDateString("de-DE");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(url + `api/v1/profile/${props.creator}`);
        const data = await response.json();
        setProfileData(data.profile[0]);
        console.log(data);
      } catch (error) {}
    };
    fetchProfileData();
  }, []);

  return (
    <Card className={classes.placeItem}>
      <div className={classes.userBox}>
        <div className={classes.userProfile}>
          <div className={classes.imgBox}>
            <img src={profileData.image} alt={profileData.firstName} />
          </div>
          <span>
            {profileData.firstName} {profileData.lastName}
          </span>
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
      <hr />
      <div className={classes.actions}>
        <Button to={props.id}>DETAIL</Button>
      </div>
    </Card>
  );
}

export default PlaceItem;
