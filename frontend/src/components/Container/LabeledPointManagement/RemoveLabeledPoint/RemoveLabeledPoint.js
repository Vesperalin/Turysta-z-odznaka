import React, { useState } from "react";
import axios from "axios";
import { matchSorter } from 'match-sorter'

import styles from "./RemoveLabeledPoint.module.css";

const RemoveLabeledPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = React.useState("");
  const [matchedLabeledPoints, setMatchedLabeledPoints] = useState([]);

  return (
    <div className={styles.wrapper}>

    </div>
  );
};

export default RemoveLabeledPoint;