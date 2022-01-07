import React, { useState } from "react";
import Button from "../../View/Button/Button";
import EvidenceConfirmationDateForm from "../../View/EvidenceConfirmationDateForm/EvidenceConfirmationDateForm";

import styles from "./EvidenceConfirmationDateManager.module.css";

const EvidenceConfirmationDateManager = (props) => {
  const [message, setMessage] = useState("");

  const handleStartDateChange = (segment, startDate) => {
    segment.startDate = startDate;
  };

  const handleEndDateChange = (segment, endDate) => {
    segment.endDate = endDate;
  };

  return (
    <div>
      <p className={styles.info}>Wybierz odcinki do weryfikacji</p>
      {props.selectedSegments.map((element) => {
        return (
          <EvidenceConfirmationDateForm
            segment={element}
            formTitle={`${element.labeled_segment.start_point.name} -> ${element.labeled_segment.end_point.name}`}
            endDate={element.endDate}
            startDate={element.startDate}
            handleEndDateChange={handleEndDateChange}
            handleStartDateChange={handleStartDateChange}
          />
        );
      })}
      <p>{message}</p>
      <Button text="Zapisz daty" onClick={props.onClick} />
    </div>
  );
};

export default EvidenceConfirmationDateManager;
