import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import { getItems, addItem, removeItem } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    city: "",
    isDay: false,
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setActiveModal("confirm-delete");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weatherType }) => {
    // add the clothing item to the server (fetch request, then block)
    // adds tne new clothing item visually to the dom

    return addItem(name, imageUrl, weatherType).then((newItem) => {
      setClothingItems([newItem, ...clothingItems]);
      closeActiveModal();
    });

    // setClothingItems([
    //   { name, imageUrl, weather: weatherType },
    //   ...clothingItems,
    // ]);
    // event.target.reset();
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeItem(itemToDelete)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemToDelete)
          );
          // setIsConfirmationModalOpen(false);
          closeActiveModal();
          setItemToDelete(null);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          activeModal={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteClick={handleDeleteClick}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeActiveModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
