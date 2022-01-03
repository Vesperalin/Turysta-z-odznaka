import React from "react";
import { matchSorter } from 'match-sorter'

import ComboboxInputField from "../../View/ComboboxInputField/ComboboxInputField";
import Button from "../../View/Button/Button";
import styles from "./SearchForm.module.css";

const SearchForm = props => {
  const matchedTours = nameMatch(props.term);

  function nameMatch(term) {
    return (
      term.trim() === ""
        ? null
        : matchSorter(props.tours, term, { keys: ['name'] })
    );
  }

  return (
    <div className={styles.formWrapper}>
      <h2>{props.title}</h2>
      <ComboboxInputField
        comboboxLabel="Tours"
        setTerm={props.setTerm}
        listElements={matchedTours}
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
