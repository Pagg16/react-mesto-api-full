import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleting(props) {
  function handleDeleteClick(e) {
    e.preventDefault();
    props.onCardDelete();
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      textButton={props.textButton}
      activeValid={true}
      onClose={props.onClose}
      title={"Вы уверены?"}
      onSubmit={handleDeleteClick}
    />
  );
}

export default PopupDeleting;
