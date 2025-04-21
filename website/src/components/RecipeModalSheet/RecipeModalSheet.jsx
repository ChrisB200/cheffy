import React, { useEffect, useState } from "react";
import styles from "./RecipeModalSheet.module.css";
import IngredientsSelector from "../IngredientsSelector/IngredientsSelector";
import DeltatimeInput from "../DeltatimeInput/DeltatimeInput";
import httpClient from "../../utils/httpClient";
import { BASE_API_URL } from "../../utils/constants";
import StepsSection from "../StepsSection/StepsSection";

function RecipeModalSheet({ setShowModal, recipe = null }) {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [img, setImg] = useState(null);
  const [imageFile, setImageFile] = useState(null)
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

  const loadRecipe = () => {
    setRecipeName(recipe.title);
    setCuisine(recipe.cuisine.name);
    setDescription(recipe.description);
    setImg(`${BASE_API_URL}/${recipe.path}`);
    setIngredients(recipe.ingredients);
    setSteps(recipe.steps.map((step) => step.instruction));
    setPrepTime({
      hours: Math.floor(recipe.prep / 60),
      mins: recipe.prep % 60,
    });

    setCookTime({
      hours: Math.floor(recipe.cook / 60),
      mins: recipe.cook % 60,
    });

    setDifficulty(recipe.difficulty);
     
  };

  useEffect(() => {
    if (recipe) {
      loadRecipe();
    }
  }, []);

  const closeSheet = () => {
    setShowModal(false);
  };

  const changePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // ← Store the actual file
      const url = URL.createObjectURL(file);
      setImg(url);
    }
  };


  const removeImage = (e) => {
    e.preventDefault();
    setImg(null);
    setImageFile(null)
  };

  const difficultySelect = (e) => {
    setDifficulty(e.target.value);
  };

  const handleRecipeChange = (e) => {
    setRecipeName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleCuisineChange = (e) => {
    setCuisine(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("recipe", recipeName);
    form.append("description", description);
    form.append("cuisine", cuisine);
    form.append("difficulty", difficulty);
    form.append("ingredients", JSON.stringify(ingredients));
    form.append("steps", JSON.stringify(steps));
    form.append("prepHours", prepTime.hours);
    form.append("prepMins", prepTime.mins);
    form.append("cookHours", cookTime.hours);
    form.append("cookMins", cookTime.mins);

    if (recipeName === "") {
      alert("The recipe is missing a name field");
      return;
    }

    if (description === "") {
      alert("The recipe is missing a description");
      return;
    }

    if (cuisine === "") {
      alert("The recipe is missing a cuisine");
      return;
    }

    if (!img) {
      alert("The recipe must have an image");
      return;
    }

    if (ingredients.length === 0) {
      alert("The recipe must have at least 1 ingredient");
      return;
    }

    if (steps.length === 0) {
      alert("The recipe must have at least 1 step");
      return;
    }



    if (imageFile) {
      form.append("image", imageFile);
    }

    if (recipe) {
      form.append("id", recipe.id);

      httpClient
        .put(`${BASE_API_URL}/recipe`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          alert(`Successfully updated your ${recipeName} recipe`);
          setShowModal(false);
          window.location.reload();
        })
        .catch((error) => {
          if (error.status === 401) {
            alert("You must be logged in to create a post");
          }
          if (error.status === 400) {
            alert("An unexpected error has occured");
            console.log(error);
          }
        });
    } else {
      httpClient
        .post(`${BASE_API_URL}/recipe`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          alert(`Successfully posted your ${recipeName} recipe`);
          setShowModal(false);
          window.location.reload();
        })
        .catch((error) => {
          if (error.status === 401) {
            alert("You must be logged in to create a post");
          }
          if (error.status === 400) {
            alert("An unexpected error has occured");
            console.log(error);
          }
        });
    }
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
            <label htmlFor="description">
              Description
            </label>
            <textarea
              onChange={handleDescriptionChange}
              value={description}
              cols="1"
              rows="3"
              name="description"
              className={styles.description}
              placeholder="Enter a description"
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="cuisine">Cuisine</label>
            <input
              type="text"
              name="cuisine"
              value={cuisine}
              onChange={handleCuisineChange}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="image">
              Image
            </label>
            <input
              type="file"
              onChange={changePreview}
              name="image"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
          <div className={styles.preview}>
            <button className={styles.close} onClick={removeImage}>
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
