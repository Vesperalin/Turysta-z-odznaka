import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./EvidenceConfirmationManager.module.css";
import EvidenceConfirmationSegmentsList from "../../View/EvidenceConfirmationSegmentsList/EvidenceConfirmationSegmentsList";
import Button from "../../View/Button/Button";
import EvidenceConfirmationRegistry from "../../View/EvidenceConfirmationRegistry/EvidenceConfirmationRegistry";
import EvidenceConfirmationDateManager from "./EvidenceConfirmationDateManager";
import EvidenceConfirmationEvidenceForm from "../../View/EvidenceConfirmationEvidenceForm/EvidenceConfirmationEvidenceForm";
import EvidenceConfirmationConfirmedSegmentsList from "../../View/EvidenceConfirmationConfirmedSegmentsList/EvidenceConfirmationConfirmedSegmentsList";
import LinkButton from "../../View/LinkButton/LinkButton";

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
  const [guide, setGuide] = useState("");
  const [evidenceMessage, setEvidenceMessage] = useState("");
  const [selectedSegmentsMessage, setSelectedSegmentsMessage] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [tourSegments, setTourSegments] = useState([]);
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
      setSelectedSegmentsMessage("Wybierz odcinki by przej???? dalej.");
    } else {
      setTableIsShown(false);
      setDateFormIsShown(true);
      setSelectedSegmentsMessage("");
      setReportMessage("");
    }
  };

  const onClickAttachment = () => {
    const mountainGroup = selectedSegments[0].labeled_segment.mountain_group;
    let isCorrect = true;
    
    selectedSegments.forEach((segment) => {
      if (segment.labeled_segment.mountain_group.id !== mountainGroup.id) {
        console.log(segment.labeled_segment.mountain_group);
        setSelectedSegmentsMessage(
          "Nie mo??na doda?? za????cznika dla odcink??w z r????nych grup g??rskich!"
        );
        isCorrect = false;
      }
    });

    if (isCorrect) {
      setAttachmentIsShown(true);
      setSelectedTableIsShown(false);
      setSelectedSegmentsMessage("");
    }
  };

  const onClickVerifying = () => {
    setVerifyingIsShown(true);
    setSelectedTableIsShown(false);
    setSelectedSegmentsMessage("");
  };

  const handleSaveDatesClick = () => {
    let isCorrect = true;
    setDateMessage("");

    selectedSegments.forEach((segment) => {
      if (segment.startDate === null || segment.endDate === null) {
        setDateMessage("Uzupe??nij wszystkie pola!");
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
      setEvidenceMessage("Nie dodano za????cznika!");
    } else {
      setAttachmentIsShown(false);
      setEvidenceMessage("");
      setAttachments([
        ...attachments,
        {
          value: attachment,
          mountainGroup: selectedSegments[0].labeled_segment.mountain_group.id,
          tourSegments: selectedSegments,
        },
      ]);
      setSelectedSegments([]);

      setTableIsShown(true);
    }
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.value);
  };

  const handleAddVerifyingClick = () => {
    if (guide.trim() === "") {
      setEvidenceMessage("Nie podano numeru legitymacji przewodnika!");
    } else if (guide.trim().length !== 6) {
      setEvidenceMessage("Numer legitymacji przewodnika sk??ada si?? z 6 cyfr!");
    } else {
      setEvidenceMessage("");
      axios
        .get(`${checkGuideBaseURL}/${guide.trim()}`)
        .then(() => {
          setVerifyingIsShown(false);
          setVerifying([
            ...verifying,
            { idVerifying: guide.trim(), tourSegments: selectedSegments },
          ]);
          setSelectedSegments([]);

          setTableIsShown(true);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setEvidenceMessage(error.response.data["message"]);
          } else if (
            (error.request && error.response === undefined) ||
            error.response.status === 503
          ) {
            navigate("/503");
          } else {
            navigate("/error");
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
        "Musisz za????czy?? dow??d lub przypisa?? przewodnika do odcinka trasy."
      );
    } else {
      setTableIsShown(false);

      const evidences = { attachments: attachments, verifying: verifying };

      axios
        .post(addEvidenceBaseURL, evidences)
        .then((response) => {
          console.log(response.data);
          setTourSegments(response.data);
        })
        .catch((error) => {
          if (
            (error.request && error.response === undefined) ||
            error.response.status === 503
          ) {
            navigate("/503");
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
          buttonText={"Zg??o??"}
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
          message={selectedSegmentsMessage}
        />
      )}
      {selectedTableIsShown && (
        <div>
          <Button text="Dodaj za????cznik" onClick={onClickAttachment} />
          <Button text="Przypisz weryfikuj??cego" onClick={onClickVerifying} />
        </div>
      )}
      {selectedTableIsShown && (
        <EvidenceConfirmationRegistry
          attachment={attachments.length}
          verifying={verifying.length}
          buttonText={"Zg??o??"}
          onSubmit={onSubmitReport}
          message={reportMessage}
        />
      )}
      {attachmentIsShown && (
        <EvidenceConfirmationEvidenceForm
          title={"Dodaj za????cznik"}
          placeholder={"Zdj??cie, wypis GPS etc."}
          message={evidenceMessage}
          buttonText={"Dodaj"}
          value={attachment}
          onSubmit={handleAddAttachmentClick}
          setAttachment={handleAttachmentChange}
        />
      )}
      {verifyingIsShown && (
        <EvidenceConfirmationEvidenceForm
          title={"Wpisz dane przewodnika odbywaj??cego z Tob?? tras??"}
          placeholder={"Numer legitymacji"}
          message={evidenceMessage}
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
        !dateFormIsShown && (
          <div>
            <EvidenceConfirmationConfirmedSegmentsList
              matchedElements={tourSegments}
              tourName={props.tourName}
            />
            <LinkButton path="/">Zako??cz</LinkButton>
          </div>
        )}
    </div>
  );
};

export default EvidenceConfirmationManager;
