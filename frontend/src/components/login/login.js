import React, { useContext, useState } from "react";
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
import { url } from "../../shared/util/url";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/UiElements/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../shared/UiElements/LoadingSpinner/LoadingSpinner";

function Login() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [inputHandler, formState] = useForm({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    isValid: false,
  });

  const clearErrorHandler = () => {
    setError(null);
  };

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const responseData = await fetch(url + `api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formState.email.value,
          password: formState.password.value,
        }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await responseData.json();

      if (!responseData.ok) {
        throw new Error(data.message);
      }
      setIsLoading(false);
      authCtx.login(data.userId);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Form
        onSubmit={submithandler}
        className={classes.login}
        title="Login"
        text="Doesn't have an account yet?"
        link="register"
        linkTitle="Sign Up"
        img={LoginImg}
      >
        {isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
}

export default Login;
