import React from "react";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./EvidenceConfirmationDateForm.module.css";

const Input = React.forwardRef(({ onChange, placeholder, value, id, onClick }, ref) => (
  <input
    className={styles.input}
    ref={ref}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    id={id}
    onClick={onClick}
    required
  />
));

const EvidenceConfirmationDateForm = (props) => {
  const [startDate, setStartDate] = useState(props.startDate)
  const [endDate, setEndDate] = useState(props.endDate)

  const handleStartDateChange = (date) => {
    setStartDate(date);
    props.handleStartDateChange(props.segment, date);
  }

  const handleEndDateChange = (date) => {
    setEndDate(date);
    props.handleEndDateChange(props.segment, date);
  }

  return (
    <div className={styles.formWrapper}>
      <div>
        <h2 className={styles.formTitle}>{props.formTitle}</h2>
      </div>

      <div className={styles.formDateWrapper}>
        <p>Data rozpoczęcia</p>
        <DatePicker
          selected={startDate}
          customInput={<Input />}
          onChange={(date) => handleStartDateChange(date)}
          maxDate={endDate === undefined ? new Date() : new Date(endDate)}
          excludeDateIntervals={props.excludeDateIntervals}
        />
      </div>
      <div className={styles.formDateWrapper}>
        <p>Data zakończenia</p>
        <DatePicker
          selected={endDate}
          customInput={<Input />}
          onChange={(date) => handleEndDateChange(date)}
          minDate={new Date(startDate)}
          maxDate={new Date()}
          excludeDateIntervals={props.excludeDateIntervals}
        />
      </div>
    </div>
  );
};

export default EvidenceConfirmationDateForm;
