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
  const [completedSegments, setCompletedSegments] = useState([]);
  const [message, setMessage] = useState("");
  const [tableIsShown, setTableIsShown] = useState(true);
  const [dateFormIsShown, setDateFormIsShown] = useState(false);
  const [selectedTableIsShown, setSelectedTableIsShown] = useState(false);

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

  const handleSaveDatesClick = () => {
    setMessage("");
    selectedSegments.map((segment) => {
      if (segment.startDate === undefined || segment.endDate === undefined) {
        setMessage("Uzupełnij wszystkie pola!");
        console.log(segment);
      }
    });

    if (message === "") {
        const completedSegments = selectedSegments.map(segment => ({"id":segment.id, "startDate":segment.startDate, "endDate":segment.endDate}) );
        console.log(completedSegments);
        //TODO weryfikacja dat
        setCompletedSegments(completedSegments);
        setSelectedTableIsShown(true);
        setDateFormIsShown(false);
    }
  }

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
        <EvidenceConfirmationDateManager selectedSegments={selectedSegments} message={message} onClick={handleSaveDatesClick}/>
      )}
      {selectedTableIsShown && (
        <EvidenceConfirmationSegmentsList
          matchedElements={props.matchedSegments}
          tourName={props.tourName}
          onClick={() => {}}
          selectedSegments={selectedSegments}
        />
      )}
      {selectedTableIsShown && <div> <Button text="Dodaj załącznik" onClick={() => {}} /> <Button text="Przypisz weryfikującego" onClick={() => {}} /> </div> }
      {selectedTableIsShown && (
        <EvidenceConfirmationRegistry
          attachment={attachment}
          verifying={verifying}
        />
      )}
    </div>
  );
};

export default EvidenceConfirmationManager;
