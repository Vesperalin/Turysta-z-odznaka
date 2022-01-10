import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./EvidenceConfirmationManager.module.css";
import EvidenceConfirmationSegmentsList from "../../View/EvidenceConfirmationSegmentsList/EvidenceConfirmationSegmentsList";
import Button from "../../View/Button/Button";
import EvidenceConfirmationRegistry from "../../View/EvidenceConfirmationRegistry/EvidenceConfirmationRegistry";
import EvidenceConfirmationDateManager from "./EvidenceConfirmationDateManager";
import EvidenceConfirmationEvidenceForm from "../../View/EvidenceConfirmationEvidenceForm/EvidenceConfirmationEvidenceForm";

const addEvidenceBaseURL =
  "http://localhost:5000/evidence-confirmation/evidence";
const checkGuideBaseURL = "http://localhost:5000/evidence-confirmation/guide";

const EvidenceConfirmationManager = (props) => {
  const [attachments, setAttachments] = useState([]);
  const [verifying, setVerifying] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [segmentsWithDates, setSegmentsWithDates] = useState([]);
  const [dateMessage, setDateMessage] = useState("");
  const [tableIsShown, setTableIsShown] = useState(true);
  const [dateFormIsShown, setDateFormIsShown] = useState(false);
  const [selectedTableIsShown, setSelectedTableIsShown] = useState(false);
  const [attachmentIsShown, setAttachmentIsShown] = useState(false);
  const [verifyingIsShown, setVerifyingIsShown] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [attachmentMessage, setAttachmentMessage] = useState("");
  const [guide, setGuide] = useState("");
  const [verifyingMessage, setVerifyingMessage] = useState("");
  const [selectedSegmentsMessage, setSelectedSegmentsMessage] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [finalMessage, setFinalMessage] = useState("");
  const navigate = useNavigate();

  const handleSelection = (segment) => {
    if (!segmentsWithDates.some((e) => e.id === segment.id)) {
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
      setSelectedSegmentsMessage("Wybierz odcinki by przejść dalej.");
    } else {
      setTableIsShown(false);
      setDateFormIsShown(true);
      setSelectedSegmentsMessage("");
      setReportMessage("");
    }
  };

  const onClickAttachment = () => {
    const mountainGroup = selectedSegments[0].mountainGroup;
    console.log(selectedSegments);
    let isCorrect = true;
    selectedSegments.forEach((segment) => {
      if (segment.mountainGroup !== mountainGroup) {
        console.log(segment.mountainGroup);
        setSelectedSegmentsMessage(
          "Nie można dodać załącznika dla odcinków z różnych grup górskich!"
        );
        isCorrect = false;
      }
    });

    if (isCorrect) {
      setAttachmentIsShown(true);
      setSelectedTableIsShown(false);
    }
  };

  const onClickVerifying = () => {
    setVerifyingIsShown(true);
    setSelectedTableIsShown(false);
  };

  const handleSaveDatesClick = () => {
    let isCorrect = true;
    setDateMessage("");
    selectedSegments.forEach((segment) => {
      if (segment.startDate === undefined || segment.endDate === undefined) {
        setDateMessage("Uzupełnij wszystkie pola!");
        isCorrect = false;
      }
    });

    if (isCorrect) {
      const confirmedSegments = selectedSegments.map((segment) => ({
        id: segment.id,
        startDate: segment.startDate,
        endDate: segment.endDate,
      }));

      setSegmentsWithDates((completedSegments) => [
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
    } else if (guide.trim().length !== 6) {
      setVerifyingMessage("Numer legitymacji przewodnika składa się z 6 cyfr!");
    } else {
      axios
        .get(`${checkGuideBaseURL}/${guide.trim()}`)
        .then(() => {
          setVerifyingIsShown(false);
          setVerifying([
            ...verifying,
            { id_verifying: guide.trim(), tour_segments: selectedSegments },
          ]);
          setSelectedSegments([]);

          setTableIsShown(true);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setVerifyingMessage(error.response.data["message"]);
          }
        });
    }
  };

  const handleVerifyingChange = (e) => {
    const regPattern = /^[0-9\b]+$/;
    if (
      e.target.value === "" ||
      (regPattern.test(e.target.value) && e.target.value.length < 7)
    ) {
      setGuide(e.target.value);
    }
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
            setFinalMessage(error.response.data["message"]);
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
          confirmedSegments={segmentsWithDates}
          message={selectedSegmentsMessage}
        />
      )}
      {tableIsShown && <Button text="Dalej" onClick={onClickNext} />}
      {tableIsShown && (
        <EvidenceConfirmationRegistry
          attachment={attachments.length}
          verifying={verifying.length}
          buttonText={"Zgłoś"}
          onSubmit={onSubmitReport}
          message={reportMessage}
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
          confirmedSegments={segmentsWithDates}
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
          message={reportMessage}
        />
      )}
      {attachmentIsShown && (
        <EvidenceConfirmationEvidenceForm
          title={"Dodaj załącznik"}
          placeholder={"Zdjęcie, wypis GPS etc."}
          message={attachmentMessage}
          buttonText={"Dodaj"}
          value={attachment}
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
          value={guide}
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
