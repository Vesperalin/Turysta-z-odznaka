import React from "react";

import styles from "./Home.module.css";
import tripImage from "../../../assets/Home/Journey-amico.png";

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <h2>Strona główna</h2>
      <img src={tripImage} alt='mountain-trip' />
    </div>
  );
};

export default Home;
