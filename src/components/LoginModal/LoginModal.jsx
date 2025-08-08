import React, { useState } from "react";
import closeBtn from "../../assets/closebtn.svg";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close" />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Log In</h2>
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
          <div className="modal__submit-wrapper">
            <button type="submit" className="modal__submit-button">
              Log In
            </button>
            <button type="submit" className="modal__submit-button">
              or Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
