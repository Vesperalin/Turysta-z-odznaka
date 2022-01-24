import React from "react";

import styles from "./SearchBar.module.css";
import searchImage from "../../../assets/TopBarIcons/icon_search.png";

const SearchBar = () => {
  const onSubmitHandler = event => {
    //only because this app is not fully implemented
    event.preventDefault();
  };

  return (
    <div className={styles.searchBarWrapper}>
      <img src={searchImage} alt="search-icon" />
      <form onSubmit={onSubmitHandler}>
        <input type="search" size="50" placeholder="Wyszukaj" />
      </form>
    </div>
  );
};

export default SearchBar;
