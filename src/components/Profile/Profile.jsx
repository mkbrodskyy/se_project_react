import SideBar from "../SideBar/SideBar";
import "../../assets/avatar.png";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, handleAddClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
