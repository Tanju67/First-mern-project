import React from "react";

import classes from "./Home.module.css";

import HeaderImage from "../../assets/headerImage.svg";
import Button from "../../shared/UiElements/Button";

function Home() {
  return (
    <header className={classes.header}>
      <div className={classes["header_text-box"]}>
        <h1>
          The<span>Wonderful</span>World
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque
          convallis a cras semper auctor. Lectus sit amet est placerat in
          egestas.
        </p>

        <Button to={"login"}>Discover</Button>
      </div>
      <div className={classes["header_img-box"]}>
        <img src={HeaderImage} alt="resim" />
      </div>
    </header>
  );
}

export default Home;
