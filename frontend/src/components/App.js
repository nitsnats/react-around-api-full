import React, { useEffect, useState } from "react";
import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import * as auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreviewImageOpen, setIsPreviewImageOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [selectedCardForDeletion, setSelectedCardForDeletion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  //const [email, setEmail] = useState('');

  useEffect(() => {
    api
      .getUserInfo(token)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch(console.log);
  }, [token]);

  useEffect(() => {
    api
      .getInitialCards(token)
      .then((res) => {
        setCards(res.data);
      })
      .catch(console.log);
  }, [token]);

  useEffect(() => {
    //const jwt = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res.data._id) {
            setIsLoggedIn(true);
            setUserData(res.data); //header
            setCurrentUser(res.data); //profile
            history.push("/main");
          }
        })
        .catch((err) => {
          // console.log(err);
          history.push("/signin");
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, [history]);

  function signOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setUserData("");
    history.push("/signin");
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPreviewImageOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({ name: "", link: "" }); //(undefined)
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsPreviewImageOpen(true);

    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .editProfile({name, about}, token)
      .then((res) => {
        // console.log('res  =======>', res)
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = ({avatar}) => {
    setIsLoading(true);
    api
      .editAvatar({avatar}, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user === currentUser._id);
//console.log('isLiked', isLiked)
    if (isLiked) {
      api
        .removeLike(card._id, token)
        .then((unlikedCard) => {
          const newCards = cards.map((card) => {
            return card._id === unlikedCard._id ? unlikedCard : card;
            
          });
          
          setCards(newCards);
        })
        .catch(console.log);
    } else {
      api
        .addLike(card._id, isLiked, token)

        .then((likedCard) => {
          const newCards = cards.map((card) => {
            return card._id === likedCard._id ? likedCard : card;
          });
          // console.log('likedCard=====>', likedCard)
          setCards(newCards);
        })
        .catch(console.log);
    }
  };

  const handleCardDelete = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(selectedCardForDeletion, token)
      .then((res) => {
        const newCards = cards.filter((c) => c._id !== selectedCardForDeletion);
        setCards(newCards);
        setIsConfirmDeletePopupOpen(false);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleDeleteClick(_id) {
    setIsConfirmDeletePopupOpen(true);
    setSelectedCardForDeletion(_id);
  }

  const handleAddPlaceSubmit = (card) => {
    // if (!name || !link) {
    //   throw new Error("name or link is missing");
    // }
    setIsLoading(true);
    api
      .createCard(card, token)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleRegister({ email, password }) {
    setIsLoading(true);
    auth
      .register(email, password)
      .then((res) => {
        setIsSuccess("successful");
        history.push("/signin");

        setTimeout(() => {
          handleLogin({ email, password });
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess("unsuccessful");
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          setUserData({ email });
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          history.push("/main");
          setIsInfoTooltipOpen(false);
        } else {
          setIsSuccess("unsuccessful");
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setIsSuccess("unsuccessful");
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsCheckingToken(false);
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          email={userData.email}
          signOut={signOut}
          path="/signup"
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/main"
            isLoggedIn={isLoggedIn}
            isCheckingToken={isCheckingToken}
          >
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              handleDeleteClick={handleDeleteClick}
            />
          </ProtectedRoute>

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} isLoading={isLoading} />
          </Route>

          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isPreviewImageOpen}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ConfirmDeletePopup
          onSubmit={handleCardDelete}
          isLoading={isLoading}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
