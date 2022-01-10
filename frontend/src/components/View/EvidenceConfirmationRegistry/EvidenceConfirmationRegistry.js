import React from "react";

import styles from "./EvidenceConfirmationRegistry.module.css";
import Button from "../Button/Button";

const EvidenceConfirmationRegistry = (props) => {
  return (
    <div className={styles.registryWrapper}>
      <p className={styles.info}>Dodane załączniki: {props.attachment}</p>
      <p className={styles.info}>Przypisani weryfikujący: {props.verifying}</p>
      <Button text={props.buttonText} onClick={props.onSubmit} />
      <p className={styles.errorInfo}>{props.message}</p>
    </div>
  );
};

export default EvidenceConfirmationRegistry;
