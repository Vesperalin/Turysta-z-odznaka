import React, { useState } from "react";

import styles from "./TourCreationNameForm.module.css";
import Button from "../../View/Button/Button";

const TourCreationNameForm = props => {
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    console.log(props.tourName); //na razie, bo jeszcze nie ma endpointa w API
  };

  const onChange = e => {
    props.setTourName(e.target.value);
  };


  return (
    <div className={styles.formWrapper}>
      <h2>{props.title}</h2>
      <div className={styles.input}>
        <input
          id="tourName"
          type="text"
          placeholder="Nazwa trasy"
          value={props.tourName}
          onChange={onChange}
          autoFocus
        />
      </div>
      <p className={styles.errorInfo}>{message}</p>
      <Button
        text={props.buttonText}
        onClick={onSubmit}
      />
    </div>
  );
};

export default TourCreationNameForm;
