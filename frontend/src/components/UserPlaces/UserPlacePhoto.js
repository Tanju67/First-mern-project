import React from "react";
import { url } from "../../shared/util/url";
import classes from "./UserPlacePhoto.module.css";
import { Link } from "react-router-dom";

function UserPlacePhoto(props) {
  console.log(props);
  return (
    <div className={classes.columnBox}>
      <div className={classes.column}>
        {props.columnFirst.map(
          (c) =>
            c && (
              <Link key={c.id} to={`/places/${c.id}`}>
                <div
                  className={classes.image}
                  data-after={`${c.title} \nClick for detail`}
                >
                  <img key={c.id} src={url + c.image} alt={props.title} />
                </div>
              </Link>
            )
        )}
      </div>
      <div className={classes.column}>
        {props.columnSecond.map(
          (c) =>
            c && (
              <Link key={c.id} to={`/places/${c.id}`}>
                <div
                  className={classes.image}
                  data-after={`${c.title} \nClick for detail`}
                >
                  <img key={c.id} src={url + c.image} alt={props.title} />
                </div>
              </Link>
            )
        )}
      </div>
      <div className={classes.column}>
        {props.columnThird.map(
          (c) =>
            c && (
              <Link key={c.id} to={`/places/${c.id}`}>
                <div
                  className={classes.image}
                  data-after={`${c.title} \nClick for detail`}
                >
                  <img key={c.id} src={url + c.image} alt={props.title} />
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default UserPlacePhoto;
