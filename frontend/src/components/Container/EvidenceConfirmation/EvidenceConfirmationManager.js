import React, { useState } from "react";

import styles from "./EvidenceConfirmationManager.module.css";
import EvidenceConfirmationSegmentsList from "../../View/EvidenceConfirmationSegmentsList/EvidenceConfirmationSegmentsList";
import LinkButton from "../../View/LinkButton/LinkButton";
import EvidenceConfirmationRegistry from "../../View/EvidenceConfirmationRegistry/EvidenceConfirmationRegistry";

const EvidenceConfirmationManager = (props) => {
  const [attachment, setAttachment] = useState(0);
  const [verifying, setVerifying] = useState(0);

  return (
    <div className={styles.wraper}>
      <p className={styles.info}>Wybierz odcinki do weryfikacji</p>
      <EvidenceConfirmationSegmentsList
        matchedElements={props.matchedSegments}
        tourName={props.tourName}
      />
      <LinkButton path="/">Dalej</LinkButton>
      <EvidenceConfirmationRegistry
        attachment={attachment}
        verifying={verifying}
      />
    </div>
  );
};

export default EvidenceConfirmationManager;
