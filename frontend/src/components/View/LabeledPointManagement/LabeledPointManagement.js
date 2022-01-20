import React from "react";

import LinkButton from "../../View/LinkButton/LinkButton";
import styles from "./LabeledPointManagement.module.css";

const LabeledPointManagement = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Wybierz, jaką akcję chciałbyś wykonać</h2>
      <div id="buttonContainer">
        <LinkButton path='/punkt-opisany/dodaj'>Dodaj punkt opisany</LinkButton>
        <LinkButton path='/punkt-opisany/edytuj'>Edytuj punkt opisany</LinkButton>
        <LinkButton path='/punkt-opisany/usun'>Usuń punkt opisany</LinkButton>
        <LinkButton path='/punkt-opisany/szukaj'>Szukaj punktów opisanych</LinkButton>
      </div>
    </div>
  );
};

export default LabeledPointManagement;
