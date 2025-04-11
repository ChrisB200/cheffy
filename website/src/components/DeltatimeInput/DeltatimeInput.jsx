import React from "react";
import styles from "./DeltatimeInput.module.css";

function DeltatimeInput({ name, time, setTime }) {
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const field = e.target.name.toLowerCase().includes("hours")
      ? "hours"
      : "mins";

    if (field === "hours" && (value < 0 || value > 24 || isNaN(value))) {
      alert("Please enter a number between 0 and 24 for the hours");
      return;
    }
    if (field === "mins" && (value < 0 || value > 59 || isNaN(value))) {
      alert("Please enter a number between 0 and 59 for the minutes");
      return;
    }

    setTime((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className={styles.time}>
        <input
          type="number"
          name={`${name}Hours`}
          min="0"
          max="24"
          value={time.hours}
          onChange={handleChange}
          pattern="[0-9]"
        />
        <p>:</p>
        <input
          type="number"
          name={`${name}Mins`}
          min="0"
          max="60"
          value={time.mins}
          onChange={handleChange}
          pattern="[0-9]"
        />
      </div>
    </>
  );
}

export default DeltatimeInput;
