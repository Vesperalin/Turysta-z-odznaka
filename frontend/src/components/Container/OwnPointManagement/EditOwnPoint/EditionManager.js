import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import OwnPointForm from "../../../View/OwnPointForm/OwnPointForm";
import LinkButton from "../../../View/LinkButton/LinkButton";
import styles from "./EditionManager.module.css";

const ownPointsBaseURL = "http://127.0.0.1:5000/own-points";

const EditionManager = props => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [newPointName, setNewPointName] = useState(props.pointName);
  const [newPointLatitude, setNewPointLatitude] = useState(props.pointLatitude);
  const [newPointLongitude, setNewPointLongitude] = useState(props.pointLongitude);
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
    else if (newPointLatitude === '') {
      setFormMessage("Nie podano szerokości geograficznej punktu własnego");
    }
    else if (newPointLongitude === '') {
      setFormMessage("Nie podano długości geograficznej punktu własnego");
    } else {
      setFormMessage("");
      setFormIsShown(false);

      const point = props.ownPoints.find(point => point.name.toLowerCase() === props.pointName.toLowerCase());
      const newLatitude = parseFloat(newPointLatitude)
      const newLongitude = parseFloat(newPointLongitude)
      const newOwnPoint = { name: newPointName.trim(), latitude: newLatitude, longitude: newLongitude };

      axios.put(`${ownPointsBaseURL}/${point.id}`, newOwnPoint)
        .then(response => setMessage("Punkt został pomyślnie edytowany"))
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
        <OwnPointForm
          title={`Edycja punktu własnego: ${props.pointName}`}
          name={newPointName}
          latitude={newPointLatitude}
          longitude={newPointLongitude}
          setName={handleNameChange}
          setLatitude={handleLatitudeChange}
          setLongitude={handleLongitudeChange}
          buttonText='Edytuj punkt własny'
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
