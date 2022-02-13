class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Объединение запросов=================================================================================================================
  getPageInfo(token) {
    this._token = token;

    return Promise.all([this.getinfouser(), this.getInitialCards()]);
  }

  //Карточки======================================================================================================================
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  sendingCardServer(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  cardLikeLink(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this._token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return this._responseFromServer(res);
      });
    } else {
      return this.cardDelLikeLink(id);
    }
  }

  cardDelLikeLink(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  cardDelLink(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  //Данные пользователя==================================================================================
  getinfouser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._responseFromServer(res);
    });
  }

  getinfouserDispatch(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
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
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
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
  baseUrl: "https://api.pashoki.students.nomoredomains.xyz",
});

export default api;
