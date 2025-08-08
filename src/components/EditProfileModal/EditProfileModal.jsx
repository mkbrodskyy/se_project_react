import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeBtn from "../../assets/closebtn.svg";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <form className="modal__content" onSubmit={handleSubmit}>
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeBtn} alt="Close" />
        </button>
        <h2 className="modal__title">Change profile data</h2>
        <label className="modal__label modal__label_type_profile">
          Name *
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            minLength="1"
            maxLength="30"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="modal__label modal__label_type_profile">
          Avatar *
          <input
            type="url"
            className="modal__input"
            id="avatar"
            placeholder="Avatar URL"
            name="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="modal__add-garment-btn"
        >
          {isLoading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfileModal;
