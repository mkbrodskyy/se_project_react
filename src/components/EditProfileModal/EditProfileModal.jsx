import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

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
          ×
        </button>
        <h2 className="modal__title">Edit Profile</h2>
        <label>
          Name
          <input
            type="text"
            value={name}
            minLength={2}
            maxLength={30}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Avatar URL
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditProfileModal;
