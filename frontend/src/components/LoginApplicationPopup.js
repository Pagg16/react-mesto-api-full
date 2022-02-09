import React from "react";

function LoginApplicationPopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  };
  return (
    <div className="register">
      <p className="register__welcome">{props.welcomeText}</p>
      <form onSubmit={handleSubmit} className="register__form">
        {props.children}
        <button
          type="submit"
          onSubmit={handleSubmit}
          className={`register__button ${
            props.activeValid
              ? "register__button_hover"
              : "register__button_disabled"
          }`}
          disabled={!props.activeValid}
        >
          {props.textButton}
        </button>
      </form>
      {props.loginElement}
    </div>
  );
}

export default LoginApplicationPopup;
