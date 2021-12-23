import React from "react";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";

import "./ComboboxInputField.css";

const ComboboxInputField = props => {
  return (
    <Combobox
      aria-label={props.comboboxLabel}
      onSelect={selectedValue => props.setTerm(selectedValue.trim())}>
      <ComboboxInput
        placeholder={props.inputPlaceholder}
        onChange={event => props.setTerm((event.target.value).trim())}
      />
      {props.listElements && (
        <ComboboxPopover>
          {props.listElements.length > 0 ? (
            <ComboboxList>
              {props.listElements.slice(0, 5).map((result, index) => (
                <ComboboxOption
                  key={index}
                  value={`${result.name}`}
                />
              ))}
            </ComboboxList>
          ) : (
            <span style={{ display: "block", margin: 8 }}>
              {props.noMatchInfo}
            </span>
          )}
        </ComboboxPopover>
      )}
    </Combobox>
  );
};

export default ComboboxInputField;
