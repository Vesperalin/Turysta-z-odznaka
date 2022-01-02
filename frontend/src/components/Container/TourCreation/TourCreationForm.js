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
          const tempFilteredSegments = props.labeledSegments.filter(currentSegments =>
            currentSegments.start_point_id === point.id &&
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

          setFilteredSegments(tempFilteredSegments);
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

  // akcja po naduszenou przycisku dodania kolejnego punktu
  const nextPointSubmitHandler = () => {
    const segment = props.labeledSegments.find(segment => segment.id === parseInt(chosenSegmentId));
    props.setChosenSegments(previousChosenSegments => [...previousChosenSegments, segment]);

    const date = new Date();
    const tempFilteredSegments = props.labeledSegments.filter(currentSegments =>
      currentSegments.start_point_id === segment.end_point_id &&
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

    setFilteredSegments(tempFilteredSegments);
  };

  // akcja po naduszenou przycisku usunięcia ostatniego punktu
  const removeLastPointHandler = () => {
    if (props.chosenSegments.length === 0) {
      //console.log("usuwanie pkt pocz");
      props.chosenSegments.pop();
      props.setStartingPoint({});
    } else if (props.chosenSegments.length === 1) {
      //console.log("usuwanie pkt przedostatniego");

      props.chosenSegments.pop();
      const date = new Date();
      const tempFilteredSegments = props.labeledSegments.filter(currentSegments =>
        currentSegments.start_point_id === props.startingPoint.id &&
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

      setFilteredSegments(tempFilteredSegments);

    } else {
      //console.log("usuwanie pkt innego");

      props.chosenSegments.pop();
      const segment = props.chosenSegments[props.chosenSegments.length - 1];

      const date = new Date();
      const tempFilteredSegments = props.labeledSegments.filter(currentSegments =>
        currentSegments.start_point_id === segment.end_point_id &&
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

      setFilteredSegments(tempFilteredSegments);

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
            {props.chosenSegments.map((segment, index) => (
              <li key={index}>{props.labeledPoints.find(point => point.id === segment.end_point_id).name}{segment.through === null ? "" : " przez " + segment.through}</li>
            ))}
          </ul>

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
                  <ListboxOption key="none" value="none">Brak dopasowań</ListboxOption>
                </ListboxList>
              </ListboxPopover>
            )}
          </ListboxInput>
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
