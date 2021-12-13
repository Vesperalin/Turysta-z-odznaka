import React from "react";

import styles from "./Menu.module.css";
import MenuOption from "./MenuOption";
import homeImage from "../../../assets/MenuIcons/icon_home.png";
import labeledPointImage from "../../../assets/MenuIcons/Icon material-control-point.png";
import tourImage from "../../../assets/MenuIcons/Icon awesome-route.png";
import confirmImage from "../../../assets/MenuIcons/icon_setting.png";

const Menu = () => {
  return (
    <nav className={styles.menuWrapper}>
      <h2>TURYSTA Z ODZNAKĄ</h2>
      <MenuOption imagePath={homeImage}>Strona główna</MenuOption>
      <MenuOption imagePath={labeledPointImage}>Zarządzanie punktem opisanym</MenuOption>
      <MenuOption imagePath={labeledPointImage}>Zarządzanie punktem własnym</MenuOption>
      <MenuOption imagePath={tourImage}>Tworzenie trasy</MenuOption>
      <MenuOption imagePath={confirmImage}>Zgłaszanie do weryfikacji</MenuOption>
    </nav>
  );
};

export default Menu;
