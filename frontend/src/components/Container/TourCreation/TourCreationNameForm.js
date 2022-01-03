import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./TourCreationNameForm.module.css";
import Button from "../../View/Button/Button";

const tourNameCheckBaseURL = "http://127.0.0.1:5000/tour-creation/check-name";

const TourCreationNameForm = props => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChange = e => {
    props.setTourName(e.target.value);
  };

  const onSubmit = () => {
    if (props.tourName.trim() === '') {
      setMessage("Nie podano nazwy trasy");
    } else {
      const tourName = { name: props.tourName.trim() };

      axios.post(tourNameCheckBaseURL, tourName)
        .then(response => {
          props.onClick();
        })
        .catch(error => {
          if ((error.request && error.response === undefined) || error.response.status === 503) {
            navigate('/503');
          } else if (error.response.status === 400) {
            setMessage(error.response.data['message']);
          } else {
            navigate('/error');
          }
        });
    }
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
