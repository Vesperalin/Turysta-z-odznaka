import React, { useState } from "react";

import styles from "./EvidenceConfirmationManager.module.css";
import EvidenceConfirmationSegmentsList from "../../View/EvidenceConfirmationSegmentsList/EvidenceConfirmationSegmentsList";
import LinkButton from "../../View/LinkButton/LinkButton";
import Button from "../../View/Button/Button";
import EvidenceConfirmationRegistry from "../../View/EvidenceConfirmationRegistry/EvidenceConfirmationRegistry";
import EvidenceConfirmationDateManager from "./EvidenceConfirmationDateManager";
import EvidenceConfirmationAttachmentForm from "../../View/EvidenceConfirmationAttachmentForm/EvidenceConfirmationAttachmentForm";

const EvidenceConfirmationManager = (props) => {
  const [attachments, setAttachments] = useState([]);
  const [verifying, setVerifying] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [completedSegments, setCompletedSegments] = useState([]);
  const [message, setMessage] = useState("");
  const [mountainGroupMessage, setMountainGroupMessage] = useState("");
  const [tableIsShown, setTableIsShown] = useState(true);
  const [dateFormIsShown, setDateFormIsShown] = useState(false);
  const [selectedTableIsShown, setSelectedTableIsShown] = useState(false);
  const [attachmentIsShown, setAttachmentIsShown] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [attachmentMessage, setAttachmentMessage] = useState("");

  const handleSelection = (segment) => {
    if (selectedSegments.includes(segment)) {
      setSelectedSegments(
        selectedSegments.filter((element) => segment.id !== element.id)
      );
    } else {
      setSelectedSegments([...selectedSegments, segment]);
    }
  };

  const onClickNext = () => {
    if (selectedSegments.length === 0) {
      // TODO error message
    } else {
      setTableIsShown(false);
      setDateFormIsShown(true);
    }
  };

  const onClickAttachment = () => {
    const mountainGroup = selectedSegments.mountainGroup;
    selectedSegments.map((segment) => {
      if (segment.mountainGroup !== mountainGroup) {
        setMountainGroupMessage(
          "Nie można dodać załącznika dla odcinków z różnych grup górskich!"
        );
      }
    });

    if (mountainGroupMessage === "") {
      setAttachmentIsShown(true);
      setSelectedTableIsShown(false);
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
      const completedSegments = selectedSegments.map((segment) => ({
        id: segment.id,
        startDate: segment.startDate,
        endDate: segment.endDate,
      }));
      console.log(completedSegments);
      //TODO weryfikacja dat
      setCompletedSegments(completedSegments);
      setSelectedTableIsShown(true);
      setDateFormIsShown(false);
    }
  };

  const handleAddAttachmentClick = () => {
    if (attachment.trim() === '') {
      setAttachmentMessage("Nie dodano załącznika!");
    }
    else {
      setAttachmentIsShown(false);
      setAttachments([...attachments, {"value": attachment, "tour_segments": selectedSegments}]);
      setSelectedSegments([]);
      
      setTableIsShown(true);
    }
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.value);
    console.log(attachment);
  };

  return (
    <div className={styles.wrapper}>
      {tableIsShown && (
        <p className={styles.info}>Wybierz odcinki do weryfikacji</p>
      )}
      {tableIsShown && (
        <EvidenceConfirmationSegmentsList
          matchedElements={props.matchedSegments}
          tourName={props.tourName}
          onClick={handleSelection}
          selectedSegments={selectedSegments}
        />
      )}
      {tableIsShown && <Button text="Dalej" onClick={onClickNext} />}
      {tableIsShown && (
        <EvidenceConfirmationRegistry
          attachment={attachments.length}
          verifying={verifying.length}
        />
      )}
      {dateFormIsShown && (
        <EvidenceConfirmationDateManager
          selectedSegments={selectedSegments}
          message={message}
          onClick={handleSaveDatesClick}
        />
      )}
      {selectedTableIsShown && (
        <EvidenceConfirmationSegmentsList
          matchedElements={props.matchedSegments}
          tourName={props.tourName}
          onClick={() => {}}
          selectedSegments={selectedSegments}
        />
      )}
      {selectedTableIsShown && (
        <div>
          {" "}
          <Button text="Dodaj załącznik" onClick={onClickAttachment} />{" "}
          <Button text="Przypisz weryfikującego" onClick={() => {}} />{" "}
        </div>
      )}
      {selectedTableIsShown && (
        <EvidenceConfirmationRegistry
          attachment={attachments.length}
          verifying={verifying.length}
        />
      )}
      {attachmentIsShown && (
        <EvidenceConfirmationAttachmentForm
          title={"Dodaj załącznik"}
          message={setAttachmentMessage}
          buttonText={"Dodaj"}
          onSubmit={handleAddAttachmentClick}
          setAttachment={handleAttachmentChange}
        />
      )}
    </div>
  );
};

export default EvidenceConfirmationManager;
