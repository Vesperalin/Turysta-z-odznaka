import React, { useEffect, useState } from "react";
import axios from "axios";
import { matchSorter } from 'match-sorter'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";

const baseURL = "http://127.0.0.1:5000/labeled-points";

const SearchForm = () => {
  const [labeledPoints, setLabeledPoints] = useState([]);
  //const [errorMessage, setErrorMessage] = useState("");
  const [term, setTerm] = React.useState("");
  const matchedPoints = useNameMatch(term);

  const handleInputChange = event => setTerm((event.target.value).trim());

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setLabeledPoints(response.data);
      })
      //.catch(error => setErrorMessage(error.response.data)) -- not working on backend
      .catch(error => console.log(error.response.data))
  }, [])

  function useNameMatch(term) {
    return (
      term.trim() === ""
        ? null
        : matchSorter(labeledPoints, term, { keys: ['name'] })
    );
  }

  const onSubmit = () => {
    console.log("Wybrano: " + term );
  };

  return (
    <div>
      <h2>Szukanie punktu opisanego</h2>
      {/*<p>{errorMessage}</p> -- for tests*/}
      <Combobox
        aria-label="LabeledPoints"
        onSelect={selectedPointName => setTerm(selectedPointName.trim())}>
        <ComboboxInput
          className="city-search-input"
          placeholder="Nazwa szukanego punktu"
          onChange={handleInputChange}
        />
        {matchedPoints && (
          <ComboboxPopover className="shadow-popup">
            {matchedPoints.length > 0 ? (
              <ComboboxList>
                {matchedPoints.slice(0, 5).map((result, index) => (
                  <ComboboxOption
                    key={index}
                    value={`${result.name}`}
                  />
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: "block", margin: 8 }}>
                Nie znaleziono dopasowania
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default SearchForm;
