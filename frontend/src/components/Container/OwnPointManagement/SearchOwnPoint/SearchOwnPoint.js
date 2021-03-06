import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SearchForm from "../SearchForm";
import styles from "./SearchOwnPoint.module.css";
import OwnPointsSearchResultTable from "../../../View/OwnPointsSearchResultTable/OwnPointsSearchResultTable";
import LinkButton from "../../../View/LinkButton/LinkButton";

const likeBaseURL = "http://127.0.0.1:5000/own-points/like";
const ownPointsBaseURL = "http://127.0.0.1:5000/own-points";

const SearchOwnPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = useState("");
  const [ownPoints, setOwnPoints] = useState([]);
  const [matchedOwnPoints, setMatchedOwnPoints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(ownPointsBaseURL)
      .then((response) => {
        setOwnPoints(response.data);
      })
      .catch((error) => {
        if (error.response.status === 503) {
          navigate("/503");
        } else {
          navigate("/error");
        }
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get(ownPointsBaseURL)
      .then((response) => {
        setOwnPoints(response.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  const onSubmit = () => {
    axios
      .get(`${likeBaseURL}/${term}`)
      .then((response) => {
        setMatchedOwnPoints(response.data);
        setFormIsShown(false);
      })
      .catch((error) => {
        if (error.response.status === 503) {
          navigate("/503");
        } else {
          navigate("/error");
        }
      });
  };

  return (
    <div className={styles.wrapper}>
      {formIsShown && (
        <SearchForm
          title="Szukanie punktu własnego"
          inputPlaceholder="Nazwa szukanego punktu"
          noMatchInfo="Nie znaleziono dopasowania"
          buttonText="Szukaj punktu własnego"
          term={term}
          setTerm={setTerm}
          onSubmit={onSubmit}
          ownPoints={ownPoints}
        />
      )}
      {matchedOwnPoints.length !== 0 && !formIsShown && (
        <>
          <p className={styles.info}>
            Wyniki szukania punktu własnego dla: {term}
          </p>
          <OwnPointsSearchResultTable matchedElements={matchedOwnPoints} />
          <LinkButton path='/'>Zakończ</LinkButton>
        </>
      )}
      {matchedOwnPoints.length === 0 && !formIsShown && (
        <>
          <p className={styles.noResultsInfo}>Brak dopasowań dla: {term}</p>
          <LinkButton path='/'>Zakończ</LinkButton>
        </>
      )}
    </div>
  );
};

export default SearchOwnPoint;
