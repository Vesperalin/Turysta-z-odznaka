import React from "react";

import styles from "./EvidenceConfirmationSegmentsList.module.css";

const EvidenceConfirmationSegmentsList = props => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <td>LP.</td>
            <td>Początek</td>
            <td>Koniec</td>
            <td>Grupa górska</td>
            <td>Liczba punktów</td>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>

  );
};

export default EvidenceConfirmationSegmentsList;
