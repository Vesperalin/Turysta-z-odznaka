import React, { useEffect, useState } from "react";
import axios from "axios";
import { matchSorter } from 'match-sorter'

import ComboboxInputField from "../../../../View/ComboboxInputField/ComboboxInputField";
import Button from "../../../../View/Button/Button";
import styles from "./SearchForm.module.css";

const baseURL = "http://127.0.0.1:5000/labeled-points";

const SearchForm = () => {
  const [labeledPoints, setLabeledPoints] = useState([]);
  //const [errorMessage, setErrorMessage] = useState("");
  const [term, setTerm] = React.useState("");
  const matchedPoints = nameMatch(term);

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

  const onSubmit = () => {
    console.log("Wybrano: " + term);
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Szukanie punktu opisanego</h2>
      {/*<p>{errorMessage}</p> -- for tests*/}
      <ComboboxInputField 
        comboboxLabel="LabeledPoints"
        setTerm={setTerm}
        listElements={matchedPoints}
        inputPlaceholder="Nazwa szukanego punktu"
        noMatchInfo="Nie znaleziono dopasowania"
      />
      <Button 
        text="Szukaj punktu opisanego"
        onClick={onSubmit}
      />
    </div>
  );
};

export default SearchForm;
