import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchForm from "./SearchForm";
import EvidenceConfirmationManager from "./EvidenceConfirmationManager";
import LinkButton from "../../View/LinkButton/LinkButton";
import styles from "./EvidenceConfirmation.module.css";

const tourSegmentsBaseURL = "http://127.0.0.1:5000/evidence-confirmation/segments";
const toursBaseURL = "http://127.0.0.1:5000/evidence-confirmation/tours";

const EvidenceConfirmation = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = useState("");
  const [tours, setTours] = useState([]);
  const [tourName, setTourName] = useState("");
  const [matchedSegments, setMatchedSegments] = useState([]);
  const [message, setMessage] = useState("");
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


  const onSubmit = () => {
    const tour = tours.find(
      (tour) => tour.name.toLowerCase() === term.toLowerCase()
    );
    setFormIsShown(false);

    if (tour === undefined) {
      setMessage(`Trasa o nazwie: ${term} nie istnieje`);
    } else {
      setTourName(tour.name);
      axios
        .get(`${tourSegmentsBaseURL}/${tour.id}`)
        .then((response) => {
          if (response.data.length === 0){
            setMessage(`Trasa o nazwie: ${term} nie ma niezgłoszonych odcinków`);
          }
          else{
            setMatchedSegments(response.data);
            setFormIsShown(false);
          }
          
        })
        .catch((error) => {
          if (error.response.status === 503) {
            navigate("/503");
          } else if (error.response.status === 400) {
            setMessage(error.response.data["message"]);
          } else {
            navigate("/error");
          }
        });
    }
  };

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
          onSubmit={onSubmit}
          tours={tours}
        />
      }
      {!formIsShown && message !== "" && (
        <>
          <p className={styles.noResultsInfo}>{message}</p>
          <LinkButton path="/">Zakończ</LinkButton>
        </>
      )}
      {!formIsShown && message === "" && (
        <>
          <EvidenceConfirmationManager
            matchedSegments={matchedSegments}
            tourName={tourName}
           />
        </>
      )}
    </div>
  );
};

export default EvidenceConfirmation;
