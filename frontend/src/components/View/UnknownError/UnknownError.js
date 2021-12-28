import React from "react";

import styles from "./UnknownError.module.css";
import errorImage from "../../../assets/UnknownError/No data-bro.png";

const UnknownError = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Wystąpił nieznany błąd</h2>
      <img src={errorImage} alt='404 error' />
    </div>
  );
};

export default UnknownError;
