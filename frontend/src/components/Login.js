import React from "react";
import { withRouter } from "react-router-dom";
import * as auth from "../utils/auth";
import LoginApplicationPopup from "./LoginApplicationPopup";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Login(props) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = () => {
    auth
      .authorize(values.inputOne, values.inputTwo)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        props.checkToken();
      })
      .catch((err) => {
        console.log(err);
        props.setIsFailureRegistrationOpen(true);
      });
  };

  return (
    <LoginApplicationPopup
      textButton={"Войти"}
      welcomeText={"Вход"}
      handleSubmit={handleSubmit}
      activeValid={isValid.inputOne === true && isValid.inputTwo === true}
    >
      <input
        placeholder="Email"
        id="email"
        name="inputOne"
        type="email"
        value={values.inputOne}
        onChange={handleChange}
        className="register__filed"
        minLength={2}
        maxLength={100}
        autoComplete="off"
        required
      />
      <span
        className={`error ${isValid.inputOne ? "" : "popup__error_visible"}`}
      >
        {errors.inputOne}
      </span>
      <input
        placeholder="Пароль"
        id="password"
        name="inputTwo"
        type="password"
        value={values.inputTwo}
        onChange={handleChange}
        className="register__filed"
        minLength={5}
        maxLength={30}
        autoComplete="off"
        required
      />
      <span
        className={`error ${isValid.inputTwo ? "" : "popup__error_visible"}`}
      >
        {errors.inputTwo}
      </span>
    </LoginApplicationPopup>
  );
}

export default withRouter(Login);
