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
import { getItems, addItem, removeItem, updateUser } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { register, authorize, checkToken } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // <-- Add this import
import EditProfileModal from "../EditProfileModal/EditProfileModal"; // Add this import
import { addCardLike, removeCardLike } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    city: "",
    isDay: false,
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // New state for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  // Universal close modal handler for authentication modals
  const handleCloseModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsEditProfileModalOpen(false);
  };

  // Universal submit handler for handling loading states and modal closing
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setActiveModal("confirm-delete");
  };

  const handleAddItemModalSubmit = (
    { name, imageUrl, weatherType },
    resetForm
  ) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return addItem({ name, imageUrl, weatherType }, token).then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        resetForm();
        closeActiveModal();
      });
    };

    setIsLoading(true);
    makeRequest()
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const makeRequest = () => {
        const token = localStorage.getItem("jwt");
        return removeItem(itemToDelete, token).then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemToDelete)
          );
          setItemToDelete(null);
          closeActiveModal();
        });
      };

      setIsLoading(true);
      makeRequest()
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  // RegisterModal handlers
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);
  const handleRegister = (formData) => {
    const makeRequest = () => {
      return register(formData)
        .then(() => {
          return authorize({
            email: formData.email,
            password: formData.password,
          });
        })
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        })
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        });
    };
    handleSubmit(makeRequest);
  };

  // LoginModal handlers
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleLogin = (formData) => {
    const makeRequest = () => {
      return authorize(formData)
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        })
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        });
    };
    handleSubmit(makeRequest);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleOpenEditProfileModal = () => setIsEditProfileModalOpen(true);
  const handleCloseEditProfileModal = () => setIsEditProfileModalOpen(false);

  const handleUpdateUser = ({ name, avatar }) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return updateUser({ name, avatar }, token).then((updatedUser) => {
        setCurrentUser(updatedUser);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ _id, isLiked }) => {
    // console.log("handleCardLike called:", { _id, isLiked });
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      // console.log("Adding like for card:", _id);
      addCardLike(_id, token)
        .then((updatedCard) => {
          // console.log("Like added, updated card:", updatedCard);
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      // console.log("Removing like for card:", _id);
      removeCardLike(_id, token)
        .then((updatedCard) => {
          // console.log("Like removed, updated card:", updatedCard);
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

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
        console.log("Items loaded from API:", data);
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onSignUp={handleOpenRegisterModal}
              onSignIn={handleOpenLoginModal}
              onSignOut={handleSignOut}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      onEditProfile={handleOpenEditProfileModal} // <-- Add this prop
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            onConfirm={handleConfirmDelete}
            isLoading={isLoading}
          />
          {isRegisterModalOpen && (
            <RegisterModal
              isOpen={isRegisterModalOpen}
              onClose={handleCloseRegisterModal}
              onRegister={handleRegister}
              onSignIn={handleOpenLoginModal}
              isLoading={isLoading}
            />
          )}
          {isLoginModalOpen && (
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={handleCloseLoginModal}
              onLogin={handleLogin}
              onSignUp={handleOpenRegisterModal}
              isLoading={isLoading}
            />
          )}
          {isEditProfileModalOpen && (
            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={handleCloseEditProfileModal}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
