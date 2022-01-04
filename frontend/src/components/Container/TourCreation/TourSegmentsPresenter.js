import React from "react";

import styles from "./TourSegmentsPresenter.module.css";

const TourSegmentsPresenter = props => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <td className={styles.numberTd}>L.p.</td>
            <td>Początek</td>
            <td>Przez</td>
            <td>Koniec</td>
            <td>Grupa górska</td>
            <td className={styles.numberTd}>Punkty</td>
          </tr>
        </thead>
        <tbody>
          {props.tourSegments.map((segment, index) => {
            return (
              <tr key={segment.id}>
                <td className={styles.numberTd}>{index + 1}</td>
                <td>{segment.labeled_segment.start_point.name}</td>
                <td>{segment.through === null ? '-' : segment.through}</td>
                <td>{segment.labeled_segment.end_point.name}</td>
                <td>{segment.labeled_segment.mountain_group.name}</td>
                <td className={styles.numberTd}>{segment.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TourSegmentsPresenter;
