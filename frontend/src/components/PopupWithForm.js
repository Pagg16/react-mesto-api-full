import React from "react";

function PopupWithForm(props) {
  function closeClick(event) {
    if (event.target.classList.contains("popup")) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
      onMouseDown={closeClick}
    >
      <div className="popup__container">
        <h2 className="popup__text">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          className="popup__form"
          name={props.name}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            className={`popup__submit-button ${
              props.activeValid
                ? "popup__submit-button_hover"
                : "popup__button_disabled"
            }`}
            disabled={!props.activeValid}
          >
            {props.textButton}
          </button>
        </form>
        <button
          aria-label="Close"
          type="button"
          className="popup__button-close"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
