import React, { useContext, useState } from "react";
import Card from "../../shared/UiElements/Card";
import classes from "./UserPlaceItem.module.css";
import Button from "../../shared/UiElements/Button";
import Modal from "../../shared/UiElements/Modal";
import Map from "../../shared/UiElements/Map";
import { AuthContext } from "../../shared/context/auth-context";

function UserPlaceItem(props) {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const displayModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const showDeleteModalHandler = () => {
    setDeleteModal(true);
  };

  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  const confirmDeleteHandler = () => {
    setDeleteModal(false);
  };
  return (
    <>
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header={props.title}
        footer={<Button onClick={closeModalHandler}>Close</Button>}
      >
        <Map center={{ lat: 15, lng: 15 }} zoom={6} />
      </Modal>
      <Modal
        show={deleteModal}
        onCancel={closeDeleteModalHandler}
        header="Are You Sure?"
        footer={
          <>
            <Button onClick={closeDeleteModalHandler}>Cancel</Button>
            <Button onClick={confirmDeleteHandler}>Delete</Button>
          </>
        }
      >
        <p className={classes.deleteModalText}>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li>
        <Card className={classes.place}>
          <div className={classes.placeBox}>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>{props.address}</p>
            <hr />
            <div className={classes.action}>
              <Button onClick={displayModalHandler}>View on map</Button>
              {authCtx.user.userId === props.creator && (
                <>
                  <Button to={`/user-places/edit/${props.id}`}>Edit</Button>
                  <Button onClick={showDeleteModalHandler}>Delete</Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </li>
    </>
  );
}

export default UserPlaceItem;
