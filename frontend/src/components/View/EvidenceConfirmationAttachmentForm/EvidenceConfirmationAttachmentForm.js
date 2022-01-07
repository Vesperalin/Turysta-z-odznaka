import React from "react";

import styles from "./EvidenceConfirmationAttachmentForm.module.css";
import Button from "../../View/Button/Button";

const EvidenceConfirmationAttachmentForm = props => {
  return (
    <div className={styles.formWrapper}>
      <h2>{props.title}</h2>
      <div className={styles.input}>
        <input
          id="pointNewHeight"
          type="text"
          onChange={props.setAttachment}
        />
      </div>
      <p className={styles.errorInfo}>{props.message}</p>
      <Button text={props.buttonText} onClick={props.onSubmit} />
    </div>
  );
};

export default EvidenceConfirmationAttachmentForm;
