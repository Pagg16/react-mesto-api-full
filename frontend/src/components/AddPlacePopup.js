import React from "react";
import PopupWithForm from "./PopupWithForm";
import { FormValidator } from "./FormValidator.js";
import { dataNamingConfiuration } from "../utils/constans";

function AddPlacePopup(props) {
  const [inputValues, setInputValues] = React.useState({ name: "", link: "" });

  const [validator, setValidator] = React.useState({});

  function handleInputChange(evt) {
    setInputValues({
      ...inputValues,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.handleSubmit(
      {
        name: inputValues.name,
        link: inputValues.link,
      },
      cleaningFields
    );
  }

  React.useEffect(() => {
    const formvalidator = new FormValidator(
      dataNamingConfiuration,
      "popup-posts"
    );

    formvalidator.enableValidation();

    setValidator(formvalidator);
  }, []);

  //тест валидации при помощи классового компонента
  React.useEffect(() => {
    if (props.isOpen) {
      validator.clearingErrorFields();
    }
  }, [props.isOpen, validator]);

  function clickingCloseButton() {
    props.onClose();
    cleaningFields();
  }

  function cleaningFields() {
    setInputValues({ name: "", link: "" });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={clickingCloseButton}
      name={"popup-posts"}
      textButton={props.textButton}
      title={"Новое место"}
      activeValid={true}
    >
      <input
        value={inputValues.name}
        onChange={handleInputChange}
        type="text"
        id="name-card"
        name="name"
        placeholder="Название"
        className="popup__filed"
        minLength={2}
        maxLength={30}
        autoComplete="off"
        required
      />
      <span className="error name-card-error" />
      <input
        value={inputValues.link}
        onChange={handleInputChange}
        type="url"
        id="link-card"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__filed"
        autoComplete="off"
        required
      />
      <span className="error link-card-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
