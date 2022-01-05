import React, { useState } from "react";

import styles from "./EvidenceConfirmationManager.module.css";
import EvidenceConfirmationSegmentsList from "../../View/EvidenceConfirmationSegmentsList/EvidenceConfirmationSegmentsList";
import LinkButton from "../../View/LinkButton/LinkButton";
import Button from "../../View/Button/Button";
import EvidenceConfirmationRegistry from "../../View/EvidenceConfirmationRegistry/EvidenceConfirmationRegistry";
import EvidenceConfirmationDateManager from "./EvidenceConfirmationDateManager";

const EvidenceConfirmationManager = (props) => {
  const [attachment, setAttachment] = useState(0);
  const [verifying, setVerifying] = useState(0);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [tableIsShown, setTableIsShown] = useState(true);
  const [dateFormIsShown, setDateFormIsShown] = useState(false);

  const handleSelection = (segment) => {
    if (selectedSegments.includes(segment)) {
      setSelectedSegments(
        selectedSegments.filter((element) => segment.id !== element.id)
      );
    } else {
      setSelectedSegments([...selectedSegments, segment]);
    }
  };

  const onClick = () => {
    if (selectedSegments.length === 0) {
      // TODO error message
    } else {
      setTableIsShown(false);
      setDateFormIsShown(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.info}>Wybierz odcinki do weryfikacji</p>
      {tableIsShown && (
        <EvidenceConfirmationSegmentsList
          matchedElements={props.matchedSegments}
          tourName={props.tourName}
          onClick={handleSelection}
          selectedSegments={selectedSegments}
        />
      )}
      {tableIsShown && <Button text="Dalej" onClick={onClick} />}
      {tableIsShown && (
        <EvidenceConfirmationRegistry
          attachment={attachment}
          verifying={verifying}
        />
      )}
      {dateFormIsShown && (
        <EvidenceConfirmationDateManager selectedSegments={selectedSegments} />
      )}
    </div>
  );
};

export default EvidenceConfirmationManager;
