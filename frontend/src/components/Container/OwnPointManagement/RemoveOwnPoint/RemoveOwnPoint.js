import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./RemoveOwnPoint.module.css";
import SearchForm from "../SearchForm";
import LinkButton from "../../../View/LinkButton/LinkButton";

const ownPointsBaseURL = "http://127.0.0.1:5000/own-points";

const RemoveOwnPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = useState("");
  const [ownPoints, setOwnPoints] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ownPointsBaseURL)
      .then(response => {
        setOwnPoints(response.data);
      })
      .catch(error => {
        if (error.response.status === 503) {
          navigate('/503');
        } else {
          navigate('/error');
        }
      });
  }, [navigate]);

  const onSubmit = () => {
    const point = ownPoints.find(point => point.name === (term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()));
    setFormIsShown(false);

    if (point === undefined) {
      setMessage(`Punkt własny o nazwie: ${term} nie istnieje`);
    } else {
      axios.delete(`${ownPointsBaseURL}/${point.id}`)
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
    <div className={styles.wrapper}>
      {formIsShown &&
        <SearchForm
          title="Usuwanie punktu własnego"
          inputPlaceholder="Nazwa punktu"
          noMatchInfo="Nie znaleziono dopasowania"
          buttonText="Usuń punkt własny"
          term={term}
          setTerm={setTerm}
          onSubmit={onSubmit}
          ownPoints={ownPoints}
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

export default RemoveOwnPoint;
