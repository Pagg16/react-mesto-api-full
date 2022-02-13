import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";
import LoginApplicationPopup from "./LoginApplicationPopup";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Register(props) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  async function handleSubmit() {
    try {
      await auth.register(values.inputOne, values.inputTwo).then((res) => {
        if (res.statusCode !== 400) {
          props.setEmail(values.inputOne);
          props.setIsSuccessfulRegistrationOpen(true);
        }
      });

      await auth.authorize(values.inputOne, values.inputTwo).then((res) => {
        localStorage.setItem("jwt", res.token);
        props.checkToken();
      });
    } catch (err) {
      console.log(err);
      props.setIsFailureRegistrationOpen(true);
    }
  }

  return (
    <LoginApplicationPopup
      textButton={"Зарегистрироваться"}
      welcomeText={"Регистрация"}
      loginElement={
        <div className="register__signin">
          <p className="register__subtitle">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__login-link">
            Войти
          </Link>
        </div>
      }
      handleSubmit={handleSubmit}
      activeValid={isValid.inputOne === true && isValid.inputTwo === true}
    >
      <input
        value={values.inputOne}
        placeholder="Email"
        id="email"
        name="inputOne"
        type="email"
        onChange={handleChange}
        minLength={2}
        maxLength={100}
        className="register__filed"
        autoComplete="off"
      />
      <span
        className={`error ${isValid.inputOne ? "" : "popup__error_visible"}`}
      >
        {errors.inputOne}
      </span>
      <input
        value={values.inputTwo}
        placeholder="Пароль"
        id="password"
        name="inputTwo"
        type="password"
        onChange={handleChange}
        minLength={5}
        maxLength={30}
        className="register__filed"
        autoComplete="off"
      />
      <span
        className={`error ${isValid.inputTwo ? "" : "popup__error_visible"}`}
      >
        {errors.inputTwo}
      </span>
    </LoginApplicationPopup>
  );
}

export default withRouter(Register);
