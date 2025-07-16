import React, { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import "../../assets/avatar.png";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id // or item.owner._id if owner is an object
  );

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button className="profile__edit-btn" onClick={onEditProfile}>
          Edit Profile
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={userItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
