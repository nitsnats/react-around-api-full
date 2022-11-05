class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(res.statusText);

  _request(url, headers) {
    return fetch(url, headers).then(this._checkResponse)
  }  


  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }
  
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }
  
  createCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
  }
    
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "DELETE",
    })
  }

  editProfile(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    })
  }

  editAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
  }

  addLike(id) {
    return this._request(`${this._baseUrl}/cards/likes/${id}`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "PUT",
    })
  }

  removeLike(id) {
    return this._request(`${this._baseUrl}/cards/likes/${id}`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "DELETE",
    })
  }
}

export const api = new Api({
    //baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",//'https://api.nomoreparties.co'
  baseUrl: "http://localhost:3001",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`, // "4cdae314-7e8a-4bed-8ada-70ad33c12e13"
    "Content-Type": "application/json",//-no need
  },
});

export default api;