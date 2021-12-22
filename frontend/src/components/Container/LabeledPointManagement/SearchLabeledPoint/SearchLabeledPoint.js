import React, { useState } from "react";

import SearchForm from "./SearchForm/SearchForm";
import styles from "./SearchLabeledPoint.module.css";


const SearchLabeledPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  //const [tableIsShown, setTableIsShown] = useState(false);
  //const [infoIsShown, setInfoIsShown] = useState(false);
  //muszę zrobić podawanie info z dołu do rodzica jak user wybierze jaką nazwe chce wpisać - może przez funkcje wywoływaną z dołu przez props
  //conditional rendering wyniku wyszukiwania

  return (
    <div className={styles.wrapper}>
      <h2>Szukaj punktu opisanego</h2>
      {formIsShown && <SearchForm />}
    </div>
  );
};

export default SearchLabeledPoint;
