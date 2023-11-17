import React from "react";
import Form from "../../shared/UiElements/Form";
import Input from "../../shared/UiElements/Input";
import Button from "../../shared/UiElements/Button";
import classes from "./Profile.module.css";
import { useForm } from "../../shared/hooks/form-hook";

function Profile() {
  const [inputHandler, formState] = useForm({
    name: { value: "", isValid: false },
    lastname: { value: "", isValid: false },
    birthyear: { value: "", isValid: false },
    birthcountry: { value: "", isValid: false },
    address: { value: "", isValid: false },
    isValid: false,
  });
  const submithandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <Form
      onSubmit={submithandler}
      className={classes.profile}
      title="Update Profile"
    >
      <Input
        id="name"
        element="input"
        type="text"
        label="First Name"
        placeholder="Your name"
        onInput={inputHandler}
        validators={[]}
      />
      <Input
        id="lastname"
        element="input"
        type="text"
        label="Last Name"
        placeholder="Your last name"
        onInput={inputHandler}
        validators={[]}
      />
      <Input
        id="birthyear"
        element="input"
        type="date"
        label="Birth Year"
        placeholder="Your birth year"
        onInput={inputHandler}
        validators={[]}
      />

      <Input
        id="birthcountry"
        element="input"
        type="text"
        label="Birth Country"
        placeholder="Where are you from?"
        onInput={inputHandler}
        validators={[]}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        placeholder="Your address"
        onInput={inputHandler}
        validators={[]}
      />
      <Button type="submit">Update</Button>
    </Form>
  );
}

export default Profile;
