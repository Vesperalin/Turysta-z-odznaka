import React, { useState } from "react";
import { matchSorter } from 'match-sorter';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ListboxOption, ListboxPopover, ListboxInput, ListboxButton, ListboxList } from "@reach/listbox";
import "@reach/listbox/styles.css";

import ComboboxInputField from "../../View/ComboboxInputField/ComboboxInputField";
import Button from "../../View/Button/Button";
import styles from "./TourCreationForm.module.css";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const TourCreationForm = props => {
  const [tempStartingPoint, setTempStartingPoint] = useState(""); //do trzymania chwilowo punktu początkowego
  const [message, setMessage] = useState(""); // info o błędzie
  const [filteredSegments, setFilteredSegments] = useState([]); // odcinki, których początek to poprzedni punkt
  const matchedPoints = nameMatch(tempStartingPoint); //do wybierania punktu początkowego
  const [chosenSegmentId, setChosenSegmentId] = useState(""); //id wybranego odcinka - jako string bo tak tylko listbox pozwala
  const navigate = useNavigate();

  // dopasowywanie nazw podczas wyszukiwania punktu początkowego
  function nameMatch(term) {
    return (
      term.trim() === ""
        ? null
        : matchSorter(props.labeledPoints, term, { keys: ['name'] })
    );
  }

  //zwraca możliwe zakończenia odcinka
  function getFilteredSegments(pointId) {
    const date = new Date();
    const tempFilteredSegments = props.labeledSegments.filter(currentSegments =>
      currentSegments.start_point_id === pointId &&
      currentSegments.liquidated_segment === null &&
      currentSegments.closed_segments.filter(closedSegment => {
        if (closedSegment.openingDate === null) {
          return date >= new Date(closedSegment.closureDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
        } else {
          return date >= new Date(closedSegment.closureDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) &&
            date <= new Date(closedSegment.openingDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
        }
      }).length === 0
    );

    return tempFilteredSegments;
  }

  // akcja po naduszeniu przycisku zatwierdzającego dodanie punktu początkowego
  const startingPointSubmitHandler = () => {
    const point = props.labeledPoints.find(point => point.name.toLowerCase() === tempStartingPoint.toLowerCase());

    if (point === undefined) {
      setMessage(`Punkt opisany o nazwie: ${tempStartingPoint} nie istnieje`);
    } else {
      axios.get(`${labeledPointsBaseURL}/${point.id}`)
        .then((response) => {
          setMessage("");
          props.setStartingPoint(response.data);
          setFilteredSegments(getFilteredSegments(point.id));
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

  // akcja po naduszeniu przycisku dodania kolejnego punktu
  const nextPointSubmitHandler = () => {
    if (chosenSegmentId === "" || chosenSegmentId === "no-value") {
      setMessage(`Nie wybrano punktu`);
    } else {
      setMessage("");
      setChosenSegmentId("");
      const segment = props.labeledSegments.find(segment => segment.id === parseInt(chosenSegmentId));
      props.setChosenSegments(previousChosenSegments => [...previousChosenSegments, segment]);
      setFilteredSegments(getFilteredSegments(segment.end_point_id));
      props.setPoints(previousPoints => previousPoints + segment.points);
    }
  };

  // akcja po naduszenou przycisku usunięcia ostatniego punktu
  const removeLastPointHandler = () => {
    setMessage("");
    if (props.chosenSegments.length === 0) {
      props.chosenSegments.pop();
      props.setStartingPoint({});
    } else if (props.chosenSegments.length === 1) {
      props.chosenSegments.pop();
      setFilteredSegments(getFilteredSegments(props.startingPoint.id));
      props.setPoints(0);
    } else {
      let segment = props.chosenSegments[props.chosenSegments.length - 1];
      props.setPoints(previousPoints => previousPoints - segment.points);
      props.chosenSegments.pop();
      segment = props.chosenSegments[props.chosenSegments.length - 1];
      setFilteredSegments(getFilteredSegments(segment.end_point_id));
    }
  };

  return (
    <>
      {(Object.keys(props.startingPoint).length === 0 && props.chosenSegments.length === 0) &&
        <div className={styles.wrapper}>
          <ComboboxInputField
            comboboxLabel="LabeledPoints"
            setTerm={setTempStartingPoint}
            listElements={matchedPoints}
            inputPlaceholder="Wybierz punkt początkowy trasy"
            noMatchInfo="Nie znaleziono dopasowania"
          />
          {message !== "" &&
            <p className={styles.errorInfo}>
              {message}
            </p>}
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
            {props.chosenSegments.map((segment, index) => (
              <li key={index}>
                {props.labeledPoints.find(point => point.id === segment.end_point_id).name}{segment.through === null ? "" : " przez " + segment.through}
              </li>
            ))}
          </ul>

          <p>Wybierz punkt z listy</p>
          <ListboxInput value={chosenSegmentId} onChange={value => setChosenSegmentId(value)}>
            <ListboxButton arrow="▼"></ListboxButton>
            {filteredSegments.length > 0 ? (
              <ListboxPopover>
                <ListboxList>
                  {filteredSegments.map((result, index) => (
                    <ListboxOption
                      key={index}
                      value={result.id.toString()}
                    >
                      {props.labeledPoints.find(point => point.id === result.end_point_id).name}{result.through === null ? "" : " przez " + result.through}
                    </ListboxOption>
                  ))}
                </ListboxList>
              </ListboxPopover>
            ) : (
              <ListboxPopover>
                <ListboxList>
                  <ListboxOption value="no-value">Brak dopasowań</ListboxOption>
                </ListboxList>
              </ListboxPopover>
            )}
          </ListboxInput>
          {message !== "" && <p className={styles.errorInfo}>{message}</p>}
          <Button
            onClick={nextPointSubmitHandler}
            text="Dodaj punkt"
          />
          <Button
            onClick={removeLastPointHandler}
            text="Usuń ostatni punkt z listy"
          />
          <Button
            onClick={props.onSubmit}
            text="Zatwierdź trasę"
          />
        </div>
      }
    </>
  );
};

export default TourCreationForm;
