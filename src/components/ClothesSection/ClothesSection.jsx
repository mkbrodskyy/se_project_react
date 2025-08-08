import React from "react";
import "../SideBar/SideBar.css";
import { Link } from "react-router-dom";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  handleAddClick,
  clothingItems,
  onCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button
          className="clothes-section__add-clothes-btn"
          onClick={handleAddClick}
          type="button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
