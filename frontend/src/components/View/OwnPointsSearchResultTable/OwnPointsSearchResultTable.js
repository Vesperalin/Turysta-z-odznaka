import React from "react";

import styles from "./OwnPointsSearchResultTable.module.css";

const OwnPointsSearchResultTable = props => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <td>Nazwa</td>
            <td>Szerokość geograficzna</td>
            <td>Długość geograficzna</td>
          </tr>
        </thead>
        <tbody>
          {props.matchedElements.map(element => {
            return (
              <tr key={element.id}>
                <td>{element.name}</td>
                <td>{element.latitude}</td>
                <td>{element.longitude}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  );
};

export default OwnPointsSearchResultTable;
