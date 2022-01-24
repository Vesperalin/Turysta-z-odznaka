import React from "react";

import styles from "./EvidenceConfirmationEvidenceForm.module.css";
import Button from "../Button/Button";

const EvidenceConfirmationEvidenceForm = props => {
  return (
    <div className={styles.formWrapper}>
      <h2>{props.title}</h2>
      <div className={styles.input}>
        <input
          id="evidence"
          placeholder={props.placeholder}
          value={props.value}
          type="text"
          onChange={props.setAttachment}
        />
      </div>
      <p className={styles.errorInfo}>{props.message}</p>
      <Button text={props.buttonText} onClick={props.onSubmit} />
    </div>
  );
};

export default EvidenceConfirmationEvidenceForm;
