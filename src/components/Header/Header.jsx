import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import React, { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onSignUp,
  onSignIn,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="App logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__navigation">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                <img
                  src={currentUser?.avatar || avatar}
                  alt="User avatar"
                  className="header__avatar"
                  style={{ width: 32, height: 32, borderRadius: "50%" }}
                />
              </div>
            </Link>
          </>
        ) : (
          <div className="header__user-container">
            <button
              onClick={onSignUp}
              type="button"
              className="header__add-clothes-btn"
            >
              Sign Up
            </button>
            <button
              onClick={onSignIn}
              type="button"
              className="header__add-clothes-btn"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
