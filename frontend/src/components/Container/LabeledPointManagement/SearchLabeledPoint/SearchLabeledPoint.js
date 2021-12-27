import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchForm from "../SearchForm";
import styles from "./SearchLabeledPoint.module.css";
import LabeledPointsSearchResultTable from "../../../View/LabeledPointsSearchResultTable/LabeledPointsSearchResultTable";

const likeBaseURL = "http://127.0.0.1:5000/labeled-points/like";
const labeledPointsBaseURL = "http://127.0.0.1:5000/labeled-points";

const SearchLabeledPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = useState("");
  const [labeledPoints, setLabeledPoints] = useState([]);
  const [matchedLabeledPoints, setMatchedLabeledPoints] = useState([]);
  //const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get(labeledPointsBaseURL)
      .then(response => {
        setLabeledPoints(response.data);
      })
      .catch(error => console.log(error.response.data))
  }, [])

  const onSubmit = () => {
    axios.get(`${likeBaseURL}/${term}`)
      .then(response => {
        setMatchedLabeledPoints(response.data);
        setFormIsShown(false);
      })
      .catch(error => console.log(error.response.data))
  };

  return (
    <div className={styles.wrapper}>
      {/*<p>{errorMessage}</p> -- for tests*/}
      {formIsShown &&
        <SearchForm
          title="Szukanie punktu opisanego"
          inputPlaceholder="Nazwa szukanego punktu"
          noMatchInfo="Nie znaleziono dopasowania"
          buttonText="Szukaj punktu opisanego"
          term={term}
          setTerm={setTerm}
          onSubmit={onSubmit}
          labeledPoints={labeledPoints}
        />
      }
      {(matchedLabeledPoints.length !== 0 && !formIsShown) &&
        <>
          <p className={styles.info}>Wyniki szukania punktu opisanego dla: {term}</p>
          <LabeledPointsSearchResultTable matchedElements={matchedLabeledPoints} />
        </>
      }
      {(matchedLabeledPoints.length === 0 && !formIsShown) &&
        <p className={styles.noResultsInfo}>Brak dopasowań dla: {term}</p>
      }
    </div>
  );
};

export default SearchLabeledPoint;
