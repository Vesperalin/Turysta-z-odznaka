import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./EditOwnPoint.module.css";
import SearchForm from "../SearchForm";
import LinkButton from "../../../View/LinkButton/LinkButton";
import EditionManager from "./EditionManager";

const ownPointsBaseURL = "http://127.0.0.1:5000/own-points";

const EditOwnPoint = () => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [term, setTerm] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [ownPoints, setOwnPoints] = useState([]);
  const [message, setMessage] = useState("");
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

  const onSubmit = () => {
    const point = ownPoints.find(
      (point) =>
        point.name ===
        term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()
    );
    setFormIsShown(false);

    if (point === undefined) {
      setMessage(`Punkt własny o nazwie: ${term} nie istnieje`);
    } else {
      setLatitude(point.latitude);
      setLongitude(point.longitude);
      axios
        .get(`${ownPointsBaseURL}/${point.id}`)
        .then((response) => {
          if (
            response.data.end_of_own_segments.length !== 0 ||
            response.data.start_of_own_segments.length !== 0
          ) {
            setMessage(
              `Punkt ${term} jest już używany i nie można go edytować`
            );
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
      {formIsShown && (
        <SearchForm
          title="Edycja punktu własnego"
          inputPlaceholder="Nazwa punktu"
          noMatchInfo="Nie znaleziono dopasowania"
          buttonText="Edytuj punkt własny"
          term={term}
          setTerm={setTerm}
          onSubmit={onSubmit}
          ownPoints={ownPoints}
        />
      )}
      {!formIsShown && message !== "" && (
        <>
          <p className={styles.info}>{message}</p>
          <LinkButton path="/">Zakończ</LinkButton>
        </>
      )}
      {!formIsShown && message === "" && (
        <EditionManager
          pointName={term}
          pointLatitude={latitude}
          pointLongitude={longitude}
          ownPoints={ownPoints}
        />
      )}
    </div>
  );
};

export default EditOwnPoint;
