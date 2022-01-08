import React, { useState } from "react";
import Button from "../../View/Button/Button";
import EvidenceConfirmationDateForm from "../../View/EvidenceConfirmationDateForm/EvidenceConfirmationDateForm";

import styles from "./EvidenceConfirmationDateManager.module.css";

const EvidenceConfirmationDateManager = (props) => {
  const [message, setMessage] = useState("");

  const handleStartDateChange = (segment, startDate) => {
    segment.startDate = startDate.toISOString().slice(0, 10);
  };

  const handleEndDateChange = (segment, endDate) => {
    segment.endDate = endDate.toISOString().slice(0, 10);
  };

  const getExcludeDateIntervals = (labeled_segment) => {
    let excludeDateIntervals = labeled_segment.closed_segments.map(
      (closed_segment) => {
        return {
          start: new Date(closed_segment.closureDate),
          end: new Date(closed_segment.openingDate),
        };
      }
    );

    if (labeled_segment.liquidated_segment !== null) {
      excludeDateIntervals.push({
        start: new Date(labeled_segment.liquidated_segment.liquidationDate),
        end: new Date(),
      });
    }
    
    return excludeDateIntervals;
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
            excludeDateIntervals={getExcludeDateIntervals(
              element.labeled_segment
            )}
          />
        );
      })}
      <p>{message}</p>
      <Button text="Zapisz daty" onClick={props.onClick} />
    </div>
  );
};

export default EvidenceConfirmationDateManager;
