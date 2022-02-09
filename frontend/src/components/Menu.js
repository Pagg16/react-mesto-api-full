import React from "react";

function СhickenburerMenu(props) {
  return (
    <div
      className={`header__burger-menu ${
        props.activeBurger ? "header__burger-menu_active" : ""
      }`}
    >
      {props.children}
    </div>
  );
}

export default СhickenburerMenu;
