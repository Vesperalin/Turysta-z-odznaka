import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LabeledPointForm from "../../../View/LabeledPointForm/LabeledPointForm";
import LinkButton from "../../../View/LinkButton/LinkButton";
import styles from "./AddLabeledPoint.module.css";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const AddLabeledPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [newPointName, setNewPointName] = useState("");
  const [newPointHeight, setNewPointHeight] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNameChange = e => setNewPointName(e.target.value);

  const handleHeightChange = e => {
    const regPattern = /^[0-9\b]+$/;
    if (e.target.value === '' || regPattern.test(e.target.value)) {
      setNewPointHeight(e.target.value);
    }
  };

  const onClick = () => {
    if (newPointName.trim() === '') {
      setFormMessage("Nie podano nazwy punktu opisanego");
    } else {
      setFormIsShown(false);

      const newHeight = newPointHeight === "" ? null : parseInt(newPointHeight);
      const newLabeledPoint = { name: newPointName.trim(), height: newHeight };

      axios.post(labeledPointsBaseURL, newLabeledPoint)
        .then(response => setMessage(`Punkt ${newPointName} został pomyślnie dodany`))
        .catch(error => {
          if((error.request && error.response === undefined) || error.response.status === 503) {
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
    <div className={styles.wrapper}>
      {formIsShown &&
        <LabeledPointForm
          title="Dodawanie punktu opisanego"
          name={newPointName}
          height={newPointHeight}
          setName={handleNameChange}
          setHeight={handleHeightChange}
          buttonText='Dodaj punkt opisany'
          onSubmit={onClick}
          message={formMessage}
        />
      }
      {!formIsShown &&
        <>
          <p className={styles.info}>{message}</p>
          <LinkButton path='/'>Zakończ</LinkButton>
        </>
      }
    </div>
  );
};

export default AddLabeledPoint;
