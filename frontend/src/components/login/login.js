import React, { useContext } from "react";
import Input from "../../shared/UiElements/Input";
import LoginImg from "../../assets/undraw_secure_login_pdn4.svg";
import Button from "../../shared/UiElements/Button";
import Form from "../../shared/UiElements/Form";
import classes from "./login.module.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

function Login() {
  const authCtx = useContext(AuthContext);
  const [inputHandler, formState] = useForm({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    isValid: false,
  });

  console.log(formState);

  const submithandler = (e) => {
    e.preventDefault();
    authCtx.login();
  };

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
        errorMsg="Please enter a valid email!"
        onInput={inputHandler}
        validators={[VALIDATOR_EMAIL()]}
      />
      <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        placeholder="Password"
        errorMsg="Please enter a valid password!"
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
