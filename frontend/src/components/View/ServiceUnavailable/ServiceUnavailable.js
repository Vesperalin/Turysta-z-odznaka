import React from "react";

import styles from "./ServiceUnavailable.module.css";
import errorImage from "../../../assets/ServiceUnavailable/503 Error Service Unavailable-amico.png";

const ServiceUnavailable = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Serwis niedostępny</h2>
      <p>Skontaktuj się z administratorem</p>
      <img src={errorImage} alt='503 error' />
    </div>
  );
};

export default ServiceUnavailable;
