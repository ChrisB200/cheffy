import React, { useEffect, useState } from "react";
import styles from "./IngredientsSelector.module.css";
import useFetch from "../../hooks/useFetch";
import { BASE_API_URL } from "../../utils/constants";

function IngredientsSelector({ ingredients, setIngredients }) {

  const { data: units, error } = useFetch({
    url: `${BASE_API_URL}/units`,
    method: "get",
    withCredentials: true,
    key: ["get", "units"],
    cache: {
      enabled: true,
      ttl: 400,
    },
  });

  const [currentIngredient, setCurrentIngredient] = useState({
    name: "",
    amount: 0,
    unit: "g",
  });

  const selectChange = (e, index) => {
    const newUnit = e.target.value;
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], unit: newUnit };
      return updated;
    });
  };

  const amountChange = (e, index) => {
    const newAmount = e.target.value;
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], amount: newAmount };
      return updated;
    });
  };

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "amount") {
      value = parseFloat(value);
    }

    setCurrentIngredient((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleRemove = (e, i) => {
    e.preventDefault();
    setIngredients((prev) => {
      return prev.filter((_, index) => index !== i);
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (currentIngredient.name === "") {
      alert("Please enter an ingredient name");
      return;
    }

    setIngredients((prevIngredients) => [
      ...prevIngredients,
      currentIngredient,
    ]);

    setCurrentIngredient({
      name: "",
      amount: 0,
      unit: "",
    });
  };

  return (
    <>
      <div className={styles.container}>
        {ingredients.map((ingredient, i) => {
          return (
            <>
              <div className={styles.removeContainer}>
                <p
                  key={`${ingredient.name}-${i}`}
                  className={styles.ingredient}
                >
                  {ingredient.name}
                </p>
                <button
                  onClick={(e) => handleRemove(e, i)}
                  className={styles.remove}
                >
                  -
                </button>
              </div>
              <input
                key={`${ingredient.amount}-${i}`}
                className={styles.amount}
                inputMode="decimal"
                onChange={(e) => amountChange(e, i)}
                value={ingredient.amount}
                min="0"
                type="number"
              />
              <select
                key={`${ingredient.unit}-${i}`}
                className={styles.select}
                value={ingredient.unit}
                onChange={(e) => selectChange(e, i)}
              >
                {units?.map((unit) => {
                  return (
                    <option key={unit.id} value={unit.abbreviation}>
                      {unit.abbreviation}
                    </option>
                  );
                })}
              </select>
            </>
          );
        })}

        <input
          name="name"
          value={currentIngredient.name}
          className={styles.ingredient}
          type="text"
          placeholder="Enter ingredient"
          onChange={handleChange}
        />
        <input
          name="amount"
          value={currentIngredient.amount}
          className={styles.amount}
          inputMode="decimal"
          min="0"
          type="number"
          onChange={handleChange}
        />
        <select
          className={styles.select}
          value={currentIngredient.unit}
          name="unit"
          onChange={handleChange}
        >
          {units?.map((unit) => {
            return (
              <option key={unit.id} value={unit.abbreviation}>
                {unit.abbreviation}
              </option>
            );
          })}
        </select>
        <button onClick={handleAdd} className={styles.add}>
          Add
        </button>
      </div>
    </>
  );
}

export default IngredientsSelector;
