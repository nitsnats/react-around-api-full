class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(res.statusText);

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }  


  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
  
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }
  
  createCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    })
  }
    
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    })
  }

  editProfile(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    })
  }

  editAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
  }

  addLike(id) {
    return this._request(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: "PUT",
    })
  }

  removeLike(id) {
    return this._request(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: "DELETE",
    })
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",//'https://api.nomoreparties.co'
  headers: {
    authorization: "4cdae314-7e8a-4bed-8ada-70ad33c12e13",//`bearer ${localStorage.getItem('jwt)}`
    "Content-Type": "application/json",//-no need
  },
});

export default api;