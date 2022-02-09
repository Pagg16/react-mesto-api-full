class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Карточки======================================================================================================================
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  sendingCardServer(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  cardLikeLink(id, isLiked) {
    if(isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._responseFromServer(res);
    });
  } else {
    return this.cardDelLikeLink(id);
  }
  }

  cardDelLikeLink(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  cardDelLink(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  //Данные пользователя==================================================================================
  getinfouser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  getinfouserDispatch(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  dispatchAvatarUser(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }
  //============================================================================================================

  //Функция обработки ответа от сервера

  _responseFromServer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-29",
  headers: {
    authorization: "056e8062-0d04-4d77-b94c-9ff9ca769110",
    "Content-Type": "application/json",
  },
});

export default api;
