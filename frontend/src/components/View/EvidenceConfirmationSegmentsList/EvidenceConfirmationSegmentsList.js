import React from "react";

import styles from "./EvidenceConfirmationSegmentsList.module.css";

const EvidenceConfirmationSegmentsList = (props) => {
  return (
    <div className={styles.tableWrapper}>
      <p className={styles.tableTitle}>{props.tourName}</p>
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <td>Początek</td>
            <td>Koniec</td>
            <td>Grupa górska</td>
            <td>Liczba punktów</td>
          </tr>
        </thead>
        <tbody>
          {props.matchedElements.map((element) => {
            return (
              <tr
                key={element.id}
                className={
                  props.selectedSegments.some((e) => e.id === element.id)
                    ? styles.clickedRow
                    : props.confirmedSegments.some((e) => e.id === element.id)
                    ? styles.confirmedRow
                    : ""
                }
                onClick={() => props.onClick(element)}
              >
                <td>{element.labeled_segment.start_point.name}</td>
                <td>{element.labeled_segment.end_point.name}</td>
                <td>{element.labeled_segment.mountain_group.name}</td>
                <td>{element.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className={styles.errorInfo}>{props.message}</p>
    </div>
  );
};

export default EvidenceConfirmationSegmentsList;
