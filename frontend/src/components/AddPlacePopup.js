import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ onAddPlaceSubmit, isOpen, onClose, isLoading }) => {
  const [cardName, setCardName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({ name: cardName, link });
  }

  useEffect(() => {
    setCardName('');
    setLink('');
  }, [isOpen]);

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title={"New place"}
      isOpen={isOpen}
      onClose={onClose}
      //buttonText={"Create"}
      buttonText={`${isLoading ? "Creating..." : "Create"}`}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id="card-title-input"
        className="popup__input popup__input_type_card-title"
        type="text"
        name="card-title"
        placeholder="Card title"
        required
        minLength="1"
        maxLength="30"
        value={cardName}
        //onChange={e => setCardName(e.target.value)}
        onChange={handleCardNameChange}
      />
      <span id="card-title-input-error" className="popup__input-error" />
      <input
        id="card-link-input"
        className="popup__input popup__input_type_card-link"
        type="url"
        name="card-link"
        placeholder="Card link"
        required
        value={link}
        //onChange={e => setLink(e.target.value)}
        onChange={handleCardLinkChange}
      />
      <span id="card-link-input-error" className="popup__input-error" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
