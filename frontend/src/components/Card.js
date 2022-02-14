import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const dataUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function cardLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.handlePopupDeletingClick(props.card);
  }

  const isOwn = props.card.owner === dataUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i === dataUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `rectangle__button-like_active`;

  return (
    <article className="element">
      <button
        aria-label="open"
        type="button"
        className="element__button-image-open"
        onClick={handleClick}
      >
        <img
          alt={props.card.name}
          className="element__image"
          src={props.card.link}
        />
      </button>
      <button
        type="button"
        className={`element__button-delete-post ${
          isOwn ? "element__button-delete-post_active" : ""
        }`}
        onClick={handleDeleteClick}
      />
      <div className="rectangle">
        <h2 className="rectangle__text">{props.card.name}</h2>
        <div className="rectangle__like-box">
          <button
            type="button"
            className={`rectangle__button-like ${
              isLiked ? cardLikeButtonClassName : ""
            }`}
            onClick={cardLikeClick}
          />
          <p className="rectangle__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
