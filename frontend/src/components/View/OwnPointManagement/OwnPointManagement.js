import React from "react";

import LinkButton from "../../View/LinkButton/LinkButton";
import styles from "./OwnPointManagement.module.css";

const OwnPointManagement = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Wybierz, jaką akcję chciałbyś wykonać</h2>
      <div id="buttonContainer">
        <LinkButton path='/punkt-wlasny/dodaj'>Dodaj punkt własny</LinkButton>
        <LinkButton path='/punkt-wlasny/edytuj'>Edytuj punkt własny</LinkButton>
        <LinkButton path='/punkt-wlasny/usun'>Usuń punkt własny</LinkButton>
        <LinkButton path='/punkt-wlasny/szukaj'>Szukaj punktów własnych</LinkButton>
      </div>
    </div>
  );
};

export default OwnPointManagement;
