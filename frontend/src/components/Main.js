import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  onCardClick,
  cards,
  handleCardLike,
  onCardDelete,
  handlePopupDeletingClick,
}) {
  const dataUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__blackout">
          <img
            alt="аватарка"
            className="profile__avatar"
            src={dataUser.avatar}
          />
          <div
            className="profile__avatar-edit"
            onClick={handleEditAvatarClick}
          />
        </div>
        <div className="profile-info">
          <div className="profile-info__title-button">
            <h1 className="profile-info__title">{dataUser.name}</h1>
            <button
              aria-label="edit"
              type="button"
              className="button button_type_edit"
              onClick={handleEditProfileClick}
            />
          </div>
          <p className="profile-info__subtitle">{dataUser.about}</p>
        </div>
        <button
          aria-label="add"
          type="button"
          className="button button_type_add"
          onClick={handleAddPlaceClick}
        />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            handlePopupDeletingClick={handlePopupDeletingClick}
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
