import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } =
    useFormAndValidation();

  const dataUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: values.inputOne,
      about: values.inputTwo,
    });
    resetForm();
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setValues({ inputOne: dataUser.name, inputTwo: dataUser.about });
      setIsValid({inputOne: true, inputTwo: true})
    }
  }, [props.isOpen, dataUser, setValues, setIsValid]);

  function clickingCloseButton() {
    props.onClose();
    resetForm();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={clickingCloseButton}
      name={"popup-profile"}
      textButton={props.textButton}
      title={"Редактировать профиль"}
      activeValid={isValid.inputOne === true && isValid.inputTwo === true}
    >
      <input
        value={values.inputOne}
        onChange={handleChange}
        type="text"
        id="user-name"
        name="inputOne"
        placeholder="Имя"
        className="popup__filed"
        minLength={2}
        maxLength={40}
        autoComplete="off"
        required
      />
      <span
        className={`error user-name-error ${
          isValid.inputOne ? "" : "popup__error_visible"
        }`}
      >
        {errors.inputOne}
      </span>
      <input
        value={values.inputTwo}
        onChange={handleChange}
        type="text"
        id="user-job"
        name="inputTwo"
        placeholder="Работа"
        className="popup__filed"
        minLength={2}
        maxLength={200}
        autoComplete="off"
        required
      />
      <span
        className={`error user-job-error ${
          isValid.inputTwo ? "" : "popup__error_visible"
        }`}
      >
        {errors.inputTwo}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
