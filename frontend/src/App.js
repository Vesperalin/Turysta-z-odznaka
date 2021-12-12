import React from "react";

import styles from "./App.module.css";
import Menu from "./components/View/Menu/Menu";

function App() {  
  return (
    <div className={styles.contentWrapper}>
      <Menu />
      <div className={styles.mainPanelWrapper}>
        
      </div>
    </div>
  );
}

export default App;
