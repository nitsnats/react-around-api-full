import React from "react";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";

function Card({
  name,
  likes,
  link,
  _id,
  owner,
  onCardClick,
  onCardLike,
  onCardDelete,
  handleDeleteClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current card
  const isOwn = owner._id === currentUser._id;

  // Creating a variable for the delete button
  //const cardDeleteButtonClassName = 'element__button-delete_visible';
  const cardDeleteButtonClassName = `element__button-delete ${
    isOwn ? "element__button-delete_visible" : ""
  }`;

  // Check if the card was liked by the current user
  const isLiked = likes.some((user) => user._id === currentUser._id);

  // Creating a variable for the like button
  //const cardLikeButtonClassName = 'element__button-like_active';
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? "element__button-like_active" : ""
  }`;

  function handleClick() {
    onCardClick({ name, link, likes });
  }

  const handleLikeClick = () => {
    onCardLike({ _id, likes });
  };

  function handleDelete() {
    handleDeleteClick(_id);
  }

  // props
  //   function handleClick() {
  //     props.onCardClick(props.name, props.link);
  //   }
  return (
    <article className="element card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDelete}
      ></button>
      <div> 
        <img className="element__image"
        src={link}
        alt={name}
        onClick={handleClick}
        ></img>
      </div>
      <div className="element__wrap">
        <h2 className="element__title">{name}</h2>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <div className="element__likes-count">{likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
