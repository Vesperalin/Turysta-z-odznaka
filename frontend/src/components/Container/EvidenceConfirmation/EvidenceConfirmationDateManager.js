import React from "react";
import Button from "../../View/Button/Button";
import EvidenceConfirmationDateForm from "../../View/EvidenceConfirmationDateForm/EvidenceConfirmationDateForm";

import styles from "./EvidenceConfirmationDateManager.module.css";

const EvidenceConfirmationDateManager = (props) => {
  const handleStartDateChange = (segment, startDate) => {
    segment.startDate = startDate.toISOString().slice(0, 10);
  };

  const handleEndDateChange = (segment, endDate) => {
    segment.endDate = endDate.toISOString().slice(0, 10);
  };

  const getExcludeDateIntervals = (labeled_segment) => {
    let excludeDateIntervals = labeled_segment.closed_segments.map(
      (closed_segment) => {
        let end;
        if(closed_segment.openingDate !== null){
          end = new Date(closed_segment.openingDate)
        }
        else {
          end = new Date()
        }
        return {
          start: new Date(closed_segment.closureDate),
          end: end,
        };
      }
    );

    if (labeled_segment.liquidated_segment !== null) {
      excludeDateIntervals.push({
        start: new Date(labeled_segment.liquidated_segment.liquidationDate),
        end: new Date(),
      });
    }
    console.log(excludeDateIntervals)
    return excludeDateIntervals;
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.info}>Wybierz odcinki do weryfikacji</p>
      {props.selectedSegments.map((element) => {
        return (
          <EvidenceConfirmationDateForm
            key={element.id}
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
      <p className={styles.error}>{props.message}</p>
      <Button text="Zapisz daty" onClick={props.onClick} />
    </div>
  );
};

export default EvidenceConfirmationDateManager;
