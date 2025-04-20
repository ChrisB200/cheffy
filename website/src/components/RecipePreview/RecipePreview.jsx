import styles from "./RecipePreview.module.css";
import { BASE_API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

function RecipePreview({ recipe }) {
  const navigate = useNavigate();

  const changePage = () => {
    const path = `/recipe/${recipe.userId}/${recipe.id}`
    navigate(path)
  }

  return (
    <div className={styles.container} onClick={changePage}>
      <div className={styles.preview}>
        <img src={`${BASE_API_URL}/${recipe.path}`} />
      </div>
      <div className={styles.details}>
        <p className={styles.user}>@{recipe.user.username}</p>
        <h3>{recipe.title}</h3>
        <p className={styles.cuisine}>{recipe.cuisine.name}</p>
      </div>
    </div>
  );
}

export default RecipePreview;
