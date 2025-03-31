import React from "react";
import styles from "./DeltatimeInput.module.css";

function DeltatimeInput({ time, setTime }) {
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.name === "hours") {
      if (value < 0 || value > 24 || isNaN(value)) {
        alert("Please enter a number between 0 and 24 for the hours")
        return;
      }
    } else if (e.target.name === "mins") {
      if (value < 0 || value > 60 || isNaN(value)) {
        alert("Please enter a number between 0 and 60 for the minutes")
        return;
      }
    }

    setTime((prev) => ({...prev, [e.target.name]: value}));
  }

  return (
    <>
      <div className={styles.time}>
        <input
          type="number"
          name="hours"
          min="0"
          max="24"
          value={time.hours}
          onChange={handleChange}
        />
        <p>:</p>
        <input
          type="number"
          name="mins"
          min="0"
          max="60"
          value={time.mins}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default DeltatimeInput;
