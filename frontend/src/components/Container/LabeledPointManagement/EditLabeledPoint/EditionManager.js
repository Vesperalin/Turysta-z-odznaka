import React, { useState } from "react";

import LabeledPointForm from "../../../View/LabeledPointForm/LabeledPointForm";
//import styles from "./EditionManager.module.css";

const EditionManager = props => {
  const [formIsShown, setFormIsShown] = useState(true);
  const [newPointName, setNewPointName] = useState("");
  const [newPointHeight, setNewPointHeight] = useState("");

  const handleNameChange = e => setNewPointName(e.target.value);

  const handleHeightChange = e => {
    const regPattern = /^[0-9\b]+$/;
    if (e.target.value === '' || regPattern.test(e.target.value)) {
      setNewPointHeight(e.target.value);
    }
  };


  const onClick = () => {
    console.log(newPointName);
    console.log(newPointHeight);
  };

  return (
    <>
      {formIsShown &&
        <LabeledPointForm
          title={`Edycja punktu opisanego: ${props.pointName}`}
          name={newPointName}
          height={newPointHeight}
          setName={handleNameChange}
          setHeight={handleHeightChange}
          buttonText='Edytuj punkt opisany'
          onSubmit={onClick}
        />
      }
    </>

  );
};

export default EditionManager;
