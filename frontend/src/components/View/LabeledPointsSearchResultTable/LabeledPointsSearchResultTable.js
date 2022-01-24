import React from "react";

import styles from "./LabeledPointsSearchResultTable.module.css";

const LabeledPointsSearchResultTable = props => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.resultTable}>
        <thead>
          <tr>
            <td>Nazwa</td>
            <td>Wysokość</td>
          </tr>
        </thead>
        <tbody>
          {props.matchedElements.map(element => {
            return (
              <tr key={element.id}>
                <td>{element.name}</td>
                {element.height !== null &&
                  <td>{element.height} m</td>
                }
                {element.height === null &&
                  <td>-</td>
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LabeledPointsSearchResultTable;
