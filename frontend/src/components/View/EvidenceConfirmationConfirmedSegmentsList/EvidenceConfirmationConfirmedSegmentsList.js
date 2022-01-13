import React from "react";

import styles from "./EvidenceConfirmationConfirmedSegmentsList.module.css";

const EvidenceConfirmationConfirmedSegmentsList = (props) => {
  return (
    <div className={styles.tableWrapper}>
      <p className={styles.info}>Odcinki zgłoszone pomyślnie do weryfikacji</p>
      <p className={styles.tableTitle}>{props.tourName}</p>
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <td>Początek</td>
            <td>Koniec</td>
            <td>Grupa górska</td>
            <td>Start</td>
            <td>Koniec</td>
            <td>Przewodnik</td>
            <td>Załącznik</td>
          </tr>
        </thead>
        <tbody>
          {props.matchedElements.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.labeled_segment.start_point.name}</td>
                <td>{element.labeled_segment.end_point.name}</td>
                <td>{element.labeled_segment.mountain_group.name}</td>
                <td>{element.startDate}</td>
                <td>{element.endDate}</td>
                <td>{element.evidence.verifying !== null ? element.evidence.verifying.guide.id_number : " - "}</td>
                <td>{element.evidence.photo_attachment !== null ? element.evidence.photo_attachment : " - "}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EvidenceConfirmationConfirmedSegmentsList;
