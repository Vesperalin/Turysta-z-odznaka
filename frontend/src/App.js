import React from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";
import Menu from "./components/View/Menu/Menu";
import TopBar from "./components/View/TopBar/TopBar";
import Home from "./components/View/Home/Home";
import LabeledPointManagement from "./components/View/LabeledPointManagement/LabeledPointManagement";
import OwnPointManagement from "./components/View/OwnPointManagement/OwnPointManagement";
import TourCreation from "./components/Container/TourCreation/TourCreation";
import EvidenceConfirmation from "./components/Container/EvidenceConfirmation/EvidenceConfirmation";
import AddLabeledPoint from "./components/Container/LabeledPointManagement/AddLabeledPoint/AddLabeledPoint";
import EditLabeledPoint from "./components/Container/LabeledPointManagement/EditLabeledPoint/EditLabeledPoint";
import RemoveLabeledPoint from "./components/Container/LabeledPointManagement/RemoveLabeledPoint/RemoveLabeledPoint";
import SearchLabeledPoint from "./components/Container/LabeledPointManagement/SearchLabeledPoint/SearchLabeledPoint";
import NotFound from "./components/View/NotFound/NotFound";

function App() {
  return (
    <div className={styles.contentWrapper}>
      <Menu />
      <div className={styles.mainPanelWrapper}>
        <div className={styles.content}>
          <TopBar />
          <main className={styles.routesMenu}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/punkt-opisany' element={<LabeledPointManagement />} />
              <Route path='/punkt-opisany/dodaj' element={<AddLabeledPoint />} />
              <Route path='/punkt-opisany/edytuj' element={<EditLabeledPoint />} />
              <Route path='/punkt-opisany/usun' element={<RemoveLabeledPoint />} />
              <Route path='/punkt-opisany/szukaj' element={<SearchLabeledPoint />} />
              <Route path='/punkt-wlasny' element={<OwnPointManagement />} />
              {/*Miejsce na 4 ścieżki do CRUDA punktu własnego*/}
              <Route path='/tworzenie-trasy' element={<TourCreation />} />
              <Route path='/zglaszanie-dowodow' element={<EvidenceConfirmation />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <footer>
          Designed and implemented by <a href="https://github.com/Vesperalin">Klaudia Błażyczek</a> and <a href="https://github.com/justyna-maluszynska">Justyna Małuszyńska</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
