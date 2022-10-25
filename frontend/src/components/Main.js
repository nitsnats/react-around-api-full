import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";

const Main = ({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  handleDeleteClick,
  }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatarClick}>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="jacques cousteau pic"
          />
        </div>
        <div className="profile__info">
          <div className="profile__item">
            <h1 className="profile__title profile__title_type_title">
              {currentUser.name}
            </h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfileClick}
            />
          </div>
          <p className="profile__description profile__description_type_description">
            {currentUser.about}
          </p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlaceClick}
        />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            {...card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
