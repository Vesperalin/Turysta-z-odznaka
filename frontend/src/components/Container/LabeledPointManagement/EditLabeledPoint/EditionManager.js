import React, { useState } from "react";
import axios from "axios";

import LabeledPointForm from "../../../View/LabeledPointForm/LabeledPointForm";
import LinkButton from "../../../View/LinkButton/LinkButton";
import styles from "./EditionManager.module.css";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const EditionManager = props => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [newPointName, setNewPointName] = useState("");
  const [newPointHeight, setNewPointHeight] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [message, setMessage] = useState("");
  //const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = e => setNewPointName(e.target.value);

  const handleHeightChange = e => {
    const regPattern = /^[0-9\b]+$/;
    if (e.target.value === '' || regPattern.test(e.target.value)) {
      setNewPointHeight(e.target.value);
    }
  };

  const onClick = () => {
    if (newPointName.trim() === '') {
      setFormMessage("Nie podano nowej nazwy punktu opisanego");
    } else {
      setFormMessage("");
      setFormIsShown(false);

      const point = props.labeledPoints.find(point => point.name === props.pointName);
      const newHeight = newPointHeight === "" ? null : parseInt(newPointHeight);
      const newLabeledPoint = { name: newPointName.trim(), height: newHeight };

      axios.put(`${labeledPointsBaseURL}/${point.id}`, newLabeledPoint)
        .then(response => console.log(response.data))
        .catch(error => setMessage(error.response.data['message']));
    }
  };

  return (
    <>
      {formIsShown &&
        <LabeledPointForm
          title={`Edycja punktu opisanego: ${props.pointName}`}
          name={newPointName}
          height={newPointHeight}
          setName={handleNameChange}
          setHeight={handleHeightChange}
          buttonText='Edytuj punkt opisany'
          onSubmit={onClick}
          message={formMessage}
        />
      }
      {!formIsShown &&
        <>
          <p className={styles.info}>{message === '' ? "Punkt został pomyślnie edytowany" : message}</p>
          <LinkButton path='/'>Zakończ</LinkButton>
        </>
      }
    </>

  );
};

export default EditionManager;
