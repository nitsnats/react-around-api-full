import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ onUpdateAvatar, isOpen, onClose, isLoading }) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    
    e.preventDefault();
    const avatarValue = avatarRef.current.value;
    onUpdateAvatar({ avatar: avatarValue });
    
  }

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = ''
     }
   }, [isOpen]) 
   

  return (
    <PopupWithForm
      title={"Update profile picture"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
      isLoading={isLoading}
    >
      <input
        id="card-link-change"
        className="popup__input popup__input_type_card-link"
        type="url"
        name="card-link"
        placeholder="picture"
        required
        ref={avatarRef}
      />
      <span id="card-link-change-error" className="popup__input-error" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
