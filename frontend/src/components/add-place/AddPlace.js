import React, { useContext } from "react";
import Form from "../../shared/UiElements/Form";
import Input from "../../shared/UiElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import PlaceImg from "../../assets/undraw_augmented_reality_re_f0qd.svg";
import classes from "./AddPlace.module.css";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/UiElements/Button";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";
import { url } from "../../shared/util/url";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

function AddPlace(props) {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [inputHandler, formState] = useForm(
    props.initialState || {
      title: { value: "", isValid: false },
      address: { value: "", isValid: false },
      description: { value: "", isValid: false },
      isValid: false,
    }
  );

  const submithandler = (e) => {
    e.preventDefault();

    sendRequest(
      url + `api/v1/place`,
      "POST",
      {
        title: formState.title.value,
        address: formState.address.value,
        description: formState.description.value,
      },
      "include",
      { "Content-Type": "application/json" },
      () => {
        navigate("/places");
      }
    );
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Form
        onSubmit={submithandler}
        className={classes.addPlace}
        title={!props.initialState ? "Add Place" : "Update Place"}
        img={PlaceImg}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          placeholder="Title"
          errorMsg="Please enter a valid title!"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.title.isValid}
          value={formState.title.value}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          placeholder="Address"
          errorMsg="Please enter a valid address!"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.address.isValid}
          value={formState.address.value}
        />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          placeholder="Description"
          errorMsg="Please enter a valid description!"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.description.isValid}
          value={formState.description.value}
        />
        <Button disabled={!formState.isValid} type="submit">
          {!props.initialState ? "Add New Place" : "Updata Place"}
        </Button>
      </Form>
    </>
  );
}

export default AddPlace;
