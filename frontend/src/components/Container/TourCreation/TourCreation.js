import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./TourCreation.module.css";
import TourCreationNameForm from "./TourCreationNameForm";
import TourCreationForm from "./TourCreationForm";
import TourSegmentsPresenter from "./TourSegmentsPresenter";
import LinkButton from "../../View/LinkButton/LinkButton";

const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";
const labeledSegmentsBaseURL = "http://127.0.0.1:5000/tour-creation/labeled-segments";
const tourCreationBaseURL = "http://127.0.0.1:5000/tour-creation/tour";

const TourCreation = () => {
  const [isTourCreationFormShown, setIsTourCreationFormShown] = useState(true);
  const [isTourNameFormShown, setIsTourNameFormShown] = useState(false);
  const [labeledSegments, setLabeledSegments] = useState([]);
  const [labeledPoints, setLabeledPoints] = useState([]);
  const [chosenSegments, setChosenSegments] = useState([]);
  const [startingPoint, setStartingPoint] = useState({});
  const [tourName, setTourName] = useState("");
  const [points, setPoints] = useState(0);
  const [tourSegments, setTourSegments] = useState([]);
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
    const tour = {
      name: tourName.trim(),
      points: points,
      segments: chosenSegments
    };

    axios.post(tourCreationBaseURL, tour)
      .then(response => {
        setTourSegments(response.data);
      })
      .catch(error => {
        if ((error.request && error.response === undefined) || error.response.status === 503) {
          navigate('/503');
        } else {
          navigate('/error');
        }
      });

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
            points={points}
            setPoints={setPoints}
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
        <div className={styles.background}>
          <h3 className={styles.resultInfo}>Zapisano trasę: {tourName}</h3>
          <p className={styles.points}>Liczba punktów do GOT: {points}</p>
          <TourSegmentsPresenter
            tourSegments={tourSegments}
          />
          <LinkButton path='/'>Zakończ</LinkButton>
        </div>
      }
    </div>
  );
};

export default TourCreation;
