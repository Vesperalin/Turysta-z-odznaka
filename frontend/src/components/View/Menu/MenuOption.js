import React from "react";

import styles from "./MenuOption.module.css";

const MenuOption = props => {
    return (
        <a href="https://www.google.com/" className={styles.link}>
            <img src={props.imagePath} alt="option-icon"/>
            <p>{props.children}</p>
        </a>
    );
};

export default MenuOption;