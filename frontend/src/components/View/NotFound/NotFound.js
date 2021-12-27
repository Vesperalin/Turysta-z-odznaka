import React from "react";

import styles from "./NotFound.module.css";
import errorImage from "../../../assets/NotFound/404 Error-pana.png";

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Strona nie została znaleziona</h2>
      <img src={errorImage} alt='404 error' />
    </div>
  );
};

export default NotFound;
