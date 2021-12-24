import React, { useEffect, useState } from "react";
import axios from "axios";
import { matchSorter } from 'match-sorter'

import ComboboxInputField from "../../View/ComboboxInputField/ComboboxInputField";
import Button from "../../View/Button/Button";
import styles from "./SearchForm.module.css";

const baseURL = "http://127.0.0.1:5000/labeled-points";

const SearchForm = props => {
  const [labeledPoints, setLabeledPoints] = useState([]);
  //const [errorMessage, setErrorMessage] = useState("");
  const matchedPoints = nameMatch(props.term);

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setLabeledPoints(response.data);
      })
      //.catch(error => setErrorMessage(error.response.data)) -- not working on backend
      .catch(error => console.log(error.response.data))
  }, [])

  function nameMatch(term) {
    return (
      term.trim() === ""
        ? null
        : matchSorter(labeledPoints, term, { keys: ['name'] })
    );
  }

  return (
    <div className={styles.formWrapper}>
      <h2>{props.title}</h2>
      {/*<p>{errorMessage}</p> -- for tests*/}
      <ComboboxInputField
        comboboxLabel="LabeledPoints"
        setTerm={props.setTerm}
        listElements={matchedPoints}
        inputPlaceholder={props.inputPlaceholder}
        noMatchInfo={props.noMatchInfo}
      />
      <Button
        text={props.buttonText}
        onClick={props.onSubmit}
      />
    </div>
  );
};

export default SearchForm;
