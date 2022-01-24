import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import OwnPointForm from "../../../View/OwnPointForm/OwnPointForm";
import LinkButton from "../../../View/LinkButton/LinkButton";
import styles from "./AddOwnPoint.module.css";

const ownPointsBaseURL = "http://127.0.0.1:5000/own-points";

const AddOwnPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [newPointName, setNewPointName] = useState("");
  const [newPointLatitude, setNewPointLatitude] = useState("");
  const [newPointLongitude, setNewPointLongitude] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNameChange = e => setNewPointName(e.target.value);

  const handleLatitudeChange = e => {
    const regPattern = /^([1-9][0-9]*[.]?\d{0,4})$/;
    if (e.target.value === '' || regPattern.test(e.target.value)){
      setNewPointLatitude(e.target.value)
    }
  };

  const handleLongitudeChange = e => {
    const regPattern = /^([1-9][0-9]*[.]?\d{0,4})$/;
    if (e.target.value === '' || regPattern.test(e.target.value)){
      setNewPointLongitude(e.target.value)
    }
  };

  const onClick = () => {
    if (newPointName.trim() === '') {
      setFormMessage("Nie podano nazwy punktu własnego");
    } 
    else if (newPointLatitude.trim() === '') {
      setFormMessage("Nie podano szerokości geograficznej punktu własnego");
    }
    else if (newPointLongitude.trim() === '') {
      setFormMessage("Nie podano długości geograficznej punktu własnego");
    }
    else {
      setFormIsShown(false);

      const newLatitude = parseFloat(newPointLatitude)
      const newLongitude = parseFloat(newPointLongitude)
      const newOwnPoint = { name: newPointName.trim(), latitude: newLatitude, longitude: newLongitude };

      axios.post(ownPointsBaseURL, newOwnPoint)
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
        <OwnPointForm
          title="Dodawanie punktu własnego"
          name={newPointName}
          latitude={newPointLatitude}
          longitude={newPointLongitude}
          setName={handleNameChange}
          setLatitude={handleLatitudeChange}
          setLongitude={handleLongitudeChange}
          buttonText='Dodaj punkt własny'
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

export default AddOwnPoint;
