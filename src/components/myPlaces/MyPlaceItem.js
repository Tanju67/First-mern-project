import React, { useState } from "react";
import Card from "../../shared/UiElements/Card";
import classes from "./MyPlaceItem.module.css";
import Button from "../../shared/UiElements/Button";
import Modal from "../../shared/UiElements/Modal";

function MyPlaceItem(props) {
  const [showModal, setShowModal] = useState(false);
  const displayModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Card className={classes.place}>
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header={props.title}
        footer={<Button onClick={closeModalHandler}>Close</Button>}
      />
      <div className={classes.placeBox}>
        <img src={props.image} alt={props.title} />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <div className={classes.action}>
          <Button onClick={displayModalHandler}>View on map</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      </div>
    </Card>
  );
}

export default MyPlaceItem;
