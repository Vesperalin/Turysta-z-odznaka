import React, { useState } from "react";
import { matchSorter } from 'match-sorter';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ComboboxInputField from "../../View/ComboboxInputField/ComboboxInputField";
import Button from "../../View/Button/Button";
import styles from "./TourCreationForm.module.css";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const TourCreationForm = props => {
  const [tempStartingPoint, setTempStartingPoint] = useState("");
  const [message, setMessage] = useState("");
  const matchedPoints = nameMatch(tempStartingPoint);
  const navigate = useNavigate();

  function nameMatch(term) {
    return (
      term.trim() === ""
        ? null
        : matchSorter(props.labeledPoints, term, { keys: ['name'] })
    );
  }

  const startingPointSubmitHandler = () => {
    const point = props.labeledPoints.find(point => point.name.toLowerCase() === tempStartingPoint.toLowerCase());

    if (point === undefined) {
      setMessage(`Punkt opisany o nazwie: ${tempStartingPoint} nie istnieje`);
    } else {
      axios.get(`${labeledPointsBaseURL}/${point.id}`)
        .then((response) => {
          setMessage("");
          props.setStartingPoint(response.data);
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
    <>
      {Object.keys(props.startingPoint).length === 0 &&
        <div className={styles.wrapper}>
          <ComboboxInputField
            comboboxLabel="LabeledPoints"
            setTerm={setTempStartingPoint}
            listElements={matchedPoints}
            inputPlaceholder="Wybierz punkt początkowy trasy"
            noMatchInfo="Nie znaleziono dopasowania"
          />
          {message !== "" && <p>{message}</p>}
          <Button
            onClick={startingPointSubmitHandler}
            text="Dodaj punkt startowy"
          />
        </div>
      }
      {Object.keys(props.startingPoint).length !== 0 &&
        <p>{console.log(props.startingPoint)}</p>
      }
    </>
  );
};

export default TourCreationForm;
