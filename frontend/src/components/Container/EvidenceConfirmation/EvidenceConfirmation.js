import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchForm from "./SearchForm";
import styles from "./EvidenceConfirmation.module.css";

//const likeBaseURL = "http://127.0.0.1:5000/labeled-points/like";
const toursBaseURL = "http://127.0.0.1:5000/evidence-confirmation/tours";

const EvidenceConfirmation = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = useState("");
  const [tours, setTours] = useState([]);
  // const [matchedTour, setMatchedTour] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(toursBaseURL)
      .then(response => {
        setTours(response.data);
      })
      .catch(error => {
        if (error.response.status === 503) {
          navigate('/503');
        } else {
          navigate('/error');
        }
      });
  }, [navigate]);

  /*const onSubmit = () => {
    axios.get(`${likeBaseURL}/${term}`)
      .then(response => {
        setMatchedTour(response.data);
        setFormIsShown(false);
      })
      .catch(error => {
        if (error.response.status === 503) {
          navigate('/503');
        } else {
          navigate('/error');
        }
      });
  };*/

  return (
    <div className={styles.wrapper}>
      {formIsShown &&
        <SearchForm
          title="Wybierz trasę do weryfikacji"
          inputPlaceholder="Nazwa szukanej trasy"
          noMatchInfo="Nie znaleziono dopasowania"
          buttonText="Szukaj trasy"
          term={term}
          setTerm={setTerm}
          //onSubmit={onSubmit}
          tours={tours}
        />
      }
      {/*(matchedTour.length !== 0 && !formIsShown) &&
        <>
          <p className={styles.info}>Wyniki szukania punktu opisanego dla: {term}</p>
          <LabeledPointsSearchResultTable matchedElements={matchedTour} />
          <LinkButton path='/'>Zakończ</LinkButton>
        </>
      }
      {(matchedTour.length === 0 && !formIsShown) &&
        <>
          <p className={styles.noResultsInfo}>Brak dopasowań dla: {term}</p>
          <LinkButton path='/'>Zakończ</LinkButton>
        </>
      */}
    </div>
  );
};

export default EvidenceConfirmation;
