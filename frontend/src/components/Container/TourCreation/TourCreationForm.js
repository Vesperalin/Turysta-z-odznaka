import React, { useState } from "react";
import { matchSorter } from 'match-sorter';
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { Listbox, ListboxOption } from "@reach/listbox";
//import "@reach/listbox/styles.css";

import ComboboxInputField from "../../View/ComboboxInputField/ComboboxInputField";
import Button from "../../View/Button/Button";
import styles from "./TourCreationForm.module.css";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const TourCreationForm = props => {
  const [tempStartingPoint, setTempStartingPoint] = useState("");
  const [message, setMessage] = useState("");
  const matchedPoints = nameMatch(tempStartingPoint);
  const navigate = useNavigate();

  // dopasowywanie nazw podczas wyszukiwania punktu początkowego
  function nameMatch(term) {
    return (
      term.trim() === ""
        ? null
        : matchSorter(props.labeledPoints, term, { keys: ['name'] })
    );
  }

  // akcja po naduszenou przycisku zatwierdzającego dodanie punktu początkowego
  const startingPointSubmitHandler = () => {
    const point = props.labeledPoints.find(point => point.name.toLowerCase() === tempStartingPoint.toLowerCase());

    if (point === undefined) {
      setMessage(`Punkt opisany o nazwie: ${tempStartingPoint} nie istnieje`);
    } else {
      axios.get(`${labeledPointsBaseURL}/${point.id}`)
        .then((response) => {
          setMessage("");
          props.setStartingPoint(response.data);

          const date = new Date();
          const filteredPoints = props.labeledSegments.filter(currentPoint =>
            currentPoint.start_point_id === point.id &&
            currentPoint.liquidated_segment === null &&
            currentPoint.closed_segments.filter(closedSegment => {
              if (closedSegment.openingDate === null) {
                return date >= new Date(closedSegment.closureDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
              } else {
                return date >= new Date(closedSegment.closureDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) &&
                date <= new Date(closedSegment.openingDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
              }
            }).length === 0
          );
          console.log(filteredPoints);
        })
        .catch((error) => {
          console.log(error);
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
          {message !== "" && <p className={styles.errorInfo}>{message}</p>}
          <Button
            onClick={startingPointSubmitHandler}
            text="Dodaj punkt startowy"
          />
        </div>
      }
      {Object.keys(props.startingPoint).length !== 0 &&
        <div className={styles.wrapper}>
          <ul>
            <li>{props.startingPoint.name}</li>
          </ul>

        </div>
      }
    </>
  );
};

export default TourCreationForm;
