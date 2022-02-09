import React from "react";
import logo from "../images/Vector.svg";
import { Link, useLocation, withRouter } from "react-router-dom";
import СhickenburerMenu from "./Menu";

function Header(props) {
  function signOut() {
    setActiveBurger(false);
    props.setLoggedIn(false);
    localStorage.removeItem("jwt");
    props.history.push("/sign-in");
  }

  React.useEffect(() => {
    window.addEventListener("resize", windowSize);
  }, []);

  function windowSize() {
    if (window.innerWidth > 769) {
      setActiveBurger(false);
    }
  }

  const [exactlyActiveBurger, setexactlyActiveBurger] = React.useState(false);

  const [activeBurger, setActiveBurger] = React.useState(false);

  const { pathname } = useLocation();

  const path = `${pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`;

  const textPath = `${pathname === "/sign-in" ? "Регистрация" : "Войти"}`;

  const menuComponent = (
    <>
      <p className="header__navigation">{props.email}</p>
      <button
        className="header__navigation-button"
        to="/sign-in"
        onClick={signOut}
      >
        Выйти
      </button>
    </>
  );

  return (
    <>
      <СhickenburerMenu activeBurger={activeBurger}>
        {menuComponent}
      </СhickenburerMenu>
      <header
        className={`header ${activeBurger ? "header__active-burger" : ""}`}
      >
        <img alt="логотип" className="header__logo" src={logo} />
        {props.loggedIn ? (
          <>
            <div className="header__email-text">{menuComponent}</div>
            <button
              onClick={() => {
                setActiveBurger(!activeBurger);
              }}
              className={`header__button-burger ${
                activeBurger ? "header__button-burger_active" : ""
              }`}
            ></button>
          </>
        ) : (
          <Link
            to={path}
            className="header__navigation header__navigation_link"
          >
            {textPath}
          </Link>
        )}
      </header>
    </>
  );
}

export default withRouter(Header);
