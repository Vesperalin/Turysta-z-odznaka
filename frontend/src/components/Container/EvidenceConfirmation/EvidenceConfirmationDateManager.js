import { useState } from "react";
import Button from "../../View/Button/Button";
import EvidenceConfirmationDateForm from "../../View/EvidenceConfirmationDateForm/EvidenceConfirmationDateForm";

const EvidenceConfirmationDateManager = (props) => {
  const [message, setMessage] = useState("");

  const handleOnClick = () => {
    setMessage("");
    props.selectedSegments.map((segment) => {
      if (segment.startDate === undefined || segment.endDate === undefined) {
        setMessage("Uzupełnij wszystkie pola!");
        console.log(segment);
      }
    });

    if (message === "") {
      console.log("przeszlo" + { message });
    }
  };

  const handleStartDateChange = (segment, startDate) => {
    segment.startDate = startDate;
  };

  const handleEndDateChange = (segment, endDate) => {
    segment.endDate = endDate;
  };

  return (
    <div>
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
      <Button text="Zapisz daty" onClick={handleOnClick} />
    </div>
  );
};

export default EvidenceConfirmationDateManager;
