import React, { useState } from "react";
import styles from "./StepsSection.module.css";

function StepsSection({ steps, setSteps }) {
  const [currentStep, setCurrentStep] = useState("");

  const handleChange = (e) => {
    setCurrentStep(e.target.value);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (currentStep.trim()) {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepHeader}>
              <p>{index + 1}.</p>
              <button className={styles.remove}>-</button>
            </div>
            <textarea
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              cols="1"
              rows="2"
              name={`step-${index}`}
            />
          </div>
        ))}
        <textarea
          className={styles.area}
          onChange={handleChange}
          value={currentStep}
          cols="1"
          rows="5"
          name="currentStep"
          placeholder="Enter a cooking step for this recipe"
        />
      </div>


      <div className={styles.addContainer}>
        <button className={styles.add} onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
}

export default StepsSection;
