import React, { useState } from "react";

import styles from "./EvidenceConfirmationManager.module.css";
import EvidenceConfirmationSegmentsList from "../../View/EvidenceConfirmationSegmentsList/EvidenceConfirmationSegmentsList";
import Button from "../../View/Button/Button";
import EvidenceConfirmationRegistry from "../../View/EvidenceConfirmationRegistry/EvidenceConfirmationRegistry";
import EvidenceConfirmationDateManager from "./EvidenceConfirmationDateManager";
import EvidenceConfirmationEvidenceForm from "../../View/EvidenceConfirmationEvidenceForm/EvidenceConfirmationEvidenceForm";

const addEvidenceBaseURL =
  "http://localhost:5000/evidence-confirmation/evidence";

const EvidenceConfirmationManager = (props) => {
  const [attachments, setAttachments] = useState([]);
  const [verifying, setVerifying] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [completedSegments, setCompletedSegments] = useState([]);
  const [dateMessage, setDateMessage] = useState("");
  const [mountainGroupMessage, setMountainGroupMessage] = useState("");
  const [tableIsShown, setTableIsShown] = useState(true);
  const [dateFormIsShown, setDateFormIsShown] = useState(false);
  const [selectedTableIsShown, setSelectedTableIsShown] = useState(false);
  const [attachmentIsShown, setAttachmentIsShown] = useState(false);
  const [verifyingIsShown, setVerifyingIsShown] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [attachmentMessage, setAttachmentMessage] = useState("");
  const [guide, setGuide] = useState("");
  const [verifyingMessage, setVerifyingMessage] = useState("");
  const [noSegmentSelectedMessage, setNoSegmentSelectedMessage] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [finalMessage, setFinalMessage] = useState("");

  const handleSelection = (segment) => {
    if (!completedSegments.some((e) => e.id === segment.id)) {
      if (selectedSegments.includes(segment)) {
        setSelectedSegments(
          selectedSegments.filter((element) => segment.id !== element.id)
        );
      } else {
        setSelectedSegments((selectedSegments) => [
          ...selectedSegments,
          segment,
        ]);
      }
    }
  };

  const onClickNext = () => {
    if (selectedSegments.length === 0) {
      setNoSegmentSelectedMessage("Wybierz odcinki by przejść dalej.");
    } else {
      setTableIsShown(false);
      setDateFormIsShown(true);
      setNoSegmentSelectedMessage("");
    }
  };

  const onClickAttachment = () => {
    const mountainGroup = selectedSegments.mountainGroup;
    selectedSegments.forEach((segment) => {
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

  const onClickVerifying = () => {
    setVerifyingIsShown(true);
    setSelectedTableIsShown(false);
  };

  const handleSaveDatesClick = () => {
    setDateMessage("");
    selectedSegments.forEach((segment) => {
      if (segment.startDate === undefined || segment.endDate === undefined) {
        setDateMessage("Uzupełnij wszystkie pola!");
      }
    });

    if (dateMessage === "") {
      const confirmedSegments = selectedSegments.map((segment) => ({
        id: segment.id,
        startDate: segment.startDate,
        endDate: segment.endDate,
      }));
      console.log(confirmedSegments);
      //TODO weryfikacja dat
      setCompletedSegments((completedSegments) => [
        ...completedSegments,
        ...confirmedSegments,
      ]);
      setSelectedTableIsShown(true);
      setDateFormIsShown(false);
    }
  };

  const handleAddAttachmentClick = () => {
    if (attachment.trim() === "") {
      setAttachmentMessage("Nie dodano załącznika!");
    } else {
      setAttachmentIsShown(false);
      setAttachments([
        ...attachments,
        { value: attachment, tour_segments: selectedSegments },
      ]);
      setSelectedSegments([]);

      setTableIsShown(true);
    }
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.value);
    console.log(attachment);
  };

  const handleAddVerifyingClick = () => {
    if (guide.trim() === "") {
      setVerifyingMessage("Nie podano numeru legitymacji przewodnika!");
    } else {
      setVerifyingIsShown(false);
      setVerifying([
        ...verifying,
        { guide: guide, tour_segments: selectedSegments },
      ]);
      setSelectedSegments([]);

      setTableIsShown(true);
    }
  };

  const handleVerifyingChange = (e) => {
    setGuide(e.target.value);
  };

  const onSubmitReport = () => {
    if (attachments.length === 0 && verifying.length === 0) {
      setReportMessage(
        "Musisz załączyć dowód lub przypisać przewodnika do odcinka trasy."
      );
    } else {
      setTableIsShown(false);

      const evidences = { attachments: attachments, verifying: verifying };

      axios
        .post(addEvidenceBaseURL, evidences)
        .then((response) => setFinalMessage(response.data["message"]))
        .catch((error) => {
          if (
            (error.request && error.response === undefined) ||
            error.response.status === 503
          ) {
            navigate("/503");
          } else if (error.response.status === 400) {
            setMessage(error.response.data["message"]);
          } else {
            navigate("/error");
          }
        });
    }
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
          confirmedSegments={completedSegments}
        />
      )}
      {tableIsShown && (
        <p className={styles.error}>{noSegmentSelectedMessage}</p>
      )}
      {tableIsShown && <Button text="Dalej" onClick={onClickNext} />}
      {tableIsShown && (
        <EvidenceConfirmationRegistry
          attachment={attachments.length}
          verifying={verifying.length}
          buttonText={"Zgłoś"}
          onSubmit={onSubmitReport}
        />
      )}
      {dateFormIsShown && (
        <EvidenceConfirmationDateManager
          selectedSegments={selectedSegments}
          message={dateMessage}
          onClick={handleSaveDatesClick}
        />
      )}
      {selectedTableIsShown && (
        <EvidenceConfirmationSegmentsList
          matchedElements={props.matchedSegments}
          tourName={props.tourName}
          onClick={() => {}}
          selectedSegments={selectedSegments}
          confirmedSegments={completedSegments}
        />
      )}
      {selectedTableIsShown && (
        <div>
          <Button text="Dodaj załącznik" onClick={onClickAttachment} />
          <Button text="Przypisz weryfikującego" onClick={onClickVerifying} />
        </div>
      )}
      {selectedTableIsShown && (
        <EvidenceConfirmationRegistry
          attachment={attachments.length}
          verifying={verifying.length}
          buttonText={"Zgłoś"}
          onSubmit={onSubmitReport}
        />
      )}
      {attachmentIsShown && (
        <EvidenceConfirmationEvidenceForm
          title={"Dodaj załącznik"}
          placeholder={"Zdjęcie, wypis GPS etc."}
          message={attachmentMessage}
          buttonText={"Dodaj"}
          onSubmit={handleAddAttachmentClick}
          setAttachment={handleAttachmentChange}
        />
      )}
      {verifyingIsShown && (
        <EvidenceConfirmationEvidenceForm
          title={"Wpisz dane przewodnika odbywającego z Tobą trasę"}
          placeholder={"Numer legitymacji"}
          message={verifyingMessage}
          buttonText={"Dodaj"}
          onSubmit={handleAddVerifyingClick}
          setAttachment={handleVerifyingChange}
        />
      )}
      {!tableIsShown &&
        !verifyingIsShown &&
        !attachmentIsShown &&
        !selectedTableIsShown &&
        !dateFormIsShown && <p className={styles.info}>{finalMessage}</p>}
    </div>
  );
};

export default EvidenceConfirmationManager;
