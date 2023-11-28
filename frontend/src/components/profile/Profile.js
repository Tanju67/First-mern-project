import React from "react";
import Form from "../../shared/UiElements/Form";
import Input from "../../shared/UiElements/Input";
import Button from "../../shared/UiElements/Button";
import classes from "./Profile.module.css";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";
import { url } from "../../shared/util/url";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  const navigate = useNavigate();
  console.log(props.profile);
  const [inputHandler, formState] = useForm(
    props.profile || {
      name: { value: "", isValid: false },
      lastname: { value: "", isValid: false },
      birthyear: { value: "", isValid: false },
      birthcountry: { value: "", isValid: false },
      address: { value: "", isValid: false },
      isValid: false,
    }
  );
  const submithandler = (e) => {
    e.preventDefault();

    sendRequest(
      url + `api/v1/profile`,
      "POST",
      {
        firstName: formState.name.value,
        lastName: formState.lastname.value,
        birthYear: formState.birthyear.value,
        country: formState.birthcountry.value,
        address: formState.address.value,
      },
      "include",
      { "Content-Type": "application/json" },
      () => {
        navigate("/");
      }
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Form
        onSubmit={submithandler}
        className={classes.profile}
        title={!props.profile.isValid ? "Add New Profile" : "Update Profile"}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="First Name"
          placeholder="Your name"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.name.isValid}
          value={formState.name.value}
        />
        <Input
          id="lastname"
          element="input"
          type="text"
          label="Last Name"
          placeholder="Your last name"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.lastname.isValid}
          value={formState.lastname.value}
        />
        <Input
          id="birthyear"
          element="input"
          type="date"
          label="Birth Year"
          placeholder="Your birth year"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.birthyear.isValid}
          value={formState.birthyear.value}
        />

        <Input
          id="birthcountry"
          element="input"
          type="text"
          label="Birth Country"
          placeholder="Where are you from?"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.birthcountry.isValid}
          value={formState.birthcountry.value}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          placeholder="Your address"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          valid={formState.address.isValid}
          value={formState.address.value}
        />
        <Button disabled={!formState.isValid} type="submit">
          {!props.profile.isValid ? "Add New Profile" : "Update Profile"}
        </Button>
      </Form>
    </>
  );
}

export default Profile;
