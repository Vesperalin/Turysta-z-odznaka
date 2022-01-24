import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./MenuOption.module.css";

const MenuOption = props => {
  return (
    <NavLink to={props.path} className={(navData) => navData.isActive ? `${styles.link} ${styles.linkActive}` : styles.link}>
      <img src={props.imagePath} alt="option-icon" />
      <p>{props.children}</p>
    </NavLink >
  );
};

export default MenuOption;
