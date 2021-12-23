import React, { useState } from "react";
import axios from "axios";

import SearchForm from "./SearchForm";
import styles from "./SearchLabeledPoint.module.css";
import LabeledPointsSearchResultTable from "../../../View/LabeledPointsSearchResultTable/LabeledPointsSearchResultTable";

const baseURL = "http://127.0.0.1:5000/labeled-points/like/";

const SearchLabeledPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = React.useState("");
  const [matchedLabeledPoints, setMatchedLabeledPoints] = useState([]);

  const onSubmit = () => {
    axios.get(`${baseURL}${term}`)
      .then(response => {
        setMatchedLabeledPoints(response.data);
        setFormIsShown(false);
      })
      //.catch(error => setErrorMessage(error.response.data)) -- not working on backend
      .catch(error => console.log(error.response.data))
  };

  return (
    <div className={styles.wrapper}>
      {formIsShown &&
        <SearchForm
          term={term}
          setTerm={setTerm}
          onSubmit={onSubmit}
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
