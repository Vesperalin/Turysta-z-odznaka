import React from "react";
import { Link } from "react-router-dom";

import styles from "./LinkButton.module.css";

const LinkButton = props => {
  return (
    <div className={styles.link}>
      <Link to={props.path} >
        <p>{props.children}</p>
      </Link >
    </div>
  );
};

export default LinkButton;
