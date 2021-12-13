import React from "react";

import styles from "./App.module.css";
import Menu from "./components/View/Menu/Menu";
import TopBar from "./components/View/TopBar/TopBar";

function App() {
  return (
    <div className={styles.contentWrapper}>
      <Menu />
      <div className={styles.mainPanelWrapper}>
        <TopBar />
      </div>
    </div>
  );
}

export default App;
