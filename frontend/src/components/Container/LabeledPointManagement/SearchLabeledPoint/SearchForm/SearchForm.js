import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:5000/labeled-points";

const SearchForm = () => {
  const [labeledPoints, setLabeledPoints] = useState([]);
  //const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setLabeledPoints(response.data);
      })
      //.catch(error => setErrorMessage(error.response.data))
      .catch(error => console.log(error.response.data))
  }, [])

  return (
    <div>
      <p>Hi</p>
      {/*<p>{errorMessage}</p>*/}
      {labeledPoints.map((labeledPoint) => {
        return (
          <div key={labeledPoint.id}>
            <p>{labeledPoint.name} {labeledPoint.height ? labeledPoint.height + ' m n.p.m.' : ''} </p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchForm;
