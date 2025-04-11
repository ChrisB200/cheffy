import React, { useState } from "react";
import styles from "./RecipeModalSheet.module.css";
import IngredientsSelector from "../IngredientsSelector/IngredientsSelector";
import DeltatimeInput from "../DeltatimeInput/DeltatimeInput";
import httpClient from "../../utils/httpClient";
import { BASE_API_URL } from "../../utils/constants";
import StepsSection from "../StepsSection/StepsSection";

function RecipeModalSheet({ setShowModal }) {
  const [recipeName, setRecipeName] = useState("");
  const [img, setImg] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [prepTime, setPrepTime] = useState({
    hours: 0,
    mins: 0,
  });

  const [cookTime, setCookTime] = useState({
    hours: 0,
    mins: 0,
  });

  const [difficulty, setDifficulty] = useState("Beginner");

  const closeSheet = () => {
    setShowModal(false);
  };

  const changePreview = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImg(url);
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImg(null);
  };

  const difficultySelect = (e) => {
    setDifficulty(e.target.value);
  };

  const handleRecipeChange = (e) => {
    setRecipeName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("difficulty", difficulty);
    form.append("ingredients", JSON.stringify(ingredients));
    form.append("steps", JSON.stringify(steps));

    httpClient
      .post(`${BASE_API_URL}/recipe`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        alert(`Successfully posted your ${recipeName} recipe`);
        setShowModal(false);
        window.location.reload()
      })
      .catch((error) => {
        if (error.status === 401) {
          alert("You must be logged in to create a post");
        } if (error.status === 400) {
          alert("An unexpected error has occured");
          console.log(error);
        }
      });
  };

  return (
    <>
      <div className={styles.background} onClick={closeSheet} />
      <div className={styles.container}>
        <button onClick={closeSheet} className={styles.close}>
          X
        </button>
        <h1>Post a Recipe</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="recipe">Name</label>
            <input
              type="text"
              name="recipe"
              value={recipeName}
              onChange={handleRecipeChange}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="image">
              Image <span className={styles.optional}>(optional)</span>
            </label>
            <input
              type="file"
              onChange={changePreview}
              name="image"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
          <div className={styles.preview}>
            <button className={styles.x} onClick={removeImage}>
              X
            </button>
            <img src={img} alt="Preview" />
          </div>
          <div className={styles.row}>
            <label>Ingredients</label>
            <IngredientsSelector
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </div>
          <div className={styles.row}>
            <label>Steps</label>
            <StepsSection steps={steps} setSteps={setSteps} />
          </div>
          <div className={styles.row}>
            <label htmlFor="prep">Preparation Time</label>
            <DeltatimeInput time={prepTime} name="prep" setTime={setPrepTime} />
          </div>
          <div className={styles.row}>
            <label htmlFor="cook">Cook Time</label>
            <DeltatimeInput time={cookTime} name="cook" setTime={setCookTime} />
          </div>
          <div className={styles.row}>
            <label htmlFor="difficulty">Difficulty</label>
            <select
              className={styles.difficulty}
              value={difficulty}
              onChange={difficultySelect}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className={styles.submitContainer}>
            <button className={styles.submit}>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RecipeModalSheet;
