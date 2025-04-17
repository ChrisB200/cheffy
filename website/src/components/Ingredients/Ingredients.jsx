import styles from "./Ingredients.module.css";
import { convertUnit } from "../../utils/helpers"
import React from "react";

function Ingredients({ ingredients }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ingredients</h2>
      <div className={styles.ingredients}>
        {ingredients.map((ingredient) => {
          return (
            <React.Fragment key={ingredient.id}>
              <p className={styles.name}>{ingredient.name}</p>
              <hr/>
              <p className={styles.amount}>{ingredient.amount}</p>
              <hr/>
              <p className={styles.unit}>{ingredient.unit.pluralAbbreviation}</p>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Ingredients;
