import React from "react";
import classes from "./Profile.module.css";

function Profile(props) {
  return (
    <div className={classes.profile}>
      <div className={classes.imgBox}>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.informationBox}>
        <h3>Name: Tanju özer</h3>
        <p>Email: test@mail.com</p>
        <p>From: Usak</p>
        <p>Shared Photos: 3</p>
        <p>Shared Places: Ankara, Istanbul, Adana</p>
      </div>
    </div>
  );
}

export default Profile;
