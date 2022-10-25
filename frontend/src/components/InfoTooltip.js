import React from "react";
import successIcon from "../images/success_icon.svg";
import unsuccessIcon from "../images/unsuccess_icon.svg";

const successful = "Success! You have now been registered.";
const unsuccessful = "Oops, something went wrong! Please try again.";

const InfoToolTip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div
      className={`popup popup_type-tooltip ${isOpen ? "popup__opened" : ""}`}
    >
      <div className="popup__item popup__item-tooltip">
        <button
          type="button"
          className="popup__close popup__close_tooltip"
          name="close"
          onClick={onClose}
        ></button>
        {isSuccess === "successful" ? (
          <div className="popup__container">
            <img className="popup__icon" src={successIcon} alt="Success Icon" />
            <p className="popup__status-message">{successful}</p>
          </div>
        ) : (
          <div className="popup__container">
            <img
              className="popup__icon"
              src={unsuccessIcon}
              alt="Unsuccess Icon"
            />
            <p className="popup__status-message">{unsuccessful}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoToolTip;
