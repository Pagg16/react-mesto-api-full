import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupDeleting from "./PopupDeleting";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import errorIcon from "../images/errorIcon.png";
import fortunatelyIcon from "../images/fortunatelyIcon.png";

function App(props) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  //переменные состояния открытия попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarClick] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceClick] = React.useState(false);
  const [isPopupDeletingOpen, setIsPopupDeletingClick] = React.useState(false);
  const [isSuccessfulRegistrationOpen, setIsSuccessfulRegistrationOpen] =
    React.useState(false);
  const [isFailureRegistrationOpen, setIsFailureRegistrationOpen] =
    React.useState(false);

  const [delCard, setDelCard] = React.useState({});

  //текст кнопок при запросе
  const [textButtonAvatar, setTextButtonAvatar] = React.useState("Сохранить");
  const [textButtonUserData, setTextButtonUserData] =
    React.useState("Сохранить");
  const [textButtonNewCard, setTextButtonNewCard] = React.useState("Создание");
  const [textButtonPopupDelCard, setTextButtonPopupDelCard] =
    React.useState("Да");

  //перемнная массива карточек
  const [cards, changeCards] = React.useState([]);

  //переменная с данными пользователя
  const [currentUser, currentUserSet] = React.useState({});

  //переменная открытия картинки с данными картинки
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      // проверяем токен пользователя
      checkToken();
    }
  }, []);

  function checkToken() {
    auth.checkToken(localStorage.getItem("jwt")).then((res) => {
      if (res) {
        setLoggedIn(true);
        setEmail(res.data.email);
        props.history.push("/mainpart");
      }
    });
  }

  //загрузка данных с сервера
  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getinfouser()])
      .then(([cardList, userInfo]) => {
        currentUserSet(userInfo);
        changeCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  //установка лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .cardLikeLink(card._id, !isLiked)
      .then((cardLike) => {
        const newCardsLike = cards.map((c) => {
          return c._id === cardLike._id ? cardLike : c;
        });
        changeCards(newCardsLike);
      })
      .catch((err) => console.log(err));
  }

  //добавление карточки
  function handleAddPlaceSubmit(card, cleaning) {
    setTextButtonNewCard("Сохранение...");
    api
      .sendingCardServer(card)
      .then((addCard) => {
        changeCards([addCard, ...cards]);
        setIsAddPlaceClick(false);
        cleaning();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setTextButtonNewCard("Создание");
      });
  }

  //удаление карточки
  function handleCardDelete() {
    setTextButtonPopupDelCard("Удаление...");
    api
      .cardDelLink(delCard._id)
      .then((res) => {
        changeCards((cards) => cards.filter((c) => c._id !== delCard._id));
        setIsPopupDeletingClick(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setTextButtonPopupDelCard("Да");
      });
  }

  //открытие поста
  function handleCardClick(data) {
    setSelectedCard({ name: data.name, link: data.link });
  }

  //закрытие всех попапов
  function closeAllPopups() {
    setIsEditAvatarClick(false);
    setIsEditProfileClick(false);
    setIsAddPlaceClick(false);
    setSelectedCard({ name: "", link: "" });
    setIsPopupDeletingClick(false);
    setDelCard({});
    setIsFailureRegistrationOpen(false);
    setIsSuccessfulRegistrationOpen(false);
  }

  //закрытие попапов по нажатию на esc
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  //открытие попапа с изменением аватара
  function handleEditAvatarClick() {
    setIsEditAvatarClick(true);
  }

  //открытие попапа с изменением профиля
  function handleEditProfileClick() {
    setIsEditProfileClick(true);
  }

  //открытие попапа с добавлением карточки
  function handleAddPlaceClick() {
    setIsAddPlaceClick(true);
  }

  //открытие попапа с подтверждением удалиения поста
  function handlePopupDeletingClick(card) {
    setDelCard(card);
    setIsPopupDeletingClick(true);
  }

  //обработчик изменения данных пользователя
  function handleUpdateUser(data) {
    setTextButtonUserData("Сохранение...");
    api
      .getinfouserDispatch(data)
      .then((dataUser) => {
        currentUserSet(dataUser);
        setIsEditProfileClick(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setTextButtonUserData("Сохранить");
      });
  }

  //обработка изменения аватара пользователя
  function handleUpdateUserAvatar(avatar, cleaning) {
    setTextButtonAvatar("Сохранение...");
    api
      .dispatchAvatarUser(avatar)
      .then((dataUser) => {
        currentUserSet(dataUser);
        setIsEditAvatarClick(false);
        cleaning();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setTextButtonAvatar("Сохранить");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route path="/sign-in">
            <Login
              setIsFailureRegistrationOpen={setIsFailureRegistrationOpen}
              checkToken={checkToken}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              setIsSuccessfulRegistrationOpen={setIsSuccessfulRegistrationOpen}
              setIsFailureRegistrationOpen={setIsFailureRegistrationOpen}
              setLoggedIn={setLoggedIn}
              setEmail={setEmail}
            />
          </Route>
          <ProtectedRoute
            path="/mainpart"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            handlePopupDeletingClick={handlePopupDeletingClick}
            handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
          >
            <Footer />
          </ProtectedRoute>

          <Route exact path="*">
            {loggedIn ? (
              <Redirect to="/mainpart" />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
        </Switch>
        <EditProfilePopup
          textButton={textButtonUserData}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          textButton={textButtonAvatar}
          onUpdateAvatar={handleUpdateUserAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          textButton={textButtonNewCard}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          handleSubmit={handleAddPlaceSubmit}
        />
        <PopupDeleting
          onCardDelete={handleCardDelete}
          card={delCard}
          isOpen={isPopupDeletingOpen}
          onClose={closeAllPopups}
          textButton={textButtonPopupDelCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isSuccessfulRegistrationOpen}
          text={"Вы успешно зарегистрировались!"}
          image={fortunatelyIcon}
          link={"/mainpart"}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isFailureRegistrationOpen}
          text={"Что-то пошло не так! Попробуйте ещё раз."}
          image={errorIcon}
          link={"/sign-in"}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
