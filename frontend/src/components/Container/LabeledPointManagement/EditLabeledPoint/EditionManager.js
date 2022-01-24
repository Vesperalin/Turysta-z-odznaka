import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LabeledPointForm from "../../../View/LabeledPointForm/LabeledPointForm";
import LinkButton from "../../../View/LinkButton/LinkButton";
import styles from "./EditionManager.module.css";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const EditionManager = props => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [newPointName, setNewPointName] = useState(props.pointName);
  const [newPointHeight, setNewPointHeight] = useState(parseInt(props.pointHeight));
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
      setFormMessage("Nie podano nowej nazwy punktu opisanego");
    } else {
      setFormMessage("");
      setFormIsShown(false);

      const point = props.labeledPoints.find(point => point.name.toLowerCase() === props.pointName.toLowerCase());
      const newHeight = newPointHeight === "" ? null : parseInt(newPointHeight);
      const newLabeledPoint = { name: newPointName.trim(), height: newHeight };

      axios.put(`${labeledPointsBaseURL}/${point.id}`, newLabeledPoint)
        .then(response => setMessage(response.data['message']))
        .catch(error => {
          if (error.response.status === 503) {
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
    <>
      {formIsShown &&
        <LabeledPointForm
          title={`Edycja punktu opisanego: ${props.pointName}`}
          name={newPointName}
          height={isNaN(newPointHeight) ?  "" : newPointHeight}
          setName={handleNameChange}
          setHeight={handleHeightChange}
          buttonText='Edytuj punkt opisany'
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
    </>
  );
};

export default EditionManager;
