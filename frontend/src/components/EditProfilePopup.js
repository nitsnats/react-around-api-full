import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // After loading the current user from the API
  // their data will be used in managed components.

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values of the managed components to the external handler
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
      name="edit"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id="name-input"
        className="popup__input popup__input_type_name"
        type="text"
        name="Name"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span id="name-input-error" className="popup__input-error" />
      <input
        id="description-input"
        className="popup__input popup__input_type_description"
        type="text"
        name="description"
        placeholder="About me"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span id="description-input-error" className="popup__input-error" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
