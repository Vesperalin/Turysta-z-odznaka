import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./EditLabeledPoint.module.css";
import SearchForm from "../SearchForm";
import LinkButton from "../../../View/LinkButton/LinkButton";
import EditionManager from "./EditionManager";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const EditLabeledPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = useState("");
  const [labeledPoints, setLabeledPoints] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(labeledPointsBaseURL)
      .then((response) => {
        setLabeledPoints(response.data);
      })
      .catch((error) => {
        if (error.response.status === 503) {
          navigate("/503");
        } else {
          navigate("/error");
        }
      });
  }, [navigate]);

  const onSubmit = () => {
    const point = labeledPoints.find(
      (point) => point.name.toLowerCase() === term.toLowerCase()
    );
    setFormIsShown(false);

    if (point === undefined) {
      setMessage(`Punkt opisany o nazwie: ${term} nie istnieje`);
    } else {
      axios
        .get(`${labeledPointsBaseURL}/${point.id}`)
        .then((response) => {
          if (
            response.data.end_of_labeled_segments.length !== 0 ||
            response.data.end_of_own_segments.length !== 0 ||
            response.data.start_of_labeled_segments.length !== 0 ||
            response.data.start_of_own_segments.length !== 0
          ) {
            setMessage(
              `Punkt ${term} jest już używany i nie można go edytować`
            );
          }
        })
        .catch((error) => {
          if (error.response.status === 503) {
            navigate("/503");
          } else if (error.response.status === 400) {
            setMessage(error.response.data["message"]);
          } else {
            navigate("/error");
          }
        });
    }
  };

  return (
    <div className={styles.wrapper}>
      {formIsShown && (
        <SearchForm
          title="Edycja punktu opisanego"
          inputPlaceholder="Nazwa punktu"
          noMatchInfo="Nie znaleziono dopasowania"
          buttonText="Edytuj punkt opisany"
          term={term}
          setTerm={setTerm}
          onSubmit={onSubmit}
          labeledPoints={labeledPoints}
        />
      )}
      {!formIsShown && message !== "" && (
        <>
          <p className={styles.info}>{message}</p>
          <LinkButton path="/">Zakończ</LinkButton>
        </>
      )}
      {!formIsShown && message === "" && (
        <EditionManager pointName={term} labeledPoints={labeledPoints} />
      )}
    </div>
  );
};

export default EditLabeledPoint;
