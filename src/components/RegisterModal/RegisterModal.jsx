import React, { useState } from "react";
import closeBtn from "../../assets/closebtn.svg";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister, onSignIn }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close" />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Sign Up</h2>
          <label className="modal__label modal__label_type_profile">
            Email *
            <input
              type="email"
              className="modal__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="modal__label modal__label_type_profile">
            Password *
            <input
              type="password"
              className="modal__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="modal__label modal__label_type_profile">
            Name *
            <input
              type="text"
              className="modal__input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="modal__label modal__label_type_profile">
            Avatar URL *
            <input
              type="url"
              className="modal__input"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>
          <div className="modal__submit-wrapper">
            <button type="submit" className="modal__submit-button">
              Sign Up
            </button>
            <button
              type="button"
              className="modal__submit-button"
              onClick={() => {
                onClose();
                onSignIn();
              }}
            >
              or Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
