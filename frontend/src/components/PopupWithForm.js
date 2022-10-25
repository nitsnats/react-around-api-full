import React from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  isLoading,
  buttonText,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup__opened" : ""}`}
    >
      <div className="popup__item">
        <button
          type="button"
          className="popup__close"
          name="close"
          onClick={onClose}
        />
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            type="submit"
            className="popup__save popup__save_type_edit-profile"
            name="Save"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
