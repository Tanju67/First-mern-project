import React from "react";
import Form from "../../shared/UiElements/Form";
import Input from "../../shared/UiElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import PlaceImg from "../../assets/undraw_augmented_reality_re_f0qd.svg";
import classes from "./AddPlace.module.css";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Button from "../../shared/UiElements/Button";

function AddPlace(props) {
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
    console.log(formState);
  };
  return (
    <Form
      onSubmit={submithandler}
      className={classes.addPlace}
      title={!props.initialState ? "Add Place" : "Update Place"}
      img={PlaceImg}
    >
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
  );
}

export default AddPlace;
