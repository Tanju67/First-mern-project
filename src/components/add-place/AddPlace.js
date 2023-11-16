import React from "react";
import Form from "../../shared/UiElements/Form";
import Input from "../../shared/UiElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import PlaceImg from "../../assets/undraw_augmented_reality_re_f0qd.svg";
import classes from "./AddPlace.module.css";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import Button from "../../shared/UiElements/Button";

function AddPlace() {
  const [inputHandler, formState] = useForm({
    title: { value: "", isValid: false },
    address: { value: "", isValid: false },
    description: { value: "", isValid: false },
    isValid: false,
  });

  console.log(formState);

  const submithandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <Form
      onSubmit={submithandler}
      className={classes.addPlace}
      title="Add Place"
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
        validators={[VALIDATOR_MINLENGTH(6)]}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        placeholder="Address"
        errorMsg="Please enter a valid address!"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(6)]}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        placeholder="Description"
        errorMsg="Please enter a valid description!"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(6)]}
      />
      <Button disabled={!formState.isValid} type="submit">
        Add New Place
      </Button>
    </Form>
  );
}

export default AddPlace;
