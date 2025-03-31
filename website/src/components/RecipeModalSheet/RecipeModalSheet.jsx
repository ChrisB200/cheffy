import React, { useState } from "react";
import styles from "./RecipeModalSheet.module.css";
import IngredientsSelector from "../IngredientsSelector/IngredientsSelector";
import DeltatimeInput from "../DeltatimeInput/DeltatimeInput";

function RecipeModalSheet({ setShowModal }) {
  const [img, setImg] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [prepTime, setPrepTime] = useState({
    hours: 0,
    mins: 0
  });

  const [cookTime, setCookTime] = useState({
    hours: 0,
    mins: 0
  });

  const [difficulty, setDifficulty] = useState("beginner");

  const closeSheet = () => {
    setShowModal(false);
  }

  const changePreview = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImg(url);
  }

  const removeImage = (e) => {
    e.preventDefault();
    setImg(null);
  }

  const difficultySelect = (e) => {
    setDifficulty(e.target.value);
  }

  return (
    <>
      <div className={styles.background} onClick={closeSheet}/>
      <div className={styles.container}>
        <button className={styles.close}>X</button>
        <h1>Post a Recipe</h1>
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="recipe">Name</label>
            <input type="text" name="recipe"/>
          </div>
          <div className={styles.row}>
            <label htmlFor="image">Image <span className={styles.optional}>(optional)</span></label>
            <input type="file" onChange={changePreview} name="image" accept="image/png, image/gif, image/jpeg"/>
          </div>
          <div className={styles.preview}>
            <button className={styles.x} onClick={removeImage}>X</button>
            <img src={img} alt="Preview"/>
          </div>
          <div className={styles.row}>
            <label>Ingredients</label>
            <IngredientsSelector ingredients={ingredients} setIngredients={setIngredients}/>
          </div>
          <div className={styles.row}>
            <label htmlFor="prep">Preparation Time</label>
            <DeltatimeInput time={prepTime} setTime={setPrepTime}/>
          </div>
          <div className={styles.row}>
            <label htmlFor="cook">Cook Time</label>
            <DeltatimeInput time={cookTime} setTime={setCookTime}/>
          </div>
          <div className={styles.row}>
            <label htmlFor="difficulty">Difficulty</label>
            <select className={styles.difficulty} value={difficulty} onChange={difficultySelect}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className={styles.submitContainer}>
            <button className={styles.submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RecipeModalSheet;
