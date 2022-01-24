import React from "react";

import SearchBar from "./SearchBar";
import UserBar from "./UserBar";
import styled from "./TopBar.module.css";

const TopBar = () => {
  return (
    <div className={styled.topBarWrapper}>
      <SearchBar />
      <UserBar />
    </div>
  );
};

export default TopBar;
