import React from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";
import Menu from "./components/View/Menu/Menu";
import TopBar from "./components/View/TopBar/TopBar";
import Home from "./components/View/Home/Home";
import LabeledPointManagement from "./components/Container/LabeledPointsManagement/LabeledPointManagement";
import OwnPointManagement from "./components/Container/OwnPointsManagement/OwnPointManagement";
import TourCreation from "./components/Container/TourCreation/TourCreation";
import EvidenceConfirmation from "./components/Container/EvidenceConfirmation/EvidenceConfirmation";

function App() {
  return (
    <div className={styles.contentWrapper}>
      <Menu />
      <div className={styles.mainPanelWrapper}>
        <TopBar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/punkt-opisany' element={<LabeledPointManagement />} />
            <Route path='/punkt-wlasny' element={<OwnPointManagement />} />
            <Route path='/tworzenie-trasy' element={<TourCreation />} />
            <Route path='/zglaszanie-dowodow' element={<EvidenceConfirmation />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
