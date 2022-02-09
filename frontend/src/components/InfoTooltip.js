import React from "react";

function InfoTooltip(props) {
  function closeClick(event) {
    if (event.target.classList.contains("popup")) {
      props.onClose();
    }
  }
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      onMouseDown={closeClick}
    >
      <div className="popup__container">
          <img alt="иконка" className="popup__icon" src={props.image} />
        <p className="popup__title">{props.text}</p>
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

export default InfoTooltip;
