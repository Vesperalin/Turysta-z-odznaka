import React from "react";

import styles from "./SmallButton.module.css";

const SmallButton = props => {
  return (
    <button onClick={props.onClick} className={styles.button}>
      <p>{props.text}</p>
    </button>
  );
};

export default SmallButton;
