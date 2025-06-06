import React from "react";
import "./ModalWithForm.css";
import closeBtn from "../../assets/closebtn.svg";
import { use } from "react";
import useModalClose from "../../hooks/useModalClose";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) => {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
