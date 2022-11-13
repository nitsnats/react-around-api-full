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


  getInitialCards(token) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }
  
  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }
  
  createCard(data, token) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
  }
    
  deleteCard(cardId, token) {    
    return this._request(`${this._baseUrl}/cards/${cardId}`, {   // '/cards/:cardId'
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
  }

  editProfile({name, about}, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    })
  }

  editAvatar({avatar}, token) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    })
  }

  addLike(id, isLiked, token) {
    if (!isLiked) {
    //return this._request(`${this._baseUrl}/cards/likes/${id}`, {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
    })
  }
  }

  removeLike(id, token) {
    //return this._request(`${this._baseUrl}/cards/likes/${id}`, {   
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
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