import React from "react";

import styles from "./OwnPointForm.module.css";
import Button from "../Button/Button";

const OwnPointForm = props => {
  return (
    <div className={styles.formWrapper}>
      <h2>{props.title}</h2>
      <div className={styles.input}>
        <input
          id="pointNewName"
          type="text"
          placeholder="Nazwa punktu"
          value={props.name}
          onChange={props.setName}
          autoFocus
        />
      </div>
      <div className={styles.input}>
        <input
          id="pointNewLatitude"
          type="text"
          placeholder="Szerokość geograficzna"
          value={props.latitude}
          onChange={props.setLatitude}
        />
      </div>
      <div className={styles.input}>
        <input
          id="pointNewLongitude"
          type="text"
          placeholder="Długość geograficzna"
          value={props.longitude}
          onChange={props.setLongitude}
        />
      </div>
      <p className={styles.errorInfo}>{props.message}</p>
      <Button
        text={props.buttonText}
        onClick={props.onSubmit}
      />
    </div>
  );
};

export default OwnPointForm;
