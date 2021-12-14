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
      <MenuOption imagePath={homeImage} path='/'>Strona główna</MenuOption>
      <MenuOption imagePath={labeledPointImage} path='/punkt-opisany'>Zarządzanie punktem opisanym</MenuOption>
      <MenuOption imagePath={labeledPointImage} path='/punkt-wlasny'>Zarządzanie punktem własnym</MenuOption>
      <MenuOption imagePath={tourImage} path='/tworzenie-trasy'>Tworzenie trasy</MenuOption>
      <MenuOption imagePath={confirmImage} path='/zglaszanie-dowodow'>Zgłaszanie do weryfikacji</MenuOption>
    </nav>
  );
};

export default Menu;
