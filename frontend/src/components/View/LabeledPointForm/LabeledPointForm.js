import React from "react";

import styles from "./LabeledPointForm.module.css";
import Button from "../Button/Button";

const LabeledPointForm = props => {
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
        />
      </div>
      <div className={styles.input}>
        <input
          id="pointNewHeight"
          type="text"
          placeholder="Wysokość w metrach (opcjonalna)"
          value={props.height}
          onChange={props.setHeight}
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

export default LabeledPointForm;
