import React, { useCallback, useEffect, useReducer, useState } from "react";
import Input from "../../shared/UiElements/Input";
import LoginImg from "../../assets/undraw_secure_login_pdn4.svg";
import Button from "../../shared/UiElements/Button";
import Form from "../../shared/UiElements/Form";
import classes from "./login.module.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL":
      return {
        ...state,
        email: { value: action.payload, isValid: action.isValid },
      };

    case "PASSWORD":
      return {
        ...state,
        password: { value: action.payload, isValid: action.isValid },
      };

    case "VALID":
      return {
        ...state,
        isValid: state.email.isValid && state.password.isValid,
      };

    default:
      return state;
  }
};

function Login() {
  const [formState, dispatch] = useReducer(formReducer, {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    isValid: false,
  });
  const submithandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  const inputHandler = useCallback((id, value, isValid) => {
    if (id === "email") {
      dispatch({ type: "EMAIL", payload: value, isValid: isValid });
    } else {
      dispatch({ type: "PASSWORD", payload: value, isValid: isValid });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "VALID" });
  }, [formState.email.isValid, formState.password.isValid]);

  return (
    <Form
      onSubmit={submithandler}
      className={classes.login}
      title="Login"
      text="Doesn't have an account yet?"
      link="register"
      linkTitle="Sign Up"
      img={LoginImg}
    >
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
        Login
      </Button>
    </Form>
  );
}

export default Login;
