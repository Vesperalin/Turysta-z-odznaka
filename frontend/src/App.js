import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [labeledPoints, setLabeledPoints] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/labeled-points", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => setLabeledPoints(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>Turysta z odznaką</h1>
      {labeledPoints.map((labeledPoint) => {
        return (
          <div key={labeledPoint.id_punktu}>
            <p>{labeledPoint.nazwa} {labeledPoint.wysokosc ? labeledPoint.wysokosc + ' m n.p.m.': ''} </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
