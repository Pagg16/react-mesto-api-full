import React from "react";

function ImagePopup(props) {
  function closeClick(event) {
    if (event.target.classList.contains("popup")) {
      props.onClose();
    }
  }
  return (
    <div
      className={`popup popup-images ${
        props.card.link !== "" ? "popup_opened" : ""
      }`}
      onMouseDown={closeClick}
    >
      <div className="popup__image-container">
        <img
          alt={props.card.name}
          className="popup__image-open"
          src={props.card.link}
        />
        <h2 className="popup__image-text">{props.card.name}</h2>
        <button
          aria-label="Close"
          type="button"
          className="popup__button-close popup__button-close_image"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
