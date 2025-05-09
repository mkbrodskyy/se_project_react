import React from "react";
import "./ModalWithForm.css";
import closeBtn from "../../assets/closebtn.svg";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  onSubmit,
}) => {
  return (
    <div className={`modal ${activeModal ? "modal_opened" : ""}`}>
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
