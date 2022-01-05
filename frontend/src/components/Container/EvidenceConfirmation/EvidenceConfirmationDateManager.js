import EvidenceConfirmationDateForm from "../../View/EvidenceConfirmationDateForm/EvidenceConfirmationDateForm";

const EvidenceConfirmationDateManager = (props) => {
  return (
    <div>
      {props.selectedSegments.map((element) => {
        return (
          <EvidenceConfirmationDateForm
            formTitle={`${element.labeled_segment.start_point.name} -> ${element.labeled_segment.end_point.name}`}
          />
        );
      })}
    </div>
  );
};

export default EvidenceConfirmationDateManager;
