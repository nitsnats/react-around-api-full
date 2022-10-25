import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = ({ isOpen, onClose, onSubmit, isLoading }) => {
  
  return (
    <PopupWithForm
      title="Are you sure?"
      name="remove-card"
      //buttonText={"Yes"}
      buttonText={`${isLoading ? "Deleting..." : "Yes"}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default ConfirmDeletePopup;
