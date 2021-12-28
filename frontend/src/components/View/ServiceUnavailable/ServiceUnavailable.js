import React from "react";

import styles from "./ServiceUnavailable.module.css";
import errorImage from "../../../assets/ServiceUnavailable/503 Error Service Unavailable-amico.png";

const ServiceUnavailable = () => {
  return (
    <div className={styles.wrapper}>
      <h2>503</h2>
      <img src={errorImage} alt='503 error' />
    </div>
  );
};

export default ServiceUnavailable;
