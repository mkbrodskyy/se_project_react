import React from "react";
import closeBtn from "../../assets/closebtn.svg";
import "./ItemModal.css";

const ItemModal = ({ activeModal, onClose, card, onDeleteClick }) => {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-container">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="card__delete-button"
              type="button"
              onClick={() => onDeleteClick(card._id)}
              aria-label="Delete card"
            >
              {" "}
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
