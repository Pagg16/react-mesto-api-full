import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [userAvatar, setUserAvatar] = React.useState("");

  const [userAvatarValidity, setUserAvatarValidity] = React.useState(false);

  const [userAvatarErrorMessage, setUserAvatarErrorMessage] =
    React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(
      {
        avatar: userAvatar,
      },
      cleaningFields
    );
  }

  function handleChangeLinkAvatar(e) {
    setUserAvatar(e.target.value);
    setUserAvatarValidity(e.target.validity.valid);
    setUserAvatarErrorMessage(e.target.validationMessage);
  }

  function clickingCloseButton() {
    props.onClose();
    cleaningFields();
  }

  function cleaningFields() {
    setUserAvatar("");
    setUserAvatarValidity(false);
    setUserAvatarErrorMessage("");
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={clickingCloseButton}
      name={"avatar-edit"}
      textButton={props.textButton}
      title={"Обновить аватар"}
      activeValid={userAvatarValidity}
    >
      <input
        value={userAvatar}
        onChange={handleChangeLinkAvatar}
        type="url"
        id="avatar-edit"
        name="edit"
        placeholder="Ссылка на картинку"
        className="popup__filed"
        autoComplete="off"
        required
      />
      <span
        className={`error avatar-edit-error ${
          userAvatarValidity ? "" : "popup__error_visible"
        }`}
      >
        {userAvatarErrorMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
