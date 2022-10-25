import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = ({ email, isLoggedIn, signOut }) => {
  const [isShowHeader, setIsShowHeader] = useState(false);

  return (
    <header className="header">
      {isShowHeader && (
        <div className="header__user-details-mobile">
          <HeaderMenu email={email} signOut={signOut} isLoggedIn={isLoggedIn} />
        </div>
      )}
      <div className="header__container">
        <img className="header__image" src={logo} alt="Logo pic" />

        <div className="header__navbar">
          <button
            className={isShowHeader ? "header__menu-close" : "header__menu"}
            onClick={() => setIsShowHeader((show) => !show)}
          ></button>
          <div className="header__user-details">
            <HeaderMenu
              email={email}
              signOut={signOut}
              isLoggedIn={isLoggedIn}
            />
          </div>
          <div className="header__link-item"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

function HeaderMenu({ email, signOut, isLoggedIn }) {
  const location = useLocation();

  return (
    <div className="header__wrapper">
      {isLoggedIn ? (
        <>
          <p className="header__email">{email}</p>
          <button className="header__text" onClick={signOut}>
            Log Out
          </button>
        </>
      ) : (
        <Link
          to={location.pathname === "/signin" ? "/signup" : "signin"}
          className="header__link"
        >
          {location.pathname === "/signin" ? "Sign up" : "Log in"}
        </Link>
      )}
    </div>
  );
}
