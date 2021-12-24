import React from "react";
import { matchSorter } from 'match-sorter'

import ComboboxInputField from "../../View/ComboboxInputField/ComboboxInputField";
import Button from "../../View/Button/Button";
import styles from "./SearchForm.module.css";

const SearchForm = props => {
  const matchedPoints = nameMatch(props.term);

  function nameMatch(term) {
    return (
      term.trim() === ""
        ? null
        : matchSorter(props.labeledPoints, term, { keys: ['name'] })
    );
  }

  return (
    <div className={styles.formWrapper}>
      <h2>{props.title}</h2>
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
