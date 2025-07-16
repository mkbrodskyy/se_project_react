// import ItemCard from "../ItemCard/ItemCard}";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="item-card__like-container">
        {isLoggedIn && (
          <button
            className={`item-card__like-btn${
              isLiked ? " item-card__like-btn_active" : ""
            }`}
            onClick={handleLike}
          >
            {isLiked ? "Unlike" : "Like"}
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
