import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./TourCreation.module.css";
import TourCreationNameForm from "./TourCreationNameForm";
import TourCreationForm from "./TourCreationForm";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";
const labeledSegmentsBaseURL = "http://127.0.0.1:5000/tour-creation/labeled-segments";

const TourCreation = () => {
  const [isTourCreationFormShown, setIsTourCreationFormShown] = useState(true);
  const [isTourNameFormShown, setIsTourNameFormShown] = useState(false);
  const [labeledSegments, setLabeledSegments] = useState([]);
  const [labeledPoints, setLabeledPoints] = useState([]);
  const [chosenSegments, setChosenSegments] = useState([]);
  const [startingPoint, setStartingPoint] = useState({});
  const [tourName, setTourName] = useState("");
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

    axios.get(labeledSegmentsBaseURL)
      .then(response => {
        setLabeledSegments(response.data);
      })
      .catch(error => {
        if (error.response.status === 503) {
          navigate('/503');
        } else {
          navigate('/error');
        }
      });
  }, [navigate]);

  const onSegmentsSubmit = () => {
    setIsTourCreationFormShown(false);
    setIsTourNameFormShown(true);
  };

  const onNameSubmit = () => {
    console.log(tourName + ": wybrano tę nazwę"); // temp dopóki nie mam endpointów zapisywania trasy
    setIsTourCreationFormShown(false);
    setIsTourNameFormShown(false);
  };

  return (
    <div className={styles.wrapper}>
      {(isTourCreationFormShown && !isTourNameFormShown) &&
        <>
          <h3>Stwórz trasę poprzez podanie punktów tworzących odcinki</h3>
          <TourCreationForm
            labeledSegments={labeledSegments}
            labeledPoints={labeledPoints}
            chosenSegments={chosenSegments}
            setChosenSegments={setChosenSegments}
            startingPoint={startingPoint}
            setStartingPoint={setStartingPoint}
            onSubmit={onSegmentsSubmit}
          />
        </>
      }
      {(!isTourCreationFormShown && isTourNameFormShown) &&
        <div className={styles.background}>
          <h3>Nadaj trasie nazwę</h3>
          <TourCreationNameForm
            tourName={tourName}
            setTourName={setTourName}
            buttonText="Zatwierdź"
            onClick={onNameSubmit}
          />
        </div>
      }
      {(!isTourCreationFormShown && !isTourNameFormShown) &&
        <>
          <p>Tu będzie komunikat zwrotny</p>
        </>
      }
    </div>
  );
};

export default TourCreation;
