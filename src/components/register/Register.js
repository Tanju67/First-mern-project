import React from "react";
import Form from "../../shared/UiElements/Form";
import Input from "../../shared/UiElements/Input";
import Button from "../../shared/UiElements/Button";
import SignupImg from "../../assets/undraw_authentication_re_svpt.svg";
import classes from "./register.module.css";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

function Register() {
  const [inputHandler, formState] = useForm({
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
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
      className={classes.register}
      title="Sign Up"
      text="Do you have already an account?"
      link="login"
      linkTitle="Login"
      img={SignupImg}
    >
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        placeholder="Name"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(6)]}
      />
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        placeholder="Email"
        onInput={inputHandler}
        validators={[VALIDATOR_EMAIL()]}
      />
      <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        placeholder="Password"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(6)]}
      />
      <Button disabled={!formState.isValid} type="submit">
        Sign Up
      </Button>
    </Form>
  );
}

export default Register;
