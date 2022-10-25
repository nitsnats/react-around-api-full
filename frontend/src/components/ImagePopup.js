import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type-preview ${isOpen ? "popup__opened" : ""}`}
    >
      <div className="popup__item popup__item_preview">
        <button
          type="button"
          className="popup__close popup__close_preview"
          name="close"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__subtitle">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
