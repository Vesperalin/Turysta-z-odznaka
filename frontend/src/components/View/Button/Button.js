import React from "react";

import styles from "./Button.module.css";

const Button = props => {
  return (
    <button onClick={props.onClick} className={styles.button}>
      <p>{props.text}</p>
    </button>
  );
};

export default Button;
