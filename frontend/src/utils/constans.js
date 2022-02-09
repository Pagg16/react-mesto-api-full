export const dataNamingConfiuration = {
    // конфигурация названий классов для валидации
    formSelector: ".popup__form",
    inputSelector: ".popup__filed",
    popupSubmitButtonHover: "popup__submit-button_hover",
    popopImage: "popup-images",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
  
  export const dataNamingClass = {
    // конфигурация названий классов для карточки
    postElement: ".element",
    rectangleButtonLikeActive: "rectangle__button-like_active",
    buttonDelitePost: ".element__button-delete-post",
    rectangleButtonLike: ".rectangle__button-like",
    buttonImageOpen: ".element__button-image-open",
    elementImage: ".element__image",
    rectangleText: ".rectangle__text",
  };
  
  export const namingСonfigurator = {
    //конфигурация классов
    popupProfile: ".popup-profile",
    popupPosts: ".popup-posts",
    openPopupButton: ".button_type_edit",
    openPopupButtonPost: ".button_type_add",
    formElementCards: ".form-cards",
    formElementProfile: ".form-profile",
    nameInput: 'input[name="name"]',
    jobInput: 'input[name="job"]',
    profileInfoTitle: ".profile-info__title",
    profileInfoSubtitle: ".profile-info__subtitle",
    postsElement: ".elements",
    titleInput: 'input[name="title"]',
    linknput: 'input[name="link"]',
    postElement: "post-element",
    buttonSubmitPost: ".popup__submit-button_post",
    popupSubmitButtonHover: "popup__submit-button_hover",
    openPopupClass: "popup_opened",
    popup: "popup",
    popupButtonClose: "popup__button-close",
    popupImage: ".popup-images",
    popupImageOpen: ".popup__image-open",
    popupImageText: ".popup__image-text",
  };
  
  export const initialCards = [
    //массив с карточками
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
  
  export const popupProfile = document.querySelector(namingСonfigurator.popupProfile); // попап редактирования профиля
  export const popupPosts = document.querySelector(namingСonfigurator.popupPosts); // попап добавления поста
  
  export const openPopupButton = document.querySelector(
    namingСonfigurator.openPopupButton
  ); // кнопка отправки данных об имени и работе
  export const openPopupButtonPost = document.querySelector(
    namingСonfigurator.openPopupButtonPost
  ); // кнопка открытия окна для публикации поста