import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./RemoveLabeledPoint.module.css";
import SearchForm from "../SearchForm";
import LinkButton from "../../../View/LinkButton/LinkButton";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const RemoveLabeledPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = useState("");
  const [labeledPoints, setLabeledPoints] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(labeledPointsBaseURL)
      .then(response => {
        setLabeledPoints(response.data);
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
    const point = labeledPoints.find(point => point.name === (term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()));
    setFormIsShown(false);

    if (point === undefined) {
      setMessage(`Punkt opisany o nazwie: ${term} nie istnieje`);
    } else {
      axios.delete(`${labeledPointsBaseURL}/${point.id}`)
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
          title="Usuwanie punktu opisanego"
          inputPlaceholder="Nazwa punktu"
          noMatchInfo="Nie znaleziono dopasowania"
          buttonText="Usuń punkt opisany"
          term={term}
          setTerm={setTerm}
          onSubmit={onSubmit}
          labeledPoints={labeledPoints}
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

export default RemoveLabeledPoint;
