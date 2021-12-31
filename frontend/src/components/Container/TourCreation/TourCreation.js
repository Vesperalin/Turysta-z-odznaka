import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./TourCreation.module.css";

// #TODO add media queries for points presenter

const TourCreation = () => {
  const [isTourCreationFormShown, setIsTourCreationFormShown] = useState(true);
  const [isTourNameFormShown, setIsTourNameFormShown] = useState(false);
  const [points, setPoints] = useState(0);
  //const [labeledSegments, setLabeledSegments] = useState([]);
  const [labeledPoints, setLabeledPints] = useState([]);
  //const [chosenSegments, setChosenSegments] = useState([]);
  //const [startingPoint, setStartingPoint] = useState("");

  


  return (
    <div className={styles.wrapper}>
      {(isTourCreationFormShown && !isTourNameFormShown) &&
        <>
          <>
            <h3>Stwórz trasę poprzez podanie punktów tworzących odcinki</h3>
            <div className={styles.temp}></div>
          </>
          <div className={styles.pointsPresenter}>
            <p>Punkty do GOT</p>
            <p>{points}</p>
          </div>
        </>
      }
      {(!isTourCreationFormShown && isTourNameFormShown) &&
        <>
          <p>Tu będzie nadawanie trasie nazwy</p>
        </>
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
